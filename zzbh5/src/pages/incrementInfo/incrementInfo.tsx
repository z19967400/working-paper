import "./incrementInfo.less"
import React from 'react'
import Header from '../../components/Header/nav-header'
import {GetServiceDetails} from '../../api/https'
import {Toast} from "antd-mobile"
import Steps from '../../components/steps/steps2'
import Alert from '../../components/Toast/Alert4'

interface StateFace{
  case_progress:string
  title:string
  list:any
  show:boolean
  text:string
  quoted_price:any
  infoData:any
}

class incrementInfo extends React.Component<any,StateFace>{
  constructor(props:any){
    super(props)
    this.state={
      case_progress:"",
      title:"",
      quoted_price:"",
      infoData:{},
      list:[
        {
          completion_time: "",
          create_time: "",
          estimated_time:"1个工作日内",
          execution_status: 0,
          f_sort: 0,
          from_name: "委托审核",
          id: this.props.match.params.debtor_number,
          interval_days: 7,
          matters_id: "70584fe0444a45f691197e184d57ceb2",
          status: 0,
          time: null,
          type: -1
        },
        {
          id: "",
          matters_id: "",
          from_name: "确认报价",
          f_sort: 0,
          estimated_time: "3个工作日内",
          interval_days: 3,
          completion_time: "",
          execution_status: -1,
          status: 0,
          create_time: "2020-11-03T14:53:54.67",
          time: null,
          type: -2
        },
        {
          id: "",
          matters_id: "a58a24b752dc4bf4ba6197faf3ced4be",
          from_name: "执行中",
          f_sort: 0,
          estimated_time: "7个工作日内",
          interval_days: 3,
          completion_time: "",
          execution_status: -1,
          status: 0,
          create_time: "2020-11-03T14:53:54.67",
          time: null,
          contract_sign_method:0,
          type:-3,
        },
        {
          id: "",
          matters_id: "a58a24b752dc4bf4ba6197faf3ced4be",
          from_name: "结束",
          f_sort: 0,
          estimated_time: "1个工作日内",
          interval_days: 3,
          completion_time: "",
          execution_status: -1,
          status: 0,
          create_time: "2020-11-03T14:53:54.67",
          time: null,
          contract_sign_method:0,
          type: -3,
        }
      ],
      show:false,
      text:""
    }
  }
  render(){
    const {list,show,text} = this.state
    return(
      <div className="incrementInfo">
        <Header number={this.props.match.params.number} status={this.state.case_progress} name={this.state.title}></Header>
        <div className="content">
        <Steps infoName={'查看详情'} list={list} openToast={this.openToast.bind(this)}></Steps>
          <div className="footer">
            <div onClick={this.goHome.bind(this)}>返回</div>
          </div>
        </div>
        <Alert title={'确认报价'} closeToast={this.closeToast.bind(this)} show={show} text={text}></Alert>
      </div>
    )
  }
  componentDidMount(){
    const type = this.props.match.params.type
    const title = type === '0'?'律师查档': type === '1'?'诉讼助资':'保全保险'
    const parmas = {
      type,
      entrust_no:this.props.match.params.number
    }
    GetServiceDetails(parmas).then((res:any) =>{
      let list = [...this.state.list]
      if (res.state) {
        if (res.data.execution_progress === '待审核') {
          list[0].execution_status = 0
        }else if(res.data.execution_progress === '确认报价'){
          list[1].execution_status = 1
          list[1].execution_status = 0
        }else if(res.data.execution_progress === '执行中'){
          list[0].execution_status = 1
          list[1].execution_status = 1
          list[2].execution_status = 0
        }else if(res.data.execution_progress === '结束'){
          list[0].execution_status = 1
          list[1].execution_status = 1
          list[2].execution_status = 1
          list[3].execution_status = 1
        }
        this.setState({
          title,
          case_progress:res.data.execution_progress,
          quoted_price:res.data.quoted_price,
          list,
          infoData:res.data
        })
      } else {
        Toast.fail(res.msg)
      }
    })
   
  }
  //打开任务弹窗
  openToast(content:any){
    if (content.type === -1) {
      const type = this.props.match.params.type
       const title = type === '0'?'律师查档': type === '1'?'诉讼助资':'保全保险'
      let infodata = this.state.infoData
      infodata['type'] = title
      this.props.history.push({
        pathname:'/incrementInfoPenle',
        state:this.state.infoData
      })
    }else if(content.type === -2){
      if (content.execution_status !== -1) {
        let tt = `服务费：${this.state.quoted_price} 元`
        this.setState({
          show:true,
          text:tt
        })
      } else {
        Toast.offline('报价尚未完成')
      }
    }else{
      return false
    }
  }
  //关闭任务弹窗
  closeToast(){
    this.setState({
      show:false
    })
  }
  //返回
  goHome(){
    this.props.history.push('/home');
  }
}

export default incrementInfo