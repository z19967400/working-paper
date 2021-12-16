import React from 'react'
import Header from '../../components/Header/nav-header'
import Footer from '../../components/Footer/nav-footer'
import Select from '../../components/Select/select'
import './home.less'
import {getOrderList,getLawyerCases,GetServicesPagingData} from '../../api/https'
import { getIsWxClient } from '../../utils/common';
import noData from '../../images/noData.svg'


//顶部组件
interface NavProps{
  getNavVal:Function
}
interface NavStates{
  navs:string[]
  navIndex:number
}
class Nav extends React.Component<NavProps,NavStates> {
  constructor(props:NavProps){
    super(props)
    this.state = {
      navs:['AI律师函','律师办案','增值服务'],
      navIndex:0,
    }
  }
  //头部分类选择
  NavSelect(val:number){
    this.setState({
      navIndex:val
    })
    this.props.getNavVal(val)
  }
  render() {
    const {navs} = this.state
    let {navIndex} = this.state
    return(
      <div  className="nav">
        {
          navs.map((item:string,index:number) =>{            
            return  <div onClick={this.NavSelect.bind(this,index)} className="cell" key={index}>
                      <span className="cell-text">{item}</span>
                      <span className={`xian ${navIndex === index?'navAct':''}`}></span>
                    </div>
          })
        }
      </div>
    )
  }
}

//列表组件
interface ListProps{
  toInfo:Function
  openSelect:Function
  actNav:number
}
interface ListStates{
  list:number[]
  page:number
  limit:number
  isloadmore:boolean
  actNav:number
}
class List extends React.Component<ListProps,ListStates>{
  constructor(props:ListProps){
    super(props)
    this.state={
      list:[],
      page:1,
      limit:12,
      isloadmore:true,
      actNav:0
    }
  }
  toInfo(debtor_number:string,status:string,pay_number:string,a_type:any){
    this.props.toInfo(debtor_number,status,pay_number,a_type)
  }
  open(){
    this.props.openSelect(true)
  }
  render(){
    const { list,actNav } = this.state
    return (
      <div className="list">
        {
         list.map((item:any,index) => {
          return  <div onClick={this.toInfo.bind(this,item.debtor_number || item.entrust_no,item.executing_status,item.pay_number,item.a_type)} className="list-cell" key={index}>
                    <div className="title">
                      <span>{item.create_time}</span>
                      <span>查看详情</span>
                    </div>
                    <div className="content">
                      <div className="shu"></div>
                      <div className="text">
                        { actNav !== 2 &&
                          <h4>向{item.debtor_name}的催收</h4>
                        }
                        {
                          actNav === 2 &&
                          <h4>{item.a_type}</h4>
                        }
                        <p>{actNav===0?'AI律师函':actNav === 1 ?'律师办案':item.entrust_no}</p>
                      </div>
                      <div className="state">{item.execution_progress || item.case_progress}</div>
                    </div>
                  </div>
          })
        }
        {list.length === 0 && <div className="noData">
          <img src={noData} alt="noData"/>
          <p>暂无委托,<span onClick={this.open.bind(this)} className="cui">立即催收</span></p>
        </div>}
        {list.length !== 0 && <div className="list-text">
          <p>有问题？拨打债主帮服务热线</p>
          <a href="tel:4006321918">4006 321 918</a>
        </div>}
      </div>
    )
  }
  //初始化
  componentDidMount(){
    this.getList()
    window.addEventListener('scroll', this.bindHandleScroll.bind(this))
  }
  //监听父组件传值
  componentWillReceiveProps(props:ListProps){
    if (props.actNav === this.state.actNav) {
      return false
    }else{
      if (props.actNav === 0) {
        this.setState({
          page:1,
          list:[]
        })
        this.getList()
      } else if(props.actNav === 1) {
        this.setState({
          page:1,
          list:[]
        })
        this.getLawyerCase()
      }else{
        this.setState({
          page:1,
          list:[]
        })
        this.getZenZhi()
      }
      this.setState({
        actNav:props.actNav
      })
    }
    
  }
  //滚动监听
  bindHandleScroll(event:any){
    // 滚动的高度
    const  scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
    const clientHeight = document.body.clientHeight; //正文高度
    const availHeight =  window.screen.availHeight //屏幕分辨率的高度
     if (scrollTop >= clientHeight - availHeight) {
        this.setState({
          page:this.state.page+1
        },() =>{
          if (this.state.isloadmore) {
            if (this.state.actNav === 0) {
              this.getList()
            } else if(this.state.actNav === 1) {
              this.getLawyerCase()
            }else{
              this.getZenZhi()
            }
         }
        })
     }
  }
  //获取用户AI律师函列表
  getList(){
    const {page,limit} = this.state
    const parmas = {
      page,
      limit
    }
    getOrderList(parmas).then((res:any) =>{
      res.data.forEach((item:any) =>{
        let create_time = item.create_time
        create_time = create_time.replace('T',' ')
        create_time = create_time.substring(0,create_time.lastIndexOf(":"));
        item.create_time = create_time
      })
      this.setState({
        list:this.state.list.concat(res.data),
        isloadmore:res.data.length>0
      })
    })
  }
  //获取用户律师办案列表
  getLawyerCase(){
    const {page,limit} = this.state
    const parmas = {
      page,
      limit
    }
    getLawyerCases(parmas).then((res:any) =>{
      res.data.List.forEach((item:any) =>{
        let create_time = item.create_time
        create_time = create_time.replace('T',' ')
        create_time = create_time.substring(0,create_time.lastIndexOf(":"));
        item.create_time = create_time
      })
      this.setState({
        list:this.state.list.concat(res.data.List),
        isloadmore:res.data.length>0
      })
    })
  }
  //获取增值服务列表
  getZenZhi(){
    const {page,limit} = this.state
    const parmas = {
      page,
      limit
    }
    GetServicesPagingData(parmas).then((res:any) =>{
      res.data.forEach((item:any) =>{
        let create_time = item.create_time
        create_time = create_time.replace('T',' ')
        create_time = create_time.substring(0,create_time.lastIndexOf(":"));
        item.create_time = create_time
      })
      this.setState({
        list:this.state.list.concat(res.data),
        isloadmore:res.data.length>0
      })
    })
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.bindHandleScroll.bind(this));
  }
}




//home主组件
interface HomeState{
  show:boolean
  actNav:number
}

class Home extends React.Component<any,HomeState> {
  constructor(props:any){
    super(props)
    this.state = {
      show:false,
      actNav:0
    }
  }
  render() {
    let {show,actNav} = this.state
    return(
      <div className="home">
        <Header isHome={true} name="我的委托"></Header>
        <Nav getNavVal={this.getNavAct.bind(this)}></Nav>
        <List actNav={actNav} openSelect={this.openSelect.bind(this)} toInfo={this.toInfo.bind(this)}></List>
        <Select getSelect={this.getSelect.bind(this)} closeSelect={this.closeSelect.bind(this)} show={show}></Select>
        <Footer history={this.props.history} actIndex={0} openSelect={this.openSelect.bind(this)}></Footer>
      </div>
    )
  }
  componentDidMount(){
    let type = this.props.match.params.type
    if (type === '0') {
      this.openSelect(true)
    }
    
  }
  //打开遮罩
  openSelect(val:boolean){
    // this.setState({
    //   show:val
    // })
    this.props.history.push('/service')
  }
  //关闭遮罩
  closeSelect(val:boolean){
    this.setState({
      show:val
    })
  }
  //获取选择值
  getSelect(val:number,val2:number,val3:number){
    this.props.history.push(`/overbooking/${val}/${val2}/${val3}`)
  }
  //获取头部组件选择值
  getNavAct(val:number){
    this.setState({
      actNav:val
    })
  }
  //跳转详情
  toInfo(debtor_number:string,status:string,pay_number:string,type:string){
    // this.props.history.push(`/CaseInfo/${debtor_number}`)
    if (this.state.actNav === 0) {
      if (status === 'AI_State_0') { //待支付直接跳转支付
        if (getIsWxClient()) { //如果是微信环境，直接跳微信支付
          
          const url = encodeURIComponent("https://h5.debteehelper.com/pay/"+pay_number)
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0f1f173be61d890e&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        }else{ //不是微信环境跳普通支付
          
          this.props.history.push(`/pay/${pay_number}`)
        }
      } else { //其他跳订单详情
        
        this.props.history.push(`/CaseInfo/${debtor_number}`)
      }
    } else if(this.state.actNav === 1) {
      this.props.history.push(`/lawyerCase/${debtor_number}`)
    }else{
      let types = type === '律师查档'?0:type === '诉讼助资'?1:2
      this.props.history.push(`/incrementInfo/${debtor_number}/${types}`)
    }
  }
}



export default Home