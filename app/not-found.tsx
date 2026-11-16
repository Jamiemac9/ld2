import Link from 'next/link';
export default function NotFound() {
  return <div className="narrow" style={{ padding: '90px 0' }}><h1>Not found</h1><p className="muted">That listing may have sold or been removed.</p><Link href="/browse" className="btn">Browse listings</Link></div>;
}
