import AdminFrame from '@/components/AdminFrame';
export const metadata = { robots: { index: false, follow: false } };
export default function L({ children }: { children: React.ReactNode }) { return <AdminFrame>{children}</AdminFrame>; }
