Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    number: {
      type: Number,
      value: '',
      observer: function (newVal, oldVal) {
        console.log(newVal);
        this.setData({
          value1: newVal
        })
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    value1: ''
  },
  methods: {
    // 这里是一个自定义方法
    onChange(e) {
      this.setData({
        value1: e.detail.value,
      });
    },
    //取消
    close() {
      this.triggerEvent("close");
    },
    //下一步
    next() {
      this.triggerEvent("getSelectVal", this.data.value1);
    }
  }
})