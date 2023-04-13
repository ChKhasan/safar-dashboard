export default {
  methods: {
    notificationError(title, message) {
      this.$notify.error({
        title: title,
        message: message,
      });
    },
    statusFunc(res) {
      switch (res.status) {
        case 422:
          this.notificationError("Error", "Указанные данные недействительны.");
          break;
        case 500:
          this.notificationError("Error", "Cервер не работает");
          break;
        case 404:
          this.notificationError("Error", "Нет результатов запроса для модели");
          break;
      }
    },
    notification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
      });
    },
  },
};
