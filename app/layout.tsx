import './globals.css';
import './site.css';
import Link from 'next/link';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import Shell from '@/components/Shell';
import { SITE_ICON } from '@/lib/site';
const display = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--f-display', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--f-mono', display: 'swap' });
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), openGraph: { siteName: 'Atysights', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Atysights' }] }, twitter: { card: 'summary_large_image', images: ['/og.png'] }, title: { default: 'Atysights', template: '%s | Atysights' }, description: 'Business systems, data analysis and AI that answers from your own data.', icons: { icon: SITE_ICON, apple: SITE_ICON } };
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' as const, themeColor: '#0B5FFF' };
export default function L({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${display.variable} ${mono.variable}`}><body style={{ fontFamily: "var(--f-display), system-ui, sans-serif" }}><Shell>{children}</Shell></body></html>);
}
