import React from 'react'
import Header from '../../components/Header/nav-header'
import Panel from '../../components/panel/panel2'
import {Createcase,getUserInfo,UserEdit} from '../../api/https'
import FooterBtn from '../../components/Footer/footer-btn'
import { Toast,Modal } from 'antd-mobile';
import './Assessment.less'
import {verifyEmall} from '../../utils/common'
import Alert from '../../components/Toast/Alert'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AddState } from '../../store/reducers/CreateLetter';
import { CombinedState } from '../../store/reducers';
import * as types from '../../store/action_types';
const prompt = Modal.prompt;

//store配置
const mapStateToProps = (state: CombinedState): AddState => state.CreateLetter;
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      delete() {
        // payload为参数
        dispatch({ type: types.DELETE });
      }
    };
  };
interface assessmentStates{
  text:string,
  text2:string,
  title:string,
  title2:string,
  parmas:any,
  debtorInfo:any,
  key:number,
  userData:any
  confirm:boolean
  show:boolean
}
class Assessment extends React.Component<any,assessmentStates>{
  constructor(prop:any){
    super(prop)
    this.state = {
      show:false,
      text:'为了实现催收成功率的最大化,我们需要采集债权的详情进行评估,整个过程预计需要3-5分钟。您提供的信息和资料越加详细充分,最终帮您收回借款的成功率也就越高！',
      text2:'',
      title:'债权分析评估',
      title2:'',
      parmas:{},
      confirm:false,
      userData:{},
       debtorInfo:[
        {label:'约定付款日期',value:'',isRequired:false, placeholder:'请选择约定付款日期',prop:'agreed_payment_date'},
        {label:'担保类型',value:"",isRequired:true, placeholder:'请选择担保类型',prop:'guarantee_type'},
        {label:'债务人状态',value:"",isRequired:true,placeholder:'请选择债务人状态',prop:'debtor_status'},
        // {label:'借款方式',value:'',isRequired:false,placeholder:'请选择借款方式',prop:'borrow_money_mode'},
        {label:'债务人财产线索',value:'',isRequired:true,placeholder:'请选择财产线索',prop:"property_clues"},
        {label:'财产线索补充',value:'',isRequired:false, placeholder:'请补充财产线索',prop:'property_clues_bc'},
        // {label:'欠款的确认方式',value:'',isRequired:false, placeholder:'请选择欠款确认方式',prop:'confirmation_method'},
        // {label:'确认日期',value:'',isRequired:false, placeholder:'请选择确认日期',prop:'confirmation_date'},
        {label:'最后一次催款日期',isRequired:false, placeholder:'请选择催款日期',prop:'confirmation_date'},
        {label:'现有证据',value:'',isRequired:true, placeholder:'请选择现有证据',prop:'available_evidence'},
        {label:'其他证据',value:'',isRequired:false, placeholder:'其他证据',prop:'other_evidence'},
        {label:'欠款是否存在争议',value:'',isRequired:true, placeholder:'请选择是否存在争议',prop:"is_dispute"},
        {label:'案件管辖地区',value:'',isRequired:false, placeholder:'请选择案件管辖地区',prop:"​jurisdiction_01"},
        {label:'委托事项',value:'',isRequired:true, placeholder:'请选择委托事项',prop:"entrusted_matters"},
        {label:'其他委托',value:'',isRequired:false, placeholder:'请填写其他委托',prop:"other_entrustment"},
        {label:'备注',value:'',isRequired:false, placeholder:'请填写备注',prop:"f_remarks"},
      ],
      key:0
    }
  }
  render (){
    const {text,text2, title ,debtorInfo,key,confirm,show,title2} = this.state
    return(
      <div style={{overflowY:show?'hidden':'auto'}} className="Assessment">
        <Header  name={title}></Header>
        <div className='content'>
          <div className="text">
            {text}
          </div>
          <div className="box">
            <Panel type={this.props.match.params.type} type2={this.props.match.params.type2} getData={this.getPanelSet.bind(this)} name={'债权详细资料'} openTips={this.openTips.bind(this)} data={debtorInfo} key={key}></Panel>
          </div>
          {/* <div onClick={() =>{this.setState({confirm:!this.state.confirm})}} className="confirm">
            <div style={{borderColor:confirm ? '#E01F3C':'#909399'}} className="checkBox">
              { confirm && <CheckOutlined className="icon" style={{fontSize:'12px',color: '#E01F3C'}} />}
            </div>
            <span style={{color:confirm ? '#E01F3C':'#909399'}} className="checkTitle">阅读并同意<span onClick={this.openText.bind(this)}>《免责确认书》</span></span>
          </div> */}
        </div>
        <FooterBtn next={this.next.bind(this)} name={"提交"}></FooterBtn>
        <Alert show={show} text={text2} title={title2} closeToast={() =>{this.setState({show:false})}}></Alert>
      </div>
    )
  }
  //初始化
  componentDidMount(){
    getUserInfo().then((res:any) =>{
      this.setState({
        userData:res.data,
        parmas:this.props.location.state
      })
    })
  }
  //获取面板组件返回的值
  getPanelSet(res:any){  
    let parmas:any = this.state.parmas || {}
    let debtorInfo:any = [...this.state.debtorInfo]
    const prop:string = res.prop
    if (typeof(res[prop]) === 'object') {
      if (prop === '​jurisdiction_01') {
        parmas['jurisdiction_01_country'] = 3752
        parmas['jurisdiction_01_province'] = res[prop][0]
        parmas['jurisdiction_01_city'] = res[prop][1]
        parmas['jurisdiction_01_area'] = res[prop][2]
      }else if(prop === 'agreed_payment_date' || prop === 'confirmation_date'){
        parmas[prop] = res[prop]
      }else{
        parmas[prop] = res[prop][0]
      }
    }else{
      parmas[prop] = res[prop]
    }
    debtorInfo.forEach((item:any) => {
      if (item.prop === prop) {
        item.value = res[prop]
      }
    });
    this.setState({
      parmas,
      debtorInfo,
    })
  }
  //打开免责声明
  openText(e:any){
  
    this.setState({
      show:true,
      text:`
            <span class="title blod">致：尊敬的用户</span>
            <p>根据您的委托及您提供的债务信息，我们生成并向债务人发送以上催收电话、短信、催款函和律师函，请您认真阅读并确认催收电话、短信、催款函和律师函所包含的所有内容及数字的表述是否完全准确无误。您上传催收信息后，本平台审核通过后系统将自动开始执行催收工作。</p>
            <p>您确认并保证，您所提供的所有资料信息（包括但不限于债权资料信息、主体资格资料信息等）完全准确无误并真实合法有效，不属于任何虚假债务、赌债、高于国家规定年利率的高利贷、裸贷、套路贷以及其他可能会涉及违法或违反公序良俗的债务。本平台无法保证该信息之准确、及时和完整，您应对您的判断承担全部责任。</p>
            <p>您确认并保证，债权人为您本人，或为对您进行授权的公司，并且在本平台的操作（包括但不限于账号注册、信息与数据上传、提交委托、执行发函等）均为您本人进行。</p>
            <p>您理解并同意，如您发现您填写的信息有错误，可自行在本平台操作界面或与本平台的客服联系终止执行，但您仍需向本平台支付相应的费用。您自愿承担由于您提供的信息错误所造成的风险，以及由此带来的一切可能的损失。您特此完全、无条件、不可撤销、总体、完整且永久地免除债主帮、债主帮认证律师、律师事务所，以及上海诚收信息科技有限公司及其关联公司及其各自的管理人员、董事、员工、法定代表人、代理人、承保人、投资人、合伙人、股东、承继人和受让人（“被免责方”）的任何责任，并同意不对被免责方提起诉讼或任何法律程序。</p>
            <p class="blod">您一旦点击或勾选“我接受”或类似含义的按钮或选项，即表示为您已仔细阅读、接受并同意本《免责确认书》。</p>
            <p class="right top">上海诚收信息科技有限公司</p>
            <p class="right">债主帮法催服务平台</p>
      `
    })
    e.stopPropagation();
  }
  //打开担保提示
  openTips(){
    this.setState({
      show:true,
      title2:'释义',
      text2:`
          <span class="blod">保证</span>-保证人与债权人约定，债务人不付款时，保证人代为偿还债务<p></p>
          <span class="blod">银行履约保函</span>-乙方通过银行向甲方提供的保证认真履行合同的一种经济担保<p></p>
          <span class="blod">抵押</span>-抵押指用房屋、车辆等财产提供担保，但财产不交付给债权人<p></p>
          <span class="blod">质押</span>-质押指用车辆、股权等财产提供担保且财产交付给债权人或对财产权利进行出质登记<p></p>
          <span class="blod">留置</span>-债权人因合同关系占有债务人的财物<p></p>
          <span class="blod">无</span>-相当于应收账款没有担保<p></p>
      `
    })
  }
  //提交
  next(){
    let confirm:boolean = this.state.confirm
    let isok:boolean = true
    let debtorInfo:any = [...this.state.debtorInfo]
    // if(!confirm){
    //   Toast.offline('请阅读并同意《免责确认书》')
    //   return false
    // }
    debtorInfo.forEach((item:any) =>{
      if (item.isRequired && item.value === '') {
        isok = false
        Toast.offline(item.placeholder, 2);
      }
    })
    if (isok) {
      let parmas = Object.assign({},this.state.parmas)
      let parmas2:any = {
        debt_type:parmas.debt_type,
        creditor_id:parmas.creditor_id,
        debtor:{ }
      }
      let parmas3:any = {
         //债务人信息
         debtor_name:"",
         debtor_type:"",
         contact_person:"",
         phone_number:"",
         email:"",
         address_txt:"",
         country:"",
         province:"",
         city:"",
         county:"",
         detailed_address:"",
         arrearage_type:"",
         settlement_date:"",
         currency_id:"",
         arrears_principal:"",
         arrears_interest:"",
         insurer_name:"",
         creditor_name:"",
         creditor_telphone:"",
         creditor_email:"",
         repayment_amount:0,
         is_dishonesty:0,
         f_remarks:"",
         //律师办案内容
         id_card_no:"",
         lending_rate:0,
         agreed_payment_date:"",
         guarantee_type:"",
         debtor_status:"",
         property_clues:"",
         property_clues_bc:"",
         confirmation_method:"",
         confirmation_date:"",
         available_evidence:"",
         other_evidence:"",
         evidence_photo:"",
         is_dispute:"",
         dispute_content:"",
         borrow_money_mode:"",
         jurisdiction_01_txt:"",
         jurisdiction_01_country:"",
         jurisdiction_01_province:"",
         jurisdiction_01_city:"",
         jurisdiction_01_area:"",
         entrusted_matters:"",
         other_entrustment:""
      }
      Object.keys(parmas3).forEach((key:string) =>{
        if (parmas[key] !== undefined) {
          parmas3[key] = parmas[key]
        }
      })
      parmas2.debtor = parmas3
      prompt('发送报告', '评估报告将发送至您的邮箱',
      [
        {
          text: '取消',
          onPress: value => {
            console.log(value);
          }
        },
        {
          text: '确定',
          onPress:value => new Promise((resolve, reject) => {
            if (!verifyEmall(value).done) {
              Toast.info(verifyEmall(value).errMsg, 1);
            }else{
              let parmas:any = this.state.userData
              parmas.email = value
              UserEdit(parmas).then((res:any) =>{
                if (res.state) {
                  resolve(value);
                  Createcase(parmas2).then((res:any) =>{
                    if (res.state) {
                    this.props.delete()
                     this.props.history.push(`/lawyerCase/${res.data}`)
                    } else {
                     Toast.offline(res.msg,2);
                    }
                   })
                } else {
                  Toast.offline(res.msg, 2);
                }
              })
             
            }
          }),
        },
      ],'default',this.state.userData.email)
    }
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
)(Assessment); 