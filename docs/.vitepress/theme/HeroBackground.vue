<script setup>
import { onMounted, ref } from 'vue'

const loaded = ref(false)
const ready = ref(false)

onMounted(() => {
  ready.value = !!document.querySelector('.VPHome')

  const img = new Image()
  img.src = '/bg-iot-devices.webp'
  img.onload = () => { loaded.value = true }
})
</script>

<template>
  <Teleport v-if="ready" to=".VPHome">
    <div class="hero-bg" :class="{ loaded }">
      <div class="hero-bg-image" />
      <div class="hero-bg-overlay" />
    </div>
  </Teleport>
</template>

<style>
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1.2s ease;
  pointer-events: none;
}

.hero-bg.loaded {
  opacity: 1;
}

.hero-bg-image {
  position: absolute;
  inset: -40px;
  background: url('/bg-iot-devices.webp') center / cover no-repeat;
  animation: hero-drift 30s ease-in-out infinite alternate;
}

.hero-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(246, 247, 245, 0.28) 0%,
    rgba(246, 247, 245, 0.52) 35%,
    rgba(246, 247, 245, 0.82) 55%,
    rgba(246, 247, 245, 0.96) 80%,
    rgba(246, 247, 245, 1) 100%
  );
}

html.dark .hero-bg-overlay {
  background: linear-gradient(
    to bottom,
    rgba(28, 25, 23, 0.35) 0%,
    rgba(28, 25, 23, 0.6) 35%,
    rgba(28, 25, 23, 0.85) 55%,
    rgba(28, 25, 23, 0.96) 80%,
    rgba(28, 25, 23, 1) 100%
  );
}

@keyframes hero-drift {
  0% {
    transform: scale(1.05) translate(0, 0);
  }
  100% {
    transform: scale(1.1) translate(-20px, -10px);
  }
}
</style>
