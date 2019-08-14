import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue'),
      beforeEnter: (to:any, from:any, next:any) => {
        // if (from.name === 'personalVote') {
        //   to.query.personalVoteFlag = true // 判断是否从判断页进入
        // }
        next()
      },
      meta: { keepAlive: true }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/playbill',
      name: 'playbill',
      component: () => import('./views/playBill.vue')
    },
    {
      path: '/takeActivity/:classOrPersonal', // 参赛页面。class为班级 personal为个人
      name: 'takeActivity',
      component: () => import('./views/takeActivity.vue'),
      props: true
    },
    {
      path: '/votePage',
      name: 'votePage',
      component: () => import('./views/About.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import('./views/Chart.vue'),
      meta: { keepAlive: true }
    },
    // 活动过期提示
    {
      path: '/tipsOverdue',
      name: 'tipsOverdue',
      component: () => import('./components/tipsOverdue.vue')
    },
    {
      path: '/tipsContent',
      name: 'tipsContent',
      component: () => import('./components/tipsContent.vue')
    },
    // 重新上传图片提示
    {
      path: '/tipsImg',
      name: 'tipsImg',
      component: () => import('./components/tipsImg.vue')
    },
    {
      path: '/personal/:id', // 个人参赛入口
      name: 'personal',
      component: () => import('./views/personal.vue')
    },
    {
      path: '/mine', // 个人信息页
      name: 'mine',
      component: () => import('./views/mine.vue')
    },
    { // 个人参赛入口 - 投票页
      path: '/personalVote/:userId',
      name: 'personalVote',
      component: () => import('./views/personalVote.vue'),
      props: true
    },
    { // 活动服务协议
      path: '/serviceContract',
      name: 'serviceContract',
      component: () => import('./components/serviceContract.vue')
    },
    { // 参赛规则
      path: '/rules',
      name: 'rules',
      component: () => import('./views/rules.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
