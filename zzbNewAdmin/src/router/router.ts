/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

const layout = () => import('@/views/layout/layout.vue') //第三级
const About = () => import('@/views/About/About.vue') //第二级

//无需权限的公共路由
export const routes = [
  {
    path: '/login',
    name: 'login',
    ismenu: false,
    component: () => import('@/views/login/login.vue'),
    meta: {
      icon: '',
      keepAlive: false,
      title: 'login'
    }
  },
  {
    path: '/',
    name: 'index',
    ismenu: false,
    component: About,
    redirect: '/index',
    meta: {
      icon: 'el-icon-s-home',
      keepAlive: false,
      title: '后台首页',
      index: '1-1',
      isBread: false
    },
    children: [
      {
        path: '/',
        name: 'index',
        ismenu: false,
        component: layout,
        redirect: '/index',
        meta: {
          icon: 'el-icon-s-home',
          keepAlive: false,
          title: '后台首页',
          index: '1-1',
          isBread: false
        },
        children: [
          {
            path: '/index',
            name: 'index/index',
            ismenu: false,
            component: () => import('@/views/index/index.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '首页',
              index: '1-1-1',
              isBread: true
            }
          },
          {
            path: '/work',
            name: 'work',
            ismenu: false,
            component: () => import('@/views/work/work.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '首页',
              index: '1-1-2',
              isBread: true
            }
          }
        ]
      }
    ]
  }
]

//需要权限的路由
export const asyncRoute = [
  //平台管理
  {
    path: '/platform',
    name: 'platform',
    ismenu: true,
    component: About,
    redirect: '/admin',
    meta: {
      icon: 'el-icon-s-marketing',
      keepAlive: false,
      title: '平台管理',
      index: '2',
      isBread: false
    },
    children: [
      //员工管理
      {
        path: '/admin',
        name: 'admin',
        ismenu: true,
        component: layout,
        redirect: '/admin/adminList',
        meta: {
          keepAlive: false,
          title: '员工管理',
          index: '2-1',
          isBread: false
        },
        children: [
          //员工账号列表
          {
            path: '/admin/adminList',
            name: 'admin/adminList',
            ismenu: true,
            component: () => import('@/views/admin/admin.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '账号管理',
              index: '2-1-1',
              isBread: true
            }
          },
          //通知列表
          {
            path: '/admin/notice',
            name: 'admin/notice',
            ismenu: false,
            component: () => import('@/views/admin/notice.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '通知',
              index: '2-1-2',
              isBread: true
            }
          }
        ]
      },
      //平台设置
      {
        path: '/settings',
        name: 'settings',
        ismenu: true,
        component: layout,
        redirect: '/settings/roleList',
        meta: {
          keepAlive: false,
          title: '平台设置',
          index: '2-2',
          isBread: false
        },
        children: [
          //菜单设置
          {
            path: '/settings/menuSetting',
            name: 'settings/menuSetting',
            ismenu: false,
            component: () =>
              import('@/views/settings/menuSetting/menuSetting.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '菜单设置',
              index: '2-2-0',
              isBread: true
            }
          },
          //角色权限列表
          {
            path: '/settings/roleList',
            name: 'settings/roleList',
            ismenu: true,
            component: () => import('@/views/settings/role/roleList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '角色权限',
              index: '2-2-1',
              isBread: true
            }
          },
          //角色权限设置
          {
            path: '/settings/rouleEdit/:id',
            name: 'settings/rouleEdit',
            ismenu: false,
            component: () => import('@/views/settings/role/roleEdit.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '权限编辑',
              index: '2-2-1',
              isTag: false,
              isBread: true
            }
          },
          //办案流程
          {
            path: '/settings/processList',
            name: 'settings/processList',
            ismenu: true,
            component: () =>
              import('@/views/settings/caseProcess/processList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '办案流程',
              index: '2-2-2',
              isBread: true
            }
          },
          //流程修改，添加
          {
            path: '/settings/processEdit',
            name: 'settings/processEdit',
            ismenu: false,
            component: () =>
              import('@/views/settings/caseProcess/processEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '流程编辑',
              index: '2-2-2',
              isTag: false,
              isBread: true
            }
          },
          //表单设置
          {
            path: '/settings/fromList',
            name: 'settings/fromList',
            ismenu: true,
            component: () => import('@/views/settings/form/fromList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '表单设置',
              index: '2-2-3',
              isBread: true
            }
          },
          //表单详情
          {
            path: '/settings/fromInfo',
            name: 'settings/fromInfo',
            ismenu: false,
            component: () => import('@/views/settings/form/fromInfo.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '表单详情',
              index: '2-2-3',
              isTag: false,
              isBread: true
            }
          },
          //提示管理
          {
            path: '/settings/tipsList',
            name: 'settings/tipsList',
            ismenu: true,
            component: () => import('@/views/settings/tipsManage/tipsList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '提示管理',
              index: '2-2-4',
              isBread: true
            }
          },
          //字典管理
          {
            path: '/settings/dictionaries',
            name: 'settings/dictionaries',
            ismenu: true,
            component: () =>
              import('@/views/settings/dictionaries/dictionaries.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '字典管理',
              index: '2-2-5',
              isBread: true
            }
          },
          //字典详情
          {
            path: '/settings/dictionariesInfo',
            name: 'settings/dictionariesInfo',
            ismenu: false,
            component: () =>
              import('@/views/settings/dictionaries/dictionariesInfo.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '字典详情',
              index: '2-2-5',
              isTag: false,
              isBread: true
            }
          },
          //地区管理
          {
            path: '/settings/region',
            name: 'settings/region',
            ismenu: true,
            component: () => import('@/views/settings/region/region.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '地区管理',
              index: '2-2-6',
              isBread: true
            }
          },
          //币种管理
          {
            path: '/settings/currency',
            name: 'settings/currency',
            ismenu: true,
            component: () => import('@/views/settings/currency/currency.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '币种管理',
              index: '2-2-7',
              isBread: true
            }
          },
          //新闻管理
          {
            path: '/settings/news',
            name: 'settings/news',
            ismenu: true,
            component: () => import('@/views/settings/news/news.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '通知管理',
              index: '2-2-8',
              isBread: true
            }
          },
          //新闻修改
          {
            path: '/settings/newEdit',
            name: 'settings/newEdit',
            ismenu: false,
            component: () => import('@/views/settings/news/newEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '通知编辑',
              index: '2-2-8',
              isTag: false,
              isBread: true
            }
          },
          //常见问题
          {
            path: '/settings/problem',
            name: 'settings/problem',
            ismenu: true,
            component: () => import('@/views/settings/problem/problem.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '常见问题',
              index: '2-2-9',
              isBread: true
            }
          },
          //常见问题修改
          {
            path: '/settings/problemEdit',
            name: 'settings/problemEdit',
            ismenu: false,
            component: () => import('@/views/settings/problem/problemEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '问题编辑',
              index: '2-2-9',
              isTag: false,
              isBread: true
            }
          }
        ]
      },
      //模板管理
      {
        path: '/module',
        name: 'module',
        ismenu: true,
        component: layout,
        redirect: '/module/message',
        meta: {
          keepAlive: false,
          title: '模板管理',
          index: '2-3',
          isBread: false
        },
        children: [
          //短信模板
          {
            path: '/Template/shortMessage',
            name: 'Template/shortMessage',
            ismenu: true,
            component: () =>
              import('@/views/Template/shortMessage/shortMessage.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '短信模板',
              index: '2-3-1',
              isBread: true
            }
          }, //电话模板
          {
            path: '/Template/telephone',
            name: 'Template/telephone',
            ismenu: true,
            component: () => import('@/views/Template/telephone/telephone.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '电话模板',
              index: '2-3-2',
              isBread: true
            }
          },
          //邮件模板
          {
            path: '/Template/email',
            name: 'Template/email',
            ismenu: true,
            component: () => import('@/views/Template/email/email.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '邮件模板',
              index: '2-3-3',
              isBread: true
            }
          },
          //邮件编辑修改
          {
            path: '/Template/emailEdit',
            name: 'Template/emailEdit',
            ismenu: false,
            component: () => import('@/views/Template/email/emailEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '邮件模板编辑',
              index: '2-3-3',
              isTag: false,
              isBread: true
            }
          },
          //pdf模板
          {
            path: '/Template/pdf',
            name: 'Template/pdf',
            ismenu: true,
            component: () => import('@/views/Template/pdf/pdf.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师函模板',
              index: '2-3-4',
              isBread: true
            }
          },
          //pdf模板修改
          {
            path: '/Template/pdfEdit',
            name: 'Template/pdfEdit',
            ismenu: false,
            component: () => import('@/views/Template/pdf/pdfLogEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师函模板编辑',
              index: '2-3-4',
              isTag: false,
              isBread: true
            }
          },
          //excell模板
          {
            path: '/Template/excell',
            name: 'Template/excell',
            ismenu: true,
            component: () => import('@/views/Template/excell/excell.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: 'excell模板',
              index: '2-3-5',
              isBread: true
            }
          },
          //excel详情编辑
          {
            path: '/Template/excellInfo',
            name: 'Template/excellInfo',
            ismenu: false,
            component: () => import('@/views/Template/excell/excellInfo.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: 'excell模板编辑',
              index: '2-3-5',
              isTag: false,
              isBread: true
            }
          },
          //weChat模板
          {
            path: '/Template/weChat',
            name: 'Template/weChat',
            ismenu: true,
            component: () => import('@/views/Template/weChat/weChat.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '微信模板',
              index: '2-3-6',
              isBread: true
            }
          },
          //模板测试
          {
            path: '/Template/test',
            name: 'Template/test',
            ismenu: true,
            component: () => import('@/views/Template/test/test.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '模板测试',
              index: '2-3-7',
              isBread: true
            }
          }
        ]
      },
      //平台监控
      {
        path: '/monitor',
        name: 'monitor',
        ismenu: true,
        component: layout,
        redirect: '/monitor/sever',
        meta: {
          keepAlive: false,
          title: '平台监控',
          index: '2-4',
          isBread: false
        },
        children: [
          //服务管理
          {
            path: '/monitor/sever',
            name: 'monitor/sever',
            ismenu: true,
            component: () => import('@/views/monitor/sever/sever.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '服务管理',
              index: '2-4-1',
              isBread: true
            }
          },
          //队列管理
          {
            path: '/monitor/queue',
            name: 'monitor/queue',
            ismenu: true,
            component: () => import('@/views/monitor/queue/queue.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '队列管理',
              index: '2-4-2',
              isBread: true
            }
          },
          //队列详情
          {
            path: '/monitor/queueInfo',
            name: 'monitor/queueInfo',
            ismenu: false,
            component: () => import('@/views/monitor/queue/queueInfo.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '队列详情',
              index: '2-4-2',
              isTag: false,
              isBread: true
            }
          },
          //员工日志
          {
            path: '/monitor/staffLog',
            name: 'monitor/staffLog',
            ismenu: true,
            component: () => import('@/views/monitor/staffLog/staffLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '员工日志',
              index: '2-4-3',
              isBread: true
            }
          },
          //用户日志
          {
            path: '/monitor/userLog',
            name: 'monitor/userLog',
            ismenu: true,
            component: () => import('@/views/monitor/userLog/userLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '用户日志',
              index: '2-4-4',
              isBread: true
            }
          },
          //短信日志
          {
            path: '/monitor/smsLog',
            name: 'monitor/smsLog',
            ismenu: true,
            component: () => import('@/views/monitor/smsLog/smsLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '短信日志',
              index: '2-4-5',
              isBread: true
            }
          },
          //电话日志
          {
            path: '/monitor/phoneLog',
            name: 'monitor/phoneLog',
            ismenu: true,
            component: () => import('@/views/monitor/phoneLog/phoneLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '电话日志',
              index: '2-4-6',
              isBread: true
            }
          },
          //邮件日志
          {
            path: '/monitor/emailLog',
            name: 'monitor/emailLog',
            ismenu: true,
            component: () => import('@/views/monitor/emailLog/emailLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '邮件日志',
              index: '2-4-7',
              isBread: true
            }
          },
          //pdf生成日志
          {
            path: '/monitor/pdfLog',
            name: 'monitor/pdfLog',
            ismenu: true,
            component: () => import('@/views/monitor/pdfLog/pdfLog.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: 'pdf生成日志',
              index: '2-4-8',
              isBread: true
            }
          }
        ]
      },
      //平台文档
      {
        path: '/api',
        name: 'api',
        ismenu: true,
        component: layout,
        redirect: '/api/index',
        meta: {
          keepAlive: false,
          title: '平台文档',
          index: '2-5',
          isBread: false
        },
        children: [
          //接口文档列表
          {
            path: '/api/index',
            name: 'api/Index',
            ismenu: true,
            component: () => import('@/views/api/api.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '接口',
              index: '2-5-1',
              isBread: true
            }
          },
          //接口编辑
          {
            path: '/api/edit',
            name: 'api/edit',
            ismenu: false,
            component: () => import('@/views/api/apiEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '编辑',
              index: '',
              isTag: false,
              isBread: true
            }
          },
          //页面列表
          {
            path: '/web/webList',
            name: '/web/webList',
            ismenu: true,
            component: () => import('@/views/api/webList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '页面',
              index: '2-5-2',
              isBread: true
            }
          },
          //文档列表
          {
            path: '/file/file',
            name: '/file/file',
            ismenu: true,
            component: () => import('@/views/api/file.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '文档',
              index: '2-5-3',
              isBread: true
            }
          },
          //文档编辑
          {
            path: '/file/fileEdit',
            name: 'file/fileEdit',
            ismenu: false,
            component: () => import('@/views/api/fileEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '文档编辑',
              index: '2-5-3',
              isTag: false,
              isBread: true
            }
          },
          //开发任务列表
          {
            path: '/develManage/develList',
            name: '/develManage/develList',
            ismenu: true,
            component: () => import('@/views/api/develManage.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '开发管理',
              index: '2-5-4',
              isBread: true
            }
          },
          //开发任务编辑
          {
            path: '/develManage/edit',
            name: 'develManage/edit',
            ismenu: false,
            component: () => import('@/views/api/develEdit.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '开发文档编辑',
              index: '2-5-4',
              isTag: false,
              isBread: true
            }
          }
        ]
      }
    ]
  },
  //用户管理
  {
    path: '/user',
    name: 'user',
    ismenu: true,
    component: About,
    redirect: '/user',
    meta: {
      icon: 'el-icon-s-custom',
      keepAlive: false,
      title: '用户管理',
      index: '3',
      isBread: false
    },
    children: [
      //注册用户
      {
        path: '/userAdmin',
        name: 'userAdmin',
        ismenu: true,
        component: layout,
        redirect: '/userAdmin/ordinary',
        meta: {
          keepAlive: false,
          title: '注册用户',
          index: '3-1',
          isBread: false
        },
        children: [
          {
            path: '/ordinary/ordinary',
            name: 'ordinary/ordinary',
            ismenu: true,
            component: () => import('@/views/ordinary/ordinary.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '注册用户列表',
              index: '3-1-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/ordinary/ordinaryAdmin/:id',
            name: 'ordinary/ordinaryAdmin',
            ismenu: false,
            component: () => import('@/views/ordinary/info/users/user.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '普通用户管理',
              index: '3-1-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/ordinary/lawterAdmin/:id',
            name: 'ordinary/lawterAdmin',
            ismenu: false,
            component: () => import('@/views/ordinary/info/lawyers/lawyer.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师管理',
              index: '3-1-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/ordinary/VipAdmin/:id',
            name: 'ordinary/VipAdmin',
            ismenu: false,
            component: () => import('@/views/ordinary/info/Vip/VipAdmin.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: 'Vip会员管理',
              index: '3-1-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/ordinary/adminList',
            name: 'ordinary/adminList',
            ismenu: true,
            component: () => import('@/views/ordinary/adminList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '管理员列表',
              index: '3-1-2',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/ordinary/creditor',
            name: 'ordinary/creditor',
            ismenu: true,
            component: () => import('@/views/ordinary/creditor.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '债权人管理',
              index: '3-1-3',
              isTag: true,
              isBread: true
            }
          }
        ]
      },
      //律师数据
      {
        path: '/lawyer',
        name: 'lawyer',
        ismenu: true,
        component: layout,
        redirect: '/lawyer/registeredLawyer',
        meta: {
          keepAlive: false,
          title: '律师管理',
          index: '3-4'
        },
        children: [
          //认证律师
          {
            path: '/lawyer/registeredLawyer',
            name: '/lawyer/registeredLawyer',
            ismenu: true,
            component: () =>
              import('@/views/lawyer/authentication/authentication.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '平台律师',
              index: '3-4-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/lawyer/otherLawyer',
            name: '/lawyer/otherLawyer',
            ismenu: true,
            component: () => import('@/views/lawyer/bigData/bigData.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '第三方律师',
              index: '3-4-2',
              isTag: true,
              isBread: true
            }
          }
        ]
      },
      // 粉丝管理
      {
        path: '/fans',
        name: 'fans',
        ismenu: true,
        component: layout,
        redirect: '/fans/officialAccount',
        meta: {
          keepAlive: false,
          title: '微信粉丝',
          index: '3-2'
        },
        children: [
          //公众号粉丝
          {
            path: '/official/officialFance',
            name: 'official/officialFance',
            ismenu: true,
            component: () =>
              import('@/views/official/officialFance/officialFance.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '公众号粉丝',
              index: '3-2-1',
              isTag: true
            }
          },
          //小程序粉丝
          {
            path: '/official/appletFance',
            name: '/official/appletFance',
            ismenu: true,
            component: () =>
              import('@/views/official/appletFance/appletFance.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '小程序粉丝',
              index: '3-2-2',
              isTag: true
            }
          }
        ]
      },
      //申请列表
      {
        path: '/apply',
        name: 'apply',
        ismenu: true,
        component: layout,
        redirect: '/apply/applyList',
        meta: {
          keepAlive: false,
          title: '试用申请',
          index: '3-3',
          isBread: false
        },
        children: [
          //申请列表
          {
            path: '/apply/applyList',
            name: '/apply/applyList',
            ismenu: true,
            component: () => import('@/views/apply/apply.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '申请列表',
              index: '3-3-1',
              isTag: true
            }
          }
        ]
      }
    ]
  },
  //业务管理
  {
    path: '/business',
    name: 'business',
    ismenu: true,
    component: About,
    redirect: '/business',
    meta: {
      icon: 'el-icon-s-order',
      keepAlive: false,
      title: '业务管理',
      index: '4',
      isBread: false
    },
    children: [
      //AI律师函
      {
        path: '/business/LawyerLetter',
        name: 'business/LawyerLetter',
        ismenu: true,
        component: layout,
        redirect: '/LawyerLetter/entrustList',
        meta: {
          keepAlive: false,
          title: 'AI律师函',
          index: '4-1',
          isBread: false
        },
        children: [
          //委托管理
          {
            path: '/LawyerLetter/entrustList',
            name: 'LawyerLetter/entrustList',
            ismenu: true,
            component: () =>
              import('@/views/LawyerLetter/entrustedAdmin/entrustList.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '委托管理',
              index: '4-1-1',
              isTag: true,
              isBread: true
            }
          },
          //创建律师函
          {
            path: '/LawyerLetter/createAIlawyer',
            name: 'LawyerLetter/createAIlawyer',
            ismenu: false,
            component: () =>
              import(
                '@/views/LawyerLetter/entrustedAdmin/createAIlawyer/createAIlawyer.vue'
              ),
            meta: {
              icon: '',
              keepAlive: false,
              title: '创建律师函',
              index: '4-1-1',
              isTag: false,
              isBread: true
            }
          },
          {
            path: '/LawyerLetter/entrustAdmin/:id/:executing_states',
            name: 'LawyerLetter/entrustAdmin',
            ismenu: false,
            component: () =>
              import('@/views/LawyerLetter/entrustedAdmin/entrustAdmin.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '委托详情',
              index: '4-1-1',
              isTag: true,
              isBread: true
            }
          },
          //律师函管理
          {
            path: '/LawyerLetter/lawyerLetteList',
            name: 'LawyerLetter/lawyerLetteList',
            ismenu: true,
            component: () =>
              import(
                '@/views/LawyerLetter/lawyerLetterAdmin/lawyerLetteList.vue'
              ),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师函管理',
              index: '4-1-3',
              isTag: true,
              isBread: true
            }
          },
          //律师函管理
          {
            path: '/LawyerLetter/express',
            name: 'LawyerLetter/express',
            ismenu: false,
            component: () =>
              import(
                '@/views/LawyerLetter/lawyerLetterAdmin/express/express.vue'
              ),
            meta: {
              icon: '',
              keepAlive: false,
              title: '快递底单上传',
              index: '4-1-4',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/LawyerLetter/lawyerLetteInfo',
            name: 'LawyerLetter/lawyerLetteInfo',
            ismenu: false,
            component: () =>
              import(
                '@/views/LawyerLetter/lawyerLetterAdmin/lawyerLetteInfo.vue'
              ),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师函详情',
              index: '4-1-3',
              isTag: false,
              isBread: true
            }
          },
          {
            path: '/esistenteProva/esistenteProva',
            name: 'esistenteProva/esistenteProva',
            ismenu: true,
            component: () =>
              import('@/views/LawyerLetter/esistenteProva/esistenteProva.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '存证管理',
              index: '4-1-5',
              isTag: true,
              isBread: true
            }
          },
          //债务人反馈
          {
            path: '/LawyerLetter/obligorFeedback',
            name: 'LawyerLetter/obligorFeedback',
            ismenu: true,
            component: () =>
              import(
                '@/views/LawyerLetter/obligorFeedback/obligorlist/obligorlist.vue'
              ),
            meta: {
              icon: '',
              keepAlive: true,
              title: '债务人反馈',
              index: '4-1-2',
              isTag: true,
              isBread: true
            }
          }
        ]
      },
      {
        path: '/LawyersHandleCases',
        name: 'LawyersHandleCases',
        ismenu: true,
        component: layout,
        redirect: '/LawyersHandleCases/caseAdmin',
        meta: {
          keepAlive: false,
          title: '律师办案',
          index: '4-2',
          isBread: false
        },
        children: [
          //案件管理
          {
            path: '/LawyersHandleCases/caseAdmin',
            name: 'caseAdmin',
            ismenu: true,
            component: () =>
              import(
                '@/views/LawyerLetter/LawyersHandleCases/caseAdmin/index.vue'
              ),
            meta: {
              icon: '',
              keepAlive: true,
              title: '案件管理',
              index: '4-2-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/LawyersHandleCases/caseInfo/:number',
            name: 'caseInfo',
            ismenu: false,
            component: () =>
              import(
                '@/views/LawyerLetter/LawyersHandleCases/caseInfo/index.vue'
              ),
            meta: {
              icon: '',
              keepAlive: false,
              title: '案件详情',
              index: '4-2-1',
              isTag: false,
              isBread: true
            }
          },
          {
            path: '/LawyersHandleCases/create',
            name: 'create',
            ismenu: true,
            component: () => import('@/views/sass/creatLaywerCase.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '创建办案',
              index: '4-2-2',
              isTag: false,
              isBread: true
            }
          }
        ]
      },
      {
        path: '/services',
        name: 'services',
        ismenu: true,
        component: layout,
        redirect: '/services/servicesAdmin',
        meta: {
          keepAlive: false,
          title: '增值服务',
          index: '4-3',
          isBread: false
        },
        children: [
          //案件管理
          {
            path: '/services/servicesAdmin',
            name: 'servicesAdmin',
            ismenu: true,
            component: () => import('@/views/services/services.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律师查档',
              index: '4-3-1',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/services/servicesAdmin/info/:entrust_no',
            name: 'servicesInfo',
            ismenu: false,
            component: () => import('@/views/services/info/servicesInfo.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '律师查档详情',
              index: '4-3-1',
              isTag: false,
              isBread: true
            }
          },
          {
            path: '/services/servicesAdmin2',
            name: 'servicesAdmin2',
            ismenu: true,
            component: () => import('@/views/services/services2.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '诉讼助资',
              index: '4-3-2',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/services/servicesAdmin/info2/:entrust_no',
            name: 'servicesInfo2',
            ismenu: false,
            component: () => import('@/views/services/info/servicesInfo2.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '诉讼助资详情',
              index: '4-3-2',
              isTag: false,
              isBread: true
            }
          },
          {
            path: '/services/servicesAdmin3',
            name: 'servicesAdmin3',
            ismenu: true,
            component: () => import('@/views/services/services3.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '保全保险',
              index: '4-3-3',
              isTag: true,
              isBread: true
            }
          },
          {
            path: '/services/servicesAdmin/info3/:entrust_no',
            name: 'servicesInfo3',
            ismenu: false,
            component: () => import('@/views/services/info/servicesInfo3.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '诉讼助资详情',
              index: '4-3-3',
              isTag: false,
              isBread: true
            }
          }
        ]
      },
      // //债权人
      // {
      //   path: '/creditor',
      //   name: 'creditor',
      //   ismenu: true,
      //   component: layout,
      //   redirect: '/creditor/creditorList',
      //   meta: {
      //     keepAlive: false,
      //     title: '债权人',
      //     index: '4-4',
      //     isBread: false
      //   },
      //   children: [
      //     //债权人列表
      //     {
      //       path: '/creditor/creditorList',
      //       name: 'creditor/creditorList',
      //       ismenu: true,
      //       component: () =>
      //         import('@/views/LawyerLetter/creditorAdmin/creditorAdmin.vue'),
      //       meta: {
      //         icon: '',
      //         keepAlive: true,
      //         title: '债权人',
      //         index: '4-4-1',
      //         isTag: true,
      //         isBread: true
      //       }
      //     },
      //     //债权人修改/添加
      //     {
      //       path: '/creditor/addCreditor',
      //       name: 'creditor/addCreditor',
      //       ismenu: false,
      //       component: () =>
      //         import('@/views/LawyerLetter/creditorAdmin/addCreditor.vue'),
      //       meta: {
      //         icon: '',
      //         keepAlive: true,
      //         title: '债权人编辑',
      //         index: '4-4-1',
      //         isTag: false,
      //         isBread: true
      //       }
      //     }
      //   ]
      // },
      //债务人
      {
        path: '/obligor',
        name: 'obligor',
        ismenu: true,
        component: layout,
        redirect: '/creditor/obligorList',
        meta: {
          keepAlive: false,
          title: '债务人',
          index: '4-5',
          isBread: false
        },
        children: [
          {
            path: '/creditor/obligorList',
            name: 'creditor/obligorList',
            ismenu: true,
            component: () =>
              import('@/views/LawyerLetter/obligorAdmin/obligorAdmin.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '债务人管理',
              index: '4-5-1',
              isTag: true,
              isBread: true
            }
          }
        ]
      },
      //财务管理
      {
        path: '/business/finance',
        name: 'business/finance',
        ismenu: true,
        component: layout,
        redirect: '/business/memberCollection',
        meta: {
          keepAlive: false,
          title: '财务管理',
          index: '4-6',
          isBread: false
        },
        children: [
          //会员收款信息编辑
          {
            path: '/business/memberCollectionEdit',
            name: 'business/memberCollectionEdit',
            ismenu: false,
            component: () =>
              import(
                '@/views/finance/memberCollection/memberCollectionEdit.vue'
              ),
            meta: {
              icon: '',
              keepAlive: true,
              title: '',
              index: '',
              isTag: false,
              isBread: true
            }
          },
          //会员收票地址编辑
          {
            path: '/business/editadditerss',
            name: 'business/editadditerss',
            ismenu: false,
            component: () =>
              import('@/views/finance/gitinvoice/editgitinvoice.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '4-6-4',
              index: '会员收票地址编辑',
              isTag: false
            }
          },
          // 收支明细
          {
            path: '/business/inandout',
            name: 'business/inandout',
            ismenu: true,
            component: () => import('@/views/finance/inandout/inandout.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '收支明细',
              index: '4-6-1',
              isTag: true,
              isBread: true
            }
          },
          // 账单管理
          {
            path: '/business/listbill',
            name: 'business/listbill',
            ismenu: true,
            component: () => import('@/views/finance/bill/listbill.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '账单管理',
              index: '4-6-2',
              isTag: true,
              isBread: true
            }
          },
          //新增账单
          {
            path: '/business/listbill/ailist',
            name: 'business/listbill/ailist',
            ismenu: false,
            component: () =>
              import('@/views/finance/bill/ailistbill/ailistbill.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '新增账单',
              index: '4-6-2',
              isTag: true,
              isBread: true
            }
          },
          //会员开票信息管理
          {
            path: '/business/listbill/gitbillailist',
            name: 'business/listbill/gitbillailist',
            ismenu: false,
            component: () =>
              import('@/views/finance/invoice/editinvoice/editinvoice.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '会员开票信息编辑',
              index: '4-6-3',
              isTag: false,
              isBread: true
            }
          },
          //账单详情
          {
            path: '/business/listbill/getadmindata/:id',
            name: 'business/listbill/getadmindata',
            ismenu: false,
            component: () =>
              import('@/views/finance/bill/morebill/morebill.vue'),
            meta: {
              icon: '',
              keepAlive: false,
              title: '账单详情',
              index: '4-6-2',
              isTag: false,
              isBread: true
            }
          },
          //会员开票信息管理
          {
            path: '/business/invoice',
            name: 'business/invoice',
            ismenu: true,
            component: () => import('@/views/finance/invoice/invoice.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '发票信息',
              index: '4-6-3',
              isTag: true,
              isBread: true
            }
          },
          //会员收票地址管理
          {
            path: '/business/gitinvoice',
            name: 'business/gitinvoice',
            ismenu: true,
            component: () =>
              import('@/views/finance/gitinvoice/gitinvoice.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '收票信息',
              index: '4-6-4',
              isTag: true,
              isBread: true
            }
          },
          //会员收款信息管理
          {
            path: '/business/memberCollection',
            name: 'business/memberCollection',
            ismenu: true,
            component: () =>
              import('@/views/finance/memberCollection/memberCollection.vue'),
            meta: {
              icon: '',
              keepAlive: true,
              title: '律所收款信息',
              index: '4-6-5',
              isTag: true,
              isBread: true
            }
          }
        ]
      }
    ]
  }
]
