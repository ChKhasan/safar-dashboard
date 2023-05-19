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
  async postMailing({}, data) {
    const res = await this.$axios.$post(`/mailing`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getClientsById({}, id) {
    try {
      const res = await this.$axios.$get(`/clients/${id}`, {
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
