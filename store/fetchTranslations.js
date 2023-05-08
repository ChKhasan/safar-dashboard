export const actions = {
  async getTranslations({}, payload) {
    try {
      const res = await this.$axios.$get(`/translates`, { params: payload });
      return res;
    } catch (e) {
      return e;
    }
  },
  async getTranslateGruop({}, payload) {
    try {
      const res = await this.$axios.$get(`/translate_groups`, { params: payload });
      return res;
    } catch (e) {
      return e;
    }
  },
  async getAllTranslations() {
    const res = await this.$axios.$get(`/translates/all`);
    return res;
  },
  async getTranslationsById({}, id) {
    try {
      const res = await this.$axios.$get(`/translates/${id}`);
      return res;
    } catch (e) {
      return e;
    }
  },

  async postTranslations({}, data) {
    const res = await this.$axios.$post(`/translates`, data);
    return res;
  },
  async postUpdateTranslations({}, data) {
    const res = await this.$axios.$put(`/translates/multiple_update`, data);
    return res;
  },
  async postTranslateGroup({}, data) {
    const res = await this.$axios.$post(`/translate_groups`, data);
    return res;
  },
  async editTranslations({}, payload) {
    const res = await this.$axios.$put(
      `/translates/${payload.id}`,
      payload.data
    );
    return res;
  },
  async deleteTranslations({}, id) {
    const res = await this.$axios.$delete(`/translates/${id}`);
    return res;
  },
};
