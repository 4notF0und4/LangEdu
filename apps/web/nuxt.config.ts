export default defineNuxtConfig({
  compatibilityDate: '2026-09-14',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001/api',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'az' },
      title: 'LangEdu — Python öyrən',
      meta: [
        { name: 'description', content: 'Python proqramlaşdırmasını addım-addım öyrən.' },
      ],
    },
  },
});
