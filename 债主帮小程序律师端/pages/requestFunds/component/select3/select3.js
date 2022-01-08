Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.setData({
          arrList: newVal,
          list2: [
            { name: '给付', id: '给付' },
            { name: '折抵', id: '折抵' },
            { name: '其他', id: '其他' }
          ]
        })
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    show: false,
    currency_name: '',
    arrList: [],
    parmas: {
      collection_currency_id: 1,
      collection_amount: 0,
      collection_mode: '',
      collection_date: '',
      collection_remarks: ''
    },
    list2: [],
    defaultOption: { id: '给付', name: "给付" }
  },
  methods: {
    // 这里是一个自定义方法
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
    onChange2(event) {
      let parmas = this.data.parmas
      parmas.collection_currency_id = event.detail
      this.setData({
        parmas
      })
    },
    onChange3(event) {
      let parmas = this.data.parmas
      parmas.collection_mode = event.detail
      this.setData({
        parmas
      })
    },
    //取消
    close() {
      this.triggerEvent("close");
    },
    //下一步
    next() {
      this.triggerEvent("getSelectVal3", this.data.radio);
    },
    showPopup() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },

  }
})