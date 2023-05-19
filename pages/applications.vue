<template>
  <div class="">
    <TitleBlock title="Заявки">
      <div class="d-flex"></div>
    </TitleBlock>
    <div class="container_xl app-container pb-5 pt-5">
      <div class="card_block main-table px-4 pb-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск" @changeSearch="changeSearch" />
            <div></div>
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
          :data-source="applications"
          :loading="loading"
        >
          <span slot="key" slot-scope="text">#{{ text.key }}</span>
          <span slot="name" slot-scope="text">
            {{ text ? text : "----" }}
          </span>
          <span slot="created_at" slot-scope="text">{{
            moment(text).format("DD/MM/YYYY")
          }}</span>
          <span slot="message" slot-scope="text">
            {{ text }}
          </span>
          <span slot="id" slot-scope="text">
            <a-popconfirm
              v-if="checkAccess('applications', 'delete')"
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
import authAccess from "../mixins/authAccess";

import moment from "moment";
const columns = [
  {
    title: "№",
    key: "key",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "key" },
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    align: "left",
  },
  {
    title: "Дата",
    dataIndex: "created_at",
    key: "created_at",
    slots: { title: "created_at" },
    scopedSlots: { customRender: "created_at" },
    className: "column-date",
  },
  {
    title: "НОМЕР ТЕЛЕФОНА",
    dataIndex: "phone_number",
    key: "phone_number",
    className: "column-service",
    scopedSlots: { customRender: "phone_number" },
  },
  {
    title: "Сообщение",
    dataIndex: "message",
    key: "message",
    className: "column-subservice",
    scopedSlots: { customRender: "message" },
  },

  {
    title: "Actions",
    className: "column-btns",
    dataIndex: "id",
    key: "id",
    align: "right",
    scopedSlots: { customRender: "id" },
    width: 100,
  },
];

export default {
  name: "IndexPage",
  head: {
    title: "Applications",
  },
  mixins: [status, authAccess],
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      applications: [],
    };
  },
  mounted() {
    this.__GET_APPLICATIONS();
    this.checkAllActions("applications");
  },
  methods: {
    moment,
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction(id) {
      this.__DELETE_APPLICATIONS(id);
    },
    async __GET_APPLICATIONS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchApplications/getApplications");
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.applications?.current_page,
        data?.applications?.per_page
      );
      this.applications = data?.applications?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.applications?.total;
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    async __DELETE_APPLICATIONS(id) {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchApplications/deleteApplications", id);
        this.loading = false;
        this.notification("success", "success", "Успешно удален");
        this.__GET_APPLICATIONS();
      } catch (e) {
        this.statusFunc(e);
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
