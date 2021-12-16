import React from 'react'
import { Row, Col, Divider,Input, Radio} from 'antd';
import {MinusOutlined  } from '@ant-design/icons'
import { getAllRegion, } from '../../api/https'
import './panel.less'
import {  createForm  } from 'rc-form';
import bt from '../../images/bt.svg'

//面板组件
interface PaneData{
  label:string
  value:string|any
  value2?:string
  isRequired:boolean,
  placeholder?:string,
  prop:string
  disabled?:boolean
  type:number
}
interface PanelProps{
  name?:string,
  data:PaneData[],
  getData:Function,
  form?:any
}
interface Option {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
interface currency{
  value:number
  label:string
}
interface PanelState {
  option:Option[],
  currencys: currency[],
  parmas:any
}
class Panel extends React.Component<PanelProps,PanelState>{
  constructor(props:any){
    super(props)
    this.state = {
      option:[],
      currencys:[],
      parmas:{}
    }
  }
  render (){
    let {name,data} = this.props
    const {parmas} = this.state
    return(
      <div className="Panel">
        { name != null &&
          <div className="title">
            <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
            <span className="text">{name}</span>
          </div>
        }
        <div className="content">
          {
            data.map((item:PaneData,index:number) => {
              return  <div className='cell' key={item+''+index}>
                        <Row className="row">
                          <Col className="col" span={8}>
                            <span className="label">
                              {item.label}
                              { 
                                item.isRequired && <img className="labelIcon" src={bt} alt=''/>
                              }
                            </span>
                          </Col>
                          <Col style={{textAlign:'left'}} className="col"  span={16}>
                            {
                              item.type === 0?
                              <Radio.Group onChange={(e:any) =>this.onChange(e,item.prop)} value={parmas[item.prop]}>
                                <Radio value={'有'}>有</Radio>
                                <Radio value={'无'}>无</Radio>
                              </Radio.Group>
                              :
                              <Input  onChange={(e) => this.inputOnChange(e,item.prop)} placeholder={item.placeholder}  disabled={item.disabled || false} defaultValue={item.value} bordered={false} size={'large'} style={{width:'100%',textAlign:'left',fontSize:'12px'}}></Input>          
                            }
                          </Col>
                        </Row>
                        <Divider style={{margin:0}} /> 
                      </div>
            })
          }
        </div>
      </div>
    )
  }
  //初始化
  componentDidMount(){
    let data = this.props.data
    let parmas = this.state.parmas
    data.forEach((item:any) =>{
      if(item.type === 0){
        parmas[item.prop] = item.value
      }
    })
    this.setState({
      parmas
    })
  }
  //单选选择事件
  onChange(e:any,prop:string){
    let parmas = this.state.parmas
    let value = e.target.value
    parmas[prop] = value
    this.setState({
      parmas
    },() =>{
      this.props.getData({prop,value})
    })
  }
  //输入框失去焦点事件
  inputOnChange (e:any,prop:string|undefined){
    let value = e.target.value
    this.props.getData({prop,value})
  }
  componentWillUnmount(){
    this.setState = (state,callback) => {
      return
    }
  }
}

export default createForm<PanelProps>()(Panel)