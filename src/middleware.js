import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/recrutamento') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/pt/recrutamento';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/pt/recruitment') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/pt/recrutamento';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/recrutamento') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/en/recruitment';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/recruitment') {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = '/en/recrutamento';
    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname === '/pt/services/high-performance-team') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/pt/recrutamento';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/services/high-performance-team') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/en/recruitment';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/candidatos') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/en/candidates';
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname === '/en/candidates') {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = '/en/candidatos';
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|logo.ico|og.png|og-en.png|og-tech.png|og-tech-en.png|og-candidates.png|og-candidates-en.png).*)',
  ],
};
