import React from 'react'
import { Row, Col, Divider,Input,} from 'antd';
import {Picker } from 'antd-mobile'
import {MinusOutlined  } from '@ant-design/icons'
import { getAllRegion,getAllCurrency } from '../../api/https'
import './panel.less'
import {  createForm  } from 'rc-form';
import bt from '../../images/bt.svg'

// 如果不是使用 List.Item 作为 children
const CustomChildren = (props:any) => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 11 }}
  >
    <div className="test" style={{ display: 'flex', height: '50px', lineHeight: '50px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      <div style={{ textAlign: 'right', color:props.value?'#333': props.extra === '请选择币种'|| props.extra ==='请选择省市区' ?'#888':'#333', marginRight: 15,fontSize:'12px' }}>{props.value || props.extra}</div>
    </div>
  </div>
);
//面板组件
interface PaneData{
  label:string
  value:string|any
  value2?:string
  isRequired:boolean,
  placeholder?:string,
  prop?:string
  disabled?:boolean
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
  value:string
  value2:string
}
class Panel extends React.Component<PanelProps,PanelState>{
  constructor(props:any){
    super(props)
    this.state = {
      option:[],
      currencys:[],
      value:'',
      value2:''
    }
  }
  render (){
    let {name,data,form} = this.props
    const { option,currencys,value }  = this.state
    const { getFieldProps } = form
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
                          <Col className="col"  span={16}>
                            {
                              item.label === '选择币种'? 
                               <div>
                                  <Picker
                                    data={currencys}
                                    cols={1}
                                    title="选择币种"
                                    extra="请选择币种"
                                    value={item.value}
                                    onOk = {this.currencyChange(item.prop)}
                                    {...getFieldProps('value')}
                                  >
                                    <CustomChildren value={item.value}></CustomChildren>
                                  </Picker>                        
                               </div>
                              :item.label === '地址'?
                                <div className='address'>
                                  <Picker
                                    title="选择地区"
                                    extra="请选择省市区"
                                    value={item.value}
                                    data={option}
                                    onOk = {this.RegionChange(item.prop)}
                                    {...getFieldProps('value')}
                                  > 
                                  <CustomChildren></CustomChildren>
                                </Picker>
                                  <Input onChange={(e) => this.inputOnChange(e,'detailed_address2')} defaultValue={item.value2} placeholder={'请输入详细邮寄地址(精确到门牌号)'} bordered={false} size={'large'} style={{width:'100%',textAlign:'left',fontSize:'12px'}}></Input>
                                </div>                     
  
                              // :item.label === '债务本金' ?
                              // <Input  onChange={(e) => this.inputOnChange(e,item.prop)} onBlur={this.inputOnBlur.bind(this)} placeholder={item.placeholder}  disabled={item.disabled || false} value={value} bordered={false} size={'large'} style={{width:'100%',textAlign:'left',fontSize:'12px'}}></Input>
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
    this.getAllReg()
    this.getAllBz()
  }
  //获取所有地区
  getAllReg(){
    getAllRegion().then((res:any) =>{
      let option:any = []
      if (res.data[0].list.length !== 0) {
        res.data[0].list.forEach((item:any) => {
          let obj1:any = {
            value: item.id,
            label:item.name,
            children:[],
          }
          if (item.list.length!== 0) {
            item.list.forEach((item2:any) => {
              let obj2:any = {
                value: item2.id,
                label:item2.name,
                children:[],
              }
              if (item2.list.length !==0) {
                item2.list.forEach((item3:any) =>{
                  let obj3:any = {
                    value: item3.id,
                    label:item3.name,
                  }
                  obj2.children.push(obj3)
                })         
              }
              obj1.children.push(obj2)
            })
          }
          option.push(obj1)
        })
      }
      this.setState({
        option:option
      })
    })
  }
  //获取所有币种
  getAllBz(){
    getAllCurrency().then((res:any) =>{
      if (res.data.length !== 0) {
        let list:currency[] = []
        res.data.forEach((item:any) =>{
          let obj:currency = {
            value:item.id,
            label:item.currency_name
          }
          list.push(obj)
        })
        this.setState({
          currencys:list
        })
      }
    })
  }
  //地址栏选中事件
  RegionChange(prop:string|undefined){
    let value = this.props.form.getFieldsValue()['value']
    if (value !== undefined) {
     setTimeout(() => {
      this.props.getData({prop,value})
      return false
     }, 200);
    }
  }
  //币种选中事件
  currencyChange(prop:string|undefined){
    let value = this.props.form.getFieldsValue()['value']
    if (value !== undefined) {
      setTimeout(() => {
        this.props.getData({prop,value})
       }, 200);
    }
  }
  //输入框失去焦点事件
  inputOnChange (e:any,prop:string|undefined){
    let value = e.target.value
    if (prop === 'arrears_principal') {
      this.setState({
        // value:parseInt(value).toLocaleString()
        value
      })
    }
    this.props.getData({prop,value})
  }
  // //输出框失去焦点事件
  // inputOnBlur(e:any){
  //   let value = this.state.value
  //   this.setState({
  //     value:parseInt(value).toLocaleString()
  //   })
  // }
  componentWillUnmount(){
    this.setState = (state,callback) => {
      return
    }
  }
}

export default createForm<PanelProps>()(Panel)