<template>
  <div class="">
    <TitleBlock title="Переводы" :breadbrumb="['Настройки сайта']" lastLink="Переводы">
      <div class="d-flex">
        <div
          class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
          @click="$router.push(`/settings/translations-group/${$route.params.index}`)"
        >
          Отмена
        </div>
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="saveTranslations"
        >
          Сохранять
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
          :data-source="form"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text }}</span>
          <span slot="keyIndex" slot-scope="text">
            <div class="ant-input">
              <span>{{ groupKey }}.</span>
              <a-input v-model="text.keyIndex" placeholder="Atribut Name"></a-input>
            </div>
          </span>

          <span slot="valRu" slot-scope="text">
            <a-input v-model="text.val.ru" placeholder="Atribut Name"></a-input>
          </span>
          <span slot="valRu" slot-scope="text">
            <a-input v-model="text.val.ru" placeholder="Atribut Name"></a-input>
          </span>
          <span slot="valEn" slot-scope="text">
            <a-input v-model="text.val.en" placeholder="Atribut Name"></a-input>
          </span>
          <span slot="valUz" slot-scope="text">
            <a-input v-model="text.val.uz" placeholder="Atribut Name"></a-input>
          </span>

          <span slot="id" slot-scope="text">
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
        <div class="create-inner-variant" @click="addTranslate">
          <span v-html="plusIcon"> </span>
          Qo’shish
        </div>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) => changePageSizeGlobal($event, '/faqs', '__GET_TRANSLATIONS')
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
        <div class="d-flex flex-column">
          <a-form-model :model="form" ref="ruleFormFaq" :rules="rules" layout="vertical">
            <a-form-model-item class="form-item mb-3" label="Название" prop="sub_text">
              <a-input v-model="form.sub_text" placeholder="Название..." />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Субтекст" prop="title">
              <a-input v-model="form.title" placeholder="Субтекст..." />
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
            @click="postGroup"
          >
            <span class="svg-icon" v-html="addIcon"></span>
            Save
          </a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      v-model="visibleTranslate"
      :dialog-style="{ top: '50px' }"
      :title="title"
      :closable="false"
      width="720px"
      @ok="handleOkTranslate"
    >
      <div class="d-flex flex-column">
        <div class="d-flex flex-column">
          <a-form-model
            :model="formTranlate"
            ref="ruleFormFaq"
            :rules="rules"
            layout="vertical"
          >
            <a-form-model-item class="form-item mb-3" label="Название" prop="sub_text">
              <a-input v-model="form.sub_text" placeholder="Название..." />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Субтекст" prop="title">
              <a-input v-model="form.title" placeholder="Субтекст..." />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Название" prop="sub_text">
              <a-input v-model="form.sub_text" placeholder="Название..." />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Субтекст" prop="title">
              <a-input v-model="form.title" placeholder="Субтекст..." />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
      <template slot="footer">
        <div class="add_modal-footer d-flex justify-content-end">
          <div
            class="add-btn add-header-btn add-header-btn-padding btn-light-primary mx-3"
            @click="handleOkTranslate"
          >
            Cancel
          </div>
          <a-button
            class="add-btn add-header-btn btn-primary"
            type="primary"
            @click="postGroup"
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
import SearchInput from "../../../components/form/Search-input.vue";
import TitleBlock from "../../../components/Title-block.vue";
import status from "../../../mixins/status";
import global from "../../../mixins/global";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const columns = [
  {
    title: "№",
    key: "indexId",
    dataIndex: "indexId",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "indexId" },
    className: "column-service",
    align: "left",
    width: 50,
  },
  {
    title: "КЛЮЧ",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "keyIndex" },
    className: "column-name",
    width: "20%",
  },
  {
    title: "ЗНАЧЕНИЕ(RU)",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "valRu" },
    className: "column-name",
    align: "left",
    width: "30%",
  },
  {
    title: "ЗНАЧЕНИЕ(EN)",

    slots: { title: "customTitle" },
    scopedSlots: { customRender: "valEn" },
    className: "column-name",
  },
  {
    title: "ЗНАЧЕНИЕ(UZ)",

    slots: { title: "customTitle" },
    scopedSlots: { customRender: "valUz" },
    className: "column-name",
  },
  {
    title: "ДЕЙСТВИЯ",
    className: "column-btns",
    align: "right",
    scopedSlots: { customRender: "id" },
    width: 100,
  },
];

export default {
  name: "IndexPage",
  mixins: [status, global],
  head: {
    title: "F.A.Q",
  },
  data() {
    return {
      title: "Добавить группу",
      editId: null,
      groupKey: "",
      formTab: "ru",
      visible: false,
      visibleTranslate: false,
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
      eyeIcon: require("../../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../../assets/svg/delete.svg?raw"),
      addIcon: require("../../../assets/svg/add-icon.svg?raw"),
      plusIcon: require("../../../assets/svg/plus.svg?raw"),
      loading: false,
      search: "",
      columns,
      faqs: [],
      categories: [],
      rules: {
        sub_text: [
          { required: true, message: "This field is required", trigger: "change" },
        ],
        title: {
          ru: [{ required: true, message: "This field is required", trigger: "change" }],
        },
      },
      form: [],
      formTranlate: {
        translate_group_id: 1,
        translates: {
          id: 0,
          key: "",
          val: {
            ru: "",
            uz: "",
            en: "",
          },
        },
      },
    };
  },
  async mounted() {
    this.getFirstData(
      `/settings/translations-edit/${this.$route.params.index}`,
      "__GET_TRANSLATIONS"
    );
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    postGroup() {
      this.$refs["ruleFormFaq"].validate((valid) => {
        if (valid) {
          this.__POST_FAQS(this.form);
        } else {
          return false;
        }
      });
    },
    editAction(id) {
      this.visibleTranslate = true;
      this.title = "Изменить";
      this.editId = id;
      //   this.__GET_TRANSLATIONS_BY_ID(id);
    },
    deleteAction(obj) {
      if (obj.id == 0) {
        if (this.form.length > 1)
          this.form = this.form.filter((item) => item.indexId != obj.indexId);
      } else {
        this.__DELETE_GLOBAL(
          obj.id,
          "fetchTranslations/deleteTranslations",
          "Услуга был успешно удален",
          "__GET_TRANSLATIONS"
        );
      }
    },

    addTranslate() {
      this.form.push({
        keyIndex: "",
        indexId: this.form.length > 0 ? Math.max(...this.form.map((o) => o.key)) + 1 : 1,
        key: this.form.length > 0 ? Math.max(...this.form.map((o) => o.key)) + 1 : 1,
        val: {
          ru: "",
          uz: "",
          en: "",
        },
        id: 0,
      });
    },
    async __GET_TRANSLATIONS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchTranslations/getTranslateGruop", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.groups?.current_page,
        data?.groups?.per_page
      );
      const translate = data?.groups?.data.find(
        (item) => item.id == this.$route.params.index
      );

      this.groupKey = translate.sub_text;
      console.log(this.groupKey);
      this.form = translate.translates.map((item, index) => {
        return {
          indexId: index + pageIndex,
          keyIndex: item.key,
          key: index + pageIndex,
          val: item.val,
          id: item.id,
        };
      });
      this.totalPage = data?.groups?.total;
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
    handleOkTranslate() {
      this.visibleTranslate = false;
    },
    saveTranslations() {
      console.log(this.form);
      const data = {
        translate_group_id: this.$route.params.index,
        translates: this.form.map((item) => {
          return {
            id: item.id,
            key: item.keyIndex,
            val: item.val,
          };
        }),
      };
      this.__POST_FAQS(data);
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_FAQS(data) {
      try {
        await this.$store.dispatch("fetchTranslations/postUpdateTranslations", data);
        this.notification("success", "success", "Услуга успешно добавлен");
        this.$router.push(`/settings/translations-group/${this.$route.params.index}`);
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_TRANSLATIONS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch("fetchFaqs/getFaqsById", id);
        this.visible = true;
        this.form = data?.faq;
      } catch (e) {
        this.statusFunc(e);
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
        this.__GET_TRANSLATIONS();
        this.notification("success", "success", "Пост успешно изменена");
        this.$router.push("/faqs");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/faqs", "__GET_TRANSLATIONS");
    },
    // visible(val) {
    //   if (val == false) {
    //     this.emptyData();
    //   }
    // },
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
.ant-input input {
  border: 1px solid transparent !important;
  padding-left: 0;
  height: 30px;
}
.ant-input input:focus {
  box-shadow: none;
}
.ant-input {
  display: flex;
  align-items: center;
}
.ant-input span {
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: -2px;
}
</style>
