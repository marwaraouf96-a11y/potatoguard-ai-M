import { useState, useRef, useCallback, DragEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Upload, Camera, Image, X, CheckCircle2, AlertCircle, AlertTriangle,
  Eye, EyeOff, RotateCcw, Save, Download, ChevronDown, ChevronUp,
  Loader2, Leaf, Microscope, Shield, Zap
} from 'lucide-react'

// Demo images
import demoLeaf1 from '../imports/1.jpg'
import demoLeaf2 from '../imports/2.jpg'
import demoLeaf3 from '../imports/3.jpg'

const CLASSES = ['Bacteria', 'Fungi', 'Healthy', 'Nematode', 'Pest', 'Phytophthora', 'Virus']

// Simulated predictions for demo
function getSimulatedResult(idx: number) {
  const demos = [
    { display_class: 'Healthy', confidence: 0.91, confidence_status: 'high', top: [{ class: 'Healthy', probability: 0.91 }, { class: 'Virus', probability: 0.06 }, { class: 'Fungi', probability: 0.02 }] },
    { display_class: 'Fungi', confidence: 0.78, confidence_status: 'moderate', top: [{ class: 'Fungi', probability: 0.78 }, { class: 'Pest', probability: 0.15 }, { class: 'Phytophthora', probability: 0.05 }] },
    { display_class: 'Pest', confidence: 0.52, confidence_status: 'uncertain', top: [{ class: 'Pest', probability: 0.52 }, { class: 'Fungi', probability: 0.31 }, { class: 'Bacteria', probability: 0.11 }] },
  ]
  return { ...demos[idx], model: 'ConvNeXtTiny', version: 'research_v3_groupaware', timestamp: new Date().toISOString() }
}

const confidenceConfig = {
  high: { label: 'High Confidence', color: '#2F7D4A', bg: '#EDF4EF', border: '#55B96A' },
  moderate: { label: 'Moderate Confidence', color: '#E9A23B', bg: '#FEF3C7', border: '#E9A23B' },
  uncertain: { label: 'Uncertain Result', color: '#C95858', bg: '#FEE2E2', border: '#C95858' },
}

const classInfo: Record<string, { desc: string; note: string }> = {
  Bacteria: { desc: 'Visual characteristics consistent with bacterial leaf infection patterns.', note: 'Bacteria and Fungi can appear visually similar in certain conditions.' },
  Fungi: { desc: 'Visual characteristics consistent with fungal disease patterns in potato leaves.', note: 'Fungi may be confused with Pest or Phytophthora in this model.' },
  Healthy: { desc: 'No significant disease-related visual patterns detected in this image.', note: 'Subtle early-stage infections may not be detectable from photos.' },
  Nematode: { desc: 'Visual characteristics consistent with nematode-related stress on leaf tissue.', note: 'Very few test samples (9) — metric uncertainty is higher for this class.' },
  Pest: { desc: 'Visual characteristics consistent with insect or pest feeding damage.', note: 'Pest damage can look similar to Fungi lesions in early stages.' },
  Phytophthora: { desc: 'Visual characteristics consistent with Phytophthora late blight patterns.', note: 'Phytophthora may be confused with Fungi in wet-lesion presentations.' },
  Virus: { desc: 'Visual characteristics consistent with viral mosaic or discoloration patterns.', note: 'Virus and Fungi can appear visually similar in some cases.' },
}

type Stage = 'idle' | 'uploading' | 'analyzing' | 'result'

const analysisSteps = ['Checking image quality', 'Preparing image', 'Running visual classification', 'Calculating confidence', 'Generating explanation']

export default function Diagnose() {
  const { user } = useAuth()
  const [stage, setStage] = useState<Stage>('idle')
  const [dragOver, setDragOver] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [demoIdx, setDemoIdx] = useState<number | null>(null)
  const [result, setResult] = useState<ReturnType<typeof getSimulatedResult> | null>(null)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [showGradcam, setShowGradcam] = useState(false)
  const [savedCase, setSavedCase] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const qualityChecks = [
    { label: 'Leaf visible', ok: true },
    { label: 'Image sharpness', ok: true },
    { label: 'Lighting quality', ok: imageUrl !== null },
    { label: 'Supported format', ok: true },
    { label: 'Adequate resolution', ok: true },
  ]

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) { alert('Please upload an image file.'); return }
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setDemoIdx(null)
    runAnalysis(null)
  }

  function useDemoImage(idx: number) {
    const demos = [demoLeaf1, demoLeaf2, demoLeaf3]
    setImageUrl(demos[idx])
    setDemoIdx(idx)
    runAnalysis(idx)
  }

  function runAnalysis(idx: number | null) {
    setStage('analyzing')
    setAnalysisStep(0)
    setSavedCase(false)
    let step = 0
    const interval = setInterval(() => {
      step++
      setAnalysisStep(step)
      if (step >= analysisSteps.length) {
        clearInterval(interval)
        setTimeout(() => {
          const r = getSimulatedResult(idx !== null ? idx : Math.floor(Math.random() * 3))
          setResult(r)
          setStage('result')
        }, 500)
      }
    }, 700)
  }

  function reset() {
    setStage('idle'); setImageUrl(null); setResult(null); setDemoIdx(null); setShowGradcam(false); setSavedCase(false)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const conf = result ? confidenceConfig[result.confidence_status as keyof typeof confidenceConfig] : null

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Microscope className="w-5 h-5 text-[#2F7D4A]" />
            <span className="text-sm font-medium text-[#5A6B61] uppercase tracking-wider">AI-Assisted Screening</span>
          </div>
          <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Diagnose a Potato Leaf</h1>
          <p className="text-[#5A6B61]">Upload a clear photo of one potato leaf to receive a preliminary screening result. No account required.</p>
        </div>

        {stage === 'idle' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upload area */}
            <div className="lg:col-span-2">
              <div
                onDrop={onDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors ${dragOver ? 'border-[#2F7D4A] bg-[#EDF4EF]' : 'border-[#D8D5C5] bg-white hover:border-[#55B96A]'}`}
              >
                <div className="w-16 h-16 bg-[#EDF4EF] rounded-2xl flex items-center justify-center mb-5">
                  <Upload className="w-8 h-8 text-[#2F7D4A]" />
                </div>
                <h2 className="text-lg font-semibold text-[#17221C] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Upload a leaf image</h2>
                <p className="text-sm text-[#5A6B61] mb-5">Drag and drop, or choose an action below</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#2F7D4A] text-white font-semibold rounded-lg text-sm hover:bg-[#12372A] transition-colors">
                    <Upload className="w-4 h-4" />Upload from Device
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                <p className="text-xs text-[#5A6B61] mt-4">Supported: JPG, PNG, WEBP · Max 10MB</p>
              </div>

              {/* Demo images */}
              <div className="mt-4">
                <p className="text-sm font-medium text-[#5A6B61] mb-3">Or try a demonstration image:</p>
                <div className="grid grid-cols-3 gap-3">
                  {[{ img: demoLeaf1, label: 'Sample 1' }, { img: demoLeaf2, label: 'Sample 2' }, { img: demoLeaf3, label: 'Sample 3' }].map((d, i) => (
                    <button key={i} onClick={() => useDemoImage(i)}
                      className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#EDF4EF] hover:ring-2 hover:ring-[#2F7D4A] transition-all group">
                      <img src={d.img} alt={d.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium">{d.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Capture guidance */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                <h3 className="text-sm font-semibold text-[#17221C] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Capture Guidance</h3>
                <div className="space-y-2">
                  {['Photograph one main potato leaf', 'Use natural or balanced lighting', 'Avoid motion blur', 'Keep the leaf reasonably close', 'Avoid covering symptoms with hands', 'Avoid overlapping leaves'].map(tip => (
                    <div key={tip} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#55B96A] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#5A6B61]">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#EDF4EF] rounded-2xl border border-[#55B96A]/30 p-4">
                <Shield className="w-5 h-5 text-[#2F7D4A] mb-2" />
                <p className="text-xs font-medium text-[#12372A] mb-1">AI-assisted screening only</p>
                <p className="text-xs text-[#5A6B61]">Results are preliminary. Confirm important field decisions with an agricultural specialist.</p>
              </div>
            </div>
          </div>
        )}

        {/* Analysis state */}
        {stage === 'analyzing' && imageUrl && (
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-8 text-center">
            <div className="relative w-48 h-36 mx-auto mb-6 rounded-xl overflow-hidden">
              <img src={imageUrl} alt="Uploading leaf" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#32BFC4]/10">
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to bottom, transparent 45%, rgba(50,191,196,0.4) 50%, transparent 55%)',
                  animation: 'leafScan 1.5s ease-in-out infinite'
                }} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Loader2 className="w-5 h-5 text-[#2F7D4A] animate-spin" />
              <span className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Analyzing image…</span>
            </div>
            <div className="max-w-xs mx-auto space-y-2">
              {analysisSteps.map((step, i) => (
                <div key={step} className={`flex items-center gap-3 text-sm transition-colors ${i < analysisStep ? 'text-[#2F7D4A]' : i === analysisStep ? 'text-[#17221C]' : 'text-[#D8D5C5]'}`}>
                  {i < analysisStep ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : i === analysisStep ? <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border border-[#D8D5C5] flex-shrink-0" />}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {stage === 'result' && result && imageUrl && (
          <div className="space-y-5">
            {/* Image + primary result */}
            <div className="grid lg:grid-cols-5 gap-5">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D8D5C5] overflow-hidden">
                <img src={imageUrl} alt="Analyzed leaf" className="w-full aspect-[4/3] object-cover" />
                <div className="p-3 border-t border-[#E8E5D6] flex gap-2">
                  {qualityChecks.map(q => (
                    <div key={q.label} className="flex-1 flex flex-col items-center gap-1">
                      {q.ok ? <CheckCircle2 className="w-3.5 h-3.5 text-[#55B96A]" /> : <AlertCircle className="w-3.5 h-3.5 text-[#E9A23B]" />}
                      <span className="text-[9px] text-[#5A6B61] text-center leading-tight">{q.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                {/* Primary result card */}
                <div className="bg-white rounded-2xl border-2 p-5" style={{ borderColor: conf?.border }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-[#5A6B61] uppercase tracking-wider mb-1">Most likely visual class</p>
                      <h2 className="text-3xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>{result.display_class}</h2>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color: conf?.color, backgroundColor: conf?.bg }}>
                      {conf?.label}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#5A6B61]">Confidence</span>
                      <span className="font-bold" style={{ color: conf?.color }}>{Math.round(result.confidence * 100)}%</span>
                    </div>
                    <div className="h-2.5 bg-[#E8E5D6] rounded-full overflow-hidden">
                      <div className="h-full rounded-full confidence-bar transition-all duration-1000" style={{ width: `${result.confidence * 100}%`, backgroundColor: conf?.color }} />
                    </div>
                  </div>
                  <p className="text-sm text-[#5A6B61] mb-3 leading-relaxed">{classInfo[result.display_class]?.desc}</p>
                  <div className="flex items-start gap-2 p-3 bg-[#FEF3C7] rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[#92400E]">{classInfo[result.display_class]?.note}</p>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-[#5A6B61]">
                    <span>Model: {result.model}</span>
                    <span>Version: {result.version}</span>
                    <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Top 3 predictions */}
                <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
                  <h3 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Top Predictions</h3>
                  <div className="space-y-3">
                    {result.top.map((p, i) => (
                      <div key={p.class}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={`font-medium ${i === 0 ? 'text-[#17221C]' : 'text-[#5A6B61]'}`}>{p.class}</span>
                          <span className="font-mono text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(p.probability * 100)}%</span>
                        </div>
                        <div className="h-2 bg-[#E8E5D6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full confidence-bar" style={{ width: `${p.probability * 100}%`, backgroundColor: i === 0 ? '#2F7D4A' : '#D8D5C5' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#5A6B61] mt-4">Showing top 3 of 7 classes. Alternative probabilities indicate visual ambiguity.</p>
                </div>
              </div>
            </div>

            {/* Uncertain banner */}
            {result.confidence_status === 'uncertain' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#C95858] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#C95858] mb-2">The system is not confident enough to provide a reliable screening result</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {['Retake the photo in better lighting', 'Capture one leaf at a closer distance', 'Avoid motion blur or background clutter', 'Submit for expert review if symptoms are severe'].map(a => (
                        <div key={a} className="flex items-center gap-2 text-xs text-[#5A6B61]"><ChevronRight className="w-3 h-3 text-[#C95858]" />{a}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grad-CAM */}
            <div className="bg-white rounded-2xl border border-[#D8D5C5]">
              <button onClick={() => setShowGradcam(v => !v)} className="w-full flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  {showGradcam ? <EyeOff className="w-5 h-5 text-[#5A6B61]" /> : <Eye className="w-5 h-5 text-[#5A6B61]" />}
                  <span className="text-sm font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Show AI Attention Map (Grad-CAM)</span>
                </div>
                {showGradcam ? <ChevronUp className="w-4 h-4 text-[#5A6B61]" /> : <ChevronDown className="w-4 h-4 text-[#5A6B61]" />}
              </button>
              {showGradcam && (
                <div className="border-t border-[#E8E5D6] p-5">
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {['Original', 'Attention Heatmap', 'Blended View'].map((label, i) => (
                      <div key={label} className="text-center">
                        <div className="rounded-xl overflow-hidden aspect-square bg-[#EDF4EF] relative mb-2">
                          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
                          {i === 1 && <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,60,60,0.5) 0%, rgba(255,165,0,0.4) 40%, rgba(50,191,196,0.3) 100%)' }} />}
                          {i === 2 && <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 40% 45%, rgba(200,60,60,0.5) 0%, transparent 60%)' }} />}
                        </div>
                        <span className="text-xs font-medium text-[#5A6B61]">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3.5 bg-[#F5F3E8] rounded-lg">
                    <p className="text-xs text-[#5A6B61] leading-relaxed">
                      <strong className="text-[#17221C]">What is Grad-CAM?</strong> The highlighted area indicates where the model focused while producing this prediction. It does not prove that this region is biologically responsible for the disease — it is a visualization tool to help understand model attention.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
              <h3 className="text-sm font-semibold text-[#17221C] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>What would you like to do?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {user ? (
                  <button onClick={() => setSavedCase(true)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${savedCase ? 'bg-[#EDF4EF] text-[#2F7D4A] border border-[#55B96A]' : 'bg-[#2F7D4A] text-white hover:bg-[#12372A]'}`}>
                    {savedCase ? <><CheckCircle2 className="w-4 h-4" />Case Saved</> : <><Save className="w-4 h-4" />Save Case</>}
                  </button>
                ) : (
                  <Link to="/auth/signup" className="flex items-center gap-2 px-4 py-2.5 bg-[#2F7D4A] text-white rounded-lg text-sm font-medium hover:bg-[#12372A] transition-colors">
                    <Save className="w-4 h-4" />Sign Up to Save
                  </Link>
                )}
                <button className="flex items-center gap-2 px-4 py-2.5 border border-[#D8D5C5] rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors">
                  <Download className="w-4 h-4" />Download Report
                </button>
                <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 border border-[#D8D5C5] rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors">
                  <RotateCcw className="w-4 h-4" />Scan Another Leaf
                </button>
                <Link to={`/diseases/${result.display_class.toLowerCase()}`} className="flex items-center gap-2 px-4 py-2.5 border border-[#D8D5C5] rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors">
                  <Leaf className="w-4 h-4" />View Disease Info
                </Link>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-[#D8D5C5] rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors">
                  <Microscope className="w-4 h-4" />Request Expert Review
                </button>
                <label className="flex items-center gap-2 px-4 py-2.5 border border-[#D8D5C5] rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#2F7D4A]" defaultChecked={false} />
                  Contribute to Research
                </label>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 bg-[#FEF3C7] border border-[#E9A23B]/40 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-[#E9A23B] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-[#92400E] leading-relaxed">
                <strong>AI-assisted screening only.</strong> Confirm important field decisions with a qualified agricultural specialist or agronomist. This result is a preliminary visual classification — not a clinical diagnosis. The model may confuse visually similar classes.
              </p>
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
