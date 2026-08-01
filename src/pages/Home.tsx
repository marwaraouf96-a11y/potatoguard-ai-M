import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Scan, BookOpen, ArrowRight, ChevronRight, Info,
  Camera, Brain, Eye, Sprout, Shield, FileText, BarChart3,
  CheckCircle2, AlertTriangle, FlaskConical, Microscope,
  Leaf, Database, Target, TrendingUp
} from 'lucide-react'

// Leaf images imported from src/imports
import leaf1 from '../imports/1.jpg'
import leaf2 from '../imports/2.jpg'
import leaf3 from '../imports/3.jpg'

const metrics = [
  { label: 'Raw images reviewed', value: '3,076', mono: true },
  { label: 'Audited modelling images', value: '3,000', mono: true },
  { label: 'Visual classes', value: '7', mono: false },
  { label: 'Held-out test images', value: '429', mono: true },
  { label: 'Test accuracy', value: '83.45%', mono: false },
  { label: 'Macro F1', value: '83.66%', mono: false },
  { label: 'Balanced accuracy', value: '85.11%', mono: false },
  { label: 'Calibration error (ECE)', value: '3.85%', mono: false },
]

const steps = [
  { icon: Camera, step: '01', title: 'Capture', desc: 'Take a clear photo of one potato leaf in natural light.' },
  { icon: Brain, step: '02', title: 'Analyze', desc: 'The deep-learning model examines the visual patterns.' },
  { icon: Eye, step: '03', title: 'Understand', desc: 'Receive the likely class, confidence, alternatives, and visual explanation.' },
  { icon: Shield, step: '04', title: 'Act Responsibly', desc: 'Review field guidance or consult an agricultural specialist.' },
]

const benefits = [
  { icon: Scan, title: 'Fast Preliminary Screening', desc: 'Identify the most likely visual condition without waiting for a laboratory result.' },
  { icon: Target, title: 'Understand Model Confidence', desc: 'Know whether the prediction is confident, moderate, or uncertain before acting.' },
  { icon: FileText, title: 'Build a Field Record', desc: 'Save scans and monitor repeated observations from the same field over time.' },
]

const pipeline = [
  'Raw Dataset', 'Corrupted Image Audit', 'Exact Duplicate Audit', 'Near-Duplicate Grouping',
  'Group-Aware Split', 'Transfer Learning', 'Validation-Based Selection', 'Held-Out Evaluation',
  'Error Analysis', 'Grad-CAM & Deployment'
]

const diseaseClasses = [
  { name: 'Bacteria', desc: 'Irregular water-soaked lesions, often with yellow halos', color: '#E9A23B', bg: '#FEF3C7' },
  { name: 'Fungi', desc: 'Brown spots, powdery coatings, or concentric ring patterns', color: '#8B6347', bg: '#FEF2E8' },
  { name: 'Healthy', desc: 'Uniform green leaf surface with no visible lesions', color: '#2F7D4A', bg: '#EDF4EF' },
  { name: 'Nematode', desc: 'Yellowing, stunted growth, or distorted leaf margins', color: '#7C3AED', bg: '#EDE9FE' },
  { name: 'Pest', desc: 'Holes, mining trails, or feeding damage on leaf tissue', color: '#C95858', bg: '#FEE2E2' },
  { name: 'Phytophthora', desc: 'Dark water-soaked lesions with white sporulation', color: '#1D4ED8', bg: '#DBEAFE' },
  { name: 'Virus', desc: 'Mosaic patterns, curling, or chlorotic ring spots', color: '#D97706', bg: '#FEF3C7' },
]

function MetricStrip() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-[#12372A] py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #55B96A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #32BFC4 0%, transparent 50%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-5 justify-center">
          <span className="text-xs font-medium text-[#55B96A] uppercase tracking-widest">Project evaluation results</span>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-[#5A8A70] cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[#17221C] text-[#D4ECD9] text-xs rounded-lg p-3 invisible group-hover:visible z-10">
              Real-world performance may differ due to lighting, image quality, backgrounds, geography, and field conditions. These are held-out test results, not performance guarantees.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {metrics.map((m, i) => (
            <div key={m.label} className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className={`text-xl sm:text-2xl font-bold text-white mb-0.5 ${m.mono ? 'font-mono' : ''}`} style={{ fontFamily: m.mono ? 'JetBrains Mono, monospace' : 'Sora, sans-serif' }}>{m.value}</div>
              <div className="text-[10px] text-[#5A8A70] uppercase tracking-wider leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [activeLeaf, setActiveLeaf] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveLeaf(v => (v + 1) % 3), 3500)
    return () => clearInterval(t)
  }, [])

  const leafImages = [leaf1, leaf2, leaf3]

  return (
    <div className="bg-[#F5F3E8]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EDF4EF] rounded-full border border-[#55B96A]/30 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse-soft" />
                <span className="text-xs font-medium text-[#2F7D4A]">AI-assisted screening · Research-grade evaluation</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#12372A] leading-tight mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
                Protect Potato Crops with <span className="text-[#2F7D4A]">Transparent AI</span>
              </h1>
              <p className="text-lg text-[#5A6B61] leading-relaxed mb-8">
                Upload or scan a potato leaf to receive an AI-assisted screening result, confidence analysis, and visual explanation — supported by a scientifically evaluated deep-learning pipeline.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link to="/diagnose" className="flex items-center gap-2 px-6 py-3 bg-[#2F7D4A] text-white font-semibold rounded-xl hover:bg-[#12372A] transition-colors shadow-sm">
                  <Scan className="w-5 h-5" />Scan a Potato Leaf
                </Link>
                <Link to="/research" className="flex items-center gap-2 px-6 py-3 border border-[#D8D5C5] bg-white text-[#17221C] font-medium rounded-xl hover:bg-[#F5F3E8] transition-colors">
                  <BookOpen className="w-5 h-5 text-[#5A6B61]" />Explore the Research
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-[#5A6B61]">
                {['Seven visual classes', 'Research-grade evaluation', 'Explainable predictions'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#55B96A]" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: leaf with scan overlay */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden bg-[#EDF4EF] aspect-[4/3] shadow-xl">
                {leafImages.map((img, i) => (
                  <img
                    key={i} src={img}
                    alt={`Potato leaf sample ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === activeLeaf ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                {/* Scan overlay */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, transparent 45%, rgba(50,191,196,0.08) 50%, transparent 55%)',
                    animation: 'leafScan 2.5s ease-in-out infinite'
                  }} />
                </div>
                {/* AI badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#32BFC4] animate-pulse-soft" />
                  <span className="text-xs text-white font-medium">ConvNeXtTiny — v3 Group-Aware</span>
                </div>
                {/* Confidence card */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-lg border border-[#D8D5C5] min-w-40">
                  <p className="text-[10px] text-[#5A6B61] uppercase tracking-widest mb-1">Most likely class</p>
                  <p className="text-sm font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>Healthy Leaf</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#5A6B61]">Confidence</span>
                      <span className="font-semibold text-[#2F7D4A]">91%</span>
                    </div>
                    <div className="h-1.5 bg-[#E8E5D6] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2F7D4A] rounded-full confidence-bar" style={{ width: '91%' }} />
                    </div>
                  </div>
                  <p className="text-[9px] text-[#5A6B61] mt-2">AI-assisted screening only</p>
                </div>
              </div>
              {/* Leaf thumbnails */}
              <div className="flex justify-center gap-2 mt-3">
                {leafImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveLeaf(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === activeLeaf ? 'bg-[#2F7D4A]' : 'bg-[#D8D5C5]'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metric strip */}
      <MetricStrip />

      {/* How it works */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#12372A] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>How It Works</h2>
            <p className="text-[#5A6B61] max-w-xl mx-auto">A transparent four-step process from field image to scientific screening result.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="relative bg-white rounded-2xl p-6 border border-[#D8D5C5] hover:border-[#2F7D4A] hover:shadow-md transition-all group">
                  {i < 3 && <div className="hidden lg:block absolute top-8 -right-3 z-10"><ChevronRight className="w-5 h-5 text-[#D8D5C5]" /></div>}
                  <div className="text-xs font-bold text-[#32BFC4] mb-3 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.step}</div>
                  <div className="w-10 h-10 bg-[#EDF4EF] group-hover:bg-[#2F7D4A] rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-[#2F7D4A] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</h3>
                  <p className="text-sm text-[#5A6B61] leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Farmer value section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-semibold rounded-full uppercase tracking-wider mb-4">For Farmers</span>
              <h2 className="text-3xl font-bold text-[#12372A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Practical field assistance without lab waiting times</h2>
              <p className="text-[#5A6B61] mb-6 leading-relaxed">PotatoGuard AI provides a preliminary visual screening result in seconds. It helps you understand what you might be dealing with — not to replace, but to inform the next conversation with an agricultural specialist.</p>
              <Link to="/diagnose" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F7D4A] hover:gap-3 transition-all">
                Try the AI model <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {benefits.map(b => {
                const Icon = b.icon
                return (
                  <div key={b.title} className="flex items-start gap-4 p-5 bg-[#F5F3E8] rounded-xl border border-[#D8D5C5]">
                    <div className="w-10 h-10 bg-[#EDF4EF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2F7D4A]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{b.title}</h3>
                      <p className="text-sm text-[#5A6B61]">{b.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Research transparency pipeline */}
      <section className="py-16 lg:py-20 bg-[#F5F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-[#12372A] text-[#55B96A] text-xs font-semibold rounded-full uppercase tracking-wider mb-4">Research Transparency</span>
            <h2 className="text-3xl font-bold text-[#12372A] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>More than a single model experiment</h2>
            <p className="text-[#5A6B61] max-w-2xl mx-auto">A rigorous pipeline from raw data acquisition to deployment-ready evaluation.</p>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max mx-auto px-4">
              {pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="px-4 py-2.5 bg-white rounded-lg border border-[#D8D5C5] shadow-sm hover:border-[#2F7D4A] transition-colors cursor-default">
                    <p className="text-[11px] font-medium text-[#17221C] whitespace-nowrap">{step}</p>
                  </div>
                  {i < pipeline.length - 1 && <ArrowRight className="w-4 h-4 text-[#32BFC4] flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/research" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D8D5C5] bg-white text-sm font-medium rounded-xl hover:bg-[#F5F3E8] transition-colors text-[#17221C]">
              <FlaskConical className="w-4 h-4 text-[#5A6B61]" />View Full Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Disease preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Seven Visual Classes</h2>
              <p className="text-[#5A6B61] max-w-xl">The model classifies potato leaf images into seven visual categories. Visual similarity alone cannot confirm the biological cause.</p>
            </div>
            <Link to="/diseases" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#2F7D4A] hover:underline">
              Full Disease Library <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {diseaseClasses.map(d => (
              <div key={d.name} className="group bg-[#F5F3E8] rounded-2xl p-5 border border-[#D8D5C5] hover:border-current hover:shadow-md transition-all cursor-pointer" style={{ '--tw-border-opacity': '1' } as any}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: d.bg }}>
                  <Leaf className="w-5 h-5" style={{ color: d.color }} />
                </div>
                <h3 className="text-base font-semibold text-[#17221C] mb-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>{d.name}</h3>
                <p className="text-sm text-[#5A6B61] mb-3 leading-relaxed">{d.desc}</p>
                <Link to={`/diseases/${d.name.toLowerCase()}`} className="text-xs font-semibold text-[#2F7D4A] hover:underline flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
            <div className="bg-[#EDF4EF] rounded-2xl p-5 border border-[#55B96A]/30 flex flex-col justify-between">
              <div>
                <AlertTriangle className="w-6 h-6 text-[#E9A23B] mb-3" />
                <p className="text-sm font-medium text-[#12372A] mb-2">Visual similarity alone cannot confirm biological cause</p>
                <p className="text-xs text-[#5A6B61]">Laboratory analysis by a qualified agronomist is required for definitive identification.</p>
              </div>
              <Link to="/diseases" className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#2F7D4A] hover:underline">
                View all disease profiles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="py-16 bg-[#12372A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 10% 50%, #55B96A 0%, transparent 50%), radial-gradient(circle at 90% 50%, #32BFC4 0%, transparent 50%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-[#1F5040] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-7 h-7 text-[#55B96A]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            AI supports field decisions — it does not replace agricultural expertise
          </h2>
          <p className="text-[#8BAE97] text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Low-confidence, unusual, or severe cases should always be reviewed by a qualified agronomist or laboratory. This platform provides preliminary visual screening, not guaranteed diagnosis.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Microscope, label: 'Consult an agronomist for severe symptoms' },
              { icon: AlertTriangle, label: 'Uncertainty is shown — not hidden' },
              { icon: Database, label: 'Test accuracy: 83.45% on 429 images' },
            ].map(item => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 bg-[#1F5040] rounded-xl">
                  <Icon className="w-5 h-5 text-[#32BFC4] flex-shrink-0" />
                  <span className="text-sm text-[#D4ECD9]">{item.label}</span>
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/diagnose" className="px-6 py-3 bg-[#2F7D4A] text-white font-semibold rounded-xl hover:bg-[#55B96A] transition-colors text-sm">
              Try AI-Assisted Screening
            </Link>
            <Link to="/research" className="px-6 py-3 border border-[#2A5540] text-[#D4ECD9] font-medium rounded-xl hover:bg-[#1F5040] transition-colors text-sm">
              Read the Research
            </Link>
          </div>
        </div>
      </section>

      {/* Field-to-Lab Learning Loop */}
      <section className="py-16 bg-[#F5F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-semibold rounded-full uppercase tracking-wider mb-4">Human-in-the-Loop Innovation</span>
              <h2 className="text-3xl font-bold text-[#12372A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Field-to-Lab Learning Loop</h2>
              <p className="text-[#5A6B61] mb-6 leading-relaxed">
                When farmers upload images with consent, ambiguous cases can be reviewed by agricultural experts. Over time, this responsible feedback cycle can improve future model versions — with explicit consent at every step.
              </p>
              <div className="space-y-3">
                {['No automatic retraining from unverified images', 'No automatic label changes', 'No research use without explicit consent', 'Expert-reviewed data stays separate from unreviewed'].map(r => (
                  <div key={r} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#55B96A] flex-shrink-0" />
                    <span className="text-sm text-[#5A6B61]">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Circular flow diagram */}
            <div className="relative">
              <div className="aspect-square max-w-sm mx-auto relative">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D8D5C5] animate-spin-slow opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#EDF4EF] rounded-full flex flex-col items-center justify-center border-2 border-[#2F7D4A]">
                    <Sprout className="w-8 h-8 text-[#2F7D4A]" />
                    <span className="text-[10px] font-semibold text-[#2F7D4A] mt-1">Learning Loop</span>
                  </div>
                </div>
                {[
                  { icon: Camera, label: 'Farmer Uploads', angle: 0 },
                  { icon: Brain, label: 'AI Screens', angle: 72 },
                  { icon: AlertTriangle, label: 'Flag Uncertain', angle: 144 },
                  { icon: Microscope, label: 'Expert Reviews', angle: 216 },
                  { icon: TrendingUp, label: 'Future Training', angle: 288 },
                ].map(item => {
                  const Icon = item.icon
                  const rad = (item.angle - 90) * Math.PI / 180
                  const r = 42
                  const x = 50 + r * Math.cos(rad)
                  const y = 50 + r * Math.sin(rad)
                  return (
                    <div key={item.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-white rounded-xl border border-[#D8D5C5] shadow-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#2F7D4A]" />
                        </div>
                        <span className="text-[9px] font-medium text-[#5A6B61] whitespace-nowrap">{item.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#12372A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Start your first scan</h2>
          <p className="text-[#5A6B61] mb-8 text-lg">No account required. Upload a potato leaf image and receive an AI-assisted preliminary screening result.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/diagnose" className="flex items-center gap-2 px-8 py-3.5 bg-[#2F7D4A] text-white font-semibold rounded-xl hover:bg-[#12372A] transition-colors shadow-sm text-base">
              <Scan className="w-5 h-5" />Scan a Potato Leaf
            </Link>
            <Link to="/auth/signup" className="flex items-center gap-2 px-8 py-3.5 border border-[#D8D5C5] text-[#17221C] font-medium rounded-xl hover:bg-[#F5F3E8] transition-colors text-base">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
