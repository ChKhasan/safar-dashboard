export const state = () => ({
  authenticated: true,
  services: [],
  orders: {
    new: "",
    in_process: "",
    accepted: "",
    canceled: "",
    all: "",
    is_edited: "",
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
    state.orders.all =
      payload.edited +
      payload.in_process +
      payload.accepted +
      payload.canceled +
      payload.new;
    state.orders.new = payload.new;
    state.orders.in_process = payload.in_process;
    state.orders.accepted = payload.accepted;
    state.orders.canceled = payload.canceled;
    state.orders.is_edited = payload.edited;
  },
};
export const actions = {
  async getOrders({ commit }, payload) {
    const res = await this.$axios.$get(`/orders/counts`);
    console.log(res);
    // const order = res?.orders?.data.filter((item) => item.status == "new")
    //   ? res?.orders?.data.filter((item) => item.status == "new").length
    //   : 0;
    commit("orders", res?.counts);
  },
};
