export const actions = {
  async getClients({}, payload) {
    try {
      const res = await this.$axios.$get(`/clients`, { params: payload });
      return res;
    } catch (e) {
      return e;
    }
  },
};
