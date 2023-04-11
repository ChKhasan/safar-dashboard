<template>
  <div class="">
    <TitleBlock title="Xizmatlar">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/add_park_services')"
        >
          <span class="svg-icon"> </span>
          Добавить
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl app-container">
      <div class="table_block main-table">
        <a-table :columns="columns" :pagination="false" :data-source="data">
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              @click="$router.push(`/catalog/edit_products/${text}`)"
              v-html="eyeIcon"
            >
            </span>
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
              @cancel="cancel"
            >
              <span class="action-btn" v-html="deleteIcon"> </span>
            </a-popconfirm>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBlock from "../components/Title-block.vue";
const columns = [
  {
    title: "Safar",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
  },
  {
    title: "xizmatlarimiz",
    dataIndex: "age",
    key: "age",
    className: "column-service",
  },
  {
    title: "Qo'shimcha xizmatlar",
    dataIndex: "address",
    key: "address",
    className: "column-subservice",
  },
  {
    title: "Actions",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    className: "column-actions",
    align: "left",
    colSpan: 2,
  },
  {
    className: "column-btns",
    key: "id",
    align: "right",
    scopedSlots: { customRender: "id" },
    colSpan: 0,
  },
];

const data = [
  {
    key: "1",
    name: "воздушном шаре",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "2",
    name: "Хиро Парк",
    age: 5,
    address: "mavjud emas",
    tags: "mavjud",
  },
  {
    key: "3",
    name: "ЗИП ЛАЙН",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "4",
    name: "зорбинг",
    age: 5,
    address: "mavjud",
    tags: "mavjud",
  },
];

export default {
  name: "IndexPage",
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      top: 10,
      bottom: 10,
      data,
      columns,
    };
  },
  components: { TitleBlock },
};
</script>
<style lang="css"></style>
