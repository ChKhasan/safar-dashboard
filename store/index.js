export const state = () => ({
  authenticated: true,
});
export const mutations = {
  logIn(state) {
    state.authenticated = true;
  },
  logOut(state) {
    state.authenticated = false;
  },
};
