export const actions = {
  async getVideos({}, payload) {
    const res = await this.$axios.$get(`/youtube_videos`, {
      params: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getVideosById({}, id) {
    try {
      const res = await this.$axios.$get(`/youtube_videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async getVideosById({}, id) {
    try {
      const res = await this.$axios.$get(`/youtube_videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postVideos({}, data) {
    const res = await this.$axios.$post(`/youtube_videos`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async postVideos({}, data) {
    const res = await this.$axios.$post(`/youtube_videos`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editVideos({}, payload) {
    const res = await this.$axios.$put(
      `/youtube_videos/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    return res;
  },
  async editVideos({}, payload) {
    const res = await this.$axios.$put(
      `/youtube_videos/${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    return res;
  },
  async deleteVideos({}, id) {
    const res = await this.$axios.$delete(`/youtube_videos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deleteVideos({}, id) {
    const res = await this.$axios.$delete(`/youtube_videos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
