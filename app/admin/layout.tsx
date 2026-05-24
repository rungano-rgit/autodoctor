'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/app/lib/supabaseClient'
import { FaTachometerAlt, FaWrench, FaImages, FaStar, FaSignOutAlt, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSidebar}></div>
      )}
      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 h-full shadow-2xl`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Auto Doctor Admin</h2>
          <button onClick={toggleSidebar} className="md:hidden text-white"><FaTimes size={20} /></button>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition" onClick={() => setSidebarOpen(false)}><FaTachometerAlt /> Dashboard</Link>
          <Link href="/admin/services" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition" onClick={() => setSidebarOpen(false)}><FaWrench /> Services</Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition" onClick={() => setSidebarOpen(false)}><FaImages /> Gallery</Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition" onClick={() => setSidebarOpen(false)}><FaStar /> Reviews</Link>
          <Link href="/admin/help" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition" onClick={() => setSidebarOpen(false)}><FaQuestionCircle /> Help</Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 transition mt-8"><FaSignOutAlt /> Logout</button>
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1">
        <div className="md:hidden bg-white p-3 shadow-sm sticky top-0 z-10">
          <button onClick={toggleSidebar} className="text-gray-700"><FaBars size={24} /></button>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}