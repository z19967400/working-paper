import { routes, asyncRoute } from '@/router/router'
import router from './index'
import store from '@/store'
import { login } from '@/api/login'
import { filter } from 'vue/types/umd'
const About = () => import('@/views/About/About.vue') //第二级
const layout = () => import('@/views/layout/layout.vue') //第三级
export function getAsyncRoute() {
  const state: any = store.state
  const Router: Array<any> = asyncRoute
  const Route: any = router
  const rouls: any = state.layout.rouls
  let menu1: any = [] //一级菜单集合
  let menu2: any = [] //二级菜单集合
  let menu3: any = [] //三级菜单集合
  let menu1Name: string[] = [] //一级菜单名集合
  let menu2Name: string[] = [] //二级菜单名集合
  let menu3Name: string[] = [] //三级菜单名集合
  rouls.forEach((item: any) => {
    if (item.parent_id == 0) {
      menu1.push(item)
      menu1Name.push(item.menu_name)
    }
  })
  menu1.forEach((item: any) => {
    rouls.forEach((item2: any) => {
      if (item.id == item2.parent_id) {
        menu2.push(item2)
        menu2Name.push(item2.menu_name)
      }
    })
  })

  menu2.forEach((item: any) => {
    rouls.forEach((item2: any) => {
      if (item.id == item2.parent_id) {
        menu3.push(item2)
        menu3Name.push(item2.menu_name)
      }
    })
  })
  let fitRouter: any = Router
  // let fitRouter: any = list.filter((item: any) => {
  //   return menu1Name.includes(item.meta.title)
  // })
  // let fitRouter2: any = fitRouter.filter((item: any) => {
  //   item.children = item.children.filter((item2: any) => {
  //     return menu2Name.includes(item2.meta.title)
  //   })
  //   return item
  // })
  // let fitRouter3: any = fitRouter2.filter((item: any) => {
  //   item.children.filter((item2: any) => {
  //     item2.children = item2.children.filter((item3: any) => {
  //       return menu3Nmae.includes(item3.meta.title)
  //     })
  //   })
  //   return item
  // })
  fitRouter.forEach((item: any) => {
    //第一层循环
    if (!menu1Name.includes(item.meta.title)) {
      item.ismenu = false
    }
    item.children.forEach((item2: any) => {
      if (!menu2Name.includes(item2.meta.title)) {
        item2.ismenu = false
      }
      item2.children.forEach((item3: any) => {
        if (!menu3Name.includes(item3.meta.title)) {
          item3.ismenu = false
        }
      })
    })
  })
  let arr: any = fitRouter
  // let arr: any = Router
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
