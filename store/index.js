export const state = () => ({
  authenticated: true,
  services: [],
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
};
