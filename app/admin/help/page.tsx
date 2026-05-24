import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa'

export default function AdminHelpPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-4"><FaQuestionCircle /> Admin Quick Guide</h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="font-bold">Workshop Contact Info</p>
        <p><FaWhatsapp className="inline text-green-600" /> WhatsApp: 0776327772</p>
        <p><FaPhone className="inline text-blue-600" /> Call: 0776327772</p>
        <p><FaMapMarkerAlt className="inline text-red-600" /> Harare, Zimbabwe</p>
      </div>
      <ul className="list-disc list-inside">
        <li>Add services → <strong>/admin/services/new</strong></li>
        <li>Upload gallery images → <strong>/admin/gallery/new</strong></li>
        <li>Approve reviews → <strong>/admin/reviews</strong></li>
      </ul>
    </div>
  )
}