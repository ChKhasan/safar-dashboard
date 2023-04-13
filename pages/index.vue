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
    <div class="container_xl app-container mt-4">
      <div class="card_block main-table px-4 pb-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск продукта" @changeSearch="changeSearch" />
            <div>{{ search }}</div>
            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              ><a-icon type="reload"
            /></a-button>
          </div>
        </div>
        <a-table :columns="columns" :pagination="false" :data-source="data">
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

          <span slot="id" slot-scope="text">
            <span class="action-btn" v-html="eyeIcon"> </span>
            <span class="action-btn" v-html="editIcon"> </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
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
import SearchInput from "../components/form/Search-input.vue";
import TitleBlock from "../components/Title-block.vue";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
  },
  {
    title: "xizmatlarimiz",
    dataIndex: "guarantee",
    key: "guarantee",
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
    guarantee: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "2",
    name: "Хиро Парк",
    guarantee: 5,
    address: "mavjud emas",
    tags: "mavjud",
  },
  {
    key: "3",
    name: "ЗИП ЛАЙН",
    guarantee: 5,
    address: "mavjud",
    tags: "mavjud",
  },
  {
    key: "4",
    name: "зорбинг",
    guarantee: 5,
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
      search: "",
      data,
      columns,
    };
  },
  mounted() {
    this.__GET_SERVICES();
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction() {
      alert("good");
    },
    async __GET_SERVICES() {
      const data = await this.$store.dispatch("fetchServices/getServices");
      console.log(data);
    },
  },
  components: { TitleBlock, SearchInput },
};
</script>
<style lang="css">
.prodduct-list-header-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 40px;
  grid-gap: 8px;
}
.card_header {
  padding: 16.25px 0;
}
</style>
