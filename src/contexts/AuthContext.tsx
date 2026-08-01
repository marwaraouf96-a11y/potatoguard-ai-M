import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, UserProfile, UserRole } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ error: Error | null }>
  resetPassword: (newPassword: string) => Promise<{ error: Error | null }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>
  deleteAccount: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      if (!error) setProfile(data as UserProfile | null)
    } catch {
      // profiles table may not exist yet — graceful degradation
    }
    setLoading(false)
  }

  async function signUp(email: string, password: string, fullName: string, role: UserRole) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role },
        emailRedirectTo: `${window.location.origin}/auth/verify`,
      },
    })
    if (!error && data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        role,
        language: 'en',
      })
    }
    return { error: error as Error | null }
  }

  async function signIn(email: string, password: string, rememberMe = true) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error as Error | null }
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    return { error: error as Error | null }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function forgotPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { error: error as Error | null }
  }

  async function resetPassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    return { error: error as Error | null }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) return { error: new Error('Not authenticated') }
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
    if (!error) setProfile(prev => prev ? { ...prev, ...updates } : null)
    return { error: error as Error | null }
  }

  async function deleteAccount() {
    if (!user) return { error: new Error('Not authenticated') }
    await supabase.from('profiles').delete().eq('id', user.id)
    const { error } = await supabase.auth.admin?.deleteUser(user.id) ?? { error: null }
    await supabase.auth.signOut()
    return { error: error as Error | null }
  }

  return (
    <AuthContext.Provider value={{
      user, session, profile, loading,
      signUp, signIn, signInWithGoogle, signOut,
      forgotPassword, resetPassword, updateProfile, deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
