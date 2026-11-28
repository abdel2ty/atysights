'use client';
import { useRef, useState } from 'react';
const REV = [100, 104, 103, 110, 118, 121, 128, 134, 141, 149, 156, 164];
const MAR = [31, 31, 30, 30, 29, 28, 27, 25, 24, 22, 21, 19];
const MO = 'JFMAMJJASOND'.split('');
const FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const X0 = 36, X1 = 370, Y0 = 34, Y1 = 236, W = 460;
const x = (i: number) => X0 + i * (X1 - X0) / 11;
const yR = (v: number) => Y1 - (v - 85) / 85 * (Y1 - Y0);
const yM = (v: number) => Y1 - (v - 15) / 18 * (Y1 - Y0);
const path = (a: number[], f: (v: number) => number) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${f(v).toFixed(1)}`).join(' ');
export default function TrendChart() {
  const [i, setI] = useState<number | null>(null); const ref = useRef<SVGSVGElement>(null);
  const at = (e: React.PointerEvent<SVGSVGElement>) => { const r = ref.current!.getBoundingClientRect(); const vx = (e.clientX - r.left) / r.width * W; setI(Math.min(11, Math.max(0, Math.round((vx - X0) / ((X1 - X0) / 11))))); };
  return (<figure className="m-0 border border-rule bg-white">
    <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink px-5 py-3 text-sm font-bold"><span>Revenue and margin, 12 months</span><span className="text-right text-xs font-medium text-mute">Illustrative. Move across the chart.</span></div>
    <div className="relative px-3 pt-3 sm:px-4">
      {i !== null && <div className="pointer-events-none absolute top-1 z-10 -translate-x-1/2 border border-ink bg-white px-3 py-2 text-xs shadow-md" style={{ left: `${Math.min(62, Math.max(16, x(i) / W * 100))}%` }}>
        <b className="block">{FULL[i]}</b><span className="block">Revenue <b>{REV[i]}</b></span><span className="block text-blue">Margin <b>{MAR[i]}%</b></span></div>}
      <svg ref={ref} viewBox="0 0 460 290" role="img" aria-label="Revenue rises while margin falls over twelve months. Illustrative data." className="block w-full cursor-crosshair" style={{ fontFamily: 'var(--font), system-ui, sans-serif', touchAction: 'pan-y' }}
        onPointerMove={at} onPointerDown={at} onPointerLeave={() => setI(null)} onPointerCancel={() => setI(null)}>
        {[0, 1, 2, 3, 4].map(k => <line key={k} x1={X0} x2={X1} y1={Y0 + k * (Y1 - Y0) / 4} y2={Y0 + k * (Y1 - Y0) / 4} stroke="#E3E6EE" />)}
        <line x1={X0} x2={X1} y1={Y1} y2={Y1} stroke="#0A0A0A" />
        {MO.map((m, k) => <text key={k} x={x(k)} y={Y1 + 22} textAnchor="middle" fontSize="12" fontWeight={i === k ? 700 : 400} fill={i === k ? '#0A0A0A' : '#5B6170'}>{m}</text>)}
        <path d={path(REV, yR)} fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="tc-line" style={{ ['--d' as any]: '.3s' }} />
        <path d={path(MAR, yM)} fill="none" stroke="#0B5FFF" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="tc-line" style={{ ['--d' as any]: '.8s' }} />
        <g className="tc-fade" style={{ ['--d' as any]: '2.3s' }}>
          <circle cx={x(11)} cy={yR(164)} r="5" fill="#0A0A0A" /><circle cx={x(11)} cy={yM(19)} r="5" fill="#0B5FFF" />
          <text x={X1 + 14} y={yR(164) - 2} fontSize="13" fontWeight="700">Revenue</text><text x={X1 + 14} y={yR(164) + 14} fontSize="12" fill="#5B6170">+64%</text>
          <text x={X1 + 14} y={yM(19) - 2} fontSize="13" fontWeight="700" fill="#0B5FFF">Margin</text><text x={X1 + 14} y={yM(19) + 14} fontSize="12" fill="#5B6170">19%</text></g>
        {i !== null && <g pointerEvents="none"><line x1={x(i)} x2={x(i)} y1={Y0} y2={Y1} stroke="#0A0A0A" strokeDasharray="3 3" />
          <circle cx={x(i)} cy={yR(REV[i])} r="6" fill="#0A0A0A" stroke="#fff" strokeWidth="2" /><circle cx={x(i)} cy={yM(MAR[i])} r="6" fill="#0B5FFF" stroke="#fff" strokeWidth="2" /></g>}
      </svg></div>
    <figcaption className="border-t border-rule px-5 py-3 text-sm"><b>Revenue up 64%. Margin down 12 points.</b> The total looked healthy the whole time.</figcaption></figure>);
}
