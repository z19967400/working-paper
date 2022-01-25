/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

const layout = () => import("@/views/layout/layout.vue");

//无需权限的公共路由
export const routes = [
  {
    path: "/login",
    name: "login",
    ismenu: false,
    component: () => import("@/views/login/login.vue"),
    meta: {
      icon: "",
      keepAlive: false,
      title: "login"
    }
  },
  {
    path: "/pay",
    name: "pay",
    ismenu: false,
    component: () => import("@/views/pay/Alipay.vue"),
    meta: {
      icon: "",
      keepAlive: false,
      title: "pay"
    }
  },
  {
    path: "/debtFeedback/:id",
    name: "debtFeedback",
    ismenu: false,
    component: () => import("@/views/debtFeedback/index.vue"),
    meta: {
      icon: "",
      keepAlive: false,
      title: "债务反馈"
    }
  },
  {
    path: "/",
    name: "index",
    ismenu: true,
    component: layout,
    redirect: "/index",
    meta: {
      icon: "el-icon-house",
      keepAlive: false,
      title: "控制台首页",
      index: "1"
    },
    children: [
      {
        path: "/index",
        name: "index/index",
        ismenu: true,
        component: () => import("@/views/index/index.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "控制台首页",
          index: "1-1"
        }
      }
    ]
  },
  {
    path: "/AIlvshihan",
    name: "AIlvshihan",
    ismenu: true,
    component: layout,
    redirect: "/AIlvshihan/SendLetter",
    meta: {
      icon: "el-icon-document-copy",
      keepAlive: false,
      title: "AI律师函",
      index: "2"
    },
    children: [
      {
        path: "/AILawyerletter/SendLetter",
        name: "AILawyerletter/SendLetter",
        ismenu: true,
        component: () => import("@/views/AIlvshihan/SendLetter/index.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "发送律师函",
          index: "2-1"
        }
      },
      {
        path: "/AILawyerletter/Management",
        name: "AILawyerletter/Management",
        ismenu: true,
        component: () => import("@/views/AIlvshihan/Management/index.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "委托管理",
          index: "2-2"
        }
      }
    ]
  },
  {
    path: "/detailed",
    name: "detailed",
    ismenu: false,
    component: layout,
    meta: {
      icon: "",
      keepAlive: false,
      title: "委托详情",
      index: ""
    },
    children: [
      {
        path: "/detailed/:id",
        name: "detailed",
        ismenu: true,
        component: () =>
          import("@/views/AIlvshihan/Management/children/admin.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "委托详情",
          index: "",
          isTag: false
        }
      }
    ]
  },
  {
    path: "/LawyerLawUrging",
    name: "LawyerLawUrging",
    ismenu: true,
    component: layout,
    redirect: "/LawyerLawUrging/launchCase",
    meta: {
      icon: "el-icon-aim",
      keepAlive: false,
      title: "律师办案",
      index: "3"
    },
    children: [
      {
        path: "/LawyerLawUrging/launchCase",
        name: "launchCase",
        ismenu: true,
        component: () =>
          import("@/views/LegalCollection/launchCase/launchCase.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "发起委托",
          index: "3-1"
        }
      },
      {
        path: "/LawyerLawUrging/caseAdmin",
        name: "caseAdmin",
        ismenu: true,
        component: () =>
          import("@/views/LegalCollection/caseAdmin/caseAdmin.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "案件管理",
          index: "3-2"
        }
      },
      {
        path: "/LawyerLawUrging/caseInfo/:id",
        name: "caseInfo",
        ismenu: false,
        component: () =>
          import("@/views/LegalCollection/caseInfo/caseInfo.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "案件详情",
          index: "3-2",
          isTag: false
        }
      }
    ]
  },
  {
    path: "/consult",
    name: "consult",
    ismenu: true,
    component: layout,
    redirect: "/consult/consult",
    meta: {
      icon: "el-icon-search",
      keepAlive: false,
      title: "律师查档",
      index: "4"
    },
    children: [
      {
        path: "/consult/consult",
        name: "consult/consult",
        ismenu: true,
        component: () => import("@/views/consult/consult.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "发起委托",
          index: "4-1"
        }
      },
      {
        path: "/servicesAdmin/services",
        name: "servicesAdmin/services",
        ismenu: true,
        component: () => import("@/views/services/services.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "委托管理",
          index: "4-2"
        }
      },
      {
        path: "/servicesAdmin/servicesInfo/:entrust_no",
        name: "servicesAdmin/servicesInfo",
        ismenu: false,
        component: () => import("@/views/services/info/servicesInfo.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "委托详情",
          index: "4-2"
        }
      }
    ]
  },
  {
    path: "/litigation",
    name: "litigation",
    ismenu: true,
    component: layout,
    redirect: "/litigation/litigation",
    meta: {
      icon: "el-icon-chat-line-square",
      keepAlive: false,
      title: "诉讼助资",
      index: "5"
    },
    children: [
      {
        path: "/litigation/litigation",
        name: "litigation/litigation",
        ismenu: true,
        component: () => import("@/views/litigation/litigation.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "发起委托",
          index: "5-2"
        }
      },
      {
        path: "/servicesAdmin/services2",
        name: "servicesAdmin/services2",
        ismenu: true,
        component: () => import("@/views/services/services2.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "委托管理",
          index: "5-2"
        }
      },
      {
        path: "/servicesAdmin/servicesInfo2/:entrust_no",
        name: "servicesAdmin/servicesInfo2",
        ismenu: false,
        component: () => import("@/views/services/info/servicesInfo2.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "委托详情",
          index: "5-2"
        }
      }
    ]
  },
  {
    path: "/Preservation",
    name: "Preservation",
    ismenu: true,
    component: layout,
    redirect: "/Preservation/Preservation",
    meta: {
      icon: "el-icon-lock",
      keepAlive: false,
      title: "保全保险",
      index: "6"
    },
    children: [
      {
        path: "/Preservation/Preservation",
        name: "Preservation/Preservation",
        ismenu: true,
        component: () => import("@/views/Preservation/Preservation.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "发起委托",
          index: "6-1"
        }
      },
      {
        path: "/servicesAdmin/services3",
        name: "servicesAdmin/services3",
        ismenu: true,
        component: () => import("@/views/services/services3.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "委托管理",
          index: "6-2"
        }
      },
      {
        path: "/servicesAdmin/servicesInfo3/:entrust_no",
        name: "servicesAdmin/servicesInfo3",
        ismenu: false,
        component: () => import("@/views/services/info/servicesInfo3.vue"),
        meta: {
          icon: "",
          keepAlive: false,
          title: "委托详情",
          index: "6-2"
        }
      }
    ]
  },
  {
    path: "/creditor",
    name: "creditor",
    ismenu: true,
    component: layout,
    meta: {
      icon: "el-icon-user",
      keepAlive: false,
      title: "债权人管理",
      index: "7"
    },
    children: [
      {
        path: "/creditor",
        name: "creditor",
        ismenu: true,
        // component: () => import("@/views/creditor/index.vue"),
        component: () => import("@/views/creditor/creditorAdmin.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "债权人管理",
          index: "7-1"
        }
      },
      {
        path: "/creditordata",
        name: "creditordata",
        ismenu: false,
        component: () => import("@/views/creditor/editcedrior.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "债权人编辑",
          index: "7-2"
        }
      }
      // {
      //   path: "/creditorAdmin",
      //   name: "creditorAdmin",
      //   ismenu: true,
      //   component: () => import("@/views/creditor/creditorAdmin.vue"),
      //   meta: {
      //     icon: "",
      //     keepAlive: true,
      //     title: "债权人管理(改)",
      //     index: "4-2"
      //   }
      // }
    ]
  },
  // {
  //   path: "/account",
  //   name: "account",
  //   ismenu: false,
  //   component: layout,
  //   meta: {
  //     icon: "el-icon-receiving",
  //     keepAlive: false,
  //     title: "账户管理",
  //     index: "8"
  //   },
  //   children: [
  //     {
  //       path: "/account/index",
  //       name: "account/index",
  //       ismenu: true,
  //       component: () => import("@/views/account/index.vue"),
  //       meta: {
  //         icon: "",
  //         keepAlive: true,
  //         title: "账户管理",
  //         index: "8-1"
  //       }
  //     },
  //     {
  //       path: "/account/info/:id",
  //       name: "account/info",
  //       ismenu: false,
  //       component: () => import("@/views/account/info.vue"),
  //       meta: {
  //         icon: "",
  //         keepAlive: true,
  //         isTag: false,
  //         title: "管理员设置",
  //         index: "8-1"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/manual",
  //   name: "manual",
  //   ismenu: false,
  //   redirect: "/manual/manual",
  //   component: layout,
  //   meta: {
  //     icon: "el-icon-tickets",
  //     keepAlive: false,
  //     title: "操作手册",
  //     index: "8"
  //   },
  //   children: [
  //     {
  //       path: "/manual/manual",
  //       name: "manual/manual",
  //       ismenu: true,
  //       component: () => import("@/views/manual/manual.vue"),
  //       meta: {
  //         icon: "",
  //         keepAlive: true,
  //         title: "操作手册",
  //         index: "8-1"
  //       }
  //     }
  //   ]
  // }
  // {
  //   path: "/debtor",
  //   name: "debtor",
  //   ismenu: true,
  //   component: layout,
  //   meta: {
  //     icon: "el-icon-receiving",
  //     keepAlive: false,
  //     title: "债务人管理",
  //     index: "5"
  //   },
  //   children: [
  //     {
  //       path: "/debtor",
  //       name: "debtor",
  //       ismenu: true,
  //       component: () => import("@/views/debtor/index.vue"),
  //       meta: {
  //         icon: "",
  //         keepAlive: true,
  //         title: "债务人管理",
  //         index: "5-1"
  //       }
  //     }
  //   ]
  // },
  {
    path: "/finance",
    name: "finance",
    ismenu: true,
    component: layout,
    redirect: "/finance/detailed",
    meta: {
      icon: "el-icon-coin",
      keepAlive: false,
      title: "财务管理",
      index: "8"
    },
    children: [
      {
        path: "/finance/billManagement",
        name: "finance/billManagement",
        ismenu: true,
        component: () => import("@/views/finance/billManagement/index.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "账单管理",
          index: "8-1"
        }
      },
      {
        path: "/finance/billInfo/:id",
        name: "finance/billInfo",
        ismenu: false,
        component: () => import("@/views/finance/billManagement/info.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "账单详情",
          index: "8-1-1",
          isTag: false
        }
      },
      {
        path: "/finance/detailed",
        name: "finance/detailed",
        ismenu: true,
        component: () => import("@/views/finance/detailed/index.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "支付明细",
          index: "8-2"
        }
      },
      {
        path: "/finance/invoice",
        name: "finance/invoice",
        ismenu: true,
        component: () => import("@/views/finance/invoice/index.vue"),
        meta: {
          icon: "",
          keepAlive: true,
          title: "发票管理",
          index: "8-3"
        }
      }
      // {
      //   path: "/finance/information",
      //   name: "finance/information",
      //   ismenu: true,
      //   component: () => import("@/views/finance/information/index.vue"),
      //   meta: {
      //     icon: "",
      //     keepAlive: true,
      //     title: "财务信息",
      //     index: "7-4"
      //   }
      // }
    ]
  }
];

//需要权限的路由
export const asyncRoute = [];
