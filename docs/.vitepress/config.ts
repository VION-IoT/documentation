import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import llmstxt from 'vitepress-plugin-llms'

export default withMermaid(
  defineConfig({
    title: 'VION Docs',
    description: 'Documentation for the VION Edge Operations Platform',
    lastUpdated: true,
    cleanUrls: true,

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vion-logo.svg' }],
    ],

    vite: {
      plugins: [llmstxt()],
      optimizeDeps: {
        include: ['mermaid', 'dayjs'],
        needsInterop: ['dayjs'],
      },
      ssr: {
        noExternal: ['vitepress-plugin-mermaid', 'mermaid'],
      },
    },

    themeConfig: {
      logo: '/vion-logo.svg',
      siteTitle: 'Docs',

      nav: [
        { text: 'Introduction', link: '/introduction/what-is-vion' },
        { text: 'SDK', link: '/sdk/installation' },
        { text: 'Edge Gateway', link: '/edge-gateway/supported-devices' },
        {
          text: 'More',
          items: [
            { text: 'Cloud API', link: '/cloud-api/authentication' },
            { text: 'Observability', link: '/observability/overview' },
            { text: 'AI-Assisted Development', link: '/agentic/' },
          ],
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Cloud API (Scalar)', link: 'https://cloudapi.test.ecocoa.ch/scalar/v1', target: '_blank' },
            { text: 'SDK API Reference', link: '/api-reference/' },
          ],
        },
      ],

      sidebar: {
        '/introduction/': [
          {
            text: 'Introduction',
            items: [
              { text: 'What is VION?', link: '/introduction/what-is-vion' },
              { text: 'Key Concepts', link: '/introduction/key-concepts' },
              { text: 'Quick Start', link: '/introduction/quick-start' },
            ],
          },
        ],
        '/sdk/': [
          {
            text: 'SDK Development',
            items: [
              { text: 'Installation & CLI', link: '/sdk/installation' },
              { text: 'Logic Blocks', link: '/sdk/logic-blocks' },
              { text: 'Properties & Measuring Points', link: '/sdk/properties' },
              { text: 'Service Provider Contracts', link: '/sdk/services' },
              { text: 'Service Provider Protocol', link: '/sdk/service-provider-protocol' },
              { text: 'Logic Interfaces', link: '/sdk/logic-interfaces' },
              { text: 'Persistence', link: '/sdk/persistence' },
              { text: 'Testing', link: '/sdk/testing' },
              { text: 'Publishing & CI/CD', link: '/sdk/publishing' },
            ],
          },
        ],
        '/agentic/': [
          {
            text: 'AI-Assisted Development',
            items: [
              { text: 'Overview', link: '/agentic/' },
              { text: 'Getting Started', link: '/agentic/getting-started' },
              { text: 'Recipes', link: '/agentic/recipes' },
            ],
          },
        ],
        '/edge-gateway/': [
          {
            text: 'Edge Gateway',
            items: [
              { text: 'Supported Devices', link: '/edge-gateway/supported-devices' },
              { text: 'Onboarding', link: '/edge-gateway/onboarding' },
              { text: 'Dashboard Setup', link: '/edge-gateway/dashboard-setup' },
              { text: 'Troubleshooting', link: '/edge-gateway/troubleshooting' },
            ],
          },
        ],
        '/observability/': [
          {
            text: 'Observability',
            items: [
              { text: 'Overview', link: '/observability/overview' },
              { text: 'Accessing Grafana', link: '/observability/access' },
              { text: 'Dashboards & Metrics', link: '/observability/dashboards' },
              { text: 'Limitations', link: '/observability/limitations' },
            ],
          },
        ],
        '/cloud-api/': [
          {
            text: 'Cloud API',
            items: [
              { text: 'Authentication', link: '/cloud-api/authentication' },
              { text: 'Integration Examples', link: '/cloud-api/examples' },
              { text: 'API Reference', link: '/cloud-api/reference' },
            ],
          },
        ],
        '/api-reference/': [
          {
            text: 'SDK API Reference',
            items: [
              { text: 'Overview', link: '/api-reference/' },
            ],
          },
        ],
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/vion-iot' },
      ],

      search: {
        provider: 'local',
      },

      outline: {
        level: [2, 3],
      },

      editLink: {
        pattern: 'https://github.com/vion-iot/documentation/edit/main/docs/:path',
        text: 'Edit this page on GitHub',
      },
    },

    mermaid: {},
  })
)
