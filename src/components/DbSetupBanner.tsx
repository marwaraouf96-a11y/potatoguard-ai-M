import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Database, X, CheckCircle2 } from 'lucide-react'

export default function DbSetupBanner() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    async function check() {
      const { error } = await supabase.from('profiles').select('id').limit(1)
      // 42P01 = table does not exist
      if (error && (error.code === '42P01' || error.message.includes('does not exist'))) {
        setVisible(true)
      }
    }
    if (!dismissed) check()
  }, [dismissed])

  if (!visible || dismissed) return null

  return (
    <div className="bg-[#12372A] text-white px-4 py-3 text-sm flex items-start gap-3 relative">
      <Database className="w-4 h-4 text-[#55B96A] mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <strong>Database setup required:</strong> The <code className="bg-white/10 px-1 rounded">profiles</code> table needs to be created in Supabase. Go to your{' '}
        <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline text-[#55B96A]">Supabase dashboard</a>{' '}
        → SQL Editor → New Query, and run:
        <pre className="mt-2 bg-black/30 rounded p-2 text-xs overflow-x-auto whitespace-pre-wrap">{`create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text, full_name text,
  role text check (role in ('farmer','researcher','expert','admin')) default 'farmer',
  language text check (language in ('en','ar')) default 'en',
  organization text, region text, avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);`}</pre>
      </div>
      <button onClick={() => setDismissed(true)} className="text-white/60 hover:text-white flex-shrink-0"><X className="w-4 h-4" /></button>
    </div>
  )
}
