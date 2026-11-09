import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session'

// Protège l'espace d'administration et son API.
// Les routes de l'API revérifient la session en base (requireAdmin) : ce filtre est une première barrière.

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

/** Refuse les requêtes d'écriture envoyées depuis un autre site (protection CSRF). */
function isCrossSite(request: NextRequest) {
  if (!MUTATING.has(request.method)) return false
  const origin = request.headers.get('origin')
  if (origin) {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
    try {
      return new URL(origin).host !== host
    } catch {
      return true
    }
  }
  return request.headers.get('sec-fetch-site') === 'cross-site'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isApi = pathname.startsWith('/api/')
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  // Le proxy HTTPS doit envoyer x-forwarded-proto avec le protocole vu par le navigateur.
  // Garder aussi localhost en HTTP avec le serveur de production local.
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0].trim().toLowerCase()
  const forwardedHost = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').split(',')[0].trim().toLowerCase()
  const hostname = forwardedHost.startsWith('[') ? forwardedHost.slice(1, forwardedHost.indexOf(']')) : forwardedHost.split(':')[0]
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  if (process.env.NODE_ENV === 'production' && forwardedProto === 'http' && !isLocalHost) {
    const httpsUrl = request.nextUrl.clone()
    httpsUrl.protocol = 'https:'
    return NextResponse.redirect(httpsUrl, 308)
  }

  // Les routes publiques n'ont pas besoin des contrôles d'accès ci-dessous.
  if (!isApi && !isAdmin) return NextResponse.next()

  if (isApi && isCrossSite(request)) {
    return NextResponse.json({ ok: false, message: 'Requête refusée.' }, { status: 403 })
  }

  // Formulaires publics et connexion : pas de session requise.
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (session) return NextResponse.next()

  if (isApi) return NextResponse.json({ ok: false, message: 'Votre session a expiré. Reconnectez-vous.' }, { status: 401 })
  const login = new URL('/admin/login', request.url)
  if (pathname !== '/admin') login.searchParams.set('next', pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/:path*'],
}
