import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Calendar } from 'lucide-react'
import { articles } from '../page'

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://cvdating.app/news/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://cvdating.app/news/${slug}`,
      siteName: 'NoSwipe',
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    publisher: { '@type': 'Organization', name: 'NoSwipe', url: 'https://cvdating.app' },
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-[#252923]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">NoSwipe<span className="text-[#45634b]">.</span></Link>
        <Link href="/news" className="text-sm text-[#4e554d] hover:text-[#252923]">← All articles</Link>
      </header>

      <article className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#45634b]">{article.category}</span>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-base leading-7 text-[#6c7068]">{article.description}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#9ca3af]">
          <Calendar size={12} />
          <span>{new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        <div
          className="prose prose-sm mt-10 max-w-none text-[#252923] prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-8 prose-h2:text-xl prose-h3:mt-6 prose-h3:text-base prose-p:leading-7 prose-p:text-[#4e554d] prose-li:text-[#4e554d] prose-a:text-[#45634b]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 rounded-2xl bg-[#345b40] p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#c6dbc8]">Try NoSwipe — it is free</p>
          <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em]">Stop swiping. Get real introductions.</h2>
          <p className="mt-2 text-sm text-[#d5ded5]">Up to 4 curated daily introductions. Dating, friendship, language exchange. No subscription needed.</p>
          <Link href="/connections" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#345b40] transition hover:bg-[#edf3ec]">
            Get started free <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 border-t border-[#e4e2dc] pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#45634b]">More articles</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {articles.filter(a => a.slug !== slug).slice(0, 4).map(a => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="rounded-xl border border-[#e4e2dc] bg-white p-4 text-sm font-medium text-[#252923] transition hover:border-[#45634b]">
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-[#5d645a] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span>© 2025 NoSwipe — The no-swipe dating app</span>
        <Link href="/" className="underline underline-offset-2">Home</Link>
      </footer>
    </main>
  )
}
