import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { FaWrench, FaImages, FaStar } from 'react-icons/fa'

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()
  const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true })
  const { count: galleryCount } = await supabase.from('gallery_images').select('*', { count: 'exact', head: true })
  const { count: reviewsCount } = await supabase.from('reviews').select('*', { count: 'exact', head: true })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow flex items-center gap-4">
          <FaWrench className="text-3xl text-blue-600" />
          <div><div className="text-2xl font-bold">{servicesCount || 0}</div><div>Services</div></div>
        </div>
        <div className="bg-white p-6 rounded shadow flex items-center gap-4">
          <FaImages className="text-3xl text-green-600" />
          <div><div className="text-2xl font-bold">{galleryCount || 0}</div><div>Gallery Images</div></div>
        </div>
        <div className="bg-white p-6 rounded shadow flex items-center gap-4">
          <FaStar className="text-3xl text-yellow-600" />
          <div><div className="text-2xl font-bold">{reviewsCount || 0}</div><div>Reviews</div></div>
        </div>
      </div>
    </div>
  )
}