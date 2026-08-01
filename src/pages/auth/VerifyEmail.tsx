import { Link } from 'react-router-dom'
import { Leaf, Mail, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function VerifyEmail() {
  const { user } = useAuth()

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
          <div className="w-20 h-20 bg-[#EDF4EF] rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail className="w-10 h-10 text-[#2F7D4A]" />
          </div>
          <h1 className="text-2xl font-bold text-[#17221C] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Verify your email</h1>
          <p className="text-sm text-[#5A6B61] mb-2">
            We've sent a verification email to:
          </p>
          <p className="text-base font-semibold text-[#17221C] mb-5">{user?.email ?? 'your email address'}</p>
          <p className="text-sm text-[#5A6B61] mb-6">
            Click the link in the email to verify your account. Once verified, you can sign in and start saving field scans.
          </p>

          <div className="space-y-3 text-left bg-[#F5F3E8] rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5A6B61]">Check your inbox and spam folder</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5A6B61]">The link is valid for 24 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5A6B61]">You can still use the model without verifying</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link to="/diagnose" className="block py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-lg text-sm hover:bg-[#12372A] transition-colors">
              Try the Model Now
            </Link>
            <Link to="/auth/signin" className="block py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-lg text-sm hover:bg-[#F5F3E8] transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
