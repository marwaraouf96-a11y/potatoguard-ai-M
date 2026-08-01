import { useState } from 'react'
import { Eye, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import leaf1 from '../imports/1.jpg'
import leaf2 from '../imports/2.jpg'
import leaf3 from '../imports/3.jpg'

const examples = [
  { id: 1, label: 'Correct — High Confidence', img: leaf1, cls: 'Healthy', conf: 91, type: 'correct-high', interpretation: 'The model attends to central leaf tissue with uniform texture. High confidence aligns with a clearly healthy leaf morphology.', gradTint: 'rgba(50,191,196,0.4)' },
  { id: 2, label: 'Correct — Moderate Confidence', img: leaf2, cls: 'Fungi', conf: 78, type: 'correct-moderate', interpretation: 'Attention focuses on the irregular dark spots. Moderate confidence may reflect partial overlap with Pest patterns.', gradTint: 'rgba(230,120,50,0.45)' },
  { id: 3, label: 'Incorrect — High Confidence', img: leaf3, cls: 'Predicted: Fungi (True: Pest)', conf: 82, type: 'incorrect-high', interpretation: 'The model attended to lesion edges but misclassified. High confidence errors like this are the most important to review.', gradTint: 'rgba(201,88,88,0.45)' },
  { id: 4, label: 'Visually Ambiguous Case', img: leaf2, cls: 'Uncertain', conf: 48, type: 'ambiguous', interpretation: 'The attention map is diffuse — the model did not find a clear discriminative region. Low confidence is correctly communicated.', gradTint: 'rgba(124,58,237,0.35)' },
]

export default function Explainability() {
  const [active, setActive] = useState(0)
  const [showBlend, setShowBlend] = useState(true)

  const ex = examples[active]

  const confColor = ex.conf >= 80 ? '#2F7D4A' : ex.conf >= 60 ? '#E9A23B' : '#C95858'
  const isBad = ex.type.includes('incorrect') || ex.type === 'ambiguous'

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Explainability — Grad-CAM</h1>
          <p className="text-[#5A6B61] max-w-2xl">Gradient-weighted Class Activation Mapping visualizes where the model focused when making a prediction. It is a diagnostic tool, not causal proof.</p>
        </div>

        {/* What is Grad-CAM */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>What Grad-CAM Shows</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: CheckCircle2, color: '#2F7D4A', label: 'What it can indicate', items: ['The model attends to leaf lesions', 'Focus is on biologically relevant regions', 'Prediction is based on leaf features, not background'] },
              { icon: AlertTriangle, color: '#E9A23B', label: 'What it does NOT prove', items: ['The attended region is biologically responsible', 'The prediction is correct', 'The disease is confirmed by the attention pattern'] },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} className="p-4 bg-[#F5F3E8] rounded-xl">
                  <div className="flex items-center gap-2 mb-3"><Icon className="w-4 h-4" style={{ color: s.color }} /><span className="text-sm font-semibold text-[#17221C]">{s.label}</span></div>
                  <div className="space-y-1.5">
                    {s.items.map(i => <p key={i} className="text-xs text-[#5A6B61]">{i}</p>)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Example selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {examples.map((e, i) => (
            <button key={e.id} onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${active === i ? 'bg-[#2F7D4A] text-white' : 'bg-white border border-[#D8D5C5] text-[#5A6B61] hover:border-[#2F7D4A]'}`}>
              {e.label}
            </button>
          ))}
        </div>

        {/* Main Grad-CAM viewer */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>{ex.label}</h2>
              <p className="text-sm text-[#5A6B61]">Class: <strong>{ex.cls}</strong> · Confidence: <strong style={{ color: confColor }}>{ex.conf}%</strong></p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showBlend} onChange={e => setShowBlend(e.target.checked)} className="w-4 h-4 accent-[#2F7D4A]" />
              <span className="text-sm text-[#5A6B61]">Show blended view</span>
            </label>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {['Original Image', 'Grad-CAM Heatmap', showBlend ? 'Blended View' : 'Heatmap Only'].map((label, i) => (
              <div key={label} className="text-center">
                <div className="rounded-xl overflow-hidden aspect-square bg-[#EDF4EF] relative mb-2">
                  <img src={ex.img} alt={label} className="w-full h-full object-cover" />
                  {i === 1 && <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ex.gradTint} 0%, rgba(255,165,0,0.3) 50%, rgba(50,191,196,0.2) 100%)` }} />}
                  {i === 2 && showBlend && <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 40% 45%, ${ex.gradTint} 0%, transparent 55%)` }} />}
                </div>
                <span className="text-xs font-medium text-[#5A6B61]">{label}</span>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-xl border ${isBad ? 'bg-[#FEF3C7] border-[#E9A23B]/40' : 'bg-[#EDF4EF] border-[#55B96A]/30'}`}>
            <div className="flex items-start gap-3">
              {isBad ? <AlertTriangle className="w-4 h-4 text-[#E9A23B] mt-0.5 flex-shrink-0" /> : <Eye className="w-4 h-4 text-[#2F7D4A] mt-0.5 flex-shrink-0" />}
              <p className="text-sm text-[#5A6B61]">{ex.interpretation}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF3C7] border border-[#E9A23B]/40 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#92400E]">
              <strong>Disclaimer:</strong> Grad-CAM is used to detect whether the model attends to leaf lesions versus backgrounds, and whether a prediction warrants expert review. It is not a substitute for agronomist assessment or laboratory analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
