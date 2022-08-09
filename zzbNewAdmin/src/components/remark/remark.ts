import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as Api from '@/api/user'
import { baseURL } from '@/utils/request'
import { api } from '../../../../zzbPc/src/assets/js/api'
@Component({
  components: {}
})
export default class remark extends Vue {
  @Prop({}) id!: number
  @Prop({}) remarks_type!: number //1 VIP用户备注 2:普通用户 3平台律师 4AI律师函 5律师办案 6账单管理
  dialogImageUrl: string = ''
  dialogVisible: boolean = false
  dialogVisible2: boolean = false
  disabled: boolean = false
  burl: string = ''
  data: any = {
    list: [],
    editData: {
      remarkText: '',
      fileList2: [],//上传的图片集合
      fileList3: [],//上传的列表集合
      newFileList: [], //编辑时新增的图片参数
    }
  }
  created() {
    this.burl = baseURL
  }
  mounted() {
    this.getData()
  }
  getData() {
    let params: any = {
      remarks_type: this.remarks_type,
      relation_number: this.id
    }
    Api.GetRemarksByTypeAndNumber(params).then((res: any) => {
      if (res.state) {
        res.data.remarks.forEach((item: any) => {
          let fileList: any = res.data.remarks_file.filter((item2: any) => { item2['url'] = item2.file_path; return item2.remarks_id == item.id && this.judgeImg(this.substr2(item2.file_path)) })
          let file_list2: any = res.data.remarks_file.filter((item2: any) => { item2['url'] = item2.file_path; item2['name'] = this.substr(item2.file_path); return item2.remarks_id == item.id && !this.judgeImg(this.substr2(item2.file_path)) })
          item['fileList'] = fileList
          item['file_list2'] = file_list2
          item['type'] = false
        })
        this.data.list = res.data.remarks
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //时间转码
  timeStr(time: string) {
    let time1: string = time.replace('T', ' ')
    let time2: string = time1.substring(0, time1.lastIndexOf(':'))
    return time2
  }
  //截取/之后字符串
  substr(str: string) {
    if (str) {
      var index = str.lastIndexOf("/")
      return str.substring(index + 1, str.length)
    } else {
      return false
    }

  }
  //截取.之后字符串
  substr2(str: string) {
    if (str) {
      var index = str.lastIndexOf(".")
      return str.substring(index + 1, str.length)
    } else {
      return ''
    }
  }
  //判断是不是图片
  judgeImg(str: string) {
    const isJPG = 'jpg/png/tif/gif/svg/jpeg'
    return isJPG.indexOf(str) != -1
  }
  //图片文件删除
  handleRemove(file: any) {
    this.$confirm('您确定删除该图片吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      if (file.id) {
        Api.DeleteRemarksFileByID(file.id).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.data.editData.fileList2 = this.data.editData.fileList2.filter((item: any) => { return item.id != file.id })
          } else {
            this.$message.warning(res.msg)
            return false
          }
        })
      } else {
        this.data.editData.fileList2 = this.data.editData.fileList2.filter((item: any) => { return item.uid != file.uid })
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  }
  //图片查看
  handlePictureCardPreview(file: any) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
  // 图片查看2
  handlePictureCardPreview2(url: string) {
    this.dialogImageUrl = url;
    this.dialogVisible = true;
  }
  //文件查看
  openFile(url: string) {
    window.open(url)
  }
  handleDownload(file: any) {
    // eslint-disable-next-line no-console
    console.log(file);
  }
  //图片文件上传
  updataFuc(file: any, type?: string) {
    let url: string =
      'https://file.debteehelper.com' +
      file.data.FileUrl +
      file.data.FileExtension
    this.data.editData.fileList2.push({ url: url })
    if (type === 'edit') {
      this.data.editData.newFileList.push(url)
    }
  }
  //文件列表删除
  handleRemove2(file: any, fileList: any) {
    if (file.id) {
      Api.DeleteRemarksFileByID(file.id).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.warning(res.msg)
          return false
        }
      })
    } else {
      this.data.editData.fileList3 = this.data.editData.fileList3.filter((item: any) => { return item.uid != file.uid })
    }
  }
  //文件列表查看
  handlePreview(file: any) {
    window.open(file.url)
  }
  handleExceed(files: any, fileList: any) {
    this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`);
  }
  //列表文件上传
  updataFuc2(file: any, type?: string) {
    let url: string =
      'https://file.debteehelper.com' +
      file.data.FileUrl +
      file.data.FileExtension
    let name: string = file.data.FileName
    this.data.editData.fileList3.push({ name: name, url: url })
    if (type === 'edit') {
      this.data.editData.newFileList.push(url)
    }
  }
  //关闭新增弹窗
  handleClose(done: any) {
    done()
  }
  //打开新增弹窗
  openAddRemarks() {
    this.data.editData = {
      remarkText: '',
      fileList2: [],
      fileList3: [],
      newFileList: []
    }
    this.data.list.forEach((item: any) => {
      item['type'] = false
    })
    this.dialogVisible2 = true
  }
  //确定新增备注
  add() {
    let params: any = {
      remarks_type: this.remarks_type,
      relation_number: this.id,
      remarks_content: this.data.editData.remarkText,
      file_list: []
    }
    this.data.editData.fileList2.forEach((item: any) => {
      params.file_list.push(item.url)
    })
    this.data.editData.fileList3.forEach((item: any) => {
      params.file_list.push(item.url)
    })
    Api.AddRemarks(params).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.dialogVisible2 = false
        this.getData()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //编辑
  edit(row: any, index: number) {
    if (this.data.list[index].type) {
      this.data.list[index].type = false
      this.data.editData = {
        remarkText: '',
        fileList2: [],//上传的图片集合
        fileList3: [],//上传的列表集合
        newFileList: []
      }
      this.getData()
    } else {
      this.data.editData = {
        remarkText: row.remarks_content,
        fileList2: row.fileList,//上传的图片集合
        fileList3: row.file_list2,//上传的列表集合
        newFileList: []
      }
      this.data.list.forEach((item: any) => {
        item['type'] = false
      })
      this.data.list[index].type = true
    }
  }
  //编辑提交
  editSubmit(id: string) {
    if (this.data.editData.newFileList.length == 0) {
      this.getData()
      return false
    }
    this.UpdateRemarksContent(id).then((res: any) => {
      let parmas: any = {
        id: id,
        file_path: this.data.editData.newFileList
      }
      Api.AddRemarksFile(parmas).then((res2: any) => {
        if (res2.state) {
          this.$message.success(res2.msg)
          this.getData()
        } else {
          this.$message.warning(res2.msg)
        }
      })
    }, (error: any) => {
      // eslint-disable-next-line no-console
      console.log(error)
    }).catch((error: any) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })
  }
  //修改备注文字
  UpdateRemarksContent(id: string) {
    let parmas: any = {
      id: id,
      remarks_content: this.data.editData.remarkText
    }
    return new Promise<void>((resolve, reject) => {
      Api.UpdateRemarksContent(parmas).then((res: any) => {
        if (res.state) {
          resolve(res)
        } else {
          this.$message.warning(res.msg)
          reject('error')
        }
      })
    })
  }
  //删除备注
  DeleteRemarksByID(id: number) {
    this.$confirm('您确定删除该备注吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      Api.DeleteRemarksByID(id).then((res: any) => {
        if (res.state) {
          this.getData()
        } else {
          this.$message.warning(res.msg)
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });

  }
}
