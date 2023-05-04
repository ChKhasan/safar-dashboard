<template lang="html">
  <div class="order-links-grid">
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/all-orders' }"
      to="/orders/all-orders"
    >
      <span class="order-green"></span> Все заказы ({{
        `${this.$store.state.orders.all}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/new-orders' }"
      to="/orders/new-orders"
    >
      <span class="order-light-blue"></span> Новые ({{
        `${this.$store.state.orders.new}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/accepted-orders' }"
      to="/orders/accepted-orders"
    >
      <span class="order-black"></span> Принятые ({{
        `${this.$store.state.orders.accepted}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/expectation-orders' }"
      to="/orders/expectation-orders"
    >
      <span class="order-blue"></span> Ожидание ({{
        `${this.$store.state.orders.in_process}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/changed-orders' }"
      to="/orders/changed-orders"
    >
      <span class="order-yellow"></span> Измененные ({{
        `${this.$store.state.orders.is_edited}`
      }})
    </nuxt-link>
    <nuxt-link
      class="order-links"
      :class="{ 'active-orders': $route.path == '/orders/canceled-orders' }"
      to="/orders/canceled-orders"
    >
      <span class="order-red"></span> Отмененные ({{
        `${this.$store.state.orders.canceled}`
      }})
    </nuxt-link>
  </div>
</template>
<script>
export default {};
</script>
