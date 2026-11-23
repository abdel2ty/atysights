import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin, sb } from '@/lib/supabase/server';
async function update(fd: FormData) {
  'use server';
  await requireAdmin(); const s = await sb();
  const email = String(fd.get('email') ?? '').trim(), pw = String(fd.get('password') ?? '');
  if (!email && !pw) redirect('/admin/account?e=Enter+a+new+email+or+a+new+password');
  if (pw && pw.length < 8) redirect('/admin/account?e=Password+must+be+at+least+8+characters');
  const { error } = await s.auth.updateUser({ ...(email ? { email } : {}), ...(pw ? { password: pw } : {}) });
  redirect(error ? `/admin/account?e=${encodeURIComponent(error.message)}` : '/admin/account?ok=1');
}
export default async function Acc({ searchParams }: { searchParams: Promise<{ e?: string; ok?: string }> }) {
  const s = await requireAdmin(); const { data: { user } } = await s.auth.getUser(); const { e, ok } = await searchParams;
  return (<main className="mx-auto max-w-md px-6 py-12"><Link href="/admin" className="text-sm underline">Back to projects</Link>
    <h1 className="mt-4 text-3xl">Account</h1><p className="mt-2 text-sm text-mute">Signed in as {user?.email}</p>
    {ok && <p className="mt-4 bg-blue p-3 text-sm text-white">Saved. If you changed the email, confirm it from the message we sent to the new address.</p>}
    {e && <p className="mt-4 border border-red-700 p-3 text-sm text-red-700">{e}</p>}
    <form action={update} className="mt-6 space-y-4"><div><label className="mb-1 block text-sm font-medium">New email (optional)</label><input name="email" type="email" className="field"/></div>
      <div><label className="mb-1 block text-sm font-medium">New password (optional, 8+ characters)</label><input name="password" type="password" minLength={8} autoComplete="new-password" className="field"/></div>
      <button className="btn">Save changes</button></form></main>);
}
