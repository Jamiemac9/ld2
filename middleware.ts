import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER, pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse('Admin is disabled. Set ADMIN_USER and ADMIN_PASSWORD.', { status: 503 });
  const h = req.headers.get('authorization') || '';
  const [scheme, enc] = h.split(' ');
  if (scheme === 'Basic' && enc) {
    const [u, p] = atob(enc).split(':');
    if (u === user && p === pass) return NextResponse.next();
  }
  return new NextResponse('Authentication required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="SellMyDoll admin"' } });
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
