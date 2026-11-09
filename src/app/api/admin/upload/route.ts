import { randomBytes } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { HttpError, ok, requireAdmin, route } from '@/lib/api'
import { imageTypes, MAX_UPLOAD_BYTES, sniffImage, uploadRoot } from '@/lib/uploads'

/** Reçoit une image (champ « file ») et renvoie son adresse publique. */
export const POST = route(async (request: Request) => {
  await requireAdmin()
  if (Number(request.headers.get('content-length') || 0) > MAX_UPLOAD_BYTES + 100_000) throw new HttpError(413, 'Image trop lourde : 5 Mo maximum.')

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')
  if (!file || typeof file === 'string') throw new HttpError(400, 'Aucun fichier reçu.')
  if (file.size > MAX_UPLOAD_BYTES) throw new HttpError(413, 'Image trop lourde : 5 Mo maximum.')

  const bytes = new Uint8Array(await file.arrayBuffer())
  const kind = sniffImage(bytes)
  if (!kind) throw new HttpError(415, 'Format non accepté. Envoyez une image PNG, JPEG, WebP, GIF ou AVIF.')

  const now = new Date()
  const folder = path.join(String(now.getFullYear()), String(now.getMonth() + 1).padStart(2, '0'))
  const name = `${randomBytes(12).toString('hex')}.${imageTypes[kind].ext}`
  const dir = path.join(uploadRoot(), folder)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, name), bytes)

  return ok({ url: `/uploads/${folder.split(path.sep).join('/')}/${name}` }, 201)
})
