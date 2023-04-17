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
    async changePagination(url, dataFunc) {
      if (this.$route.query.page != val) {
        await this.$router.replace({
          path: url,
          query: {
            page: val,
            per_page: this.params.pageSize,
          },
        });
        this[dataFunc]();
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    async getFirstData(url, dataFunc) {
      if (
        !Object.keys(this.$route.query).includes("page") ||
        !Object.keys(this.$route.query).includes("per_page")
      ) {
        await this.$router.replace({
          path: url,
          query: { page: this.params.page, per_page: this.params.pageSize },
        });
      }
      this[dataFunc]();
      this.current = Number(this.$route.query.page);
      this.params.pageSize = Number(this.$route.query.per_page);
    },
    async __DELETE_GLOBAL(id, link, message, data) {
      try {
        await this.$store.dispatch(link, id);
        this.notification("success", "success", message);
        this[data]();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
};
