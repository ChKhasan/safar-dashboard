<template lang="html">
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout>
      <a-layout-sider v-model="collapsed" collapsible width="265">
        <div class="layout-logo" :class="{ 'logo-collapsed': collapsed }">
          <span v-html="logo"></span>
          <div class="sidebar_toggle" @click="onCollapse">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                fill="currentColor"
              ></path>
              <path
                d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div class="a_menu">
          <a-menu
            mode="inline"
            style="background: #1e1e2d"
            :class="{ 'menu-collabsed': collapsed }"
            :default-selected-keys="['1']"
            :default-open-keys="defaultOpens"
          >
            <a-sub-menu :key="menu.sub" style="color: #9d9da6" v-for="menu in menuData">
              <span slot="title">
                <span v-html="catalogIcon"></span
                ><span v-if="!collapsed">{{ menu.title }}</span></span
              >
              <a-menu-item
                :key="items.key"
                v-for="items in menu.menuItems"
                :class="{
                  'is-active':
                    items.to == $route.path ||
                    items.add == $route.name ||
                    items.edit == $route.name,
                }"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                <nuxt-link :to="items.to"> {{ items.name }}</nuxt-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout class="layout-right" :class="{ 'right-collapsed': collapsed }">
        <div class="layout-header"></div>
        <a-layout-content class="layout-body">
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import TitleBlock from "../components/Title-block.vue";

export default {
  data() {
    return {
      collapsed: false,
      defaultOpens: ["1"],
      logo: require("../assets/svg/logo-light.svg?raw"),
      catalogIcon: require("../assets/svg/toolbar-catalog.svg?raw"),
      menuData: [
        {
          title: "Главный",
          sub: "1",
          menuItems: [
            {
              key: "1",
              name: "Услуги",
              to: "/",
              add: "add_park_services",
              edit: "edit_park_services",
            },
            {
              key: "2",
              name: "Новости",
              to: "/news",
              add: "add_news",
              edit: "edit_news",
            },
            {
              key: "3",
              name: "Галереи",
              to: "/galleries",
              add: "add_galleries",
              edit: "edit_galleries",
            },
            {
              key: "4",
              name: "F.A.Q",
              to: "/faqs",
              add: "add_faqs",
              edit: "edit_faqs",
            },
            {
              key: "6",
              name: "Промо",
              to: "/promos",
            },
            {
              key: "5",
              name: "Заявки",
              to: "/applications",
            },
          ],
        },
        {
          title: "Заказы",
          sub: "3",
          menuItems: [
            {
              name: "Все заказы (0)",
              index: "31",
              to: "/orders/all-orders",
              path: "orders-all-orders",
              disabled: false,
            },
            {
              name: "Новые заказы (0)",
              index: "32",
              to: "/orders/new-orders",
              path: "orders-new-orders",

              disabled: false,
            },
            {
              name: "Принятые заказы (0)",
              index: "33",
              to: "/orders/accepted-orders",
              path: "orders-accepted-orders",

              disabled: false,
            },
            {
              name: "Ожидание (0)",
              index: "34",
              to: "/orders/ready-orders",
              path: "orders-ready-orders",

              disabled: false,
            },
            {
              name: "Измененные (0)",
              index: "35",
              to: "/orders/delivery-orders",
              path: "orders-delivery-orders",
              disabled: false,
            },
            // {
            //   name: "Возврат (0)",
            //   index: "36",
            //   to: "/orders/return-orders",
            //   path: "orders-return-orders",

            //   disabled: false,
            // },
            // {
            //   name: "Доставленные (0)",
            //   index: "37",
            //   to: "/orders/delivered-orders",
            //   path: "orders-delivered-orders",

            //   disabled: false,
            // },
            {
              name: "Отмененные (0)",
              index: "38",
              to: "/orders/canceled-orders",
              path: "orders-canceled-orders",
              disabled: false,
            },
            {
              name: "Календарь",
              index: "39",
              to: "/orders/calendar/0",
              path: "orders-calendar",
              disabled: false,
            },
          ],
        },
      ],
    };
  },

  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.checkDefaultOpen();
    console.log(this.defaultOpens);
    this.defaultOpens = ["3"];
  },
  asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const defaultOpens = ["3"];
    return {
      defaultOpens,
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      this.collapsed = !this.collapsed;
    },
    checkDefaultOpen() {
      console.log(this.$route);
      if (this.$route.name.includes("orders")) {
        this.defaultOpens = ["3"];
      } else {
        this.defaultOpens = ["1"];
      }
    },
    success() {
      this.$message.success("You are online");
    },
    error() {
      this.$message.error("You are offline");
    },
  },
  watch: {
    "$nuxt.isOffline"(val) {
      val && this.error();
    },
    "$nuxt.isOnline"(val) {
      val && this.success();
    },
  },
  components: { TitleBlock },
};
</script>
<style lang="css">
@import "../assets/css/layout/default.css";
</style>
