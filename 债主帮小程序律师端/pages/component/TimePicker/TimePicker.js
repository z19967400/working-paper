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
      let updata = {
        value: value,
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
