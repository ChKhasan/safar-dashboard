export const actions = {
  async getTariff({}, payload) {
    try {
      const res = await this.$axios.$get(`/tariffs`, {
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
  async getAllTariff() {
    const res = await this.$axios.$get(`/tariffs/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getTariffById({}, id) {
    try {
      const res = await this.$axios.$get(`/tariffs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      return res;
    } catch (e) {
      return e;
    }
  },
  async postTariff({}, data) {
    const res = await this.$axios.$post(`/tariffs`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editTariff({}, payload) {
    const res = await this.$axios.$put(`/tariffs/${payload.id}`, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async editTicket({}, payload) {
    const res = await this.$axios.$put(`/tickets`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async deleteTariff({}, id) {
    const res = await this.$axios.$delete(`/tariffs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getEmptyDate({}, data) {
    const res = await this.$axios.$get(`/tickets/empty_date`, {
      params: {
        ...data,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
  async getTariffSessions({}, data) {
    const res = await this.$axios.$get(`/tickets/get_sessions`, {
      params: {
        ...data,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return res;
  },
};
