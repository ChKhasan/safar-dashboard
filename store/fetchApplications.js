export const actions = {
  async getApplications({}, payload) {
    const res = await this.$axios.$get(`/applications`, { params: payload });
    return res;
  },
  async deleteApplications({}, id) {
    const res = await this.$axios.$delete(`/applications/${id}`);
    return res;
  },
};
