'use client';
import { useRef } from 'react';
export default function Parallax({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null); const f = useRef(0);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return; const el = r.current!, b = el.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
    cancelAnimationFrame(f.current); f.current = requestAnimationFrame(() => { el.style.setProperty('--ry', `${x * 8}deg`); el.style.setProperty('--rx', `${-y * 6}deg`); });
  };
  const leave = () => { const el = r.current!; el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); };
  return <div ref={r} onPointerMove={move} onPointerLeave={leave} className={`parallax ${className}`}>{children}</div>;
}
