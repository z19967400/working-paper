import React from 'react'
import './index.less'
import { UrlClicksCount } from '../../api/https'
import { Icon } from 'antd-mobile';

class Wechat extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
      path: ''
    }
  }
  render() {
    return (
      <div className="wechat">
        <Icon type="loading" style={{ margin: 'auto', marginTop: '250px', display: 'block' }} size='lg' />
      </div>
    )
  }
  componentDidMount() {
    UrlClicksCount(this.props.match.params.number).then((res: any) => {
      this.setState({
        path: res.data.url
      }, () => {
        this.open()
      })
    })
  }
  open() {
    window.location.href = this.state.path
  }
}

export default Wechat