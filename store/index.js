export const state = () => ({
  authenticated: true,
  services: [],
  orders: {
    new: "",
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
    state.orders.new = payload;
  },
};
export const actions = {
  async getOrders({ commit }, payload) {
    const res = await this.$axios.$get(`/orders`, { params: payload });
    const aa = res?.orders?.data.filter((item) => item.status == "new").length;
    commit("orders", aa);
  },
};
