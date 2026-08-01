import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import DbSetupBanner from './components/DbSetupBanner'

// Pages
import Home from './pages/Home'
import Diagnose from './pages/Diagnose'
import LiveScan from './pages/LiveScan'
import Dashboard from './pages/Dashboard'
import DiseaseLibrary from './pages/DiseaseLibrary'
import Research from './pages/Research'
import ResearchMethodology from './pages/ResearchMethodology'
import Datasets from './pages/Datasets'
import ModelPerformance from './pages/ModelPerformance'
import ErrorAnalysis from './pages/ErrorAnalysis'
import Explainability from './pages/Explainability'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import AccountSettings from './pages/AccountSettings'

// Auth pages
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import SignOut from './pages/auth/SignOut'
import Unauthorized from './pages/auth/Unauthorized'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DbSetupBanner />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
        <Routes>
          {/* Auth routes — no nav/footer */}
          <Route path="/auth/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
          <Route path="/auth/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
          <Route path="/auth/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
          <Route path="/auth/reset-password" element={<AuthLayout><ResetPassword /></AuthLayout>} />
          <Route path="/auth/verify" element={<AuthLayout><VerifyEmail /></AuthLayout>} />
          <Route path="/auth/signout" element={<AuthLayout><SignOut /></AuthLayout>} />
          <Route path="/unauthorized" element={<AuthLayout><Unauthorized /></AuthLayout>} />

          {/* Public routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/diagnose" element={<Layout><Diagnose /></Layout>} />
          <Route path="/live" element={<Layout><LiveScan /></Layout>} />
          <Route path="/diseases" element={<Layout><DiseaseLibrary /></Layout>} />
          <Route path="/diseases/:className" element={<Layout><DiseaseLibrary /></Layout>} />
          <Route path="/research" element={<Layout><Research /></Layout>} />
          <Route path="/research/error-analysis" element={<Layout><ErrorAnalysis /></Layout>} />
          <Route path="/research/explainability" element={<Layout><Explainability /></Layout>} />
          <Route path="/research/methodology" element={<Layout><ResearchMethodology /></Layout>} />
          <Route path="/research/findings" element={<Layout><Research /></Layout>} />
          <Route path="/research/downloads" element={<Layout><Datasets /></Layout>} />
          <Route path="/datasets" element={<Layout><Datasets /></Layout>} />
          <Route path="/model-performance" element={<Layout><ModelPerformance /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
          <Route path="/profile" element={<Layout><ProtectedRoute><Profile /></ProtectedRoute></Layout>} />
          <Route path="/account-settings" element={<Layout><ProtectedRoute><AccountSettings /></ProtectedRoute></Layout>} />

          {/* Catch-all */}
          <Route path="*" element={
            <Layout>
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold text-[#D8D5C5] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>404</p>
                  <p className="text-[#5A6B61] mb-4">Page not found.</p>
                  <a href="/" className="text-[#2F7D4A] font-semibold hover:underline">Return home →</a>
                </div>
              </div>
            </Layout>
          } />
        </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
