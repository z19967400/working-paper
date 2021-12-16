import React from 'react'
import './Toast.less'


interface AlertProps{
  show:boolean
  text:any
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
      <div className={`Alert Alert3 ${show?'Top':''}`}>       
        <div  className='box'>
          { title && <p className="title">{title}</p>}
          {
            text.map((item:any,index:number) =>{
              return <p className="Alert3-step">
                <p className="title">{item.name}</p>
                <p className="value">
                  {
                    item.form_value.indexOf('http') !== -1 &&
                    <img onClick={()=>{window.open(item.form_value)}} className="img" src={item.form_value} alt=""/>
                  }
                  {
                    item.form_value.indexOf('http') === -1 &&
                    <span>{ item.form_value}</span>
                  }
                </p>
              </p>
            })
          }
          <div onClick={this.closeToast.bind(this)} className='buttom'>阅读完毕</div>
        </div>
      </div>
    )
  }
}

export default Alert