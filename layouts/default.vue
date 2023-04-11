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
            :default-open-keys="['sub1']"
          >
            <a-sub-menu key="sub1" style="color: #9d9da6">
              <span slot="title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10H13V11C13 11.6 12.6 12 12 12C11.4 12 11 11.6 11 11V10H3C2.4 10 2 10.4 2 11V13H22V11C22 10.4 21.6 10 21 10Z"
                    fill="currentColor"
                  ></path>
                  <path
                    opacity="0.3"
                    d="M12 12C11.4 12 11 11.6 11 11V3C11 2.4 11.4 2 12 2C12.6 2 13 2.4 13 3V11C13 11.6 12.6 12 12 12Z"
                    fill="currentColor"
                  ></path>
                  <path
                    opacity="0.3"
                    d="M18.1 21H5.9C5.4 21 4.9 20.6 4.8 20.1L3 13H21L19.2 20.1C19.1 20.6 18.6 21 18.1 21ZM13 18V15C13 14.4 12.6 14 12 14C11.4 14 11 14.4 11 15V18C11 18.6 11.4 19 12 19C12.6 19 13 18.6 13 18ZM17 18V15C17 14.4 16.6 14 16 14C15.4 14 15 14.4 15 15V18C15 18.6 15.4 19 16 19C16.6 19 17 18.6 17 18ZM9 18V15C9 14.4 8.6 14 8 14C7.4 14 7 14.4 7 15V18C7 18.6 7.4 19 8 19C8.6 19 9 18.6 9 18Z"
                    fill="currentColor"
                  ></path></svg
                ><span v-if="!collapsed">Каталог</span></span
              >
              <a-menu-item key="1" class="is-active"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                <nuxt-link to="/"> Xizmatlar</nuxt-link>
              </a-menu-item>
              <a-menu-item key="2"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                Категории2
              </a-menu-item>
              <a-menu-item key="3"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                Категории3
              </a-menu-item>
              <a-menu-item key="4"
                ><span v-if="!collapsed" class="menu-bullet"
                  ><span class="bullet-dot"></span
                ></span>
                Категории4
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2" style="color: #9d9da6">
              <span slot="title"
                ><a-icon type="laptop" /><span v-if="!collapsed">Категории 2</span></span
              >
              <a-menu-item key="5"> Категории5 </a-menu-item>
              <a-menu-item key="6"> Категории6 </a-menu-item>
              <a-menu-item key="7"> Категории7 </a-menu-item>
              <a-menu-item key="8"> Категории8 </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3" :style="{ color: '#9d9da6' }">
              <span slot="title"
                ><a-icon type="notification" /><span v-if="!collapsed"
                  >Категории 3</span
                ></span
              >
              <a-menu-item key="9" :style="{ color: '#9d9da6' }">
                Категории9
              </a-menu-item>
              <a-menu-item key="10"> Категории0 </a-menu-item>
              <a-menu-item key="11"> Категории1 </a-menu-item>
              <a-menu-item key="12"> Категории2 </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout class="layout-right" :class="{ 'right-collapsed': collapsed }">
        <div class="layout-header">
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

export default {
  data() {
    return {
      collapsed: false,
      logo: require("../assets/svg/logo-light.svg?raw"),

    };
  },
  methods: {
    onCollapse(collapsed, type) {
      this.collapsed = !this.collapsed;
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
  components: { TitleBlock },
};
</script>
<style lang="css">
@import "../assets/css/layout/default.css";
</style>
