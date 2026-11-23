'use client';
import { useEffect, useRef } from 'react';
export default function Progress() {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = () => { const h = document.documentElement; r.current!.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; }; f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
  return <div ref={r} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-blue" style={{ transform: 'scaleX(0)' }} />;
}
