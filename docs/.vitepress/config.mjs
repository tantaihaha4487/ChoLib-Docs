import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ChoLib Docs",
  description: "Shift-activation library for Fabric mods",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/reference' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Registration Methods', link: '/guide/usage' },
          { text: 'Events', link: '/guide/events' },
          { text: 'Configuration', link: '/guide/configuration' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Reference', link: '/api/reference' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/thanachot/ChoLib' }
    ]
  }
})