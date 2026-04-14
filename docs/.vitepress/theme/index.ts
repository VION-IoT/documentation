import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import './vion-tokens.css'
import './vion-overrides.css'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  // enhanceApp({ app }) {
    
  // },
}
