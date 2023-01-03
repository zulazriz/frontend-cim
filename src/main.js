import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import View from './router/views/pages/View-Customer.vue'
import Insert from './router/views/pages/Insert-Customer.vue'
import Update from './router/views/pages/Update-Customer.vue'


Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: "viewcustomer", component: View },
    { path: '/insertcustomer', component: Insert },
    { path: '/updatecustomer', name: "updatecustomer", component: Update }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
