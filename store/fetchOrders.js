export const actions = {
  async getOrders({}, payload) {
    const res = await this.$axios.$get(`/orders`, { params: payload });
    return res;
  },
  async getOrdersCount() {
    const res = await this.$axios.$get(`/orders/counts`);
    return res;
  },
  async getBookedOrders({}, payload) {
    const res = await this.$axios.$get(`/tariffs/number_of_books`, { params: payload });
    return res;
  },
  async getCalendar({}, payload) {
    const res = await this.$axios.$get(`/calendar/${payload.id}`, {
      params: payload.query,
    });
    return res;
  },
  async getOrdersById({}, id) {
    try {
      const res = await this.$axios.$get(`/orders/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async postOrders({}, data) {
    const res = await this.$axios.$post(`/orders`, data);
    return res;
  },
  async editOrders({}, payload) {
    const res = await this.$axios.$put(`/orders/${payload.id}`, payload.data);
    return res;
  },
  async deleteOrders({}, id) {
    const res = await this.$axios.$delete(`/orders/${id}`);
    return res;
  },
};
