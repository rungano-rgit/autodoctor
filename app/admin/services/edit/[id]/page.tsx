import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { notFound, redirect } from 'next/navigation'
import { FaSave } from 'react-icons/fa'

async function updateService(id: number, formData: FormData) {
  'use server'
  const supabase = await createServerSupabaseClient()
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const symptoms = formData.get('symptoms') as string
  const why_matters = formData.get('why_matters') as string
  const icon = formData.get('icon') as string
  const sort_order = parseInt(formData.get('sort_order') as string) || 0
  const is_active = formData.get('is_active') === 'on'

  await supabase
    .from('services')
    .update({ name, slug, description, symptoms, why_matters, icon, sort_order, is_active })
    .eq('id', id)
  redirect('/admin/services')
}

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('id', params.id)
    .single()
  if (!service) notFound()

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Service</h1>
      <form action={updateService.bind(null, service.id)} className="space-y-4">
        <div><label className="block font-medium">Name</label><input name="name" defaultValue={service.name} required className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Slug</label><input name="slug" defaultValue={service.slug} required className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Description</label><textarea name="description" defaultValue={service.description || ''} rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Symptoms</label><textarea name="symptoms" defaultValue={service.symptoms || ''} rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Why it matters</label><textarea name="why_matters" defaultValue={service.why_matters || ''} rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Icon</label><input name="icon" defaultValue={service.icon || ''} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Sort order</label><input name="sort_order" type="number" defaultValue={service.sort_order} className="w-full border p-2 rounded" /></div>
        <div><label className="inline-flex items-center gap-2"><input type="checkbox" name="is_active" defaultChecked={service.is_active} /> Active on frontend</label></div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaSave /> Update Service</button>
      </form>
    </div>
  )
}