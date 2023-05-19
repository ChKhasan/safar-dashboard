<template>
  <div class="">
    <TitleBlock title="Услуги " :breadbrumb="['Главный']" lastLink="Услуги">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/add_park_services')"
          v-if="checkAccess('services', 'post')"
        >
          <span class="svg-icon" v-html="addIcon"></span>
          Добавить
        </a-button>
      </div>
    </TitleBlock>
    <div class="container_xl app-container pb-5 pt-5">
      <div class="card_block main-table px-4 pb-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск" @changeSearch="changeSearch" />
            <div>{{ search }}</div>
            <a-button
              @click="clearQuery"
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
          <span slot="sm_banner" slot-scope="text">
            <img v-if="text != null" class="table-image" :src="text" />
            <img
              v-else
              class="table-image"
              src="../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span slot="create_at" slot-scope="text">{{
            moment(text?.created_at).format("DD/MM/YYYY")
          }}</span>
          <span
            slot="name"
            slot-scope="text"
            v-html="text?.ru ? text?.ru : '-----'"
          ></span>
          <span
            slot="guarantee"
            slot-scope="text"
            v-html="text?.ru ? text?.ru : '-----'"
          ></span>
          <span slot="package_options" slot-scope="text">
            <span
              class="option-items d-flex flex-column"
              v-for="desc in text"
              v-html="desc?.desc?.ru ? desc?.desc?.ru : '-----'"
            ></span>
          </span>
          <span slot="id" slot-scope="text">
            <span
              v-if="checkAccess('services', 'put')"
              class="action-btn"
              v-html="editIcon"
              @click="$router.push(`/edit_park_services/${text}`)"
            >
            </span>
            <span
              v-if="checkAccess('services', 'put')"
              class="action-btn"
              v-html="eyeIcon"
              @click="$router.push(`/show_park_services/${text}`)"
            >
            </span>
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
import global from "../mixins/global";
import authAccess from "../mixins/authAccess";
import moment from "moment";

const columns = [
  {
    title: "№",
    key: "indexId",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "indexId" },
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "ИМЯ",
    dataIndex: "sm_banner",
    key: "sm_banner",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "sm_banner" },
    className: "column-name",
    width: "60px",
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
    title: "Дата",
    className: "column-date",
    scopedSlots: { customRender: "create_at" },
  },
  // {
  //   title: "гарантия",
  //   dataIndex: "guarantee",
  //   key: "guarantee",
  //   className: "column-service",
  //   scopedSlots: { customRender: "guarantee" },
  // },
  // {
  //   title: "варианты пакетов",
  //   dataIndex: "package_options",
  //   key: "package_options",
  //   className: "column-subservice",
  //   scopedSlots: { customRender: "package_options" },
  // },
  {
    title: "ДЕЙСТВИЯ",
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
  // middleware: "auth",
  head: {
    title: "Услуги",
  },
  mixins: [status, global, authAccess],
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
    this.getFirstData("/services", "__GET_SERVICES");
    this.checkAllActions("services");
  },
  methods: {
    moment,
    async clearQuery(val) {
      this.value = "";
      const query = { ...this.$route.query, page: 1 };
      this.current = 1;
      delete query.search;
      if (this.$route.query?.search) {
        await this.$router.replace({
          path: "/",
          query: { ...query },
        });
        this.__GET_SERVICES();
      }
    },
    async changeSearch(val) {
      this.searchVal = val.target.value;
      if (val.target.value.length > 2) {
        if (this.$route.query?.search != val.target.value)
          await this.$router.replace({
            path: "/",
            query: { ...this.$route.query, search: val.target.value },
          });
        if (val.target.value == this.$route.query.search) this.__GET_SERVICES();
      } else if (val.target.value.length == 0) {
        this.clearQuery(val);
      }
    },
    async __GET_SERVICES() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchServices/getServices", {
        ...this.$route.query,
      });
      this.loading = false;
      this.services = data?.services.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
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
