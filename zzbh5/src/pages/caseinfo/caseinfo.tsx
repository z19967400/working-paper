import React from 'react'
import './caseInfo.less'
import Header from '../../components/Header/nav-header'
import Steps from '../../components/steps/steps'
import Alert from '../../components/Toast/Alert'

import {
  getOrderInfo,
  StopOrder,
  GetTaskContentById,
  GetAILawyerLetterReport,
  GenerateReport,
  GetLogisticsByDebtorNumber
} from '../../api/https'
import { Toast } from 'antd-mobile';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;


interface CaseInfoStates{
  title:string
  show:boolean
  text:string,
  alertTitle:string
  btnText:string
  list:any,
  execution_progress:string
  executing_states:string
  reportBtnText:string
  record:any,
  feedback_total:number|undefined,
  logistics:any
}
class CaseInfo extends React.Component<any,CaseInfoStates>{
  constructor(props:any){
    super(props)
    this.state = {
      title:'向XXX的催收',
      show:false,
      text:"",
      alertTitle:'',
      btnText:'关闭',
      list:[],
      execution_progress:'',
      executing_states:'',
      reportBtnText:'下载执行报告',
      logistics:{}, //律师函信息
      record:[], //物流信息
      feedback_total:undefined //债务反馈数量
    }
  }
  render (){
    const {title,show,text,list,execution_progress,alertTitle,btnText,reportBtnText,record,feedback_total} = this.state
    return(
      <div className="caseInfo">
        <Header openToast2={this.openToast2.bind(this)} number={this.props.match.params.debtor_number} status={execution_progress} name={title}></Header>
        <div className='content'>
          <Steps infoName={'查看详情'} toFeekback={this.toFeekback.bind(this)} list={list} feedback_total={feedback_total} openToast={this.openToast.bind(this)}></Steps>
          <div className="footer">
            { execution_progress === '已完成' || execution_progress === '已终止' || execution_progress === '执行中' || execution_progress === '待审核' ?  <div onClick={this.Report.bind(this)}>{reportBtnText}</div>:'' }
            { execution_progress === '执行中' && <span className='xian'></span> }
            { execution_progress === '执行中' && <div onClick={() =>
              alert('提示', '终止执行后不可恢复，是否确认终止?', [
                { text: '取消', onPress: () => console.log('取消') },
                { text: '确定', onPress: () => this.stop() },
              ])
              } >终止</div>}
              { execution_progress === '已撤销' || execution_progress === '审核未通过' ? <div onClick={this.goHome.bind(this)}>返回</div>:''}
          </div>
        </div>
        <Alert closeToast={this.closeToast.bind(this)} record={record} title={alertTitle} btnText={btnText} show={show} text={text}></Alert>
      </div>
    )
  }
  componentDidMount(){
    this.getInfo()
    this.GetLogistics()
  }
  //获取AI律师函详情
  getInfo(){
    getOrderInfo(this.props.match.params.debtor_number).then((res:any) =>{
      this.setState({
        list:res.data.task_list,
        title:`向${res.data.debtor_name}的催收`,
        execution_progress:res.data.execution_progress,
        feedback_total:res.data.feedback_total>0?res.data.feedback_total:undefined
      })
    })
  }
  //打开任务弹窗
  openToast(content:any,name:string){
      const parmas:any = {
        debtor_number:this.props.match.params.debtor_number,
        task_id:content.task_id
      }
      GetTaskContentById(parmas).then((res:any) =>{
        const data:any = res.data
        let cont:any = ''
        if (content.task_type === 1 || content.task_type === 6) {
           cont = `
            <div class="alertBox">
            <p><span>收信人：</span> ${data.debtor_name}</p>
            <p><span>电话号码：</span> ${data.phone_number}</p>
            <p><span>发送时间：</span> ${data.send_time}</p>
            <p><span>执行结果：</span> ${data.run_status_name}</p>
            <p><span>短信内容：</span> ${data.content}</p>
            </div>
          `
        }else if(content.task_type === 2 || content.task_type === 7){
          cont = `
            <div class="alertBox">
            <p><span>接听人：</span> ${data.debtor_name}</p>
            <p><span>电话号码：</span> ${data.phone_number}</p>
            <p><span>拨打次数：</span> ${data.call_count}</p>
            <p>
              <span>拨打时间：</span>
              <span class='timeList'>${ data.send_time.split(',').map((item:string) => {let 
                  str:string = `<span>${item}</span>` 
                  return str
                }).join('')} </span>
            </p>
            <p><span>执行结果：</span> ${data.run_status_name}</p>
            <p><span>电话内容：</span> ${data.content}</p>
            </div>
          `
        }else if(content.task_type === 5){
          cont = `
            <div class="alertBox">
            <p><span>律师函编号：</span> ${this.props.match.params.debtor_number || '暂无'}</p>
            <p><span>律师函内容：</span> <a href="${data.content}" class="btn  ${!data.content?'notClick':''}">${data.content?'点击查看':'未生成'}</a></p>
            <p><span>执行结果：</span> ${data.run_status_name || '暂无'}</p>
            <p><span>收件人姓名：</span> ${data.receiving_name || '暂无'}</p>
            <p><span>收件人电话：</span> ${data.phone_number || '暂无'}</p>
            <p><span>收件人地址：</span> ${data.receiving_address || '暂无'}</p>
            <p><span>快递公司：</span> ${data.courier_company || '暂无'}</p>
            <p><span>快递单号：</span> ${data.courier_number || '暂无'}</p>
            <p><span>快递底单：</span> <a href="${data.courier_receipt_img}" class="btn ${!data.courier_receipt_img?'notClick':''}">${data.courier_receipt_img?'点击查看':'暂未上传'}</a></p> 
            </div>
          `
        }else if(content.task_type === 3){
          cont = `
            <div class="alertBox">
              <p><span>收信人：</span> ${data.debtor_name}</p>
              <p><span>电子邮箱：</span> ${data.email}</p>
              <p><span>发送时间：</span> ${data.send_time}</p>
              <p><span>执行结果：</span> ${data.run_status_name}</p>
              <p><span>催款函内容：</span> <a href="${data.content}" class="btn ${!data.content?'notClick':''}">${data.content?'点击查看':'未生成'}</a></p>
            </div>
          `
        }else if(content.task_type === 4){
          cont = `
            <div class="alertBox">
              <p><span>收信人：</span> ${data.debtor_name}</p>
              <p><span>电子邮箱：</span> ${data.email}</p>
              <p><span>发送时间：</span> ${data.send_time}</p>
              <p><span>执行结果：</span> ${data.run_status_name}</p>
              <p><span>律师函内容：</span> <a href="${data.content}" class="btn ${!data.content?'notClick':''}">${data.content?'点击查看':'未生成'}</a></p>
            </div>
          `
        }
        this.setState({
          show:true,
          alertTitle:name,
          text:cont
        })
      })
  }
 
  //打开弹窗2
  openToast2(){
    let cont:any = `
      <div class='tips-text'>
        <p>请您知晓</p>
        <p>1.由于我们的短信、电话供应商限流，以及节假日EMS停止收件等原因，您的委托计划执行时间可能会有一定提前或延迟，请您自行留意相关案件的诉讼时效，并于每个催收项目执行结束后查看实际执行时间。</p>
        <p>2.如您需保存律师函的EMS官网物流信息，请在查询期限内自行至EMS官网<a class="link" href="https://www.ems.com.cn/">（www.ems.com.cn）</a>查询保存，债主帮的服务中不包含前述内容。</p>
        <p>如需帮助，请致电4006321918，谢谢。</p>
      </div>
    `
    this.setState({
      show:true,
      alertTitle:'提示',
      text:cont
    })
  }
  //关闭任务弹窗
  closeToast(){
    this.setState({
      show:false
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
  //返回
  goHome(){
    this.props.history.push('/home');
  }
  //生成执行报告
  generate(id:number){
    this.setState({
      reportBtnText:'生成中...'
    })
    GenerateReport(id).then((response:any) =>{
      if (response.state) {
        this.Report()
      } else {
        this.setState({
          reportBtnText:'生成失败'
        })
        Toast.fail(response.msg,1)
      }
    })
  }
  //获取执行报告
  Report(){
    if (this.state.execution_progress  === '执行中' || this.state.execution_progress  === '待审核') {
      Toast.info('执行完成后,可下载执行报告')
      return false
    }
    GetAILawyerLetterReport(this.props.match.params.debtor_number).then((res:any) =>{
      if (res.state) {
       if (res.data.report_status === 1) { //成功生成
        this.setState({
          reportBtnText:'下载执行报告'
        })
         window.location.href = res.data.report_file
       } else if(res.data.report_status === 0) { //生成中   
         setTimeout(() => {
          this.Report()
         }, 200);
       }else if(res.data.report_status === -1){ //待生成
        this.generate(res.data.id)
       }else{ //失败
        this.setState({
          reportBtnText:'生成失败'
        })
        Toast.fail(res.msg,1)
       }
      } else {
        Toast.fail(res.msg,1)
      }
    })
   
  }
  //获取律师函快递进度
  GetLogistics(){
    GetLogisticsByDebtorNumber(this.props.match.params.debtor_number).then((res:any)=>{
      this.setState({
        record:res.data.record,
        logistics:res.data.logistics
      })
    })
  }
  //跳转债务反馈
  toFeekback(){
    this.props.history.push(`/Feekback/${this.props.match.params.debtor_number}`)
  }
}

export default CaseInfo