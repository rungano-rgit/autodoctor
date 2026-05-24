import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import Link from 'next/link'
import { FaWrench, FaCar, FaBolt, FaMicrochip, FaWhatsapp, FaPhone  } from 'react-icons/fa'

export default async function Home() {
  const supabase = await createServerSupabaseClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
    .limit(4)
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(3)

  const iconMap = {
    engine: <FaCar className="text-3xl text-blue-600" />,
    electrical: <FaBolt className="text-3xl text-yellow-600" />,
    diagnostics: <FaMicrochip className="text-3xl text-green-600" />,
    default: <FaWrench className="text-3xl text-gray-600" />,
  }

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Mileage Masters t/a Auto Doctor</h1>
    <p className="text-xl md:text-2xl mt-4 text-blue-100">Your car's health, our priority</p>
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <a href="https://wa.me/263776327772" className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <FaWhatsapp size={24} /> WhatsApp Us
      </a>
      <a href="tel:+263776327772" className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <FaPhone size={24} /> Call Now
      </a>
    </div>
  </div>
</section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Main Services</h2>
    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Professional diagnostics, repairs, and maintenance for all makes and models</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services?.map((service) => (
        <div key={service.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="p-6">
            <div className="mb-4">{iconMap[service.icon as keyof typeof iconMap] || iconMap.default}</div>
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description?.substring(0, 100)}...</p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center mt-4 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">Learn more →</Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Reviews */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews?.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded shadow">
                <p className="italic">"{review.review_text}"</p>
                <div className="mt-3 font-semibold">{review.customer_name}</div>
                {review.customer_car && <div className="text-sm text-gray-500">{review.customer_car}</div>}
                <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}