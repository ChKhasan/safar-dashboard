export default {
  head: {
    title: "Safar Admin Panel",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/safar-favicon.png" }],
  },
  ssr: false,
  css: ["ant-design-vue/dist/antd.css", "~/assets/css/main.css"],

  plugins: [
    { src: "~plugins/antdv.js", ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false },
    { src: "~plugins/v-mask.js", ssr: false },
  ],
  loadingIndicator: {
    name: "chasing-dots",
    color: "#1890ff",
    background: "white",
  },
  axios: {
    credentials: false,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
    baseURL: "https://api.safarpark.uz/api",
  },
  components: true,

  buildModules: ["@nuxtjs/svg"],

  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios", "nuxt-precompress"],
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ["br", "gzip"],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,

      filename: "[path].gz[query]",
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: "[path].br[query]",
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
  build: {},
};
