import { useLang } from '../contexts/LanguageContext'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  { n: 1, key: 'step1' as const },
  { n: 2, key: 'step2' as const },
  { n: 3, key: 'step3' as const },
  { n: 4, key: 'step4' as const },
  { n: 5, key: 'step5' as const },
  { n: 6, key: 'step6' as const },
  { n: 7, key: 'step7' as const },
  { n: 8, key: 'step8' as const },
  { n: 9, key: 'step9' as const },
  { n: 10, key: 'step10' as const },
  { n: 11, key: 'step11' as const },
  { n: 12, key: 'step12' as const },
  { n: 13, key: 'step13' as const },
  { n: 14, key: 'step14' as const },
  { n: 15, key: 'step15' as const },
  { n: 16, key: 'step16' as const },
  { n: 17, key: 'step17' as const },
  { n: 18, key: 'step18' as const },
] as const

const phases = [
  { label: 'Data Quality & Audit', steps: [1, 2, 3, 4, 5, 6], color: '#2F7D4A', bg: '#EDF4EF' },
  { label: 'Split & Preprocessing', steps: [7, 8], color: '#32BFC4', bg: '#EBF9FA' },
  { label: 'Model Development', steps: [9, 10, 11], color: '#E9A23B', bg: '#FEF6E7' },
  { label: 'Rigorous Evaluation', steps: [12, 13, 14, 15], color: '#C95858', bg: '#FEF0F0' },
  { label: 'Explainability & Deployment', steps: [16, 17, 18], color: '#7C6FF7', bg: '#F3F2FE' },
]

export default function ResearchMethodology() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-[#12372A] rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #55B96A 0%, transparent 50%), radial-gradient(circle at 80% 30%, #32BFC4 0%, transparent 50%)' }} />
          <div className="relative">
            <span className="inline-block px-3 py-1 bg-[#55B96A]/20 text-[#55B96A] text-xs font-semibold rounded-full mb-4">{t('methodology_tag')}</span>
            <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{t('methodology_heading')}</h1>
            <p className="text-[#8BAE97] text-base leading-relaxed max-w-2xl">{t('methodology_sub')}</p>
          </div>
        </div>

        {/* Phase overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {phases.map(ph => (
            <div key={ph.label} className="rounded-xl border p-3.5" style={{ backgroundColor: ph.bg, borderColor: ph.color + '33' }}>
              <p className="text-xs font-bold mb-1" style={{ color: ph.color }}>{ph.label}</p>
              <p className="text-xs text-[#5A6B61]">Steps {ph.steps[0]}–{ph.steps[ph.steps.length - 1]}</p>
            </div>
          ))}
        </div>

        {/* Step cards */}
        <div className="space-y-4 mb-8">
          {steps.map(({ n, key }) => {
            const titleKey = `methodology_${key}` as const
            const descKey = `methodology_${key}_desc` as const
            const phase = phases.find(ph => ph.steps.includes(n as any))

            return (
              <div key={n} className="bg-white rounded-xl border border-[#D8D5C5] p-5 flex gap-4">
                <div className="flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: phase?.color ?? '#2F7D4A' }}
                  >
                    {n}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {t(titleKey)}
                  </h3>
                  <p className="text-sm text-[#5A6B61] leading-relaxed">{t(descKey)}</p>
                </div>
                {n < 18 && <ArrowRight className="w-4 h-4 text-[#D8D5C5] flex-shrink-0 mt-2.5 hidden sm:block" />}
              </div>
            )
          })}
        </div>

        {/* Key outcomes */}
        <div className="bg-[#EDF4EF] rounded-2xl border border-[#55B96A]/30 p-6">
          <span className="inline-block px-3 py-1 bg-[#55B96A]/20 text-[#2F7D4A] text-xs font-semibold rounded-full mb-4">{t('methodology_findings_tag')}</span>
          <div className="grid sm:grid-cols-2 gap-3">
            {(['methodology_finding_1', 'methodology_finding_2', 'methodology_finding_3', 'methodology_finding_4'] as const).map(k => (
              <div key={k} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#5A6B61]">{t(k)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
