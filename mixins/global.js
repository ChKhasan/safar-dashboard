export default {
  data() {
    return {
      page: 1,
      current: 1,
      pageSizes: [
        {
          value: 10,
          label: "10",
        },
        {
          value: 25,
          label: "25",
        },
        {
          value: 50,
          label: "50",
        },
        {
          value: 100,
          label: "100",
        },
      ],
      totalPage: 1,
      params: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    cancel(e) {
      this.$message.error("Click on No");
    },
    async changePageSizeGlobal(e, link, data) {
      this.current = 1;
      if (this.$route.query.per_page != e) {
        await this.$router.replace({
          path: link,
          query: {
            page: this.current,
            per_page: e,
          },
        });
        this[data]();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
