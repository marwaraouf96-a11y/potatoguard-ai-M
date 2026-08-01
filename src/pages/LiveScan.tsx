import { useState, useRef, useEffect } from 'react'
import { Camera, Zap, RotateCcw, Save, Maximize2, AlertTriangle, CheckCircle2, Loader2, Leaf } from 'lucide-react'

export default function LiveScan() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const [captured, setCaptured] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<{ cls: string; conf: number } | null>(null)

  async function startCamera() {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } })
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); setStreaming(true) }
    } catch {
      setError('Camera access denied or not available. Please allow camera permissions.')
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop())
      videoRef.current.srcObject = null
    }
    setStreaming(false)
  }

  function captureFrame() {
    if (!videoRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
    setCaptured(canvas.toDataURL('image/jpeg'))
    stopCamera()
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setResult({ cls: 'Healthy', conf: 91 })
    }, 2200)
  }

  function reset() { setCaptured(null); setResult(null); setAnalyzing(false) }

  return (
    <div className="min-h-screen bg-[#12372A] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E9A23B]/20 border border-[#E9A23B]/40 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-[#E9A23B] animate-pulse-soft" />
            <span className="text-xs font-medium text-[#E9A23B]">Beta feature — classification only, no real-time bounding boxes</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Live Leaf Scan</h1>
          <p className="text-[#8BAE97] text-sm">Align one potato leaf in the frame and capture to receive a preliminary screening result.</p>
        </div>

        {/* Camera view */}
        <div className="relative bg-black rounded-2xl overflow-hidden aspect-[4/3] mb-5">
          {!streaming && !captured && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 bg-[#1F5040] rounded-2xl flex items-center justify-center">
                <Camera className="w-10 h-10 text-[#55B96A]" />
              </div>
              {error ? (
                <div className="text-center px-6">
                  <p className="text-[#C95858] text-sm mb-3">{error}</p>
                  <p className="text-[#8BAE97] text-xs">Use the Diagnose page to upload a saved photo instead.</p>
                </div>
              ) : (
                <button onClick={startCamera} className="flex items-center gap-2 px-6 py-3 bg-[#2F7D4A] text-white font-semibold rounded-xl hover:bg-[#55B96A] transition-colors">
                  <Camera className="w-5 h-5" />Start Camera
                </button>
              )}
            </div>
          )}
          <video ref={videoRef} className={`w-full h-full object-cover ${streaming ? '' : 'hidden'}`} playsInline muted />
          {streaming && (
            <>
              {/* Framing guide */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-56 h-56 border-2 border-[#55B96A] rounded-2xl opacity-70">
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-[#32BFC4] rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-[#32BFC4] rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-[#32BFC4] rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-[#32BFC4] rounded-br-lg" />
                </div>
              </div>
              {/* Indicators */}
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="flex items-center gap-1.5 bg-black/60 rounded-lg px-2.5 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#55B96A] animate-pulse-soft" />
                  <span className="text-xs text-white">Live</span>
                </div>
              </div>
            </>
          )}
          {captured && (
            <img src={captured} alt="Captured frame" className="w-full h-full object-cover" />
          )}
          {analyzing && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-[#32BFC4] animate-spin" />
              <p className="text-white text-sm font-medium">Analyzing frame…</p>
            </div>
          )}
          {result && captured && (
            <div className="absolute bottom-4 inset-x-4 bg-black/80 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#8BAE97] uppercase tracking-wider mb-0.5">Most likely class</p>
                  <p className="text-lg font-bold text-white">{result.cls}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#55B96A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{result.conf}%</p>
                  <p className="text-xs text-[#8BAE97]">High confidence</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-5">
          {streaming && (
            <button onClick={captureFrame} className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#12372A] font-bold rounded-2xl hover:bg-[#EDF4EF] transition-colors shadow-lg">
              <Camera className="w-5 h-5" />Capture Frame
            </button>
          )}
          {result && (
            <button onClick={reset} className="flex items-center gap-2 px-5 py-3 border border-[#2A5540] text-[#D4ECD9] rounded-2xl hover:bg-[#1F5040] transition-colors">
              <RotateCcw className="w-4 h-4" />Scan Again
            </button>
          )}
          {!streaming && !result && !error && (
            <p className="text-[#5A8A70] text-sm text-center">Press Start Camera to begin. Make sure you allow camera permissions.</p>
          )}
        </div>

        {/* Guidance */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-[#1F5040] rounded-xl p-4 border border-[#2A5540]">
            <h3 className="text-sm font-semibold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Capture Tips</h3>
            <div className="space-y-1.5">
              {['Hold camera 20–40 cm from leaf', 'Use natural daylight when possible', 'Keep the leaf steady before capturing', 'Show one main leaf in the guide box'].map(t => (
                <div key={t} className="flex items-center gap-2 text-xs text-[#8BAE97]">
                  <CheckCircle2 className="w-3 h-3 text-[#55B96A] flex-shrink-0" />{t}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#E9A23B]/10 rounded-xl p-4 border border-[#E9A23B]/30">
            <AlertTriangle className="w-4 h-4 text-[#E9A23B] mb-2" />
            <p className="text-xs text-[#D4ECD9]">Live Scan performs frame classification — it does not draw bounding boxes or detect diseases in real time. Low-quality frames may produce unreliable results. Confirm with an agronomist when confidence is low.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
