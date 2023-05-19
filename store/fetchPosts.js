export const actions = {
  async getPosts({}, payload) {
    try {
      const res = await this.$axios.$get(`/posts`, {
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
  async getAllPosts() {
    const res = await this.$axios.$get(`/posts/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getPostsById({}, id) {
    try {
      const res = await this.$axios.$get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },

  async postPosts({}, data) {
    const res = await this.$axios.$post(`/posts`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editPosts({}, payload) {
    const res = await this.$axios.$put(`/posts/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deletePosts({}, id) {
    const res = await this.$axios.$delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
