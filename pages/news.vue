<template>
  <div class="">
    <TitleBlock title="Xizmatlar">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="$router.push('/add_news')"
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
          :data-source="posts"
          :loading="loading"
        >
          <span slot="sm_poster" slot-scope="text">
            <img v-if="text != null" class="table-image" :src="text" />
            <img
              v-else
              class="table-image"
              src="../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="name" slot-scope="text">{{ text?.ru }}</span>
          <span slot="subtitle" slot-scope="text">{{ text?.ru }}</span>
          <span slot="desc" slot-scope="text">
            <span v-html="text.ru"></span>
          </span>
          <span slot="id" slot-scope="text">
            <!-- <span class="action-btn" v-html="eyeIcon"> </span> -->
            <span
              class="action-btn"
              v-html="editIcon"
              @click="$router.push(`/edit_news/${text}`)"
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
    title: "заголовок",
    dataIndex: "sm_poster",
    key: "sm_poster",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "sm_poster" },
    className: "column-name",
    align: "left",
    width: 60,
    colSpan: 2,
  },
  {
    dataIndex: "title",
    key: "title",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    colSpan: 0,
  },
  {
    title: "подзаголовок",
    dataIndex: "subtitle",
    key: "subtitle",
    className: "column-service",
    scopedSlots: { customRender: "subtitle" },
  },
  {
    title: "описание",
    dataIndex: "desc",
    key: "desc",
    className: "column-subservice",
    scopedSlots: { customRender: "desc" },
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
  mixins: [status],
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      loading: false,
      search: "",
      columns,
      posts: [],
    };
  },
  mounted() {
    this.__GET_POSTS();
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction(id) {
      this.__DELETE_POSTS(id);
    },
    async __GET_POSTS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchPosts/getPosts");
      this.loading = false;
      this.posts = data?.posts?.data;
    },
    async __DELETE_POSTS(id) {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchPosts/deletePosts", id);
        this.loading = false;
        this.notification("success", "success", "Услуга был успешно удален");
        this.__GET_POSTS();
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
