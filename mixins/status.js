export default {
  methods: {
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.notification(
            "error",
            "Error",
            "Указанные данные недействительны."
          );
          break;
        case 500:
          this.notification("error", "Error", "Cервер не работает");
          break;
        case 404:
          this.notification(
            "error",
            "Error",
            "Нет результатов запроса для модели"
          );
          break;
      }
    },
    notification(type, message, desc) {
      this.$notification[type]({
        message: message,
        description: desc,
      });
    },
  },
};
