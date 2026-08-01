import { useState, FormEvent } from 'react'
import { MessageSquare, FlaskConical, Microscope, CheckCircle2, Loader2 } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

type ContactType = 'farmer-support' | 'research' | 'expert'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', type: 'farmer-support' as ContactType, organization: '', region: '', message: '', consent: false })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const types = [
    { value: 'farmer-support' as ContactType, label: t('contact_type_farmer'), icon: MessageSquare, desc: t('contact_type_farmer_desc') },
    { value: 'research' as ContactType, label: t('contact_type_research'), icon: FlaskConical, desc: t('contact_type_research_desc') },
    { value: 'expert' as ContactType, label: t('contact_type_expert'), icon: Microscope, desc: t('contact_type_expert_desc') },
  ]

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError(t('err_required')); return }
    if (!form.consent) { setError(t('err_consent')); return }
    setLoading(true); setError('')
    setTimeout(() => { setLoading(false); setSent(true) }, 1000)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F5F3E8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#EDF4EF] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#2F7D4A]" />
          </div>
          <h2 className="text-xl font-bold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{t('contact_sent_heading')}</h2>
          <p className="text-sm text-[#5A6B61]">{t('contact_sent_sub')} {form.email} {t('contact_sent_thanks')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{t('contact_heading')}</h1>
          <p className="text-[#5A6B61]">{t('contact_sub')}</p>
        </div>

        {/* Researcher social links */}
        <div className="bg-[#12372A] rounded-2xl p-6 mb-6">
          <h2 className="text-base font-semibold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{t('contact_researcher_heading')}</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.linkedin.com/in/marwa-raouf2026/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact_linkedin')}
              className="flex items-center gap-3 px-5 py-3 bg-[#0A66C2] hover:bg-[#095ba8] text-white rounded-xl font-semibold text-sm transition-colors"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {t('contact_linkedin')}
            </a>
            <a
              href="https://github.com/marwaraouf96-a11y"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact_github')}
              className="flex items-center gap-3 px-5 py-3 bg-[#24292F] hover:bg-[#1a1e22] text-white rounded-xl font-semibold text-sm transition-colors"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              {t('contact_github')}
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact type cards */}
          <div className="lg:col-span-1 space-y-3">
            {types.map(tp => {
              const Icon = tp.icon
              return (
                <button key={tp.value} onClick={() => setForm(f => ({ ...f, type: tp.value }))}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${form.type === tp.value ? 'border-[#2F7D4A] bg-[#EDF4EF]' : 'border-[#D8D5C5] bg-white hover:border-[#55B96A]'}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className="w-4 h-4 text-[#2F7D4A]" />
                    <span className="text-sm font-semibold text-[#17221C]">{tp.label}</span>
                  </div>
                  <p className="text-xs text-[#5A6B61] ms-7">{tp.desc}</p>
                </button>
              )
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D8D5C5] p-6">
            <h2 className="text-base font-semibold text-[#17221C] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              {types.find(tp => tp.value === form.type)?.label}
            </h2>

            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4 text-sm text-red-700">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">{t('contact_name')} *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder={t('contact_name')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">{t('contact_email')} *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">{t('contact_org')} <span className="text-[#5A6B61] font-normal">({t('profile_optional').replace(/[()]/g, '')})</span></label>
                  <input value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder={t('profile_org_placeholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#17221C] mb-1.5">{t('contact_region')} <span className="text-[#5A6B61] font-normal">({t('profile_optional').replace(/[()]/g, '')})</span></label>
                  <input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]" placeholder={t('profile_region_placeholder')} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#17221C] mb-1.5">{t('contact_message')} *</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D5C5] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A] resize-none" />
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.consent} onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))} className="w-4 h-4 mt-0.5 accent-[#2F7D4A] flex-shrink-0" />
                <span className="text-xs text-[#5A6B61]">{t('contact_consent')}</span>
              </label>
              <button type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2F7D4A] hover:bg-[#12372A] text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-60">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{t('contact_sending')}</> : t('contact_send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
