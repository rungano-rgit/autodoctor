import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { notFound, redirect } from 'next/navigation'
import { FaSave } from 'react-icons/fa'

async function updateImage(id: number, formData: FormData) {
  'use server'
  const supabase = await createServerSupabaseClient()
  const title = formData.get('title') as string
  const beforeAfter = formData.get('before_after') === 'on'

  await supabase.from('gallery_images').update({ title, before_after: beforeAfter }).eq('id', id)
  redirect('/admin/gallery')
}

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: image } = await supabase.from('gallery_images').select('*').eq('id', params.id).single()
  if (!image) notFound()

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Image</h1>
      <form action={updateImage.bind(null, image.id)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input name="title" defaultValue={image.title || ''} className="w-full border p-2 rounded" />
        </div>
        <div className="relative h-48 mb-2">
          <img src={image.image_url} alt={image.title} className="object-contain w-full h-full" />
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="before_after" defaultChecked={image.before_after || false} /> Before/After pair
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaSave /> Save Changes</button>
      </form>
    </div>
  )
}