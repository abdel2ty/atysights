import type { MetadataRoute } from 'next';
import { existsSync } from 'fs';
import path from 'path';
export default function manifest(): MetadataRoute.Manifest {
  const f = ['png', 'svg', 'webp', 'jpg'].map(e => `logo.${e}`).find(x => existsSync(path.join(process.cwd(), 'public', x)));
  const type = f ? { png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg' }[f.split('.')[1]] : undefined;
  return { name: 'Atysights', short_name: 'Atysights', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#0B5FFF', ...(f && { icons: [{ src: `/${f}`, sizes: 'any', type }] }) };
}
