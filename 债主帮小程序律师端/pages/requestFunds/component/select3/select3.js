import Toast from '../../../../miniprogram/miniprogram_npm/vant-weapp/toast/toast';
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
    },
    time: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        let parmas = this.data.parmas
        parmas.collection_date = newVal
        this.setData({
          parmas
        })
      }
    },
    riskFee: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        this.setData({
          FxRiskFee: newVal
        })
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    show: false,
    show2: false,
    currency_name: '',
    index: 0,
    arrList: [],
    FxRiskFee: '', //风险律师费率
    lawyerFee: 0, //风险律师费额
    collection_currency_name: '人民币', //币种单位
    parmas: {
      collection_currency_id: 1,
      collection_amount: 0,
      collection_mode: '给付',
      collection_date: '',
      collection_remarks: ''
    },
    list2: [],
    defaultOption: { id: '给付', name: "给付" },
  },
  methods: {
    // 这里是一个自定义方法
    onChange(event) {
      let parmas = this.data.parmas
      parmas.collection_amount = event.detail.value
      this.setData({
        parmas: parmas,
      });
    },
    //币种下拉选择回调
    onChange2(event) {
      let parmas = this.data.parmas
      parmas.collection_currency_id = event.detail.id
      this.setData({
        parmas,
        collection_currency_name: event.detail.name
      })
    },
    //回款方式下拉选择回调
    onChange3(event) {
      let parmas = this.data.parmas
      parmas.collection_mode = event.detail.id
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
      if (this.data.lawyerFee == 0) {
        Toast('请先计算律师费')
        return false
      }
      this.triggerEvent("getSelectVal", this.data.parmas);
    },
    showPopup() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    openTImeBox() {
      this.triggerEvent("openTimeBox");
    },
    //重新计算律师费
    Recalculate() {
      if (this.data.parmas.collection_amount == 0) {
        Toast('回款金额不可为空')
        return false
      }
      let prime = this.data.parmas.collection_amount * (this.data.FxRiskFee * 0.01)
      this.setData({
        lawyerFee: prime.toFixed(2),
        show2: true
      })
    },
    //备注输入监听
    textareaChange(event) {
      let parmas = this.data.parmas
      parmas.collection_remarks = event.detail.value
      this.setData({
        parmas
      })
    }
  }
})