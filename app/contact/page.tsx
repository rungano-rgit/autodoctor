'use client'
import { useState } from 'react'
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [carModel, setCarModel] = useState('')
  const [problem, setProblem] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Name: ${encodeURIComponent(name)}%0ACar: ${encodeURIComponent(carModel)}%0AProblem: ${encodeURIComponent(problem)}`
    window.open(`https://wa.me/263776327772?text=${message}`, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-purple-950 px-8 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-amber-300">
            Contact Us
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Send a message, request service, or find our Harare workshop. Our team is ready to help
            you get back on the road quickly and safely.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] px-8 py-10">
          <div className="space-y-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20">
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-3xl border border-amber-300/20 bg-slate-950/75 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-300 to-orange-500 text-slate-950">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">WhatsApp</p>
                    <a href="https://wa.me/263776327772" className="mt-1 block text-lg font-semibold text-slate-100 hover:text-amber-300">
                      077 632 7772
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-sky-400">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Phone</p>
                    <a href="tel:+263776327772" className="mt-1 block text-lg font-semibold text-slate-100 hover:text-sky-300">
                      077 632 7772
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-red-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Location</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">
                      Harare, Zimbabwe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-800 text-emerald-300">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
                    <a href="mailto:info@autodoctor.co.zw" className="mt-1 block text-lg font-semibold text-slate-100 hover:text-emerald-300">
                      info@autodoctor.co.zw
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Your Name
                    </span>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Car Model & Year
                    </span>
                    <input
                      type="text"
                      placeholder="Toyota Premio 2018"
                      value={carModel}
                      onChange={e => setCarModel(e.target.value)}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Describe the problem
                  </span>
                  <textarea
                    placeholder="Briefly explain the issue"
                    rows={5}
                    value={problem}
                    onChange={e => setProblem(e.target.value)}
                    className="mt-3 w-full rounded-[1.25rem] border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-300 via-yellow-300 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-300/20"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d31.0335!3d-17.8252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a1e0c0c0c0c0%3A0x1234567890abcdef!2sHarare!5e0!3m2!1sen!2szw!4v1234567890"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="h-full w-full bg-slate-950"
              />
            </div>
            <p className="mt-5 text-sm text-slate-400">
              OUR LOCATION. Drop by our Harare workshop for a fast, reliable inspection and service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}