<template>
  <div class="">
    <TitleBlock title="Тарифы" :breadbrumb="['Главный']" lastLink="Тарифы">
      <div class="d-flex"></div>
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
          :data-source="tariffs"
          :loading="loading"
        >
          <span slot="indexId" slot-scope="text">#{{ text?.id }}</span>
          <span slot="name" slot-scope="text">{{ text?.ru }}</span>
          <span slot="subtitle" slot-scope="text" v-html="text?.ru"></span>
          <span slot="schedule" slot-scope="text">
            <span class="option-items d-flex" v-for="(desc, index) in text">
              <span v-if="desc == null">Круглосутоно</span>
              <span
                v-if="desc !== null && desc"
                style="margin-left: 8px"
                v-for="(time, ind) in desc"
              >
                <span v-if="time == null">No date</span>
                <span v-if="ind == 0 && time !== null">{{ week[index] }}:</span>
                <span v-if="time !== null">{{ time }},</span>
              </span>
            </span>
          </span>
          <span slot="id" slot-scope="text">
            <span
              class="action-btn"
              v-html="editIcon"
              @click="$router.push(`/edit_tariff/${text}`)"
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
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="($event) => changePageSizeGlobal($event, '/tariff', '__GET_TARIFF')"
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
  </div>
</template>

<script>
import SearchInput from "../components/form/Search-input.vue";
import TitleBlock from "../components/Title-block.vue";
import status from "../mixins/status";
import global from "../mixins/global";
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
    title: "имя",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    className: "column-name",
    width: 200,
  },
  {
    title: "подзаголовок",
    dataIndex: "subtitle",
    key: "subtitle",
    className: "column-name",
    scopedSlots: { customRender: "subtitle" },
  },
  {
    title: "расписание",
    dataIndex: "schedule",
    key: "schedule",
    className: "column-name",
    scopedSlots: { customRender: "schedule" },
  },
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
  mixins: [status, global],
  data() {
    return {
      eyeIcon: require("../assets/svg/Eye.svg?raw"),
      editIcon: require("../assets/svg/edit.svg?raw"),
      deleteIcon: require("../assets/svg/delete.svg?raw"),
      addIcon: require("../assets/svg/add-icon.svg?raw"),
      loading: false,
      search: "",
      columns,
      tariffs: [],
      week: ["пн", "вт", "ср", "чт", "пт", "сб"],
    };
  },
  mounted() {
    this.getFirstData("/tariff", "__GET_TARIFF");
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    deleteAction(id) {
      this.__DELETE_GLOBAL(
        id,
        "fetchTariff/deleteTariff",
        "Тариф был успешно удален",
        "__GET_TARIFF"
      );
    },
    async __GET_TARIFF() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchTariff/getTariff");
      this.loading = false;
      this.tariffs = data?.tariffs?.data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      this.totalPage = data?.tariffs?.total;
    },
  },
  watch: {
    async current(val) {
      this.changePagination("/tariff", "__GET_TARIFF");
    },
  },
  components: { TitleBlock, SearchInput },
};
</script>
<style lang="css">
@import "../assets/css/pages/tariff.css";
</style>
