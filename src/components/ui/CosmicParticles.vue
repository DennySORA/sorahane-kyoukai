<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  maxParticles?: number
  density?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxParticles: 180,
  density: 11000
})

interface RgbColor {
  r: number
  g: number
  b: number
}

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  opacity: number
  twinkle: number
  parallax: number
  streak: boolean
  color: RgbColor
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

const defaultColor: RgbColor = { r: 248, g: 250, b: 252 }

const palette: RgbColor[] = [
  defaultColor,
  { r: 226, g: 232, b: 240 },
  { r: 129, g: 140, b: 248 },
  { r: 245, g: 197, b: 66 }
]

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let width = 0
let height = 0
let dpr = 1
let rafId: number | null = null
let reduceMotion = false
let motionQuery: MediaQueryList | null = null

const pointer = {
  x: 0.5,
  y: 0.5,
  targetX: 0.5,
  targetY: 0.5
}

function buildParticle(): Particle {
  const radius = 0.6 + Math.random() * 2.2
  const speed = 0.06 + Math.random() * 0.18
  const drift = Math.random() * Math.PI * 2
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius,
    vx: Math.cos(drift) * speed,
    vy: Math.sin(drift) * speed,
    opacity: 0.3 + Math.random() * 0.6,
    twinkle: Math.random() * Math.PI * 2,
    parallax: 0.2 + Math.random() * 0.8,
    streak: Math.random() < 0.18,
    color: palette[Math.floor(Math.random() * palette.length)] ?? defaultColor
  }
}

function seedParticles(): void {
  const area = Math.max(width * height, 1)
  const count = Math.min(props.maxParticles, Math.floor(area / props.density))
  particles = Array.from({ length: Math.max(count, 40) }, () => buildParticle())
}

function resizeCanvas(): void {
  if (!canvasRef.value) return
  width = window.innerWidth
  height = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvasRef.value.width = width * dpr
  canvasRef.value.height = height * dpr
  canvasRef.value.style.width = `${width}px`
  canvasRef.value.style.height = `${height}px`
  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  seedParticles()
  if (reduceMotion) {
    renderFrame(0)
  }
}

function updatePointer(event: MouseEvent): void {
  if (!width || !height) return
  pointer.targetX = event.clientX / width
  pointer.targetY = event.clientY / height
}

function updateTouch(event: TouchEvent): void {
  if (!width || !height) return
  const touch = event.touches[0]
  if (!touch) return
  pointer.targetX = touch.clientX / width
  pointer.targetY = touch.clientY / height
}

function renderFrame(time: number): void {
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.globalCompositeOperation = 'lighter'
  pointer.x += (pointer.targetX - pointer.x) * 0.05
  pointer.y += (pointer.targetY - pointer.y) * 0.05
  ctx.shadowBlur = 12
  ctx.shadowColor = 'rgba(248, 250, 252, 0.25)'

  for (const particle of particles) {
    if (!reduceMotion) {
      particle.x += particle.vx
      particle.y += particle.vy
    }

    const margin = 40
    if (particle.x < -margin) particle.x = width + margin
    if (particle.x > width + margin) particle.x = -margin
    if (particle.y < -margin) particle.y = height + margin
    if (particle.y > height + margin) particle.y = -margin

    const parallaxX = (pointer.x - 0.5) * particle.parallax * 40
    const parallaxY = (pointer.y - 0.5) * particle.parallax * 32
    const twinkle = 0.6 + Math.sin(time * 0.001 + particle.twinkle) * 0.4
    const alpha = particle.opacity * twinkle

    const drawX = particle.x + parallaxX
    const drawY = particle.y + parallaxY
    ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`
    ctx.beginPath()
    ctx.arc(drawX, drawY, particle.radius, 0, Math.PI * 2)
    ctx.fill()

    if (particle.streak && !reduceMotion) {
      ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha * 0.6})`
      ctx.lineWidth = Math.max(0.5, particle.radius * 0.6)
      ctx.beginPath()
      ctx.moveTo(drawX, drawY)
      ctx.lineTo(drawX - particle.vx * 80, drawY - particle.vy * 80)
      ctx.stroke()
    }
  }
}

function animate(time: number): void {
  renderFrame(time)
  rafId = requestAnimationFrame(animate)
}

function stopAnimation(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function handleMotionChange(event: MediaQueryListEvent): void {
  reduceMotion = event.matches
  stopAnimation()
  if (reduceMotion) {
    renderFrame(0)
    return
  }
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion = motionQuery.matches
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', handleMotionChange)
  } else {
    motionQuery.addListener(handleMotionChange)
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('mousemove', updatePointer, { passive: true })
  window.addEventListener('touchmove', updateTouch, { passive: true })

  if (!reduceMotion) {
    rafId = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', updatePointer)
  window.removeEventListener('touchmove', updateTouch)
  if (motionQuery) {
    if (motionQuery.removeEventListener) {
      motionQuery.removeEventListener('change', handleMotionChange)
    } else {
      motionQuery.removeListener(handleMotionChange)
    }
  }
  motionQuery = null
})
</script>

<template>
  <canvas ref="canvasRef" class="cosmic-canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
.cosmic-canvas {
  position: fixed;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: screen;
}

@media (max-width: 768px) {
  .cosmic-canvas {
    opacity: 0.45;
  }
}
</style>
