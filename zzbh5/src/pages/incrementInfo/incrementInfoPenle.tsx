import "./incrementInfo.less"
import React from 'react'
import Header from '../../components/Header/nav-header'
import {MinusOutlined  } from '@ant-design/icons'

interface StateFace{
  name:string
  info:any
  debtor_type:string
  caseInfo:any
}

class incrementInfoPenle extends React.Component<any,StateFace>{
  constructor(props:any){
    super(props)
    this.state={
      name:'委托详情',
      debtor_type:"", //服务类别
      info:{},
      caseInfo:{
        fileSearch:[
          { name:'当事人/企业名称',value:'',prop:"name",},
          { name: "查档地域", value: "-", prop: "area"},
          { name: "查档类型", value: "-", prop: "a_type"},
          { name: "现有资料", value: "-", prop: "information_01"},
          { name: "现有资料文件", value: "-", prop: "information_file"},
        ],
        LegalAid:[
          { name:'原告',value:'',prop:"plaintiff",},
          { name: "被告", value: "-", prop: "defendant"},
          { name: "法院/仲裁所在地", value: "-", prop: "seat_of_court"},
          { name: "其他管辖地区", value: "-", prop: "other_jurisdictions"},
          { name: "案件标的", value: "-", prop: "case_amount"},
          { name:'案件阶段',value:'-',prop:"case_stage",},
          { name:'现有证据',value:'-',prop:"evidence_01"},
          { name:'证据资料文件',value:'-',prop:"evidence_file"},
          { name:'债务人财产线索',value:'-',prop:"property_clues"},
          { name:'财产线索说明',value:'-',prop:"property_clues_explain"},
          { name:'债务人财产线索文件',value:'-',prop:"property_clues_file"},
          { name:'案件简介',value:'-',prop:"case_profiles"}
        ],
        Preservation:[
          {name:'财产保全申请人',value:'-',prop:"applicant"},
          {name:'财产保全被申请人',value:'-',prop:"respondent"},
          {name:'管辖法院所在地',value:'-',prop:"seat_of_court"},
          {name:'申请保全金额',value:'-',prop:"application_amount"},
          {name:'现有证据',value:'-',prop:"evidence_01"},
          {name:'证据资料文件',value:'-',prop:"evidence_file"},
          {name:'债务人财产线索',value:'-',prop:"property_clues"},
          {name:'财产线索说明',value:'-',prop:"property_clues_explain"},
          {name:'财产线索资料文件',value:'-',prop:"property_clues_file"},
          {name:'案件简介',value:'-',prop:"case_profiles"},
        ],
        contacts:[
          { name: "联系人姓名", value: "-", prop: "contacts_name"},
          { name: "联系人手机号", value: "-", prop: "contacts_telphone"},
          { name: "联系人邮箱", value: "-", prop: "contacts_email"},
          { name: "用户备注", value: "-", prop: "member_remarks"},
        ]
      }
    }
  }
  render(){
    const {name,info,caseInfo} = this.state
    return(
      <div className="incrementInfoPenle">
        <Header name={name} status={info.execution_progress} number={info.entrust_no}></Header>
        <div className="content">
          <div className="cell">
              <div className="title">
                <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
                <span className="text">详细信息</span>
              </div>
              { info.type === '律师查档' &&
                caseInfo.fileSearch.map((item:any,index:number) =>{
                  return  <p className="item" key={item+''+index}>
                            <span className="lebel">{item.name}</span>
                            { item.prop !== 'information_file' &&
                              <span className="value">{item.value}</span> 
                              
                            }
                            {
                              item.prop === 'information_file' &&
                              <span className="value">
                                {
                                  item.value !== null &&
                                  item.value.map((img:any,idx:number) =>{
                                    return <img className="img" onClick={this.openWeb.bind(this,img)} src={img} alt="" key={idx}/>
                                  })
                                }
                              </span>
                            }
                          </p>
                })
              }
              { info.type === '诉讼助资' &&
                caseInfo.LegalAid.map((item:any,index:number) =>{
                  return  <p className="item" key={item+''+index}>
                            <span className="lebel">{item.name}</span>
                            {
                              item.prop !== 'evidence_file' &&
                              item.prop !== 'property_clues_file' &&
                              <span className="value">{item.value}</span>
                            }
                            {
                              item.prop === 'evidence_file' &&
                              <span className="value">
                                {
                                  item.value !== null &&
                                  item.value.map((img:any,idx:number) =>{
                                    return <img className="img" onClick={this.openWeb.bind(this,img)} src={img} alt="" key={idx}/>
                                  })
                                }
                              </span>
                            }
                            {
                              item.prop === 'property_clues_file' &&       
                              <span className="value">
                                {
                                  item.value !== null &&
                                  item.value.map((img:any,idx:number) =>{
                                    return <img className="img" onClick={this.openWeb.bind(this,img)} src={img} alt="" key={idx}/>
                                  })
                                }
                              </span>
                            }
                          </p>
                })
              }
              { info.type === '保全保险' &&
                caseInfo.Preservation.map((item:any,index:number) =>{
                  return  <p className="item" key={item+''+index}>
                            <span className="lebel">{item.name}</span>
                            { item.prop !== 'evidence_file' &&
                              item.prop !== 'property_clues_file' &&
                              <span className="value">{item.value}</span>
                            }
                            {
                              item.prop === 'evidence_file' &&
                              <span className="value">
                                {
                                  item.value !== null &&
                                  item.value.map((img:any,idx:number) =>{
                                    return <img onClick={this.openWeb.bind(this,img)} className="img" src={img} alt="" key={idx}/>
                                  })
                                }
                              </span>
                            }
                            {
                               item.prop === 'property_clues_file' &&
                              <span className="value">
                                {
                                  item.value !== null &&
                                  item.value.map((img:any,idx:number) =>{
                                    return <img onClick={this.openWeb.bind(this,img)} className="img" src={img} alt="" key={idx}/>
                                  })
                                }
                              </span>
                            }
                          </p>
                })
              }
          </div>
          <div className="cell">
              <div className="title">
                <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
                <span className="text">联系人信息</span>
              </div>
              {
               caseInfo.contacts.map((item:any,index:number) =>{
                  return  <p className="item" key={item+''+index}>
                            <span className="lebel">{item.name}</span>
                            <span className="value">{item.value}</span>
                          </p>
                })
              }
          </div>
        </div>
        <div className="footer">
            <div onClick={this.goHome.bind(this)}>返回</div>
          </div>
      </div>
    )
  }
  componentDidMount(){
    const data = this.props.location.state  
    let caseInfo = this.state.caseInfo
    if (data['information_file'] !== undefined && data['information_file'] !== null) {  
      let str:string  = data['information_file']
      let sstr:string  = str.substring(0,str.length-1)
      let arr:any  = sstr.split(',')
      data['information_file'] = arr
    }
    if (data['evidence_file'] !== undefined  && data['evidence_file'] !== null) {
      let str:string  = data['evidence_file']
      let sstr:string  = str.substring(0,str.length-1)
      let arr:any = sstr.split(',')
      data['evidence_file'] = arr
    }
    if (data['property_clues_file'] !== undefined  && data['property_clues_file'] !== null) {
      let str:string = data['property_clues_file']
      let sstr:string  = str.substring(0,str.length-1)
      let arr:any = sstr.split(',')
      data['property_clues_file'] = arr
    }
    caseInfo.contacts.forEach((item:any) =>{
      item.value = data[item.prop]
    })  
    if (data.type === '律师查档') {
      caseInfo.fileSearch.forEach((item:any) =>{
        item.value = data[item.prop]
      })
    }
    if (data.type === '诉讼助资') {
      caseInfo.LegalAid.forEach((item:any) =>{       
        item.value = data[item.prop]
      })
    }
    if (data.type === '保全保险') {  
      caseInfo.Preservation.forEach((item:any) =>{    
        item.value = data[item.prop]
     })
    }
    console.log(data);
    this.setState({
      info:data,
      caseInfo
    })
  }
   //返回
   goHome(){
    this.props.history.go(-1);
  }
  //截取最后一个/后面的字符
  Mysubstring(str: string) {
    return str.substring(str.lastIndexOf("/") + 1);
  }
  openWeb(url:string){
    window.open(url)
  }
}

export default incrementInfoPenle