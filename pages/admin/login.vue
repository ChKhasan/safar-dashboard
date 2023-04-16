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
            <nuxt-link to="/">Forgot Password ?</nuxt-link>
          </div>
          <input type="password" class="input" />
        </div>
      </div>
      <div class="login_btn d-flex justify-content-center" @click="login">Continue</div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "empty",
  middleware: "login",
  methods: {
    login() {
      this.$store.commit("logIn");
      this.$router.push('/')
      console.log("lohin");
    },
  },
};
</script>
<style lang="css">
@import "../../assets/css/pages/login.css";
</style>
