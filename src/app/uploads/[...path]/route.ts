import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { mimeFor, uploadRoot } from '@/lib/uploads'

type Ctx = { params: Promise<{ path: string[] }> }

/** Sert les images envoyées depuis l'admin. */
export async function GET(_request: Request, ctx: Ctx) {
  const parts = (await ctx.params).path
  if (!parts.length || parts.some((part) => !/^[\w.-]+$/.test(part) || part.startsWith('.'))) return new Response('Introuvable', { status: 404 })

  const root = uploadRoot()
  const file = path.resolve(root, ...parts)
  // Refuse tout chemin qui sortirait du dossier des images.
  if (!file.startsWith(root + path.sep)) return new Response('Introuvable', { status: 404 })

  const mime = mimeFor(file)
  if (!mime) return new Response('Introuvable', { status: 404 })

  try {
    const info = await stat(file)
    if (!info.isFile()) return new Response('Introuvable', { status: 404 })
    const data = await readFile(file)
    return new Response(new Uint8Array(data), {
      headers: {
        'Content-Type': mime,
        'Content-Length': String(info.size),
        // Les noms sont aléatoires et jamais réutilisés : le navigateur peut garder l'image longtemps.
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new Response('Introuvable', { status: 404 })
  }
}
