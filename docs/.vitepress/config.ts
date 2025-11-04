import { defineConfig } from 'vitepress'
import { useSidebar } from 'vitepress-openapi'
import spec from '../api/cloud/swagger.json' with { type: 'json' }

const openApiSidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items.
  linkPrefix: '/api/cloud/operations/',
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vion Documentation",
  description: "vion Developer docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'API Reference', link: '/api/' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'Core Concepts',
        link: '/concepts/',
        items: [
          { text: 'Logic Blocks', link: '/concepts/logic-blocks' },
          { text: 'Services', link: '/concepts/services' },
          { text: 'I/O', link: '/concepts/i-o' },
          { text: 'Logic Interfaces', link: '/concepts/logic-interfaces' },
          { text: 'Dependency Injection', link: '/concepts/dependency-injection' },
          { text: 'Terminology', link: '/concepts/terminology' },
        ]
      },
      {
        text: 'Guides',
        link: '/guides/',
        items: [
          { text: 'Create a library', link: '/guides/create-a-library' },
          { text: 'Create a logic block', link: '/guides/create-a-logic-block' },
          { text: 'Create a logic interface', link: '/guides/create-a-logic-interface' },
          { text: 'Create a unit test', link: '/guides/create-a-unit-test' },
          { text: 'Run locally', link: '/guides/run-locally' },
          { text: 'Run on Device', link: '/guides/run-on-device' },
          { text: 'Continuous Integration', link: '/guides/continuous-integration' },
        ]
      },
      {
        text: 'Best Practices',
        link: '/best-practices/',
      },
      {
        text: 'API Reference',
        link: '/api/',
        items: [
          {
            text: 'Dale SDK',
            link: '/api/dale/index',
            collapsed: true,
            items: [
              { text: 'SDK', link: '/api/dale/sdk' },
              { text: 'SDK TestKit', link: '/api/dale/testkit' },
            ]
          },
          {
            text: 'Cloud API',
            // link: '/api/cloud/index'
            collapsed: true,
            items: [
              {
                text: 'Introduction',
                link: '/api/cloud/introduction',
              },
              ...openApiSidebar.generateSidebarGroups(),
            ],
          },
        ]
      },
    ],
    // Table of contents in the right sidebar (aside)
    outline: {
      level: [2, 3], // Show h2 and h3 headings
      label: 'On this page'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vion-iot' }
    ],
  },
  ignoreDeadLinks: true, // Ignore dead links inside dale xml docs
})
