<template>
  <div class="">
    <TitleBlock title="Xizmatlar">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/add_park_services')"
        >
          <span class="svg-icon" v-html="addIcon"></span>
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
          :loading="loading"
        >
          <span slot="banner" slot-scope="text">
            <img v-if="text != null" class="table-image" :src="text[0]" />
            <img
              v-else
              class="table-image"
              src="../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <span slot="indexId" slot-scope="text">#{{ text?.id }}</span>
          <span slot="name" slot-scope="text" v-html="text?.ru"></span>
          <span slot="guarantee" slot-scope="text" v-html="text?.ru"></span>
          <span slot="package_options" slot-scope="text">
            <span
              class="option-items"
              v-for="desc in text"
              v-html="desc?.desc?.ru"
            ></span>
          </span>
          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              v-html="editIcon"
              @click="$router.push(`/edit_park_services/${text}`)"
            >
            </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
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
    title: "ID",
    key: "indexId",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "indexId" },
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "Name",
    dataIndex: "banner",
    key: "banner",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "banner" },
    className: "column-name",
    width: 60,
    align: "left",
    colSpan: 2,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    width: 200,
    colSpan: 0,
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
  },
  {
    title: "Actions",
    className: "column-btns",
    key: "id",
    dataIndex: "id",
    align: "right",
    scopedSlots: { customRender: "id" },
    width: 100,
  },
];

export default {
  name: "IndexPage",
  middleware: "auth",
  mixins: [status],
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      services: [],
    };
  },
  mounted() {
    this.__GET_SERVICES();
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction(id) {
      this.__DELETE_SERVICES(id);
    },
    async __GET_SERVICES() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchServices/getServices");
      this.loading = false;
      this.services = data?.services.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
    },
    async __DELETE_SERVICES(id) {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchServices/deleteServices", id);
        this.loading = false;
        this.notification("success", "success", "Услуга был успешно удален");
        this.__GET_SERVICES();
      } catch (e) {
        this.statusFunc(e.response);
      }
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
