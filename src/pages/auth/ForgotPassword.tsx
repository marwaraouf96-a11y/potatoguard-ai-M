import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Leaf, Mail, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Please enter a valid email address.'); return }
    setLoading(true); setError('')
    const { error } = await forgotPassword(email)
    setLoading(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 bg-[#2F7D4A] rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard AI</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#D8D5C5] p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EDF4EF] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#2F7D4A]" />
              </div>
              <h1 className="text-xl font-bold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Check your inbox</h1>
              <p className="text-sm text-[#5A6B61] mb-6">
                We've sent a password reset link to <strong>{email}</strong>. The link will expire in 1 hour.
              </p>
              <p className="text-xs text-[#5A6B61] bg-[#F5F3E8] p-3 rounded-lg mb-4">
                Check your spam folder if you don't see the email within a few minutes.
              </p>
              <Link to="/auth/signin" className="block w-full text-center py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-lg text-sm hover:bg-[#12372A] transition-colors">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#EDF4EF] rounded-xl flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-[#2F7D4A]" />
              </div>
              <h1 className="text-xl font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Forgot your password?</h1>
              <p className="text-sm text-[#5A6B61] mb-6">Enter your email address and we'll send a secure reset link.</p>

              {error && (
                <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-lg mb-5">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">Email Address</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : 'Send Reset Link'}
                </button>
              </form>

              <Link to="/auth/signin" className="flex items-center justify-center gap-1.5 mt-5 text-sm text-[#5A6B61] hover:text-[#17221C] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
