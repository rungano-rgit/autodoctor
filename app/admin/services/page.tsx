import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'

async function deleteService(id: number) {
  'use server'
  const supabase = await createServerSupabaseClient()
  await supabase.from('services').delete().eq('id', id)
  redirect('/admin/services')
}

async function toggleActive(id: number, current: boolean) {
  'use server'
  const supabase = await createServerSupabaseClient()
  await supabase.from('services').update({ is_active: !current }).eq('id', id)
  redirect('/admin/services')
}

export default async function AdminServicesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link href="/admin/services/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> New Service
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <tr key={service.id} className="border-t">
                <td className="p-3">{service.name}</td>
                <td className="p-3">{service.slug}</td>
                <td className="p-3">
                  <form action={toggleActive.bind(null, service.id, service.is_active)}>
                    <button type="submit" className="text-xl">
                      {service.is_active ? <FaToggleOn className="text-green-600" /> : <FaToggleOff className="text-gray-400" />}
                    </button>
                  </form>
                </td>
                <td className="p-3 space-x-3">
                  <Link href={`/admin/services/edit/${service.id}`} className="text-blue-600"><FaEdit className="inline mr-1" /> Edit</Link>
                  <form action={deleteService.bind(null, service.id)} className="inline">
                    <button type="submit" className="text-red-600" onClick={(e) => { if (!confirm('Delete this service?')) e.preventDefault(); }}><FaTrash className="inline mr-1" /> Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(!services || services.length === 0) && (
        <div className="text-center text-gray-500 py-12">No services yet. Click "New Service" to add one.</div>
      )}
    </div>
  )
}