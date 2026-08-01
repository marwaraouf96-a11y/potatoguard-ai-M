import { Link } from 'react-router-dom'
import { Leaf, LogOut, CheckCircle2 } from 'lucide-react'

export default function SignOut() {
  return (
    <div className="min-h-screen bg-[#F5F3E8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-[#2F7D4A] rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard AI</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#D8D5C5] p-8 text-center">
          <div className="w-16 h-16 bg-[#EDF4EF] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#2F7D4A]" />
          </div>
          <h1 className="text-xl font-bold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>You've been signed out</h1>
          <p className="text-sm text-[#5A6B61] mb-6">Your session has ended securely. Your saved cases and history are safe.</p>

          <div className="flex flex-col gap-2">
            <Link to="/auth/signin" className="block py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-lg text-sm hover:bg-[#12372A] transition-colors">Sign In Again</Link>
            <Link to="/diagnose" className="block py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-lg text-sm hover:bg-[#F5F3E8] transition-colors">Try the Model as Guest</Link>
            <Link to="/" className="block py-2.5 text-[#5A6B61] rounded-lg text-sm hover:text-[#17221C] transition-colors">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
