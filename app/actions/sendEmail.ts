'use server'
import { Resend } from 'resend'
import { createServerSupabaseClient } from '@/app/lib/supabaseServer'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const carModel = formData.get('carModel') as string
  const problem = formData.get('problem') as string
  const file = formData.get('attachment') as File

  let attachmentBuffer: Buffer | null = null
  let attachmentName = ''

  if (file && file.size > 0 && file.size <= 10 * 1024 * 1024) {
    const bytes = await file.arrayBuffer()
    attachmentBuffer = Buffer.from(bytes)
    attachmentName = file.name
  }

  const htmlContent = `
    <h2>New Auto Doctor Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Customer Email:</strong> ${email}</p>
    <p><strong>Car Model:</strong> ${carModel || 'Not provided'}</p>
    <p><strong>Problem Description:</strong></p>
    <p>${problem.replace(/\n/g, '<br>')}</p>
    ${attachmentName ? `<p><strong>Attachment:</strong> ${attachmentName}</p>` : ''}
  `

  try {
    const { data, error } = await resend.emails.send({
      from: 'Auto Doctor Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'vakaijmazenge@gmail.com'],
      replyTo: email || undefined,
      subject: `Auto Doctor Inquiry from ${name}`,
      html: htmlContent,
      attachments: attachmentBuffer ? [
        {
          filename: attachmentName,
          content: attachmentBuffer.toString('base64'),
        }
      ] : undefined,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, message: 'Failed to send email. Please try WhatsApp.' }
    }

    return { success: true, message: 'Your inquiry has been sent. We will get back to you soon.' }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { success: false, message: 'Something went wrong. Please try WhatsApp.' }
  }
}