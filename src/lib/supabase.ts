import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../../utils/supabase/info'

const supabaseUrl = `https://${projectId}.supabase.co`

export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type UserRole = 'farmer' | 'researcher' | 'expert' | 'admin'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  language: 'en' | 'ar'
  organization?: string
  region?: string
  created_at: string
  avatar_url?: string
}
