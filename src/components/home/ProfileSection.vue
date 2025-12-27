<script setup lang="ts">
import { ref, watch } from 'vue'
import TypeWriter from '@/components/ui/TypeWriter.vue'
import { useSectionVisibility } from '@/composables/useSectionVisibility'

const { sectionRef, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 })

const showLogo = ref(false)
const showName = ref(false)
const showLinks = ref(false)
const typewriterComplete = ref(false)

watch(hasBeenVisible, (visible) => {
  if (visible) {
    setTimeout(() => { showLogo.value = true }, 200)
    setTimeout(() => { showName.value = true }, 800)
  }
})

function onTypewriterComplete(): void {
  typewriterComplete.value = true
  setTimeout(() => { showLinks.value = true }, 300)
}

const socialLinks = [
  {
    name: 'Threads',
    href: 'https://short.dennysora.me/thread',
    icon: 'threads'
  },
  {
    name: 'GitHub',
    href: 'https://short.dennysora.me/github',
    icon: 'github'
  }
]
</script>

<template>
  <section ref="sectionRef" class="profile-section">
    <div class="profile-content">
      <Transition name="scale">
        <div v-if="showLogo" class="logo-wrapper">
          <img
            src="/images/personal_logo.png"
            alt="DennySORA"
            class="personal-logo"
          />
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showName" class="name-wrapper">
          <h2 class="name">
            <TypeWriter
              text="DennySORA"
              :speed="100"
              @complete="onTypewriterComplete"
            />
          </h2>
        </div>
      </Transition>

      <Transition name="slide-up">
        <div v-if="showLinks" class="links-wrapper">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            {{ link.name }}
          </a>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.profile-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.logo-wrapper {
  width: 200px;
}

.personal-logo {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(245, 197, 66, 0.3));
}

.name {
  font-family: var(--font-display-en);
  font-size: 48px;
  font-weight: 600;
  color: var(--color-star-white);
}

.links-wrapper {
  display: flex;
  gap: 16px;
}

.social-link {
  padding: 12px 24px;
  background: rgba(30, 58, 95, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--color-moon-silver);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(245, 197, 66, 0.2);
  border-color: rgba(245, 197, 66, 0.4);
  color: var(--color-star-white);
}

.scale-enter-active,
.fade-enter-active,
.slide-up-enter-active {
  transition: all 0.6s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-from {
  opacity: 0;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
