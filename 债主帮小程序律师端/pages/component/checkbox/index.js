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
    list: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getContent: function () {
      if (this.data.content !== "" && this.data.content !== undefined && this.data.content !== null) {
        let arr = this.data.content.split(",")
        let arr2 = []
        arr.forEach(item => {
          let obj = {
            name: item,
            status: false
          }
          arr2.push(obj)
        })
        this.setData({
          list: arr2
        })
      }
    },
    checkboxTap: function (e) {
      let index = e.currentTarget.dataset.index
      let arr = this.data.list
      let text = ""
      arr.forEach((item, idx) => {
        if (idx == index) {
          item.status = !item.status
        }
      })
      this.setData({
        list: arr
      })
      this.data.list.forEach(item => {
        if (item.status) {
          text += item.name + ','
        }
      })
      text = text.substring(0, text.lastIndexOf(","))
      let updata = {
        value: text,
        id: this.data.fromId
      }
      this.triggerEvent("up", updata)
    }
  },
  attached() {
    this.getContent()
  }
})
