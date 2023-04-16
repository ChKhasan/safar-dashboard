export const state = () => ({
  authenticated: false,
});
export const mutations = {
  logIn(state) {
    state.authenticated = true;
  },
  logOut(state) {
    state.authenticated = false;
  },
};
