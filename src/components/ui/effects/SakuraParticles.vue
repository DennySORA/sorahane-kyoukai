<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Petal[] = []

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  color: string
  opacity: number
}

function resizeCanvas() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function createParticles() {
  const particleCount = Math.min(window.innerWidth * 0.05, 50) // Responsive count
  particles = []
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(createPetal())
  }
}

function createPetal(yOverride?: number): Petal {
  const colors = [
    '236, 72, 153', // nebula-pink
    '255, 255, 255', // white
    '167, 139, 250'  // light purple
  ]
  
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    size: Math.random() * 5 + 3,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 + 0.5,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 2 - 1,
    color: colors[Math.floor(Math.random() * colors.length)] ?? '255, 255, 255',
    opacity: Math.random() * 0.5 + 0.3
  }
}

function animate() {
  if (!ctx || !canvas.value) return
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  particles.forEach((p, index) => {
    p.y += p.speedY
    p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5 // Sway effect
    p.rotation += p.rotationSpeed
    
    // Reset if out of view
    if (p.y > canvas.value!.height) {
      particles[index] = createPetal(-10)
    }
    if (p.x > canvas.value!.width) {
      p.x = 0
    } else if (p.x < 0) {
      p.x = canvas.value!.width
    }
    
    ctx!.save()
    ctx!.translate(p.x, p.y)
    ctx!.rotate((p.rotation * Math.PI) / 180)
    ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`
    
    // Draw petal shape (oval)
    ctx!.beginPath()
    ctx!.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, 2 * Math.PI)
    ctx!.fill()
    ctx!.restore()
  })
  
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    resizeCanvas()
    createParticles()
    animate()
    
    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas ref="canvas" class="sakura-canvas"></canvas>
</template>

<style scoped>
.sakura-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
