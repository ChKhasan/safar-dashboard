<template lang="html">
  <div class="login_container">
    <div class="login_block">
      <div class="login_header mb-10">
        <h1 class="mb-3">Sign In to Home24 Admin</h1>
      </div>
      <div class="login_form">
        <div class="login_input mb-10">
          <label for="">Number</label>
          <input type="text" class="input" />
        </div>
        <div class="login_input mb-10">
          <div class="d-flex justify-content-between">
            <label for="">Password</label>
            <!-- <nuxt-link to="/">Forgot Password ?</nuxt-link> -->
          </div>
          <input type="password" class="input" />
        </div>
        <transition name="slide-fade">
          <span class="mb-3 d-block" style="margin-top: -15px">
            <a-alert
              v-if="showError"
              message="Пароль или логин неверный"
              type="error"
              closable
              show-icon
              :after-close="handleClose"
            />
          </span>
        </transition>
      </div>
      <div class="login_btn d-flex justify-content-center" @click="login">Continue</div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "empty",
  middleware: "login",
  data() {
    return {
      showError: true,
    };
  },
  methods: {
    handleClose() {
      this.showError = false;
    },
    login() {
      this.showError = true;
      // this.$store.commit("logIn");
      // this.$router.push("/");
    },
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/login.css";
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
