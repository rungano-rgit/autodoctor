import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { redirect } from 'next/navigation'
import { FaUpload } from 'react-icons/fa'

async function uploadImage(formData: FormData) {
  'use server'
  const supabase = await createServerSupabaseClient()
  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const beforeAfter = formData.get('before_after') === 'on'

  if (!file) throw new Error('No file provided')

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })
  if (uploadError) throw new Error(uploadError.message)

  const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName)

  await supabase.from('gallery_images').insert({
    title: title || null,
    image_url: publicUrl,
    before_after: beforeAfter,
    sort_order: 0,
  })
  redirect('/admin/gallery')
}

export default function NewGalleryPage() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaUpload /> Upload New Image</h1>
      <form action={uploadImage} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Image File *</label>
          <input type="file" name="file" accept="image/*" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Title (optional)</label>
          <input type="text" name="title" className="w-full border p-2 rounded" placeholder="e.g., Engine rebuild" />
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="before_after" /> This is a before/after pair
          </label>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaUpload /> Upload</button>
      </form>
    </div>
  )
}