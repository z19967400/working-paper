/* eslint-disable no-useless-concat */
import React from 'react'
import './offer.less'
import Demo from './Table'
import {GetQuotedPriceByDebtorNumber,CustomerSelectQuotedPrice} from '../../api/https'
import { Toast } from 'antd-mobile'
interface offerProps{
  show:boolean
  debtor_number:string
  hide:Function
}
interface DataType {
  key: React.Key;
  id:number
  service_fee_model: string;
  offer: any;
  show:boolean
}

class Offer extends React.Component<offerProps,any>{
  constructor(props:offerProps){
    super(props)
    this.state = {
      List:[],
      selectId:0,
      case_report_file:''
    }
  }
  render(){
    const {List,case_report_file} = this.state
    const {show} = this.props
    
    return(
      <div style={{display:show?'block':'none'}} className="offer">
        <div className="box">
          <span className="title">律师费模式选择</span>
          <Demo getSelect={this.getSelect.bind(this)} list={List}></Demo>
          {case_report_file!==null && <p><span onClick={this.download.bind(this)} className="download">点击下载案件评估报告</span></p>}
          <div className="footer-btn">
            <span onClick={this.determine.bind(this)}>确定</span>
            <span onClick={()=> this.props.hide()}>取消</span>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    this.getInfo()
  }
  getInfo(){
    GetQuotedPriceByDebtorNumber(this.props.debtor_number).then((res:any) =>{
      const arr:DataType[] =  [
        {
          key: '1',
          id:0,
          service_fee_model: '固定服务费',
          offer: this.ce(res.data.fixed_service_fee),
          show:res.data.display_fixed_service_fee === 1
        },
        {
          key: '2',
          id:1,
          service_fee_model: '风险服务费',
          offer: res.data.risk_service_fee+'%',
          show:res.data.display_risk_service_fee === 1
        },
        {
          key: '3',
          id:2,
          service_fee_model: '固定+风险服务费',
          offer: this.ce(res.data.fixed_risk_service_fee_fixed) +'元'+'+'+res.data.fixed_risk_service_fee_risk+'%',
          show:res.data.display_fixed_risk_service_fee === 1
        }
      ]
      let arr2:any = arr.filter((item:DataType) =>{return item.show})
      this.setState({
        List:arr2,
        case_report_file:res.data.case_report_file
      })
    })
    
  }
  ce(num: number) {
    return (
      num &&
      (num.toString().indexOf('.') !== -1
        ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ','
          })
        : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
            return $1 + ','
          }))
    )
  }
  getSelect(val:number){
    this.setState({
      selectId:val
    })
  }
  determine(){
    const parmas:any ={
      debtor_number:this.props.debtor_number,
      customer_select:this.state.selectId
    }
    CustomerSelectQuotedPrice(parmas).then((res:any) =>{
      if (res.state) {
        this.props.hide('ok')
      } else {
        Toast.info(res.msg)
      }
    })
    
  }
  download(){
    let path: any = this.state.case_report_file;
    if (path.indexOf("http") === -1) {
      window.location.href = "https://file.debteehelper.com" + path;
    } else {
      window.location.href = path
    }
  }
}

export default Offer