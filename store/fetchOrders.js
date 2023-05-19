export const actions = {
  async getOrders({}, payload) {
    const res = await this.$axios.$get(`/orders`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getOrdersCount() {
    const res = await this.$axios.$get(`/orders/counts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getBookedOrders({}, payload) {
    const res = await this.$axios.$get(`/tariffs/number_of_books`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getCalendar({}, payload) {
    const res = await this.$axios.$get(`/calendar/${payload.id}`, {
      params: payload.query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getOrdersById({}, id) {
    try {
      const res = await this.$axios.$get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postOrders({}, data) {
    const res = await this.$axios.$post(`/orders`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editOrders({}, payload) {
    const res = await this.$axios.$put(`/orders/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deleteOrders({}, id) {
    const res = await this.$axios.$delete(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
