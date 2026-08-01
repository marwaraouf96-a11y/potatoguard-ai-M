import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Shield, Trash2, AlertTriangle, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AccountSettings() {
  const { user, resetPassword, deleteAccount } = useAuth()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  async function handlePasswordChange() {
    if (newPassword.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match.'); return }
    setPwLoading(true); setPwError(''); setPwSuccess(false)
    const { error } = await resetPassword(newPassword)
    setPwLoading(false)
    if (error) setPwError(error.message)
    else { setPwSuccess(true); setNewPassword(''); setConfirmPassword(''); setTimeout(() => setPwSuccess(false), 3000) }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== 'DELETE') { setDeleteError('Please type DELETE to confirm.'); return }
    setDeleteLoading(true)
    await deleteAccount()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Account Settings</h1>
        <p className="text-sm text-[#5A6B61] mb-8">Manage your security settings and account preferences.</p>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-[#EDF4EF] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#2F7D4A]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Change Password</h2>
              <p className="text-xs text-[#5A6B61]">Set a new secure password for your account</p>
            </div>
          </div>

          {pwError && <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-sm text-red-700">{pwError}</div>}
          {pwSuccess && <div className="flex items-center gap-2 p-3 bg-[#EDF4EF] border border-[#55B96A] rounded-lg mb-4"><CheckCircle2 className="w-4 h-4 text-[#2F7D4A]" /><span className="text-sm text-[#2F7D4A] font-medium">Password updated successfully.</span></div>}

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">New Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder="At least 8 characters" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6B61]">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#17221C] mb-1.5">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder="Repeat new password" />
            </div>
            <button onClick={handlePasswordChange} disabled={pwLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60">
              {pwLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Updating…</> : 'Update Password'}
            </button>
          </div>
        </div>

        {/* Account info */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <h2 className="text-base font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[#E8E5D6]">
              <span className="text-[#5A6B61]">Email</span>
              <span className="font-medium text-[#17221C]">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E5D6]">
              <span className="text-[#5A6B61]">Account ID</span>
              <span className="font-mono text-xs text-[#5A6B61]">{user?.id?.slice(0, 16)}…</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#5A6B61]">Member since</span>
              <span className="text-[#17221C]">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</span>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-[#C95858]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#C95858]" style={{ fontFamily: 'Sora, sans-serif' }}>Danger Zone</h2>
              <p className="text-xs text-[#5A6B61]">Permanent, irreversible actions</p>
            </div>
          </div>
          <p className="text-sm text-[#5A6B61] mb-4">Deleting your account will permanently remove your profile and all saved scan history. This cannot be undone.</p>
          <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-4 py-2.5 border border-red-300 text-[#C95858] hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
            <Trash2 className="w-4 h-4" />Delete Account
          </button>
        </div>

        {/* Delete modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl border border-[#D8D5C5] p-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-[#C95858]" />
                </div>
                <h3 className="text-lg font-bold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Delete Account</h3>
              </div>
              <p className="text-sm text-[#5A6B61] mb-4">This will permanently delete your account, profile, and all saved scan data. Type <strong>DELETE</strong> to confirm.</p>
              {deleteError && <p className="text-sm text-red-600 mb-3">{deleteError}</p>}
              <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-red-300 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="Type DELETE" />
              <div className="flex gap-2">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-lg text-sm hover:bg-[#F5F3E8] transition-colors">Cancel</button>
                <button onClick={handleDeleteAccount} disabled={deleteLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#C95858] hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-60">
                  {deleteLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Deleting…</> : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
