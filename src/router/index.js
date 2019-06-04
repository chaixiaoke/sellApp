import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'sellApp',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/goods',
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: (resolve) => require(['@/pages/goods/goods'], resolve),
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: (resolve) => require(['@/pages/ratings/ratings'], resolve),
        },
        {
          path: 'seller',
          name: 'seller',
          component: (resolve) => require(['@/pages/seller/seller'], resolve),
        }
      ]
    },
    {
      path: '/caijian',
      name: 'caijian',
      component: (resolve) => require(['@/components/cropper/caijian'], resolve)
    },
    {
      path: '/iconfont',
      name: 'iconfont',
      component: (resolve) => require(['@/components/font/iconfont'], resolve)
    }
  ]
})
