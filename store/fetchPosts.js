export const actions = {
  async getPosts({}, payload) {
    try {
      const res = await this.$axios.$get(`/posts`, { params: payload });
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async getAllPosts() {
    const res = await this.$axios.$get(`/posts/all`);
    return res;
  },
  async getPostsById({}, id) {
    try {
      const res = await this.$axios.$get(`/posts/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },

  async postPosts({}, data) {
    const res = await this.$axios.$post(`/posts`, data);
    return res;
  },
  async editPosts({}, payload) {
    const res = await this.$axios.$put(`/posts/${payload.id}`, payload.data);
    return res;
  },
  async deletePosts({}, id) {
    const res = await this.$axios.$delete(`/posts/${id}`);
    return res;
  },
};
