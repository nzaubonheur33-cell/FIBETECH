import { NextResponse } from 'next/server'
import { HttpError, readJson, route } from '@/lib/api'
import { checkPassword } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { clientIp, rateLimit, resetRateLimit } from '@/lib/rate-limit'
import { createSessionToken, hasAuthSecret, SESSION_COOKIE, sessionCookieOptions } from '@/lib/session'

// Empreinte factice : la vérification prend le même temps, que le compte existe ou non.
const DUMMY_HASH = '$2b$12$M45IZhetmDoYRVmWlxQHvuf3Svg6PW9d7bY5DpuCkK3PHOzEYl8zm'

export const POST = route(async (request: Request) => {
  if (!hasAuthSecret()) throw new HttpError(500, 'Configuration incomplète : ajoutez AUTH_SECRET (32 caractères minimum) dans le fichier .env, puis redémarrez le serveur.')

  const body = (await readJson(request, 10_000)) as Record<string, unknown>
  const email = String(body.email ?? '').trim().toLowerCase()
  const password = String(body.password ?? '')
  if (!email || !password) throw new HttpError(422, 'Indiquez votre e-mail et votre mot de passe.')

  const ip = clientIp(request)
  if (!rateLimit(`login-ip:${ip}`, 30, 15 * 60_000) || !rateLimit(`login:${email}`, 8, 15 * 60_000)) {
    throw new HttpError(429, 'Trop de tentatives. Patientez 15 minutes avant de réessayer.')
  }

  const user = await prisma.adminUser.findUnique({ where: { email } })
  const valid = await checkPassword(password, user?.passwordHash ?? DUMMY_HASH)
  if (!user || !valid) throw new HttpError(401, 'E-mail ou mot de passe incorrect.')

  resetRateLimit(`login:${email}`)
  await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
  const token = await createSessionToken({ userId: user.id, email: user.email, name: user.name })
  const response = NextResponse.json({ ok: true, name: user.name })
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
  return response
})
