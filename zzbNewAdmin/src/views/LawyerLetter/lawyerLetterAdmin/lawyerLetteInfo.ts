import { Component, Vue } from 'vue-property-decorator'
import { businessOptions } from '@/types/index'
import * as Api from '@/api/business'
import { baseURL } from '@/utils/request'
@Component({})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    express: [],
    info: {
      batch_no: '',
      execution_progress: '',
      lawyer_file: ''
    },
    lawyerLette: {
      debtor_name: '',
      receiving_name: '',
      receiving_phone: '',
      receiving_address: '',
      courier_receipt_img: '',
      execution_status: '',
      courier_company: '',
      courier_number: '',
      courier_receipt: '',
      express_return: '',
      express_return_reason: '',
      back_remarks: '',
      back_remarks_file: [],
      evidence_status: '',
      evidence_number: '',
      error_prompt: ''
    },
    addExpressData: {
      id: 0,
      log_logistics_id: '',
      update_time: '',
      update_context: ''
    }
  }
  input: string = ''
  desc: string = ''
  baseURl: string = ''
  filelist: any = []
  pdfsrc: string = ''
  created() {
    //
  }

  activated() {
    this.init()
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this
    self.baseURl = baseURL
    self.addExpress.update_context = ''
    self.addExpress.update_time = ''
    self.getInfo(self.$route.query.id)
  }
  //获取数据
  getInfo(id: number) {
    Api.getLawyerAdminInfo(id).then((res: any) => {
      this.data.info.batch_no = res.data.details.debtor_number
      this.data.info.execution_progress = res.data.details.execution_progress
      this.data.info.lawyer_file = res.data.details.lawyer_file
      Object.keys(this.data.lawyerLette).forEach((key: string) => {
        if (key === 'back_remarks_file') {
          if (res.data.details[key] != '' && res.data.details[key] != null) {
            this.filelist = JSON.parse(res.data.details[key])
            this.data.lawyerLette.back_remarks_file = JSON.parse(
              res.data.details[key]
            )
          }
        } else {
          this.data.lawyerLette[key] = res.data.details[key]
        }
      })
      this.data.express = res.data.list
    })
  }
  //新增快递进度
  addExpress() {
    this.data.addExpressData.log_logistics_id = this.$route.query.id
    let parmas: any = this.data.addExpressData
    Api.addExpress(parmas).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  handleChange(file: any, fileList: any) {
    this.filelist = fileList.slice(-3)
  }
  //信息保存
  joinInfo() {
    let parmas: any = Object.assign({}, this.data.lawyerLette)
    parmas['id'] = this.$route.query.id
    parmas['debtor_number'] = this.data.info.batch_no
    parmas['evidence_status'] = 0
    parmas['evidence_number'] = ''
    parmas.back_remarks_file = JSON.stringify(parmas.back_remarks_file)
    Api.joinExpress(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  handleAvatarSuccess(res: any, file: any) {
    this.data.lawyerLette.courier_receipt_img =
      'https://file.debteehelper.com' +
      res.data.FileUrl +
      res.data.FileExtension
  }
  handleAvatarSuccess2(res: any, file: any) {
    if (res.state) {
      let row: any = {
        name: file.name,
        url:
          'https://file.debteehelper.com' +
          res.data.FileUrl +
          res.data.FileExtension
      }
      this.data.lawyerLette.back_remarks_file.push(row)
    } else {
      this.$message.warning(res.msg)
    }
  }
  //文件列表移除
  handleRemove(file: any, fileList: any) {
    let List: any = this.data.lawyerLette.back_remarks_file
    List.forEach((item: any, index: number) => {
      if (item.name === file.name) {
        List = List.splice(index, 1)
      }
    })
  }
  //点击文件列表
  preview(file: any) {
    if (file.url != undefined) {
      window.open(file.url)
    } else {
      let url: string =
        'https://file.debteehelper.com' +
        file.response.data.FileUrl +
        file.response.data.FileExtension
      window.open(url)
    }
  }
  //提示
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 5 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  beforeAvatarUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isLt2M
  }
  //快递进度移除
  deleteRow(index: number, row: any) {
    this.$confirm('您确定移除此记录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.delectExpress(row.id).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.data.express = this.data.express.splice(index, 1)
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
  }
  //律师函下载
  dowload(url: string) {
    window.open(url)
  }
}
