import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'
import PricingCalculator from './PricingCalculator.vue'
import './vion-tokens.css'
import './vion-overrides.css'

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,
  enhanceApp({ app }) {
    app.component('PricingCalculator', PricingCalculator)
  },
}
