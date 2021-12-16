import React from 'react'
import './Toast.less'


interface AlertProps{
  show:boolean
  data:any
  closeToast:Function
  title?:string
}
interface AlertState{
  iFrameHeight:string
}
class Alert extends React.Component<AlertProps,AlertState>{
  constructor(props:AlertProps){
    super(props)
    this.state = {
      iFrameHeight:'0px'
    }
  }
  closeToast(){
    this.props.closeToast()
  }
  render (){
    const {data ,show, title} = this.props
    // const height = document.body.clientHeight - 280
    return (
      <div className={`Alert Alert2 ${show?'Top':''}`}>       
        <div  className='box'>
          { title && <p className="title">{title}</p>}
          {/* <p className="html" style={{maxHeight:height+'px'}} dangerouslySetInnerHTML={{__html:data}}></p> */}
          {
            title === '客服信息'?
            <div className="Alert2Box">
              <p>客服姓名: {data.cs_name}</p>
              <p>电子邮箱: {data.cs_email}</p>
              <p>电话号码: {data.cs_telphone}</p>
            </div>
            :title === '律师信息'?
            <div className="Alert2Box">
              <p>律师姓名: {data.lawyer_name}</p>
              <p>电子邮箱: {data.lawyer_email}</p>
              <p>电话号码: {data.lawyer_phone_number}</p>
            </div>
            :
            <div  className="Alert2Box">
              <p>法官姓名: {data.judge_name}</p>   
              <p>联系电话: {data.telephone}</p>
              <p>法院名称: {data.court_name}</p>
              <p>法庭名称: {data.tribunal_name}</p>
            </div>
          }
          <div onClick={this.closeToast.bind(this)} className='buttom'>阅读完毕</div>
        </div>
      </div>
    )
  }
}

export default Alert