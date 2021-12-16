import React from 'react'
import './lawyerCase.less'
import Header from '../../components/Header/nav-header'
import Steps from '../../components/steps/steps2'
import Alert from '../../components/Toast/Alert2'
import {getLawyerCaseMatters,StopOrder,GetLawyerCaseStatus,GetCaseCourt,GetCaseMattersFromDetails,ContractNotice,ContractSee} from '../../api/https'
import { Toast } from 'antd-mobile';
import Alert1 from '../../components/Toast/Alert3'
import Offer from '../../components/offer/offer'

interface lawyertype{
  lawyer_name:string
  lawyer_phone_number:string
  lawyer_email:string
  law_firm_name:string
  expertise:string
  brief_introduction:string
}
interface CaseInfoStates{
  title:string
  show:boolean
  show2:boolean
  show3:boolean
  text:string,
  list:any,
  lawyers:lawyertype
  customer:any
  judge:any
  alertData:any
  formInfo:any
  case_progress:string
}
class CaseInfo extends React.Component<any,CaseInfoStates>{
  constructor(props:any){
    super(props)
    this.state = {
      title:'向XXX的催收',
      show:false,
      show2:false,
      show3:false,
      text:"",
      case_progress:"",
      list:[
        {
          completion_time: "",
          create_time: "",
          estimated_time:"3个工作日内",
          execution_status: 0,
          f_sort: 0,
          from_name: "委托确认",
          id: this.props.match.params.debtor_number,
          interval_days: 7,
          matters_id: "70584fe0444a45f691197e184d57ceb2",
          status: 0,
          time: null,
          type: 0
        },
        {
          id: "",
          matters_id: "",
          from_name: "分配律师",
          f_sort: 0,
          estimated_time: "3个工作日内",
          interval_days: 3,
          completion_time: "",
          execution_status: -1,
          status: 0,
          create_time: "2020-11-03T14:53:54.67",
          time: null,
          type: 1
        },
        {
          id: "",
          matters_id: "a58a24b752dc4bf4ba6197faf3ced4be",
          from_name: "签订法律服务合同",
          f_sort: 0,
          estimated_time: "3个工作日内",
          interval_days: 3,
          completion_time: "",
          execution_status: -1,
          status: 0,
          create_time: "2020-11-03T14:53:54.67",
          time: null,
          contract_sign_method:0,
          type: 2,
          file:""
        }
      ],
      lawyers:{
        lawyer_name:'',
        lawyer_phone_number:'',
        lawyer_email:'',
        law_firm_name:'',
        expertise:'',
        brief_introduction:''
      },
      customer:{},
      judge:{},
      alertData:{
        title:"",
        data:{}
      },
      formInfo:{
        title:"",
        daata:[]
      }
    }
  }
  render (){
    const {title,show,list,alertData,formInfo,show2,show3} = this.state
    return(
      <div className="lawyerCase">
        <Header number={this.props.match.params.debtor_number} status={this.state.case_progress} name={title}></Header>
        <div className="nav">
          <span onClick={this.getLawyerState.bind(this)}>律师</span>
          <span onClick={this.openCustomer.bind(this)}>客服</span>
          <span onClick={this.openGudge.bind(this)}>法院</span>
        </div>
        <div className='content'>
          <Steps infoName={'查看详情'} list={list} openToast={this.openToast.bind(this)}></Steps>
          <div className="footer">
            <div onClick={this.goHome.bind(this)}>返回</div>
          </div>
        </div>
        <Alert closeToast={this.closeToast.bind(this)} title={alertData.title} show={show} data={alertData.data}></Alert>
        <Alert1 closeToast={this.closeToast.bind(this)} title={formInfo.title} show={show2} text={formInfo.data || []}></Alert1> 
        <Offer hide={this.hide.bind(this)}  debtor_number={this.props.match.params.debtor_number}  show={show3}></Offer>
      </div>
    )
  }
  //初始化
  componentDidMount(){
    this.getInfo()
  }
  //获取AI律师函详情
  getInfo(){
    let parmas:any ={
      debtor_number:this.props.match.params.debtor_number,
      contract_type:0
    }
    let list = this.state.list
    getLawyerCaseMatters(parmas).then((res:any) =>{
      list.push.apply(list,res.data.matters_from)
      list[0].completion_time = res.data.case_time
      let case_status:string = res.data.case_overview.case_status
      list[0].execution_status = case_status === 'Case_state_0' ? 0 : case_status === 'Case_state_1'? 1 : 2
      if (res.data.lawyer.lawyer_id !== 0) {
        list[1].execution_status = 1
        list[1].completion_time= res.data.lawyer.allocated_date
      }
      if (res.data.contract != null) {
        list[2].execution_status = res.data.contract.sign_status
        list[2].completion_time= res.data.contract.sign_time	
        list[2].contract_sign_method = res.data.contract.contract_sign_method
        list[2].file = res.data.contract.contract_file_url
        list[2].id = res.data.contract.id
      }
      this.setState({
        list:list,
        title:`向${res.data.case_overview.debtor_name}的催收`,
        customer:res.data.customer_service,
        case_progress:res.data.case_overview.case_progress,
        show3:res.data.case_overview.case_status === 'Case_state_1'
      })
    })
  }
  //打开任务弹窗
  openToast(content:any){
    console.log(content);
    if (content.type === 0) { //确认案件
      this.props.history.push(`/LawyerCaseInfo/${this.props.match.params.debtor_number}`)
    } else if (content.type === 1) { //分配律师
      if (content.execution_status === 1) {
        this.getLawyerState()
      } else {
        Toast.offline('暂无接案律师',2)
      }
    }else if(content.type === 2){ //签订合同
      if (content.execution_status === -1) { //合同准备中
        Toast.offline('合同尚未准备好',2)
      } else if(content.execution_status === 0) { //待签署 点击签署
        if (content.contract_sign_method === 0) { //线上签署
          ContractNotice(content.id).then((res:any) =>{
            if (res.state) {
              Toast.success(res.msg,2)
            } else {
              Toast.offline(res.msg,2)
            }
          })
        }
        //线下必定是已签署
      }else{ //已签署 点击查看
        if (content.contract_sign_method === 0){//线上签署查看
          ContractSee(content.id).then((res:any) =>{
            if (res.state) {
              window.open(res.data)
            } else {
              Toast.offline(res.msg,2)
            }
          })
        }else{ //线下签署查看
          window.open(content.file)
        }
      }
    }else{
     if (content.execution_status === 1) {
      this.getFormInfo(content.id)
     } else {
      Toast.offline('这一步尚未完成哦',2)
     }
    } 
  }
  //关闭任务弹窗
  closeToast(){
    this.setState({
      show:false,
      show2:false
    })
  }
  //停止委托
  stop(){
    let parmas = {
      debtor_number:this.props.match.params.debtor_number,
      type:1
    }
    StopOrder(parmas).then((res:any) =>{  
      if (res.state) {
        Toast.success(res.msg,1)
        setTimeout(() => {
          // this.props.history.push('/home')
          this.getInfo()
        }, 500);
      } else {
        Toast.fail(res.msg,1)
      }
    })  
  }
  //获取律师结案状态
  getLawyerState(){
    GetLawyerCaseStatus(this.props.match.params.debtor_number).then((res:any) =>{
      if (res.data.length > 0) {
        let lawyers:any = Object.assign({},this.state.lawyers)
        let alertData = this.state.alertData
        Object.keys(lawyers).forEach((key:string) =>{
          lawyers[key] = res.data[0][key]
        })
        alertData.title = '律师信息'
        alertData.data = lawyers
        this.setState({
          alertData,
          show:true,
          lawyers
        })
      } else {
        Toast.offline('暂无接案律师',2)
      }
    })
  }
  //打开客服信息
  openCustomer(){
    if (this.state.customer.cs_name === null) {
      Toast.offline('暂未分配客服',2)
      return false
    }
    let alertData = this.state.alertData
    alertData.title = '客服信息'
    alertData.data = Object.assign({},this.state.customer)
    this.setState({
      alertData,
      show:true,
      judge:this.state.customer
    })
  }
  //打开法院信息
  openGudge(){
    GetCaseCourt(this.props.match.params.debtor_number).then((res:any) =>{
      if (res.data.length === 0) {
        Toast.offline('暂无法院信息',2)
        return false
      }
      let alertData = this.state.alertData
      alertData.title = '法院信息'
      alertData.data = Object.assign({},res.data[0])
      this.setState({
        alertData,
        show:true,
        judge:res.data[0]
      })
    })
  }
  //获取表单详情
  getFormInfo(id:string){
    GetCaseMattersFromDetails(id).then((res:any) =>{
      let formInfo = Object.assign({},this.state.formInfo)
      formInfo.title = '进展详情'
      formInfo.data = res.data
      this.setState({
        show2:true,
        formInfo
      })
    })
  }
  hide(){
    this.setState({
      show3:false
    })
  }
  //返回
  goHome(){
    this.props.history.push('/home');
  }
}

export default CaseInfo