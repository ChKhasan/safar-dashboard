export const actions = {
  async getFaqs({}, payload) {
    const res = await this.$axios.$get(`/faqs`, { params: payload });
    return res;
  },
  async getFaqsById({}, id) {
    try {
      const res = await this.$axios.$get(`/faqs/${id}`);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  async postFaqs({}, data) {
    const res = await this.$axios.$post(`/faqs`, data);
    return res;
  },
  async editFaqs({}, payload) {
    const res = await this.$axios.$put(`/faqs/${payload.id}`, payload.data);
    return res;
  },
  async deleteFaqs({}, id) {
    const res = await this.$axios.$delete(`/faqs/${id}`);
    return res;
  },
};
