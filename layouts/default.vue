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
            :open-keys.sync="openKeys"
          >
            <a-sub-menu :key="menu.sub" style="color: #9d9da6" v-for="menu in menuData">
              <span slot="title">
                <span v-html="menu.icon"></span
                ><span v-if="!collapsed">{{ menu.title }}</span></span
              >
              <a-menu-item
                v-if="menu.menuItems.length > 0 && items.show"
                :key="items.key"
                v-for="items in menu.menuItems"
                :class="{
                  'is-active':
                    items.to == $route.path ||
                    items.add == $route.name ||
                    items.edit == $route.name ||
                    items.path == $route.name,
                }"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                <nuxt-link :to="items.to">{{ d(items) }} </nuxt-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout class="layout-right" :class="{ 'right-collapsed': collapsed }">
        <div class="layout-header d-flex justify-content-end align-items-center">
          <a-dropdown :trigger="['click']">
            <a-avatar icon="user" />
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <span @click="logOut">Logout</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <a-layout-content class="layout-body">
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import TitleBlock from "../components/Title-block.vue";
import status from "../mixins/status";
export default {
  middleware: ["auth", "access"],

  data() {
    return {
      collapsed: false,
      defaultOpens: ["1"],
      openKeys: ["1"],
      logo: require("../assets/svg/logo-light.svg?raw"),
      icon: require("../assets/svg/toolbar-catalog.svg?raw"),
      menuData: [],
      // menuData: [
      //   {
      //     title: "Главный",
      //     sub: "1",
      //     icon: require("../assets/svg/toolbar-catalog.svg?raw"),
      //     menuItems: [
      //       {
      //         key: "1",
      //         name: "Услуги",
      //         to: "/",
      //         add: "add_park_services",
      //         edit: "edit_park_services",
      //         show: true,
      //       },
      //       {
      //         key: "2",
      //         name: "Новости",
      //         to: "/news",
      //         add: "add_news",
      //         edit: "edit_news",
      //         show: true,
      //       },
      //       {
      //         key: "3",
      //         name: "Галереи",
      //         to: "/galleries",
      //         add: "add_galleries",
      //         edit: "edit_galleries",
      //         show: true,
      //       },
      //       {
      //         key: "4",
      //         name: "F.A.Q",
      //         to: "/faqs",
      //         add: "add_faqs",
      //         edit: "edit_faqs",
      //         show: true,
      //       },
      //       {
      //         key: "7",
      //         name: "Категории (F.A.Q)",
      //         to: "/category_faqs",
      //         add: "category_faqs",
      //         edit: "category_faqs",
      //         show: true,
      //       },
      //       {
      //         key: "6",
      //         name: "Промо",
      //         to: "/promos",
      //         show: true,
      //       },
      //       {
      //         key: "5",
      //         name: "Заявки",
      //         to: "/applications",
      //         show: true,
      //       },
      //     ],
      //   },
      //   {
      //     title: "Заказы",
      //     sub: "3",
      //     icon: require("../assets/svg/orderIcon.svg?raw"),
      //     menuItems: [
      //       {
      //         name: "Все заказы",
      //         index: "31",
      //         to: "/orders/all-orders",
      //         path: "orders-all-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Новые заказы",
      //         index: "32",
      //         to: "/orders/new-orders",
      //         path: "orders-new-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Ожидание",
      //         index: "34",
      //         to: "/orders/expectation-orders",
      //         path: "orders-expectation-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Принятые заказы",
      //         index: "33",
      //         to: "/orders/accepted-orders",
      //         path: "orders-accepted-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Измененные",
      //         index: "35",
      //         to: "/orders/changed-orders",
      //         path: "orders-changed-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Отмененные",
      //         index: "38",
      //         to: "/orders/canceled-orders",
      //         path: "orders-canceled-orders",
      //         disabled: false,
      //         show: true,
      //       },
      //       {
      //         name: "Календарь",
      //         index: "39",
      //         to: "/orders/calendar/0",
      //         path: "orders-calendar",
      //         disabled: false,
      //         show: true,
      //       },
      //     ],
      //   },
      //   {
      //     title: "Клиенты",
      //     sub: "4",
      //     icon: require("../assets/svg/clients.svg?raw"),
      //     menuItems: [
      //       {
      //         key: "41",
      //         name: "Клиенты",
      //         to: "/clients",
      //         add: "clients",
      //         edit: "clients",
      //         show: true,
      //       },
      //     ],
      //   },
      //   {
      //     title: "Настройки сайта",
      //     sub: "2",
      //     icon: require("../assets/svg/settings.svg?raw"),
      //     menuItems: [
      //       {
      //         key: "21",
      //         name: "Переводы",
      //         to: "/settings/translations",
      //         add: "settings-translations",
      //         edit: "settings-translations-group",
      //         show: true,
      //       },
      //       {
      //         key: "22",
      //         name: " Общие данные",
      //         to: "/settings/site-info",
      //         add: "settings-site-info",
      //         edit: "settings-site-info",
      //         show: true,
      //       },
      //       {
      //         key: "23",
      //         name: "Создать роль",
      //         to: "/settings/roles",
      //         add: "settings-roles",
      //         edit: "settings-roles",
      //         show: true,
      //       },
      //       {
      //         key: "24",
      //         name: "Пользователи",
      //         to: "/settings/users",
      //         add: "settings-users",
      //         edit: "settings-users",
      //         show: true,
      //       },
      //       {
      //         key: "25",
      //         name: "Youtube Videos",
      //         to: "/settings/you-tube",
      //         add: "settings-you-tube",
      //         edit: "settings-you-tube",
      //         show: true,
      //       },
      //     ],
      //   },
      // ],
    };
  },

  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  async mounted() {
    this.$store.dispatch("getOrders");
    await this.$store.dispatch("getPermissions");

    (this.menuData = [
      {
        title: "Главный",
        sub: "1",
        icon: require("../assets/svg/toolbar-catalog.svg?raw"),
        menuItems: [
          {
            key: "1",
            name: "Услуги",
            to: "/",
            add: "add_park_services",
            edit: "edit_park_services",
            show: this.checkShow("services"),
          },
          {
            key: "2",
            name: "Новости",
            to: "/news",
            add: "add_news",
            edit: "edit_news",
            show: this.checkShow("posts"),
          },
          {
            key: "3",
            name: "Галереи",
            to: "/galleries",
            add: "add_galleries",
            edit: "edit_galleries",
            show: this.checkShow("galleries"),
          },
          {
            key: "4",
            name: "F.A.Q",
            to: "/faqs",
            add: "add_faqs",
            edit: "edit_faqs",
            show: this.checkShow("faqs"),
          },
          {
            key: "7",
            name: "Категории (F.A.Q)",
            to: "/category_faqs",
            add: "category_faqs",
            edit: "category_faqs",
            show: this.checkShow("faq_categories"),
          },
          {
            key: "6",
            name: "Промо",
            to: "/promos",
            show: this.checkShow("promos"),
          },
          {
            key: "5",
            name: "Заявки",
            to: "/applications",
            show: this.checkShow("applications"),
          },
          {
            key: "8",
            name: "Партнеры",
            to: "/partners",
            add: "/partners",
            edit: "/partners",
            show: this.checkShow("partners"),
          },
        ],
      },
      {
        title: "Заказы",
        sub: "3",
        icon: require("../assets/svg/orderIcon.svg?raw"),
        menuItems: [
          {
            name: "Все заказы",
            index: "31",
            to: "/orders/all-orders",
            path: "orders-all-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Новые заказы",
            index: "32",
            to: "/orders/new-orders",
            path: "orders-new-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Ожидание",
            index: "34",
            to: "/orders/expectation-orders",
            path: "orders-expectation-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Принятые заказы",
            index: "33",
            to: "/orders/accepted-orders",
            path: "orders-accepted-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Измененные",
            index: "35",
            to: "/orders/changed-orders",
            path: "orders-changed-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Отмененные",
            index: "38",
            to: "/orders/canceled-orders",
            path: "orders-canceled-orders",
            disabled: false,
            show: this.checkShow("orders"),
          },
          {
            name: "Календарь",
            index: "39",
            to: "/orders/calendar/0",
            path: "orders-calendar",
            disabled: false,
            show: this.checkShow("calendar/*"),
          },
        ],
      },
      {
        title: "Клиенты",
        sub: "4",
        icon: require("../assets/svg/clients.svg?raw"),
        menuItems: [
          {
            key: "41",
            name: "Клиенты",
            to: "/clients",
            add: "/show-client",
            edit: "/show-client",
            show: this.checkShow("clients/all"),
          },
        ],
      },
      {
        title: "Смс рассылка",
        sub: "6",
        icon: require("../assets/svg/sms-page.svg?raw"),
        menuItems: [
          {
            key: "61",
            name: "По SMS",
            to: "/by-sms",
            add: "by-sms",
            edit: "by-sms",
            show: this.$store.state.permissions
              .find((item) => item.url == "mailing")
              ?.pivot?.actions.includes("post"),
          },
        ],
      },
      {
        title: "Настройки сайта",
        sub: "2",
        icon: require("../assets/svg/settings.svg?raw"),
        menuItems: [
          {
            key: "21",
            name: "Переводы",
            to: "/settings/translations",
            add: "settings-translations",
            edit: "settings-translations-group",
            show: this.checkShow("translates"),
          },
          {
            key: "22",
            name: " Общие данные",
            to: "/settings/site-info",
            add: "settings-site-info",
            edit: "settings-site-info",
            show: this.checkShow("site_infos"),
          },
          {
            key: "23",
            name: "Роли",
            to: "/settings/roles",
            add: "settings-roles",
            edit: "settings-roles",
            // show: this.checkShow("roles"),
            show: true,
          },
          {
            key: "24",
            name: "Пользователи",
            to: "/settings/users",
            add: "settings-users",
            edit: "settings-users",
            show: this.checkShow("users"),
          },
          {
            key: "25",
            name: "Youtube Видеоролики",
            to: "/settings/you-tube",
            add: "settings-you-tube",
            edit: "settings-you-tube",
            show: this.checkShow("youtube_videos"),
          },
          // {
          //   key: "26",
          //   name: "По SMS",
          //   to: "/settings/by-sms",
          //   add: "settings-by-sms",
          //   edit: "settings-by-sms",
          //   show: this.$store.state.permissions
          //     .find((item) => item.url == "mailing")
          //     ?.pivot?.actions.includes("post"),
          // },
        ],
      },
    ]),
      this.checkDefaultOpen();
    if (localStorage.getItem("auth_token")) {
      this.$store.commit("logIn");
    } else {
      this.$router.push("/admin/login");
      this.$store.commit("logOut");
    }
  },

  methods: {
    checkShow(val) {
      if (this.$store.state.permissions.length > 0) {
        const target = this.$store.state.permissions.find((item) => item.url == val);
        return target?.pivot?.actions.includes("get");
      } else {
        return true;
      }
    },
    onCollapse(collapsed, type) {
      this.collapsed = !this.collapsed;
    },
    async logOut() {
      try {
        const data = await this.$store.dispatch("fetchAuth/logOut");
        await localStorage.removeItem("auth_token");
        this.$router.push("/admin/login");
      } catch (e) {
        this.statusFunc(e);
      }
    },
    checkDefaultOpen() {
      if (this.$route.name.includes("orders")) {
        this.openKeys = ["3"];
      } else if (this.$route.name.includes("settings")) {
        this.openKeys = ["2"];
      } else if (this.$route.name.includes("clients")) {
        this.openKeys = ["4"];
      } else if (this.$route.name.includes("by-sms")) {
        this.openKeys = ["6"];
      } else {
        this.openKeys = ["1"];
      }
    },
    d(item) {
      switch (item.index) {
        case "31":
          return `${item.name} (${this.$store.state.orders.all})`;
        case "32":
          return `${item.name} (${this.$store.state.orders.new})`;
        case "33":
          return `${item.name} (${this.$store.state.orders.accepted})`;
        case "34":
          return `${item.name} (${this.$store.state.orders.in_process})`;
        case "35":
          return `${item.name} (${this.$store.state.orders.is_edited})`;
        case "38":
          return `${item.name} (${this.$store.state.orders.canceled})`;
        default:
          return item.name;
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
    routerName() {
      this.checkDefaultOpen();
    },
  },
  components: { TitleBlock },
};
</script>
<style lang="css">
@import "../assets/css/layout/default.css";
</style>
