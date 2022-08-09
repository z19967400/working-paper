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
      <div className='Steps Steps2'>
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
                      <div onClick={this.openInfo.bind(this,item)} className='right'>
                        <div className='content'>
                          <div className='header'>
                            {
                              item.completion_time === ''?
                              <span>预计{item.estimated_time}完成</span>
                              :
                              <span>{item.completion_time || '已完成'}</span>
                            }
                            {
                              item.execution_status !== -1 && item.type !== -3 &&
                              <span>{this.props.infoName}</span>
                            }
                          </div>
                          <div className='bottom'>
                            <p>{item.from_name}</p>
                            <p className={`stutas ${item.execution_status !== -1?'act':''}`}>{item.type === 0?this.getStatus2(item.execution_status):this.getStatus(item.execution_status)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
          })
        }
      </div>
    )
  }
  //打开弹窗
  openInfo(content:string){
    this.props.openToast(content)
  }
  //获取状态文本(通用)
  getStatus(num:number){
    let status:string = ''
    switch (num) {
      case -1:
        status = '未开始'
        break;
      case 0:
        status = '进行中'
        break;
      case 1:
        status = '已完成'
        break;
      case 2:
        status = '跳过'
        break;
      default:
        break;
    }
    return status
  }
  //委托确认状态专用码
  getStatus2(num:number){
    let status:string = ''
    switch (num) {
      case 0:
        status = '评估中'
      break;
      case 1:
        status = '待确认'
      break;
      case 2:
        status = '查看详情'
        break;
      default:
        break;
      }
    return status
  }
}
export default Steps