export const actions = {
  async getPromos({}, payload) {
    const res = await this.$axios.$get(`/promos`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getPromosById({}, id) {
    try {
      const res = await this.$axios.$get(`/promos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postPromos({}, data) {
    const res = await this.$axios.$post(`/promos`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editPromos({}, payload) {
    const res = await this.$axios.$put(`/promos/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deletePromos({}, id) {
    const res = await this.$axios.$delete(`/promos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
