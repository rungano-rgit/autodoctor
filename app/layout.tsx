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

  const isActive = (href: string) => {
    if (href === '/services') return pathname === '/services' || pathname.startsWith('/services/')
    return pathname === href
  }

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-slate-800 antialiased" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          {/* Sticky Navbar with Glassmorphism */}
          <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 md:h-20">
                {/* Logo + Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                  <img
                    src="/mmad-logo.jpeg"
                    alt="MMAD Auto Doctor"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-navy via-royal to-purple bg-clip-text text-transparent">
                      Auto Doctor
                    </span>
                    <span className="text-[11px] md:text-xs font-medium text-gold tracking-wide">MMAD • Your Car's Health, Our Priority</span>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2 lg:gap-4">
                  {navLinks.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                        isActive(href)
                          ? 'bg-gradient-to-r from-navy to-royal text-white shadow-md'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-royal'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {icon}
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                >
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>

              {/* Mobile Dropdown */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
                  <div className="flex flex-col space-y-2">
                    {navLinks.map(({ href, label, icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                          isActive(href)
                            ? 'bg-gradient-to-r from-navy to-royal text-white'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-royal'
                        }`}
                      >
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

          {/* Professional Footer */}
          <footer className="bg-navy text-slate-200 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/mmad-logo.jpeg" alt="MMAD" className="h-12 w-12 rounded-full object-cover" />
                    <span className="text-2xl font-bold text-gold">Auto Doctor</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Your trusted auto repair specialist in Harare. Fast diagnostics, quality repairs, transparent pricing.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="hover:text-gold transition">Home</Link></li>
                    <li><Link href="/services" className="hover:text-gold transition">Services</Link></li>
                    <li><Link href="/gallery" className="hover:text-gold transition">Gallery</Link></li>
                    <li><Link href="/contact" className="hover:text-gold transition">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
                  <p className="flex items-center gap-2 mb-2">
                    <FaWhatsapp className="text-emerald-400" />
                    <a href="https://wa.me/263777632772" className="hover:text-gold transition">077 632 7772</a>
                  </p>
                  <p className="flex items-center gap-2 mb-4">
                    <FaPhone className="text-slate-300" />
                    <a href="tel:+263777632772" className="hover:text-gold transition">077 632 7772</a>
                  </p>
                  <p className="text-sm text-slate-400">© {new Date().getFullYear()} Auto Doctor. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>

          {/* Floating WhatsApp Button (FAB) */}
          <a
            href="https://wa.me/263777632772"
            className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </body>
    </html>
  )
}