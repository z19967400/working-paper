import React from 'react'
import './feedback.less'
import Header from '../../components/Header/nav-header'
import creatHistory from 'history/createHashHistory'
import {
  GetFeedbackByDebtorNumber,
} from '../../api/https'
class Feedback extends React.Component<any,any> {
  constructor(props:any){
    super(props)
    this.state = {
      title:'债务反馈',
      list:[]
    }
  }
  render(){
    const {title,list} = this.state
    return(
      <div className="feedback">
         <Header name={title}></Header>
         <div className='content'>
           {
             list.map((item:any,index:number) =>{
              return <div className="block" key={index}>
                <p className="title">反馈时间：{this.timestr(item.create_time) }</p>
                <div className="neiron">
                  { item.is_dissent !== -1 && <p><span>是否有异议：</span><span>{item.is_dissent === 0?'无异议' : item.is_dissent === 1?'有异议':' '}</span></p>}
                  { item.dissent_content && <p><span>异议内容：</span><span>{item.dissent_content || '/'}</span></p>}
                  { item.member_remarks && <p><span>反馈内容：</span><span dangerouslySetInnerHTML={{__html:item.member_remarks.replace(/\n/g,'<br/>')}}></span></p>}
                  { item.feedback_source && <p><span>反馈来源：</span><span>{item.feedback_source === 1?'债务人提交':'客服添加'}</span></p>}
                </div>
              </div>
             })
           }

         </div>
         <div onClick={this.back.bind(this)} className="footer">返回</div>
      </div>
    )
  }
  componentDidMount(){
    this.getFeekbackList()
  }
  //获取债务反馈
  getFeekbackList(){
    GetFeedbackByDebtorNumber(this.props.match.params.debtor_number).then((res:any) =>{
      this.setState({
        list:res.data
      })
    })
  }
  //返回
  back(){
    const history = creatHistory()
    history.goBack();
  }
  //时间转码
  timestr(str:string){
    let val:string = str.replace('T',' ')
    let val2:string = val.substring(0,val.lastIndexOf(':'))
    return val2
  }
}
export default Feedback