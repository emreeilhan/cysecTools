// Purpose: Centered animated hero with dot grid and floating hex/hash codes
// TODO: Expose props for colors, density and animation speed
import React, { useEffect, useRef } from 'react'

function randomHex(len) {
  const chars = '0123456789abcdef'
  let out = ''
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)]
  return out
}

function useAnimationFrame(callback) {
  const requestRef = useRef()
  const animate = (time) => {
    callback(time)
    requestRef.current = requestAnimationFrame(animate)
  }
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])
}

export default function HeroAnimated({ title, subtitle }) {
  const canvasRef = useRef(null)
  const hexLayerRef = useRef(null)

  // Draw dynamic dot grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useAnimationFrame((t) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    ctx.clearRect(0, 0, w, h)

    // Dot grid parameters
    const spacing = 14
    const radius = 1.2
    const time = t * 0.001
    for (let y = spacing; y < h - spacing; y += spacing) {
      for (let x = spacing; x < w - spacing; x += spacing) {
        const d = Math.hypot(x - w / 2, y - h / 2)
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + d * 0.04)
        const r = radius + pulse * 0.8
        ctx.beginPath()
        ctx.fillStyle = `rgba(16,185,129,${0.25 + pulse * 0.25})`
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  })

  // Floating hex/hash codes layer (DOM for crisp text)
  useEffect(() => {
    const layer = hexLayerRef.current
    if (!layer) return
    const nodes = []
    const createNode = (delay) => {
      const el = document.createElement('div')
      el.className = 'absolute text-[10px] md:text-xs font-mono text-emerald-400/70 dark:text-emerald-300/70 will-change-transform'
      el.style.left = `${Math.random() * 90 + 5}%`
      el.style.top = `${Math.random() * 70 + 15}%`
      el.style.transition = 'transform 8s linear, opacity 2s ease'
      el.style.opacity = '0'
      el.textContent = Math.random() > 0.5 ? randomHex(8) : `#${randomHex(6)}`
      layer.appendChild(el)
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = `translateY(-40px)`
      }, delay)
      setTimeout(() => {
        el.style.opacity = '0'
        setTimeout(() => el.remove(), 1500)
      }, 8000 + delay)
      nodes.push(el)
    }
    const interval = setInterval(() => createNode(0), 900)
    for (let i = 0; i < 10; i++) createNode(i * 200)
    return () => {
      clearInterval(interval)
      nodes.forEach((n) => n.remove())
    }
  }, [])

  return (
    <section className="pt-6">
      <div
        className="relative grid place-items-center overflow-hidden bg-neutral-100/20 dark:bg-neutral-900/40 mx-[-1rem] sm:mx-[-1.25rem]"
        style={{ minHeight: 260 }}
      >
        {/* Edge glow/vignette to feel like emerging from the page */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 dark:from-black/60 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 dark:from-black/60 to-transparent" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />

        {/* Animated background canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

        {/* Floating hex/hash codes layer */}
        <div ref={hexLayerRef} className="absolute inset-0" aria-hidden />

        {/* Centered copy */}
        <div className="relative z-10 text-center px-4 py-12">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}


