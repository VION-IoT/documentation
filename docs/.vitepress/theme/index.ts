import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import { theme, useOpenapi } from 'vitepress-openapi/client';
import 'vitepress-openapi/dist/style.css';
import spec from '../../api/cloud/swagger.json' with { type: 'json' }

export default {
  ...DefaultTheme,
  async enhanceApp({ app, router, siteData }) {
    const openapi = useOpenapi({
      spec,
      config: {
        i18n: {
          locale: 'en',
          messages: {
            en: {
              'Parameters': 'Parameters',
              'Path Parameters': 'Path Parameters',
              'Query Parameters': 'Query Parameters',
              'Type': 'Type',
              'Required': 'Required',
              'Format': 'Format',
              'Responses': 'Responses',
              'Content-Type': 'Content-Type',
              'Schema': 'Schema',
              'Copy endpoint': 'Copy endpoint',
              'Playground': 'Playground',
              'Key': 'Key',
              'Value': 'Value',
              'Authorization': 'Authorization',
              'Authorizations': 'Authorizations',
              'Authorization URL': 'Authorization URL',
              'Token URL': 'Token URL',
              'Variables': 'Variables',
              'Try it out': 'Try it out',
              'Samples': 'Samples',
              'Powered by': 'Powered by',
              'or': 'or',
              'Request Body': 'Request Body',
              'Body': 'Body',
              'Valid values': 'Valid values',
              'Select': 'Select',
              'External Documentation': 'External Documentation',
              'Contact': 'Contact',
              'Download OpenAPI Document': 'Download OpenAPI Document',
              'Servers': 'Servers',
              'Collapse': 'Collapse',
            }
          }
        }
      },
    });

    theme.enhanceApp({ app, router, siteData });
  },
} satisfies Theme;