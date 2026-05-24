import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import Link from 'next/link'
import { FaWrench, FaCar, FaBolt, FaMicrochip } from 'react-icons/fa'

export default async function ServicesListPage() {
  const supabase = await createServerSupabaseClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const iconMap= {
    engine: <FaCar className="text-4xl text-blue-600" />,
    electrical: <FaBolt className="text-4xl text-yellow-600" />,
    diagnostics: <FaMicrochip className="text-4xl text-green-600" />,
    default: <FaWrench className="text-4xl text-gray-600" />,
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services?.map((service) => (
          <Link key={service.id} href={`/services/${service.slug}`} className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6">
            <div className="mb-3">{iconMap[service.icon as keyof typeof iconMap] || iconMap.default}</div>
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600 mt-2">{service.description?.substring(0, 120)}...</p>
            <span className="inline-block mt-4 text-blue-600">Read more →</span>
          </Link>
        ))}
      </div>
      {(!services || services.length === 0) && (
        <p className="text-center text-gray-500 py-12">No services listed yet. Check back soon.</p>
      )}
    </div>
  )
}