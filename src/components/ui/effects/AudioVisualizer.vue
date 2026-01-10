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
  height: 40%; /* Only take up bottom portion */
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0.5;
  mask-image: linear-gradient(to top, black, transparent);
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  width: 100%;
  height: 100%;
  padding: 0 10%;
  justify-content: space-around;
}

.bar {
  width: 2%;
  background: linear-gradient(to top, var(--color-cosmic-purple), var(--color-nebula-pink));
  height: 10%;
  animation: bounce 1.2s ease-in-out infinite alternate;
  animation-delay: var(--delay);
  border-radius: 4px 4px 0 0;
}

@keyframes bounce {
  0% { height: 10%; opacity: 0.3; }
  50% { height: 40%; opacity: 0.7; }
  100% { height: 80%; opacity: 1; }
}
</style>
