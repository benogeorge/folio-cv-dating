'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { createClient } from '@/lib/supabase/client'
import { generateCodename } from '@/lib/codename'
import { calculateFolioScore } from '@/lib/folio-score'
import { GeometricAvatar } from '@/lib/avatar'

const PROMPTS = [
  "The side project I'm most proud of is...",
  "My biggest professional plot twist was...",
  "The skill I'm still unlearning is...",
  "If my CV could lie, it would say...",
  "Outside of work I'm usually...",
  "The thing that gets me out of bed is...",
  "My most underrated quality is...",
  "I'd trade my job title for...",
]

const INTERESTS = ['🎵 Music','🏃 Fitness','✈️ Travel','🎮 Gaming','📚 Books','🍳 Cooking','🎨 Art','🎬 Film','🌿 Nature','🧘 Yoga','🏋️ Gym','🧗 Climbing','⚽ Football','🎸 Guitar','💃 Dancing','🤿 Scuba','🚴 Cycling','🧑‍💻 Tech','☕ Coffee','🍷 Wine','🎤 K-pop','🌸 Anime & manga','🖤 Goth & alternative','🕹️ Esports','🧸 Cute culture']

const STEPS = ['basics', 'preferences', 'cv', 'prompts', 'interests', 'done']

export default function OnboardingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const codename = generateCodename()

  // Form state
  const [form, setForm] = useState({
    first_name: '', age: '', gender: '', languages: [] as string[],
    city: '', country: 'United Kingdom', region: '',
    preferred_age_min: 18, preferred_age_max: 50,
    preferred_genders: [] as string[], max_distance_km: 50,
    cv_file: null as File | null,
    skill_tags: [] as string[],
    selectedPrompts: [0, 1, 2],
    prompt_answers: ['', '', ''],
    intent: [] as string[],
    interests: [] as string[],
  })

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setForm(f => ({ ...f, cv_file: files[0] }))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'], 'image/*': ['.png','.jpg','.jpeg'] }, maxFiles: 1
  })

  const toggle = (key: 'intent' | 'interests' | 'preferred_genders' | 'languages', val: string) => {
    setForm(f => {
      const arr = f[key] as string[]
      return { ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }
    })
  }

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let cv_url = null
      let industry = null
      let cv_text = null
      if (form.cv_file) {
        const fd = new FormData()
        fd.append('file', form.cv_file)
        fd.append('skills', form.skill_tags.join(', '))
        const res = await fetch('/api/upload-cv', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Could not upload your CV. Please try again.')
        cv_url = data.cv_url ?? null
        industry = data.industry ?? null
        cv_text = data.cv_text ?? null
      }

      const prompts = form.selectedPrompts.map((pi, i) => ({
        question: PROMPTS[pi],
        answer: form.prompt_answers[i],
      })).filter(p => p.answer.trim().length > 0)

      const profileData = {
        id: user.id,
        codename,
        first_name: form.first_name,
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender,
        languages: form.languages,
        city: form.city,
        country: form.country,
        region: form.region,
        preferred_age_min: form.preferred_age_min,
        preferred_age_max: form.preferred_age_max,
        preferred_genders: form.preferred_genders,
        max_distance_km: form.max_distance_km,
        intent: form.intent,
        skill_tags: form.skill_tags,
        interests: form.interests,
        prompts,
        cv_url,
        industry,
        cv_text,
        folio_score: 0,
        is_active: true,
      }

      profileData.folio_score = calculateFolioScore(profileData as any)

      const { error: err } = await supabase.from('profiles').upsert(profileData)
      if (err) throw err

      next()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
    setLoading(false)
  }

  const progress = ((step) / (STEPS.length - 1)) * 100

  return (
    <main className="min-h-screen bg-app flex flex-col px-6 py-8">
      <div className="max-w-sm mx-auto w-full">
        {/* Progress */}
        {step < STEPS.length - 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-muted text-xs">Step {step + 1} of {STEPS.length - 1}</span>
              {step > 0 && <button onClick={back} className="text-text-muted text-sm">← Back</button>}
            </div>
            <div className="thread-bar"><div className="thread-bar-fill" style={{ width: `${progress}%` }} /></div>
          </div>
        )}

        {/* Step 0: Basics */}
        {step === 0 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold mb-1">Who are you?</h2>
            <p className="text-text-muted text-sm mb-6">The basics. We keep this private until Day 7.</p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">First name</label>
                <input className="input" placeholder="Your first name" value={form.first_name} onChange={e => setForm(f => ({...f, first_name: e.target.value}))} />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">Age</label>
                  <input className="input" type="number" placeholder="25" min="18" max="99" value={form.age} onChange={e => setForm(f => ({...f, age: e.target.value}))} />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">City</label>
                  <input className="input" placeholder="London" value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} />
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {['Man','Woman','Non-binary','Prefer not to say'].map(g => (
                    <button key={g} onClick={() => setForm(f => ({...f, gender: g.toLowerCase().replace(/ /g,'-')}))}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.gender === g.toLowerCase().replace(/ /g,'-') ? 'bg-primary text-app border-primary' : 'border-border text-text-muted hover:border-primary/50'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Languages spoken</label>
                <div className="flex flex-wrap gap-2">
                  {['English','French','Spanish','German','Italian','Portuguese','Arabic','Hindi','Mandarin','Japanese','Korean','Turkish','Russian','Ukrainian','Polish','Dutch','Swedish','Indonesian','Vietnamese','Thai','Bengali','Urdu','Tamil','Punjabi','Swahili'].map(lang => (
                    <button key={lang} onClick={() => toggle('languages', lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.languages.includes(lang) ? 'bg-primary text-app border-primary' : 'border-border text-text-muted hover:border-primary/50'}`}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-primary mt-8" onClick={next} disabled={!form.first_name || !form.age || !form.city}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 1: Preferences */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold mb-1">Your preferences</h2>
            <p className="text-text-muted text-sm mb-6">We use these as hard filters — only relevant matches.</p>
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">I&apos;m open to connecting with</label>
                <div className="flex flex-wrap gap-2">
                  {['Man','Woman','Non-binary','Anyone'].map(g => {
                    const value = g === 'Anyone' ? 'any' : g.toLowerCase().replace(/ /g,'-')
                    return <button key={g} onClick={() => toggle('preferred_genders', value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.preferred_genders.includes(value) ? 'bg-primary text-app border-primary' : 'border-border text-text-muted hover:border-primary/50'}`}>
                      {g}
                    </button>
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">
                  Age range: {form.preferred_age_min} – {form.preferred_age_max}
                </label>
                <div className="flex gap-3 items-center">
                  <input type="range" min="18" max="80" value={form.preferred_age_min} className="flex-1 accent-primary"
                    onChange={e => setForm(f => ({...f, preferred_age_min: parseInt(e.target.value)}))} />
                  <input type="range" min="18" max="80" value={form.preferred_age_max} className="flex-1 accent-primary"
                    onChange={e => setForm(f => ({...f, preferred_age_max: parseInt(e.target.value)}))} />
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">
                  Max distance: {form.max_distance_km} km
                </label>
                <input type="range" min="5" max="500" step="5" value={form.max_distance_km} className="w-full accent-primary"
                  onChange={e => setForm(f => ({...f, max_distance_km: parseInt(e.target.value)}))} />
                <div className="flex justify-between text-xs text-text-muted mt-1"><span>5km</span><span>500km</span></div>
              </div>
              <div>
                <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">I&apos;m here for</label>
                <div className="flex flex-wrap gap-2">
                  {[{v:'dating',l:'🔴 Dating'},{v:'long_term',l:'💍 Long-term relationship'},{v:'friends',l:'🔵 Friendship'},{v:'language_exchange',l:'🌍 Language exchange'},{v:'collab',l:'🟡 Collaboration'},{v:'mentor',l:'🟢 Mentorship'}].map(i => (
                    <button key={i.v} onClick={() => toggle('intent', i.v)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.intent.includes(i.v) ? 'bg-primary text-app border-primary' : 'border-border text-text-muted hover:border-primary/50'}`}>
                      {i.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn-primary mt-8" onClick={next} disabled={form.intent.length === 0}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: CV Upload */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold mb-1">Your Folio</h2>
            <p className="text-text-muted text-sm mb-6">Upload your CV — this is your profile. PDF or image, max 10MB.</p>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'}`}>
              <input {...getInputProps()} />
              {form.cv_file ? (
                <div>
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-primary font-medium">{form.cv_file.name}</p>
                  <p className="text-text-muted text-xs mt-1">{(form.cv_file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button onClick={e => { e.stopPropagation(); setForm(f => ({...f, cv_file: null})) }} className="text-error text-xs mt-2">Remove</button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-3">☁️</div>
                  <p className="text-text-main font-medium">Drop your CV here</p>
                  <p className="text-text-muted text-sm mt-1">or tap to browse</p>
                  <p className="text-text-muted text-xs mt-2">PDF, PNG, JPG · Max 10MB</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Or add skills manually</label>
              <input className="input" placeholder="e.g. Product Design, React, Strategy..." 
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') {
                  const val = (e.target as HTMLInputElement).value.replace(',','').trim()
                  if (val && form.skill_tags.length < 15) { setForm(f => ({...f, skill_tags: [...f.skill_tags, val]}));(e.target as HTMLInputElement).value = '' }
                }}} />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.skill_tags.map((s, i) => (
                  <span key={i} className="chip cursor-pointer" onClick={() => setForm(f => ({...f, skill_tags: f.skill_tags.filter((_,j)=>j!==i)}))}>
                    {s} ×
                  </span>
                ))}
              </div>
              <p className="text-text-muted text-xs mt-1">Press Enter or comma to add. Click to remove.</p>
            </div>
            <button className="btn-primary mt-8" onClick={next}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 3: Chapter Prompts */}
        {step === 3 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold mb-1">Your chapters</h2>
            <p className="text-text-muted text-sm mb-6">Answer 3 prompts. This is what people actually connect with.</p>
            {[0, 1, 2].map(idx => (
              <div key={idx} className="mb-5">
                <label className="text-xs text-text-muted uppercase tracking-wider mb-1 block">Prompt {idx + 1}</label>
                <select className="input mb-2" value={form.selectedPrompts[idx]}
                  onChange={e => setForm(f => { const sp = [...f.selectedPrompts]; sp[idx] = parseInt(e.target.value); return {...f, selectedPrompts: sp} })}>
                  {PROMPTS.map((p, pi) => <option key={pi} value={pi}>{p}</option>)}
                </select>
                <textarea className="input resize-none" rows={3} placeholder="Your answer (min 20 chars)..."
                  value={form.prompt_answers[idx]}
                  onChange={e => setForm(f => { const pa = [...f.prompt_answers]; pa[idx] = e.target.value; return {...f, prompt_answers: pa} })} />
                <p className="text-text-muted text-xs mt-1 text-right">{form.prompt_answers[idx].length} chars</p>
              </div>
            ))}
            <button className="btn-primary" onClick={next}
              disabled={form.prompt_answers.some(a => a.trim().length < 10)}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 4: Interests */}
        {step === 4 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold mb-1">Your vibe</h2>
            <p className="text-text-muted text-sm mb-6">Pick up to 8 interests. Shown to matches after Day 7.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {INTERESTS.map(i => (
                <button key={i} onClick={() => form.interests.length < 8 || form.interests.includes(i) ? toggle('interests', i) : null}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${form.interests.includes(i) ? 'bg-primary text-app border-primary' : 'border-border text-text-muted hover:border-primary/40'}`}>
                  {i}
                </button>
              ))}
            </div>
            {error && <p className="text-error text-sm mb-3">{error}</p>}
            <button className="btn-primary" onClick={submit} disabled={loading}>
              {loading ? '✨ Building your Folio...' : 'Create my Folio →'}
            </button>
          </div>
        )}

        {/* Step 5: Done */}
        {step === 5 && (
          <div className="animate-slide-up flex flex-col items-center text-center">
            <div className="mb-6">
              <GeometricAvatar codename={codename} size={96} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Your Folio is ready</h2>
            <p className="text-primary text-lg font-medium mb-1">{codename}</p>
            <p className="text-text-muted text-sm mb-8">That&apos;s you, until someone earns your name. ✨<br/>Your first 4 Folios arrive at <strong className="text-text-main">9AM tomorrow</strong>.</p>
            <button className="btn-primary" onClick={() => router.push('/app/today')}>
              Go to my Folio →
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
