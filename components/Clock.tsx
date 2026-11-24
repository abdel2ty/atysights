'use client';
import { useEffect, useState } from 'react';
export default function Clock() {
  const [t, setT] = useState('');
  useEffect(() => { const f = () => setT(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit' }).format(new Date())); f(); const i = setInterval(f, 30000); return () => clearInterval(i); }, []);
  return t ? <span className="font-normal text-white/70"> · Egypt time {t}</span> : null;
}
