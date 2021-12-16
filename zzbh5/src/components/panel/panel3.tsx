import React from 'react'
import { Row, Col, Divider,Input,Upload,Button } from 'antd';
import {Picker,DatePicker,Toast,Icon } from 'antd-mobile'
import {MinusOutlined ,UploadOutlined  } from '@ant-design/icons'
import { getAllRegion } from '../../api/https'
import './panel.less'
import {  createForm  } from 'rc-form';
import bt from '../../images/bt.svg'
import Multiple from  "../multiple/multiple"
import { MAINHOST} from '../../config/index'
import url from '../../config/requestConfig'

const { TextArea } = Input;

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
      <div style={{ textAlign: 'right', color:props.value?'#333': props.extra === '请选择币种'|| props.extra ==='请选择省市区'|| props.extra ==='请选择'  ?'#888':'#333', marginRight: 15,fontSize:'12px' }}>{props.value || props.extra}</div>
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
  form?:any,
  type?:any
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
  uploadAction:any
  address:any
  files:any
  jieduan:any
}
class Panel extends React.Component<PanelProps,PanelState>{
  constructor(props:any){
    super(props)
    this.state = {
      address:{},
      files:{},
      uploadAction:{
        action:`${MAINHOST}${url.uploadFil}?type=6`,
        multiple: true,
      },
      option:[],
      date:"",
      jieduan:"",
      selects:{
        information:[
          {label:'当事人姓名',value:'当事人姓名',cheeked:false},
          {label:'当事人身份证号',value:'当事人身份证号',cheeked:false},
          {label:'当事人户籍地址',value:'当事人户籍地址',cheeked:false},
          {label:'房产具体地址',value:'房产具体地址',cheeked:false},
          {label:'公司名称',value:'公司名称',cheeked:false},
          {label:'法院立案通知书',value:'法院立案通知书',cheeked:false},
          {label:'执行通知书',value:'执行通知书',cheeked:false},
          {label:'法院判决',value:'法院判决',cheeked:false},
          {label:'法院调查令',value:'法院调查令',cheeked:false},
          {label:'仲裁受理通知书',value:'仲裁受理通知书',cheeked:false},
          {label:'其他资料',value:'其他资料',cheeked:false}
        ],
        availableEvidence:[
          {label:'合同/协议/订单',value:'合同/协议/订单',cheeked:false},
          {label:'发票',value:'发票',cheeked:false},
          {label:'发货及物流凭证（运单等）、收货凭证',value:'发货及物流凭证（运单等）、收货凭证',cheeked:false},
          {label:'对账凭证、付款计划书、付款承诺书',value:'对账凭证、付款计划书、付款承诺书',cheeked:false},
          {label:'付款记录、催款通知记录',value:'付款记录、催款通知记录',cheeked:false},
          {label:'电子证据（邮件、微信、录音录像等）',value:'电子证据（邮件、微信、录音录像等）',cheeked:false},
          {label:'判决、仲裁、公证等司法文书',value:'判决、仲裁、公证等司法文书',cheeked:false},
        ],
        a_type:[
          {label:'户籍信息',value:'户籍信息',cheeked:false},
          {label:'工商内档',value:'工商内档',cheeked:false},
          {label:'婚姻信息',value:'婚姻信息',cheeked:false},
          {label:'房产信息',value:'房产信息',cheeked:false},
          {label:'车辆信息',value:'车辆信息',cheeked:false},
          {label:'身份信息',value:'身份信息',cheeked:false},
          {label:'社保信息',value:'社保信息',cheeked:false},
          {label:'其他类型',value:'其他类型',cheeked:false},
        ],
        xiansuo:[
          {label:'房产',value:'房产',cheeked:false},
          {label:'车辆',value:'车辆',cheeked:false},
          {label:'设备',value:'设备',cheeked:false},
          {label:'货物',value:'货物',cheeked:false},
          {label:'债务人的应收账款',value:'债务人的应收账款',cheeked:false},
          {label:'其他资产',value:'其他资产',cheeked:false},
          {label:'不详',value:'不详',cheeked:false},
        ],
        xiansuo2:[
          {label:'当事人姓名',value:'当事人姓名',cheeked:false},
          {label:'当事人身份证号',value:'当事人身份证号',cheeked:false},
          {label:'当事人户籍地址',value:'当事人户籍地址',cheeked:false},
          {label:'房产具体地址',value:'房产具体地址',cheeked:false},
          {label:'公司名称',value:'公司名称',cheeked:false},
          {label:'法院立案通知书',value:'法院立案通知书',cheeked:false},
          {label:'执行通知书',value:'执行通知书',cheeked:false},
          {label:'法院判决',value:'法院判决',cheeked:false},
          {label:'法院调查令',value:'法院调查令',cheeked:false},
          {label:'仲裁受理通知书',value:'仲裁受理通知书',cheeked:false},
          {label:'其他资料',value:'其他资料',cheeked:false},
        ],
        jieduan:[
          {label:'未起诉',value:'未起诉'},
          {label:'商事仲裁中',value:'商事仲裁中'},
          {label:'一审中',value:'一审中'},
          {label:'二审中',value:'二审中'},
          {label:'已判决尚未执行',value:'已判决尚未执行'},
          {label:'强制执行中',value:'强制执行中'},
          {label:'终结本次执行',value:'终结本次执行'},
          {label:'其他',value:'其他'},
        ]  
      }
    }
  }
  render (){
    let {name,data,type} = this.props
    const { option,selects,uploadAction }  = this.state
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
                              item.label === '现有资料'?
                                <Multiple title="现有资料" value={item.value}  propName={item.prop} placeholder={item.placeholder} options={selects.information} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>                                            
                              :item.placeholder === '点击上传'?
                                <div style={{textAlign:"left"}}>
                                  <Upload {...uploadAction} onChange={(info) =>this.onChange(info,item.prop,index)} fileList={this.state.files['file'+index]}>
                                    <Button icon={<UploadOutlined />}><span style={{fontSize:"12px"}}>{item.placeholder}</span></Button>
                                  </Upload>
                                </div>
                              :item.placeholder === '请选择省市区'?
                                <div className='address'>
                                  <Picker
                                    title="选择地区"
                                    extra="请选择省市区"
                                    data={option}
                                    value={this.state.address['address'+index]}
                                    onOk = {v => {let address:any = this.state.address;address['address'+index] = v;this.setState({ address });this.props.getData({'address':v,prop:item.prop})}}
                                  > 
                                    <CustomChildren title="选择地区" clear={this.clearAddress.bind(this)} prop={'address'+index} prop2={item.prop}></CustomChildren>
                                  </Picker>
                                </div>
                              :item.label === '案件阶段'? 
                                <div>
                                  <Picker
                                  data={selects.jieduan}
                                  cols={1}
                                  title="案件阶段"
                                  extra={item.placeholder}
                                  value={this.state.jieduan}
                                  onOk = {v => {this.setState({ jieduan:v });this.props.getData({'case_stage':v,prop:item.prop})}}
                                 >
                                   <CustomChildren value={this.state.jieduan}></CustomChildren>
                                 </Picker>                        
                              </div>  
                              :item.label === '现有证据'?
                                <Multiple title="现有证据" value={item.value}  propName={item.prop} placeholder={item.placeholder} options={selects.availableEvidence} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>  
                              :item.label === '查档类型'?
                                <Multiple title="查档类型" value={item.value}  propName={item.prop} placeholder={item.placeholder} options={selects.a_type} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>  
                                :item.label === '债务人财产线索'?
                                <Multiple title="债务人财产线索" value={item.value}  propName={item.prop} placeholder={item.placeholder} options={type === '2'?selects.xiansuo2:selects.xiansuo} getMultipleVal={this.getMultipleVal.bind(this)}></Multiple>  
                              :item.label === '备注'?
                                <TextArea rows={4} onChange={(e) => this.inputOnChange(e,item.prop)} placeholder={item.placeholder}  disabled={item.disabled || false} defaultValue={item.value} bordered={false} size={'large'} style={{width:'100%',textAlign:'left',fontSize:'12px'}}></TextArea>
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
    let { data } = this.props
    let address:any = this.state.address
    let files:any = this.state.files
    data.forEach((item:any,index:number) =>{
      if (item.placeholder === '请选择省市区') {
        address['address'+index] = ""
      }else if(item.placeholder === '点击上传'){
        files['file'+index] = []
      }
    })
    this.setState({
      address
    })
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
  //上传组件上传
  onChange(info:any,prop:any,index:number) { 
    let fileList = [...info.fileList];
    let files  = this.state.files
    fileList = fileList.map((item:any) => {
      if (item.response) {
        const res:any = item.response
        item.url = 'https://file.debteehelper.com'+res.data.FileUrl+res.data.FileExtension
      }
      return item;
    });
    files['file'+index] = [...fileList]
    this.setState({ files },()=>{
      let obj:any = {}
      obj['prop'] = prop
      obj[prop] = ""
      files['file'+index].forEach((item:any) =>{ 
        if (item.response) {
          obj[prop]+=item.url+','
        }
      })
      if ( obj[prop] !== '') {
        this.props.getData(obj)
      }
    });
  } 
  //清除地址栏
  clearAddress(row:any){
    console.log( this.state.address,row);
    
    // let address:any = this.state.address
    // address[prop] = ''
    // this.setState({
    //   address
    // },() =>{
    //   this.props.getData({'address':'',prop:prop2})
    // })
    // e.stopPropagation();
  }
  componentWillUnmount(){
    this.setState = (state,callback) => {
      return
    }
  }
}

export default createForm<PanelProps>()(Panel)