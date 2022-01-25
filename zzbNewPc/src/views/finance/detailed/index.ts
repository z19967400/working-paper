import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance";
import { Options } from "@/types/index";
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
    list: [],
    list2: [],
    value1: "",
    height: 0,
    totalize: 0,
    type: "AI律师函支付明细",
    dataType: [
      {
        label: "委托批次号",
        prop: "batch_no",
        width: "120"
      },
      {
        label: "支付状态",
        prop: "pay_status",
        width: "100"
      },
      {
        label: "债权人",
        prop: "creditor_name"
      },
      {
        label: "委托数量",
        prop: "e_total",
        width: "100"
      },
      {
        label: "单价",
        prop: "unit_price",
        width: "100"
      },
      {
        label: "应付金额",
        prop: "paid_amount",
        width: "100"
      },
      {
        label: "管理员",
        prop: "admin_name",
        width: "150"
      },
      {
        label: "创建时间",
        prop: "create_time",
        width: "150"
      },
      {
        label: "备注",
        prop: "bill_remarks",
        width: "150"
      }
    ],
    dataType2: [
      {
        label: "委托编号",
        prop: "debtor_number",
        width: "150"
      },
      {
        label: "结算状态",
        prop: "settlement_status",
        width: "120"
      },
      {
        label: "债权人",
        prop: "creditor_name",
        width: "250"
      },
      {
        label: "债务人",
        prop: "debtor_name",
        width: "250"
      },
      {
        label: "办案事项",
        prop: "entrusted_matters",
        width: "280"
      },
      {
        label: "办案律师",
        prop: "lawyer_name",
        width: "100"
      },
      {
        label: "管理员",
        prop: "admin_name",
        width: "100"
      },
      {
        label: "创建时间",
        prop: "create_time",
        width: "150"
      },
      {
        label: "固定服务费",
        prop: "fixed_service_fee",
        width: "120"
      },
      {
        label: "风险服务费",
        prop: "fixed_service_fee",
        width: "120"
      },
      {
        label: "备注",
        prop: "bill_remarks",
        width: "220"
      }
    ],
    settlements: [
      { value: "Settlement_Status_0", label: "审核中" },
      { value: "Settlement_Status_1", label: "用户确认" },
      { value: "Settlement_Status_2", label: "客服确认" },
      { value: "Settlement_Status_3", label: "开票中" },
      { value: "Settlement_Status_4", label: "结算中" },
      { value: "Settlement_Status_5", label: "已结算" },
      { value: "Settlement_Status_6", label: "已退款" }
    ]
  };
  //AI律师函支付明细参数
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    pay_status: "",
    batch_no: "",
    creditor_name: "",
    start_time: "",
    end_time: ""
  };
  options2: any = {
    page: 1,
    limit: this.$store.getters.limit,
    pay_status: "",
    debtor_number: "",
    settlement_status: "",
    creditor_name: "",
    debtor_name: "",
    lawyer_name: "",
    start_time: "",
    end_time: ""
  };

  created() {
    let Wheight: number | null = document.body.offsetHeight;
    this.data.height = Wheight - 260;
  }

  activated() {
    this.init();
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let params =
      this.data.type === "AI律师函支付明细" ? this.options : this.options2;
    this.getList(params);
  }
  //获取律师办案数据
  getList(params: any) {
    this.data.loading = true;
    if (this.data.type === "AI律师函支付明细") {
      Api.GetAIPayRecordsPagingData(params).then((res: any) => {
        res.data.forEach((item: any) => {
          item.pay_status =
            item.pay_status == "Pay_Status_0" ? "待支付" : "已支付";
          item.create_time = this.timeStr(item.create_time);
          item.unit_price = item.unit_price + ".00";
          item.paid_amount = this.thousandBitSeparator(item.paid_amount);
        });
        this.data.list = res.data;
        this.data.loading = false;
        this.data.totalize = res.total;
      });
    } else {
      Api.GetCasePayRecordsPagingData(params).then((res: any) => {
        res.data.forEach((item: any) => {
          item.settlement_status = this.getSettlementName(
            item.settlement_status
          );
          item.create_time = this.timeStr(item.create_time);
          item.fixed_service_fee = this.thousandBitSeparator(
            item.fixed_service_fee
          );
          item.collection_amount = this.thousandBitSeparator(
            item.collection_amount
          );
          item.float_service_rate = item.float_service_rate + " %";
          item.float_service_fee = this.thousandBitSeparator(
            item.float_service_fee
          );
        });
        this.data.list2 = res.data;
        this.data.loading = false;
        this.data.totalize = res.total;
      });
    }
  }

  //搜索
  search(data: any) {
    let params = this.options;
    this.getList(params);
  }
  //清除搜索项
  clearSelection() {
    this.data.value1 = "";
    this.options = {
      page: 1,
      limit: this.$store.getters.limit,
      pay_status: "",
      batch_no: "",
      creditor_name: "",
      start_time: "",
      end_time: ""
    };
    this.options2 = {
      page: 1,
      limit: this.$store.getters.limit,
      pay_status: "",
      debtor_number: "",
      settlement_status: "",
      creditor_name: "",
      debtor_name: "",
      lawyer_name: "",
      start_time: "",
      end_time: ""
    };
    this.init();
  }
  //时间选中回调
  timeChange(val: any) {
    if (val) {
      if (this.data.type == "AI律师函支付明细") {
        this.options.start_time = val[0];
        this.options.end_time = val[1];
      } else {
        this.options2.start_time = val[0];
        this.options2.end_time = val[1];
      }
    } else {
      if (this.data.type == "AI律师函支付明细") {
        this.options.start_time = "";
        this.options.end_time = "";
      } else {
        this.options2.start_time = "";
        this.options2.end_time = "";
      }
    }
  }
  //分页
  watchChange(index: number) {
    let parmas: any =
      this.data.type === "AI律师函支付明细" ? this.options : this.options2;
    parmas.page = index;
    this.getList(parmas);
  }
  //类别切换回调
  selectChange(val: string) {
    let parmas: any = val === "AI律师函支付明细" ? this.options : this.options2;
    parmas.page = 1;
    this.getList(parmas);
  }
  //时间转码
  timeStr(str: string) {
    let str1: string = str.replace("T", " ");
    let str2: string = str1.substring(0, str1.lastIndexOf(":"));
    return str2;
  }
  //结算状态转码
  getSettlementName(str: string) {
    let val: string = "未生成";
    switch (str) {
      case "Settlement_Status_0":
        val = "审核中";
        break;
      case "Settlement_Status_1":
        val = "用户确认";
        break;
      case "Settlement_Status_2":
        val = "客服确认";
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
  //千位符
  thousandBitSeparator(num: number) {
    return num.toLocaleString();
  }
  //跳转账单
  handlInfo(row: any) {
    let number: string = row.bill_number;
    this.$router.push({
      path: `/finance/billInfo/${number}`
    });
  }
}
