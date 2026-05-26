import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { notFound } from 'next/navigation'

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .single()
  if (!service) notFound()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.description || '' }} />
      {service.symptoms && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h2 className="text-2xl font-semibold">Common Symptoms</h2>
          <div dangerouslySetInnerHTML={{ __html: service.symptoms }} />
        </div>
      )}
      {service.why_matters && (
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h2 className="text-2xl font-semibold">Why It Matters</h2>
          <div dangerouslySetInnerHTML={{ __html: service.why_matters }} />
        </div>
      )}
      <a href={`https://wa.me/263776327772?text=I'm%20interested%20in%20${encodeURIComponent(service.name)}`}
         className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg">
        Get a Quote via WhatsApp
      </a>
    </div>
  )
}