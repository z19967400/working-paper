import React from 'react'
import './footer.less'

interface FooterBtnProps{
  name:string,
  next:Function
}
export default function FooterBtn(props:FooterBtnProps) {
  const handleClick = () =>{
    props.next()
  } 
  return(
    <div onClick={handleClick} className="FooterBtn">
      <span>{props.name}</span>
    </div>
  )
}
