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
          <div class="logo-halo"></div>
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
  position: relative;
  width: clamp(200px, 30vw, 260px);
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  transition: transform 0.3s var(--ease-out-back);
}

.logo-halo {
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 197, 66, 0.35) 0%,
    rgba(67, 56, 202, 0.2) 45%,
    transparent 70%
  );
  filter: blur(6px);
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.personal-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter:
    drop-shadow(0 0 16px rgba(245, 197, 66, 0.25))
    drop-shadow(0 0 30px rgba(67, 56, 202, 0.2));
  transition: transform 0.3s ease, filter 0.3s ease;
}

@media (hover: hover) {
  .logo-wrapper:hover {
    transform: translateY(-4px);
  }

  .logo-wrapper:hover .logo-halo {
    opacity: 1;
    transform: scale(1.08);
  }

  .logo-wrapper:hover .personal-logo {
    transform: scale(1.04);
    filter:
      drop-shadow(0 0 22px rgba(245, 197, 66, 0.4))
      drop-shadow(0 0 40px rgba(67, 56, 202, 0.3));
  }
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
