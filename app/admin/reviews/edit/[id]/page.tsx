import { createServerSupabaseClient } from '@/app/lib/supabaseServer'
import { notFound, redirect } from 'next/navigation'
import { FaSave } from 'react-icons/fa'

async function updateReview(id: number, formData: FormData) {
  'use server'
  const supabase = await createServerSupabaseClient()
  const customer_name = formData.get('customer_name') as string
  const customer_car = formData.get('customer_car') as string
  const rating = parseInt(formData.get('rating') as string)
  const review_text = formData.get('review_text') as string
  const is_approved = formData.get('is_approved') === 'on'

  await supabase
    .from('reviews')
    .update({ customer_name, customer_car, rating, review_text, is_approved })
    .eq('id', id)

  redirect('/admin/reviews')
}

export default async function EditReviewPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: review } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!review) notFound()

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Review</h1>
      <form action={updateReview.bind(null, review.id)} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Customer Name</label>
          <input name="customer_name" defaultValue={review.customer_name} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Car Model</label>
          <input name="customer_car" defaultValue={review.customer_car || ''} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select name="rating" defaultValue={review.rating} className="w-full border p-2 rounded">
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Review Text</label>
          <textarea name="review_text" rows={4} defaultValue={review.review_text} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="is_approved" defaultChecked={review.is_approved} />
            Approved (visible on frontend)
          </label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaSave /> Update Review
        </button>
      </form>
    </div>
  )
}