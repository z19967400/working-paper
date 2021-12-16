import React from 'react'
import './upload.less'
import {MinusOutlined,LoadingOutlined, DownloadOutlined ,CameraOutlined,UploadOutlined,CloseOutlined   } from '@ant-design/icons'
import { Row, Col,Divider,Upload, message} from 'antd';
import { MAINHOST } from '../../config/index'
import bt from '../../images/bt.svg'
//上传组件
function getBase64(img:any, callback:any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传正确的图片格式');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('图片大小不超过 10MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface propState{
  action:string
  name:string
  getData:Function,
  defultValue:String|undefined,
  disabled?:boolean
}

class Avatar extends React.Component<propState,any> {
  constructor(prop:any){
    super(prop)
    this.state = {
      loading: false,
      imageUrl:this.props.defultValue,
      disabled:this.props.disabled
    };
  }
  render() {
    const { loading, imageUrl, disabled } = this.state;
    const { name,action } = this.props
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined style={{color:'#E01F3C'}} /> :name === '授权书'? <UploadOutlined style={{color:'#E01F3C'}}/> : <CameraOutlined style={{color:'#E01F3C'}} />}
        {/* <div style={{ marginTop: 8 }}>Upload</div> */}
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={action}
        disabled={disabled}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
  
  handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) =>{
        this.setState({
          imageUrl,
          loading: false,
        })
        let res:any = info.file.response  
        let parmas:any = {
          name:this.props.name,
          url:'https://file.debteehelper.com'+res.data.FileUrl+res.data.FileExtension
        }
        this.props.getData(parmas)
      });
    }
  };
}

//主组件
interface data{
  label:string
  value:string
  value2?:string 
  isRequired:boolean,
  disabled?:boolean
}

interface uploadProps{
  data:data[]
  getData:Function
}

interface uploadStates{
  certificate:boolean
}
class WeUpload extends React.Component<uploadProps,uploadStates>{
  constructor(prop:uploadProps){
    super(prop)
    this.state = {
      certificate:false
    }
  }
  render(){
    const {data} = this.props
    const { certificate } = this.state
    return(
      <div className="Upload">
          <div className="title">
            <MinusOutlined className="icon" rotate={90} style={{color:'#E01F3C',fontSize:'18px'}}/>
            <span className="text">上传证照</span>
          </div>
          <div className="content">
            {
              data.map((item:data,index:number) =>{
                return <div className="cell" key={index}>
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
                      {item.label === '营业执照' &&
                        <div className="avtor-box">
                          <div className="cell">
                            <Avatar defultValue={item.value} disabled={item.disabled} getData={this.getUploadUrl.bind(this)} action={ MAINHOST+"/Upload/UploadFile?type=0"} name={'营业执照'}></Avatar>
                            <span className="text">上传证照</span>
                          </div>
                        </div>
                      }
                      { item.label === '授权书' &&
                        <div className="avtor-box">
                          <div onClick={this.download.bind(this,'授权书')} className="cell">
                            <div className="download">
                              <DownloadOutlined style={{color:'#E01F3C'}} />  
                            </div>
                            <span  className="text">下载授权书</span>
                          </div>
                          <div className="cell">
                            <Avatar defultValue={item.value} getData={this.getUploadUrl.bind(this)} disabled={item.disabled} action={ MAINHOST+"/Upload/UploadFile?type=0"}  name={'授权书'}></Avatar>
                            <span className="text">上传授权书</span>
                          </div>
                        </div>
                      }
                      { item.label === '身份证' &&
                        <div className="avtor-box"> 
                          <div className="cell">
                            <Avatar defultValue={item.value} getData={this.getUploadUrl.bind(this)} disabled={item.disabled} action={ MAINHOST+"/Upload/UploadFile?type=0"}  name={'身份证正面'}></Avatar>
                            <span className="text">身份证人像面</span>
                          </div>
                          <div className="cell">
                            <Avatar defultValue={item.value2} getData={this.getUploadUrl.bind(this)} disabled={item.disabled} action={ MAINHOST+"/Upload/UploadFile?type=0"}  name={'身份证反面'}></Avatar>
                            <span className="text">身份证国徽面</span>
                          </div>
                        </div>
                      }
                    </Col>
                  </Row>
                  <Divider style={{margin:0}} /> 
                </div>
              })
            }
          </div>
          <div className={`downloadSq ${certificate?'Top':''}`}>
            <div className="box">
              <CloseOutlined onClick={this.closeCertificate.bind(this)} className="icon" style={{color:"#606366",fontSize:"16px"}}/>
              <img src="https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.png" alt=""/>
              <div className="title">长按图片保存</div>
            </div>
          </div>
      </div>
    )
  }
  savePicture(Url:string) {
    var blob = new Blob([''], { type: 'application/octet-stream' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = Url;
    a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    URL.revokeObjectURL(url);
}
  //下载
  download(name:string){
    if (name === '授权书') {
      // this.savePicture('https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.png')
      this.setState({
        certificate:true
      })
    }
  }
  //关闭授权书
  closeCertificate(){
    this.setState({
      certificate:false
    })
  }
  //获取上传组件的参数
  getUploadUrl(val:any){
    this.props.getData(val)
  }
}





export default WeUpload