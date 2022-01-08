Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    // innerText: {
    //   type: String,
    //   value: 'default value',
    // }
  },
  data: {
    // 这里是一些组件内部数据
    radio: '1'
  },
  methods: {
    // 这里是一个自定义方法
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
    //取消
    close() {
      this.triggerEvent("close");
    },
    //下一步
    next() {
      this.triggerEvent("getSelectVal", this.data.radio);
    }
  }
})