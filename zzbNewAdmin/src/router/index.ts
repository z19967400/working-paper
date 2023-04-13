import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import { getToken, getCookie } from '@/utils/common'
import store from '@/store'
import { getAsyncRoute } from '@/router/pommies'
import * as Api from '@/api/login'
Vue.use(Router)

const router = new Router({
  routes
  // mode: "history"
})

// 登陆页面路由 name
const LOGIN_PAGE_NAME = 'login'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location: any) {
  let call: any = routerPush.call(this, location)
  return call.catch((error: any) => error)
}

// 跳转之前
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    store.dispatch('LOGIN_OUT')
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    Api.GetMyAdminRole().then((res: any) => {
      if (res.data) {
        next({
          name: 'index' // 跳转到 index 页
        })
      } else {
        next({
          name: 'work' // 跳转到 index 页
        })
      }
    })
  } else if (token && to.name === 'index/index') {
    Api.GetMyAdminRole().then((res: any) => {
      if (res.data) {
        const state: any = store.state
        if (state.layout.rouls.length === 0) {
          //页面刷新
          Api.GetMyMenu().then((res: any) => {
            let parmas = {
              rouls: res.data
            }
            store.dispatch('UPDATE_LAYOUY_STATE', parmas)
            getAsyncRoute()
            next()
          })
        } else {
          next() // 跳转
        }
      } else {
        next({
          name: 'work' // 跳转到 index 页
        })
      }
    })
  } else {
    if (token) {
      const state: any = store.state
      if (state.layout.rouls.length === 0) {
        //页面刷新
        Api.GetMyMenu().then((res: any) => {
          let parmas = {
            rouls: res.data
          }
          store.dispatch('UPDATE_LAYOUY_STATE', parmas)
          getAsyncRoute()
          next(to.path)
        })
      } else {
        next() // 跳转
      }
    } else {
      next({
        name: LOGIN_PAGE_NAME
      })
    }
  }
})

// 跳转之后
router.afterEach(to => {})

export default router
