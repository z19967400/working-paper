import React from 'react'
import Footer from '../../components/Footer/nav-footer'
import Select from '../../components/Select/select'
import DynamicIcon from '../../components/dynamicIcon/dynamicIcon'
import {RightOutlined   } from '@ant-design/icons'
import './user.less'
import { getUserInfo } from '../../api/https'
import {removeToken} from './../../utils/common'
// import upimg from '../../images/06.svg'
import Header from '../../components/Header/nav-header'

//头部组件
interface HeaderStates{
  authentication:boolean
}
// class Header extends React.Component<any,HeaderStates>{
//   constructor(prop:any){
//     super(prop)
//     this.state ={
//       authentication:true
//     }
//   }
//   render(){
//     // let {authentication} = this.state
//     let {user} = this.props
//     return(
//       <div className="header">
//         <div className="headimg">
//           <img src={user.head_img ||'https://www.zzbang.vip//cdn/img/user-header.png'} alt='' className="icon"/>
//           {/* <div className="upImg">
//             <img src={upimg} className="icon" alt=''/>
//           </div> */}
//           {/* <div className="state">
//             <span>律师认证</span>
//             {authentication &&
//               <CheckOutlined className="icon" style={{fontSize:'13px',color:'#E01F3C'}} />
//             }        
//           </div> */}
//         </div>
//         <div className="text">
//           <p className="name">{user.name}</p>
//           <p className="phone">{user.phone_number}</p>
//         </div>
//       </div>
//     )
//   }
// }



//列表组件
interface cell{
  name:string,
  url:string
} 
interface ListProps{
  history:any
}
interface ListStates {
  list:cell[]
}
class List extends React.Component<ListProps,ListStates>{
  constructor(prop:any){
    super(prop)
    this.state = {
      list:[
        // {name:'委托列表',url:'/home'},
        {name:'我的资料',url:'/MemberEdit'},
        // {name:'推送通知',url:'/home'},
        // {name:'客服中心',url:'https://webchat.7moor.com/wapchat.html?accessId=31dff590-cb85-11e8-a15e-39a686fb9aaf&fromUrl=home&urlTitle=H5'},
        // {name:'tui',url:'/home'}
      ]
    }
  }
  Jump(name:string,val:string){
    if (name === '客服中心') {
      window.open(val)
    }else{
      this.props.history.push(val)
    }
  }
  render(){
    let { list } = this.state
    return (
      <div className="List">
        {
          list.map((item:cell,index:number) => {
            return <div onClick={this.Jump.bind(this,item.name,item.url)} className='cell' key={index}>
                    <DynamicIcon name={item.name}></DynamicIcon>
                    <span className="name">{item.name}</span>
                    <RightOutlined className='icon' style={{fontSize:'16px',color:'#999'}}/>
                  </div>
          })
        }
      </div>
    )
  }
}

//用户主组件
interface UserStates{
  show:boolean,
  user:any
}
class User extends React.Component<any,UserStates>{
  constructor(prop:any){
    super(prop)
    this.state = {
      show:false,
      user:{}
    }
  }
  render(){
    let {show,user} = this.state
    return(
      <div className="user">
        <Header name={'设置'}></Header>
        <List history={this.props.history}></List>
        <Select getSelect={this.getSelect.bind(this)} closeSelect={this.closeSelect.bind(this)} show={show}></Select>
        <div onClick={this.logOut.bind('this')} className="outLoginBtn">退出登录</div>
        {/* <Footer history={this.props.history} openSelect={this.openSelect.bind(this)} actIndex={1}></Footer> */}
      </div>
    )
  }
  //初始化
  componentDidMount(){
    getUserInfo().then((res:any) =>{
      let phone_number:string = res.data.phone_number 
      phone_number =  phone_number.substr(0,3) + "****" + phone_number.substr(7)
      res.data.phone_number = phone_number
      this.setState({
        user:res.data
      })
    })
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
  getSelect(val:number,val2:number){
    this.props.history.push(`/overbooking/${val}/${val2}`)
  }
  //登出
  logOut(){
    removeToken('usertokey')
    window.open('https://www.debteehelper.com/views/login.html')
  }
}

export default User