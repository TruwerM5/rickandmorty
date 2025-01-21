// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
  css: ["~/assets/styles/style.css"],
  app: {
    head: {
      title: "Rick and Morty",
    },
  },
  routeRules: {
    "/": { redirect: "/characters" },
  },
});
