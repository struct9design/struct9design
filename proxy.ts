import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get('s9_session')?.value
  const secret = process.env.PANEL_SESSION_SECRET
  return !!(session && secret && session === secret)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPanelRoute = pathname.startsWith('/panel')
  const isLoginPage  = pathname === '/panel/login'
  const isCrmApi =
    pathname.startsWith('/api/clientes') ||
    pathname.startsWith('/api/proyectos') ||
    pathname.startsWith('/api/leads')

  // Already authenticated users visiting login → redirect to panel
  if (isLoginPage && isAuthenticated(request)) {
    return NextResponse.redirect(new URL('/panel', request.url))
  }

  // Protected panel pages
  if (isPanelRoute && !isLoginPage && !isAuthenticated(request)) {
    const loginUrl = new URL('/panel/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Protected CRM APIs — return 401 instead of redirect
  if (isCrmApi && !isAuthenticated(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/panel/:path*',
    '/api/clientes/:path*',
    '/api/proyectos/:path*',
    '/api/leads/:path*',
  ],
}
