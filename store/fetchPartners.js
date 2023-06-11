export const actions = {
  async getPartners({}, payload) {
    try {
      const res = await this.$axios.$get(`/partners`, {
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
  async getAllPartners() {
    const res = await this.$axios.$get(`/partners/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getPartnersById({}, id) {
    try {
      const res = await this.$axios.$get(`/partners/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },

  async postPartners({}, data) {
    const res = await this.$axios.$post(`/partners`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editPartners({}, payload) {
    const res = await this.$axios.$put(
      `/partners/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    return res;
  },
  async deletePartners({}, id) {
    const res = await this.$axios.$delete(`/partners/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
