import { redirect } from 'next/navigation';
import { sb } from '@/lib/supabase/server';
async function login(fd: FormData) {
  'use server';
  const s = await sb();
  const { error } = await s.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('password')) });
  redirect(error ? '/admin/login?e=1' : '/admin');
}
async function out() { 'use server'; const s = await sb(); await s.auth.signOut(); redirect('/admin/login'); }
export default async function L({ searchParams }: { searchParams: Promise<{ e?: string }> }) {
  const { e } = await searchParams; const s = await sb(); const { data: { user } } = await s.auth.getUser();
  return (<main className="mx-auto max-w-sm px-6 py-16"><h1 className="text-3xl">Admin sign in</h1>
    {e === 'noadmin' && user && <div className="mt-4 border-2 border-blue p-4 text-sm"><p>You are signed in as <b>{user.email}</b>, but this account is not an admin yet. Run this in the Supabase SQL Editor, then sign in again:</p>
      <code className="mt-2 block break-all bg-rule p-2 text-xs">insert into admins (user_id) select id from auth.users where email = &apos;{user.email}&apos;;</code>
      <form action={out}><button className="btn mt-3">Sign out</button></form></div>}
    <form action={login} className="mt-6 space-y-3"><input name="email" type="email" required placeholder="Email" className="field"/><input name="password" type="password" required placeholder="Password" className="field"/>
      {e === '1' && <p className="text-sm text-red-700">Email or password is incorrect.</p>}<button className="btn w-full">Sign in</button></form></main>);
}
