import Vue from 'vue'
import VueRouter from 'vue-router'

import Saolei from '../pages/saolei'
import Jingzi from '../pages/jingzi'
import Xiaoxiaole from '../pages/xiaoxiaole'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { path: '/扫雷', component: Saolei },
    { path: '/井字游戏', component: Jingzi },
    { path: '/消消乐', component: Xiaoxiaole }
  ]
})
