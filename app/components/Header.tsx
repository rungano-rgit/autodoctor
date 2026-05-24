'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaTools, FaImages, FaEnvelope } from 'react-icons/fa'

const navItems = [
  { href: '/', label: 'Home', icon: <FaHome /> },
  { href: '/services', label: 'Services', icon: <FaTools /> },
  { href: '/gallery', label: 'Gallery', icon: <FaImages /> },
  { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-[0_16px_50px_rgba(0,0,0,0.35)] border-b border-slate-600/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-amber-300 hover:text-amber-200 transition duration-300"
          >
            Auto Doctor
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      active ? 'text-amber-300' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </span>
                  </Link>
                  <span
                    className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          <div className="md:hidden">
            <button className="text-slate-200 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}