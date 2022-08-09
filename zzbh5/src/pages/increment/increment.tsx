import React from 'react'
import './increment.less'
import Header from '../../components/Header/nav-header'
import Panel from '../../components/panel/panel3'
import Panel2 from '../../components/panel/panel4'
import FooterBtn from '../../components/Footer/footer-btn'
import {CreateQueryQrchives, CreateLitigationFunding, CreatePreservationInsurance,GetAddressDetails} from '../../api/https'
import { Toast } from 'antd-mobile'

interface incrementState {
  LawyerFileSearch:any
  LegalAid:any
  information:any
  Preservation:any
  parmas:any
  list:any
}

class increment extends React.Component<any,incrementState>{
  constructor(props:any){
    super(props)
    this.state = {
      LawyerFileSearch:{
        name:'律师查档',
        info:{
          name:'查档资料',
          list:[
            {label:'当事人/企业名称',value:'',isRequired:true,prop:"name",placeholder:"请填写"},
            {label:'查档地域',value:[],value2:'',isRequired:true,prop:"area",placeholder:"请选择省市区"},
            {label:'查档类型',value:'',isRequired:true,prop:"a_type",placeholder:"请选择查档类型"},
            {label:'现有资料',value:'',isRequired:true,prop:"information_01",placeholder:"请选择现有资料"},
            {label:'现有资料上传',value:'',isRequired:false,prop:"information_file",placeholder:"点击上传"}
          ],
        }
      },
      LegalAid:{
        name:"诉讼助资",
        info:{
          name:"案件资料",
          list:[
            {label:'原告',value:'',isRequired:true,prop:"plaintiff",placeholder:"请填写"},
            {label:'被告',value:'',isRequired:true,prop:"defendant",placeholder:"请填写"},
            {label:'法院/仲裁所在地',value:[],isRequired:true,prop:"seat_of_court",placeholder:"请选择省市区"},
            {label:'其他管辖地区',value:[],isRequired:false,prop:"other_jurisdictions",placeholder:"请选择省市区"},
            {label:'案件标的',value:'',isRequired:true,prop:"case_amount",placeholder:"请输入金额"},
            {label:'案件阶段',value:'',isRequired:true,prop:"case_stage",placeholder:"请选择案件阶段"},
            {label:'现有证据',value:'',isRequired:true,prop:"evidence_01",placeholder:"请选择现有证据"},
            {label:'证据资料上传',value:'',isRequired:false,prop:"evidence_file",placeholder:"点击上传"},
            {label:'债务人财产线索',value:'',isRequired:true,prop:"property_clues",placeholder:"请选择财产线索"},
            {label:'其他财产线索',value:'',isRequired:false,prop:"property_clues_explain",placeholder:"如有，请填写"},
            {label:'财产线索资料上传',value:'',isRequired:false,prop:"property_clues_file",placeholder:"点击上传"},
            {label:'案件简介',value:'',isRequired:false,prop:"case_profiles",placeholder:"如有，请填写"}
          ]
        }
      },
      Preservation:{
        name:"保全保险",
        info:{
          name:"案件资料",
          list:[
            {label:'财产保全申请人',value:'',isRequired:true,prop:"applicant",placeholder:"请填写"},
            {label:'财产保全被申请人',value:'',isRequired:true,prop:"respondent",placeholder:"请填写"},
            {label:'管辖法院所在地',value:[],isRequired:true,prop:"seat_of_court",placeholder:"请选择省市区"},
            {label:'申请保全金额',value:'',isRequired:true,prop:"application_amount",placeholder:"请输入金额"},
            {label:'现有证据',value:'',isRequired:true,prop:"evidence_01",placeholder:"请选择现有证据"},
            {label:'其他证据',value:'',isRequired:false,prop:"evidence_02",placeholder:"请输入其他证据"},
            {label:'证据资料上传',value:'',isRequired:false,prop:"evidence_file",placeholder:"点击上传"},
            {label:'债务人财产线索',value:'',isRequired:true,prop:"property_clues",placeholder:"请选择财产线索"},
            {label:'其他财产线索',value:'',isRequired:false,prop:"property_clues_explain",placeholder:"如有，请填写"},
            {label:'财产线索资料上传',value:'',isRequired:false,prop:"property_clues_file",placeholder:"点击上传"},
            {label:'案件简介',value:'',isRequired:false,prop:"case_profiles",placeholder:"如有，请填写"},
          ]
        }
      }, 
      information:{
        name:'联系人信息',
        list:[
          {label:'姓名',value:'',isRequired:true,prop:"contacts_name",placeholder:"请填写"},
          {label:'手机号码',value:'',isRequired:true,prop:"contacts_telphone",placeholder:"请填写"},
          {label:'电子邮箱',value:'',isRequired:true,prop:"contacts_email",placeholder:"请填写"},
          {label:'备注',value:'',isRequired:false,prop:"member_remarks",placeholder:"请填写"}
        ],
      },
      list:[],
      parmas:{
        quoted_price:""
      }
    }
  }
  render(){
    const type = this.props.match.params.type
    const { LawyerFileSearch,information,LegalAid,Preservation,list } = this.state
    const top = type === '1'?LawyerFileSearch:type === '2'? LegalAid : Preservation
    return(
      <div className="increment">
         <Header name={top.name}></Header>
         <div className="content">
            <Panel getData={this.getPanelSet.bind(this)} name={top.info.name} type={type} data={top.info.list}></Panel>
            {
              list.length > 0 &&
              <Panel2 getData={this.getPanelSet2.bind(this)} name={'现有资料'} data={list}></Panel2>
            }
            <Panel getData={this.getPanelSet.bind(this)} name={information.name} data={information.list}></Panel>
         </div>
         <FooterBtn next={this.next.bind(this)} name={"提交委托"}></FooterBtn>
      </div>
    )
  }
  componentDidMount(){

  }
  //获取面板组件返回的值
  getPanelSet(res:any){  
    let parmas = this.state.parmas
    let prop = res.prop
    let list:any = []
    if (prop === 'seat_of_court' || prop === 'other_jurisdictions' || prop === 'area') {
      if (res.address === '') {
        parmas[prop] = ''
      }else{
        let data = {
          country_id:3752,
          province_id:res.address[0],
          city_id:res.address[1],
          county_id:res.address[2]
        }
        GetAddressDetails(data).then((res2:any) =>{
          let address = res2.data
          parmas[prop] = `${address.country}/${address.province}/${address.city}/${address.county}`
        })
      }
      
    }else if(prop === 'case_stage'){
      parmas[prop] = res[prop].toString()
    }
      else{
      parmas[prop] = res[prop]
      if(prop === 'information_01'){
        let arr = res[prop].split(',')
        arr.forEach((item:string) =>{
          let pushData:any = ''
          if(item === '执行通知书' || item === '法院立案通知书' || item === '法院判决' || item === '法院调查令' || item === '仲裁受理通知书' || item === '当事人授权委托书'){
            pushData = {label:item,value:'有',isRequired:true,prop:item,placeholder:`请选择${item}`,type:0}
            list.push(pushData)
          }else{
            pushData = {label:item,value:'',isRequired:true,prop:item,placeholder:`请填写${item}`,type:1}
            list.push(pushData)
          }
      
        })
        this.setState({
          list
        })
      } 
    }
    this.setState({
      parmas
    })
  }
  //获取动态面板组件返回的值
  getPanelSet2(res:any){
    let list = this.state.list
    list.forEach((item:any) =>{
      if(item.prop === res.prop){
        item.value = res.value
      }
    })
    this.setState({
      list
    })
  }
  //提交委托
  next(){
    const parmas = Object.assign({},this.state.parmas)
    const type = this.props.match.params.type
    const list = this.state.list
    const arr2 = this.state.information.list
    const information = arr2.filter((item:any) =>{return item.isRequired})
    let isOk:boolean = true
    if (type === '1') {
      let value = ''
      list.forEach((item:any) =>{
        value += `${item.label}:${item.value},`
      })
      value = value.substring(0,value.length-1)
      parmas['information_01'] = value
      const LawyerFileSearch = this.state.LawyerFileSearch.info.list
      let arr =  LawyerFileSearch.filter((item:any) =>{return item.isRequired})
      let verification:any = [...arr,...information]
      verification.forEach((item:any) =>{
        if(parmas[item.prop] === '' || parmas[item.prop] === null ||  parmas[item.prop] === undefined){
          isOk = false
        }
      })
      if(isOk){
        CreateQueryQrchives(parmas).then((res:any) =>{
          if (res.state) {
            this.props.history.push(`/incrementInfo/${res.data}/${0}`)
          } else {
            Toast.fail(res.msg)
          }
        })
      }else{
        Toast.offline('请完善信息',1)
      }
    }else if(type === '2'){
      const LegalAid = this.state.LegalAid.info.list
      let arr =  LegalAid.filter((item:any) =>{return item.isRequired})
      let verification:any = [...arr,...information]
      verification.forEach((item:any) =>{
        if(parmas[item.prop] === '' || parmas[item.prop] === null ||  parmas[item.prop] === undefined){
          isOk = false
        }
      })
      if(isOk){
        CreateLitigationFunding(parmas).then((res:any) =>{
          if (res.state) {
            this.props.history.push(`/incrementInfo/${res.data}/${1}`)
          } else { 
            Toast.fail(res.msg)
          }
        })
      }else{
        Toast.offline('请完善信息',1)
      }
    }else{
      const Preservation = this.state.Preservation.info.list
      let arr =  Preservation.filter((item:any) =>{return item.isRequired})
      let verification:any = [...arr,...information]
      verification.forEach((item:any) =>{
        if(parmas[item.prop] === '' || parmas[item.prop] === null ||  parmas[item.prop] === undefined){
          isOk = false
        }
      })
      if(isOk){
        CreatePreservationInsurance(parmas).then((res:any) =>{
          if (res.state) {
            this.props.history.push(`/incrementInfo/${res.data}/${2}`)
          } else {
            Toast.fail(res.msg)
          }
        })
      }else{
        Toast.offline('请完善信息',1)
      }
    }
  }
}

export default increment