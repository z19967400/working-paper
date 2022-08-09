import React from 'react'
import './steps.less'

interface StepsProps{
  openToast:any
  list:any
  infoName:string
  feedback_total?:number
}

class Steps extends React.Component<any,any>{
  constructor(props:any){
    super(props)
    this.state = {}
  }
  render (){
    const list = this.props.list
    const feedback_total = this.props.feedback_total
    return (
      <div className='Steps'>
        {
         list.map((item:any,index:number) =>{
            return  <div className='cell' key={index}>
                      <div className='left'>
                        <p>step <span>{(index+1)< 10?0+''+(index+1):(index+1)}</span></p>
                        <div>
                          <div className='yuan bg1'></div>
                          <div className='xian'></div>
                        </div>
                      </div>
                      { item.task_type_Name === '律师函' ?
                        <div className='right'>
                        <div className='content'>
                          <div className='header'>
                            <span>{item.send_time}</span>
                            {/* <span  onClick={this.openInfo.bind(this,'1111','收件人信息')} className="info">收件人信息</span>  */}
                            <span  onClick={this.openInfo.bind(this,item,item.task_type_Name)}>{this.props.infoName}</span>
                          </div>
                          <div className='bottom'>
                            <p>{item.task_type_Name}</p>
                            {
                              feedback_total  && 
                              <p>债务反馈*{feedback_total} <span onClick={this.tofeedback.bind(this)} className="click">点击查看</span></p>
                            }
                            <p className="ts">{item.send_object}</p>
                            <p className={`stutas ${item.task_status !== 0?'act':''}`}>{this.getStatus(item.task_status)}</p>
                          </div>
                        </div>
                      </div>
                      :
                        <div onClick={this.openInfo.bind(this,item,item.task_type_Name)} className='right'>
                          <div className='content'>
                            <div className='header'>
                              <span>
                                {item.send_time}
                              </span>
                              <span>{this.props.infoName}</span>
                            </div>
                            <div className='bottom'>
                              <p>{item.task_type_Name}</p>
                              <p>{item.send_object}</p>
                              <p className={`stutas ${item.task_status !== 0?'act':''}`}>{item.msg==='已终止'?'已终止': this.getStatus(item.task_status)}</p>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
          })
        }
      </div>
    )
  }
  //打开弹窗
  openInfo(content:any,name:string){
    this.props.openToast(content,name)
  }
  //跳转债务反馈
  tofeedback(){
    this.props.toFeekback()
  }
  //获取状态文本
  getStatus(num:number){
    let status:string = ''
    switch (num) {
      case 0:
        status = '待执行'
        break;
      case 1:
        status = '执行中'
        break;
      case 2:
        status = '已完成'
        break;
      case 3:
        status = '执行失败'
        break;
      case 4:
        status = '已终止'
        break;    
      default:
        break;
    }
    return status
  }
}

export default Steps