'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaWhatsapp, FaPhone, FaHome, FaTools, FaImages, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home', icon: <FaHome /> },
    { href: '/services', label: 'Services', icon: <FaTools /> },
    { href: '/gallery', label: 'Gallery', icon: <FaImages /> },
    { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ]

  const tabClasses = (href: string) => {
    const active = href === '/services'
      ? pathname === '/services' || pathname.startsWith('/services/')
      : pathname === href
    return `inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full transition duration-200 ${active ? 'text-white border-b-4 border-emerald-400 bg-white/5' : 'text-slate-200 border-b-4 border-transparent hover:text-cyan-200 hover:border-blue-400'}`
  }

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-slate-100 shadow-2xl border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center gap-3">
                  <img src="/logo-emblem.svg" alt="Auto Doctor emblem" className="brand-emblem h-10 w-10 md:h-12 md:w-12" />
                  <span className="brand-text text-xl md:text-2xl font-extrabold">Auto Doctor</span>
                </Link>
                <div className="hidden md:flex items-center gap-3">
                  {navLinks.map(({ href, label, icon }) => (
                    <Link key={href} href={href} className={tabClasses(href)}>
                      {icon}
                      {label}
                    </Link>
                  ))}
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-100 hover:text-cyan-200 transition duration-200 p-2 rounded-lg">
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-slate-800 bg-slate-950">
                  <div className="flex flex-col space-y-3 text-slate-100">
                    {navLinks.map(({ href, label, icon }) => (
                      <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-cyan-200">
                        {icon}
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
          <main className="flex-grow">{children}</main>
          <footer className="bg-[#0b2545] text-slate-200 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div><h3 className="text-2xl font-bold text-white mb-4">Auto Doctor</h3><p className="max-w-sm text-slate-300">Your trusted auto repair specialist in Harare, delivering fast diagnostics and dependable repairs.</p></div>
                <div><h4 className="text-white font-semibold mb-4">Quick Links</h4><ul className="space-y-3 text-slate-300"><li><Link href="/" className="hover:text-white transition">Home</Link></li><li><Link href="/services" className="hover:text-white transition">Services</Link></li><li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li><li><Link href="/contact" className="hover:text-white transition">Contact</Link></li></ul></div>
                <div><h4 className="text-white font-semibold mb-4">Contact</h4><p className="text-slate-300"><FaWhatsapp className="inline mr-2 text-emerald-400" /> <a href="https://wa.me/263776327772" className="hover:text-white">077 632 7772</a></p><p className="text-slate-300"><FaPhone className="inline mr-2 text-slate-200" /> <a href="tel:+263776327772" className="hover:text-white">077 632 7772</a></p><p className="mt-4 text-sm text-slate-400">© {new Date().getFullYear()} Auto Doctor. All rights reserved.</p></div>
              </div>
            </div>
          </footer>
          <a href="https://wa.me/263776327772" aria-label="Contact us on WhatsApp" className="whatsapp-fab">
            <FaWhatsapp size={24} />
          </a>
        </div>
      </body>
    </html>
  )
}