import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../lib/supabase'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole | UserRole[]
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3E8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#2F7D4A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#5A6B61]">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />
  }

  if (requiredRole && profile) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!roles.includes(profile.role)) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
