import React from "react"
import "./Marquee.less"


interface MarqueeProps {
  text:string
}
class Marquee extends React.Component<MarqueeProps,any>{
  constructor(props:MarqueeProps){
    super(props)
    this.state ={}
  }
  render(){
    const {text} = this.props
    return(
      <div className="Marquee">
        <p className="text">
          <span>{text}</span>
          {/* <span>{text}</span> */}
        </p>
      </div>
    )
  }
}
export default Marquee