export const actions = {
  async getGalleries({}, payload) {
    try {
      const res = await this.$axios.$get(`/galleries`, { params: payload });
      return res;
    } catch (e) {
      return e;
    }
  },
  async getAllGalleries() {
    const res = await this.$axios.$get(`/galleries/all`);
    return res;
  },
  async getGalleriesById({}, id) {
    try {
      const res = await this.$axios.$get(`/galleries/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async postGalleries({}, data) {
    const res = await this.$axios.$post(`/galleries`, data);
    return res;
  },
  async editGalleries({}, payload) {
    const res = await this.$axios.$put(
      `/galleries/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteGalleries({}, id) {
    const res = await this.$axios.$delete(`/galleries/${id}`);
    return res;
  },
};
