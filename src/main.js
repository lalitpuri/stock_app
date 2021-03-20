import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/plugins/timeago'
import '@/plugins/charts'
import '@/plugins/switch'


new Vue({
  render: h => h(App),
}).$mount('#app')
