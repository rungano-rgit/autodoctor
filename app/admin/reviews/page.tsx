import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa'

async function toggleApproval(id: number, currentStatus: boolean) {
  'use server'
  const supabase = await createServerSupabaseClient()
  await supabase.from('reviews').update({ is_approved: !currentStatus }).eq('id', id)
  redirect('/admin/reviews')
}

async function deleteReview(id: number) {
  'use server'
  const supabase = await createServerSupabaseClient()
  await supabase.from('reviews').delete().eq('id', id)
  redirect('/admin/reviews')
}

export default async function AdminReviewsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: reviews } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Reviews</h1>
        <Link href="/admin/reviews/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add Review
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr><th className="p-3 text-left">Customer</th><th>Car</th><th>Rating</th><th>Review</th><th>Approved</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {reviews?.map((review) => (
              <tr key={review.id} className="border-t">
                <td className="p-3">{review.customer_name}</td>
                <td className="p-3">{review.customer_car || '-'}</td>
                <td className="p-3"><div className="flex text-yellow-500">{Array(5).fill(0).map((_, i) => <FaStar key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} />)}</div></td>
                <td className="p-3 max-w-xs truncate">{review.review_text}</td>
                <td className="p-3">{review.is_approved ? <span className="text-green-600"><FaCheckCircle /> Yes</span> : <span className="text-red-600"><FaTimesCircle /> No</span>}</td>
                <td className="p-3 space-x-3">
                  <form action={toggleApproval.bind(null, review.id, review.is_approved)} className="inline"><button type="submit" className="text-blue-600">{review.is_approved ? 'Unapprove' : 'Approve'}</button></form>
                  <Link href={`/admin/reviews/edit/${review.id}`} className="text-indigo-600 ml-2">Edit</Link>
                  <form action={deleteReview.bind(null, review.id)} className="inline ml-2"><button type="submit" className="text-red-600">Delete</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}