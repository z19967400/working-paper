import React from "react"
import './footer.less'
import order1 from '../../images/02.svg'
import order2 from '../../images/03.svg'
import user1 from '../../images/04.svg'
import user2 from '../../images/05.svg'
import cui from '../../images/01.svg'
interface FooterProps{
  openSelect:Function,
  actIndex:number,
  history:any
}

class Footer extends React.Component<FooterProps,any> {
  constructor(prop:FooterProps) {
    super(prop)
    this.state = {}
  }
  //打开遮罩
  openSelect(){
    this.props.openSelect(true)
  }
  //底部跳转
  jump(val:number){
    if (val === 0) {
      this.props.history.push('/home')
    }else{
      this.props.history.push('/user')
    }
  }
  render(){
    let {actIndex} = this.props
    return(
      <div className="Nav-footer">
        <div onClick={this.jump.bind(this,0)} className="footer-cell">
          <img src={actIndex === 0?order2:order1} alt='' className="icon"/>
          <span style={{color:`${actIndex === 0?'#E01F3C':'#AAAAAA'}`}}>委托</span>
        </div>
        <div className="footer-cell">
          <img src={cui} alt='' onClick={this.openSelect.bind(this)} className="cui"/>
        </div>
        <div onClick={this.jump.bind(this,1)} className="footer-cell">
          <img src={actIndex === 1?user2:user1} alt='' className="icon"/>
          <span style={{color:`${actIndex === 1?'#E01F3C':'#AAAAAA'}`}}>我的</span>          
        </div>
      </div>
    )
  }
}

export default Footer