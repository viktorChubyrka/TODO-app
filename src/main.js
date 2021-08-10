import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToastr2 from 'vue-toastr-2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

window.toastr = require('toastr')
 
Vue.use(VueToastr2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
