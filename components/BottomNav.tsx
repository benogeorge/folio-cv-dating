'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Link2, MessageCircle, User, Zap } from 'lucide-react'

const NAV = [
  { href: '/app/today',    icon: Home,          label: 'Today' },
  { href: '/app/threads',  icon: Link2,         label: 'Threads' },
  { href: '/app/messages', icon: MessageCircle, label: 'Messages' },
  { href: '/app/folio',    icon: User,          label: 'My Folio' },
  { href: '/app/sparks',   icon: Zap,           label: 'Sparks' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="bottom-nav">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = path.startsWith(href)
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-0.5 min-w-[52px]">
            <Icon size={22} className={active ? 'text-primary' : 'text-text-muted'} />
            <span className={`text-[10px] font-medium ${active ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
