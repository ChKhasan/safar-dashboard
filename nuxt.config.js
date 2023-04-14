export default {
  head: {
    title: "safar-adminka",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  ssr: false,
  css: ["ant-design-vue/dist/antd.css", "~/assets/css/main.css"],

  plugins: [
    { src: "~plugins/antdv.js", ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false },
  ],
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://api.safarpark.uz/api",
  },
  components: true,

  buildModules: ["@nuxtjs/svg"],

  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],

  build: {},
};
