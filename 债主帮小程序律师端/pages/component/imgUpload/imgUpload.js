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
      if (this.data.content !== "" && this.data.content !== undefined && this.data.content !== null) {
        console.log(this.data.content);
        this.setData({
          'fileList[0].url': this.data.content,
          'fileList[0].status': 'done',
        })
      }
    },
    // selecTap: function (e) {
    //   let index = e.currentTarget.dataset.index
    //   let arr = this.data.list
    //   let text = ""
    //   arr.forEach((item, idx) => {
    //     if (idx == index) {
    //       item.status = !item.status
    //       if (item.status) {
    //         text = item.name
    //       }
    //     } else {
    //       item.status = false
    //     }
    //   })
    //   this.setData({
    //     list: arr
    //   })
    //   let updata = {
    //     value: text,
    //     id: this.data.fromId
    //   }
    //   this.triggerEvent("up", updata)
    // },
    //上传事件
    afterRead(event) {
      let that = this
      let arr = that.data.fileList
      let arr2 = {
        url: event.detail.file.path,
        status: 'uploading',
        message: '上传中',
      }
      arr.push(arr2)
      that.setData({
        fileList: arr
      })
      wx.uploadFile({
        url: requstUrl.upLoadFile + '?type=4',
        filePath: event.detail.file.path,
        name: 'uploadFile',
        // header: {}, // 设置请求的 header
        // formData: {}, // HTTP 请求中其他额外的 form data
        success: function (res) {
          if (res.errMsg == "uploadFile:ok") {
            let resData = JSON.parse(res.data)
            // success
            that.setData({
              'fileList[0].url': 'http://file.debteehelper.com' + resData.data.FileUrl + resData.data.FileExtension,
              'fileList[0].status': 'done',
              practice_license: resData.data.FileUrl + resData.data.FileExtension
            })
            let updata = {
              value: resData.data.FileUrl + resData.data.FileExtension,
              id: that.data.fromId
            }

            that.triggerEvent("up", updata)
          } else {
            that.setData({
              'fileList[0].status': 'failed'
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
