import { AlertTriangle, Database, CheckCircle2, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const classDistribution = [
  { name: 'Bacteria', train: 306, val: 61, test: 81, color: '#E9A23B' },
  { name: 'Fungi', train: 422, val: 84, test: 105, color: '#8B6347' },
  { name: 'Healthy', train: 114, val: 23, test: 29, color: '#2F7D4A' },
  { name: 'Nematode', train: 38, val: 8, test: 9, color: '#7C3AED' },
  { name: 'Pest', train: 340, val: 68, test: 85, color: '#C95858' },
  { name: 'Phytophthora', train: 177, val: 35, test: 44, color: '#1D4ED8' },
  { name: 'Virus', train: 308, val: 61, test: 76, color: '#D97706' },
]

const auditSteps = [
  { n: 1, label: 'Raw data acquisition', status: '3,076 images', ok: true },
  { n: 2, label: 'File validation', status: 'Format and corruption check', ok: true },
  { n: 3, label: 'Corrupted-image audit', status: '76 removed', ok: true },
  { n: 4, label: 'Exact duplicate hashing (SHA-256)', status: '0 exact duplicates', ok: true },
  { n: 5, label: 'Cross-label conflict review', status: 'Same image, different labels reviewed', ok: true },
  { n: 6, label: 'Perceptual similarity audit (pHash)', status: 'Grouping threshold applied', ok: true },
  { n: 7, label: 'Visual grouping', status: 'Near-duplicate groups identified', ok: true },
  { n: 8, label: 'Clean modelling table', status: '3,000 images retained', ok: true },
  { n: 9, label: 'Group-aware split', status: 'No group appears in multiple splits', ok: true },
  { n: 10, label: 'Persistent split manifest', status: 'Reproducible with fixed seed', ok: true },
]

export default function Datasets() {
  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Dataset Overview</h1>
          <p className="text-[#5A6B61] max-w-2xl">A scientifically audited dataset of potato leaf images. Data quality and audit methodology are fully transparent.</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Raw images', value: '3,076' },
            { label: 'Audited images', value: '3,000' },
            { label: 'Training', value: '2,143' },
            { label: 'Validation', value: '428' },
            { label: 'Test', value: '429' },
            { label: 'Classes', value: '7' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#D8D5C5] p-4 text-center">
              <p className="text-2xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</p>
              <p className="text-xs text-[#5A6B61] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Split badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Group-aware split', 'Leakage audited', 'Reproducible seed', 'Test isolated until final evaluation', 'SHA-256 duplicate check'].map(b => (
            <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-medium rounded-full border border-[#55B96A]/30">
              <CheckCircle2 className="w-3.5 h-3.5" />{b}
            </span>
          ))}
        </div>

        {/* Class distribution chart */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Class Distribution by Split</h2>
          <p className="text-xs text-[#5A6B61] mb-4">Note: Nematode and Healthy have significantly fewer samples. Class weighting was applied to reduce imbalance effects.</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={classDistribution} barSize={18}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
              <Bar dataKey="train" name="Training" fill="#2F7D4A" radius={[2, 2, 0, 0]} />
              <Bar dataKey="val" name="Validation" fill="#32BFC4" radius={[2, 2, 0, 0]} />
              <Bar dataKey="test" name="Test" fill="#E9A23B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            {[['#2F7D4A', 'Training'], ['#32BFC4', 'Validation'], ['#E9A23B', 'Test']].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                <span className="text-xs text-[#5A6B61]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit timeline */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Data Audit Timeline</h2>
          <div className="space-y-3">
            {auditSteps.map((s, i) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#EDF4EF] border-2 border-[#2F7D4A] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-[#2F7D4A]">{s.n}</span>
                  </div>
                  {i < auditSteps.length - 1 && <div className="w-0.5 h-4 bg-[#D8D5C5] mt-1" />}
                </div>
                <div className="pb-3">
                  <p className="text-sm font-medium text-[#17221C]">{s.label}</p>
                  <p className="text-xs text-[#5A6B61]">{s.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Known Dataset Limitations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Limited number of independent field environments',
              'Small support for Nematode and Healthy classes',
              'Possible remaining label ambiguity in visually overlapping cases',
              'Lack of true farm, plant, date, or acquisition-session identifiers',
              'Perceptual hashing groups similar images but cannot confirm biological identity',
              'External validation with completely independent field data is still required',
            ].map(l => (
              <div key={l} className="flex items-start gap-2.5 p-3 bg-[#FEF3C7] rounded-xl">
                <AlertTriangle className="w-3.5 h-3.5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-[#92400E]">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Download section */}
        <div className="bg-[#F5F3E8] rounded-2xl border border-[#D8D5C5] p-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Dataset Access</h2>
          <p className="text-sm text-[#5A6B61] mb-4">A public download button is not provided until redistribution rights are confirmed with the dataset source. The following information is available:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {['View original dataset source', 'View dataset card and audit methodology', 'Download split manifest (when permitted)', 'Request access for research collaboration'].map(a => (
              <button key={a} className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-xl border border-[#D8D5C5] text-sm text-[#5A6B61] hover:border-[#2F7D4A] hover:text-[#2F7D4A] transition-colors text-left">
                <Database className="w-4 h-4 flex-shrink-0" />{a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
