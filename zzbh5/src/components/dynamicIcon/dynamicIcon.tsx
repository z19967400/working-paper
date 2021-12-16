import React from 'react'
import {MailOutlined ,SettingOutlined } from '@ant-design/icons'
import './icon.less'
import kefu from '../../images/kefu.svg'
import user from '../../images/user.svg'
import order from '../../images/order.svg'

//动态ICON组件
interface DynamicIconProps{
  name:string
}
export default function DynamicIcon(props:DynamicIconProps) {
  return(
    <div className="DynamicIcon">
      { props.name === '委托列表' && <img src={order} className="icon" alt="委托"/> }
      { props.name === '我的资料' && <img src={user} className="icon" alt="我的"/> }
      { props.name === '推送通知' && <MailOutlined className='icon' style={{fontSize:'20px',color:'#E01F3C'}}/>}
      { props.name === '客服中心' && <img src={kefu} className="icon" alt="客服"/>}
      { props.name === '设置' && <SettingOutlined className='icon' style={{fontSize:'20px',color:'#E01F3C'}}/>}
    </div>
  )
}