<template lang="html">
  <div class="all-orders">
    <TitleBlock title="Календарь" :breadbrumb="['Заказы']" lastLink="Календарь">
    </TitleBlock>
    <div class="container_xl app-container pb-5 pt-5">
      <div class="card_block main-table px-4 py-3">
        <div class="order-links-grid btn_group order-service-btns">
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="
              $route.hash == '#total_info' || $route.hash == '' ? 'primary' : 'default'
            "
            @click="$router.push({ hash: 'total_info' })"
          >
            HeroPark
          </a-button>
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#sessions_tariffs' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'sessions_tariffs' })"
          >
            Airballon
          </a-button>
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#faq' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'faq' })"
          >
            Zipline
          </a-button>
          <a-button
            class="add-btn add-header-btn btn-primary d-flex align-items-center"
            :type="$route.hash == '#reviews' ? 'primary' : 'default'"
            @click="$router.push({ hash: 'reviews' })"
          >
            Zipline
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
          <div class="calendar-days mt-3">
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
            <CalendarCard />
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
import CalendarOrderCard from "../../../components/cards/calendarOrderCard.vue";
import moment from "moment";
export default {
  data() {
    return {
      eyeIcon: require("../../../assets/svg/check-circle.svg?raw"),
      editIcon: require("../../../assets/svg/edit.svg?raw"),
      deleteIcon: require("../../../assets/svg/delete.svg?raw"),
      today: new Date(),
      dateFormat: "YYYY/MM/DD",
    };
  },
  computed: {
    getLastWeeksDate() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    },
  },
  methods: {
    moment,
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
  components: { CalendarCard, CalendarOrderCard },
};
</script>
<style lang="css">
@import "../../../assets/css/pages/order.css";
.date-sticky {
  position: sticky;
  top: 120px;
}
</style>
