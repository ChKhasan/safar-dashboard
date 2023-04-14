export const actions = {
  async getServices({}, payload) {
    try {
      const res = await this.$axios.$get(`/services`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getAllServices() {
    const res = await this.$axios.$get(`/services/all`);
    return res;
  },
  async getServicesById({}, id) {
    try {
      const res = await this.$axios.$get(`/services/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postServices({}, data) {
    const res = await this.$axios.$post(`/services`, data);
    return res;
  },
  async editServices({}, payload) {
    const res = await this.$axios.$put(`/services/${payload.id}`, payload.data);
    return res;
  },
  async deleteServices({}, id) {
    const res = await this.$axios.$delete(`/services/${id}`);
    return res;
  },
};
