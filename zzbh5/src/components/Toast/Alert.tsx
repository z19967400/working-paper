import React from 'react'
import './Toast.less'
import { Steps, Divider } from 'antd';

const { Step } = Steps;

interface AlertProps{
  show:boolean
  text:string
  closeToast:Function
  title?:string
  btnText?:string
  record?:any
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
    const {text ,show, title ,btnText,record} = this.props
    const height = document.body.clientHeight - 280
    return (
      <div className={`Alert ${show?'Top':''}`}>       
        <div  className='box'>
          { title && <p className="title">{title}</p>}
          <p className="html" style={{maxHeight:height+'px'}} dangerouslySetInnerHTML={{__html:text}}></p>
          { title === '律师函'&&
            <Steps  className="steps" progressDot current={record.length} direction="vertical">
             {
               record.map((item:any,index:number) =>{
                return <Step title={item.update_time} description={item.update_context} key={index} />
               })
                
             }
              
            </Steps>
          }
          <div onClick={this.closeToast.bind(this)} className='buttom'>{ btnText || '阅读完毕'}</div>
        </div>
      </div>
    )
  }
}

export default Alert