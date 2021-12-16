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
    value: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent: function () {
      if (this.data.form_value != '') {
        this.setData({
          value: this.data.form_value
        })
      }
    },
    textareaInput: function (e) {
      let text = e.detail.value
      this.setData({
        value: text
      })
      let updata = {
        value: this.data.value,
        id: this.data.fromId
      }
      this.triggerEvent("up", updata)
    }
  },
  attached() {
    this.getContent()
  }
})
