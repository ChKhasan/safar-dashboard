export const actions = {
  async getApplications({}, payload) {
    const res = await this.$axios.$get(`/applications`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deleteApplications({}, id) {
    const res = await this.$axios.$delete(`/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
