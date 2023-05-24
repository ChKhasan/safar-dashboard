<template>
  <div class="">
    <TitleBlock title="Промо" :breadbrumb="['Главный']" lastLink="Промо">
      <div class="d-flex">
        <a-button
          class="add-btn add-header-btn btn-primary d-flex align-items-center"
          type="primary"
          @click="addPromos"
          v-if="checkAccess('promos', 'post')"
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
              @changeSearch="($event) => changeSearch($event, '/promos', '__GET_PROMOS')"
            />
            <div></div>
            <a-button
              @click="clearQuery('/promos', '__GET_PROMOS')"
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
          :data-source="promos"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.key }}</span>
          <span slot="date" slot-scope="text">{{
            text ? text.replace(/-/g, "/") : "----"
          }}</span>
          <span slot="service" slot-scope="text">{{
            text?.name?.ru ? text?.name?.ru : "-------"
          }}</span>

          <span slot="id" slot-scope="text">
            <!-- <span class="action-btn" v-html="eyeIcon"> </span> -->
            <span
              class="action-btn"
              v-if="checkAccess('promos', 'put')"
              v-html="editIcon"
              @click="editAction(text)"
            >
            </span>
            <a-popconfirm
              v-if="checkAccess('promos', 'delete')"
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
            @change="($event) => changePageSizeGlobal($event, '/promos', '__GET_PROMOS')"
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
            <a-form-model-item class="form-item mb-3" label="Заголовок">
              <a-input
                type="text"
                class="w-100 promo-date"
                placeholder="Заголовок..."
                v-model="form.title"
              />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Статус">
              <a-switch
                @change="
                  ($event) => ($event ? (form.is_active = 1) : (form.is_active = 0))
                "
                :checked="form.is_active == 1"
                :default-checked="form.is_active == 1"
              ></a-switch>
            </a-form-model-item>
            <a-form-model-item
              class="form-item mb-3"
              :class="{ 'select-placeholder': form.service_id == null }"
              label="Услуга"
            >
              <a-select v-model="form.service_id" placeholder="Услуга">
                <a-select-option v-for="(service, index) in services" :key="service?.id">
                  {{ service?.name?.ru }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item class="form-item mb-3" label="Количество">
              <a-input-number
                v-model="form.amount"
                :formatter="
                  (value) => {
                    if (Number(value)) {
                      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    } else {
                      var num = [];
                      value.split('').forEach((item) => {
                        if (Number(item) || item == 0) {
                          num.push(item);
                        }
                      });
                      return `${num.join('')}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                    }
                  }
                "
                placeholder="Введите сумму"
                :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
              />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Дата">
              <input type="date" class="w-100 promo-date" v-model="form.date" />
            </a-form-model-item>
            <a-form-model-item class="form-item mb-3" label="Промо">
              <a-input v-model="form.promo" placeholder="Промо" />
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
          Отмена
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
import SearchInput from "../components/form/Search-input.vue";
import TitleBlock from "../components/Title-block.vue";
import status from "../mixins/status";
import global from "../mixins/global";
import authAccess from "../mixins/authAccess";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
    title: "Промо",
    dataIndex: "promo",
    key: "promo",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "promo" },
    className: "column-name",
  },
  {
    title: "Услуга",
    dataIndex: "service",
    key: "service",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "service" },
    className: "column-service",
    align: "left",
  },
  {
    title: "Количество",
    dataIndex: "amount",
    key: "amount",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "amount" },
    className: "column-name",
  },

  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "date" },
    className: "column-date",
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
    title: "F.A.Q",
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
      ],
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      services: [],
      columns,
      promos: [],
      rules: {},
      form: {
        title: "",
        service_id: null,
        amount: null,
        promo: "",
        date: "",
        is_active: 0,
      },
    };
  },
  async mounted() {
    this.getFirstData("/promos", "__GET_PROMOS");
    this.__GET_SERVICES();
    this.checkAllActions("promos");
  },
  methods: {
    saveData() {
      this.$refs["ruleFormFaq"].validate((valid) => {
        if (valid) {
          if (this.editId) {
            this.__EDIT_PROMOS(this.form);
          } else {
            this.__POST_PROMOS(this.form);
          }
        } else {
          return false;
        }
      });
    },
    editAction(id) {
      this.title = "Изменить";
      this.editId = id;
      this.__GET_PROMOS_BY_ID(id);
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchPromos/deletePromos",
        "Успешно удален",
        "__GET_PROMOS"
      );
    },
    async __GET_PROMOS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchPromos/getPromos", {
        ...this.$route.query,
      });
      this.loading = false;
      const pageIndex = this.indexPage(
        data?.promos?.current_page,
        data?.promos?.per_page
      );
      this.promos = data?.promos?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.promos?.total;
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    onChange(date, dateString) {},
    addPromos() {
      this.title = "Добавить";

      this.fileList = [];
      this.editId = null;
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    async __POST_PROMOS(data) {
      try {
        await this.$store.dispatch("fetchPromos/postPromos", data);
        this.notification("success", "success", "Успешно добавлен");
        this.handleOk();
        this.__GET_PROMOS();
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_PROMOS_BY_ID(id) {
      try {
        const data = await this.$store.dispatch("fetchPromos/getPromosById", id);
        this.visible = true;
        this.form = data?.promo;
      } catch (e) {
        this.statusFunc(e);
      }
    },
    async __GET_SERVICES() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchServices/getServices");
      this.loading = false;
      this.services = data?.services;
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
    async __EDIT_PROMOS(res) {
      try {
        await this.$store.dispatch("fetchPromos/editPromos", {
          id: this.editId,
          data: res,
        });
        this.handleOk();
        this.__GET_PROMOS();
        this.notification("success", "success", "Успешно изменена");
        this.$router.push("/promos");
      } catch (e) {
        this.statusFunc(e);
      }
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/promos", "__GET_PROMOS");
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
.ant-calendar-picker-container {
  z-index: 2051;
}
.promo-date:focus {
  outline: none;
}
</style>
