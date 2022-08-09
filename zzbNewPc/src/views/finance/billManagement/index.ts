import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance";
import {
  comselect,
  comtable,
  comOperation,
  comPaging
} from "@/components/index";
@Component({
  components: {
    comselect,
    comtable,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  data: any = {
    loading: false,
    visible: false,
    list: [],
    value1: "",
    // select: {},
    totalize: 0,
    // options: [
    //   {
    //     value: "bill_number",
    //     label: "账单编号"
    //   },
    //   {
    //     value: "settlement_status",
    //     label: "结算状态"
    //   },
    //   {
    //     value: "bill_title",
    //     label: "账单名称"
    //   },
    //   {
    //     value: "start_time",
    //     label: "创建时间"
    //   }
    // ],
    dataType: [
      { label: "账单编号", prop: "bill_number" },
      { label: "结算状态", prop: "settlement_status" },
      { label: "账单名称", prop: "bill_title" },
      { label: "币种", prop: "currency_name" },
      { label: "账单总金额", prop: "bill_total_amount" },
      { label: "已结算金额", prop: "bill_settled_amount" },
      { label: "创建时间", prop: "create_time" }
    ]
  };
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    bill_number: "",
    settlement_status: "",
    bill_title: "",
    start_time: "",
    end_time: ""
  };
  settlements: any = [
    { value: "Settlement_Status_0", label: "审核中" },
    { value: "Settlement_Status_1", label: "待确认账单" },
    { value: "Settlement_Status_2", label: "账单复核中" },
    { value: "Settlement_Status_3", label: "开票中" },
    { value: "Settlement_Status_4", label: "结算中" },
    { value: "Settlement_Status_5", label: "已结算" },
    { value: "Settlement_Status_6", label: "已退款" }
  ];
  created() {
    //
  }

  activated() {
    this.init();
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this;
    let params: any = self.options;
    this.getList(params);
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data;
    data.loading = true;
    Api.GetBillPagingData(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.list.forEach((item: any) => {
        item.settlement_status = this.getSettlementName(item.settlement_status);
        item.bill_total_amount = this.thousandBitSeparator(
          item.bill_total_amount
        );
        item.bill_settled_amount = this.thousandBitSeparator(
          item.bill_settled_amount
        );
      });
      // eslint-disable-next-line no-console
      console.log(res.data);

      data.totalize = res.total;
    });
  }
  //管理详情
  handleEdit(data: any) {
    let id: number = data.bill_number;
    this.$router.push({
      path: `/finance/billInfo/${id}`
    });
  }
  //搜索
  search() {
    let self: any = this;
    self.data.loading = true;
    self.options.page = 1;
    let params: any = Object.assign({}, self.options);
    this.getList(params);
  }
  //清除搜索项
  clearSelection() {
    let self: any = this;
    self.data.value1 = "";
    self.options = {
      page: 1,
      limit: this.$store.getters.limit,
      bill_number: "",
      settlement_status: "",
      bill_title: "",
      start_time: "",
      end_time: ""
    };
    this.init();
  }
  //分页
  watchChange(index: number) {
    let self: any = this;
    let params: any = self.options;
    params.page = index;
    self.init();
  }
  //结算状态转码
  getSettlementName(str: string) {
    let val: string = "";
    switch (str) {
      case "Settlement_Status_0":
        val = "审核中";
        break;
      case "Settlement_Status_1":
        val = "待确认账单";
        break;
      case "Settlement_Status_2":
        val = "账单复核中";
        break;
      case "Settlement_Status_3":
        val = "开票中";
        break;
      case "Settlement_Status_4":
        val = "结算中";
        break;
      case "Settlement_Status_5":
        val = "已结算";
        break;
      case "Settlement_Status_6":
        val = "已退款";
        break;
      default:
        break;
    }
    return val;
  }
  //数字千位符保留小数点后两位
  thousandBitSeparator(num: number) {
    let val: string = num.toString();
    //不含小数点
    if (val.indexOf(".") == -1) {
      return num.toLocaleString() + ".00";
    } else {
      //含有小数点
      let ws: string = val.substring(val.lastIndexOf(".") + 1, val.length);
      if (ws.length == 1) {
        //小数点后有一位
        return num.toLocaleString() + "0";
      } else if (ws.length == 2) {
        //小数点后有两位
        return num.toLocaleString();
      } else {
        let val2: string = num.toLocaleString();
        let val3: number = Number(val2);
        return val3.toFixed(2);
      }
    }
  }
  //时间选中回调
  timeChange(val: any) {
    if (val) {
      this.options.start_time = val[0];
      this.options.end_time = val[1];
    } else {
      this.options.start_time = "";
      this.options.end_time = "";
    }
  }
}
