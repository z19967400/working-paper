import React from 'react'
import Header from '../../components/Header/nav-header'
import './index.less'
import { getUserInfo,uploadFil,UserEdit } from '../../api/https'
import FooterBtn from '../../components/Footer/footer-btn'
import {Picker } from 'antd-mobile'
import {  createForm  } from 'rc-form';
import { Input } from 'antd';
import { Toast } from 'antd-mobile';
// 如果不是使用 List.Item 作为 children
const CustomChildren = (props:any) => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 15 }}
  >
    <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
    </div>
  </div>
);
interface userData{
  id:number
  name:string
  head_img:string
  phone_number:string
  sex:number
  email:string
  detailed_address:string
  city:number
  country:number
  county:number
  province:number
}
interface MemberFace{
  userData:userData
  sexs:any
}
class MemberEdit extends React.Component<any,MemberFace>{
  constructor(prop:any){
    super(prop)
    this.state = {
      userData:{
        id:0,
        head_img:'',
        name:'',
        phone_number:'',
        sex:0,
        email:'',
        detailed_address:'',
        city:0,
        country:0,
        county:0,
        province:0
      },
      sexs:[
        {value:2,label:'女'},
        {value:1,label:'男'}
      ]
    }
  }
  render(){
    const {form} = this.props
    const {userData,sexs} = this.state
    const { getFieldProps } = form
    return (
      <div className="memberEdit">
        <Header name={'资料编辑'}></Header>
        <div className="content">
          {/* <div onClick={this.uploadHeadImg.bind(this)} className="cell">
            <div className="text">
              <span className="name">头像</span>
              <span className="headimg"><img src={userData.head_img || 'https://www.zzbang.vip//cdn/img/user-header.png'} alt="头像"/></span>
            </div>
            <input id="avatarFor" type="file" style={{display:'none'}} onChange={(e:any) => this.handleImageChange(e)} accept="image/*" />
          </div> */}
          <div className="cell">
            <div className="text">
              <span className="name">用户名称</span>
              <Input  onChange={(e) => this.inputOnChange(e,'name')} value={userData.name} bordered={false} size={'large'} style={{width:'60%',textAlign:'right',fontSize:'12px'}}></Input>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <span className="name">手机号码</span>
              <span className="value">{userData.phone_number}</span>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <span className="name">电子邮箱</span>
              <Input  onChange={(e) => this.inputOnChange(e,'email')} value={userData.email} bordered={false} size={'large'} style={{width:'60%',textAlign:'right',fontSize:'12px'}}></Input>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <span className="name">性别</span>
              {/* <span className="value">{userData.sex === 0?'未选择':userData.sex === 1?'男':'女'}</span> */}
              <Picker
                data={sexs}
                cols={1}
                title=""
                extra="未选择"
                value={userData.sex}
                onOk = {this.currencyChange.bind(this)}
                {...getFieldProps('value')}
                >
                <CustomChildren>{userData.sex === 0?'未选择':userData.sex === 1?'男':'女'}</CustomChildren>
              </Picker> 
            </div>
         
          </div>
          <div className="cell">
            <div className="text">
              <span className="name">联系地址</span>
              <Input  onChange={(e) => this.inputOnChange(e,'detailed_address')} value={userData.detailed_address} bordered={false} size={'large'} style={{width:'60%',textAlign:'right',fontSize:'12px'}}></Input>
            </div>
          </div>
        </div>
        <FooterBtn next={this.next.bind(this)} name={'保存'}></FooterBtn>
      </div>
    )
  }
  //初始化
  componentDidMount(){
    getUserInfo().then((res:any) =>{
      // let phone_number:string = res.data.phone_number 
      // phone_number =  phone_number.substr(0,3) + "****" + phone_number.substr(7)
      // res.data.phone_number = phone_number
      let userData:any = this.state.userData
      Object.keys(userData).forEach((key:string) =>{
        if(res.data[key] !== undefined){
          userData[key] = res.data[key] 
        }
      })
      this.setState({
        userData,
      })
    })
  }
  //上传头像
  uploadHeadImg(){
    const input:any = document.getElementById('avatarFor')
    input.click()
  }
  //监听上传控件
  handleImageChange(e:any){
    const input:any = document.querySelector('#avatarFor')
    if (input.files.length === 0) {
      console.log('取消上传')
      return false
    }
    let fromData:any = new FormData()
    let fileObj = input.files[0]
    fromData.append('file', fileObj)
    console.log(fromData);
    uploadFil(fromData).then((res:any) =>{
      console.log(res);
    })
  }
  //选择性别
  currencyChange(val:any){
    let userData = this.state.userData
    userData.sex = val[0]
    this.setState({
      userData
    })
  }
  //输入框输入
  inputOnChange(e:any,name:string){
    let userData:any = this.state.userData
    userData[name] = e.target.value
    this.setState({
      userData
    })
  }
  //保存点击
  next(){
    //
    const parmas = this.state.userData
    UserEdit(parmas).then((res:any) =>{  
      if (res.state) {
        this.props.history.push(`/user`)
      }else{
        Toast.fail(res.data.msg,2)
      }
    })
  }
}

export default createForm()(MemberEdit)