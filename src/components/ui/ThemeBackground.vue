<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import StarBackground from './StarBackground.vue'

const props = defineProps<{
  effect: string
}>()

// Lazy load heavy background components
const SakuraParticles = defineAsyncComponent(() => import('./effects/SakuraParticles.vue'))
const MatrixRain = defineAsyncComponent(() => import('./effects/MatrixRain.vue'))
const SpeedLines = defineAsyncComponent(() => import('./effects/SpeedLines.vue'))
const RippleEffect = defineAsyncComponent(() => import('./effects/RippleEffect.vue'))
const InkSpread = defineAsyncComponent(() => import('./effects/InkSpread.vue'))
const AuroraBorealis = defineAsyncComponent(() => import('./effects/AuroraBorealis.vue'))
const AudioVisualizer = defineAsyncComponent(() => import('./effects/AudioVisualizer.vue'))

</script>

<template>
  <div class="theme-background">
    <!-- Base Layer: Stars are always present but maybe fainter -->
    <StarBackground :star-count="props.effect === 'stars' ? 100 : 40" />

    <!-- Specific Effects -->
    <Transition name="fade">
      <component
        :is="SakuraParticles"
        v-if="props.effect === 'sakura'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="MatrixRain"
        v-if="props.effect === 'matrix'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="SpeedLines"
        v-if="props.effect === 'speed-lines'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="RippleEffect"
        v-if="props.effect === 'ripple'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="InkSpread"
        v-if="props.effect === 'ink'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="AuroraBorealis"
        v-if="props.effect === 'aurora'"
      />
    </Transition>

    <Transition name="fade">
      <component
        :is="AudioVisualizer"
        v-if="props.effect === 'visualizer'"
      />
    </Transition>
  </div>
</template>

<style scoped>
.theme-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
