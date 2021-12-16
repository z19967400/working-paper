import React from 'react'
import './Toast.less'


interface AlertProps{
  show:boolean
  text:string
  closeToast:Function
  title?:string
  btnText?:string
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
    const {text ,show, title ,btnText} = this.props
    const height = document.body.clientHeight - 280
    return (
      <div className={`Alert ${show?'Top':''}`}>       
        <div  className='box'>
          { title && <p className="title">{title}</p>}
          <p className="html" style={{maxHeight:height+'px'}} dangerouslySetInnerHTML={{__html:text}}></p>
          <div onClick={this.closeToast.bind(this)} className='buttom'>{ btnText || '阅读完毕'}</div>
        </div>
      </div>
    )
  }
}

export default Alert