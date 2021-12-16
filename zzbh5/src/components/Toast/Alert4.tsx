import React from 'react'
import './Toast.less'


interface AlertProps{
  show:boolean
  text:string
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
    const {text ,show, title} = this.props
    // const height = document.body.clientHeight - 280
    return (
      <div className={`Alert Alert4 ${show?'Top':''}`}>       
        <div  className='box'>
          { title && <p className="title">{title}</p>}
          <p style={{margin:"30px 0 10px 0",textAlign:'center',fontSize:'16px'}}>{text}</p>
          <div className="btn-box">
            <div onClick={this.closeToast.bind(this)} className='buttom'>确认</div>
            <a className="buttom" href={`tel:400321918`}>联系客服</a >
          </div>
        </div>
      </div>
    )
  }
}

export default Alert