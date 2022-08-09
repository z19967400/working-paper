import { lazy } from 'react'

const Home = lazy(() =>import('./Home/Home'))
const overbooking = lazy(() =>import('./Overbooking/Overbooking'))
const error = lazy(() =>import('../components/404/404'))
const User = lazy(() =>import('./User/user'))
const Assessment = lazy(() =>import('./assessment/assessment'))
const Authentication = lazy(() => import('./authentication/authentication'))
const Pay = lazy(() =>import('./pay/pay'))
const CaseInfo = lazy(() =>import('./caseinfo/caseinfo'))
const LawyerCaseInfo =lazy(() =>import('./lawyerCaseInfo/lawyerCaseInfo'))
const MemberEdit =lazy(() =>import('./memberEdit/index'))
const payCallback = lazy(() =>import('./pay/payCallback'))
const lawyerCase = lazy(() => import('./lawyerCase/lawyerCase'))
const service = lazy(() =>import('./service/service'))
const increment = lazy(() => import('./increment/increment'))
const incrementInfo = lazy(() =>import('./incrementInfo/incrementInfo'))
const incrementInfoPenle = lazy(() =>import('./incrementInfo/incrementInfoPenle'))
const Wechat = lazy(() =>import('./wechat/index'))
const Feekback = lazy(() =>import('./feedback/feedback'))
const UserInfo = lazy(() =>import('./User/userInfo'))
export {
  Home,
  overbooking,
  error,
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
  Wechat,
  Feekback,
  UserInfo
}