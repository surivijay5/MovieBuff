import Vue from "vue";
import VueRouter from "vue-router";
//ts-ignore
import VueToastr from "vue-toastr";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from "./App.vue";
import routes from './routes';

Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueToastr);

const router = new VueRouter({
  mode: 'history',
  routes
})


new Vue({
  router,
  render : h =>h(App)
}).$mount('#app')