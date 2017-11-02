import Vue from 'vue'
import VueRouter from 'vue-router'

import Saolei from '../pages/saolei'
import Xiaoxiaole from '../pages/xiaoxiaole'
Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { path: '/saolei', component: Saolei },
    { path: '/xiaoxiaole', component: Xiaoxiaole }
  ]
})
