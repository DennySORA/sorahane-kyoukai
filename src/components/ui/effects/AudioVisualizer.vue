<script setup lang="ts">
</script>

<template>
  <div class="visualizer-container">
    <div class="bars">
      <div v-for="i in 20" :key="i" class="bar" :style="{ '--delay': `${i * 0.1}s` }"></div>
    </div>
  </div>
</template>

<style scoped>
.visualizer-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%; /* Taller */
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0.9; /* More visible */
  mask-image: linear-gradient(to top, black 20%, transparent 100%);
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 6px; /* Wider gap */
  width: 100%;
  height: 100%;
  padding: 0 10%;
  justify-content: space-around;
}

.bar {
  width: 3%; /* Wider bars */
  /* Vibrant Deep Indigo -> Fuchsia/Pink */
  background: linear-gradient(to top, #4f46e5, #d946ef);
  height: 10%;
  animation: bounce 1.2s ease-in-out infinite alternate;
  animation-delay: var(--delay);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 0 10px rgba(79, 70, 229, 0.5); /* Glow */
}

@keyframes bounce {
  0% { height: 15%; opacity: 0.5; }
  50% { height: 50%; opacity: 0.8; }
  100% { height: 90%; opacity: 1; }
}
</style>
