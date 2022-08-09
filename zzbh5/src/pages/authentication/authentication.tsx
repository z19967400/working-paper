import React from 'react'
import Header from '../../components/Header/nav-header'
import Panel from '../../components/panel/panel'
import FooterBtn from '../../components/Footer/footer-btn'
import './authentication.less'
import WeUpload from '../../components/upload/upload'
import {GetMyCreditor,saveCCreditor,Recognitiion,CreateAiOrder,updateCreditor,GetByid} from '../../api/https'
import CreateAILawyerLetter from '../../store/types/CreateAILawyerLetter'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AddState } from '../../store/reducers/CreateLetter';
import { CombinedState } from '../../store/reducers';
import * as types from '../../store/action_types';
import {getIsWxClient} from '../../utils/common'
import { Toast } from 'antd-mobile';
import { CheckOutlined  } from '@ant-design/icons'
import Alert from '../../components/Toast/Alert'

//store配置
const mapStateToProps = (state: CombinedState): AddState => state.CreateLetter;
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      delete() {
        // payload为参数
        dispatch({ type: types.DELETE });
      },
      add(parmas:CreateAILawyerLetter){
        dispatch({ type: types.ADD, payload: parmas });
      }
    };
  };

interface PaneData{
  label:string
  value:string|any
  value2?:string
  isRequired:boolean,
  prop?:string,
  disabled?:boolean
}
interface AuthenticationStates{
  type:number
  type2:number
  type3:number
  personal:PaneData[],
  enterprise:PaneData[],
  imgs:PaneData[],
  imgs2:PaneData[],
  key:number,
  creditor_id:number,
  confirm:boolean,
  show:boolean,
  text:string
}
class Authentication extends React.Component<any,AuthenticationStates>{
  constructor(props:any){
    super(props)
    this.state = {
      type:0, //0 企业应收 1 个人欠款 //债权人
      type2:0, //0企业 1个人
      type3:0,//0线上  1线下
      imgs:[
        {label:'身份证',value:'',value2:'',isRequired:true,prop:'id_card_img',disabled:false}
      ],
      imgs2:[
        {label:'营业执照',value:'',isRequired:true,prop:"license_img_url",disabled:false},
        {label:'授权书',value:'',isRequired:true,prop:"agent_authorization",disabled:false},
        // {label:'身份证',value:'',value2:'',isRequired:true,prop:'id_card_img'}
      ],
      personal:[
        {label:'债权人',value:'',isRequired:true,prop:'creditor_name',disabled:false},
        {label:'身份证号码',value:'',isRequired:true,prop:'agent_id_number',disabled:false},
        {label:'手机号码',value:'',isRequired:true,prop:'phone_number',disabled:false},
        // {label:'地址',value:[],value2:'',isRequired:true},
        {label:'电子邮箱',value:'',isRequired:false,prop:"email",disabled:false}
      ],
      enterprise:[
        {label:'债权人名称',value:'',isRequired:true,prop:'creditor_name',disabled:false},
        {label:'统一社会信用代码',value:'',isRequired:true,prop:'license_no',disabled:false},
        {label:'办公地址',value:'',isRequired:false,prop:'detailed_address',disabled:false},
        {label:'管理员姓名',value:'',isRequired:true,prop:'agent_name',disabled:false},
        {label:'管理员身份证号',value:'',isRequired:true,prop:"agent_id_number",disabled:false},
        {label:'管理员手机号码',value:'',isRequired:true,prop:'phone_number',disabled:false},
        {label:'管理员电子邮箱',value:'',isRequired:false,prop:'email',disabled:false}
      ],
      key:0,
      creditor_id:0,
      confirm:false,
      show:false,
      text:'',
    }
  }
  render(){
    const {personal,enterprise,imgs,imgs2,key,type,confirm,show,text,type3} = this.state
    return(
      <div style={{overflowY:show?'hidden':'visible'}} className="authentication">
        <Header name={'债权人认证'}></Header>
        <div className='content'>   
          {/* 个人 */}
          { type  === 1 &&
            <div>
              <WeUpload getData={this.getUpload.bind(this)} data={imgs} key={key+1}></WeUpload>
              <Panel getData={this.getPanelSet.bind(this)} name={'详细信息'} data={personal} key={key}></Panel>
            </div>
          }   
          {/* 企业 */}
          { type === 0 &&
            <div>
              <WeUpload getData={this.getUpload.bind(this)} data={imgs2} key={key+1}></WeUpload>
              <Panel getData={this.getPanelSet.bind(this)} name={'详细信息'} data={enterprise} key={key}></Panel>
            </div>
          }
          {
            type3 === 0 && 
            <div onClick={this.confirm.bind(this)} className="confirm">
              <div style={{borderColor:confirm ? '#E01F3C':'#909399'}} className="checkBox">
                { confirm && <CheckOutlined className="icon" style={{fontSize:'12px',color: '#E01F3C'}} />}
              </div>
              <span style={{color:confirm ? '#E01F3C':'#909399'}} className="checkTitle">阅读并同意<span onClick={this.openText.bind(this)}>《免责确认书》</span></span>
            </div>
          }
        </div>
        <FooterBtn next={this.next.bind(this)} name={"提交"}></FooterBtn>
        <Alert show={show} text={text} title={'免责确认书'} closeToast={this.closeToast.bind(this)}></Alert>
      </div>
    )
  }

  //初始化
  componentDidMount(){
    if (this.props.parmas.debtor_name === '') {
      this.props.history.push(`/Overbooking/${this.props.match.params.type}/${this.props.match.params.type2}/${this.props.match.params.type3}`)
    }
    this.setState({
      type:parseInt(this.props.match.params.type),
      type2:parseInt(this.props.match.params.type2),
      type3:parseInt(this.props.match.params.type3)
    },() =>{
      this.GetCreditor()
    })
    
  }
  //确认免责声明
  confirm(){
    this.setState({
      confirm:!this.state.confirm
    })
  }
  //关闭免责声明
  closeToast(val:any){
    this.setState({
      show:false,
      text:``
    })
  }
  //打开免责声明
  openText(e:any){
    // `
    //           <span class="title blod">致：尊敬的用户</span>
    //           <p>根据您的委托及您提供的债务信息，我们生成并向债务人发送以上催收电话、短信、催款函和律师函，请您认真阅读并确认催收电话、短信、催款函和律师函所包含的所有内容及数字的表述是否完全准确无误。您上传催收信息后，本平台审核通过后系统将自动开始执行催收工作。</p>
    //           <p>您确认并保证，您所提供的所有资料信息（包括但不限于债权资料信息、主体资格资料信息等）完全准确无误并真实合法有效，不属于任何虚假债务、赌债、高于国家规定年利率的高利贷、裸贷、套路贷以及其他可能会涉及违法或违反公序良俗的债务。本平台无法保证该信息之准确、及时和完整，您应对您的判断承担全部责任。</p>
    //           <p>您确认并保证，债权人为您本人，或为对您进行授权的公司，并且在本平台的操作（包括但不限于账号注册、信息与数据上传、提交委托、执行发函等）均为您本人进行。</p>
    //           <p>您理解并同意，如您发现您填写的信息有错误，可自行在本平台操作界面或与本平台的客服联系终止执行，但您仍需向本平台支付相应的费用。您自愿承担由于您提供的信息错误所造成的风险，以及由此带来的一切可能的损失。您特此完全、无条件、不可撤销、总体、完整且永久地免除债主帮、债主帮认证律师、律师事务所，以及上海诚收信息科技有限公司及其关联公司及其各自的管理人员、董事、员工、法定代表人、管理员、承保人、投资人、合伙人、股东、承继人和受让人（“被免责方”）的任何责任，并同意不对被免责方提起诉讼或任何法律程序。</p>
    //           <p class="blod">您一旦点击或勾选“我接受”或类似含义的按钮或选项，即表示为您已仔细阅读、接受并同意本《免责确认书》。</p>
    //           <p class="right top">上海诚收信息科技有限公司</p>
    //           <p class="right">债主帮法催服务平台</p>
    //     `
    GetByid(1012).then((res:any) =>{
      this.setState({
        show:true,
        text:res.data
      })
    })
    e.stopPropagation();
  }
  //获取债权人信息
  GetCreditor(){
    let key = this.state.key
    let creditor_type:string = 'Creditor_states_'+ this.state.type
    GetMyCreditor(creditor_type).then((res:any) =>{
      if (res.data.length === 0) {
        return false
      }
      //企业
      if (this.state.type === 0) {
        let enterprise = [...this.state.enterprise]
        enterprise.forEach((item:any) =>{
          if(res.data[0][item.prop] !== undefined){
            item.value = res.data[0][item.prop]
          }
          if (item.prop !== 'phone_number' && item.prop !== 'email') {
            item.disabled = true
          }
        })
        let img2 = [...this.state.imgs2]
        img2.forEach((item:any) =>{      
          item.value = res.data[0][item.prop] || ''
          item.disabled = true
        })
        this.setState({
          imgs2:img2,
          enterprise,
          key:key+1,
          creditor_id:res.data[0].id
        })
      }else{
        //个人
        let personal = [...this.state.personal]
        let imgs = [...this.state.imgs] 
        personal.forEach((item:any) =>{
          if(res.data[0][item.prop] !== undefined){
            item.value = res.data[0][item.prop]
          }
          if (item.prop !== 'phone_number' && item.prop !== 'email') {
            item.disabled = true
          }
        })
        imgs[0].value = res.data[0]['id_card_img_01'] || ''
        imgs[0].value2 = res.data[0]['id_card_img_02'] || ''
        imgs[0].disabled = true
        this.setState({
          imgs,
          personal,
          key:key+1,
          creditor_id:res.data[0].id
        })
      }
    })
  }
  //获取上传组件上传的数据
  getUpload(res:any){
    let name = res.name
    let setUp = this.state.type === 0? [...this.state.imgs2] : [...this.state.imgs]
    switch (name) {
      case '授权书':
        setUp[1].value = res.url
        break;
      case '营业执照':
        setUp[0].value = res.url
        this.imageRecog(res.url,2)
        break;
      case '身份证正面':
        if (this.state.type === 0) {
          setUp[2].value = res.url
        } else {
          setUp[0].value = res.url
          this.imageRecog(res.url,0)
        }
        break;
      case '身份证反面':
        if (this.state.type === 0) {
          setUp[2].value2 = res.url
        } else {
          setUp[0].value2 = res.url
        }
        break;
      default:
        break;
    }
    //企业
    if (this.state.type === 0) {
      this.setState({
        imgs2:setUp
      })
      //个人
    } else {
      this.setState({
        imgs:setUp
      })
    }
  }
  //获取面板组件输入的值
  getPanelSet(res:any){
    //企业
    if (this.state.type === 0) {
      let enterprise = [...this.state.enterprise]
      enterprise.forEach((item:any) =>{
        if (item.prop === res.prop) {
          item.value = res.value
        }
      })
      this.setState({
        enterprise,
      })
      //个人
    } else {
      let personal = [...this.state.personal]
      personal.forEach((item:any) =>{
        if (item.prop === res.prop) {
          item.value = res.value
        }
      })
      this.setState({
        personal
      })
    }
  }
  //证照识别
  imageRecog(path:string,img_type:number){
    const type = this.state.type
    let enterprise = [...this.state.enterprise]
    let personal = [...this.state.personal]
    let key = this.state.key
    Recognitiion({img_path:path,img_type:img_type}).then((res:any) =>{
      if (res.state) {
        if (img_type === 2) {
          enterprise[0].value = res.data.name
          enterprise[1].value = res.data.reg_num
          this.setState({
            enterprise,
            key:key+1
          })
        }else{
          /* 企业 */
          if (type === 0) {
            enterprise[3].value = res.data.name
            enterprise[4].value = res.data.reg_num  
            this.setState({
              enterprise,
              key:key+1
            })
          }
          /* 个人 */
          else{
            personal[0].value = res.data.name
            personal[1].value = res.data.num
            this.setState({
              personal,
              key:key+1
            })
          }
        }
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  //如果没有债权人就新增债权人
  addCreditor(parmas:any){
    saveCCreditor(parmas).then((res:any) =>{
      if (res.state) {
        this.setState({
          creditor_id:res.data
        },() =>{
          if (this.props.match.params.type3 === "0") {
            this.CreateAiOrder(res.data)
          }else{
            this.CreateLawyercases(res.data)
          }
        })
      }else{
        Toast.fail(res.msg, 2);
      }
    })
  }
  //创建律师函
  CreateAiOrder(id:number){
    let parmas2 = Object.assign({},this.props.parmas)
    const { type2,personal,enterprise } = this.state
    parmas2['is_wechat'] = getIsWxClient()?1:0
    parmas2['creditor_id'] = id
    parmas2['creditor_name'] = type2 === 0?enterprise[3].value:personal[0].value
    parmas2['creditor_telphone'] = type2 === 0?enterprise[5].value:personal[2].value
    parmas2['creditor_email'] = type2 === 0?enterprise[6].value:personal[3].value
    parmas2['arrears_principal'] = parseFloat(parseFloat(parmas2.arrears_principal).toFixed(2))
    parmas2['arrears_interest'] = parseFloat(parseFloat(parmas2.arrears_interest).toFixed(2)) || 0
    CreateAiOrder(parmas2).then((res:any) =>{
      if (res.state) {
        this.props.delete()
        const storage:any=window.localStorage;
        storage.removeItem("HC");
        storage.removeItem("Router")
        if (getIsWxClient()) {
          const url = encodeURIComponent("https://h5.debteehelper.com/pay/"+res.data)
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0f1f173be61d890e&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        }else{
          this.props.history.push(`/pay/${res.data}`)
        }
      }else{
        Toast.fail(res.msg, 2);
      }
    })
  }
  //创建律师办案
  CreateLawyercases(id:number){
    let parmas2 = Object.assign({},this.props.parmas)
    const storage:any=window.localStorage;
    const { type2,personal,enterprise } = this.state
    parmas2['is_wechat'] = getIsWxClient()?1:0
    parmas2['creditor_id'] = id
    parmas2['creditor_name'] = type2 === 0?enterprise[3].value:personal[0].value
    parmas2['creditor_telphone'] = type2 === 0?enterprise[5].value:personal[2].value 
    parmas2['creditor_email'] = type2 === 0?enterprise[6].value:personal[3].value
    parmas2['arrears_principal'] = parseFloat(parseFloat(parmas2.arrears_principal).toFixed(2))
    parmas2['arrears_interest'] = parseFloat(parseFloat(parmas2.arrears_interest).toFixed(2)) || 0
    this.props.add(parmas2)
    storage.removeItem("HC");
    storage.setItem("HC2",JSON.stringify(parmas2));
    storage.setItem('Router',`/Assessment/${this.state.type}/${this.state.type2}`)
    this.props.history.push({
      pathname:`/Assessment/${this.state.type}/${this.state.type2}`,
      state:parmas2
    })
  }
  //提交
  next(){
    let isok:boolean = true
    const type = this.state.type
    const type3 = this.state.type3
    const {personal,enterprise,imgs,imgs2} = this.state
    const parmas:any = {
      creditor_name:type === 0?enterprise[0].value:personal[0].value,
      creditor_type:type === 0?'Creditor_states_0':'Creditor_states_1',
      agent_name:type === 0?enterprise[3].value:'',
      agent_id_number:type === 0?enterprise[4].value:personal[1].value,
      agent_authorization:type === 0?imgs2[1].value:'',
      phone_number:type === 0?enterprise[5].value:personal[2].value,
      email:type === 0?enterprise[6].value:personal[3].value,
      id_type:type === 0?5:1,
      id_card_img_01:type === 0?'':imgs[0].value,
      id_card_img_02:type === 0?'':imgs[0].value2,
      license_no:type === 0?enterprise[1].value:'',
      license_img_url:type === 0?imgs2[0].value:'',
      detailed_address:type === 0?enterprise[2].value:''
    }
    //企业
    if (type === 0) {
      Object.keys(parmas).forEach((key:string) =>{
        if (parmas[key] === '' && key !== 'email' && key !== 'detailed_address' && key !== 'id_card_img_01' && key !== 'id_card_img_02') {
          isok = false     
        }
      })
    }
    //个人
    if (type === 1) {
      Object.keys(parmas).forEach((key:string) =>{
        if ( key === 'creditor_name' || key === 'id_card_img_01' || key === 'id_card_img_02' || key === 'phone_number' || key === 'agent_id_number') {     
         if(parmas[key] === '') {
          isok = false
         }
        }
      })
    }
    if (parmas['creditor_name'].length >= 25) {
      Toast.offline('债权人名称不得超过25个字符', 2);
      return false
    }
    if (!isok) {
      Toast.offline('请完善债权人信息',2)
      return false
    }
    if (!this.state.confirm && type3 === 0) {
      Toast.info('请阅读并同意《免责确认书》')
      return false
    }
    if (this.state.creditor_id === 0) {
      this.addCreditor(parmas)
    }else{
      const _this = this
      const type = _this.state.type
      const {enterprise,personal} = _this.state
      const parmas2 = {
        creditor_id:_this.state.creditor_id,
        phone_number:type === 0?enterprise[5].value:personal[2].value,
        email:type === 0?enterprise[6].value:personal[3].value,
        detailed_address:''
      }
      //更新债权人信息
      updateCreditor(parmas2).then((res:any) =>{
        //创建订单
        if (this.props.match.params.type3 === "0") {
          _this.CreateAiOrder(_this.state.creditor_id)
         
        }else{
          _this.CreateLawyercases(this.state.creditor_id)
        }
      })
    }
   
  }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication); 