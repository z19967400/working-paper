import { 
  overbooking, 
  User,
  Assessment,
  Authentication,
  Pay,
  CaseInfo,
  LawyerCaseInfo,
  MemberEdit,
  payCallback,
  lawyerCase,
  service,
  increment,
  incrementInfo,
  incrementInfoPenle,
  Wechat
} from '../pages/index'



const baseUrl = {
  overbooking:'/overbooking/:type/:type2/:type3',
  User:'/user',
  Assessment:'/Assessment/:type/:type2',
  Authentication:'/Authentication/:type/:type2/:type3',
  Pay:'/Pay/:payNumber',
  CaseInfo:'/CaseInfo/:debtor_number',
  LawyerCaseInfo:'/LawyerCaseInfo/:debtor_number',
  MemberEdit:'/MemberEdit',
  payCallback:'/payCallback/:payNumber/:debtor_number',
  lawyerCase:"/lawyerCase/:debtor_number", //案件进度
  service:"/service",
  increment:"/increment/:type", //增值服务
  incrementInfo:"/incrementInfo/:number/:type", //增值服务进度
  incrementInfoPenle:"/incrementInfoPenle", //增值服务委托详情
  Wechat:"/Wechat/:number" //小程序中间页
}

const baseRouters = [
  {
    path:baseUrl.overbooking,
    component:overbooking,
    root:[]
  },
  {
    path:baseUrl.User,
    component:User,
    root:[]
  },
  {
    path:baseUrl.Assessment,
    component:Assessment,
    root:[]
  },
  {
    path:baseUrl.Authentication,
    component:Authentication,
    root:[]
  },
  {
    path:baseUrl.Pay,
    component:Pay,
    root:[]
  },
  {
    path:baseUrl.CaseInfo,
    component:CaseInfo,
    root:[]
  },
  {
    path:baseUrl.LawyerCaseInfo,
    component:LawyerCaseInfo,
    root:[]
  },
  {
    path:baseUrl.MemberEdit,
    component:MemberEdit,
    root:[]
  },
  {
    path:baseUrl.payCallback,
    component:payCallback,
    root:[]
  },
  {
    path:baseUrl.lawyerCase,
    component:lawyerCase,
    root:[]
  },
  {
    path:baseUrl.service,
    component:service,
    root:[]
  },
  {
    path:baseUrl.increment,
    component:increment,
    root:[]
  },
  {
    path:baseUrl.incrementInfo,
    component:incrementInfo,
    root:[]
  },
  {
    path:baseUrl.incrementInfoPenle,
    component:incrementInfoPenle,
    root:[]
  },
  {
    path:baseUrl.Wechat,
    component:Wechat,
    root:[]
  }
  
]

export default baseRouters