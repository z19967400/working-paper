import React from 'react'
import { Row, Col, Divider,Input,} from 'antd';
import {Picker,DatePicker } from 'antd-mobile'
import {MinusOutlined  } from '@ant-design/icons'
import { getAllRegion } from '../../api/https'
import './panel.less'
import {  createForm  } from 'rc-form';
import bt from '../../images/bt.svg'
import tips from '../../images/tips.svg'
import Multiple from  "../multiple/multiple"


// const nowTimeStamp = Date.now();
// const now = new Date(nowTimeStamp);
const time = (date:Date) => {
  let y:any = date.getFullYear()
  let m:any = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d:any = date.getDate()
  d = d < 10 ? '0' + d : d
  let h:any = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute:any = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  let second:any = date.getSeconds()
  second = second < 10 ? '0' + second : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
// 如果不是使用 List.Item 作为 children
const CustomChildren = (props:any) => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', paddingLeft: 11 }}
  >
    <div className="test" style={{ display: 'flex', height: '50px', lineHeight: '50px' }}>
      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
      { 
        (() =>{
          if (props.value) {
            return <div style={{fontSize:'12px',color:'#303133' }}>{ props.value}</div>
          } else {
            if (props.value === undefined) {
              if (props.extra === '请选择约定付款日期' || props.extra === '请选择催款日期' || props.extra === '请选择省市区') {
                return  <div style={{fontSize:'12px',color:'#ccc' }}>{ props.extra}</div>
              } else {
                return  <div style={{fontSize:'12px',color:'#303133' }}>{ props.extra}</div>
              }
            } else {
              return  <div style={{fontSize:'12px',color:'#ccc' }}>{ props.extra}</div>
            }            
          }
        })()
      }
     
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
  openTips?:any
  data:PaneData[],
  getData:Function,
  form?:any,
  type:string
  type2:string
}
interface Option {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
interface PanelState {
  option:Option[]
  selects:any
  date:any
  guarantee_type:any
  debtor_status:any
  borrow_money_mode:any
  property_clues:any
  confirmation_method:any
  is_dispute:any
  address:any
  date2:any
}
class Panel extends React.Component<PanelProps,PanelState>{
  constructor(props:any){
    super(props)
    this.state = {
      option:[],
      date:"",
      date2:"",
      guarantee_type:"",
      debtor_status:"",
      borrow_money_mode:"",
      property_clues:"",
      confirmation_method:"",
      is_dispute:"",
      address:'',
      selects:{
        guarantee:[
          {label:'保证',value:'保证'},
          {label:'银行履约保函',value:'银行履约保函'},
          {label:'抵押',value:'抵押'},
          {label:'质押',value:'质押'},
          {label:'留置',value:'留置'},
          {label:'无',value:'无'}
        ],
        guarantee1:[
          {label:'有',value:'有'},
          {label:'无',value:'无'}
        ],
        debtorStatus0:[
          {label:'存续（在营、开业、在册）',value:'存续（在营、开业、在册）'},
          {label:'注销',value:'注销'},
        ],
        debtorStatus1:[
          {label:'正常',value:'正常'},
          {label:'失联',value:'失联'},
          // {label:'死亡',value:'死亡'},
        ],
        loanMethod:[
          {label:'现金交付',value:'现金交付'},
          {label:'银行转账',value:'银行转账'},
          {label:'支付宝、微信等第三方',value:'支付宝、微信等第三方'},
          {label:'其他方式',value:'其他方式'},
        ],
        propertyClues:[
          {label:'房产',value:'房产'},
          {label:'车辆',value:'车辆'},
          {label:'设备',value:'设备'},
          {label:'货物',value:'货物'},
          {label:'债务人的应收账款',value:'债务人的应收账款'},
          {label:'其他资产',value:'其他资产'},
          {label:'不详',value:'不详'},
        ],
        paymentMethod:[
          {label:'付款（本金/利息/违约金）',value:'付款（本金/利息/违约金）'},
          {label:'付款计划',value:'付款计划'},
          {label:'书面承诺',value:'书面承诺'},
          {label:'邮件',value:'邮件'},
          {label:'其他方式',value:'其他方式'},
        ],
        availableEvidence:[
          {label:'合同、借条、借据、欠条、还款承诺书',value:'合同、借条、借据、欠条、还款承诺书',cheeked:false},
          {label:'转账记录',value:'转账记录',cheeked:false},
          {label:'催款记录',value:'催款记录',cheeked:false},
          {label:'电子证据（邮件、微信、录音录像等）',value:'电子证据（邮件、微信、录音录像等）',cheeked:false}
        ],
        availableEvidence2:[
          {label:'合同/协议/订单',value:'合同/协议/订单',cheeked:false},
          {label:'发票',value:'发票',cheeked:false},
          {label:'发货及物流凭证（运单等）、收货凭证',value:'发货及物流凭证（运单等）、收货凭证',cheeked:false},
          {label:'对账凭证、付款计划书、付款承诺书',value:'对账凭证、付款计划书、付款承诺书',cheeked:false},
          {label:'付款记录、催款通知记录',value:'付款记录、催款通知记录',cheeked:false},
          {label:'电子证据（邮件、微信、录音录像等）',value:'电子证据（邮件、微信、录音录像等）',cheeked:false},
          {label:'判决、仲裁、公证等司法文书',value:'判决、仲裁、公证等司法文书',cheeked:false},
        ],
        dispute:[
          {label:'是',value:'是'},
          {label:'否',value:'否'},
        ],
        entrustedMatters:[
          {label:'全案委托',value:'全案委托'},
          {label:'非诉催收',value:'非诉催收'},
          {label:'财产保全',value:'财产保全'},
          {label:'诉讼一审/仲裁',value:'诉讼一审/仲裁'},
          {label:'诉讼二审',value:'诉讼二审'},
          {label:'强制执行',value:'强制执行'},
          {label:'破产程序',value:'破产程序'},
          {label:'再审',value:'再审'},
        ]
      }
    }
  }
  render (){
    // type: 0:企业应收 1民间借贷
    //type2: 0：企业 1 个人
    let {name,data,type,type2} = this.props
    const { option,selects }  = this.state

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
                              {
                                (()=>{
                                  if (item.prop === 'guarantee_type') {
                                    if (type === '1') {
                                      return '担保'
                                    }else{
                                      return '担保类型'
                                    }
                                  }else{
                                    return item.label
                                  }
                                })()
                              }
                              { 
                                item.isRequired && <img className="labelIcon" src={bt} alt=''/>
                              }
                              {
                                item.prop === 'guarantee_type' && <img onClick={this.openTips.bind(this)} className="tips" src={tips} alt=''/>
                              }
                            </span>
                          </Col>
                          <Col className="col"  span={14}>
                            { 
                            // 约定付款日期
                             item.prop === 'agreed_payment_date'? 
                              <div>
                                <DatePicker
                                mode="date"
                                title="日期"
                                extra={item.placeholder}
                                value={this.state.date}
                                onChange={date =>{ this.setState({ date:date});this.props.getData({'agreed_payment_date':time(date),prop:item.prop})}}
                              >
                                <CustomChildren></CustomChildren>
                              </DatePicker>
                              </div>
                              // 最后一次催款日期
                              :item.prop === 'confirmation_date'? 
                              <div>
                                <DatePicker
                                mode="date"
                                title="日期"
                                extra={item.placeholder}
                                value={this.state.date2}
                                onChange={date =>{ this.setState({ date2:date});this.props.getData({'confirmation_date':time(date),prop:item.prop})}}
                              >
                                <CustomChildren></CustomChildren>
                              </DatePicker>
                              </div>
                              :item.label === '担保类型'? 
                               <div>
                                  <Picker
                                  data={type === '0' ?selects.guarantee:selects.guarantee1}
                                  cols={1}
                                  title="担保类型"
                                  extra={item.placeholder}
                                  value={this.state.guarantee_type}
                                  onOk = {v => {this.setState({ guarantee_type:v });this.props.getData({'guarantee_type':v,prop:item.prop})}}
                                  >
                                    <CustomChildren value={this.state.guarantee_type}></CustomChildren>
                                  </Picker>                        
                               </div>
                              :item.label === '债务人状态'? 
                              <div>
                                 <Picker
                                 data={type2 === '0'?selects.debtorStatus0:selects.debtorStatus1}
                                 cols={1}
                                 title="债务人状态"
                                 extra={item.placeholder}
                                 value={this.state.debtor_status}
                                 onOk = {v => {this.setState({ debtor_status:v });this.props.getData({'debtor_status':v,prop:item.prop})}}
                                 >
                                   <CustomChildren value={this.state.debtor_status}></CustomChildren>
                                 </Picker>                        
                              </div> 
                              :item.label === '借款方式'? 
                              <div>
                                 <Picker
                                 data={selects.loanMethod}
                                 cols={1}
                                 title="借款方式"
                                 extra={item.placeholder}
                                 value={this.state.borrow_money_mode}
                                 onOk = {v => {this.setState({ borrow_money_mode:v });this.props.getData({'borrow_money_mode':v,prop:item.prop})}}
                                 >
                                   <CustomChildren value={this.state.borrow_money_mode}></CustomChildren>
                                 </Picker>                        
                              </div> 
                              :item.label === '债务人财产线索'? 
                              <Multiple title="债务人财产线索" value={item.value} propName={item.prop} placeholder={item.placeholder} options={selects.propertyClues} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>
                              :item.label === '欠款的确认方式'? 
                                <div>
                                   <Picker
                                   data={selects.paymentMethod}
                                   cols={1}
                                   title="欠款的确认方式"
                                   extra={item.placeholder}
                                   value={this.state.confirmation_method}
                                   onOk = {v => {this.setState({ confirmation_method:v });this.props.getData({'confirmation_method':v,prop:item.prop})}}
                                   >
                                     <CustomChildren value={this.state.confirmation_method}></CustomChildren>
                                   </Picker>                        
                                </div>
                              :item.label === '现有证据'?
                              <Multiple title="现有证据" value={item.value}  propName={item.prop} placeholder={item.placeholder} options={type==='0'? selects.availableEvidence2:selects.availableEvidence} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>
                              :item.label === '欠款是否存在争议'? 
                                <div>
                                  <Picker
                                  data={selects.dispute}
                                  cols={1}
                                  title="欠款是否存在争议"
                                  extra={item.placeholder}
                                  value={this.state.is_dispute}
                                  onOk = {v => {this.setState({ is_dispute:v });this.props.getData({'is_dispute':v,prop:item.prop})}}
                                 >
                                   <CustomChildren value={this.state.is_dispute}></CustomChildren>
                                 </Picker>                        
                              </div>  
                              :item.label === '委托事项'? 
                              <Multiple title="委托事项" value={item.value} propName={item.prop} placeholder={item.placeholder} options={selects.entrustedMatters} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>
                              :item.label === '案件管辖地区'?
                                <div className='address'>
                                  <Picker
                                  title="选择地区"
                                  extra="请选择省市区"
                                  data={option}
                                  value={this.state.address}
                                  onOk = {v => {this.setState({ address:v });this.props.getData({'​jurisdiction_01':v,prop:item.prop})}}
                                  > 
                                   <CustomChildren ></CustomChildren>
                                  </Picker>
                                </div>                     
                              :
                                <Input  onChange={(e) => this.inputOnChange(e,item.prop)} placeholder={item.placeholder}  disabled={item.disabled || false} defaultValue={item.value} bordered={false} size={'large'} style={{width:'100%',textAlign:'left',fontSize:'12px',color:'#303133'}}></Input>
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
  //输入框失去焦点事件
  inputOnChange (e:any,prop:any){
    let value = e.target.value
    let obj:any = {}
    obj[prop] = value
    obj['prop'] = prop
    this.props.getData(obj)
  }
  //多选组件选择回调
  getMultipleVal(val:any,name:any){
    let obj:any ={}
    obj[name] = val
    obj['prop'] = name
    this.props.getData(obj)
  }
  //打开担保提示
  openTips(){
    this.props.openTips()
  }
  componentWillUnmount(){
    this.setState = (state,callback) => {
      return
    }
  }
}

export default createForm<PanelProps>()(Panel)