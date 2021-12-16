import React from 'react'
import './pay.less'
import slogen from '../../images/solgen.png'
import paylaoding from '../../images/paylaoding.svg'
import success from '../../images/sucess.png'
import { Toast } from 'antd-mobile';
import { OrderQuery, WeChatPay } from '../../api/https'
import { getIsWxClient } from '../../utils/common';
class PayCallback extends React.Component<any,any>{
  constructor(props:any){
    super(props)
    this.state={
      isPay:false
    }
  }
  render(){
    const { isPay } = this.state
    return(   
      <div className="payCallback">
          <div className="top">
            <img src={isPay?success:paylaoding} alt=""/>
            <p>{isPay?'支付成功':'支付进行中'}</p>
            <p style={{fontSize:'14px'}}>我们将在一个工作日内完成审核</p>
            {!isPay && <div onClick={this.getPayCallback.bind(this)} className="btn btn1">我已完成支付</div>}
            {isPay && <div onClick={this.goinfo.bind(this)} className="btn btn1">查看订单</div>}
            <div onClick={this.gohome.bind(this)} className="btn btn2">返回首页</div>
          </div>
          {/* <img className="bottom" src={slogen} alt=""/> */}
      </div>
    )
  }
  componentDidMount(){
    if (getIsWxClient()) {
      OrderQuery(this.props.match.params.payNumber).then((res:any) =>{  
        this.setState({
          isPay:res.data.state
        })
      })
    }else{
      OrderQuery(this.props.match.params.payNumber).then((res:any) =>{  
        if (!res.data.state) {
          this.WeChatPay()
        }else{
          this.setState({
            isPay:res.data.state
          })
        }
      })
      
    }
  }
  //支付完成查询结果
  getPayCallback(){
    let num = 0
    const myPolling = setInterval(() =>{
      num++
      OrderQuery(this.props.match.params.payNumber).then((res:any) =>{
        if (res.data.state) {
          clearInterval(myPolling);
          this.props.history.push(`/CaseInfo/${this.props.match.params.debtor_number}`)
        }else if (num >= 10) {
          clearInterval(myPolling);
          Toast.fail('该订单支付未完成',2)
        }
      })
    },1000)
  }
  //返回首页
  gohome(){
    this.props.history.push('/home')
  }
  //微信外微信支付
  WeChatPay(){
    const parmas = {  // 调用支付函数
      pay_number:this.props.match.params.payNumber,
      trade_type:'MWEB',
      wechat_openid:''
    }
    WeChatPay(parmas).then((res:any) =>{
      if (res.data.state) {
        window.location.href = res.data.mweb_url    
      }else{
        Toast.fail(res.data.msg, 2);
      }
    })
  } 
  //查看订单
  goinfo(){
    this.props.history.push(`/CaseInfo/${this.props.match.params.debtor_number}`)
  }
}

export default PayCallback