import { requstUrl } from "../../../utils/requestUrl"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ""
    },
    fromId: {
      type: String,
      value: ""
    },
    form_value: {
      type: String,
      value: ""
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    fileList: [],
    practice_license: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent: function () {
      if (this.data.form_value != '') {
        let content = this.data.form_value.split(',')
        let arr = []
        content.forEach(item => {
          let obj = {
            url: item,
            status: 'done',
            message: '上传成功',
          }
          arr.push(obj)
        })
        this.setData({
          fileList: arr
        })
      }
    },
    selecTap: function (e) {
      let index = e.currentTarget.dataset.index
      let arr = this.data.list
      let text = ""
      arr.forEach((item, idx) => {
        if (idx == index) {
          item.status = !item.status
          if (item.status) {
            text = item.name
          }
        } else {
          item.status = false
        }
      })
      this.setData({
        list: arr
      })
      let updata = {
        value: text,
        id: this.data.fromId
      }
      this.triggerEvent("up", updata)
    },
    //上传事件
    afterRead(event) {
      let that = this
      let arr = that.data.fileList
      event.detail.file.forEach(item => {
        let arr2 = {
          url: item.path,
          status: 'uploading',
          message: '上传中',
        }
        arr.push(arr2)
      })
      that.setData({
        fileList: arr
      })
      arr.forEach((item, index) => {
        that.upload(item.url, index)
      })
    },
    //微信上传
    upload(path, index) {
      let that = this
      wx.uploadFile({
        url: requstUrl.upLoadFile + '?type=4',
        filePath: path,
        name: 'uploadFile',
        // header: {}, // 设置请求的 header
        // formData: {}, // HTTP 请求中其他额外的 form data
        success: function (res) {
          if (res.errMsg == "uploadFile:ok") {
            let resData = JSON.parse(res.data)
            let list = that.data.fileList
            list[index].url = 'http://file.debteehelper.com' + resData.data.FileUrl + resData.data.FileExtension
            list[index].status = "done"
            // success
            that.setData({
              fileList: list,
              practice_license: resData.data.FileUrl + resData.data.FileExtension
            })
            let up = ""
            that.data.fileList.forEach(item => {
              up += item.url + ','
            })
            up = up.substring(0, up.lastIndexOf(','));
            let updata = {
              value: up,
              id: that.data.fromId
            }
            that.triggerEvent("up", updata)
          } else {
            that.setData({
              'fileList[index].status': 'failed'
            })
          }

        }
      })
    },
    //上传文件删除
    updataDelet(event) {
      let arr = this.data.fileList
      let arr2 = arr.splice(event.detail.index + 1, 1)
      this.setData({
        fileList: arr2
      })
    }
  },
  attached() {
    this.getContent()
  }
})
