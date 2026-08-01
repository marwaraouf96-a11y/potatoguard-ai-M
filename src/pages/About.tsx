import { CheckCircle2, Leaf, FlaskConical, Shield, TrendingUp, Users } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

const tech = ['React · TypeScript · Tailwind CSS v4', 'Python · FastAPI · TensorFlow/Keras', 'ConvNeXtTiny transfer learning', 'Supabase authentication & storage', 'Grad-CAM explainability', 'Bootstrap confidence intervals']

const principleKeys = [
  'AI supports decisions — it does not replace expertise',
  'Uncertainty is shown, never hidden',
  'Predictions are preliminary screenings, not diagnoses',
  'User images are not stored without explicit consent',
  'Model limitations are documented and visible',
  'All evaluation metrics are from one-time held-out testing',
] as const

export default function About() {
  const { t } = useLang()
  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#12372A] rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #55B96A 0%, transparent 50%), radial-gradient(circle at 80% 30%, #32BFC4 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="w-14 h-14 bg-[#2F7D4A] rounded-2xl flex items-center justify-center mb-5">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_heading')}</h1>
            <p className="text-[#8BAE97] text-lg leading-relaxed max-w-2xl">{t('about_sub')}</p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-5 h-5 text-[#2F7D4A]" />
            <h2 className="text-xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_mission_heading')}</h2>
          </div>
          <p className="text-[#5A6B61] mb-3 leading-relaxed">{t('about_mission_1')}</p>
          <p className="text-[#5A6B61] leading-relaxed">{t('about_mission_2')}</p>
        </div>

        {/* Research question */}
        <div className="bg-[#EDF4EF] rounded-2xl border border-[#55B96A]/30 p-6 mb-5">
          <h2 className="text-base font-semibold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_research_q_heading')}</h2>
          <p className="text-[#17221C] italic leading-relaxed">{t('about_research_q')}</p>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <Users className="w-5 h-5 text-[#2F7D4A]" />
            <h2 className="text-xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_team_heading')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F5F3E8] rounded-xl">
              <p className="text-xs font-semibold text-[#2F7D4A] uppercase tracking-wider mb-1">{t('about_lead_role')}</p>
              <p className="text-base font-semibold text-[#17221C]">Marwa Raouf Ahmed</p>
              <p className="text-xs text-[#5A6B61]">Applied AI and Data Analytics</p>
            </div>
            <div className="p-4 bg-[#F5F3E8] rounded-xl">
              <p className="text-xs font-semibold text-[#2F7D4A] uppercase tracking-wider mb-1">{t('about_supervisor_role')}</p>
              <p className="text-base font-semibold text-[#17221C]">Mohamed Elshafey</p>
              <p className="text-xs text-[#5A6B61]">Project Supervisor</p>
            </div>
            <div className="p-4 bg-[#F5F3E8] rounded-xl">
              <p className="text-xs font-semibold text-[#2F7D4A] uppercase tracking-wider mb-1">{t('about_cosupervisor_role')}</p>
              <p className="text-base font-semibold text-[#17221C]">Youssif Fouad</p>
              <p className="text-xs text-[#5A6B61]">Co-Supervisor</p>
            </div>
            <div className="p-4 bg-[#F5F3E8] rounded-xl">
              <p className="text-xs font-semibold text-[#2F7D4A] uppercase tracking-wider mb-1">{t('about_advisor_role')}</p>
              <p className="text-base font-semibold text-[#17221C]">[Agricultural Expert]</p>
              <p className="text-xs text-[#5A6B61]">Agricultural science consultation</p>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <h2 className="text-xl font-bold text-[#12372A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_tech_heading')}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {tech.map(item => (
              <div key={item} className="flex items-center gap-2.5 p-3 bg-[#F5F3E8] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#2F7D4A] flex-shrink-0" />
                <span className="text-sm text-[#5A6B61]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible AI */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#2F7D4A]" />
            <h2 className="text-xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_principles_heading')}</h2>
          </div>
          <div className="space-y-2.5">
            {principleKeys.map(p => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#5A6B61]">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-[#12372A] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#55B96A]" />
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{t('about_roadmap_heading')}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { phase: t('about_phase1'), items: ['Graduation project website', 'AI demo and screening', 'Research transparency pages', 'Model performance reporting'] },
              { phase: t('about_phase2'), items: ['Live camera scan', 'User accounts and saved cases', 'Farmer dashboard', 'Expert review requests'] },
              { phase: t('about_phase3'), items: ['Expert portal', 'Research contribution loop', 'External validation studies', 'Public API'] },
            ].map(r => (
              <div key={r.phase} className="p-4 bg-[#1F5040] rounded-xl">
                <p className="text-xs font-semibold text-[#32BFC4] mb-3">{r.phase}</p>
                <div className="space-y-1.5">
                  {r.items.map(i => <p key={i} className="text-xs text-[#8BAE97]">· {i}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
