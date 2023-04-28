<template lang="html">
  <div class="all-orders">
    <TitleBlock
      title="Ожидание"
      :breadbrumb="['Заказы']"
      lastLink="Ожидание"
    >
    </TitleBlock>
    <div class="container_xl app-container pb-4 pt-5">
      <div class="card_block main-table px-4 pb-3">
        <div class="order-links-grid">
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/all-orders' }"
            to="/orders/all-orders"
          >
            <span class="order-green"></span> Все заказы (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/new-orders' }"
            to="/orders/new-orders"
          >
            <span class="order-light-blue"></span> Новые (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/accepted-orders',
            }"
            to="/orders/accepted-orders"
          >
            <span class="order-black"></span> Принятые (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{ 'active-orders': $route.path == '/orders/ready-orders' }"
            to="/orders/ready-orders"
          >
            <span class="order-blue"></span> Ожидание (0)
          </nuxt-link>
          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/delivery-orders',
            }"
            to="/orders/delivery-orders"
          >
            <span class="order-yellow"></span> Измененные (0)
          </nuxt-link>

          <nuxt-link
            class="order-links"
            :class="{
              'active-orders': $route.path == '/orders/canceled-orders',
            }"
            to="/orders/canceled-orders"
          >
            <span class="order-red"></span> Отмененные (0)
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="container_xl app-container pb-5 main-table">
      <div class="card_block main-table px-4 py-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="order-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск продукта" @changeSearch="changeSearch" />
            <div class="input status-select w-100">
              <a-select v-model="secondCity">
                <a-select-option v-for="city in cities" :key="city">
                  {{ city }}
                </a-select-option>
              </a-select>
            </div>
            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
            >
              <a-icon type="reload"
            /></a-button>
            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              >Применить
            </a-button>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          align="center"
        >
          <span to="/orders/1232/details" slot="client" slot-scope="text" align="center">
            {{ text }}
          </span>
          <a slot="price" slot-scope="text">${{ text }}</a>
          <span slot="client" slot-scope="text" class="column-client">{{ text }}</span>
          <span slot="customTitle"></span>

          <span
            slot="tags"
            slot-scope="tags"
            class="tags-style"
            :class="{
              tag_success: tags == 'Success',
              tag_inProgress: tags == 'in progress',
              tag_approved: tags == 'Approved',
              tag_rejected: tags == 'rejected',
            }"
          >
            {{ tags }}
          </span>
          <span slot="btns" slot-scope="text">
            <span
              class="action-btn"
              v-html="eyeIcon"
              @click="$router.push(`/edit_park_services/${text}`)"
            >
            </span>
            <span
              class="action-btn"
              @click="$router.push('/orders/1232/edit')"
              v-html="editIcon"
            >
            </span>
            <span class="action-btn" @click="tableActions(text)" v-html="deleteIcon">
            </span>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};
export default {
  layout: "toolbar",
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      pageSize: 10,
      eyeIcon: require("../../assets/svg/Eye.svg?raw"),
      editIcon: require("../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../assets/svg/delete.svg?raw"),
      tableData: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [
        {
          key: "1",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "2",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "3",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "4",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
        {
          key: "5",
          orderId: "#123",
          client: "A nam .column-name .column-name",
          dataAdd: "22.22.2022",
          dataEdit: "22.22.2022",
          price: "23423432",
          statusSum: "status",
          tags: "Success",
          btns: "id",
        },
      ],
      columns: [
        {
          title: "Заказ ID",
          dataIndex: "orderId",
          key: "orderId",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "orderId" },
          className: "column-service",
        },
        {
          title: "дата добавления",
          dataIndex: "dataAdd",
          scopedSlots: { customRender: "dataAdd" },
          className: "column-name",
          key: "dataAdd",
        },
        {
          title: "Услуга",
          dataIndex: "dataEdit",
          scopedSlots: { customRender: "dataEdit" },
          className: "column-name",
          key: "dataEdit",
        },
        {
          title: "сумма",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
          className: "column-name",
          key: "price",
        },
        {
          title: "Клиент",
          dataIndex: "client",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "client" },
          className: "column-name",
          key: "client",
          align: "left",
          width: "20%",
        },

        {
          title: "статус",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" },
          className: "column-tags",
          key: "tags",
        },
        {
          title: "ДЕЙСТВИЯ",
          key: "btns",
          dataIndex: "btns",
          scopedSlots: { customRender: "btns" },
          className: "column-btns",
          width: "120px",
          align: "center",
        },
      ],
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },

    classObject(tag) {
      return {
        tag_success: tag == "Success",
        tag_inProgress: tag == "in progress",
      };
    },
  },
  mounted() {
    if (this.data) {
      this.tableData = this.data;
    }
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    changeStatus(val) {
      // this.status = val;
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(filters);
      this.tableData = this.data.map((item) => {
        filters.tags.forEach((element) => {
          if (item.tags == element);
          return item;
        });
      });
      console.log(this.tableData);
    },

    start() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    tableActions(id) {
      console.log(id);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
    },
    handleCommand(command) {
      this.pageSize = command;
    },
  },
  components: { TitleBlock, SearchInput },
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
</style>
