import React from 'react'
import './lawyerCaseInfo.less'
import Header from '../../components/Header/nav-header'
import {GetCaseDetails,ServiceFeeSelection,GetQuotedPriceByDebtorNumber} from '../../api/https'
import {MinusOutlined  } from '@ant-design/icons'
import { Toast, List, Radio, Modal} from 'antd-mobile';
import Offer from '../../components/offer/offer'
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
interface LawyersCaseState {
  name:string
  show:boolean
  caseInfo:any
  debtor_type:string
  case_progress:string
  value:string
  show3:boolean
}
class LawyersCase extends React.Component<any,LawyersCaseState>{
  constructor(props:any){
    super(props)
    this.state = {
      name:'案件详情',
      show:false,
      show3:false,
      value:'Case_Service_Fee_Mode_1',
      debtor_type:"", //债务人类别
      case_progress:"", //案件状态
      caseInfo:{
        //基本信息
        basic: [
          { name: "案件编号", value: "-", prop: "debtor_number", type: true },
          { name: "案件类型", value: "-", prop: "collection_scene", type: true },
          { name: "案件评级", value: "-", prop: "case_rating", type: true },
          { name: "案件评估报告", value: "", prop:"case_report_file", type: true },
          { name: "律师费模式", value: "", prop: "customer_select", type: true },
          // { name: "固定服务费", value: "", prop: "fixed_service_fee", type: false },
          // { name: "风险服务费(%)", value: "", prop: "float_service_rate", type: false },
          // { name: "固定服务费", value: "", prop: "gf_fixed_service_fee", type: false },
          // { name: "风险服务费(%)", value: "", prop: "gf_float_service_rate", type: false },
          // { name: "固定部分平台管理费", value: "-", prop: "commission_manage_rate_g", type: false },
          // { name: "风险部分平台管理费(%)", value: "-", prop: "commission_manage_rate_f", type: false }
        ],
        //债权人
        creditor: [
          { name: "委托人", value: "-", prop: "creditor_name" , type: true},
          { name: "手机号码", value: "-", prop: "phone_number" , type: true},
          { name: "电子邮箱", value: "-", prop: "email" , type: true},
          { name: "详细地址", value: "-", prop: "detailed_address", type: true },
        ],
        //债务人  企业:Creditor_states_0 个人:Creditor_states_1 通用 Creditor_states
        obligor: [
          { name: "企业名称", value: "-", prop: "debtor_name", type: "Creditor_states_0", show: false },
          { name: "负责人姓名", value: "-", prop: "contact_person", type: "Creditor_states_0", show: false },
          { name: "债务人姓名", value: "-", prop: "debtor_name", type: "Creditor_states_1", show: false },
          { name: "身份证号码", value: "-", prop: "id_card_no", type: "Creditor_states_1", show: false },
          { name: "手机号码", value: "-", prop: "phone_number", type: "Creditor_states", show: false },
          { name: "地址", value: "-", prop: "detailed_address", type: "Creditor_states", show: false },
          // { name: "电子邮箱", value: "-", prop: "email", type: "Creditor_states", show: false },
          { name: "债务币种", value: "-", prop: "currency_id", type: "Creditor_states", show: true },
          { name: "债务本金", value: "-", prop: "arrears_principal", type: "Creditor_states", show: true },
          { name: "利息/违约金/滞纳金", value: "-", prop: "arrears_interest", type: "Creditor_states", show: true },
          { name: "约定付款日期", value: "-", prop: "agreed_payment_date", type: "Creditor_states", show: true },
          { name: "担保类型", value: "-", prop: "guarantee_type", type: "Creditor_states_0", show: true },
          { name: "担保", value: "-", prop: "guarantee_type", type: "Creditor_states_1", show: true },
          { name: "债务人状态", value: "-", prop: "debtor_status", type: "Creditor_states", show: true },
          // { name: "借款方式", value: "-", prop: "borrow_money_mode", type: "Creditor_states_0", show: true },
          { name: "债务人财产线索", value: "-", prop: "property_clues", type: "Creditor_states", show: true },
          { name: "财产线索补充", value: "-", prop: "property_clues_bc", type: "Creditor_states", show: true },
          // { name: "债务确认方式", value: "-", prop: "confirmation_method", type: "Creditor_states", show: true },
          { name: "最后一次催款日期", value: "-", prop: "confirmation_date", type: "Creditor_states", show: true },
          { name: "现有证据", value: "-", prop: "available_evidence", type: "Creditor_states", show: true },
          { name: "其他证据", value: "-", prop: "other_evidence", type: "Creditor_states", show: true },
          { name: "是否存在争议", value: "-", prop: "is_dispute", type: "Creditor_states", show: true },
          { name: "案件管辖地区", value: "-", prop: "jurisdiction_01_select", prop2: 'jurisdiction_01_txt', type: "Creditor_states", show: true },
          { name: "案件管辖地区一", value: "-", prop: "jurisdiction_02_select", prop2: 'jurisdiction_02_txt', type: "Creditor_states", show: true },
          { name: "案件管辖地区二", value: "-", prop: "jurisdiction_03_select", prop2: 'jurisdiction_03_txt', type: "Creditor_states", show: true },
          { name: "委托事项", value: "-", prop: "entrusted_matters", type: "Creditor_states", show: true },
          { name: "其他委托事项", value: "-", prop: "other_entrustment", type: "Creditor_states", show: true },
          { name: "备注", value: "-", prop: "d_remarks", type: "Creditor_states", show: true }
        ],
      }
    }
  }
  render(){
    const { name,caseInfo,debtor_type,case_progress,show3 } = this.state
    return(
      <div className="LawyersCase">
        <Header name={name} status={case_progress} number={this.props.match.params.debtor_number}></Header>
        <div className='content'>
          <div className="cell">
            <div className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span className="text">基础信息</span>
            </div>
            {
              caseInfo.basic.map((item:any,index:number) =>{               
                return  item.value !== 0 && item.type &&
                  <p className="item" key={item+''+index}>
                    <span className="lebel">{item.name}</span>
                    <span className="value">
                     {
                        (() =>{
                          if (item.name === '案件评估报告') {
                            return item.value === '' ?<span>-</span> : <span onClick={this.download.bind(this,item.value)} className='download'>下载报告</span>
                          } else if(item.name === '律师费模式'){
                            return item.value ===''? <span onClick={() => this.setState({show3:true})} className="select">立即选择</span> : <span>{item.value}</span>
                          } else {
                            return <span>{item.value}</span>
                          }
                        })()}
                      
                    </span>
                  </p>
              })
            }
          </div>
          <div className="cell">
            <div className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span className="text">债权人</span>
            </div>
            {
              caseInfo.creditor.map((item:any,index:number) =>{
                return  <p className="item" key={item+''+index}>
                          <span className="lebel">{item.name}</span>
                          <span className="value">{item.value}</span>
                        </p>
              })
            }
          </div>
          <div className="cell">
            <div className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span className="text">债务人</span>
            </div>
            {
              caseInfo.obligor.map((item:any,index:number) =>{
                if (item.type === debtor_type || item.type ===  'Creditor_states' ) {
                  return  <p className="item" key={item+''+index}>
                            <span className="lebel">{item.name}</span>
                            <span className="value">{item.value}</span>
                          </p>            
                }
              })
            }
          </div>
        </div>
        <div className="footer">
          <div onClick={this.goHome.bind(this)}>返回</div>
        </div>
        <Offer hide={this.hide.bind(this)}  debtor_number={this.props.match.params.debtor_number}  show={show3}></Offer>
      </div>
    )
  }
  //初始化
  componentDidMount(){
   this.getCaseInfo()
 
  }
  //获取案件信息
  getCaseInfo(){
    GetCaseDetails(this.props.match.params.debtor_number).then((res:any) =>{
      if (res.state) {
        let caseInfo = this.state.caseInfo
        const obj:any = Object.assign(res.data.case_details,res.data.quoted_price)
        caseInfo.basic.forEach((item:any) =>{
          if (obj[item.prop] !== '' && obj[item.prop] !== null) {
            if (item.prop === 'customer_select') {
              if (res.data.quoted_price.send_customer_status === 0) {
                item.value = '-'
              }else{
                switch (obj['customer_select']) {
                  case -1: //未选择报价
                   item.value = ''
                   break;
                 case 0: //固定报价
                   item.value = `纯固定 (人民币${obj['display_fixed_service_fee']}元)` 
                   break;
                 case 1: //纯风险
                   item.value =`纯风险 (${obj['display_risk_service_fee']}%)` 
                   break;
                 case 2: //固定+风险
                   item.value = `固定+风险 (${obj['fixed_risk_service_fee_fixed']}元 + ${obj['fixed_risk_service_fee_risk']}%)`
                   break;
                 default:
                   break;
                }
              }
            }else{ 
              item.value = res.data.case_details[item.prop]
            } 
          }
        })
        if (res.data.creditor) {
          caseInfo.creditor.forEach((item:any) =>{
            if (res.data.creditor[item.prop] !== '' && res.data.creditor[item.prop] !== null) {
              item.value = res.data.creditor[item.prop]
            }
          })
        }
        if (caseInfo.obligor) {
          caseInfo.obligor.forEach((item:any) =>{
            if (res.data.debtor[item.prop] !== '' && res.data.debtor[item.prop] !== null) {
              if (item.name === '约定付款日期' || item.name === '确认日期') {
                let time:string =  res.data.debtor[item.prop]
                time = time.replace('T',' ')
                time = time.substring(0,time.lastIndexOf(":"));
                item.value = time    
              } else {
                item.value = res.data.debtor[item.prop]
              }
            
            }
          })
        }
        this.setState({
          case_progress: res.data.case_details.case_progress,
          caseInfo,
          debtor_type:res.data.debtor.debtor_type
        })
        this.GetDebtorNumber()
      }else{
        Toast.offline(res.msg,2)
      }
    
    })
  }
  //获取报告
  GetDebtorNumber(){
    GetQuotedPriceByDebtorNumber(this.props.match.params.debtor_number).then((res:any) =>{
      let caseInfo = this.state.caseInfo
      caseInfo.basic[3].value = res.data.case_report_file
      this.setState({   
        caseInfo,
      })
    })
  }
  //返回
  goHome(){
    this.props.history.push(`/lawyerCase/${this.props.match.params.debtor_number}`);
  }
  //下载报告
  download(path:string){
    if (path.indexOf("http") === -1) {
      window.location.href = "https://file.debteehelper.com" + path;
    } else {
      window.location.href = path
    }
  }
  hide(){
    this.setState({
      show3:false
    })
    this.getCaseInfo()
  }
}


export default LawyersCase