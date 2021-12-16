import React from 'react'
import './multiple.less'
import { Icon ,Toast } from 'antd-mobile';

interface options{
  label:string
  value:string
  cheeked:boolean
}

interface MultipleProp{
  placeholder:string | undefined
  value:string
  options:options[]
  title:string
  getMultipleVal:Function
  propName:any
}

class Multiple extends React.Component<MultipleProp,any>{
  constructor(props:MultipleProp){
    super(props)
    this.state= {
      show:false,
      show2:false,
      options:[],
      value:""
    }
  }
  render(){
    const {placeholder,title} = this.props
    const {show,show2,options,value} = this.state
    return(
      <div className="multiple">
        {
          show &&
          <div className="box">
            <div className={`box-cell ${show2?'Top2':''}`}>
              <div className="box-header">
                <span onClick={this.close.bind(this)} className="btn">取消</span>
                <span className="title">{title}</span>
                <span onClick={this.determine.bind(this)} className="btn">确定</span>
              </div>
              <div className="options">
                {
                  options.map((item:any,index:number) =>{
                    return <span onClick={this.cheeked.bind(this,index)} className="option" key={index}>{item.value} { item.cheeked && <Icon type='check' color='#E01F3C' />}</span>
                  })
                }
              </div>
            </div>
          </div>
        }
        <span  style={{color: `${value?'#303133':'#ccc'}`,fontSize:'12px',display:"block",width:"100%" }} onClick={this.open.bind(this)}>{value||placeholder}</span>
      </div>
    )
  }
  componentDidMount(){
    const options = this.props.options
    this.setState({
      options
    })
  }
  // 打开选择弹窗
  open(e:any){
    this.setState({
      show:true
    },() =>{
      setTimeout(() => {
        this.setState({
          show2:true
        })
      }, 100);
    })
  }
  //关闭弹窗
  close(){
    let options = this.state.options
    // options.forEach((item:options) =>{
    //   item.cheeked = false
    // })
    this.setState({
      show:false,
      show2:false,
      options
    })
  }
  //选中选项
  cheeked(index:number){
    let options = this.state.options
    options[index].cheeked = ! options[index].cheeked
    this.setState({
      options
    })
  }
  //确定选择
  determine(){
    const reg=/,$/gi;
    let val:string = ''
    const options = this.state.options
    options.forEach((item:options) => {
      if (item.cheeked) {
        val += item.value+","
      }
    });
    val = val.replace(reg,"")
    if (val === '') {
      Toast.offline('请至少选中一项',2);
    } else {
      this.setState({
        value:val
      })
      this.props.getMultipleVal(val,this.props.propName)
      this.close()
    }
  }
}
export default Multiple