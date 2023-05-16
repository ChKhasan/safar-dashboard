<template lang="html">
  <div class="all-orders">
    <TitleBlock
      title="Измененные заказы"
      :breadbrumb="['Заказы']"
      lastLink="Измененные заказы"
    >
    </TitleBlock>
    <div class="container_xl app-container pb-4 pt-5">
      <div class="card_block main-table px-4 pb-3">
        <OrderBtns />
      </div>
    </div>
    <div class="container_xl app-container pb-5 main-table">
      <div class="card_block main-table px-4 py-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
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
              @click="clearQuery"
              style="height: 38px"
            >
              <a-icon type="reload"
            /></a-button>
            <!-- <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              style="height: 38px"
              >Применить
            </a-button> -->
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="orders"
          :pagination="false"
          align="center"
        >
          <span to="/orders/1232/details" slot="client" slot-scope="text" align="center">
            {{ text }}
          </span>
          <a slot="amount" slot-scope="text">${{ text }}</a>
          <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
          <span slot="client" slot-scope="text" class="column-client">{{
            text?.name
          }}</span>
          <span slot="dataAdd" slot-scope="text">{{
            moment(text?.created_at).format("DD/MM/YYYY")
          }}</span>
          <span slot="customTitle"></span>

          <span
            slot="status"
            slot-scope="tags"
            class="tags-style"
            :class="{
              tag_success: tags == 'new',
              tag_inProgress: tags == 'in_process',
              tag_approved: tags == 'accepted',
              tag_rejected: tags == 'canceled',
            }"
          >
            <!-- 'new', 'canceled', 'accepted', 'in_process' -->
            {{ status[tags] }}
          </span>
          <span slot="btns" slot-scope="text">
            <span
              class="action-btn"
              v-html="eyeIcon"
              @click="$router.push(`/orders/order/1`)"
            >
            </span>
            <span
              class="action-btn"
              @click="$router.push('/orders/order/1')"
              v-html="editIcon"
            >
            </span>
            <span class="action-btn" @click="deleteAction(text)" v-html="deleteIcon">
            </span>
          </span>
        </a-table>
        <div class="d-flex justify-content-between mt-4">
          <a-select
            v-model="params.pageSize"
            class="table-page-size"
            style="width: 120px"
            @change="
              ($event) =>
                changePageSizeGlobal($event, '/orders/all-orders', '__GET_ORDERS')
            "
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
import SearchInput from "../../components/form/Search-input.vue";
import TitleBlock from "../../components/Title-block.vue";
import orderColumns from "../../mixins/orderColumns";
import moment from "moment";
import global from "../../mixins/global";
import OrderBtns from "../../components/order-btns.vue";
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};
export default {
  layout: "toolbar",
  mixins: [orderColumns, global],
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
      loading: false,
      orders: [],
      status: {
        new: "Новые",
        in_process: "Ожидание",
        accepted: "Принятые",
        canceled: "Отмененные",
      },
    };
  },
  mounted() {
    this.getFirstData("/orders/all-orders", "__GET_ORDERS");
  },
  methods: {
    changeSearch(val) {
      this.search = val.target.value;
    },
    moment,
    deleteAction(id) {},
    async clearQuery(val) {
      const query = { ...this.$route.query, page: 1 };
      this.current = 1;
      delete query.search;
      if (this.$route.query?.search) {
        await this.$router.replace({
          path: "/orders/all-orders",
          query: { ...query },
        });
        this.__GET_ORDERS();
      }
    },
    async changeSearch(val) {
      this.searchVal = val.target.value;
      if (val.target.value.length > 2) {
        if (this.$route.query?.search != val.target.value)
          await this.$router.replace({
            path: "/orders/all-orders",
            query: { ...this.$route.query, search: val.target.value },
          });
        if (val.target.value == this.$route.query.search) this.__GET_ORDERS();
      } else if (val.target.value.length == 0) {
        this.clearQuery(val);
      }
    },
    async __GET_ORDERS() {
      this.loading = true;
      const data = await this.$store.dispatch("fetchOrders/getOrders", {
        ...this.$route.query,
      });
      this.loading = false;
      this.orders = data?.orders?.data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
      this.totalPage = data?.orders?.total;
      this.orders.dataAdd = moment(data?.orders?.created_at).format("DD/MM/YYYY");
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/orders/canceled-orders", "__GET_ORDERS");
    },
  },
  components: { TitleBlock, SearchInput, OrderBtns },
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
</style>
