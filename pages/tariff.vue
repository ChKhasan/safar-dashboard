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
        <a-table
          :columns="columns"
          :pagination="false"
          :data-source="services"
          :scroll="{ x: 1500 }"
          :loading="loading"
        >
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="name" slot-scope="text">{{ text?.ru }}</span>
          <span slot="guarantee" slot-scope="text">{{ text?.ru }}</span>
          <span slot="package_options" slot-scope="text">
            <span class="option-items" v-for="desc in text">{{ desc?.desc?.ru }}</span>
          </span>
          <span slot="id" slot-scope="text">
            <!-- <span class="action-btn" v-html="eyeIcon"> </span> -->
            <span class="action-btn" v-html="editIcon"> </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text.id)"
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
import status from "../mixins/status";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    fixed: "left",
    width: 200,
  },
  {
    title: "xizmatlarimiz",
    dataIndex: "guarantee",
    key: "guarantee",
    className: "column-service",
    scopedSlots: { customRender: "guarantee" },
  },
  {
    title: "Qo'shimcha xizmatlar",
    dataIndex: "package_options",
    key: "package_options",
    className: "column-subservice",
    scopedSlots: { customRender: "package_options" },
    width: 600,
  },
  {
    title: "Actions",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    className: "column-actions",
    align: "left",
  },
  {
    title: "Actions",
    className: "column-btns",
    key: "id",
    align: "right",
    scopedSlots: { customRender: "id" },
    fixed: "right",
    width: 100,
  },
];

export default {
  name: "IndexPage",
  mixins: [status],
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      loading: false,
      search: "",
      columns,
      services: [],
    };
  },
  mounted() {
    this.__GET_TARIFF();
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction(id) {
      this.__DELETE_TARIFF(id);
    },
    async __GET_TARIFF() {
      const data = await this.$store.dispatch("fetchTariff/getTariff");
      this.services = data?.services;
    },
    async __DELETE_TARIFF(id) {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchServices/deleteServices", id);
        this.loading = false;
        this.notification("success", "success", "Услуга был успешно удален");
        this.__GET_TARIFF();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  components: { TitleBlock, SearchInput },
};
</script>
<style lang="css">
@import "../assets/css/pages/tariff.css";
</style>
