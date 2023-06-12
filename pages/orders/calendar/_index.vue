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
            v-for="(service, index) in $store.state.services"
            v-else
            :key="service.id"
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="
              $route.params.index == 0
                ? index == 0
                  ? 'primary'
                  : 'default'
                : $route.params.index == service.id
                ? 'primary'
                : 'default'
            "
            @click="$router.push(`/orders/calendar/${service.id}`)"
          >
            {{ service?.name?.ru }}
          </a-button>
        </div>
      </div>
    </div>
    <div class="container_xl app-container pb-5">
      <div class="calendar-grid position-relative">
      
        <div class="card_block">
            <div class="calendar-date-box">
              <!-- c <input type="date" /> до
                <input type="date" /> -->
              <a-range-picker
                @change="onChange"
                :format="dateFormat"
                v-model:value="calendarDate"
              />
              <a-button
                type="primary"
                class="d-flex calendar-btn align-items-center justify-content-center"
                @click="getWidthCalendar"
              >
                <span v-html="eyeIcon"></span
              ></a-button>
            </div>
          </div>
          <span></span>
          </div>
      <div class="calendar-grid position-relative">
        <div>
          <!-- <div class="card_block">
            <div class="calendar-date-box">

              <a-range-picker
                @change="onChange"
                :format="dateFormat"
                v-model:value="calendarDate"
              />
              <a-button
                type="primary"
                class="d-flex calendar-btn align-items-center justify-content-center"
                @click="getWidthCalendar"
              >
                <span v-html="eyeIcon"></span
              ></a-button>
            </div>
          </div> -->
          <div class="calendar-days mt-3" v-if="calendarLoading">
            <CalendarCardEmpty />
            <CalendarCardEmpty />
            <CalendarCardEmpty />
          </div>
          <div class="calendar-days mt-3" v-if="calendar.length > 0 && !calendarLoading">
            <span v-for="(day, index) in calendar" :key="index">
              <div class="calendar-day-card">
                <div class="calendar-day-card-header">
                  <p>{{ moment(moment(day[0]?.date,"DD-MM-YYYY")).format("Do MMMM.") }}</p>
                  <span>{{ weeks[moment(moment(day[0]?.date,"DD-MM-YYYY"),"YYYY-MM-DD").day()] }}</span>
                </div>
                <div class="calendar-day-card-body">
                  <div
                    class="calendar-day-card-body-list"
                    v-for="(info, index) in day"
                    :class="{'no-place': info?.max_clients ? info?.max_clients <= info?.booked:false }"
                    @click="orders = {orders: info.orders,name: info?.tariff_name?.ru,close: info?.max_clients ? info?.max_clients > info?.booked:true,date: info?.date,session: info.session,tariff_id: info?.tariff_id}"
                    :key="index"
                  >
                    <div class="time">
                      {{ info?.session ? info?.session : "----" }}
                    </div>
                    <div class="name">{{ info?.tariff_name?.ru }}</div>
                    <div class="day">
                      <span>{{ info?.booked }}/</span
                      >{{ info?.max_clients ? info?.max_clients : '&#8734' }}
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div v-else class="calendar-empty"><a-empty /></div>
        </div>
        <div>

          <Transition name="bounce">

          <div class="calendar-order-grid" v-if="orders?.orders?.length > 0">
          <span  v-for="(order, index) in orders?.orders" :key="index">
            <CalendarOrderCard
              :order="{...order,name: orders?.name}"
            />
          </span>
          <a-button
          v-if="orders?.close && checkAccess('orders','post')"
            class="add-btn mt-4 w-100 add-header-btn calendar-order-btn btn-primary d-flex align-items-center justify-content-center"
            type="primary"
            @click="toBooked(orders)"
          >
            Добавить заказ
          </a-button>
          </div>
        </Transition>
        <Transition name="bounce">
        <div v-if="orders?.orders?.length == 0">
          <div class="calendar-empty"><a-empty /></div>
          <a-button
          v-if="orders?.close && checkAccess('orders','post')"
            class="add-btn mt-4 w-100 add-header-btn calendar-order-btn btn-primary d-flex align-items-center justify-content-center"
            type="primary"
            @click="toBooked(orders)"
          >
            Добавить заказ
          </a-button>
        </div>
        </Transition>

        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CalendarCard from "../../../components/cards/calendarCard.vue";
import CalendarCardEmpty from "../../../components/cards/calendarCardEmpty.vue";
import CalendarOrderCard from "../../../components/cards/calendarOrderCard.vue";
import authAccess from "../../../mixins/authAccess";
import status from "../../../mixins/status";

import moment from "moment";
export default {
  transitions: 'home',
  mixins: [authAccess,status],

  data() {
    return {
      show: false,
      eyeIcon: require("../../../assets/svg/check-circle.svg?raw"),
      editIcon: require("../../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../../assets/svg/delete.svg?raw"),
      startDate: new Date(),
      endDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 14
      ),
      calendarDate: [],
      dateFormat: "DD/MM/YYYY",
      services: [],
      calendar: [],
      orders: {
        name: '',orders: []},
      loading: false,
      calendarLoading: false,
      value: ["12/05/2023", "15/05/2023"],
      weeks: [
        'Воскресенье',
      'Понедельник',
      'Вторник',
         'Среда',
       'Четверг',
      'Пятница',
        'Суббота',
    ]
    };
  },
  async mounted() {
    if (
      !Object.keys(this.$route.query).includes("start_date") ||
      !Object.keys(this.$route.query).includes("end_date")
    ) {
      const startDate = new Date();
      const endDate = this.getLastWeeksDate;
      this.calendarDate = [moment(startDate), moment(endDate)];
      await this.$router.replace({
        path: `/orders/calendar/${this.$route.params.index}`,
        query: {
          ...this.$route.query,
          start_date: this.calendarDate[0].format("DD-MM-YYYY"),
          end_date: this.calendarDate[1].format("DD-MM-YYYY"),
        },
      });
    }
    this.calendarDate = [
      moment(this.$route.query.start_date, this.dateFormat),
      moment(this.$route.query.end_date, this.dateFormat),
    ];

    this.__GET_SERVICES();
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
    toBooked(orders) {
      this.$router.push({
        path: `/orders/add_order/${this.$route.params.index == 0 ? this.services[0].id:this.$route.params.index}`,
        query: {
          date: orders.date,
          tariff_id: orders.tariff_id,
          session: orders.session
        }
      })
    },
    momentDate: function (date) {
      return moment(date).format("DD-MM-YYYY");
    },
    async onChange(date, dateString) {
      this.calendarDate = date;
    },
    async getWidthCalendar() {
      await this.$router.replace({
        path: `/orders/calendar/${this.$route.params.index}`,
        query: {
          ...this.$route.query,
          start_date: this.calendarDate[0].format("DD-MM-YYYY"),
          end_date: this.calendarDate[1].format("DD-MM-YYYY"),
        },
      });
      this.__GET_CALENDAR();
    },
    async __GET_CALENDAR() {
      try {

        this.calendarLoading = true;
        const data = await this.$store.dispatch("fetchOrders/getCalendar", {
          query: this.$route.query,
          id: this.$route.params.index,
        });
        this.calendarLoading = false;
        this.calendar = data?.days;
      } catch(e) {
        this.statusFunc(e);
        this.calendarLoading = false;
      }
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
.calendar-empty {
  margin-top: 16px;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fff;
}

.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
  color: rgb(24, 144, 255);
}
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
}
</style>
