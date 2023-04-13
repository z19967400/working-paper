import React from 'react'
import "./404.less"
import img1 from '../../images/bg@2x (1).png'
import img2 from '../../images/bg@2x (2).png'
export default function error() {
  return(
    <div className='error'>
      <img className='img1' src={img1} alt="" />
      <img className='img2' src={img2} alt="" />
    </div>
  )
}
