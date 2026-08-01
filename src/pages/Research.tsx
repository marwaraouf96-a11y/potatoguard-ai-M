import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, AlertTriangle, FlaskConical, TrendingUp, Database, BarChart3, Eye } from 'lucide-react'

const findings = [
  'Duplicate and near-duplicate control improved the credibility of evaluation.',
  'Class weighting produced a small improvement in class-balanced performance.',
  'ConvNeXtTiny produced a larger Macro F1 improvement than the weighted EfficientNetB3 experiment.',
  'The strongest single model outperformed the tested soft-voting combinations.',
  'Validation and Test Macro F1 differed by approximately 2.8 percentage points.',
  'Pest, Virus, and Fungi were among the weaker Test Recall classes.',
  'Calibration error was relatively low, but confidence should still be presented responsibly.',
  'Data quality and weak-class collection are more valuable next steps than simply increasing model size.',
]

const limitations = [
  'Perceptual hashes do not prove biological identity.',
  'Visual groups do not replace true plant or acquisition-session IDs.',
  'The Test set is one finite sample.',
  'Small classes have wide uncertainty (especially Nematode: 9 test images).',
  'Class weighting cannot create biological diversity.',
  'Grad-CAM is not causal proof.',
  'External field validation is still required.',
  'Real farm images may differ from the dataset.',
  'The model should not replace laboratory diagnosis.',
]

const roadmap = [
  { n: 1, text: 'Collect true plant, farm, date, and acquisition-session metadata.' },
  { n: 2, text: 'Obtain more independent samples for weak classes.' },
  { n: 3, text: 'Conduct agronomist review of ambiguous and high-confidence errors.' },
  { n: 4, text: 'Validate on a completely external dataset.' },
  { n: 5, text: 'Run multiple grouped folds or repeated seeds.' },
  { n: 6, text: 'Evaluate higher input resolution when lesions are small.' },
  { n: 7, text: 'Add out-of-distribution detection.' },
  { n: 8, text: 'Add calibrated uncertainty thresholds.' },
  { n: 9, text: 'Add expert-reviewed treatment and management content.' },
  { n: 10, text: 'Evaluate lightweight deployment models for mobile use.' },
]

const methodology = [
  'Dataset Audit', 'Leakage-Controlled Split', 'Moderate Augmentation', 'Transfer Learning',
  'Controlled Experiments', 'Validation-Based Selection', 'One-Time Test Evaluation',
  'Calibration', 'Error Analysis', 'Explainability', 'Deployment Export'
]

export default function Research() {
  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#12372A] text-[#55B96A] text-xs font-semibold rounded-full uppercase tracking-wider mb-5">Research Overview</span>
          <h1 className="text-4xl font-bold text-[#12372A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>The Science Behind PotatoGuard AI</h1>
          <p className="text-[#5A6B61] text-lg max-w-3xl mx-auto">
            How reliably can transfer-learning models classify seven visual potato leaf conditions while reducing duplicate leakage and reporting class-level uncertainty?
          </p>
        </div>

        {/* Research navigation cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Database, label: 'Datasets', to: '/datasets', desc: '3,076 raw → 3,000 audited images' },
            { icon: BarChart3, label: 'Model Performance', to: '/model-performance', desc: 'ConvNeXtTiny · 83.45% test accuracy' },
            { icon: AlertTriangle, label: 'Error Analysis', to: '/research/error-analysis', desc: '71 misclassified · 16.55% error rate' },
            { icon: Eye, label: 'Explainability', to: '/research/explainability', desc: 'Grad-CAM visual attention analysis' },
          ].map(c => {
            const Icon = c.icon
            return (
              <Link key={c.to} to={c.to} className="bg-white rounded-2xl border border-[#D8D5C5] p-5 hover:border-[#2F7D4A] hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-[#EDF4EF] group-hover:bg-[#2F7D4A] rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-[#2F7D4A] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#17221C] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{c.label}</h3>
                <p className="text-xs text-[#5A6B61]">{c.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-[#2F7D4A] font-medium">View details <ArrowRight className="w-3 h-3" /></div>
              </Link>
            )
          })}
        </div>

        {/* Methodology */}
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-8">
          <h2 className="text-xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Research Methodology</h2>
          <p className="text-sm text-[#5A6B61] mb-5">A reproducible pipeline from raw dataset to held-out evaluation.</p>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max">
              {methodology.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#EDF4EF] border-2 border-[#2F7D4A] flex items-center justify-center mb-1.5">
                      <span className="text-xs font-bold text-[#2F7D4A]">{i + 1}</span>
                    </div>
                    <span className="text-xs text-[#17221C] font-medium whitespace-nowrap text-center max-w-20 leading-tight">{step}</span>
                  </div>
                  {i < methodology.length - 1 && <ArrowRight className="w-4 h-4 text-[#32BFC4] flex-shrink-0 mb-5" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Findings + Limitations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6">
            <h2 className="text-xl font-bold text-[#12372A] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Main Research Findings</h2>
            <div className="space-y-3">
              {findings.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EDF4EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#2F7D4A]">{i + 1}</span>
                  </div>
                  <p className="text-sm text-[#5A6B61] leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6">
            <h2 className="text-xl font-bold text-[#12372A] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>Known Limitations</h2>
            <div className="space-y-2.5">
              {limitations.map((l, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#5A6B61]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Future roadmap */}
        <div className="bg-[#12372A] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #32BFC4 0%, transparent 50%)' }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-[#55B96A]" />
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Future Work Roadmap</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {roadmap.map(r => (
                <div key={r.n} className="flex items-start gap-3 p-3 bg-[#1F5040] rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-[#2F7D4A] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{r.n}</span>
                  <p className="text-sm text-[#D4ECD9]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
