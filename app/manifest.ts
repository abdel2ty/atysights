import type { MetadataRoute } from 'next';
import { LOGO } from '@/lib/site';
const types: Record<string, string> = { png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg' };
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Atysights', short_name: 'Atysights', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0B5FFF', icons: [{ src: LOGO, sizes: 'any', type: types[LOGO.split('.').pop() ?? ''] }] };
}
