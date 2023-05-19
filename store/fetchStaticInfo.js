export const actions = {
  async getStaticInfo({}, payload) {
    try {
      const res = await this.$axios.$get(`/site_infos`, {
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
  async postStaticInfo({}, data) {
    const res = await this.$axios.$post(`/site_infos`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
