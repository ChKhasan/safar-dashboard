export const actions = {
  async getTariff({}, payload) {
    try {
      const res = await this.$axios.$get(`/tariffs`, { params: payload });
      return res;
    } catch (e) {
      return e;
    }
  },
  async getAllTariff() {
    const res = await this.$axios.$get(`/tariffs/all`);
    return res;
  },
  async getTariffById({}, id) {
    try {
      const res = await this.$axios.$get(`/tariffs/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async postTariff({}, data) {
    const res = await this.$axios.$post(`/tariffs`, data);
    return res;
  },
  async editTariff({}, payload) {
    const res = await this.$axios.$put(`/tariffs/${payload.id}`, payload.data);
    return res;
  },
  async deleteTariff({}, id) {
    const res = await this.$axios.$delete(`/tariffs/${id}`);
    return res;
  },
};
