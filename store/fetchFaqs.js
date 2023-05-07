export const actions = {
  async getFaqs({}, payload) {
    const res = await this.$axios.$get(`/faqs`, { params: payload });
    return res;
  },
  async getFaqsCategories({}, payload) {
    const res = await this.$axios.$get(`/faq_categories`, { params: payload });
    return res;
  },
  async getFaqsCategoriesAll({}, payload) {
    const res = await this.$axios.$get(`/faq_categories/all`);
    return res;
  },
  async getFaqsById({}, id) {
    try {
      const res = await this.$axios.$get(`/faqs/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async getFaqsCategoriesById({}, id) {
    try {
      const res = await this.$axios.$get(`/faq_categories/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },
  async postFaqsCategories({}, data) {
    const res = await this.$axios.$post(`/faq_categories`, data);
    return res;
  },
  async postFaqs({}, data) {
    const res = await this.$axios.$post(`/faqs`, data);
    return res;
  },
  async editFaqsCategories({}, payload) {
    const res = await this.$axios.$put(
      `/faq_categories/${payload.id}`,
      payload.data
    );
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
  async deleteFaqsCategories({}, id) {
    const res = await this.$axios.$delete(`/faq_categories/${id}`);
    return res;
  },
};
