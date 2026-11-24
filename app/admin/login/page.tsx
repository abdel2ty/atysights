import { redirect } from 'next/navigation';
import { sb } from '@/lib/supabase/server';
import { LOGO } from '@/lib/site';
async function login(fd: FormData) {
  'use server';
  const s = await sb();
  const { error } = await s.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) });
  redirect(error ? '/admin/login?e=1' : '/admin');
}
async function out() { 'use server'; const s = await sb(); await s.auth.signOut(); redirect('/admin/login'); }
export default async function L({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams; const s = await sb(); const { data: { user } } = await s.auth.getUser();
  return (<main className="adm grid min-h-screen md:grid-cols-2">
    <div className="hidden flex-col justify-between bg-ink p-12 text-white md:flex"><img src={LOGO} alt="Atysights" className="h-10 w-auto self-start bg-white p-2" />
      <h1 className="text-5xl leading-tight">Admin <span className="hl hl-blue">studio</span></h1><p className="text-sm text-white/60">Manage projects, clients and messages.</p></div>
    <div className="flex items-center p-6 md:p-16"><div className="w-full max-w-sm"><img src={LOGO} alt="Atysights" className="mb-8 h-9 w-auto md:hidden" /><h2 className="text-3xl">Sign in</h2>
      {e === 'noadmin' && user && <div className="mt-4 border-2 border-blue p-4 text-sm"><p>You are signed in as <b>{user.email}</b>, but this account is not an admin yet. Run this in the Supabase SQL Editor, then sign in again:</p>
        <code className="mt-2 block break-all bg-rule p-2 text-xs">insert into admins (user_id) select id from auth.users where email = &apos;{user.email}&apos;;</code>
        <form action={out}><button className="btn mt-3">Sign out</button></form></div>}
      <form action={login} className="mt-6 space-y-3"><input name="email" type="email" required placeholder="Email" className="field" /><input name="password" type="password" required placeholder="Password" className="field" />
        {e === '1' && <p className="text-sm text-red-700">Email or password is incorrect.</p>}<button className="btn w-full">Sign in</button></form></div></div></main>);
}
