'use client' // needed for useState
import { useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaPhone, FaHome, FaTools, FaImages, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 font-sans" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          {/* Responsive Header */}
          <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  Auto Doctor
                </Link>
                {/* Desktop menu */}
                <div className="hidden md:flex space-x-8">
                  <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"><FaHome /> Home</Link>
                  <Link href="/services" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"><FaTools /> Services</Link>
                  <Link href="/gallery" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"><FaImages /> Gallery</Link>
                  <Link href="/contact" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"><FaEnvelope /> Contact</Link>
                </div>
                {/* Mobile menu button */}
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-gray-200">
                  <div className="flex flex-col space-y-3">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaHome /> Home</Link>
                    <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaTools /> Services</Link>
                    <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaImages /> Gallery</Link>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600"><FaEnvelope /> Contact</Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <main className="flex-grow">{children}</main>

          {/* Footer (same as before) */}
          <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div><h3 className="text-white text-xl font-bold mb-4">Auto Doctor</h3><p>Your trusted auto repair specialist in Harare.</p></div>
                <div><h4 className="text-white font-semibold mb-4">Quick Links</h4><ul className="space-y-2"><li><Link href="/" className="hover:text-white">Home</Link></li><li><Link href="/services" className="hover:text-white">Services</Link></li><li><Link href="/gallery" className="hover:text-white">Gallery</Link></li><li><Link href="/contact" className="hover:text-white">Contact</Link></li></ul></div>
                <div><h4 className="text-white font-semibold mb-4">Contact</h4><p><FaWhatsapp className="inline mr-2 text-green-400" /> <a href="https://wa.me/263776327772">077 632 772</a></p><p><FaPhone className="inline mr-2" /> <a href="tel:+263776327772">077 632 772</a></p><p className="mt-2">© {new Date().getFullYear()} Auto Doctor. All rights reserved.</p></div>
              </div>
            </div>
          </footer>

          {/* Floating WhatsApp */}
          <a href="https://wa.me/263776327772" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110"><FaWhatsapp size={24} /></a>
        </div>
      </body>
    </html>
  )
}