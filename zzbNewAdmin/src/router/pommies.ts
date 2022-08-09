import { routes, asyncRoute } from '@/router/router'
import router from './index'
import store from '@/store'
const About = () => import('@/views/About/About.vue') //第二级
const layout = () => import('@/views/layout/layout.vue') //第三级
export function getAsyncRoute() {
  const state: any = store.state
  const Router: Array<any> = asyncRoute
  const Route: any = router
  const rouls: any = state.layout.rouls
  let fitRouter: any = Router.filter(item => {
    return rouls.includes(item.name)
  })
  let arr: any = fitRouter
  const red: any = [
    // {
    //   path: '/404',
    //   name: '404',
    //   ismenu: false,
    //   component: About,
    //   // component: () => import('@/views/404/404.vue'),
    //   meta: {
    //     icon: '',
    //     keepAlive: true,
    //     title: '404'
    //   },
    //   children: [
    //     {
    //       path: '/404',
    //       name: '404',
    //       ismenu: false,
    //       component: () => import('@/views/404/404.vue'),
    //       meta: {
    //         icon: '',
    //         keepAlive: true,
    //         title: '首页',
    //         index: '1-1-1',
    //         isBread: true
    //       }
    //     }
    //   ]
    // },
    {
      path: '/404',
      name: '404',
      ismenu: false,
      component: About,
      redirect: '/index',
      meta: {
        icon: 'el-icon-s-home',
        keepAlive: false,
        title: '404',
        index: '',
        isBread: false
      },
      children: [
        {
          path: '/404',
          name: '404',
          ismenu: false,
          component: layout,
          redirect: '/404',
          meta: {
            icon: 'el-icon-s-home',
            keepAlive: false,
            title: '404',
            index: '',
            isBread: false
          },
          children: [
            {
              path: '/404',
              name: '404',
              ismenu: false,
              component: () => import('@/views/404/404.vue'),
              meta: {
                icon: '',
                keepAlive: false,
                title: '404',
                index: '',
                isBread: false
              }
            }
          ]
        }
      ]
    },
    {
      path: '*',
      ismenu: false,
      redirect: '404',
      meta: {
        icon: ''
      }
    }
  ]
  arr = arr.concat(red)
  let rts = Route['options']
  rts.routes = rts.routes.concat(arr)
  router.addRoutes(arr)
  let parmas: any = {
    Routers: rts.routes
  }
  store.dispatch('UPDATE_LAYOUY_STATE', parmas)
}
