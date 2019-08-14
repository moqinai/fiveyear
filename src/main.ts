import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import { post, get } from './services/axios.tools' // 导入封装好的axios
import adapt from './services/adapt'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import loading from '@/components/loading.vue'

import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.component('v-loading', loading)
FastClick.attach(document.body)
FastClick.prototype.focus = (ele:any) => { 'use strict'; ele.focus() } // 修改focus()方法
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.use(adapt)
router.beforeEach((to, from, next) => {
  /* must call `next` */
  if (to.path.match('personalVote')) {
    from.meta.keepAlive = true
  } else {
    from.meta.keepAlive = false
  }
  next()
})

// require('./mock.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
