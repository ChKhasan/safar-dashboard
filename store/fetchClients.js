export const actions = {
  async getClients({}, payload) {
    try {
      const res = await this.$axios.$get(`/clients`, {
        params: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
};
