'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Send, Lock, Unlock, Flame } from 'lucide-react'
import { GeometricAvatar } from '@/lib/avatar'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id: string
  thread_id: string
  sender_id: string
  content: string
  created_at: string
}

export default function ThreadChatClient({
  thread: initialThread,
  partner,
  initialMessages,
  currentUserId,
  initialTodayCount,
}: {
  thread: any
  partner: any
  initialMessages: Message[]
  currentUserId: string
  initialTodayCount: number
}) {
  const router = useRouter()
  const supabase = createClient()
  const [thread, setThread] = useState(initialThread)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [todayCount, setTodayCount] = useState(initialTodayCount)
  const [confirming, setConfirming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isUserA = thread.user_a === currentUserId
  const isConfirmedToday = isUserA ? thread.user_a_confirmed : thread.user_b_confirmed
  const isUnlockedDay7 = thread.day_count >= 7
  const maxMessages = isUnlockedDay7 ? Infinity : 5
  const remainingMessages = Math.max(0, 5 - todayCount)

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel(`chat_${thread.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `thread_id=eq.${thread.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev
            return [...prev, newMsg]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [thread.id, supabase])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || sending) return
    if (!isUnlockedDay7 && todayCount >= 5) return

    setSending(true)
    const text = input.trim()
    setInput('')

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: thread.id, content: text }),
      })
      if (!res.ok) {
        const err = await res.json()
        alert(err.error || 'Failed to send')
        setInput(text)
      } else {
        const data = await res.json()
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) return prev
          return [...prev, data.message]
        })
        setTodayCount((c) => c + 1)
      }
    } catch {
      setInput(text)
    } finally {
      setSending(false)
    }
  }

  const handleConfirm = async (decision: 'yes' | 'no') => {
    setConfirming(true)
    try {
      const res = await fetch('/api/threads/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: thread.id, decision }),
      })
      const data = await res.json()
      if (data.status === 'ended') {
        router.push('/app/threads')
      } else if (data.thread) {
        setThread(data.thread)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setConfirming(false)
    }
  }

  const milestones = [
    { day: 7, label: 'First Name & Photo' },
    { day: 14, label: 'Full CV & History' },
    { day: 21, label: 'Direct Links' },
    { day: 30, label: 'Permanent Match' },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Header & Milestones */}
      <div className="border-b border-border bg-card/60 p-4 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => router.push('/app/threads')} className="text-text-muted hover:text-text-main">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <GeometricAvatar codename={partner?.codename || 'partner'} size={28} />
            <span className="font-bold text-sm">
              {thread.day_count >= 7 && partner?.first_name ? `${partner.first_name} (${partner.codename})` : partner?.codename}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gold text-xs font-bold">
            <Flame size={14} /> Day {thread.day_count}/30
          </div>
        </div>

        {/* Milestone Tracker */}
        <div className="flex items-center justify-between gap-1 mt-2">
          {milestones.map((m) => {
            const unlocked = thread.day_count >= m.day
            return (
              <div
                key={m.day}
                className={`flex-1 py-1 px-1.5 rounded text-[10px] text-center border ${
                  unlocked
                    ? 'border-primary/40 bg-primary/10 text-primary font-semibold'
                    : 'border-border/40 bg-app/40 text-text-muted'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {unlocked ? <Unlock size={10} /> : <Lock size={10} />}
                  <span>Day {m.day}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Daily Confirmation Banner */}
        {!isConfirmedToday && thread.status === 'active' && (
          <div className="mt-3 p-2.5 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-between">
            <span className="text-xs text-text-main font-medium">Continue Thread for Day {thread.day_count + 1}?</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleConfirm('no')}
                disabled={confirming}
                className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-text-muted"
              >
                No
              </button>
              <button
                onClick={() => handleConfirm('yes')}
                disabled={confirming}
                className="text-xs px-3 py-1 rounded bg-primary text-app font-bold"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {messages.length === 0 ? (
          <div className="my-auto text-center p-6 text-text-muted text-sm">
            <p className="mb-2">🎉 Thread initiated.</p>
            <p className="text-xs">
              {!isUnlockedDay7
                ? 'High friction connection: limited to 5 messages per day until Day 7 unlock.'
                : 'Free chat unlocked.'}
            </p>
          </div>
        ) : (
          messages.map((m) => {
            const isMe = m.sender_id === currentUserId
            return (
              <div key={m.id} className={isMe ? 'bubble-sent' : 'bubble-recv'}>
                <p className="break-words">{m.content}</p>
                <span className="text-[10px] opacity-60 mt-1 block text-right">
                  {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-border bg-card/60 shrink-0">
        {!isUnlockedDay7 && (
          <div className="text-[11px] text-text-muted mb-1.5 flex justify-between">
            <span>Daily message limit:</span>
            <span className={remainingMessages === 0 ? 'text-coral font-bold' : 'text-primary'}>
              {remainingMessages} of 5 remaining today
            </span>
          </div>
        )}

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="input !py-2.5 text-sm"
            placeholder={
              !isUnlockedDay7 && remainingMessages === 0
                ? 'Limit reached for today. Resets tomorrow.'
                : 'Write a thoughtful message...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={(!isUnlockedDay7 && remainingMessages === 0) || sending}
          />
          <button
            type="submit"
            disabled={(!isUnlockedDay7 && remainingMessages === 0) || !input.trim() || sending}
            className="btn-primary !w-auto !py-2.5 !px-4 flex items-center justify-center shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
