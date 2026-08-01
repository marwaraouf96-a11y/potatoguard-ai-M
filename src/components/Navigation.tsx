import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLang } from '../contexts/LanguageContext'
import {
  Leaf, Menu, X, ChevronDown, User, LogOut, Settings,
  LayoutDashboard, Microscope, FlaskConical, BookOpen, Home,
  Scan, Camera, Database, BarChart3, AlertTriangle, Eye, Download, FileText, Globe
} from 'lucide-react'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [researchOpen, setResearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const { lang, setLang, t, dir } = useLang()
  const navigate = useNavigate()
  const researchRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const researchLinks = [
    { to: '/datasets', label: t('nav_research_datasets'), icon: Database },
    { to: '/model-performance', label: t('nav_research_model'), icon: BarChart3 },
    { to: '/research/methodology', label: t('nav_research_methodology'), icon: FlaskConical },
    { to: '/research/error-analysis', label: t('nav_research_errors'), icon: AlertTriangle },
    { to: '/research/explainability', label: t('nav_research_explainability'), icon: Eye },
    { to: '/research/findings', label: t('nav_research_findings'), icon: FileText },
    { to: '/research/downloads', label: t('nav_research_downloads'), icon: Download },
  ]

  const navLinks = [
    { to: '/', label: t('nav_home'), icon: Home },
    { to: '/diagnose', label: t('nav_diagnose'), icon: Microscope },
    { to: '/live', label: t('nav_live_scan'), icon: Camera },
    { to: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { to: '/diseases', label: t('nav_disease_library'), icon: BookOpen },
  ]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (researchRef.current && !researchRef.current.contains(e.target as Node)) setResearchOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    await signOut()
    navigate('/auth/signout')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D8D5C5] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 bg-[#2F7D4A] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[#12372A] transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold text-[#12372A]" style={{ fontFamily: 'Sora, sans-serif' }}>PotatoGuard</span>
              <span className="text-[10px] font-medium text-[#32BFC4] tracking-widest uppercase">AI</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#EDF4EF] text-[#2F7D4A]' : 'text-[#5A6B61] hover:bg-[#F5F3E8] hover:text-[#17221C]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Research dropdown */}
            <div className="relative" ref={researchRef}>
              <button
                onClick={() => setResearchOpen(v => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-[#5A6B61] hover:bg-[#F5F3E8] hover:text-[#17221C] transition-colors"
              >
                {t('nav_research')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${researchOpen ? 'rotate-180' : ''}`} />
              </button>
              {researchOpen && (
                <div className={`absolute top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#D8D5C5] py-1.5 z-50 ${dir === 'rtl' ? 'right-0' : 'left-0'}`}>
                  {researchLinks.map(link => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setResearchOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#5A6B61] hover:bg-[#EDF4EF] hover:text-[#2F7D4A] transition-colors"
                      >
                        <Icon className="w-4 h-4 opacity-70 flex-shrink-0" />
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#EDF4EF] text-[#2F7D4A]' : 'text-[#5A6B61] hover:bg-[#F5F3E8] hover:text-[#17221C]'}`}>{t('nav_about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#EDF4EF] text-[#2F7D4A]' : 'text-[#5A6B61] hover:bg-[#F5F3E8] hover:text-[#17221C]'}`}>{t('nav_contact')}</NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D8D5C5] text-xs font-medium text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors"
              aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>

            <Link
              to="/diagnose"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#2F7D4A] text-white rounded-lg text-sm font-semibold hover:bg-[#12372A] transition-colors shadow-sm"
            >
              <Scan className="w-4 h-4" />
              {t('nav_try_model')}
            </Link>

            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#D8D5C5] hover:border-[#2F7D4A] transition-colors bg-white"
                >
                  <div className="w-7 h-7 rounded-full bg-[#EDF4EF] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#2F7D4A]" />
                  </div>
                  <span className="text-sm font-medium text-[#17221C] max-w-24 truncate">
                    {profile?.full_name?.split(' ')[0] ?? t('nav_profile')}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#5A6B61] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className={`absolute top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#D8D5C5] py-1.5 z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                    <div className="px-3.5 py-2 border-b border-[#E8E5D6] mb-1">
                      <p className="text-sm font-semibold text-[#17221C] truncate">{profile?.full_name ?? 'User'}</p>
                      <p className="text-xs text-[#5A6B61] truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#EDF4EF] text-[#2F7D4A] text-xs font-medium rounded-full capitalize">{profile?.role ?? 'farmer'}</span>
                    </div>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#5A6B61] hover:bg-[#EDF4EF] hover:text-[#2F7D4A] transition-colors"><User className="w-4 h-4" />{t('nav_profile')}</Link>
                    <Link to="/account-settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#5A6B61] hover:bg-[#EDF4EF] hover:text-[#2F7D4A] transition-colors"><Settings className="w-4 h-4" />{t('nav_account_settings')}</Link>
                    <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#5A6B61] hover:bg-[#EDF4EF] hover:text-[#2F7D4A] transition-colors"><LayoutDashboard className="w-4 h-4" />{t('nav_dashboard')}</Link>
                    <div className="border-t border-[#E8E5D6] mt-1 pt-1">
                      <button onClick={handleSignOut} className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-[#C95858] hover:bg-red-50 transition-colors w-full"><LogOut className="w-4 h-4" />{t('nav_sign_out')}</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/auth/signin" className="px-3 py-2 text-sm font-medium text-[#5A6B61] hover:text-[#17221C] transition-colors">{t('nav_sign_in')}</Link>
                <Link to="/auth/signup" className="px-3 py-2 bg-[#EDF4EF] text-[#2F7D4A] rounded-lg text-sm font-semibold hover:bg-[#d4e9da] transition-colors">{t('nav_sign_up')}</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#D8D5C5] py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#EDF4EF] text-[#2F7D4A]' : 'text-[#5A6B61] hover:bg-[#F5F3E8]'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
            <div className="pt-1 border-t border-[#E8E5D6] mt-1">
              <p className="px-3 py-1 text-xs font-semibold text-[#5A6B61] uppercase tracking-wider">{t('nav_research')}</p>
              {researchLinks.map(link => {
                const Icon = link.icon
                return (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#5A6B61] hover:bg-[#F5F3E8] transition-colors">
                    <Icon className="w-4 h-4" />{link.label}
                  </Link>
                )
              })}
            </div>
            <div className="pt-2 border-t border-[#E8E5D6] flex flex-col gap-2">
              <button
                onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMobileOpen(false) }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#D8D5C5] text-[#5A6B61] rounded-lg text-sm"
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <Link to="/diagnose" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2F7D4A] text-white rounded-lg text-sm font-semibold">
                <Scan className="w-4 h-4" />{t('nav_try_model')}
              </Link>
              {!user && (
                <div className="flex gap-2">
                  <Link to="/auth/signin" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2 border border-[#D8D5C5] text-sm font-medium rounded-lg text-[#5A6B61]">{t('nav_sign_in')}</Link>
                  <Link to="/auth/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2 bg-[#EDF4EF] text-[#2F7D4A] text-sm font-semibold rounded-lg">{t('nav_sign_up')}</Link>
                </div>
              )}
              {user && (
                <button onClick={handleSignOut} className="flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-[#C95858] rounded-lg text-sm font-medium">
                  <LogOut className="w-4 h-4" />{t('nav_sign_out')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
