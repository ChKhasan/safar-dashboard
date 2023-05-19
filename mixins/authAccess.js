export default {
  methods: {
    checkAccess(name, action) {
      if (this.$store.state?.permissions.length > 0) {
        console.log(
          this.$store.state?.permissions?.find((item) => item.url == name)
        );
        return this.$store.state?.permissions
          ?.find((item) => item.url == name)
          ?.pivot?.actions.includes(action);
      }
    },
    checkAllActions(name) {
      if (this.$store.state?.permissions.length > 0) {
        if (
          !this.$store.state?.permissions
            ?.find((item) => item.url == name)
            ?.pivot?.actions.includes("put") &&
          !this.$store.state?.permissions
            ?.find((item) => item.url == name)
            ?.pivot?.actions.includes("delete")
        ) {
          this.columns = this.columns.filter((item) => item.dataIndex !== "id");
        }
      }
    },
  },
};
