export const state = () => ({
  authenticated: false,
  services: [],
  orders: {
    new: "",
    in_process: "",
    accepted: "",
    canceled: "",
    all: "",
    is_edited: "",
  },
  permissions: [],
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
  permissions(state, payload) {
    if (payload) {
      state.permissions = payload.map((item) => {
        return {
          ...item,
          pivot: {
            ...item.pivot,
            actions: JSON.parse(item.pivot.actions),
          },
        };
      });
    }
  },
  findPermissions(state, payload) {
    const target = state.permissions.find((item) => item.url == "services");
    return target.pivot.actions.includes("get");
  },
};
export const actions = {
  async getOrders({ commit }, payload) {
    const res = await this.$axios.$get(`/orders/counts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    commit("orders", res?.counts);
  },
  async getPermissions({ commit }, payload) {
    const res = await this.$axios.$post(`/auth/me`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    commit("permissions", res?.me?.role?.permissions);
  },
};
