import type { MetadataRoute } from 'next';
import { SITE_ICON } from '@/lib/site';
const types: Record<string, string> = { png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg' };
export default function manifest(): MetadataRoute.Manifest {
  return { name: 'Atysights', short_name: 'Atysights', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0B5FFF', icons: [{ src: SITE_ICON, sizes: 'any', type: types[SITE_ICON.split('.').pop() ?? ''] }] };
}
