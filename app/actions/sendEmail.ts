'use server'
import { createServerSupabaseClient } from '@/app/lib/supabaseServer'

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const carModel = formData.get('carModel') as string
  const problem = formData.get('problem') as string
  const file = formData.get('attachment') as File

  // Upload file to Supabase Storage temporarily
  let fileUrl = ''
  if (file && file.size > 0) {
    const supabase = await createServerSupabaseClient()
    const fileName = `contact_${Date.now()}_${file.name}`
    const { data, error } = await supabase.storage
      .from('contact-attachments')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    if (!error && data) {
      const { data: { publicUrl } } = supabase.storage.from('contact-attachments').getPublicUrl(fileName)
      fileUrl = publicUrl
    }
  }

  // For now, just return success and log – we'll use Resend later
  console.log({ name, email, carModel, problem, fileUrl })
  return { success: true, message: 'Inquiry sent. We will get back to you soon.' }
}