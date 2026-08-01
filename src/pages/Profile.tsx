import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../lib/supabase'
import { User, Mail, Globe, Building, MapPin, CheckCircle2, AlertCircle, Loader2, Camera } from 'lucide-react'

const roles: { value: UserRole; label: string }[] = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'expert', label: 'Agricultural Expert' },
]

export default function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? '',
    language: profile?.language ?? 'en',
    organization: profile?.organization ?? '',
    region: profile?.region ?? '',
    role: profile?.role ?? 'farmer' as UserRole,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setSuccess(false); setError('')
    const { error } = await updateProfile(form)
    setLoading(false)
    if (error) setError(error.message)
    else { setSuccess(true); setTimeout(() => setSuccess(false), 3000) }
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Profile</h1>
        <p className="text-sm text-[#5A6B61] mb-8">Manage your personal information and role settings.</p>

        {/* Avatar */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5 flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#EDF4EF] flex items-center justify-center text-2xl font-bold text-[#2F7D4A]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {profile?.full_name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#2F7D4A] rounded-full flex items-center justify-center hover:bg-[#12372A] transition-colors" title="Change avatar (feature coming soon)">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-[#17221C]">{profile?.full_name ?? 'User'}</p>
            <p className="text-sm text-[#5A6B61]">{user?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-medium rounded-full capitalize">{profile?.role}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Personal Information</h2>

          {error && (
            <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-200 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-3 p-3.5 bg-[#EDF4EF] border border-[#55B96A] rounded-lg mb-5">
              <CheckCircle2 className="w-4 h-4 text-[#2F7D4A] flex-shrink-0" />
              <p className="text-sm text-[#2F7D4A] font-medium">Profile updated successfully.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5"><User className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />Full Name</label>
              <input type="text" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5"><Mail className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />Email Address</label>
              <input type="email" value={user?.email ?? ''} disabled
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-[#F5F3E8] text-[#5A6B61] cursor-not-allowed" />
              <p className="text-xs text-[#5A6B61] mt-1">Email cannot be changed from this page.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as UserRole }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors">
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5"><Globe className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />Language</label>
              <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value as 'en' | 'ar' }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors">
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5"><Building className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />Organization <span className="text-[#5A6B61] font-normal">(optional)</span></label>
              <input type="text" value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                placeholder="University, farm, or institution"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5"><MapPin className="w-3.5 h-3.5 inline mr-1.5 opacity-70" />General Region <span className="text-[#5A6B61] font-normal">(optional)</span></label>
              <input type="text" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                placeholder="e.g. Jordan, North Africa"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] transition-colors" />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-60">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
