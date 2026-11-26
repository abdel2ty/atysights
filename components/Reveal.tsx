'use client';
import { useEffect, useRef } from 'react';
export default function Reveal({ children, d = 0, className = '' }: { children: React.ReactNode; d?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = r.current!; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); o.disconnect(); } }, { threshold: .12, rootMargin: '0px 0px -6% 0px' }); o.observe(el); return () => o.disconnect(); }, []);
  return <div ref={r} className={`reveal ${className}`} style={{ ['--d' as any]: `${d}s` }}>{children}</div>;
}
