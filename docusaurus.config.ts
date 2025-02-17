import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RevyOS Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.revyos.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'revyos', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/revyos/docs/tree/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'RevyOS Docs',
      logo: {
        alt: 'RevyOS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'documentSidebar',
          position: 'left',
          label: "文档",
        },
        {
          href: '/docs/issue',
          label: '提交问题与已知问题',
          position: 'left',
        },
        {
          href: 'https://github.com/revyos',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '镜像刷写',
          items: [
            {
              label: '镜像刷写需知',
              to: '/docs/Installation/intro',
            },
            {
              label: 'Lichee Pi 4A',
              to: '/docs/Installation/licheepi4a',
            },
            {
              label: 'Milk-V Pioneer',
              to: '/docs/Installation/milkv-pioneer',
            }
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/revyos/revyos',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/+Pi6px22-OsUxM2M1',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RevyOS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        language: ["en", "zh"],

        indexBlog: false,
      }),
    ],
  ],
};

export default config;
