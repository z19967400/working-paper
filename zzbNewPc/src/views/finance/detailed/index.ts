import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance.ts";
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
    visible: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "job_number",
        label: "工号"
      },
      {
        value: "real_name",
        label: "姓名"
      },
      {
        value: "phone_no",
        label: "手机号"
      }
    ],
    dataType: [
      {
        label: "ID",
        prop: "id"
      },
      {
        label: "收支编号",
        prop: "pay_number"
      },
      {
        label: "账单编号",
        prop: "bill_number"
      },
      {
        label: "账户名称",
        prop: "account_name"
      },
      {
        label: "管理员名称",
        prop: "admin_name"
      },
      {
        label: "委托类别",
        prop: "batch_type_name"
      },
      {
        label: "委托次数",
        prop: "e_total"
      },
      {
        label: "收支类别",
        prop: "pay_type_name"
      },
      {
        label: "原单金额",
        prop: "total_amount"
      },
      {
        label: "支付方式",
        prop: "pay_method_name"
      },
      {
        label: "支付状态",
        prop: "pay_status_name"
      },
      {
        label: "结算状态",
        prop: "settlement_status_name"
      },
      {
        label: "发票状态",
        prop: "invoice_status_name"
      },
      {
        label: "创建时间",
        prop: "time"
      }
    ]
  };
  options: Options["GetPaging"] = {
    page: 1,
    limit: this.$store.getters.limit
  };
  info: any = [
    [
      { label: "收支编号", value: "", prop: "pay_number" },
      { label: "委托编号", value: "", prop: "batch_no" },
      { label: "账户名称", value: "", prop: "account_name" }
    ],
    [
      { label: "管理员", value: "", prop: "admin_name" },
      { label: "委托类别", value: "", prop: "e_total" },
      { label: "收支类别", value: "", prop: "pay_type_name" }
    ],
    [
      { label: "原单金额", value: "", prop: "total_amount" },
      { label: "实付金额", value: "", prop: "paid_amount" },
      { label: "支付方式", value: "", prop: "pay_method_name" }
    ],
    [
      { label: "支付状态", value: "", prop: "pay_status_name" },
      { label: "支付时间", value: "", prop: "pay_time" },
      { label: "账单编号", value: "", prop: "bill_number" }
    ],
    [
      { label: "发票状态", value: "", prop: "invoice_status_name" },
      { label: "结算状态", value: "", prop: "settlement_status_name " },
      { label: "创建时间", value: "", prop: "time" }
    ]
  ];
  created() {
    //
  }

  activated() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.getList(params);
  }
  //获取律师办案数据
  getList(params: Options["GetPaging"]) {
    let data: any = this.data;
    data.loading = true;
    Api.getDetails(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //详情
  handleEdit(data: any) {
    Api.getDetailedInfo(data.row.id).then((res: any) => {
      this.info.forEach((item: any) => {
        item.forEach((item2: any) => {
          if (item2.prop == "e_total") {
            item2.value =
              res.data["batch_type_name"] + "(" + res.data["e_total"] + "起)";
          } else {
            item2.value = res.data[item2.prop];
          }
        });
      });
    });
    this.data.visible = true;
  }
  //关闭详情
  close() {
    this.data.visible = false;
  }
  //搜索
  search(data: any) {
    let self: any = this;
    self.data.loading = true;
    self.options.page = 1;
    let params: any = Object.assign({}, self.options);
    data.forEach((item: any) => {
      let name: string = item.label;
      params[name] = item.value;
    });
    self.data.select = params;
    this.getList(params);
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this;
    self.data.select = {};
    this.init();
  }
  //分页
  watchChange(index: number) {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    params.page = index;
    self.init();
  }
  //选项卡切换
  handleClick(tab: any, event: any) {
    // eslint-disable-next-line no-console
    console.log(tab, event);
  }
}
