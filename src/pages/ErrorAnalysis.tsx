import { useState } from 'react'
import { AlertTriangle, Filter, CheckCircle2, X } from 'lucide-react'

const errors = [
  { id: 1, true: 'Pest', predicted: 'Fungi', confidence: 82, trueProb: 11, topThree: ['Fungi (82%)', 'Pest (11%)', 'Phytophthora (5%)'], note: 'Feeding damage texture visually similar to fungal lesion', tag: 'visual-overlap' },
  { id: 2, true: 'Fungi', predicted: 'Pest', confidence: 74, trueProb: 18, topThree: ['Pest (74%)', 'Fungi (18%)', 'Bacteria (6%)'], note: 'Dark irregular spots with no clear fungal morphology', tag: 'visual-overlap' },
  { id: 3, true: 'Fungi', predicted: 'Phytophthora', confidence: 69, trueProb: 22, topThree: ['Phytophthora (69%)', 'Fungi (22%)', 'Bacteria (6%)'], note: 'Water-soaked lesion pattern overlaps Phytophthora presentation', tag: 'visual-overlap' },
  { id: 4, true: 'Virus', predicted: 'Fungi', confidence: 61, trueProb: 28, topThree: ['Fungi (61%)', 'Virus (28%)', 'Pest (8%)'], note: 'Mosaic pattern not distinctive enough to separate from fungal spots', tag: 'visual-overlap' },
  { id: 5, true: 'Pest', predicted: 'Healthy', confidence: 55, trueProb: 30, topThree: ['Healthy (55%)', 'Pest (30%)', 'Fungi (12%)'], note: 'Very early or mild pest damage barely distinguishable from healthy leaf', tag: 'image-quality' },
]

const tagColors: Record<string, string> = {
  'visual-overlap': '#1D4ED8',
  'image-quality': '#E9A23B',
  'label-issue': '#C95858',
  'background': '#7C3AED',
}

export default function ErrorAnalysis() {
  const [filter, setFilter] = useState({ trueClass: 'all', predClass: 'all' })
  const classes = ['all', 'Bacteria', 'Fungi', 'Healthy', 'Nematode', 'Pest', 'Phytophthora', 'Virus']

  const filtered = errors.filter(e =>
    (filter.trueClass === 'all' || e.true === filter.trueClass) &&
    (filter.predClass === 'all' || e.predicted === filter.predClass)
  )

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Error Analysis</h1>
          <p className="text-[#5A6B61]">Transparent examination of misclassified test images — turning model mistakes into scientific insight.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Test images', value: '429' },
            { label: 'Correct', value: '358', color: '#2F7D4A' },
            { label: 'Misclassified', value: '71', color: '#C95858' },
            { label: 'Error rate', value: '16.55%', color: '#E9A23B' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#D8D5C5] p-5 text-center">
              <p className="text-2xl font-bold font-mono" style={{ color: s.color || '#12372A', fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</p>
              <p className="text-xs text-[#5A6B61] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Common confusions */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Most Common Validation Confusions</h2>
          <div className="flex flex-wrap gap-2">
            {['Pest → Fungi', 'Fungi → Pest', 'Fungi → Phytophthora', 'Virus → Fungi', 'Pest → Healthy'].map(c => (
              <span key={c} className="px-3.5 py-2 bg-[#FEF3C7] border border-[#E9A23B]/30 rounded-lg text-sm font-medium text-[#92400E]">{c}</span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-4 mb-5 flex flex-wrap gap-4 items-center">
          <Filter className="w-4 h-4 text-[#5A6B61]" />
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-[#5A6B61]">True class:</label>
            <select value={filter.trueClass} onChange={e => setFilter(f => ({ ...f, trueClass: e.target.value }))}
              className="px-2.5 py-1.5 border border-[#D8D5C5] rounded-lg text-xs bg-[#F5F3E8] focus:outline-none">
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-[#5A6B61]">Predicted class:</label>
            <select value={filter.predClass} onChange={e => setFilter(f => ({ ...f, predClass: e.target.value }))}
              className="px-2.5 py-1.5 border border-[#D8D5C5] rounded-lg text-xs bg-[#F5F3E8] focus:outline-none">
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          {(filter.trueClass !== 'all' || filter.predClass !== 'all') && (
            <button onClick={() => setFilter({ trueClass: 'all', predClass: 'all' })} className="flex items-center gap-1 text-xs text-[#C95858] hover:underline">
              <X className="w-3.5 h-3.5" />Clear filters
            </button>
          )}
        </div>

        {/* Error cards */}
        <div className="space-y-4 mb-8">
          {filtered.map(e => (
            <div key={e.id} className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FEE2E2] rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[#C95858]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-[#17221C]">True: <span className="text-[#2F7D4A]">{e.true}</span></span>
                      <span className="text-[#D8D5C5]">→</span>
                      <span className="text-sm font-semibold text-[#17221C]">Predicted: <span className="text-[#C95858]">{e.predicted}</span></span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full text-white mt-1 inline-block" style={{ backgroundColor: tagColors[e.tag] || '#5A6B61' }}>{e.tag.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#C95858] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{e.confidence}%</p>
                  <p className="text-xs text-[#5A6B61]">model confidence</p>
                  <p className="text-xs text-[#5A6B61]">True class: {e.trueProb}%</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-[#5A6B61] mb-1">Top 3 predictions:</p>
                  <div className="space-y-1">
                    {e.topThree.map(t => <p key={t} className="text-xs text-[#17221C] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{t}</p>)}
                  </div>
                </div>
                <div className="p-3 bg-[#F5F3E8] rounded-lg">
                  <p className="text-xs font-medium text-[#5A6B61] mb-1">Review observation:</p>
                  <p className="text-xs text-[#17221C]">{e.note}</p>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-[#5A6B61] text-sm">No errors match the selected filters.</div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Scientific Interpretation Standards</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: CheckCircle2, color: '#2F7D4A', label: 'Confirmed metric evidence', desc: 'Directly derived from test set numerical results' },
              { icon: AlertTriangle, color: '#E9A23B', label: 'Human-review observation', desc: 'Notes from manual inspection of error cases' },
              { icon: AlertTriangle, color: '#D97706', label: 'Possible explanation', desc: 'Hypothesis — not confirmed scientific fact' },
              { icon: AlertTriangle, color: '#C95858', label: 'Possible label issue', desc: 'Requires expert agronomist review to confirm' },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex items-start gap-3 p-3 bg-[#F5F3E8] rounded-xl">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                  <div>
                    <p className="text-xs font-semibold text-[#17221C]">{s.label}</p>
                    <p className="text-xs text-[#5A6B61]">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-[#5A6B61] mt-4 p-3 bg-[#FEF3C7] rounded-lg">Dataset labels are never automatically changed based on model disagreement alone. Expert agronomist review is required before any label corrections.</p>
        </div>
      </div>
    </div>
  )
}
