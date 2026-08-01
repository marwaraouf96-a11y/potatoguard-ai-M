import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Scan, AlertTriangle, CheckCircle2, Clock, BarChart3, Search,
  Filter, Download, Leaf, ChevronRight, TrendingUp, Eye, FlaskConical
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const summaryStats = [
  { label: 'Total Scans', value: '24', icon: Scan, color: '#2F7D4A', bg: '#EDF4EF' },
  { label: 'High Confidence', value: '18', icon: CheckCircle2, color: '#2F7D4A', bg: '#EDF4EF' },
  { label: 'Uncertain Cases', value: '4', icon: AlertTriangle, color: '#E9A23B', bg: '#FEF3C7' },
  { label: 'Pending Review', value: '2', icon: Clock, color: '#32BFC4', bg: '#E0F7F8' },
]

const mockCases = [
  { id: 'CASE-001', date: '2025-07-28', field: 'North Field A', predicted: 'Fungi', confidence: 78, status: 'reviewed', thumb: null },
  { id: 'CASE-002', date: '2025-07-27', field: 'Greenhouse 2', predicted: 'Healthy', confidence: 91, status: 'saved', thumb: null },
  { id: 'CASE-003', date: '2025-07-25', field: 'South Slope B', predicted: 'Pest', confidence: 52, status: 'pending-review', thumb: null },
  { id: 'CASE-004', date: '2025-07-22', field: 'North Field A', predicted: 'Phytophthora', confidence: 84, status: 'saved', thumb: null },
  { id: 'CASE-005', date: '2025-07-20', field: 'Greenhouse 1', predicted: 'Virus', confidence: 67, status: 'saved', thumb: null },
]

const classDistribution = [
  { name: 'Fungi', count: 8, fill: '#8B6347' },
  { name: 'Healthy', count: 6, fill: '#2F7D4A' },
  { name: 'Pest', count: 5, fill: '#C95858' },
  { name: 'Phytophthora', count: 3, fill: '#1D4ED8' },
  { name: 'Virus', count: 2, fill: '#D97706' },
]

const timelineData = [
  { date: 'Jul 1', scans: 2 }, { date: 'Jul 8', scans: 5 }, { date: 'Jul 15', scans: 7 },
  { date: 'Jul 22', scans: 6 }, { date: 'Jul 28', scans: 4 },
]

const confidenceData = [
  { range: '>90%', count: 8 }, { range: '70-90%', count: 10 }, { range: '50-70%', count: 4 }, { range: '<50%', count: 2 },
]

const confColors = { high: '#2F7D4A', moderate: '#E9A23B', uncertain: '#C95858' }

function statusBadge(status: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    reviewed: { label: 'Reviewed', color: '#2F7D4A', bg: '#EDF4EF' },
    saved: { label: 'Saved', color: '#5A6B61', bg: '#E8E5D6' },
    'pending-review': { label: 'Pending Review', color: '#E9A23B', bg: '#FEF3C7' },
  }
  const s = map[status] ?? map.saved
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ color: s.color, backgroundColor: s.bg }}>{s.label}</span>
}

function confColor(c: number) { return c >= 80 ? '#2F7D4A' : c >= 60 ? '#E9A23B' : '#C95858' }

export default function Dashboard() {
  const { profile } = useAuth()
  const [view, setView] = useState<'farmer' | 'research'>('farmer')
  const [search, setSearch] = useState('')

  const filtered = mockCases.filter(c =>
    c.field.toLowerCase().includes(search.toLowerCase()) ||
    c.predicted.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>
              Welcome back, {profile?.full_name?.split(' ')[0] ?? 'User'}
            </h1>
            <p className="text-sm text-[#5A6B61] mt-0.5 capitalize">{profile?.role} · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl border border-[#D8D5C5] p-1">
            <button onClick={() => setView('farmer')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'farmer' ? 'bg-[#2F7D4A] text-white' : 'text-[#5A6B61] hover:bg-[#F5F3E8]'}`}>
              Farmer View
            </button>
            <button onClick={() => setView('research')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'research' ? 'bg-[#2F7D4A] text-white' : 'text-[#5A6B61] hover:bg-[#F5F3E8]'}`}>
              Research View
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryStats.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <TrendingUp className="w-3.5 h-3.5 text-[#55B96A]" />
                </div>
                <p className="text-2xl font-bold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                <p className="text-xs text-[#5A6B61] mt-0.5">{s.label}</p>
              </div>
            )
          })}
        </div>

        {view === 'farmer' ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Case history */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-[#D8D5C5]">
                <div className="p-5 border-b border-[#E8E5D6] flex items-center justify-between flex-wrap gap-3">
                  <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Case History</h2>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5A6B61]" />
                      <input value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 border border-[#D8D5C5] rounded-lg text-xs bg-[#F5F3E8] focus:outline-none focus:ring-1 focus:ring-[#2F7D4A] w-36"
                        placeholder="Search cases…" />
                    </div>
                    <Link to="/diagnose" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2F7D4A] text-white rounded-lg text-xs font-medium hover:bg-[#12372A] transition-colors">
                      <Scan className="w-3.5 h-3.5" />New Scan
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-[#E8E5D6]">
                  {filtered.map(c => (
                    <div key={c.id} className="p-4 flex items-center gap-4 hover:bg-[#F5F3E8] transition-colors">
                      <div className="w-12 h-12 bg-[#EDF4EF] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-5 h-5 text-[#2F7D4A]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-[#17221C]">{c.predicted}</span>
                          {statusBadge(c.status)}
                        </div>
                        <div className="text-xs text-[#5A6B61] mt-0.5">{c.field} · {c.date}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold" style={{ color: confColor(c.confidence) }}>{c.confidence}%</div>
                        <div className="text-xs text-[#5A6B61]">confidence</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#D8D5C5]" />
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-8 text-center">
                      <Scan className="w-8 h-8 text-[#D8D5C5] mx-auto mb-2" />
                      <p className="text-sm text-[#5A6B61]">No cases match your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <h3 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Class Distribution</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={classDistribution} barSize={20}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={20} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {classDistribution.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-[#5A6B61] mt-2">Uploaded observations only — not confirmed disease prevalence</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <h3 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Scans Over Time</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={timelineData}>
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={20} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
                    <Line type="monotone" dataKey="scans" stroke="#2F7D4A" strokeWidth={2} dot={{ fill: '#2F7D4A', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#EDF4EF] rounded-2xl border border-[#55B96A]/30 p-4">
                <FlaskConical className="w-4 h-4 text-[#2F7D4A] mb-2" />
                <p className="text-xs font-medium text-[#12372A] mb-1">Research View Available</p>
                <p className="text-xs text-[#5A6B61]">Switch to Research View for model performance metrics, calibration, and dataset statistics.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Research view */
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Raw Images', value: '3,076', note: 'before audit' },
                { label: 'Audited Images', value: '3,000', note: 'for modelling' },
                { label: 'Test Accuracy', value: '83.45%', note: '429 test images' },
                { label: 'Macro F1', value: '83.66%', note: '95% CI: 79.7–87.6%' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                  <p className="text-2xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.value}</p>
                  <p className="text-sm font-medium text-[#17221C] mt-1">{s.label}</p>
                  <p className="text-xs text-[#5A6B61]">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <h3 className="text-sm font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Confidence Distribution</h3>
                <p className="text-xs text-[#5A6B61] mb-4">Your saved scans by confidence band</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={confidenceData} barSize={32}>
                    <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#5A6B61' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#5A6B61' }} axisLine={false} tickLine={false} width={20} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #D8D5C5', fontSize: 12 }} />
                    <Bar dataKey="count" fill="#2F7D4A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <h3 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Dataset Split</h3>
                <div className="space-y-3">
                  {[{ label: 'Training', count: 2143, pct: 71.4, color: '#2F7D4A' }, { label: 'Validation', count: 428, pct: 14.3, color: '#32BFC4' }, { label: 'Test', count: 429, pct: 14.3, color: '#E9A23B' }].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-[#17221C]">{s.label}</span>
                        <span className="text-[#5A6B61] font-mono text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.count} ({s.pct}%)</span>
                      </div>
                      <div className="h-2 bg-[#E8E5D6] rounded-full">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Group-aware', 'Leakage audited', 'Reproducible seed'].map(b => (
                    <span key={b} className="px-2.5 py-1 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-medium rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/model-performance" className="flex items-center gap-2 px-5 py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-xl text-sm hover:bg-[#12372A] transition-colors">
                <BarChart3 className="w-4 h-4" />Full Model Performance
              </Link>
              <Link to="/research/error-analysis" className="flex items-center gap-2 px-5 py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-xl text-sm hover:bg-white transition-colors">
                <Eye className="w-4 h-4" />Error Analysis
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
}
