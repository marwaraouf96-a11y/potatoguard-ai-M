import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-[#12372A] text-[#D4ECD9] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#2F7D4A] rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard AI</div>
                <div className="text-[10px] text-[#32BFC4] tracking-widest uppercase font-medium">Research Platform</div>
              </div>
            </div>
            <p className="text-sm text-[#8BAE97] leading-relaxed">{t('footer_desc')}</p>
            <p className="text-xs text-[#5A8A70] mt-3">{t('footer_not_clinical')}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{t('footer_platform')}</h3>
            <ul className="space-y-2">
              {[['/', t('nav_home')], ['/diagnose', t('nav_diagnose')], ['/live', t('nav_live_scan')], ['/dashboard', t('nav_dashboard')], ['/diseases', t('nav_disease_library')]].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-[#8BAE97] hover:text-[#55B96A] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{t('footer_research')}</h3>
            <ul className="space-y-2">
              {[['/research/findings', t('nav_research_findings')], ['/datasets', t('nav_research_datasets')], ['/model-performance', t('nav_research_model')], ['/research/error-analysis', t('nav_research_errors')], ['/research/explainability', t('nav_research_explainability')], ['/research/downloads', t('nav_research_downloads')]].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-[#8BAE97] hover:text-[#55B96A] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{t('footer_project')}</h3>
            <ul className="space-y-2">
              {[['/about', t('nav_about')], ['/contact', t('nav_contact')], ['/auth/signup', t('nav_sign_up')], ['/auth/signin', t('nav_sign_in')]].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm text-[#8BAE97] hover:text-[#55B96A] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F5040] mt-8 pt-6 flex flex-col items-center gap-2">
          <p className="text-xs text-[#8BAE97] font-medium text-center">{t('footer_copyright')}</p>
          <p className="text-xs text-[#5A8A70] text-center">{t('footer_metrics')}</p>
        </div>
      </div>
    </footer>
  )
}
