export const state = () => ({
  authenticated: true,
  services: [],
  orders: {
    new: "",
    in_process: "",
    accepted: "",
    canceled: "",
    all: "",
  },
});
export const mutations = {
  logIn(state) {
    state.authenticated = true;
  },
  logOut(state) {
    state.authenticated = false;
  },
  services(state, payload) {
    state.services = payload;
  },
  orders(state, payload) {
    state.orders.all = payload.length ? payload.length : 0;
    state.orders.new =
      payload.filter((item) => item.status == "new").length > 0
        ? payload.filter((item) => item.status == "new").length
        : 0;
    state.orders.in_process =
      payload.filter((item) => item.status == "in_process").length > 0
        ? payload.filter((item) => item.status == "in_process").length
        : 0;
    state.orders.accepted = payload.filter((item) => item.status == "accepted")
      ? payload.filter((item) => item.status == "accepted").length
      : 0;
    state.orders.canceled = payload.filter((item) => item.status == "canceled")
      ? payload.filter((item) => item.status == "canceled").length
      : 0;
  },
};
export const actions = {
  async getOrders({ commit }, payload) {
    const res = await this.$axios.$get(`/orders`, { params: payload });
    const order = res?.orders?.data.filter((item) => item.status == "new")
      ? res?.orders?.data.filter((item) => item.status == "new").length
      : 0;
    commit("orders", res?.orders?.data);
  },
};
