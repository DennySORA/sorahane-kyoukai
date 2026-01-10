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
    '255, 182, 193', // light pink
    '255, 105, 180', // hot pink
    '219, 39, 119'   // pink-600
  ]
  
  return {
    x: Math.random() * window.innerWidth,
    y: yOverride ?? Math.random() * window.innerHeight,
    size: Math.random() * 6 + 4,
    speedX: Math.random() * 1.5 - 0.5,
    speedY: Math.random() * 1.2 + 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 2 - 1,
    color: colors[Math.floor(Math.random() * colors.length)] ?? '255, 182, 193',
    opacity: Math.random() * 0.6 + 0.4
  }
}

function animate() {
  if (!ctx || !canvas.value) return
  
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  particles.forEach((p, index) => {
    p.y += p.speedY
    p.x += p.speedX + Math.sin(p.y * 0.01) * 0.8 // More pronounced sway
    p.rotation += p.rotationSpeed
    
    // Reset if out of view
    if (p.y > canvas.value!.height + 20) {
      particles[index] = createPetal(-20)
    }
    if (p.x > canvas.value!.width + 20) {
      p.x = -20
    } else if (p.x < -20) {
      p.x = canvas.value!.width + 20
    }
    
    ctx!.save()
    ctx!.translate(p.x, p.y)
    ctx!.rotate((p.rotation * Math.PI) / 180)
    ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`
    
    // Improved Sakura Petal Shape (Heart-ish)
    ctx!.beginPath()
    ctx!.moveTo(0, 0)
    ctx!.bezierCurveTo(-p.size, -p.size, -p.size / 2, -p.size * 1.5, 0, -p.size * 0.8)
    ctx!.bezierCurveTo(p.size / 2, -p.size * 1.5, p.size, -p.size, 0, 0)
    ctx!.fill()
    
    // Petal Vein (optional detail)
    ctx!.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.3})`
    ctx!.lineWidth = 1
    ctx!.beginPath()
    ctx!.moveTo(0, 0)
    ctx!.lineTo(0, -p.size * 0.6)
    ctx!.stroke()
    
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
