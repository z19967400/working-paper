
import React from "react"
import "./header.less"
import creatHistory from 'history/createHashHistory'
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png'
import Marquee from '../Marquee/Marquee'
import tips from '../../images/tips2.svg'
import {GetPlatformNotice} from '../../api/https'
interface PropsType{
  name:string,
  isHome?:boolean,
  number?:string,
  status?:string
  openToast2?:any
}
interface HeaderStates{
  isHeader:boolean,
  marquee:string
}
class Header extends React.Component<PropsType,HeaderStates> {
  constructor(props:PropsType) {
    super(props)
    this.state = {
      isHeader:false,
      marquee:''
    }
  }
  goBack(){
    const history = creatHistory()
    history.goBack();
  }
  render(){
    const {isHeader,marquee} = this.state
    const {isHome} = this.props || false
      return(
        <div>
          <div className="Nav-header">
            <div  className="bg"></div>
            <div className="text-box">
              {
                !isHome && <ArrowLeftOutlined onClick={this.goBack.bind(this)} className="icon" style={{color:"#fff",fontSize:'14px'}} />
              }
              { marquee &&
                <Marquee text={marquee}></Marquee>
              }
              <p className={`title ${isHome?'Top':''}`}>{this.props.name}{ this.props.status && <span>({this.props.status})</span>}</p>
              {
                this.props.number && 
                <p className="title2">
                 <span> 委托编号：{this.props.number} </span>
                  {
                    this.getStr(this.props.number) === 'WTA' &&
                    <img onClick={this.openTips.bind(this)} className="tips" src={tips} alt="xx"></img>
                  }
                </p>
              }
            </div>
          </div>
          {
            isHeader && 
            <div className="Nav-header2">
              <div className="left">
                {
                  !isHome && <ArrowLeftOutlined onClick={this.goBack.bind(this)} className="icon" style={{color:"#fff",fontSize:'14px'}} />
                }
                <p className="title">{this.props.name}</p>
              </div>
              <img className="right" src={logo} alt=""/>
            </div>
          }
        </div>
      )
  }
  componentDidMount(){
    window.addEventListener('scroll', this.bindHandleScroll.bind(this))
    this.getNotices()
  }
  bindHandleScroll(event:any){
    // 滚动的高度
    const  scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
    if (scrollTop > 135) {
      this.setState({
        isHeader:true
      })
    }else if(scrollTop <135){
      this.setState({
        isHeader:false
      })
    }
  }
  getStr(str:string){
    return str.substr(0,str.indexOf('0'))
  }
  openTips(){
    this.props.openToast2()
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.bindHandleScroll.bind(this));
  }
  getNotices(){
    GetPlatformNotice().then((res:any) =>{
      if (res.data.length > 0) {
        this.setState({
          marquee:res.data[0]
        })
      }
    })
  }
}


export default Header
