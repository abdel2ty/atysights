import { createHash } from 'crypto';
import { requireAdmin } from '@/lib/supabase/server';
export async function POST() {
  try { await requireAdmin(); } catch { return Response.json({ error: 'Forbidden' }, { status: 403 }); }
  const timestamp = Math.floor(Date.now()/1000), folder = 'atysights/projects';
  const signature = createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`).digest('hex');
  return Response.json({ timestamp, folder, signature, apiKey: process.env.CLOUDINARY_API_KEY, cloud: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME });
}
