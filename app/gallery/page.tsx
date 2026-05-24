import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import Image from 'next/image'

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Our Work Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((img) => (
          <div key={img.id} className="bg-white rounded shadow overflow-hidden">
            <div className="relative h-56">
              <Image src={img.image_url} alt={img.title || 'Workshop photo'} fill className="object-cover" />
            </div>
            {img.title && <div className="p-2 text-center">{img.title}</div>}
          </div>
        ))}
      </div>
      {(!images || images.length === 0) && (
        <p className="text-center text-gray-500 py-12">No images yet. Check back soon.</p>
      )}
    </div>
  )
}