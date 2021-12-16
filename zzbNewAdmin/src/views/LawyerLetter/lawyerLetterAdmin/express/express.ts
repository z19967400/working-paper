import { Component, Vue } from 'vue-property-decorator'
import * as Api from '@/api/business'
import { baseURL } from '../../../../utils/request'
@Component({
  components: {}
})
export default class Express extends Vue {
  data: any = {
    list: [],
    burl: '',
    height: '',
    loading: false,
    beforUpload: []
  }
  mounted() {
    this.data.burl = baseURL
    let Wheight: number | null = document.body.offsetHeight
    this.data.height = Wheight - 480
  }
  //移除
  handleDelect(index: number) {
    this.$confirm('您确定移除该数据吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.data.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '移除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
  }
  //上传之前
  uploadBefore(file: any) {
    this.data.beforUpload.push(file)
    // if (this.data.beforUpload.length === 0) {
    //   this.data.loading = true;
    // }
  }
  //文件超出数量的钩子
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 50 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  //上传
  haldOnSuccess(res: any, file: any) {
    let list: any = JSON.parse(JSON.stringify(this.data.list))
    if (list.length < 100) {
      let row: any = res.data[0]
      row.send_time = row.send_time.replace('T', ' ')
      row.send_time = row.send_time.substr(0, row.send_time.lastIndexOf(':'))
      row.courier_receipt = row.courier_receipt == 0 ? '未收到' : '已收到'
      if (list.length != 0) {
        if (res.data[0].id == 0) {
          list = list.concat(res.data)
        } else {
          let filterData: any = list.filter((item: any) => {
            return item.id == res.data[0].id
          })
          if (filterData.length === 0) {
            list = list.concat(res.data)
          } else {
            list.forEach((item: any, index: number) => {
              if (item.id == res.data[0].id) {
                list[index] = res.data[0]
              }
            })
          }
        }
      } else {
        list = list.concat(res.data)
      }
      this.data.list = list
      // if (this.data.list.length === this.data.beforUpload.length) {
      //   this.data.loading = false;
      // }
    } else {
      this.$message.warning('委托核验输最大为100条数据')
      // this.data.loading = false;
    }
  }
  tableRowClassName(row: any, rowIndex: any) {
    if (!row.row.status) {
      return 'warning-row'
    } else {
      return 'success-row'
    }
    // return ''
  }
  //返回
  goBack() {
    this.$router.push('/LawyerLetter/lawyerLetteList')
  }
  //重新上传
  upAgain() {
    this.data.list = []
  }
  //保存并继续上传
  save() {
    let parmas: any = {
      courier_number_list: []
    }
    let list: any = this.data.list
    if (list.length === 0) {
      this.$message.warning('核验区至少应有1条数据')
      return false
    }
    list.forEach((item: any) => {
      let row: any = {
        id: item.id,
        courier_company: item.courier_company,
        courier_number: item.courier_number
      }
      parmas.courier_number_list.push(row)
    })
    Api.SaveCourierNumber(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.list = []
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //查看底单图片
  open(url: string) {
    window.open(url)
  }
}
