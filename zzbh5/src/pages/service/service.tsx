import React from 'react'
import './service.less'
import Footer from '../../components/Footer/nav-footer'
import Select from '../../components/Select/select'
import serviceBg from '../../images/serviceBg.png'
import {Carousel, Toast} from 'antd-mobile'
import headImg from '../../images/u40241.png'
import headLogo from '../../images/u40133.png'
import AIImg from '../../images/u40157.png'
import lawyerCase from '../../images/u40199.png'
import susong from '../../images/u40217.png'
import chadang from '../../images/u40237.png'
import baoxian from '../../images/u40239.png'
import Marquee from '../../components/Marquee/Marquee'

function FenleiComponent(props:any){
  return <div className="fenlei-item">
    { props.data.name === 'AI律师函' &&
      <div className="fenlei-item-box">
        <div className="fenlei-item-box-top">
          <p>律师函+AI电催</p>
          <p>- 律师函+EMS邮寄</p>
          <p>- 催收短信</p>
          <p>- 催收电话</p>
          <p>- 电子邮件催款函</p>
        </div>
        <div className="fenlei-item-box-bottom">
          <div className="fenlei-item-bottom-left">
            <p>数字化AI电催实现多维度触达</p>
            <p><span>99</span><span>元</span></p>
          </div>
          <img  className="fenlei-item-bottom-right" src={props.data.img} alt=""/>
        </div>
      </div>
    }
    { props.data.name === '律师办案' &&
      <div className="fenlei-item-box2">
        <div className="fenlei-item-box2-cell">
          <p>- 律师优选</p>
          <p>大数据优选各地律师办案。</p>
        </div>
        <div className="fenlei-item-box2-cell">
          <p>- 案件管理</p>
          <p>可视化的案件管理，帮助律师提高办案效率，用户随时了解案件进展情况</p>
        </div>
        <div className="fenlei-item-box2-cell2">
          <div>
            <p>- 专案客服</p>
            <p>专案客服负责为用户及办案律师提供全程支持，管控办案质量。</p>
          </div>
          <img  className="img" src={props.data.img} alt=""/>
        </div>
      </div>
    }
    { props.data.name !== '律师办案' &&  props.data.name !== 'AI律师函' &&
      <div className="fenlei-item-box3">
        <p>
          { props.data.name === '诉讼助资' &&
            <span className="tips">打官司 零成本 你诉讼 我付费</span>
          }
          <span className="text">{props.data.text}</span>
        </p>
        <img className={`img ${props.data.name === '诉讼助资'?'':'img2'}`} src={props.data.img} alt=""/>
      </div>
    }
  </div>
}

interface serviceState{
  slideIndex:number
  data:any
  imgHeight:any
  show:boolean
  type:any
}

class service extends React.Component<any,serviceState> {
  constructor(props:any) {
    super(props)
    this.state={
      show:false,
      slideIndex:0,
      data: [
        {name:'AI律师函',img:AIImg,text:""},
        {name:'律师办案',img:lawyerCase,text:""},
        {name:'诉讼助资',img:susong,text:"所有诉讼费用均由债主帮承担包括律师费、诉讼费、保全费、查档费、公证费、鉴定费、公告费等。案件回款后用户与平台再按约定比例分配诉讼收益。"},
        {name:'律师查档',img:chadang,text:"全国范围调取债务人财产信息、身份信息、工商档案、房产信息、应收账款、股权投资等。"},
        {name:'保全保险',img:baoxian,text:"优选对接各大保险及担保机构，提供全国各地法院认可的保全保险/担保。"}
      ],
      imgHeight: 350,
      type:null
    }
  }
  render(){
    const { show,type } = this.state
    return(
      <div className="service">
        <img className="serviceBg" src={serviceBg} alt=""/>
        <Marquee text={'尊敬的用户：由于春节假期，债主帮于2022年1月30日至2月6日期间暂停接受法催服务委托，请您提前安排委托服务，避免造成延误及损失。如需帮助请致电4006 321 918，提前祝您节日快乐。'}></Marquee>
        <div className="box">
          <div className="head">
            <img className="headBg" src={headImg} alt=""/>
            <img className="headLogo" src={headLogo} alt=""/>
            <p>债主帮为您提供适用于社会主要催收场景的多种线上线下催收服务，并有电子存证、风险预警、催收报告、数据分析等全栈服务。</p>
          </div>
          
          <Carousel className="space-carousel"
            frameOverflow="visible"
            cellSpacing={20}
            slideWidth={0.65}
            autoplayInterval={5000}
            dots={false}
            autoplay
            infinite
            afterChange={index => this.setState({ slideIndex: index })}
          >
            {this.state.data.map((item:any, index:number) => (
              <div
                onClick={() =>{
                  if (this.state.slideIndex !== index) {
                    return false
                  }
                  if (item.name === 'AI律师函' || item.name === '律师办案') {   
                    this.openSelect(true);this.setState({type:item.name === 'AI律师函'?0:1})
                  }else if(item.name === '律师查档'){
                    this.props.history.push(`/increment/${1}`)
                  }else if(item.name === '诉讼助资'){
                    this.props.history.push(`/increment/${2}`)
                  }else{
                    this.props.history.push(`/increment/${3}`)
                  }
                }} 
                className={`fenlei ${index<this.state.slideIndex ||  index === this.state.data.length?'right-tilt':''} ${index>this.state.slideIndex && index !== this.state.data.length?'left-tilt':''}`}
                key={index}
                style={{
                  display: 'block',
                  position: 'relative',
                  top: this.state.slideIndex === index ? -10 : 0,
                  height: this.state.imgHeight,
                  boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)'
                }}
              >
                {index !== this.state.slideIndex && <div className="zhezhao"></div>}
                <p className="title">{item.name}</p>
                <FenleiComponent data={item}></FenleiComponent>
                <div 
                  className="fenlei-bottom"
                >
                  立即委托
                </div>
              </div>
            ))}
          </Carousel>
          <Select getSelect={this.getSelect.bind(this)} closeSelect={this.closeSelect.bind(this)} show={show} type={type}></Select>
          <Footer history={this.props.history} actIndex={2} openSelect={this.openSelect.bind(this)}></Footer>
        </div>
      </div>
    )
  }
  componentDidMount(){}
  //获取选择值
  getSelect(val:number,val2:number,val3:number){
    this.props.history.push(`/overbooking/${val}/${val2}/${val3}`)
  }
  //关闭遮罩
  closeSelect(val:boolean){
    this.setState({
      show:val,
      type:null
    })
  }
  //打开遮罩
  openSelect(val:boolean){
    this.setState({
      show:val
    })
  }
}

export default service