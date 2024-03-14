<template>
  <div class="">
    <TitleBlock title="Партнеры" :breadbrumb="['Главный']" lastLink="Партнеры">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          v-if="checkAccess('faqs', 'post')"
          @click="addFaqs"
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
              @changeSearch="($event) => changeSearch($event, '/partners', '__GET_FAQS')"
            />
            <div></div>
            <a-button
              @click="clearQuery('/partners', '__GET_FAQS')"
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
          :data-source="faqs"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span slot="sm_img" slot-scope="text">
            <img v-if="text != null" class="table-image" :src="text" />
            <img
              v-else
              class="table-image"
              src="../assets/images/photo_2023-03-04_13-28-58.jpg"
            />
          </span>
          <span slot="link" slot-scope="text">{{ text ? text : "-----" }}</span>

          <span slot="id" slot-scope="text">
            <!-- <span class="action-btn" v-html="eyeIcon"> </span> -->
            <span
              class="action-btn"
              v-if="checkAccess('faqs', 'put')"
              v-html="editIcon"
              @click="editAction(text)"
            >
            </span>
            <a-popconfirm
              title="Are you sure delete this row?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteAction(text)"
              v-if="checkAccess('faqs', 'delete')"
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
            @change="($event) => changePageSizeGlobal($event, '/partners', '__GET_FAQS')"
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
        <div class="d-flex flex-column">
          <a-form-model
            :model="form"
            ref="ruleFormPartners"
            :rules="rules"
            layout="vertical"
          >
            <a-form-model-item class="form-item mb-3" label="Link" prop="link">
              <a-input v-model="form.link" placeholder="link" />
            </a-form-model-item>
            <div class="clearfix">
              <a-upload
                action="https://api.safarpark.uz/api/files/upload"
                list-type="picture-card"
                :file-list="fileList"
                :headers="headers"
                :multiple="true"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Загрузить</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
          </a-form-model>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOk"
          >
            Отмена
          </div>
          <a-button
            :loading="loadingBtn"
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
import SearchInput from "../components/form/Search-input.vue";
import TitleBlock from "../components/Title-block.vue";
import status from "../mixins/status";
import global from "../mixins/global";
import authAccess from "../mixins/authAccess";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
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
    dataIndex: "sm_img",
    key: "sm_img",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "sm_img" },
    className: "column-service",
    width: "55px",
    colSpan: 0,
  },
  {
    title: "Партнеры",
    dataIndex: "link",
    key: "link",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "link" },
    className: "column-name",
    align: "left",
    colSpan: 2,
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
    title: "Партнеры",
  },
  data() {
    return {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      loadingBtn: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
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
        {
          label: "English",
          index: "en",
        },
      ],
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      faqs: [],
      categories: [],
      rules: {
        link: [{ required: true, message: "This field is required", trigger: "change" }],
      },
      form: {
        img: "",
        link: "",
      },
    };
  },
  async mounted() {
    this.getFirstData("/partners", "__GET_FAQS");
    this.checkAllActions("faqs");
  },
  methods: {
    saveData() {
      const data = {
        ...this.form,
      };

      this.$refs["ruleFormPartners"].validate((valid) => {
        if (valid) {
          if (!data.img) {
            this.notification("error", "error", "Img is required");
          } else {
            if (this.editId) {
              this.__EDIT_FAQS(data);
            } else {
              this.__POST_FAQS(data);
            }
          }
        } else {
          return false;
        }
      });
    },
    editAction(id) {
      this.title = "Изменить";
      this.editId = id;
      this.__GET_FAQS_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchPartners/deletePartners",
        "Успешно удален",
        "__GET_FAQS"
      );
    },
    async __GET_FAQS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchPartners/getPartners", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.partners?.current_page,
        data?.partners?.per_page
      );
      this.faqs = data?.partners?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.partners?.total;
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
    async __POST_FAQS(data) {
      try {
        await this.$store.dispatch("fetchPartners/postPartners", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_FAQS();
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_FAQS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch("fetchPartners/getPartnersById", id);
        this.visible = true;
        this.form = data?.partner;
        this.fileList = [];
        this.fileList.push({
          uid: `-1`,
          name: "image.png",
          status: "done",
          oldImg: true,
          url: data?.partner?.sm_img,
          response: {
            path: data?.partner?.img,
          },
        });
        console.log(this.fileList);
      } catch (e) {
        this.statusFunc(e);
      }
    },
    emptyData() {
      this.form = {
        link: "",
        img: "",
      };
    },
    async __EDIT_FAQS(res) {
      try {
        await this.$store.dispatch("fetchPartners/editPartners", {
          id: this.editId,
          data: res,
        });
        this.handleOk();
        this.__GET_FAQS();
        this.notification("success", "success", "Успешно изменена");
        this.$router.push("/partners");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.loadingBtn = true;
      this.fileList = fileList;
      if (fileList[0]?.response?.path) {
        this.form.img = fileList[0]?.response?.path;
        this.loadingBtn = false;
      } else if (fileList.length == 0 || this.form.img > fileList.length) {
        this.form.img = fileList[0]?.response?.path;
        this.loadingBtn = false;
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/partners", "__GET_FAQS");
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
