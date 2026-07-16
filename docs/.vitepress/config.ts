import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import llmstxt from 'vitepress-plugin-llms'

export default withMermaid(
  defineConfig({
    title: 'VION Docs',
    description: 'Documentation for the VION Edge Operations Platform',
    lastUpdated: true,
    cleanUrls: true,

    // Shiki bundles neither PromQL nor LogQL; alias them to a similar query
    // language so the observability query examples highlight instead of
    // emitting a "language not loaded" build warning.
    markdown: {
      languageAlias: {
        promql: 'sql',
        logql: 'sql',
      },
    },

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
            { text: 'Dashboard', link: 'https://dashboard.vion.swiss/' },
            { text: 'Status', link: 'https://status.vion.swiss/' },
          ],
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Cloud API (Scalar)', link: 'https://api.vion.swiss/scalar', target: '_blank' },
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
              { text: 'Declarative Presentation', link: '/sdk/declarative-presentation' },
              { text: 'Instantiation Parameters & Inclusion Gates', link: '/sdk/instantiation-parameters' },
              { text: 'Hardware & External Services', link: '/sdk/services' },
              { text: 'Service Provider Protocol', link: '/sdk/service-provider-protocol' },
              { text: 'Service Provider SDK', link: '/sdk/service-provider-sdk' },
              { text: 'Telemetry', link: '/sdk/telemetry' },
              { text: 'Logic Interfaces', link: '/sdk/logic-interfaces' },
              { text: 'Persistence', link: '/sdk/persistence' },
              { text: 'Testing', link: '/sdk/testing' },
              { text: 'Scenarios', link: '/sdk/scenarios' },
              { text: 'Publishing & CI/CD', link: '/sdk/publishing' },
              { text: 'Library Visibility & Sharing', link: '/sdk/library-sharing' },
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
        {
          icon: { svg: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"/></svg>' },
          link: 'https://vion.swiss/',
          ariaLabel: 'VION Website',
        },
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

    mermaid: {
      theme: 'base',
      flowchart: {
        padding: 20,
        nodeSpacing: 30,
        rankSpacing: 40,
        useMaxWidth: false,
      },
      themeVariables: {
        // Node styling
        primaryColor: '#ecfbfa',
        primaryTextColor: '#192f33',
        primaryBorderColor: '#32656c',
        // Secondary (for contrast nodes)
        secondaryColor: '#32656c',
        secondaryTextColor: '#ffffff',
        secondaryBorderColor: '#2b474e',
        // Lines and arrows
        lineColor: '#5d7f85',
        // Text
        fontSize: '14px',
        // Edge labels
        edgeLabelBackground: 'transparent',
        // Subgraph
        clusterBkg: '#f6f7f5',
        clusterBorder: '#c8c9be',
        // Notes
        noteBkgColor: '#ecfbfa',
        noteTextColor: '#192f33',
        noteBorderColor: '#32656c',
      },
    },
  })
)
