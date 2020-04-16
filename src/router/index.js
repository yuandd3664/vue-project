import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home'
import Xuanxaing1 from "../views/home/Xuanxaing1";
import Xuanxiang2 from "../views/home/Xuanxiang2";
import Detail from "../views/home/detail";
import Xuanxiang3 from "../views/home/Xuanxiang3"

Vue.use(Router)
import VueRouter from "vue-router";
//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样是这样
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [{
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      redirect: '/home/xuanxiang1',
      component: Home,
      children: [{
          path: 'xuanxiang1',
          name: Xuanxaing1,
          component: Xuanxaing1
        },
        {
          path: 'xuanxiang2',
          name: Xuanxiang2,
          component: Xuanxiang2
        },
        {
          path: 'detail',
          name: Detail,
          component: Detail
        },
        {
          path: 'Xuanxiang3',
          name: Xuanxiang3,
          component: Xuanxiang3
        }
      ]
    }
  ]
})
