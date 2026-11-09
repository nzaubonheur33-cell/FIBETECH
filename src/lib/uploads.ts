// Images envoyées depuis l'admin : enregistrées sur le disque du serveur (UPLOAD_DIR)
// et servies par la route /uploads/… Le dossier doit être conservé entre deux déploiements.
import path from 'node:path'

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export function uploadRoot() {
  return path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'))
}

export const imageTypes: Record<string, { ext: string; mime: string }> = {
  png: { ext: 'png', mime: 'image/png' },
  jpg: { ext: 'jpg', mime: 'image/jpeg' },
  webp: { ext: 'webp', mime: 'image/webp' },
  gif: { ext: 'gif', mime: 'image/gif' },
  avif: { ext: 'avif', mime: 'image/avif' },
}

/** Reconnaît le format réel d'une image à ses premiers octets (le nom du fichier ne suffit pas). */
export function sniffImage(bytes: Uint8Array): keyof typeof imageTypes | null {
  const b = bytes
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png'
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg'
  if (b.length >= 12 && String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP') return 'webp'
  if (b.length >= 6 && String.fromCharCode(...b.slice(0, 4)) === 'GIF8') return 'gif'
  if (b.length >= 12 && String.fromCharCode(...b.slice(4, 8)) === 'ftyp' && /avi[fs]/.test(String.fromCharCode(...b.slice(8, 12)))) return 'avif'
  return null
}

export function mimeFor(file: string) {
  const ext = path.extname(file).slice(1).toLowerCase()
  const found = Object.values(imageTypes).find((t) => t.ext === ext || (ext === 'jpeg' && t.ext === 'jpg'))
  return found?.mime ?? null
}
