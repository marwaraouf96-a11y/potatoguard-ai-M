import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Leaf, ArrowRight, AlertTriangle, Search, Columns2, BookOpen, CheckCircle2, X } from 'lucide-react'

const diseases = [
  {
    id: 'bacteria',
    name: 'Bacteria',
    arabicName: 'البكتيريا',
    color: '#E9A23B', bg: '#FEF3C7',
    desc: 'Bacterial infections of potato leaves typically produce water-soaked lesions that often have yellow halos. The appearance can vary considerably depending on the bacterial species and environmental conditions.',
    patterns: ['Water-soaked, dark lesions', 'Yellow halo surrounding lesions', 'Wilting of leaf margins', 'Angular spots limited by leaf veins', 'Brown necrotic patches'],
    confusions: ['Fungal lesions can appear similar in early stages', 'Phytophthora water-soaked symptoms may overlap'],
    model_note: 'Bacteria achieved the highest Precision (100%) and F1 (94.8%) of all classes in the held-out test set, suggesting relatively distinct visual features.',
    test_support: 81,
    precision: '100.0%', recall: '90.1%', f1: '94.8%',
  },
  {
    id: 'fungi',
    name: 'Fungi',
    arabicName: 'الفطريات',
    color: '#8B6347', bg: '#FEF2E8',
    desc: 'Fungal diseases are among the most common potato leaf conditions. They can appear as powdery coatings, concentric rings, or irregular brown spots depending on the fungal species.',
    patterns: ['Brown or dark concentric ring spots', 'Powdery white or grey coatings', 'Irregular necrotic areas', 'Yellowing around lesion borders', 'Target-like appearance'],
    confusions: ['Pest damage (overlapping test confusion)', 'Phytophthora (similar water-soaked lesions)', 'Virus mosaic patterns in early stages'],
    model_note: 'Fungi is among the most commonly confused classes in this model. Confusions with Pest (both directions) and Phytophthora were observed in the validation error analysis.',
    test_support: 105,
    precision: '77.7%', recall: '82.9%', f1: '80.2%',
  },
  {
    id: 'healthy',
    name: 'Healthy',
    arabicName: 'سليم',
    color: '#2F7D4A', bg: '#EDF4EF',
    desc: 'Healthy potato leaves show uniform green coloration with no visible lesions, discoloration, or deformation. The AI model uses this class as a contrast baseline for detecting abnormal patterns.',
    patterns: ['Uniform green leaf color', 'No visible spots or lesions', 'Intact margins', 'Normal vein structure', 'No wilting or deformation'],
    confusions: ['Mild early-stage infections may be classified as Healthy', 'Pest → Healthy confusion was observed in error analysis'],
    model_note: 'Healthy has the highest Recall (93.1%) but only 29 test samples. Its metrics should be interpreted with caution due to the very small test support.',
    test_support: 29,
    precision: '73.0%', recall: '93.1%', f1: '81.8%',
  },
  {
    id: 'nematode',
    name: 'Nematode',
    arabicName: 'النيماتودا',
    color: '#7C3AED', bg: '#EDE9FE',
    desc: 'Nematode infections affect potato plants at the root level, but their effects are visible in leaves as yellowing, stunted growth, or unusual discoloration patterns.',
    patterns: ['Yellowing of leaf margins', 'Interveinal chlorosis', 'Stunted or distorted leaves', 'Generalized plant decline symptoms'],
    confusions: ['Viral discoloration may look similar', 'Nutrient deficiency patterns can overlap'],
    model_note: 'Nematode has only 9 test samples — the smallest support of all classes. Its F1 of 84.2% should be interpreted with high uncertainty. The 95% CI for class-level metrics would be very wide.',
    test_support: 9,
    precision: '80.0%', recall: '88.9%', f1: '84.2%',
  },
  {
    id: 'pest',
    name: 'Pest',
    arabicName: 'الآفات',
    color: '#C95858', bg: '#FEE2E2',
    desc: 'Insect and pest damage creates distinctive patterns including feeding holes, mining trails, or chewed leaf margins. The appearance depends on the pest species involved.',
    patterns: ['Circular or irregular holes', 'Leaf mining trails', 'Feeding damage on margins', 'Stippling or rasping marks', 'Skeletonized leaf areas'],
    confusions: ['Fungi lesions overlap in visual texture', 'Early feeding damage may look like early fungal spots'],
    model_note: 'Pest was among the weaker Recall classes (76.5%) in the held-out test. Pest ↔ Fungi confusion was one of the most frequent error patterns in the validation analysis.',
    test_support: 85,
    precision: '84.4%', recall: '76.5%', f1: '80.2%',
  },
  {
    id: 'phytophthora',
    name: 'Phytophthora',
    arabicName: 'الفيتوفثورا',
    color: '#1D4ED8', bg: '#DBEAFE',
    desc: 'Phytophthora infestans is the cause of potato late blight — one of the most economically devastating plant diseases. It produces characteristic dark, water-soaked lesions, often with white sporulation on the underside.',
    patterns: ['Dark, water-soaked lesions', 'White sporulation on leaf underside in humid conditions', 'Lesions rapidly expand across the leaf', 'Brown-black necrosis', 'Pale yellow border'],
    confusions: ['Fungi with dark lesions can appear similar', 'Bacteria with water-soaked appearance'],
    model_note: 'Note: the internal model class may be stored as "Phytopthora" (single h). The platform displays the scientifically corrected label "Phytophthora" in all user-facing interfaces.',
    test_support: 44,
    precision: '84.1%', recall: '84.1%', f1: '84.1%',
  },
  {
    id: 'virus',
    name: 'Virus',
    arabicName: 'الفيروسات',
    color: '#D97706', bg: '#FEF3C7',
    desc: 'Viral infections of potato plants create characteristic mosaic patterns, ring spots, leaf curling, or chlorotic mottling. Multiple viral species affect potatoes.',
    patterns: ['Mosaic or mottling discoloration', 'Chlorotic ring spots', 'Leaf curling or deformation', 'Necrotic flecks', 'Yellowing interveinal areas'],
    confusions: ['Fungal patterns can overlap in certain conditions', 'Nematode-induced yellowing may look similar'],
    model_note: 'Virus showed Recall of 80.3% in the held-out test. Virus → Fungi confusion was observed in the validation error analysis.',
    test_support: 76,
    precision: '80.3%', recall: '80.3%', f1: '80.3%',
  },
]

function DiseaseDetail({ id }: { id: string }) {
  const d = diseases.find(d => d.id === id)
  if (!d) return <div className="p-8 text-center text-[#5A6B61]">Disease class not found.</div>

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/diseases" className="flex items-center gap-1.5 text-sm text-[#5A6B61] hover:text-[#17221C] mb-6 transition-colors">
          ← Back to Disease Library
        </Link>
        <div className="bg-white rounded-2xl border border-[#D8D5C5] p-6 mb-5">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: d.bg }}>
              <Leaf className="w-6 h-6" style={{ color: d.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>{d.name}</h1>
              <p className="text-[#5A6B61] text-base" dir="rtl">{d.arabicName}</p>
            </div>
          </div>
          <p className="text-[#5A6B61] leading-relaxed mb-6">{d.desc}</p>
          <div className="grid sm:grid-cols-3 gap-4 p-4 bg-[#F5F3E8] rounded-xl">
            {[{ label: 'Precision', value: d.precision }, { label: 'Recall', value: d.recall }, { label: 'F1-score', value: d.f1 }].map(m => (
              <div key={m.label} className="text-center">
                <p className="text-xl font-bold text-[#12372A] font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</p>
                <p className="text-xs text-[#5A6B61]">{m.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5A6B61] mt-2 text-center">Held-out test metrics · {d.test_support} test images</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
            <h2 className="text-sm font-semibold text-[#17221C] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Common Visual Patterns</h2>
            <div className="space-y-2">
              {d.patterns.map(p => (
                <div key={p} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#55B96A] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#5A6B61]">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5">
            <h2 className="text-sm font-semibold text-[#17221C] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Conditions That May Look Similar</h2>
            <div className="space-y-2">
              {d.confusions.map(c => (
                <div key={c} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#5A6B61]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#EDF4EF] rounded-2xl border border-[#55B96A]/30 p-5 mb-5">
          <h2 className="text-sm font-semibold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>What the AI Model Can and Cannot Detect</h2>
          <p className="text-sm text-[#5A6B61]">{d.model_note}</p>
        </div>

        <div className="bg-[#FEF3C7] rounded-2xl border border-[#E9A23B]/40 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#92400E] mb-1">When to consult an expert</p>
              <p className="text-sm text-[#92400E]">Visual similarity alone cannot confirm biological cause. If symptoms are severe, spreading rapidly, or the model confidence is low, consult a qualified agronomist or submit a laboratory sample.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DiseaseLibrary() {
  const { className } = useParams<{ className?: string }>()
  if (className) return <DiseaseDetail id={className} />

  const [search, setSearch] = useState('')
  const [compare, setCompare] = useState<string[]>([])

  const filtered = diseases.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))

  function toggleCompare(id: string) {
    setCompare(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 2 ? [...prev, id] : prev)
  }

  const compareItems = diseases.filter(d => compare.includes(d.id))

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#12372A] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Disease Library</h1>
            <p className="text-[#5A6B61]">Visual reference for the seven classes used in AI screening. Visual similarity alone cannot confirm biological cause.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B61]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 border border-[#D8D5C5] rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
              placeholder="Search classes…" />
          </div>
        </div>

        {compare.length === 2 && (
          <div className="bg-white rounded-2xl border border-[#D8D5C5] p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#17221C]" style={{ fontFamily: 'Sora, sans-serif' }}>Comparing: {compareItems[0].name} vs {compareItems[1].name}</h2>
              <button onClick={() => setCompare([])} className="text-[#5A6B61] hover:text-[#17221C]"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {compareItems.map(d => (
                <div key={d.id} className="p-4 rounded-xl" style={{ backgroundColor: d.bg }}>
                  <h3 className="font-semibold mb-2" style={{ color: d.color, fontFamily: 'Sora, sans-serif' }}>{d.name}</h3>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    {[['Prec.', d.precision], ['Recall', d.recall], ['F1', d.f1]].map(([l, v]) => (
                      <div key={l}><p className="text-sm font-bold text-[#17221C]">{v}</p><p className="text-xs text-[#5A6B61]">{l}</p></div>
                    ))}
                  </div>
                  <p className="text-xs text-[#5A6B61]">{d.test_support} test samples</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {compare.length < 2 && compare.length > 0 && (
          <div className="bg-[#EDF4EF] rounded-xl border border-[#55B96A]/30 p-4 mb-6 flex items-center gap-3">
            <Columns2 className="w-4 h-4 text-[#2F7D4A]" />
            <p className="text-sm text-[#2F7D4A]">Select one more class to compare.</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(d => (
            <div key={d.id} className={`bg-white rounded-2xl border transition-all ${compare.includes(d.id) ? 'border-[#2F7D4A] shadow-md' : 'border-[#D8D5C5] hover:border-[#55B96A] hover:shadow-sm'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: d.bg }}>
                    <Leaf className="w-5 h-5" style={{ color: d.color }} />
                  </div>
                  <button
                    onClick={() => toggleCompare(d.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${compare.includes(d.id) ? 'bg-[#2F7D4A] text-white' : 'border border-[#D8D5C5] text-[#5A6B61] hover:border-[#2F7D4A] hover:text-[#2F7D4A]'}`}
                  >
                    {compare.includes(d.id) ? '✓ Selected' : 'Compare'}
                  </button>
                </div>
                <h2 className="text-base font-semibold text-[#17221C] mb-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{d.name}</h2>
                <p className="text-xs text-[#5A6B61] mb-3" dir="rtl">{d.arabicName}</p>
                <div className="grid grid-cols-3 gap-1 text-center mb-3">
                  {[['Prec.', d.precision], ['Recall', d.recall], ['F1', d.f1]].map(([l, v]) => (
                    <div key={l} className="p-1.5 bg-[#F5F3E8] rounded-lg">
                      <p className="text-xs font-bold text-[#17221C]">{v}</p>
                      <p className="text-[10px] text-[#5A6B61]">{l}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#5A6B61] mb-4 leading-relaxed line-clamp-2">{d.patterns[0]}, {d.patterns[1]}</p>
                <Link to={`/diseases/${d.id}`} className="flex items-center gap-1.5 text-sm font-medium text-[#2F7D4A] hover:gap-2 transition-all">
                  View full profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-[#FEF3C7] border border-[#E9A23B]/40 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-[#E9A23B] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#92400E]">
            <strong>Important:</strong> Visual similarity alone cannot confirm biological cause. These class profiles are based on the training dataset and model behavior. Laboratory analysis by a qualified agronomist is required for definitive identification. Do not use this platform to prescribe treatments.
          </p>
        </div>
      </div>
    </div>
  )
}
