<template lang="html">
  <div class="all-orders">
    <TitleBlock title="Календарь" :breadbrumb="['Заказы']" lastLink="Календарь">
    </TitleBlock>
    <div class="container_xl app-container pb-5 pt-5">
      <div class="card_block main-table px-4 py-3">
        <div class="order-links-grid btn_group order-service-btns">
          <a-button
            v-if="loading"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
          >
            Empty
          </a-button>
          <a-button
            v-for="service in $store.state.services"
            v-else
            :key="service.id"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.params.index == service.id ? 'primary' : 'default'"
            @click="$router.push(`/orders/calendar/${service.id}`)"
          >
            {{ service?.name?.ru }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="container_xl app-container pb-5">
      <div class="calendar-grid position-relative">
        <div>
          <div class="card_block">
            <div class="calendar-date-box">
              <!-- c <input type="date" /> до
                <input type="date" /> -->
              <a-range-picker
                @change="onChange"
                :default-value="[
                  moment(today, dateFormat),
                  moment(getLastWeeksDate, dateFormat),
                ]"
                :format="dateFormat"
              />
              <a-button
                type="primary"
                class="d-flex calendar-btn align-items-center justify-content-center"
              >
                <span v-html="eyeIcon"></span
              ></a-button>
            </div>
          </div>

          <div class="calendar-days mt-3" v-if="calendar.length > 0">
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
          </div>
          <div class="calendar-days mt-3" v-else>
            <CalendarCardEmpty />
            <CalendarCardEmpty />
            <CalendarCardEmpty />
          </div>
        </div>
        <div>
          <div class="calendar-order-grid">
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
            <CalendarOrderCard />
          </div>
          <a-button
            class="add-btn mt-4 w-100 add-header-btn calendar-order-btn btn-primary d-flex align-items-center justify-content-center"
            type="primary"
            @click="$router.push('/orders/add_order')"
          >
            Добавить заказ
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarCard from "../../../components/cards/calendarCard.vue";
import CalendarCardEmpty from "../../../components/cards/calendarCardEmpty.vue";
import CalendarOrderCard from "../../../components/cards/calendarOrderCard.vue";
import moment from "moment";
export default {
  data() {
    return {
      eyeIcon: require("../../../assets/svg/check-circle.svg?raw"),
      editIcon: require("../../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../../assets/svg/delete.svg?raw"),
      today: new Date(),
      dateFormat: "DD/MM/YYYY",
      services: [],
      calendar: [],
      loading: false,
    };
  },
  async mounted() {
    const startDate = this.momentDate(new Date());
    const endDate = this.momentDate(this.getLastWeeksDate);
    console.log(startDate, endDate);
    if (
      !Object.keys(this.$route.query).includes("start_date") ||
      !Object.keys(this.$route.query).includes("end_date")
    ) {
      await this.$router.replace({
        path: `/orders/calendar/${this.$route.params.index}`,
        query: { ...this.$route.query, start_date: startDate, end_date: endDate },
      });
    }
    if (this.services.length == 0) this.__GET_SERVICES();
    this.__GET_CALENDAR();
  },
  computed: {
    getLastWeeksDate() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
    },
  },
  methods: {
    moment,
    momentDate: function (date) {
      return moment(date).format("DD-MM-YYYY");
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    async __GET_CALENDAR() {
      const data = await this.$store.dispatch("fetchOrders/getCalendar", {
        query: this.$route.query,
        id: this.$route.params.index,
      });
      console.log(data);
    },
    async __GET_SERVICES() {
      const data = await this.$store.dispatch("fetchServices/getServices");
      this.$store.commit("services", data?.services);
      this.services = data?.services;
    },
  },
  components: { CalendarCard, CalendarOrderCard, CalendarCardEmpty },
};
</script>
<style lang="css">
@import "../../../assets/css/pages/order.css";
.date-sticky {
  position: sticky;
  top: 120px;
}
</style>
