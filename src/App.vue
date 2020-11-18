<template>
  <div id="app">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="/profile">Account</b-dropdown-item>
            <b-dropdown-item v-if="isUserLoggedIn" @click="logOut()">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <router-view class="pt-3"></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BNavbar,BNavbarNav,BNavItemDropdown,BDropdownItem } from 'bootstrap-vue'

export default {
  name: "App",
  components: {
    BNavbar,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem
  },
  methods: {
    logOut(){
      localStorage.removeItem('userData');
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
