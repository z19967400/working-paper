import Toast from '../../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
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
    value: "",
    value2: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent: function () {
      if (this.data.content !== "" && this.data.content !== undefined && this.data.content !== null) {
        let arr = this.data.content.split(",")
        this.setData({
          list: arr
        })
      }
    },
    bindPickerChange: function (e) {
      let value = e.detail.value
      this.setData({
        value: value
      })
    },
    bindPickerChange2: function (e) {
      if (this.data.value == "") {
        Toast.fail('请选起始时间');
        return false
      }
      let value = e.detail.value
      this.setData({
        value2: value
      })
      let updata = {
        value: value + "," + this.data.value2,
        id: this.data.fromId
      }
      console.log(updata);
      this.triggerEvent("up", updata)
    }
  },
  attached() {
    this.getContent()
  }
})
