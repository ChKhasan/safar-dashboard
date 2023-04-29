<template lang="html">
  <div class="calendar-order-card">
    <div class="calendar-order-card-left">
      <h6>Юный Стрелок</h6>
      <div class="calendar-order-card-services">
        <span>Юный Стрелок </span><span>Взрослые</span>
        <p>2 x</p>
      </div>
      <div class="calendar-order-card-services">
        <span>Юный Стрелок </span><span>Взрослые</span>
        <p>2 x</p>
      </div>
    </div>
    <div class="calendar-order-card-center">
      <span
        >№ bileta
        <p>213214</p>
      </span>
      <h6>Ikromov Asadulla</h6>
      <!-- <h5>Ручной бронь</h5> -->
    </div>
    <div class="calendar-order-card-right">
      <div class="column-btns">
        <span>
          <span class="action-btn mx-3" v-html="eyeIcon"> </span>
          <span class="action-btn" v-html="editIcon"> </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
    };
  },
};
</script>
<style lang=""></style>
