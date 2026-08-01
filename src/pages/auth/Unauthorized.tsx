import { Link, useNavigate } from 'react-router-dom'
import { ShieldX, ArrowLeft } from 'lucide-react'

export default function Unauthorized() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F5F3E8] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldX className="w-8 h-8 text-[#C95858]" />
        </div>
        <h1 className="text-2xl font-bold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Access Restricted</h1>
        <p className="text-sm text-[#5A6B61] mb-6">You don't have permission to access this page. This area is restricted to specific user roles.</p>
        <div className="flex flex-col gap-2">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center gap-2 py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-lg text-sm hover:bg-white transition-colors">
            <ArrowLeft className="w-4 h-4" />Go Back
          </button>
          <Link to="/dashboard" className="block py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-lg text-sm hover:bg-[#12372A] transition-colors">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
