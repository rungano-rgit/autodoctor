'use client'
import { useState, useTransition } from 'react'
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperclip, FaSpinner } from 'react-icons/fa'
import { sendEmail } from '@/app/actions/sendEmail'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [carModel, setCarModel] = useState('')
  const [problem, setProblem] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isPending, startTransition] = useTransition()
  const [emailStatus, setEmailStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  const handleWhatsApp = () => {
    let message = `Name: ${name}%0AEmail: ${email}%0ACar: ${carModel}%0AProblem: ${problem}`
    if (attachment) message += `%0AAttachment: ${attachment.name} (please send manually)`
    window.open(`https://wa.me/263776327772?text=${message}`, '_blank')
  }

  const handleEmailSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await sendEmail(formData)
      setEmailStatus(result)
      if (result.success) {
        setName('')
        setEmail('')
        setCarModel('')
        setProblem('')
        setAttachment(null)
      }
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-navy via-royal to-purple bg-clip-text text-transparent">
        Contact Us
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Reach out for a free quote or consultation. We'll respond promptly.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Company Details with subtle navy/royal gradient */}
        <div className="bg-gradient-to-br from-navy/5 via-royal/5 to-cyan/5 rounded-xl border border-royal/20 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-navy mb-6">Auto Doctor</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-royal text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Workshop Location</h3>
                <p className="text-gray-600">Harare, Zimbabwe<br />Opposite Showgrounds, Samora Machel Ave</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhone className="text-royal text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Call / WhatsApp</h3>
                <p className="text-gray-600"><a href="tel:+263776327772" className="hover:text-royal">077 632 7772</a></p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-royal text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@autodoctor.co.zw</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-royal/20">
            <p className="text-sm text-gray-500">* For urgent inquiries, please WhatsApp or call directly.</p>
          </div>
        </div>

        {/* Right Column - Contact Form with clean white card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-8">
          <h2 className="text-xl font-semibold text-navy mb-6">Request a Quote</h2>
          <form action={handleEmailSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent transition" placeholder="Jackie Mazenge" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent transition" placeholder="jackie@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Model & Year</label>
              <input type="text" name="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent transition" placeholder="Toyota Hilux 2020" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe the problem *</label>
              <textarea name="problem" value={problem} onChange={(e) => setProblem(e.target.value)} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent transition" placeholder="What's wrong? Any symptoms?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1"><FaPaperclip className="inline mr-1 text-gray-500" /> Attachment (photo/document)</label>
              <input type="file" name="attachment" onChange={(e) => setAttachment(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-royal/10 file:text-royal hover:file:bg-royal/20" accept="image/*,application/pdf" />
              <p className="text-xs text-gray-400 mt-1">Max 10MB. Will be attached to the email.</p>
            </div>

            {emailStatus && (
              <div className={`p-3 rounded-lg text-sm ${emailStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {emailStatus.message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button type="submit" disabled={isPending} className="flex items-center justify-center gap-2 bg-royal text-white font-semibold py-3 px-4 rounded-lg hover:bg-cyan-600 transition shadow-sm disabled:opacity-50">
                {isPending ? <FaSpinner className="animate-spin" /> : <FaEnvelope />}
                {isPending ? 'Sending...' : 'Send via Email'}
              </button>
              <button type="button" onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-600 transition shadow-sm">
                <FaWhatsapp /> Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}