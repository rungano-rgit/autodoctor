'use client'
import { createBrowserSupabaseClient } from '@/app/lib/supabaseClient'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
    setImages(data || [])
    setLoading(false)
  }

  async function deleteImage(id: number, imageUrl: string) {
    if (!confirm('Delete this image permanently?')) return
    const path = imageUrl.split('/').pop()
    if (path) await supabase.storage.from('gallery').remove([path])
    await supabase.from('gallery_images').delete().eq('id', id)
    router.refresh()
    fetchImages()
  }

  if (loading) return <div className="p-6">Loading gallery...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery Images</h1>
        <Link href="/admin/gallery/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add Image
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded shadow overflow-hidden">
            <div className="relative h-48">
              <Image src={img.image_url} alt={img.title || 'Image'} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="font-semibold">{img.title || 'Untitled'}</p>
              <div className="flex justify-end gap-3 mt-2">
                <Link href={`/admin/gallery/edit/${img.id}`} className="text-blue-600"><FaEdit /></Link>
                <button onClick={() => deleteImage(img.id, img.image_url)} className="text-red-600"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-12">No images yet. Click "Add Image" to upload.</div>
      )}
    </div>
  )
}