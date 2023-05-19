export const actions = {
  async getServices({}, payload) {
    try {
      const res = await this.$axios.$get(`/services`, {
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
  async getAllServices() {
    const res = await this.$axios.$get(`/services/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getServicesById({}, id) {
    try {
      const res = await this.$axios.$get(`/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postServices({}, data) {
    const res = await this.$axios.$post(`/services`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editServices({}, payload) {
    const res = await this.$axios.$put(
      `/services/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    return res;
  },
  async deleteServices({}, id) {
    const res = await this.$axios.$delete(`/services/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
