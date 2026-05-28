'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaPhone, FaHome, FaTools, FaImages, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-700 to-cyan-500 bg-clip-text text-transparent">
                  Auto Doctor
                </Link>
                <div className="hidden md:flex items-center gap-4">
                  <Link href="/" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition duration-200"><FaHome /> Home</Link>
                  <Link href="/services" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition duration-200"><FaTools /> Services</Link>
                  <Link href="/gallery" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition duration-200"><FaImages /> Gallery</Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition duration-200"><FaEnvelope /> Contact</Link>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-700 hover:text-slate-900 transition duration-200 p-2 rounded-lg">
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-gray-200">
                  <div className="flex flex-col space-y-3">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaHome /> Home</Link>
                    <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaTools /> Services</Link>
                    <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaImages /> Gallery</Link>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2"><FaEnvelope /> Contact</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
          <main className="flex-grow">{children}</main>
          <footer className="bg-slate-950 text-slate-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div><h3 className="text-2xl font-bold text-white mb-4">Auto Doctor</h3><p className="max-w-sm text-slate-400">Your trusted auto repair specialist in Harare, delivering fast diagnostics and dependable repairs.</p></div>
                <div><h4 className="text-white font-semibold mb-4">Quick Links</h4><ul className="space-y-3 text-slate-400"><li><Link href="/" className="hover:text-white transition">Home</Link></li><li><Link href="/services" className="hover:text-white transition">Services</Link></li><li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li><li><Link href="/contact" className="hover:text-white transition">Contact</Link></li></ul></div>
                <div><h4 className="text-white font-semibold mb-4">Contact</h4><p className="text-slate-400"><FaWhatsapp className="inline mr-2 text-emerald-400" /> <a href="https://wa.me/263776327772" className="hover:text-white">077 632 7772</a></p><p className="text-slate-400"><FaPhone className="inline mr-2 text-slate-200" /> <a href="tel:+263776327772" className="hover:text-white">077 632 7772</a></p><p className="mt-4 text-sm text-slate-500">© {new Date().getFullYear()} Auto Doctor. All rights reserved.</p></div>
              </div>
            </div>
          </footer>
          <a href="https://wa.me/263776327772" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110"><FaWhatsapp size={24} /></a>
        </div>
      </body>
    </html>
  )
}