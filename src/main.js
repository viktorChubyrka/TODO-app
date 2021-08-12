import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

//Bootstrap import 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

// Toastr import 
import VueToastr2 from 'vue-toastr-2'

// Font Awesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//Font Awesome icon imports 

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashRestore } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit)
library.add(faCheckCircle)
library.add(faTrashAlt)
library.add(faTrashRestore)


window.toastr = require('toastr')
 
Vue.use(VueToastr2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
