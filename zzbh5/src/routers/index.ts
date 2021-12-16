import React from 'react'
import {
  Home,
} from '../pages'
import baseRouters from './base'

export type RouterType = {
  path: string,
  component: React.LazyExoticComponent<any>,
  root: string[],
  notExect?: boolean,
}

const HomeRouter: RouterType = {
  path: '/home/:type?',
  component: Home,
  root: [],
}
// 总路由
const Routers: RouterType[] = ([
  HomeRouter,
  ...baseRouters
])

export {
  Routers
}