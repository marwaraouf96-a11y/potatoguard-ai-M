import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Leaf, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setLoading(true); setError('')
    const { error } = await resetPassword(password)
    setLoading(false)
    if (error) setError(error.message)
    else {
      setSuccess(true)
      setTimeout(() => navigate('/auth/signin'), 2500)
    }
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
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EDF4EF] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#2F7D4A]" />
              </div>
              <h1 className="text-xl font-bold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Password updated</h1>
              <p className="text-sm text-[#5A6B61]">Your password has been changed successfully. Redirecting to sign in…</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#EDF4EF] rounded-xl flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-[#2F7D4A]" />
              </div>
              <h1 className="text-xl font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Set a new password</h1>
              <p className="text-sm text-[#5A6B61] mb-6">Choose a strong password for your account.</p>

              {error && (
                <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-lg mb-5">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors"
                      placeholder="At least 8 characters"
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B61]">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">Confirm Password</label>
                  <input
                    type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors"
                    placeholder="Repeat new password"
                  />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : 'Update Password'}
                </button>
              </form>
              <Link to="/auth/signin" className="block text-center mt-4 text-sm text-[#5A6B61] hover:text-[#17221C]">Back to Sign In</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
