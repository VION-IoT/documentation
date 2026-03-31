<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HeroBackground from './HeroBackground.vue'

const { frontmatter } = useData()
const isHome = () => frontmatter.value.layout === 'home'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-before>
      <HeroBackground v-if="isHome()" />
    </template>
    <template #home-features-after>
      <div v-if="isHome()" class="home-copyright">
        © 2026 <a href="https://vion.swiss/" target="_blank">ecocoach AG</a>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style>
.home-copyright {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px 0;
  font-size: 13px;
  opacity: 0.45;
  color: var(--vp-c-text-2);
}

.home-copyright a {
  color: inherit;
  text-decoration: none;
}

.home-copyright a:hover {
  text-decoration: underline;
}
</style>
