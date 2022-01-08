Component({
  properties: {
    options: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        let result = []
        // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
        if (this.data.key !== 'id' || this.data.text !== 'name') {
          for (let item of newVal) {
            let { [this.data.key]: id, [this.data.text]: name } = item
            result.push({ id, name })
          }
        } else {
          result = newVal
        }
        this.setData({
          current: Object.assign({}, this.data.defaultOption),
          result: result
        })
      }
    },
    defaultOption: {
      type: Object,
      value: {
        id: '1',
        name: '人民币'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    result: [],
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
        isShow: false
      });

      // 调用父组件方法，并传参
      this.triggerEvent("change", { ...dataset })
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },

    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  }
})