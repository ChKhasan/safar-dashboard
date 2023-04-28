<template lang="html">
  <div class="bilet-card">
    <div class="bilet-card-header">
      <h5>Полет на воздушном шаре</h5>
      <div class="d-flex">
        <span class="bilet-card-header-text"
          >Номер билета:
          <p>156984</p></span
        >
        <div class="column-btns">
          <span>
            <span class="action-btn" v-html="ticketIcon"> </span>
            <span class="action-btn" v-html="editIcon"> </span>
          </span>
        </div>
      </div>
    </div>
    <div class="bilet-card-body">
      <div>Взрослый:</div>
      <p>
        <span>2 x </span>
        1 500 000 сум
      </p>
    </div>
    <div class="bilet-card-footer">
      <div class="d-flex align-items-center">
        <span>Заказ на:</span>
        <div>10.04.2023 18:00</div>
      </div>
      <h6>3 000 000 сум</h6>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ticketIcon: require("../../assets/svg/ticket.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
    };
  },
};
</script>
<style lang=""></style>
