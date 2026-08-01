import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserRole } from '../../lib/supabase'
import { Leaf, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: 'farmer', label: 'Farmer', desc: 'Upload scans, save field cases' },
  { value: 'researcher', label: 'Researcher', desc: 'Access detailed model metrics and data' },
  { value: 'expert', label: 'Agricultural Expert', desc: 'Review ambiguous cases' },
]

export default function SignUp() {
  const { signUp, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: 'farmer' as UserRole })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address'
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setLoading(true); setError(''); setFieldErrors({})
    const { error } = await signUp(form.email, form.password, form.fullName, form.role)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/auth/verify')
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await signInWithGoogle()
    setGoogleLoading(false)
  }

  const passwordStrength = form.password.length === 0 ? 0
    : form.password.length < 8 ? 1
    : form.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/) ? 3 : 2

  const strengthLabel = ['', 'Weak', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-400', 'bg-[#E9A23B]', 'bg-[#55B96A]']

  return (
    <div className="min-h-screen bg-[#F5F3E8] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#12372A] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 20%, #55B96A 0%, transparent 50%), radial-gradient(circle at 80% 80%, #32BFC4 0%, transparent 50%)'
        }} />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 bg-[#2F7D4A] rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard AI</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Join the field-to-lab research network
          </h2>
          <p className="text-[#8BAE97] text-base leading-relaxed">
            Create an account to save field scans, track observations, and — with your consent — contribute to future model improvements.
          </p>
          <div className="mt-8 space-y-3">
            {['Save field scan cases and build your history', 'Download PDF case reports', 'Request expert review on uncertain scans', 'Access the full research dashboard'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#55B96A] flex-shrink-0" />
                <span className="text-sm text-[#8BAE97]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-[#5A8A70]">Your data is handled responsibly. Images are not stored without your explicit consent.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-[#2F7D4A] rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard AI</span>
          </div>

          <h1 className="text-2xl font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Create your account</h1>
          <p className="text-sm text-[#5A6B61] mb-6">No account needed to try the model — sign up to save your scans.</p>

          {error && (
            <div className="flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Full Name</label>
              <input
                type="text" autoComplete="name" value={form.fullName}
                onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] ${fieldErrors.fullName ? 'border-red-400' : 'border-[#D8D5C5]'}`}
                placeholder="Your full name"
              />
              {fieldErrors.fullName && <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Email Address</label>
              <input
                type="email" autoComplete="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] ${fieldErrors.email ? 'border-red-400' : 'border-[#D8D5C5]'}`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} autoComplete="new-password" value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] ${fieldErrors.password ? 'border-red-400' : 'border-[#D8D5C5]'}`}
                  placeholder="At least 8 characters"
                />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B61]">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor[passwordStrength] : 'bg-[#E8E5D6]'}`} />
                  ))}
                  <span className="text-xs text-[#5A6B61] ml-2">{strengthLabel[passwordStrength]}</span>
                </div>
              )}
              {fieldErrors.password && <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Confirm Password</label>
              <input
                type="password" autoComplete="new-password" value={form.confirmPassword}
                onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] ${fieldErrors.confirmPassword ? 'border-red-400' : 'border-[#D8D5C5]'}`}
                placeholder="Repeat password"
              />
              {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-2">I am a…</label>
              <div className="grid grid-cols-1 gap-2">
                {roles.map(r => (
                  <label key={r.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${form.role === r.value ? 'border-[#2F7D4A] bg-[#EDF4EF]' : 'border-[#D8D5C5] bg-white hover:border-[#55B96A]'}`}>
                    <input type="radio" name="role" value={r.value} checked={form.role === r.value} onChange={() => setForm(f => ({ ...f, role: r.value }))} className="accent-[#2F7D4A]" />
                    <div>
                      <div className="text-sm font-medium text-[#17221C]">{r.label}</div>
                      <div className="text-xs text-[#5A6B61]">{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg transition-colors disabled:opacity-60 text-sm"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</> : 'Create Account'}
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D8D5C5]" /></div>
              <div className="relative flex justify-center"><span className="px-3 bg-[#F5F3E8] text-xs text-[#5A6B61]">or</span></div>
            </div>

            <button
              type="button" onClick={handleGoogle} disabled={googleLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#D8D5C5] bg-white hover:bg-[#F5F3E8] text-[#17221C] font-medium rounded-lg transition-colors text-sm disabled:opacity-60"
            >
              {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>
          </form>

          <p className="text-center text-sm text-[#5A6B61] mt-5">
            Already have an account?{' '}
            <Link to="/auth/signin" className="text-[#2F7D4A] font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
