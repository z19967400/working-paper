import React from 'react'
import Header from '../../components/Header/nav-header'
import Panel from '../../components/panel/panel'
import FooterBtn from '../../components/Footer/footer-btn'
import './Overbooking.less'
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AddState } from '../../store/reducers/CreateLetter';
import { CombinedState } from '../../store/reducers';
import CreateAILawyerLetter from '../../store/types/CreateAILawyerLetter'
import * as types from '../../store/action_types';
import {verifyEmall,verifyPhone} from '../../utils/common'

//store配置
const mapStateToProps = (state: CombinedState): AddState => state.CreateLetter;
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      add(parmas: CreateAILawyerLetter) {
        // payload为参数
        dispatch({ type: types.ADD, payload: parmas });
      }
    };
  };
// type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

//主组件
interface PaneData{
  label:string
  value:string|any
  value2?:string
  isRequired:boolean
  placeholder?:string
  prop:string
}
interface overbookingStates{
  title:string
  title2:string
  type:number
  debInfo:PaneData[]
  debtorInfo2:PaneData[]
  debtorInfo:PaneData[]
  debtorInfo3:PaneData[]
  debtorInfo4:PaneData[]
  parmas:any
  key:number
}
class Overbooking extends React.Component<any,overbookingStates>{
  constructor(props:any){
    super(props)
    this.state = {
      title:'企业应收',
      title2:'AI律师函',
      type:0, //1：个人，0企业
      debtorInfo:[
        {label:'债务人姓名',value:'',isRequired:true, placeholder:'请填写债务人真实姓名',prop:'debtor_name'},
        {label:'手机号码',value:'',isRequired:false, placeholder:'请填写债务人手机号码',prop:'phone_number'},
        {label:'地址',value:[],value2:'',isRequired:false,prop:'detailed_address'},
        {label:'身份证号码',value:'',isRequired:true,prop:'id_card_no'},
      ],
      debtorInfo2:[
        {label:'企业名称',value:'',isRequired:true,prop:"debtor_name"},
        {label:'负责人姓名',value:'',isRequired:false,prop:"contact_person"},
        {label:'手机号码',value:'',isRequired:false,prop:"phone_number"},
        {label:'地址',value:[],value2:'',isRequired:false,prop:"detailed_address"},
      ],
      debtorInfo3:[
        {label:'债务人姓名',value:'',isRequired:true, placeholder:'请填写债务人真实姓名',prop:'debtor_name'},
        {label:'手机号码',value:'',isRequired:true, placeholder:'请填写债务人手机号码',prop:'phone_number'},
        {label:'地址',value:[],value2:'',isRequired:true,prop:'detailed_address'},
        {label:'电子邮箱',value:'',isRequired:false,prop:"email"}
      ],
      debtorInfo4:[
        {label:'企业名称',value:'',isRequired:true,prop:"debtor_name"},
        {label:'负责人姓名',value:'',isRequired:false,prop:"contact_person"},
        {label:'手机号码',value:'',isRequired:true,prop:"phone_number"},
        {label:'地址',value:[],value2:'',isRequired:true,prop:"detailed_address"},
        {label:'电子邮箱',value:'',isRequired:false,prop:"email"}
      ],
      debInfo:[
        {label:'欠款币种',value:'人民币',isRequired:true,prop:"currency_id"},
        {label:'欠款本金',value:'',isRequired:true,prop:"arrears_principal"},
        {label:'违约金/利息/滞纳金',value:'',isRequired:false,prop:"arrears_interest"}
      ],
      parmas:{
      },
      key:0,
    }
  }
  render (){
    let {title,title2,type,debInfo,debtorInfo,debtorInfo2,debtorInfo3,debtorInfo4,key} = this.state
    return(
      <div className="Overbooking">
        <Header name={`${title2}_${title}`}></Header>
        <div className='content'>
          {
            (() =>{       
              if (type === 1) {
                // 个人
                if (title2 === '律师办案') {
                  return  <Panel getData={this.getPanelSet.bind(this)} name={'债务人信息'} data={debtorInfo} key={'debtorInfo'+key}></Panel>
                } else {
                  return  <Panel getData={this.getPanelSet.bind(this)} name={'债务人信息'} data={debtorInfo3} key={'debtorInfo'+key}></Panel>
                }   
              } else {
                // 企业
                if (title2 === '律师办案') {
                  return  <Panel getData={this.getPanelSet.bind(this)} name={'债务人信息'} data={debtorInfo2} key={'debtorInfo'+key}></Panel>
                } else {
                  return  <Panel getData={this.getPanelSet.bind(this)} name={'债务人信息'} data={debtorInfo4} key={'debtorInfo'+key}></Panel>
                }
              }
            })()
          }
          <Panel getData={this.getPanelSet.bind(this)} name={'债务详情'} data={debInfo} key={'debInfo'+key}></Panel>
        </div>
        <FooterBtn next={this.next.bind(this)} name={"下一步"}></FooterBtn>
      </div>
    )
  }
  componentDidMount(){
    let {debtorInfo,debtorInfo2,debtorInfo3,debtorInfo4,type,title2,debInfo} = this.state
    if (type === 1) {
      if (title2 === '律师办案') {
        let arr:PaneData[] = JSON.parse(JSON.stringify(debtorInfo))
        arr.forEach((item:PaneData) =>{
          if (this.props.parmas[item.prop]) {
            item.value = this.props.parmas[item.prop]
          }
        })
        this.setState({
          debtorInfo:arr,
          key:2
        })
      } else {
        let arr:PaneData[] = JSON.parse(JSON.stringify(debtorInfo3))
        arr.forEach((item:PaneData) =>{
          if (this.props.parmas[item.prop]) {
            item.value = this.props.parmas[item.prop]
          }
        })
        this.setState({
          debtorInfo3:arr,
          key:3
        })
      }
     
    } else {
      if (title2 === '律师办案') {
        let arr:PaneData[] = JSON.parse(JSON.stringify(debtorInfo2))
        arr.forEach((item:PaneData) =>{
          if (this.props.parmas[item.prop]) {
            item.value = this.props.parmas[item.prop]
          }
        })
        this.setState({
          debtorInfo2:arr,
          key:4
        })
      } else {
        let arr:PaneData[] = JSON.parse(JSON.stringify(debtorInfo4))
        arr.forEach((item:PaneData) =>{
          if (this.props.parmas[item.prop]) {
            item.value = this.props.parmas[item.prop]
          }
        })
        this.setState({
          debtorInfo4:arr,
          key:5
        })
      }
    }
    let arr2:PaneData[]=JSON.parse(JSON.stringify(debInfo))
    arr2.forEach((item:PaneData) =>{
      if (this.props.parmas[item.prop] && item.prop !== 'currency_id') {
        item.value = this.props.parmas[item.prop]
      }
    })
    this.setState({
      type:parseInt(this.props.match.params.type2),
      parmas:this.props.parmas,
      title:parseInt(this.props.match.params.type) === 0?'企业应收账款':'个人欠款',
      title2:parseInt(this.props.match.params.type3) === 0?'AI律师函':"律师办案",
      debInfo:arr2
    })
  }
  //下一步
  next(){
    const {debtorInfo4,debtorInfo3,debtorInfo2,debtorInfo,debInfo,parmas,title2} = this.state
    let isOk:boolean = true
    //企业
    if (this.state.type === 0) {
      if (title2 === '律师办案') {
        for (let index:number = 0; index < debtorInfo2.length; index++) {
          const item:PaneData = debtorInfo2[index];
          if (parmas[item.prop] === '' && item.isRequired) {
            Toast.offline('请输入'+item.label, 3);
            isOk = false      
            break;
          }
        }
      } else {
        for (let index:number = 0; index < debtorInfo4.length; index++) {
          const item:PaneData = debtorInfo4[index];
          if (parmas[item.prop] === '' && item.isRequired) {
            Toast.offline('请输入'+item.label, 3);
            isOk = false      
            break;
          }
        }
      }
    }
    //个人
    if (this.state.type === 1) {
      if (title2 === '律师办案') {
        for (let index:number = 0; index < debtorInfo.length; index++) {
          const item:PaneData = debtorInfo[index];
          if (parmas[item.prop] === '' && item.isRequired ) {
            Toast.offline('请输入'+item.label, 2);
            isOk = false
            break;
          }
        }
      } else {
        for (let index:number = 0; index < debtorInfo3.length; index++) {
          const item:PaneData = debtorInfo3[index];
          if (parmas[item.prop] === '' && item.isRequired ) {
            Toast.offline('请输入'+item.label, 2);
            isOk = false
            break;
          }
        }
      }
      
    }
    if (parmas['debtor_name'].length >= 25) {
      Toast.offline('债务人名称不得超过25个字符', 2);
      isOk = false
      return false
    }
    if (isOk) {
      for (let index:number = 0; index < debInfo.length; index++) {
        const item:PaneData = debInfo[index];
        if (item.prop === 'currency_id') {     
          if (parmas[item.prop] === 0) {
            Toast.offline('请选择币种', 2);
            isOk = false
            break;
          }
        }else{
          if (parmas[item.prop] === '' && item.isRequired) {
            Toast.offline('请输入'+item.label, 2);
            isOk = false
            break;
          }
        }
        
      }
    }
    // if (isOk) {
    //   const email:any = verifyEmall(parmas['email'])
    //   isOk = email.done
    //   if (!isOk) {
    //     Toast.offline(email.errMsg, 2);
    //   }
    // }
    if (isOk) {
      // const phone:any = verifyPhone(parmas['phone_number'])
      // const phone:boolean = parmas['phone_number'] === ''
      // isOk = phone
      // if (phone) {
      //   Toast.offline('手机号码不能为空', 2);
      // }
    }
    if (isOk) { 
      parmas['debtor_type'] = this.state.type === 0? 'Creditor_states_0':'Creditor_states_1' //债务人类别 0是企业 1是个人
      parmas['debt_type'] = parseInt(this.props.match.params.type)  === 1 ? 'Debt_type_0':'Debt_type_4' //债务类别 0明间借贷 4是企业应收
      this.props.add(parmas)
      this.props.history.push(`/Authentication/${this.props.match.params.type}/${this.props.match.params.type2}/${this.props.match.params.type3}`)
    }
  } 
  //获取面板组件返回的值
  getPanelSet(res:any){  
    let parmas:any = Object.assign({},JSON.parse(JSON.stringify(this.state.parmas)))
    const prop:string = res.prop
    if (res.prop === 'detailed_address') {
      parmas['province'] = res.value[0]
      parmas['city'] = res.value[1]
      parmas['county'] = res.value[2]
    }else if(res.prop === 'detailed_address2'){
      parmas['detailed_address'] = res.value
    } else if(res.prop === 'currency_id'){
      parmas['currency_id'] = res.value[0]
      const debInfo = this.state.debInfo
      debInfo[0].value = ''
      this.setState({
        debInfo
      })
    } else{ 
      parmas[prop] = res.value
    }
    this.setState({
      parmas
    })
  }
  //阻止重复渲染
  shouldComponentUpdate(nextProps:any, nextState:any) {
    //两个参数nextProps和nextState，表示下一次props和一次state的值
    //生命周期函数shouldComponentUpdate()默认返回ture，返回false时不会渲染render
    if (JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false
    }
    return true
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Overbooking); 