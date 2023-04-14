<template lang="html">
  <div class="seans-card">
    <div class="seans-card-header d-flex justify-content-between">
      <div class="d-flex">
        <h5>Полёт в группе</h5>
        <span>(4-6 человек + пилот)</span>
      </div>
      <div class="column-btns">
        <span>
          <span
            class="action-btn"
            @click="$router.push(`/catalog/edit_products/${text}`)"
            v-html="editIcon"
          >
          </span>
          <a-popconfirm
            title="Are you sure delete this product?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deletePoduct(text)"
          >
            <span class="action-btn" v-html="deleteIcon"> </span>
          </a-popconfirm>
        </span>
      </div>
    </div>
    <div class="seans-card-body">
      <span>Minimum: 1, Maximum: 8</span>
      <!-- <p>Доступно мест: <span>12</span></p> -->
    </div>
    <!-- <div class="seans-card-footer d-flex justify-content-between">
      <span><span v-html="infoIcon"></span> Информация</span>
      <h6>1 500 000 сум</h6>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
    };
  },
};
</script>
