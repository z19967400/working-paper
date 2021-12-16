import React from 'react'
import './steps.less'

interface StepsProps{
  openToast:any
  list:any
  infoName:string
}

class Steps extends React.Component<StepsProps,any>{
  constructor(props:any){
    super(props)
    this.state = {}
  }
  render (){
    const list = this.props.list
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
                            <span  onClick={this.openInfo.bind(this,'1111','收件人信息')} className="info">收件人信息</span> 
                            <span  onClick={this.openInfo.bind(this,item.content)}>{this.props.infoName}</span>
                          </div>
                          <div className='bottom'>
                            <p>{item.task_type_Name}</p>
                            <p>{item.send_object}</p>
                            <p className={`stutas ${item.task_status !== 0?'act':''}`}>{this.getStatus(item.task_status)}</p>
                          </div>
                        </div>
                      </div>
                      :
                        <div onClick={this.openInfo.bind(this,item.content)} className='right'>
                          <div className='content'>
                            <div className='header'>
                              <span>{item.send_time}</span>
                              <span>{this.props.infoName}</span>
                            </div>
                            <div className='bottom'>
                              <p>{item.task_type_Name}</p>
                              <p>{item.send_object}</p>
                              <p className={`stutas ${item.task_status !== 0?'act':''}`}>{this.getStatus(item.task_status)}</p>
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
  openInfo(content:any){
    this.props.openToast(content)
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