import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function sb() {
  const c = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => c.getAll(), setAll: (l: { name: string; value: string; options?: any }[]) => { try { l.forEach(({ name, value, options }) => c.set(name, value, options)); } catch {} } },
  });
}
export async function requireAdmin() {
  const s = await sb();
  const [{ data: { user } }, rpc] = await Promise.all([s.auth.getUser(), s.rpc('is_admin')]);
  if (!user) redirect('/admin/login');
  let ok = rpc.data === true;
  if (!ok && rpc.error) ok = !!(await s.from('admins').select('user_id').eq('user_id', user.id).maybeSingle()).data;
  if (!ok) redirect('/admin/login?e=noadmin');
  return s;
}
