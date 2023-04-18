<template>
  <div class="">
    <TitleBlock title="F.A.Q">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="addFaqs"
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
          :data-source="faqs"
          :loading="loading"
        >
          <span slot="question" slot-scope="text">
            <span>{{ text?.ru }}</span>
          </span>
          <span slot="answer" slot-scope="text" v-html="text?.ru"></span>
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>

          <span slot="id" slot-scope="text">
            <!-- <span class="action-btn" v-html="eyeIcon"> </span> -->
            <span class="action-btn" v-html="editIcon" @click="editAction(text)"> </span>
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
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="($event) => changePageSizeGlobal($event, '/faqs', '__GET_FAQS')"
          >
            <a-select-option
              v-for="item in pageSizes"
              :key="item.value"
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
      :dialog-style="{ top: '5px' }"
      :title="title"
      :closable="false"
      width="720px"
      @ok="handleOk"
    >
      <div class="d-flex flex-column">
        <div class="form_tab mb-4 bottom_hr">
          <span
            v-for="(item, index) in formTabData"
            :key="index"
            @click="formTab = item.index"
            :class="{ 'avtive-formTab': formTab == item.index }"
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
            <a-form-model-item class="form-item mb-3" label="Вопрос" prop="question.ru">
              <a-input
                type="textarea"
                rows="5"
                v-model="form.question[item.index]"
                placeholder="Вопрос"
              />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Ответ" prop="answer.ru">
              <a-input
                type="textarea"
                rows="5"
                v-model="form.answer[item.index]"
                placeholder="Ответ"
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
            <span class="svg-icon" v-html="addIcon"></span>
            Save
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
    title: "вопрос",
    dataIndex: "question",
    key: "question",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "question" },
    className: "column-name",
    align: "left",
    width: "45%",
  },
  {
    title: "ответ",
    dataIndex: "answer",
    key: "answer",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "answer" },
    className: "column-service",
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
  mixins: [status, global],
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
      ],
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      faqs: [],
      rules: {
        question: {
          ru: [{ required: true, message: "This field is required", trigger: "change" }],
        },
        answer: {
          ru: [
            {
              required: true,
              message: "This field is required",
              trigger: "change",
            },
          ],
        },
      },
      form: {
        question: {
          ru: "",
          uz: "",
        },
        answer: {
          ru: "",
          uz: "",
        },
        service_id: null,
      },
    };
  },
  async mounted() {
    this.getFirstData("/faqs", "__GET_FAQS");
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    saveData() {
      this.$refs["ruleFormFaq"][0].validate((valid) => {
        if (valid) {
          if (this.editId) {
            this.__EDIT_FAQS(this.form);
          } else {
            this.__POST_FAQS(this.form);
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
        "fetchFaqs/deleteFaqs",
        "Услуга был успешно удален",
        "__GET_FAQS"
      );
    },
    async __GET_FAQS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchFaqs/getFaqs", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(data?.faqs?.current_page, data?.faqs?.per_page);
      this.faqs = data?.faqs?.data.map((item, index) => {
        return {
          ...item,
          key: index + 1 + pageIndex,
        };
      });
      this.totalPage = data?.faqs?.total;
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page;
    },
    addFaqs() {
      this.title = "Добавить";
      this.emptyData();
      this.fileList = [];
      this.editId = null;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_FAQS(data) {
      try {
        await this.$store.dispatch("fetchFaqs/postFaqs", data);
        this.notification("success", "success", "Услуга успешно добавлен");
        this.handleOk();
        this.emptyData();
        this.__GET_FAQS();
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    async __GET_FAQS_BY_ID(id) {
      try {
        // const data = await this.$store.dispatch("fetchFaqs/getFaqsById", id);
        const data = await this.$store.dispatch("fetchFaqs/getFaqs");
        this.visible = true;
        this.form = data?.faqs?.data.find((item) => item.id == id);
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
    emptyData() {
      this.form = {
        question: {
          ru: "",
          uz: "",
        },
        answer: {
          ru: "",
          uz: "",
        },
        service_id: null,
      };
    },
    async __EDIT_FAQS(res) {
      try {
        await this.$store.dispatch("fetchFaqs/editFaqs", {
          id: this.editId,
          data: res,
        });
        this.handleOk();
        this.__GET_FAQS();
        this.notification("success", "success", "Пост успешно изменена");
        this.$router.push("/faqs");
      } catch (e) {
        this.statusFunc(e.response);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/faqs", "__GET_FAQS");
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
