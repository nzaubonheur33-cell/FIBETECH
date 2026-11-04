'use client'

/**
 * Skiper 39 Canvas_Landing_004 — React + Canvas, adapté pour Fibetech.
 * Inspired by and adapted from https://codepen.io/zadvorsky/pen/xxwbBQV
 * Original component: Skiper UI (https://gxuri.me) by @gurvinder-singh02.
 * License & Usage (Skiper UI): free to use and modify in personal and commercial
 * projects; attribution to Skiper UI is required when using the free version.
 *
 * Illustrations : Open Peeps par Pablo Stanley (https://www.openpeeps.com/), licence CC0.
 *
 * Adaptations :
 * - la planche est servie par le site lui-même (src/assets), pas par un CDN externe ;
 * - les personnages s'adaptent à la hauteur du canvas (62 % au maximum) ;
 * - moins de personnages sur petit écran, pour garder la foule lisible ;
 * - `src` facultatif : sans planche, la foule utilise des personnages dessinés en code (peeps.ts) ;
 * - redimensionnement suivi avec ResizeObserver, pause hors écran,
 *   respect de « réduire les animations », écran haute définition.
 */

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { createPeepSprites, PEEP_H, PEEP_W } from './peeps'

interface CrowdCanvasProps {
  /** Planche d'illustrations (facultatif), découpée en `rows` × `cols`, comme le composant d'origine. */
  src?: string
  rows?: number
  cols?: number
  /** Nombre de personnages dessinés quand `src` n'est pas fourni. */
  count?: number
  className?: string
}

type Peep = {
  image: CanvasImageSource
  rect: [number, number, number, number]
  procedural: boolean
  scale: number
  width: number
  height: number
  x: number
  y: number
  anchorY: number
  scaleX: number
  walk: gsap.core.Timeline | null
}

const randomRange = (min: number, max: number) => min + Math.random() * (max - min)
const randomIndex = (array: unknown[]) => (randomRange(0, array.length) | 0)

export function CrowdCanvas({ src, rows = 15, cols = 7, count = 36, className }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const stage = { width: 0, height: 0 }
    const allPeeps: Peep[] = []
    const availablePeeps: Peep[] = []
    const crowd: Peep[] = []
    let running = false
    let visible = true
    let disposed = false

    // Facteur d'échelle des personnages de la planche (1 = taille d'origine).
    const sheetScale = (peep: Peep) => Math.min(1, (stage.height * 0.62) / peep.rect[3])

    const sizePeep = (peep: Peep) => {
      if (peep.procedural) {
        peep.height = Math.min(stage.height * 0.46, 210) * peep.scale
        peep.width = peep.height * (PEEP_W / PEEP_H)
      } else {
        const s = sheetScale(peep)
        peep.width = peep.rect[2] * s
        peep.height = peep.rect[3] * s
      }
    }

    const resetPeep = (peep: Peep) => {
      sizePeep(peep)
      const direction = Math.random() > 0.5 ? 1 : -1
      const offsetY = peep.procedural
        ? peep.height * (0.35 - 0.88 * gsap.parseEase('power2.in')(Math.random()))
        : (100 - 250 * gsap.parseEase('power2.in')(Math.random())) * sheetScale(peep)
      const startY = stage.height - peep.height + offsetY
      let startX: number
      let endX: number

      if (direction === 1) {
        startX = -peep.width
        endX = stage.width
        peep.scaleX = 1
      } else {
        startX = stage.width + peep.width
        endX = 0
        peep.scaleX = -1
      }

      peep.x = startX
      peep.y = startY
      peep.anchorY = startY
      return { startY, endX }
    }

    const normalWalk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
      const xDuration = Math.max(9, stage.width / 120)
      const yDuration = 0.25
      const bob = peep.procedural ? Math.max(6, peep.height * 0.045) : Math.max(6, 10 * sheetScale(peep))

      const tl = gsap.timeline()
      tl.timeScale(randomRange(0.5, 1.5))
      tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0)
      tl.to(peep, { duration: yDuration, repeat: Math.ceil(xDuration / yDuration), yoyo: true, y: startY - bob }, 0)
      return tl
    }

    const removePeepFromCrowd = (peep: Peep) => {
      const i = crowd.indexOf(peep)
      if (i >= 0) crowd.splice(i, 1)
      availablePeeps.push(peep)
    }

    const addPeepToCrowd = (): Peep => {
      const peep = availablePeeps.splice(randomIndex(availablePeeps), 1)[0]
      const walk = normalWalk(peep, resetPeep(peep)).eventCallback('onComplete', () => {
        removePeepFromCrowd(peep)
        addPeepToCrowd()
      })
      peep.walk = walk
      if (!running) walk.pause()
      crowd.push(peep)
      crowd.sort((a, b) => a.anchorY - b.anchorY)
      return peep
    }

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk?.progress(Math.random())
      }
    }

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (const peep of crowd) {
        ctx.save()
        ctx.translate(peep.x, peep.y)
        ctx.scale(peep.scaleX, 1)
        ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height)
        ctx.restore()
      }
    }

    const start = () => {
      if (running || reduceMotion || !visible || disposed) return
      running = true
      crowd.forEach((peep) => peep.walk?.resume())
      gsap.ticker.add(render)
    }

    const stop = () => {
      if (!running) return
      running = false
      crowd.forEach((peep) => peep.walk?.pause())
      gsap.ticker.remove(render)
    }

    const resize = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (width < 10 || height < 10) return
      stage.width = width
      stage.height = height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      crowd.forEach((peep) => peep.walk?.kill())
      crowd.length = 0
      availablePeeps.length = 0
      // Sur petit écran, une partie de la foule suffit : elle reste lisible et légère.
      const poolSize = width < 640 ? Math.ceil(allPeeps.length * 0.55) : allPeeps.length
      availablePeeps.push(...allPeeps.slice(0, poolSize))
      initCrowd()
      render()
    }

    const shuffle = <T,>(list: T[]) => {
      for (let i = list.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0
        ;[list[i], list[j]] = [list[j], list[i]]
      }
      return list
    }

    const init = () => {
      if (disposed) return
      resize()
      start()
    }

    // Personnages : planche d'origine si `src` est fourni, sinon dessinés en code.
    let img: HTMLImageElement | null = null
    if (src) {
      img = document.createElement('img')
      img.decoding = 'async'
      img.onload = () => {
        if (!img) return
        const { naturalWidth: width, naturalHeight: height } = img
        const rectWidth = width / rows
        const rectHeight = height / cols
        for (let i = 0; i < rows * cols; i++) {
          allPeeps.push({
            image: img,
            rect: [(i % rows) * rectWidth, ((i / rows) | 0) * rectHeight, rectWidth, rectHeight],
            procedural: false,
            scale: 1,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            anchorY: 0,
            scaleX: 1,
            walk: null,
          })
        }
        shuffle(allPeeps)
        init()
      }
      img.src = src
    } else {
      for (const sprite of createPeepSprites(count)) {
        allPeeps.push({
          image: sprite.image,
          rect: [0, 0, sprite.image.width, sprite.image.height],
          procedural: true,
          scale: sprite.scale,
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          anchorY: 0,
          scaleX: 1,
          walk: null,
        })
      }
      init()
    }

    let lastW = 0
    let lastH = 0
    const resizeObserver = new ResizeObserver(() => {
      if (canvas.clientWidth === lastW && canvas.clientHeight === lastH) return
      lastW = canvas.clientWidth
      lastH = canvas.clientHeight
      if (allPeeps.length) resize()
    })
    resizeObserver.observe(canvas)

    // Pas d'animation quand la foule est hors de l'écran : économise la batterie.
    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)

    return () => {
      disposed = true
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      crowd.forEach((peep) => peep.walk?.kill())
      if (img) img.onload = null
    }
  }, [src, rows, cols, count])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('absolute bottom-0 h-[90vh] w-full', className)} />
}

/** Démo d'origine du composant (non utilisée dans le site, gardée pour référence). */
export function Skiper39({ src }: { src?: string }) {
  return (
    <div className="relative h-full w-full bg-white text-black">
      <div className="absolute left-1/2 top-[88px] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
          Croud Canvas
        </span>
      </div>
      <div className="absolute bottom-0 h-full w-screen">
        <CrowdCanvas src={src} rows={15} cols={7} />
      </div>
    </div>
  )
}

export default Skiper39
