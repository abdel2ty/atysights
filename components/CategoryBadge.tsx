export default function CategoryBadge({ cat, size = 'sm' }: { cat?: { name: string; logo_url: string } | null; size?: 'sm' | 'md' }) {
  if (!cat) return null;
  const md = size === 'md';
  return (<span className={`inline-flex items-center bg-white font-bold text-ink ${md ? 'gap-3 pr-4 text-sm' : 'gap-2 pr-3 text-xs shadow-sm'}`}><img src={cat.logo_url} alt="" className={`${md ? 'h-11 w-11' : 'h-7 w-7'} aspect-square object-cover`} />{cat.name}</span>);
}
