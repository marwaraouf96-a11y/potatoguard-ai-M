import { useState } from 'react'
import { AlertTriangle, Info, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, CartesianGrid, Legend } from 'recharts'

const experiments = [
  { name: 'Exp A', backbone: 'EfficientNetB3', weighting: 'None', valAcc: '84.35%', valF1: '82.41%', selected: false },
  { name: 'Exp B', backbone: 'EfficientNetB3', weighting: 'Effective-number', valAcc: '83.41%', valF1: '83.64%', selected: false },
  { name: 'Exp C', backbone: 'ConvNeXtTiny', weighting: 'Effective-number', valAcc: '83.88%', valF1: '84.16%', selected: true },
]

const finalMetrics = [
  { label: 'Accuracy', value: '83.45%', ci: '79.95%–86.95%' },
  { label: 'Balanced Accuracy', value: '85.11%', ci: '80.37%–88.99%' },
  { label: 'Macro Precision', value: '82.77%', ci: '—' },
  { label: 'Macro Recall', value: '85.11%', ci: '—' },
  { label: 'Macro F1', value: '83.66%', ci: '79.69%–87.61%' },
  { label: 'MCC', value: '79.89%', ci: '75.65%–84.10%' },
]

const perClass = [
  { class: 'Bacteria', precision: 100.0, recall: 90.1, f1: 94.8, support: 81 },
  { class: 'Fungi', precision: 77.7, recall: 82.9, f1: 80.2, support: 105 },
  { class: 'Healthy', precision: 73.0, recall: 93.1, f1: 81.8, support: 29 },
  { class: 'Nematode', precision: 80.0, recall: 88.9, f1: 84.2, support: 9 },
  { class: 'Pest', precision: 84.4, recall: 76.5, f1: 80.2, support: 85 },
  { class: 'Phytophthora', precision: 84.1, recall: 84.1, f1: 84.1, support: 44 },
  { class: 'Virus', precision: 80.3, recall: 80.3, f1: 80.3, support: 76 },
]

const learningCurve = [
  { epoch: 1, train: 52, val: 55 }, { epoch: 5, train: 68, val: 66 }, { epoch: 10, train: 76, val: 74 },
  { epoch: 15, train: 81, val: 79 }, { epoch: 20, train: 84, val: 82 }, { epoch: 25, train: 86, val: 83 },
  { epoch: 30, train: 87, val: 83.9 },
]

type Metric = 'precision' | 'recall' | 'f1'

export default function ModelPerformance() {
  const [activeMetric, setActiveMetric] = useState<Metric>('f1')

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Model Performance</h1>
          <p className="text-[#5A6B61] max-w-2xl">Transparent evaluation of all experimental configurations. The selected model (Experiment C) was chosen before inspecting test labels.</p>
        </div>

        {/* Experiment comparison */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <h2 className="text-base font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Model Experiment Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E5D6]">
                  {['Experiment', 'Backbone', 'Class Weighting', 'Val Accuracy', 'Val Macro F1', 'Status'].map(h => (
                    <th key={h} className="text-left py-3 pr-4 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E5D6]">
                {experiments.map(e => (
                  <tr key={e.name} className={e.selected ? 'bg-[#EDF4EF]' : ''}>
                    <td className="py-3 pr-4 font-semibold text-[#17221C]">{e.name}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-[#5A6B61]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{e.backbone}</td>
                    <td className="py-3 pr-4 text-[#5A6B61]">{e.weighting}</td>
                    <td className="py-3 pr-4 font-mono text-xs font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{e.valAcc}</td>
                    <td className="py-3 pr-4 font-mono text-xs font-semibold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{e.valF1}</td>
                    <td className="py-3 pr-4">
                      {e.selected ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2F7D4A]"><CheckCircle2 className="w-3.5 h-3.5" />Selected</span>
                      ) : (
                        <span className="text-xs text-[#5A6B61]">Baseline</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-[#F5F3E8] rounded-xl text-sm text-[#5A6B61] space-y-1">
            <p>• Class weighting increased Macro F1 slightly while reducing overall Accuracy slightly (A→B).</p>
            <p>• ConvNeXtTiny produced a larger Macro F1 improvement than the weighted EfficientNetB3 (B→C).</p>
            <p>• Experiment C was selected using Validation Macro F1 before any test labels were inspected.</p>
          </div>
        </div>

        {/* Final test metrics */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Final Held-Out Test Metrics</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF4EF] rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2F7D4A]" />
              <span className="text-xs font-medium text-[#2F7D4A]">429 test images · One-time evaluation</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            {finalMetrics.map(m => (
              <div key={m.label} className="text-center p-4 bg-[#F5F3E8] rounded-xl">
                <p className="text-xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</p>
                <p className="text-xs font-medium text-[#17221C] mt-1">{m.label}</p>
                {m.ci !== '—' && <p className="text-[10px] text-[#5A6B61] mt-0.5">95% CI: {m.ci}</p>}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2.5 p-3.5 bg-[#FEF3C7] rounded-xl">
            <Info className="w-4 h-4 text-[#E9A23B] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#92400E]">The 95% confidence intervals were computed using bootstrap resampling. They reflect the uncertainty in point estimates from a single finite test set, not expected variability in deployment.</p>
          </div>
        </div>

        {/* Per-class metrics */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Per-Class Performance</h2>
            <div className="flex gap-1 bg-[#F5F3E8] rounded-lg p-1">
              {(['f1', 'precision', 'recall'] as Metric[]).map(m => (
                <button key={m} onClick={() => setActiveMetric(m)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${activeMetric === m ? 'bg-[#2F7D4A] text-white' : 'text-[#5A6B61] hover:text-[#17221C]'}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E5D6]">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">Class</th>
                  <th className="text-right py-2 pr-4 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">Precision</th>
                  <th className="text-right py-2 pr-4 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">Recall</th>
                  <th className="text-right py-2 pr-4 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">F1-score</th>
                  <th className="text-right py-2 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E5D6]">
                {perClass.map(c => (
                  <tr key={c.class} className="hover:bg-[#F5F3E8] transition-colors">
                    <td className="py-2.5 pr-4 font-medium text-[#17221C]">
                      {c.class}
                      {c.class === 'Nematode' && <span className="ml-2 text-[10px] text-[#E9A23B] font-normal">⚠ Very low support</span>}
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.precision}%</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.recall}%</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-xs font-bold text-[#12372A]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.f1}%</td>
                    <td className="py-2.5 text-right font-mono text-xs text-[#5A6B61]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={perClass} barSize={28}>
              <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#5A6B61' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 105]} tick={{ fontSize: 11, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={35} />
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
              <Bar dataKey={activeMetric} fill="#2F7D4A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning curve */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
            <h2 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Training & Validation Accuracy</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={learningCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5D6" />
                <XAxis dataKey="epoch" tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} label={{ value: 'Epoch', position: 'insideBottom', fontSize: 10, fill: '#5A6B61' }} />
                <YAxis domain={[45, 95]} tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={30} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#5A6B61' }} />
                <Line type="monotone" dataKey="train" stroke="#2F7D4A" strokeWidth={2} dot={false} name="Training" />
                <Line type="monotone" dataKey="val" stroke="#32BFC4" strokeWidth={2} dot={false} name="Validation" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Calibration */}
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
            <h2 className="text-sm font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Calibration</h2>
            <p className="text-xs text-[#5A6B61] mb-4">A confidence of 80% should ideally correspond to approximately 80% correctness among similar predictions.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-[#EDF4EF] rounded-xl">
                <p className="text-2xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>0.0385</p>
                <p className="text-xs text-[#5A6B61] mt-1">Expected Calibration Error (ECE)</p>
              </div>
              <div className="text-center p-4 bg-[#EDF4EF] rounded-xl">
                <p className="text-2xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>0.2449</p>
                <p className="text-xs text-[#5A6B61] mt-1">Multiclass Brier Score</p>
              </div>
            </div>
            <div className="p-3 bg-[#F5F3E8] rounded-lg">
              <p className="text-xs text-[#5A6B61]">ECE of 3.85% indicates relatively low calibration error, but confidence should still be presented responsibly. Low confidence results require additional caution.</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-[#FEF3C7] border border-[#E9A23B]/40 rounded-2xl">
          <AlertTriangle className="w-4 h-4 text-[#E9A23B] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#92400E]">
            All metrics are from a single held-out test set of 429 images. Real-world performance may differ due to image quality, lighting, backgrounds, and field conditions not represented in this dataset. The 95% confidence intervals reflect test-set sampling uncertainty, not deployment generalization.
          </p>
        </div>
      </div>
    </div>
  )
}
