<template>
  <div class="">
    <TitleBlock
      title="Youtube Videos"
      :breadbrumb="['Настройки сайта']"
      lastLink="Youtube Videos"
    >
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="addFaqs"
          v-if="checkAccess('youtube_videos', 'post')"
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
            <SearchInput
              placeholder="Поиск"
              @changeSearch="
                ($event) => changeSearch($event, '/settings/you-tube', '__GET_VIDEOS')
              "
            />
            <div></div>
            <a-button
              @click="clearQuery('/settings/you-tube', '__GET_VIDEOS')"
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
          :data-source="videos"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>

          <span slot="desc" slot-scope="text">
            <span v-html="text?.ru ? text?.ru : '-----'"></span>
          </span>
          <span slot="date" slot-scope="text">{{
            moment(text).format("DD/MM/YYYY")
          }}</span>
          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              v-html="editIcon"
              v-if="checkAccess('youtube_videos', 'put')"
              @click="editAction(text)"
            >
            </span>
            <a-popconfirm
              v-if="checkAccess('youtube_videos', 'delete')"
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
            >
              <span class="action-btn" v-html="deleteIcon"> </span>
            </a-popconfirm>
          </span>
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) =>
                changePageSizeGlobal($event, '/settings/you-tube', '__GET_VIDEOS')
            "
          >
            <a-select-option
              v-for="item in pageSizes"
              :key="item?.value"
              :label="item.label"
              :value="item.value"
              >{{ item.label }}
            </a-select-option>
          </a-select>
          <a-pagination
            class="table-pagination"
            :simple="false"
            v-model.number="current"
            :total="totalPage"
            :page-size.sync="params.pageSize"
          />
        </div>
      </div>
    </div>
    <a-modal
      v-model="visible"
      :dialog-style="{ top: '50px' }"
      :title="title"
      :closable="false"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="form_tab mb-4 bottom_hr">
          <span
            style="border-right: 0"
            v-for="(item, index) in formTabData"
            :key="index"
            @click="formTab = item.index"
            :class="{ 'avtive-formTabModal': formTab == item.index }"
          >
            {{ item.label }}
          </span>
        </div>
        <div
          class="d-flex flex-column"
          v-for="(item, index) in formTabData"
          :key="index"
          v-if="formTab == item.index"
        >
          <a-form-model :model="form" ref="ruleFormFaq" :rules="rules" layout="vertical">
            <a-form-model-item class="form-item mb-3" label="Ссылка" prop="link">
              <a-input v-model="form.link" placeholder="Ссылка..." />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Описание">
              <quill-editor
                v-model="form.desc[item.index]"
                class="product-editor mt-1"
                :options="editorOption"
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOk"
          >
            Cancel
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            type="primary"
            @click="saveData"
          >
          Сохранять
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
import status from "../../mixins/status";
import global from "../../mixins/global";
import authAccess from "../../mixins/authAccess";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
    title: "Описание",
    dataIndex: "desc",
    key: "desc",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "desc" },
    className: "column-name",
    width: "20%",
  },
  {
    title: "ДАТА",
    dataIndex: "created_at",
    key: "created_at",
    className: "column-date",
    scopedSlots: { customRender: "date" },
  },
  {
    title: "ДЕЙСТВИЯ",
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
  mixins: [status, global, authAccess],
  head: {
    title: "Youtube Videos",
  },
  data() {
    return {
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            [
              {
                size: [],
              },
            ],
            ["bold", "italic", "underline", "strike"],

            ["image"],
            ["code-block"],
          ],
        },
      },
      title: "Добавить",
      editId: null,
      formTab: "ru",
      visible: false,
      formTabData: [
        {
          label: "Русский",
          index: "ru",
        },
        {
          label: "O'zbek",
          index: "uz",
        },
        // {
        //   label: "English",
        //   index: "en",
        // },
      ],
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      addIcon: require("../../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      videos: [],
      categories: [],
      rules: {
        link: [{ required: true, message: "This field is required", trigger: "change" }],
      },
      form: {
        link: "",
        desc: {
          ru: "",
          uz: "",
          en: "",
        },
      },
    };
  },
  async mounted() {
    this.getFirstData("/settings/you-tube", "__GET_VIDEOS");
    this.checkAllActions("youtube_videos");
  },
  methods: {
    moment,
    saveData() {
      const data = {
        ...this.form,
      };
      if (this.form.faq_category_id == "false") {
        data.faq_category_id = null;
      }
      this.$refs["ruleFormFaq"][0].validate((valid) => {
        if (valid) {
          if (this.editId) {
            this.__EDIT_VIDEOS(data);
          } else {
            this.__POST_VIDEOS(data);
          }
        } else {
          return false;
        }
      });
    },
    editAction(id) {
      this.title = "Изменить";
      this.editId = id;
      this.__GET_VIDOES_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchVideos/deleteVideos",
        "Успешно удален",
        "__GET_VIDEOS"
      );
    },
    async __GET_VIDEOS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchVideos/getVideos", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.videos?.current_page,
        data?.videos?.per_page
      );
      this.videos = data?.videos?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.videos?.total;
    },

    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    addFaqs() {
      this.title = "Добавить";

      this.fileList = [];
      this.editId = null;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_VIDEOS(data) {
      try {
        await this.$store.dispatch("fetchVideos/postVideos", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_VIDEOS();
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_VIDOES_BY_ID(id) {
      try {
        const data = await this.$store.dispatch("fetchVideos/getVideosById", id);
        this.visible = true;
        this.form = {
          desc: data?.video?.desc,
          link: data?.video?.link,
        };
      } catch (e) {
        this.statusFunc(e);
      }
    },
    emptyData() {
      this.form = {
        desc: {
          ru: "",
          uz: "",
          en: "",
        },
        link: "",
      };
    },
    async __EDIT_VIDEOS(res) {
      try {
        await this.$store.dispatch("fetchVideos/editVideos", {
          id: this.editId,
          data: res,
        });
        this.handleOk();
        this.__GET_VIDEOS();
        this.notification("success", "success", "Успешно изменена");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/settings/videos", "__GET_VIDEOS");
    },
    visible(val) {
      if (val == false) {
        this.emptyData();
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
