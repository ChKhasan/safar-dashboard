export const actions = {
  async getPromos({}, payload) {
    const res = await this.$axios.$get(`/promos`, { params: payload });
    return res;
  },
  async getPromosById({}, id) {
    try {
      const res = await this.$axios.$get(`/promos/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async postPromos({}, data) {
    const res = await this.$axios.$post(`/promos`, data);
    return res;
  },
  async editPromos({}, payload) {
    const res = await this.$axios.$put(`/promos/${payload.id}`, payload.data);
    return res;
  },
  async deletePromos({}, id) {
    const res = await this.$axios.$delete(`/promos/${id}`);
    return res;
  },
};
