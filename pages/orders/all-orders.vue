<template lang="html">
  <div class="all-orders">
    <TitleBlock title="Все заказы" :breadbrumb="['Заказы']" lastLink="Все заказы">
    </TitleBlock>
    <div class="container_xl app-container pb-4 pt-5">
      <div class="card_block main-table px-4 pb-3">
        <OrderBtns/>
      </div>
    </div>
    <div class="container_xl app-container pb-5 main-table">
      <div class="card_block main-table px-4 py-4">
        <div class="d-flex justify-content-between align-items-center card_header">
          <div class="prodduct-list-header-grid w-100 align-items-center">
            <SearchInput placeholder="Поиск" @changeSearch="changeSearch"/>
            <div class="input status-select w-100">
              <a-form-model-item
                class="form-item mb-0"
                :class="{ 'select-placeholder': !value }"
              >
                <a-select v-model="value" placeholder="Услуга">
                  <a-select-option
                    v-for="service in services"
                    :key="service?.id"
                    placeholder="good"
                  >
                    {{ service?.name?.ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <a-button
              type="primary"
              class="d-flex align-items-center justify-content-center"
              @click="clearQuery"
              style="height: 38px"
            >
              <a-icon type="reload"
              />
            </a-button>
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
          :loading="loading"
          align="center"
        >
          <span to="/orders/1232/details" slot="client" slot-scope="text" align="center">
            {{ text }}
          </span>
          <a slot="amount" slot-scope="text">{{ text }}</a>
          <span slot="orderId" slot-scope="text">#{{ text?.id }}</span>
          <span slot="date_of_adoption" slot-scope="text">{{ closestDate(text) }}</span>
          <span slot="orders" slot-scope="text">{{
              text[0].service?.name?.ru ? text[0].service?.name?.ru : "------"
            }}</span>
          <span slot="client" slot-scope="text" class="column-client">{{
              text?.name ? text?.name : "----"
            }}</span>
          <span slot="dataAdd" slot-scope="text">{{
              moment(text?.created_at).format("DD/MM/YYYY HH:mm:ss")
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
              v-if="checkAccess('orders', 'put')"
              class="action-btn"
              v-html="eyeIcon"
              @click="$router.push(`/orders/order/${text}`)"
            >
            </span>
            <span
              v-if="checkAccess('orders', 'put')"
              class="action-btn"
              @click="$router.push(`/orders/order/${text}`)"
              v-html="editIcon"
            >
            </span>
            <!-- <span class="action-btn" @click="deleteAction(text)" v-html="deleteIcon">
            </span> -->
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
import authAccess from "../../mixins/authAccess";

export default {
  layout: "toolbar",
  mixins: [orderColumns, global, authAccess],
  head: {
    title: "Все заказы",
  },
  data() {
    return {
      services: [],
      value: "",
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
    this.__GET_SERVICES();
    this.checkAllActions("orders");
  },
  methods: {
    closestDate(orders) {
      const today = new Date();
      const todayTimestamp = today.getTime();
      let closest = null;
      let minDifference = Infinity;

      orders.map(item => new Date(item?.date)).forEach(date => {
        const dateTimestamp = date.getTime();
        const difference = Math.abs(dateTimestamp - todayTimestamp);
        if (difference < minDifference) {
          minDifference = difference;
          closest = date;
        }
      });

      return moment(closest).format('YYYY-MM-DD hh:mm:ss');
    },
    changeSearch(val) {
      this.search = val.target.value;
    },
    moment,
    deleteAction(id) {
    },
    async clearQuery(val) {
      this.value = "";
      const query = {...this.$route.query, page: 1};
      this.current = 1;
      delete query.search;
      delete query.service;
      if (this.$route.query?.search || this.$route.query?.service) {
        await this.$router.replace({
          path: "/orders/all-orders",
          query: {...query},
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
            query: {...this.$route.query, search: val.target.value},
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
      const pageIndex = this.indexPage(
        data?.orders?.current_page,
        data?.orders?.per_page
      );
      this.orders = data?.orders?.data.map((item, index) => {
        return {
          ...item,
          key: index + pageIndex,
        };
      });
      this.totalPage = data?.orders?.total;
      this.orders.dataAdd = moment(data?.orders?.created_at).format("DD/MM/YYYY");
    },
    indexPage(current_page, per_page) {
      return (current_page * 1 - 1) * per_page + 1;
    },
    async __GET_SERVICES() {
      const data = await this.$store.dispatch("fetchServices/getServices");
      this.services = data?.services.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
    },
  },
  watch: {
    async current(val) {
      this.changePagination(val, "/orders/all-orders", "__GET_ORDERS");
    },
    async value(val) {
      if (val) {
        if (this.$route.query?.service != val)
          await this.$router.replace({
            path: "/orders/all-orders",
            query: {...this.$route.query, service: val},
          });
        if (val == this.$route.query.service) this.__GET_ORDERS();
      }
    },
  },
  components: {TitleBlock, SearchInput, OrderBtns},
};
</script>
<style lang="css">
@import "../../assets/css/pages/order.css";
</style>
