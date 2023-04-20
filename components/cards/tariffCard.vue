<template lang="html">
  <div class="seans-card">
    <div class="seans-card-header d-flex justify-content-between">
      <div class="d-flex">
        <h5>{{ tariff?.name?.ru }}</h5>
        <span>{{ tariff?.subtitle?.ru }}</span>
      </div>
      <div class="column-btns">
        <span>
          <span
            class="action-btn"
            @click="$router.push(`/edit_tariff/${tariff?.id}`)"
            v-html="editIcon"
          >
          </span>
          <a-popconfirm
            title="Are you sure delete this tariff?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deletePoduct(tariff?.id)"
          >
            <span class="action-btn" v-html="deleteIcon"> </span>
          </a-popconfirm>
        </span>
      </div>
    </div>
    <div class="seans-card-body">
      <span v-if="tariff.type !== 'tariff'"
        >Minimum: {{ tariff.min_clients }}, Maximum: {{ tariff.max_clients }}</span
      >
      <!-- <p>Доступно мест: <span>12</span></p> -->
    </div>
    <!-- <div class="seans-card-footer d-flex justify-content-between">
      <span><span v-html="infoIcon"></span> Информация</span>
      <h6>1 500 000 сум</h6>
    </div> -->
  </div>
</template>
<script>
import global from "../../mixins/global";
export default {
  props: {
    tariff: {
      type: Object,
    },
    reloadTariff: {
      type: Function,
    },
  },
  mixins: [global],
  data() {
    return {
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
    };
  },
  methods: {
    async deletePoduct(id) {
      await this.__DELETE_GLOBAL(
        id,
        "fetchTariff/deleteTariff",
        "Тариф был успешно удален"
      );
      if (this.reloadTariff) {
        this.reloadTariff();
      }
    },
  },
};
</script>
