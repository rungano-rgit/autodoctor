
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import Header from './components/Header'

export const metadata: Metadata = {
  title: 'Auto Doctor – Mileage Masters',
  description: 'Professional car diagnostics and repairs in Harare',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 font-sans" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">{children}</main>

          <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-white text-xl font-bold mb-4">Auto Doctor</h3>
                  <p>Your trusted auto repair specialist in Harare. Quality workmanship, transparent pricing.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="hover:text-white transition">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="hover:text-white transition">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/gallery" className="hover:text-white transition">
                        Gallery
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white transition">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Contact</h4>
                  <p className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-400" />
                    <a href="https://wa.me/263776327772">077 632 7772</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-slate-200" />
                    <a href="tel:+263776327772">077 632 7772</a>
                  </p>
                  <p className="mt-2">© {new Date().getFullYear()} Auto Doctor. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>

          <a
            href="https://wa.me/263776327772"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50 hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </body>
    </html>
  )
}