import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { redirect } from 'next/navigation'
import { FaSave } from 'react-icons/fa'

async function createService(formData: FormData) {
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

  await supabase.from('services').insert({
    name, slug, description, symptoms, why_matters, icon, sort_order, is_active
  })
  redirect('/admin/services')
}

export default function NewServicePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Service</h1>
      <form action={createService} className="space-y-4">
        <div><label className="block font-medium">Name *</label><input name="name" required className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Slug (URL) *</label><input name="slug" required className="w-full border p-2 rounded" placeholder="e.g., engine-repair-harare" /></div>
        <div><label className="block font-medium">Description</label><textarea name="description" rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Symptoms (HTML allowed)</label><textarea name="symptoms" rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Why it matters</label><textarea name="why_matters" rows={3} className="w-full border p-2 rounded" /></div>
        <div><label className="block font-medium">Icon</label><input name="icon" className="w-full border p-2 rounded" placeholder="engine, electrical, diagnostics, default" /></div>
        <div><label className="block font-medium">Sort order</label><input name="sort_order" type="number" className="w-full border p-2 rounded" defaultValue="0" /></div>
        <div><label className="inline-flex items-center gap-2"><input type="checkbox" name="is_active" defaultChecked /> Active on frontend</label></div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaSave /> Save Service</button>
      </form>
    </div>
  )
}