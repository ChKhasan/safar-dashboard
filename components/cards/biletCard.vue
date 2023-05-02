<template lang="html">
  <div class="bilet-card">
    <div class="bilet-card-header">
      <h5>Полет на воздушном шаре</h5>
      <div class="d-flex">
        <span class="bilet-card-header-text"
          >Номер билета:
          <p>{{ orderIn.id }}</p></span
        >
        <div class="column-btns">
          <span>
            <span v-if="isPaid" class="action-btn" v-html="ticketIcon"> </span>
            <span class="action-btn" v-html="editIcon"> </span>
          </span>
        </div>
      </div>
    </div>
    <div class="bilet-card-body flex-column">
      <div class="d-flex" v-for="(dataIn, index) in orderIn.data" :key="index">
        <div class="bilet-card-services">
          <span>{{ dataIn.name }}</span>
        </div>
        <p>
          <span>{{ dataIn.count }} x </span>
          {{ dataIn.price }} сум
        </p>
      </div>
    </div>
    <div class="bilet-card-footer">
      <div class="d-flex align-items-center">
        <span>Заказ на:</span>
        <div>
          {{ moment(orderIn.created_at).format("DD.MM.YYYY") }}
          <span v-if="orderIn.session">{{ orderIn.session }}</span>
        </div>
      </div>
      <h6>{{ orderIn.amount }} сум</h6>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: ["orderIn", "isPaid"],
  data() {
    return {
      ticketIcon: require("../../assets/svg/ticket.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
    };
  },
  methods: {
    moment,
  },
};
</script>
<style lang=""></style>
