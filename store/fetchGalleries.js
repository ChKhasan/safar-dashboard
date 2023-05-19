export const actions = {
  async getGalleries({}, payload) {
    try {
      const res = await this.$axios.$get(`/galleries`, {
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
  async getAllGalleries() {
    const res = await this.$axios.$get(`/galleries/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getGalleriesById({}, id) {
    try {
      const res = await this.$axios.$get(`/galleries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postGalleries({}, data) {
    const res = await this.$axios.$post(`/galleries`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editGalleries({}, payload) {
    const res = await this.$axios.$put(
      `/galleries/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    return res;
  },
  async deleteGalleries({}, id) {
    const res = await this.$axios.$delete(`/galleries/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
