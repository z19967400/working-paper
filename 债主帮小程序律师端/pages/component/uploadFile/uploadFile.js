import Toast from '../../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
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
    list: [],
    value: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent: function () {
      if (this.data.content !== "" && this.data.content !== undefined && this.data.content !== null) {
        console.log(this.data.content);
      }
    },
    //上传事件
    afterRead(event) {
      console.log(event);
      let that = this
      wx.uploadFile({
        url: requstUrl.upLoadFile + '?type=4',
        filePath: event.detail.file.path,
        name: 'uploadFile',
        success: function (res) {
          let resData = JSON.parse(res.data)
          let updata = {
            value: resData.data.FileUrl + resData.data.FileExtension,
            id: that.data.fromId
          }
          that.setData({
            value: updata.value
          })
          that.triggerEvent("up", updata)
        }
      })
    },
    submit(e) {
      console.log(e);
      wx.chooseMessageFile({
        count: 10,
        type: 'file',
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles
        }
      })
    }
  },
  attached() {
    this.getContent()
  }
})
