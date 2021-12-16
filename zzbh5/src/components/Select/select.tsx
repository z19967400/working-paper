import React from 'react'
import './select.less'
import {CloseOutlined} from '@ant-design/icons'
import img1 from '../../images/07.svg'
import img2 from '../../images/08.svg'
import img5 from '../../images/AI.png'
import img6 from '../../images//lawyer.png'

//遮罩组件
interface selectState{
  actIndex:number
  img1:string
  img2:string
  img3:string
  img4:string
  debType:number
  debtorType:number
  CollectionType:number
}

interface selectPorps{
  show:boolean
  closeSelect:Function
  getSelect:Function
  type?:number
}

class Select extends React.Component<selectPorps,selectState>{
  constructor(prop:selectPorps){
    super(prop)
    this.state = {
      actIndex:0,
      img1:img1,
      img2:img2,
      img3:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTJweCIgaGVpZ2h0PSI1MnB4IiB2aWV3Qm94PSIwIDAgNTIgNTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0ICg3NjQ4MCkgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+R3JvdXAgMTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMy4wLeWPkei1t+WCrOWAui3pgInmi6nnsbvlnosiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00OC4wMDAwMDAsIC0zNzAuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDM3MS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yNi1Db3B5LTYiIHN0cm9rZS1vcGFjaXR5PSIwLjUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsLW9wYWNpdHk9IjAuMTUwMDAwMDA2IiBmaWxsPSIjNzM3MzczIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSIyNSI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC03Ni1Db3B5IiBvcGFjaXR5PSIwLjQ4OTk5OTk4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNi4wMDAwMDAsIDE1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMi4yMTEzODIxMSw1Ljk4NDUxNjEzIEwyLjIxMTM4MjExLDIuMTYwNTQwMTQgTDE1LjQ3OTY3NDgsMi4xNjA1NDAxNCBMMTUuNDc5Njc0OCw1Ljk4NDUxNjEzIEMxNS40Nzk2NzQ4LDYuNTgwODI1MjEgMTUuOTc1MDI0NCw3LjA2NDc4NjIgMTYuNTg1MzY1OSw3LjA2NDc4NjIgQzE3LjE5NTcwNzMsNy4wNjQ3ODYyIDE3LjY5MTA1NjksNi41ODA4MjUyMSAxNy42OTEwNTY5LDUuOTg0NTE2MTMgTDE3LjY5MTA1NjksMS4wODAyNzAwNyBDMTcuNjkxMDU2OSwwLjQ4MzQyMDg1NSAxNy4xOTU3MDczLDAgMTYuNTg1MzY1OSwwIEwxLjEwNTY5MTA2LDAgQzAuNDk1MzQ5NTkzLDAgMCwwLjQ4MzQyMDg1NSAwLDEuMDgwMjcwMDcgTDAsNS45ODQ1MTYxMyBDMCw2LjU4MDgyNTIxIDAuNDk1MzQ5NTkzLDcuMDY0Nzg2MiAxLjEwNTY5MTA2LDcuMDY0Nzg2MiBDMS43MTYwMzI1Miw3LjA2NDc4NjIgMi4yMTEzODIxMSw2LjU4MDgyNTIxIDIuMjExMzgyMTEsNS45ODQ1MTYxMyBaIiBpZD0iRmlsbC0xNiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMi4yMTEzODIxMSwxOC44ODc3NDE5IEwyLjIxMTM4MjExLDE0LjQxODYwNDcgTDE1LjQ3OTY3NDgsMTQuNDE4NjA0NyBMMTUuNDc5Njc0OCwxOC44ODc3NDE5IEMxNS40Nzk2NzQ4LDE5LjQ4NDA1MSAxNS45NzUwMjQ0LDE5Ljk2ODAxMiAxNi41ODUzNjU5LDE5Ljk2ODAxMiBDMTcuMTk1NzA3MywxOS45NjgwMTIgMTcuNjkxMDU2OSwxOS40ODQwNTEgMTcuNjkxMDU2OSwxOC44ODc3NDE5IEwxNy42OTEwNTY5LDEzLjMzODMzNDYgQzE3LjY5MTA1NjksMTIuNzQxNDg1NCAxNy4xOTU3MDczLDEyLjI1ODA2NDUgMTYuNTg1MzY1OSwxMi4yNTgwNjQ1IEwxLjEwNTY5MTA2LDEyLjI1ODA2NDUgQzAuNDk1MzQ5NTkzLDEyLjI1ODA2NDUgMCwxMi43NDE0ODU0IDAsMTMuMzM4MzM0NiBMMCwxOC44ODc3NDE5IEMwLDE5LjQ4NDA1MSAwLjQ5NTM0OTU5MywxOS45NjgwMTIgMS4xMDU2OTEwNiwxOS45NjgwMTIgQzEuNzE2MDMyNTIsMTkuOTY4MDEyIDIuMjExMzgyMTEsMTkuNDg0MDUxIDIuMjExMzgyMTEsMTguODg3NzQxOSBaIiBpZD0iRmlsbC0xNi1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4Ljg0NTUyOCwgMTYuMTEzMDM4KSBzY2FsZSgxLCAtMSkgdHJhbnNsYXRlKC04Ljg0NTUyOCwgLTE2LjExMzAzOCkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMC4wMTAxOTE5LDkuODA3ODEzOTUgTDEwLjAxMDE5MTksMTEuMTMyMzMzMSBMMTIuMjIxNTc0LDExLjEzMjMzMzEgQzEyLjgzMTkxNTQsMTEuMTMyMzMzMSAxMy4zMjcyNjUsMTEuNjE2Mjk0MSAxMy4zMjcyNjUsMTIuMjEyNjAzMiBDMTMuMzI3MjY1LDEyLjgwODkxMjIgMTIuODMxOTE1NCwxMy4yOTI4NzMyIDEyLjIyMTU3NCwxMy4yOTI4NzMyIEwxMC4wMTAxOTE5LDEzLjI5Mjg3MzIgTDEwLjAxMDE5MTksMTQuNjkxMTUwOCBDMTAuMDEwMTkxOSwxNS4yODc0NTk5IDkuNTE0ODQyMjgsMTUuNzcxNDIwOSA4LjkwNDUwMDgxLDE1Ljc3MTQyMDkgQzguMjk0MTU5MzUsMTUuNzcxNDIwOSA3Ljc5ODgwOTc2LDE1LjI4NzQ1OTkgNy43OTg4MDk3NiwxNC42OTExNTA4IEw3Ljc5ODgwOTc2LDEzLjI5Mjg3MzIgTDUuNTg3NDI3NjQsMTMuMjkyODczMiBDNC45NzcwODYxOCwxMy4yOTI4NzMyIDQuNDgxNzM2NTksMTIuODA4OTEyMiA0LjQ4MTczNjU5LDEyLjIxMjYwMzIgQzQuNDgxNzM2NTksMTEuNjE2Mjk0MSA0Ljk3NzA4NjE4LDExLjEzMjMzMzEgNS41ODc0Mjc2NCwxMS4xMzIzMzMxIEw3Ljc5ODgwOTc2LDExLjEzMjMzMzEgTDcuNzk4ODA5NzYsOS44MDc4MTM5NSBMNi4xNDAyNzMxNyw5LjgwNzgxMzk1IEM1LjUyOTkzMTcxLDkuODA3ODEzOTUgNS4wMzQ1ODIxMSw5LjMyMzg1Mjk2IDUuMDM0NTgyMTEsOC43Mjc1NDM4OSBDNS4wMzQ1ODIxMSw4LjEzMTIzNDgxIDUuNTI5OTMxNzEsNy42NDcyNzM4MiA2LjE0MDI3MzE3LDcuNjQ3MjczODIgTDYuNTIxNTI2NSw3LjY0NzI3MzgyIEw1LjQ5OTMwNDA3LDUuOTgyNzM5NjggQzUuMTg1Mjg3OCw1LjQ3MDY5MTY3IDUuMzU1MDExMzgsNC44MDc0MDU4NSA1Ljg3ODU1NjEsNC41MDAwNjkwMiBDNi40MDI2NTM2Niw0LjE5MzI3MjMyIDcuMDgxNTQ3OTcsNC4zNTkwOTM3NyA3LjM5NTU2NDIzLDQuODcwNjAxNjUgTDguOTA0NTAwODEsNy4zMjgxMTgyNCBMMTAuNDEzNDM3NCw0Ljg3MDYwMTY1IEMxMC43Mjc0NTM3LDQuMzU5MDkzNzcgMTEuNDA2MzQ4LDQuMTkzMjcyMzIgMTEuOTMwNDQ1NSw0LjUwMDA2OTAyIEMxMi40NTM5OTAyLDQuODA3NDA1ODUgMTIuNjIzNzEzOCw1LjQ3MDY5MTY3IDEyLjMwOTY5NzYsNS45ODI3Mzk2OCBMMTEuMjg3NDc1MSw3LjY0NzI3MzgyIEwxMS42Njg3Mjg1LDcuNjQ3MjczODIgQzEyLjI3OTA2OTksNy42NDcyNzM4MiAxMi43NzQ0MTk1LDguMTMxMjM0ODEgMTIuNzc0NDE5NSw4LjcyNzU0Mzg5IEMxMi43NzQ0MTk1LDkuMzIzODUyOTYgMTIuMjc5MDY5OSw5LjgwNzgxMzk1IDExLjY2ODcyODUsOS44MDc4MTM5NSBMMTAuMDEwMTkxOSw5LjgwNzgxMzk1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgb3BhY2l0eT0iMC41Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
      img4:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTJweCIgaGVpZ2h0PSI1MnB4IiB2aWV3Qm94PSIwIDAgNTIgNTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU0ICg3NjQ4MCkgLSBodHRwczovL3NrZXRjaGFwcC5jb20gLS0+CiAgICA8dGl0bGU+5YiG57uEIDU8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMy4wLeWPkei1t+WCrOWAui3pgInmi6nnsbvlnosiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00OC4wMDAwMDAsIC00NjcuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OS4wMDAwMDAsIDQ2OC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLliIbnu4QtNSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yNi1Db3B5IiBzdHJva2Utb3BhY2l0eT0iMC41IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbC1vcGFjaXR5PSIwLjE1MDAwMDAwNiIgZmlsbD0iIzczNzM3MyIgeD0iMCIgeT0iMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMjUiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNzciIG9wYWNpdHk9IjAuNDkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDAwMCwgMTYuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xLjM1NDMyMTMyLDUuNTkwMDUxMTIgQzAuODg5NDQ3NzMyLDUuNTkwMDUxMTIgMC40NjYxNzM1Nyw1LjI4MTg4Nzg1IDAuMzQ3MDk1MjEyLDQuODE5NjQyOTQgQzAuMjA2MTc3MTU2LDQuMjczMjE0MzYgMC41NDMxMzI1MDksMy43MTg2MjI1MiAxLjEwMDA0NDgzLDMuNTgwMzU3MjEgTDE1LjE4OTc3MDUsMC4wODQ5NDg5ODExIEMxNS40Njg0ODY2LDAuMDE3NjAyMDQxMSAxNS43NjIyODI2LDAuMDYzNTIwNDA5MyAxNi4wMDQwNzkzLDAuMjE0NTQwODIgQzE2LjI0NTg3NTksMC4zNjYwNzE0MzUgMTYuNDEyNzkzNiwwLjYwODQxODM3OCAxNi40NjYzNTI5LDAuODg0OTQ4OTk2IEwxNy4xMzk3NDM2LDQuMzgwMzU3MjIgQzE3LjI0NjM0MjEsNC45MzM5Mjg2NiAxNi44NzU1ODcyLDUuNDY3NjAyMTQgMTYuMzEwODc1LDUuNTcyMTkzOTggQzE1Ljc0NzIwMjgsNS42NzkzMzY4NCAxNS4yMDIyNTAzLDUuMzEzMDEwMyAxNS4wOTYxNzE4LDQuNzU4OTI4NjYgTDE0LjYyODE3ODIsMi4zMjkzMzY3OCBMMS42MTAxNTc3OSw1LjU1ODkyODY3IEMxLjUyNDM1ODk3LDUuNTc5ODQ3MDQgMS40Mzg1NjAxNiw1LjU5MDA1MTEyIDEuMzU0MzIxMzIsNS41OTAwNTExMiIgaWQ9IkZpbGwtMTAiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuMDAwODYwNywxMi4zMjkwODE5IEwxNy44ODcyMzMzLDEyLjMyOTA4MTkgTDE3Ljg4NzIzMzMsOS4yMTY4MzY5IEwxMy4wMDA4NjA3LDkuMjE2ODM2OSBMMTMuMDAwODYwNywxMi4zMjkwODE5IFogTTE4Ljg5Mjg5OTQsNC41NjkzODc4NCBDMTguODkyODk5NCw0LjAwNjEyMjUyIDE4LjQyNjk4NTgsMy41NDg5Nzk2NiAxNy44NTI5MTM4LDMuNTQ4OTc5NjYgTDEuMzU1MTAxMzEsMy41NDg5Nzk2NiBDMC43ODA1MDkyMzQsMy41NDg5Nzk2NiAwLjMxNTExNTY1NCw0LjAwNjEyMjUyIDAuMzE1MTE1NjU0LDQuNTY5Mzg3ODQgTDAuMzE1MTE1NjU0LDE2Ljk3NTUxMDUgQzAuMzE1MTE1NjU0LDE3LjUzODc3NTggMC43ODA1MDkyMzQsMTcuOTk1OTE4NyAxLjM1NTEwMTMxLDE3Ljk5NTkxODcgTDYuNDY0NTUwODMsMTcuOTk1OTE4NyBMNi40NjQ1NTA4MywxNS45NTUxMDIzIEwyLjM5NTA4Njk2LDE1Ljk1NTEwMjMgTDIuMzk1MDg2OTYsNS41ODk3OTYwMiBMMTYuODEyOTI4MSw1LjU4OTc5NjAyIEwxNi44MTI5MjgxLDcuMTc2MDIwNTQgTDExLjk2MDg3NSw3LjE3NjAyMDU0IEMxMS4zODY4MDI5LDcuMTc2MDIwNTQgMTAuOTIwODg5NCw3LjYzMjY1MzIgMTAuOTIwODg5NCw4LjE5NjQyODcyIEwxMC45MjA4ODk0LDEzLjM0ODk3OTggQzEwLjkyMDg4OTQsMTMuOTEyNzU1NCAxMS4zODY4MDI5LDE0LjM2OTM4OCAxMS45NjA4NzUsMTQuMzY5Mzg4IEwxNi44MTI5MjgxLDE0LjM2OTM4OCBMMTYuODEyOTI4MSwxNS45NTUxMDIzIEw2LjQ2NDU1MDgzLDE1Ljk1NTEwMjMgTDYuNDY0NTUwODMsMTcuOTk1OTE4NyBMMTcuODUyOTEzOCwxNy45OTU5MTg3IEMxOC40MjY5ODU4LDE3Ljk5NTkxODcgMTguODkyODk5NCwxNy41Mzg3NzU4IDE4Ljg5Mjg5OTQsMTYuOTc1NTEwNSBMMTguODkyODk5NCwxNC4zNjkzODggQzE5LjUwMTgxMSwxNC4zNjkzODggMTkuOTY3NzI0NiwxMy45MTI3NTU0IDE5Ljk2NzcyNDYsMTMuMzQ4OTc5OCBMMTkuOTY3NzI0Niw4LjE5NjQyODcyIEMxOS45Njc3MjQ2LDcuNjMyNjUzMiAxOS41MDE4MTEsNy4xNzYwMjA1NCAxOC45Mjc3Mzg5LDcuMTc2MDIwNTQgTDE4Ljg5Mjg5OTQsNC41NjkzODc4NCBaIiBpZD0iRmlsbC0xMiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
      debType:0, //欠款类型  0：企业应收,1:个人欠款
      debtorType:0, //债务人类型  1:个人,0:企业
      CollectionType:0, //催收类型 0：线上 1：：线下
    }
  }
  //关闭弹窗
  close(){
    this.setState({
      actIndex:0
    },()=>{
      this.props.closeSelect(false)
    })
  }
  //选择欠款类型
  selectDebtype(val:number){
    this.setState({
      debType:val,
      actIndex:1
    })
  }
  //选择债务人类型
  selectDebtorType(val:number){    
    if(this.props.type !== null){
      this.close()
      this.props.getSelect(this.state.debType,val,this.props.type)
    }else{
      this.setState({
        debtorType:val,
        actIndex:2
      })
    }
  }
  //选择催收类型
  selectCollectionType(val:number){
    this.setState({
      CollectionType:val,
    }, ()=>{
      this.close()
      this.props.getSelect(this.state.debType,this.state.debtorType,this.state.CollectionType)
    })
  }
  render(){
    const {img1,img2,img3,img4} = this.state
    let {actIndex} = this.state
    const {show,type} = this.props
    return(
      <div className={`Select ${show?'SelectShow':''}`}>
        <div className={`cell ${actIndex === 0?'show':''}`}>
          <p>请选择欠款类型</p>
          <div className="content">
            <div onClick={this.selectDebtype.bind(this,0)} className="box">
              <img src={img3} alt="企业应收"/>
              <p>企业应收账款</p>
            </div>
            <div  onClick={this.selectDebtype.bind(this,1)} className="box">
              <img src={img4} alt="个人欠款" />
              <p>个人欠款</p>
            </div>
          </div>
          <CloseOutlined onClick={this.close.bind(this)} style={{fontSize:"26px",color:"#fff"}} className="icon" />
        </div>
        <div className={`cell ${actIndex === 1?'show':''}`}>
          <p>请选择债务人类型</p>
          <div className="content">
            <div onClick={this.selectDebtorType.bind(this,0)} className="box box2">
              <img src={img2} alt="企业" />
              <p>企业</p>
            </div>
            <div onClick={this.selectDebtorType.bind(this,1)} className="box box2">
              <img src={img1} alt="个人" />
              <p>个人</p>
            </div>
          </div>
          <CloseOutlined onClick={this.close.bind(this)} style={{fontSize:"26px",color:"#fff"}} className="icon" />
        </div>
        { type === null &&
          <div className={`cell ${actIndex === 2?'show':''}`}>
          <p>请选择债务人类型</p>
          <div className="content">
            <div onClick={this.selectCollectionType.bind(this,0)} className="box box2">
              <img src={img5} alt="AI律师函" />
              <p>AI律师函</p>
            </div>
            <div onClick={this.selectCollectionType.bind(this,1)} className="box box2">
              <img src={img6} alt="律师办案" />
              <p>律师办案</p>
            </div>
          </div>
          <CloseOutlined onClick={this.close.bind(this)} style={{fontSize:"26px",color:"#fff"}} className="icon" />
          </div>
        }
      </div>
    )
  }
}

export default Select