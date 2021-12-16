import React from 'react'
import './pay.less'
import Header from '../../components/Header/nav-header'
import { CheckOutlined,MinusOutlined  } from '@ant-design/icons'
import {Divider } from 'antd';
import { GetWeChatConfig,GetOrderDetails,WeChatPay,getOpenId,GetLogisticsByDebtorNumber } from '../../api/https'
import { getIsWxClient } from '../../utils/common';
import { Toast } from 'antd-mobile';
import Steps from '../../components/steps/steps3'
import Alert from '../../components/Toast/Alert'


//声明windowd的属性
declare global {
  interface Window { wx: any; }
}

interface tasksItem{
  send_time:string
  task_type:Number
  task_type_Name:string
}
interface PayState {
  paid_amount:Number
  tasks:tasksItem[]
  pay_type:Number
  openId:any
  debtor_number:string
  payNumber:string
  show:boolean
  text:string
  address:any
}


class Pay extends React.Component<any,PayState>{
  constructor(props:any){
    super(props)
    this.state = {
      paid_amount:0,
      tasks:[],
      pay_type:0,
      openId:'',
      debtor_number:'',
      payNumber:'',
      show:false,
      text:'',
      address:{}
    }
  }
  render(){
    const {paid_amount,tasks,pay_type,show,text} = this.state
    return(
      <div className="pay">
        <Header name={'支付页面'}></Header>
        <div className='content'>
          <div className="section">
            <div style={{marginBottom:'20px'}} className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span>请点击“预览”确认委托信息,完成支付后不可修改</span>
            </div>
            <Steps infoName={'预览'} list={tasks} openToast={this.openToast.bind(this)}></Steps>
          </div>
          {/* <p style={{marginTop:'20px',color:'#606366',marginLeft:'20px',fontSize:'12px'}}>请点击“预览”确认委托信息，完成支付后不可修改。</p> */}
          <div className="section">
            <div style={{marginTop:'20px'}} className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span>AI律师函</span>
            </div>
            <p className="price">￥<span className='value'>{paid_amount}.00</span></p>
          </div>
          <Divider /> 
          <div className="section">
            <div className="title">
              <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
              <span>请选择支付方式</span>
            </div>
            <div className="cell first">
              <div className="label">
                <div className="logo weChat"></div>
                <span>微信支付</span>
              </div>
              <div style={{borderColor:pay_type === 0 ? '#E01F3C':'#909399'}} className="checkBox">
                <CheckOutlined style={{fontSize:'12px',color:pay_type === 0 ? '#E01F3C':'#909399' }} />
              </div>
            </div>
            {/* <div className="cell">
              <div className="label">
                <div className="logo alipay"></div>
                <span>支付宝支付</span>
              </div>
              <div style={{borderColor:pay_type === 1 ? '#E01F3C':'#909399'}} className="checkBox">
                <CheckOutlined style={{fontSize:'12px',color:pay_type === 1 ? '#E01F3C':'909399' }} />
              </div>
            </div>
            <div className="cell">
              <div className="label">
                <div className="logo unionPay"></div>
                <span>对公转账</span>
              </div>
              <div style={{borderColor:pay_type === 2 ? '#E01F3C':'#909399'}} className="checkBox">
                <CheckOutlined style={{fontSize:'12px',color:pay_type === 2 ? '#E01F3C':'909399' }} />
              </div>
            </div> */}
          </div>
        </div>
        <div className="footer">
          <div className="left">
            <span>￥{paid_amount}.00</span>
            <MinusOutlined className="icon" rotate={90} style={{color:'#fff',fontSize:'18px'}}/>
            <span>已优惠0.00元</span>
          </div>
          <div onClick={this.payStart.bind(this)} className="right">
            <span>实付{paid_amount}.00元</span>
          </div>
        </div>
        <Alert closeToast={this.closeToast.bind(this)} show={show} text={text}></Alert>
      </div>
    )
  }
  //初始化
  componentDidMount(){
    this.getOrderInfo()
    //微信环境
    if (getIsWxClient()) {
      let code = this.getQueryString().code //微信授权code
      if (code) {
         //获取微信openid
         getOpenId(code).then((res:any) =>{
          this.setState({
            openId:res.data
          })
         })
      }     
    } 
  }
  //获取订单详情
  getOrderInfo(){
    const payNumber = this.props.match.params.payNumber
    GetOrderDetails(payNumber).then((res:any) =>{
      this.setState({
        paid_amount:res.data.paid_amount,
        tasks:res.data.tasks,
        debtor_number:res.data.debtor_number,
        payNumber:res.data.pay_number
      })
      this.getMyAddress(res.data.debtor_number)
    })
  }
  //获取收货地址信息
  getMyAddress(Number:string){
    GetLogisticsByDebtorNumber(Number).then((res:any) =>{
      this.setState({
        address:res.data
      })
    })
  }
  //获取url字符串
  getQueryString(){  
      var url = window.location.search; //获取url中"?"符后的字串  
      var theRequest:any = {};  
      if (url.indexOf("?") !== -1) {  
         var str = url.substr(1);  
         var strs = str.split("&");  
         for(var i = 0; i < strs.length; i ++) {  
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
         }  
      }  
      return theRequest;   
  }   
  //微信支付
  WeChatPay(){
    //微信内微信支付
    if (getIsWxClient()) {
      if (this.state.openId === '' || this.state.openId === null) {
        Toast.fail('未获取微信openId', 2);
        return false
      }
      //获取微信所需配置
      let path:string = window.location.href
      const _this = this
      GetWeChatConfig(path).then((res:any) =>{
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appid, // 必填，公众号的唯一标识
          timestamp:res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr:res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature,// 必填，签名
          jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表
        });
        window.wx.error(function (err:any) {
          Toast.fail('微信jssdk config失败', 2);
        });
        window.wx.ready(() => {  
          // 调用支付函数
          const parmas = {
            pay_number:_this.state.payNumber,
            trade_type:'JSAPI',
            wechat_openid:_this.state.openId
          }
          WeChatPay(parmas).then((res2:any) =>{
            window.wx.chooseWXPay({
              appId: res2.data.appId, // 可不发
              nonceStr: res2.data.nonceStr, // 支付签名随机串，不长于 32 位
              package: res2.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: res2.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res2.data.paySign, // 支付签名
              timestamp: res2.data.timestamp , // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              success: function () {
                // 支付成功后的回调函数
                window.location.href = `https://h5.debteehelper.com/payCallback/${_this.state.payNumber}/${_this.state.debtor_number}`
              },
              fail: function (err:any) {
                Toast.fail('支付失败', 2);
              }
            })
          }).catch((err:any) => {
            Toast.fail(err, 2);
          })
        })
      })
    }else{
     //先跳支付结果页面，在跳支付页
     this.props.history.push(`/payCallback/${this.state.payNumber}/${this.state.debtor_number}`)
    }
  }
  //开始支付
  payStart(){
    const pay_type = this.state.pay_type //支付方式 0 微信支付
    if(pay_type === 0){
      this.WeChatPay()
    }
  }
  //打开任务弹窗
  openToast(content:string){
    if (content.substring(0,content.indexOf(':')) === 'http'||content.substring(0,content.indexOf(':'))=== 'https') {
      window.location.href = content
    }else if(content === '1111'){
      const {address} = this.state
      let cont:any = `
        <div style="text-align:left;">
        <p>寄件方式: ${address.courier_company}</p>
        <p>收件人姓名: ${address.receiving_name}</p>
        <p>收件人电话: ${address.receiving_phone}</p>
        <p>收件人地址: ${address.receiving_address}</p>
        </div>
      `
      this.setState({
        show:true,
        text:cont
      })
    }
      else{
      this.setState({
        show:true,
        text:content
      })
    }
  }
  //关闭任务弹窗
  closeToast(){
    this.setState({
      show:false
    })
  }
}

export default Pay