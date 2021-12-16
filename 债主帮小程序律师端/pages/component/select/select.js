Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ""
    },
    form_value: {
      type: String,
      value: ""
    },
    fromId: {
      type: String,
      value: ""
    }
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
        if (this.data.form_value != '') {
          arr2.forEach(item => {
            if (item.name == this.data.form_value) {
              item.status = true
            }
          })
        }
        this.setData({
          list: arr2
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
        value: text || this.data.form_value,
        id: this.data.fromId
      }
      this.triggerEvent("up", updata)
    }
  },
  attached() {
    this.getContent()
  }
})
