/**
 * Personnages dessinés au trait pour la foule du hero.
 * Chaque personnage est dessiné une fois sur un petit canvas (sprite),
 * puis réutilisé à chaque image : l'animation reste fluide sur mobile.
 * Illustrations originales, dans l'esprit des Open Peeps.
 */

export const PEEP_W = 120
export const PEEP_H = 260
const SCALE = 2
const INK = '#15140F'

const SKIN = ['#3E281C', '#4F3222', '#5E3B27', '#6F4A32', '#7E5338', '#8D5B3C', '#A26A45', '#C08158']
const TOPS = ['#B4532A', '#0E5A45', '#E0A93B', '#FFFFFF', '#2B3A55', '#8DB7C9', '#E9D8BE', '#D9654B', '#1B1F1D', '#6E8B3D', '#FFFFFF', '#3FBF8E']
const BOTTOMS = ['#1B1F1D', '#2B3A55', '#3D4A44', '#E9D8BE', '#6B4E3D', '#0E5A45', '#1B1F1D']
const HAIR = ['#15140F', '#2A1B12', '#15140F', '#3B2618', '#15140F']
const ACCENTS = ['#B4532A', '#E0A93B', '#0E5A45', '#D9654B', '#2B3A55', '#8DB7C9']
const SHOES = ['#15140F', '#FFFFFF', '#B4532A', '#6B4E3D', '#15140F']

export type PeepSprite = { image: HTMLCanvasElement; scale: number }

/** Générateur pseudo-aléatoire déterministe : la foule est la même à chaque visite. */
function mulberry32(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createPeepSprites(count: number, seed = 20261104): PeepSprite[] {
  const rand = mulberry32(seed)
  const pick = <T,>(list: T[]): T => list[Math.floor(rand() * list.length)]

  const rr = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    c.beginPath()
    c.moveTo(x + r, y)
    c.arcTo(x + w, y, x + w, y + h, r)
    c.arcTo(x + w, y + h, x, y + h, r)
    c.arcTo(x, y + h, x, y, r)
    c.arcTo(x, y, x + w, y, r)
    c.closePath()
  }
  const ell = (c: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) => {
    c.beginPath()
    c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2)
  }
  const blob = (c: CanvasRenderingContext2D, fill: string, lw = 3) => {
    c.fillStyle = fill
    c.fill()
    c.lineWidth = lw
    c.strokeStyle = INK
    c.stroke()
  }
  const limb = (c: CanvasRenderingContext2D, pts: number[], color: string, w: number) => {
    c.beginPath()
    c.moveTo(pts[0], pts[1])
    for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1])
    c.lineWidth = w + 5
    c.strokeStyle = INK
    c.stroke()
    c.lineWidth = w
    c.strokeStyle = color
    c.stroke()
  }
  const pattern = (c: CanvasRenderingContext2D, kind: 'wax' | 'stripe', color: string) => {
    if (kind === 'wax') {
      c.fillStyle = color
      for (let y = 0; y < PEEP_H; y += 13) {
        for (let x = (y / 13) % 2 ? 6 : 0; x < PEEP_W; x += 13) {
          c.beginPath()
          c.arc(x, y, 3.6, 0, Math.PI * 2)
          c.fill()
        }
      }
    } else {
      c.strokeStyle = color
      c.lineWidth = 3
      for (let y = 0; y < PEEP_H; y += 9) {
        c.beginPath()
        c.moveTo(0, y)
        c.lineTo(PEEP_W, y)
        c.stroke()
      }
    }
  }

  const makePeep = (): PeepSprite => {
    const canvas = document.createElement('canvas')
    canvas.width = PEEP_W * SCALE
    canvas.height = PEEP_H * SCALE
    const c = canvas.getContext('2d')!
    c.scale(SCALE, SCALE)
    c.lineJoin = 'round'
    c.lineCap = 'round'

    const skin = pick(SKIN)
    const top = pick(TOPS)
    const style = pick(['pants', 'pants', 'pants', 'skirt', 'dress'] as const)
    const bottom = style === 'dress' ? top : pick(BOTTOMS)
    const hair = pick(HAIR)
    const shoe = pick(SHOES)
    const hairStyle = pick(['short', 'short', 'afro', 'bald', 'braids', 'bun', 'wrap', 'cap', 'hijab'] as const)
    const item = pick(['none', 'none', 'laptop', 'phone', 'bag', 'cup', 'backpack'] as const)
    const topPattern = rand() < 0.28 ? pick(['wax', 'stripe'] as const) : null
    const patternColor = pick(['#E0A93B', '#FFFFFF', '#15140F', '#B4532A', '#0E5A45'])
    const accent = pick(ACCENTS)
    const glasses = rand() < 0.22
    const beard = (hairStyle === 'short' || hairStyle === 'bald' || hairStyle === 'cap') && rand() < 0.35

    // Cheveux et accessoires derrière la tête
    if (hairStyle === 'afro') {
      ell(c, 58, 33, 29, 26)
      blob(c, hair)
    }
    if (hairStyle === 'braids') {
      rr(c, 38, 28, 26, 74, 11)
      blob(c, hair)
    }
    if (hairStyle === 'hijab') {
      c.beginPath()
      c.moveTo(36, 52)
      c.bezierCurveTo(30, 12, 92, 6, 88, 48)
      c.bezierCurveTo(90, 70, 86, 86, 90, 98)
      c.lineTo(34, 98)
      c.bezierCurveTo(40, 84, 36, 70, 36, 52)
      c.closePath()
      blob(c, accent)
    }
    if (item === 'backpack') {
      rr(c, 24, 90, 24, 58, 8)
      blob(c, accent)
    }

    // Bras arrière
    limb(c, [48, 92, 41, 120, 37, 146], top, 11)
    ell(c, 37, 150, 6, 6)
    blob(c, skin, 2.5)

    // Jambes et chaussures
    if (style === 'pants') {
      limb(c, [53, 156, 47, 200, 43, 243], bottom, 15)
      limb(c, [68, 156, 75, 200, 80, 241], bottom, 15)
    } else {
      limb(c, [53, 186, 49, 243], skin, 8)
      limb(c, [68, 186, 75, 241], skin, 8)
    }
    ell(c, 47, 248, 10, 5)
    blob(c, shoe, 2.5)
    ell(c, 85, 246, 10, 5)
    blob(c, shoe, 2.5)

    // Jupe ou robe (pagne)
    if (style !== 'pants') {
      const skirt = () => {
        c.beginPath()
        c.moveTo(42, 148)
        c.lineTo(81, 148)
        c.lineTo(92, 208)
        c.lineTo(31, 208)
        c.closePath()
      }
      skirt()
      c.fillStyle = bottom
      c.fill()
      if (rand() < 0.5) {
        c.save()
        skirt()
        c.clip()
        pattern(c, 'wax', patternColor)
        c.restore()
      }
      skirt()
      c.lineWidth = 3
      c.strokeStyle = INK
      c.stroke()
    }

    // Cou et buste
    rr(c, 55, 56, 13, 28, 4)
    blob(c, skin, 2.5)
    const torso = () => {
      c.beginPath()
      c.moveTo(44, 80)
      c.quadraticCurveTo(61, 74, 78, 80)
      c.quadraticCurveTo(87, 84, 85, 100)
      c.lineTo(83, 162)
      c.lineTo(41, 162)
      c.lineTo(38, 100)
      c.quadraticCurveTo(36, 84, 44, 80)
      c.closePath()
    }
    torso()
    c.fillStyle = top
    c.fill()
    if (topPattern) {
      c.save()
      torso()
      c.clip()
      pattern(c, topPattern, patternColor)
      c.restore()
    }
    torso()
    c.lineWidth = 3
    c.strokeStyle = INK
    c.stroke()
    c.beginPath()
    c.moveTo(54, 79)
    c.lineTo(61, 89)
    c.lineTo(68, 79)
    c.lineWidth = 2.5
    c.stroke()

    // Bras avant et objet tenu
    if (item === 'laptop') {
      limb(c, [75, 92, 84, 118, 98, 124], top, 11)
      rr(c, 68, 120, 42, 7, 2)
      blob(c, '#C9D1CC', 2.5)
      ell(c, 99, 124, 6, 6)
      blob(c, skin, 2.5)
    } else if (item === 'phone') {
      limb(c, [75, 92, 90, 116, 96, 102], top, 11)
      rr(c, 92, 84, 10, 17, 2)
      blob(c, '#15140F', 2)
      ell(c, 96, 104, 6, 6)
      blob(c, skin, 2.5)
    } else if (item === 'cup') {
      limb(c, [75, 92, 86, 120, 98, 120], top, 11)
      rr(c, 95, 104, 12, 15, 2)
      blob(c, '#FFFFFF', 2.5)
      c.fillStyle = '#B4532A'
      c.fillRect(96.5, 109, 9, 4)
      ell(c, 98, 121, 6, 6)
      blob(c, skin, 2.5)
    } else {
      limb(c, [75, 92, 82, 120, 84, 148], top, 11)
      if (item === 'bag') {
        c.beginPath()
        c.moveTo(72, 84)
        c.lineTo(88, 130)
        c.lineWidth = 2.5
        c.strokeStyle = INK
        c.stroke()
        rr(c, 79, 128, 24, 28, 4)
        blob(c, accent)
      }
      ell(c, 84, 152, 6, 6)
      blob(c, skin, 2.5)
    }

    // Tête
    ell(c, 62, 42, 19, 22)
    blob(c, skin)
    ell(c, 50, 45, 4, 6)
    blob(c, skin, 2.5)

    if (beard) {
      c.beginPath()
      c.moveTo(55, 50)
      c.quadraticCurveTo(58, 68, 71, 65)
      c.quadraticCurveTo(80, 63, 80, 53)
      c.quadraticCurveTo(74, 60, 66, 58)
      c.quadraticCurveTo(59, 57, 55, 50)
      c.closePath()
      blob(c, hair, 2.5)
    }

    // Visage
    c.fillStyle = INK
    ell(c, 68, 41, 1.9, 2.3)
    c.fill()
    ell(c, 77, 41, 1.9, 2.3)
    c.fill()
    c.lineWidth = 2
    c.strokeStyle = INK
    c.beginPath()
    c.moveTo(79, 45)
    c.quadraticCurveTo(84, 50, 78, 52)
    c.stroke()
    if (!beard) {
      c.beginPath()
      c.arc(72, 54, 4.5, 0.15 * Math.PI, 0.85 * Math.PI)
      c.stroke()
    }

    // Coiffures et couvre-chefs
    if (hairStyle === 'short' || hairStyle === 'braids') {
      c.beginPath()
      c.moveTo(43, 47)
      c.bezierCurveTo(39, 21, 67, 12, 81, 27)
      c.quadraticCurveTo(77, 31, 70, 29)
      c.quadraticCurveTo(56, 30, 50, 41)
      c.quadraticCurveTo(48, 48, 43, 47)
      c.closePath()
      blob(c, hair)
    } else if (hairStyle === 'afro') {
      c.beginPath()
      c.moveTo(42, 42)
      c.bezierCurveTo(44, 16, 79, 13, 83, 31)
      c.quadraticCurveTo(70, 25, 60, 30)
      c.quadraticCurveTo(50, 35, 46, 47)
      c.closePath()
      blob(c, hair)
    } else if (hairStyle === 'bun') {
      ell(c, 45, 22, 9, 9)
      blob(c, hair)
      c.beginPath()
      c.moveTo(43, 47)
      c.bezierCurveTo(39, 21, 67, 12, 81, 27)
      c.quadraticCurveTo(70, 27, 58, 31)
      c.quadraticCurveTo(48, 36, 43, 47)
      c.closePath()
      blob(c, hair)
    } else if (hairStyle === 'wrap') {
      const wrap = () => {
        c.beginPath()
        c.moveTo(42, 45)
        c.bezierCurveTo(32, 8, 94, -2, 85, 38)
        c.quadraticCurveTo(64, 29, 42, 45)
        c.closePath()
      }
      wrap()
      c.fillStyle = accent
      c.fill()
      c.save()
      wrap()
      c.clip()
      pattern(c, 'wax', accent === '#E0A93B' ? '#B4532A' : '#E0A93B')
      c.restore()
      wrap()
      c.lineWidth = 3
      c.strokeStyle = INK
      c.stroke()
      ell(c, 71, 13, 9, 6)
      blob(c, accent)
    } else if (hairStyle === 'cap') {
      c.beginPath()
      c.moveTo(42, 37)
      c.bezierCurveTo(42, 13, 81, 11, 83, 33)
      c.closePath()
      blob(c, accent)
      c.beginPath()
      c.moveTo(78, 32)
      c.quadraticCurveTo(93, 30, 100, 35)
      c.lineTo(80, 38)
      c.closePath()
      blob(c, accent)
    } else if (hairStyle === 'hijab') {
      c.beginPath()
      c.moveTo(45, 42)
      c.bezierCurveTo(46, 16, 82, 12, 85, 34)
      c.lineTo(83, 39)
      c.bezierCurveTo(78, 25, 57, 25, 52, 43)
      c.bezierCurveTo(50, 55, 54, 64, 61, 68)
      c.lineTo(48, 74)
      c.bezierCurveTo(41, 63, 43, 51, 45, 42)
      c.closePath()
      blob(c, accent)
    } else if (hairStyle === 'bald') {
      c.beginPath()
      c.arc(66, 30, 7, 1.15 * Math.PI, 1.55 * Math.PI)
      c.lineWidth = 2
      c.strokeStyle = 'rgba(255,255,255,.55)'
      c.stroke()
    }

    if (glasses) {
      c.lineWidth = 2
      c.strokeStyle = INK
      ell(c, 68, 41, 5, 4.5)
      c.stroke()
      ell(c, 78, 41, 4.5, 4.5)
      c.stroke()
      c.beginPath()
      c.moveTo(63, 40)
      c.lineTo(54, 39)
      c.stroke()
    }

    return { image: canvas, scale: 0.9 + rand() * 0.18 }
  }

  return Array.from({ length: count }, makePeep)
}
