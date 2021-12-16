import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../api/services'
@Component({
  components: {}
})
export default class About extends Vue {
  data: any = {
    id: 0,
    visible: false,
    actIndex: 0,
    actIndex2: 0,
    rightIndex: 0,
    infoTitle: '',
    labers: [
      {
        children: [
          { name: '委托信息' },
          { name: '执行进度' },
          { name: '委托报价' },
          // { name: "支付信息" },
          { name: '后台备注' }
        ]
      }
    ],
    BasicInfo: [
      { name: '财产保全申请人', value: '', prop: 'applicant' },
      { name: '财产保全被申请人', value: '', prop: 'respondent' },
      { name: '管辖法院所在地', value: '', prop: 'seat_of_court' },
      { name: '申请保全金额', value: '', prop: 'application_amount' },
      { name: '现有证据', value: '', prop: 'evidence_01' },
      { name: '证据资料文件', value: '', prop: 'evidence_file' },
      { name: '债务人财产线索', value: '', prop: 'property_clues' },
      { name: '财产线索说明', value: '', prop: 'property_clues_explain' },
      {
        name: '财产线索资料文件',
        value: '',
        prop: 'property_clues_file'
      },
      { name: '案件简介', value: '', prop: 'case_profiles' },
      { name: '联系人姓名', value: '', prop: 'contacts_name' },
      { name: '联系人手机号', value: '', prop: 'contacts_telphone' },
      { name: '联系人邮箱', value: '', prop: 'contacts_email' },
      { name: '备注', value: '', prop: 'member_remarks' }
    ],
    auditStatus: '',
    quote: '',
    updata: {
      Service_Process: '',
      price: 0,
      back_remarks: ''
    },
    states: {
      states0: false,
      states1: false,
      states2: false,
      states3: false,
      states4: false
    },
    edit: {
      applicant: '',
      respondent: '',
      seat_of_court: '',
      application_amount: '',
      evidence_01: '',
      evidence_02: '',
      evidence_file: '',
      property_clues: '',
      property_clues_explain: '',
      property_clues_file: '',
      case_profiles: '',
      contacts_name: '',
      contacts_telphone: '',
      contacts_email: '',
      member_remarks: ''
    }
  }
  sectionDom: any = {}
  height: number = 0
  fileList: any = []
  fileList2: any = []
  url: any = ''
  id: any = ''
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    self.height = document.body.offsetHeight - 208
    this.init()
  }

  beforeDestroy() {
    //
  }
  deactivated() {
    //
  }
  init() {
    let self: any = this
    self.getInfo(self.$route.params.entrust_no)
    let top: number = self.$refs.right.offsetTop //初始位置
    for (let index = 0; index <= this.data.labers[0].children.length; index++) {
      const domTop = self.$refs['section' + index].offsetTop - top
      self.sectionDom['section' + index] = domTop
    }
  }
  //获取管理详情
  getInfo(id: string) {
    let parmas: any = {
      type: 2,
      entrust_no: id
    }
    Api.GetServiceDetails(parmas)
      .then((res: any) => {
        this.data.auditStatus = res.data.execution_progress
        this.data.quote = res.data.quoted_price
        this.data.id = res.data.id
        this.id = res.data.id
        this.data.updata.back_remarks = res.data.back_remarks
        this.data.updata.Service_Process = res.data.executing_states
        this.data.BasicInfo.forEach((item: any) => {
          if (res.data[item.prop] !== undefined) {
            item.value = res.data[item.prop]
          }
        })
      })
      .catch((err: any) => {
        let self: any = this
        self.$message.error('网络错误')
      })
  }

  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this
    self.data.actIndex = index
    self.data.actIndex2 = 0
    self.laberClick2(index, 0)
  }
  //点击左侧二级菜单
  laberClick2(index: number, index2: number) {
    let self: any = this
    self.data.actIndex = index
    self.data.actIndex2 = index2
    if (index == 1) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length + index2
    } else if (index == 2) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length +
        self.data.labers[index - 2].children.length +
        index2
    } else {
      self.data.rightIndex = index2
    }
    let top: number = self.$refs.right.offsetTop //初始位置
    let dom: any = 'section' + self.data.rightIndex //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop
    self.$refs.right.scrollTop = actTop - top
  }
  //截取最后一个/后面的字符
  Mysubstring(str: string) {
    if (str === null) {
      return ''
    }
    return str.substring(str.lastIndexOf('/') + 1)
  }
  //打开文件地址
  openUrl(url: string) {
    window.open(url)
  }
  //执行进度保存
  save1() {
    let parmas: any = {
      type: 2,
      id: this.data.id,
      executing_states: this.data.updata.Service_Process
    }
    Api.UpdateExecutingStates(parmas).then((res: any) => {
      if (res.state) {
        this.data.states.states1 = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //委托报价保存
  save2() {
    let parmas: any = {
      type: 2,
      id: this.data.id,
      quoted_price: this.data.updata.price
    }
    Api.UpdateQuotedprice(parmas).then((res: any) => {
      if (res.state) {
        this.data.states.states2 = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //用户备注保存
  save3() {
    let parmas: any = {
      type: 2,
      id: this.data.id,
      back_remarks: this.data.updata.back_remarks
    }
    Api.UpdateBackRemarks(parmas).then((res: any) => {
      if (res.state) {
        this.data.states.states3 = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //返回
  revoke() {
    let self: any = this
    self.$router.go(-1)
  }
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 5 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  handlePreview(file: any) {
    if (file.url !== undefined) {
      window.open(file.url)
    } else {
      let raw =
        'https://file.debteehelper.com' +
        file.response.data.FileUrl +
        file.response.data.FileExtension
      window.open(raw)
    }
  }
  //图片上传成功
  handleAvatarSuccess(prop: string, res: any, file: any) {
    if (res.state == true) {
      let item: any = {
        name: file.name,
        url:
          'https://file.debteehelper.com' +
          res.data.FileUrl +
          res.data.FileExtension
      }
      if (prop === 'property_clues_file') {
        this.fileList.push(item)
      } else {
        this.fileList2.push(item)
      }
    } else {
      this.$message.warning('上传失败')
    }
  }
  Edit() {
    if (this.data.states.states0) {
      this.data.BasicInfo.forEach((item: any) => {
        if (item.prop === 'property_clues_file' && item.value !== null) {
          item.value.split(',').forEach((item2: any) => {
            if (item2 !== '') {
              this.fileList.push({
                name: this.Mysubstring(item2),
                url: item2
              })
            }
          })
        } else if (item.prop === 'evidence_file' && item.value !== null) {
          item.value.split(',').forEach((item2: any) => {
            if (item2 !== '') {
              this.fileList2.push({
                name: this.Mysubstring(item2),
                url: item2
              })
            }
          })
        } else {
          this.data.edit[item.prop] = item.value
        }
      })
    } else {
      Object.keys(this.data.edit).forEach((key: string) => {
        this.data.edit[key] = ''
      })
    }
  }
  //保存
  save() {
    if (this.fileList.length > 0) {
      this.fileList.forEach((item: any) => {
        this.data.edit['property_clues_file'] += item.url + ','
      })
      this.data.edit['property_clues_file'] = this.data.edit[
        'property_clues_file'
      ].slice(0, this.data.edit['property_clues_file'].length - 1)
    }
    if (this.fileList2.length > 0) {
      this.fileList2.forEach((item: any) => {
        this.data.edit['evidence_file'] += item.url + ','
      })
      this.data.edit['evidence_file'] = this.data.edit['evidence_file'].slice(
        0,
        this.data.edit['evidence_file'].length - 1
      )
    }
    this.data.edit['id'] = this.id
    Api.UpdatePreservationInsurance(this.data.edit).then((res: any) => {
      if (res.state) {
        this.data.states.states0 = !this.data.states.states0
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
