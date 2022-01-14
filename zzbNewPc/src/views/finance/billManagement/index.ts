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
    select: {},
    totalize: 0,
    options: [
      {
        value: "job_number",
        label: "账单编号"
      },
      {
        value: "real_name",
        label: "结算状态"
      },
      {
        value: "phone_no",
        label: "账单名称"
      },
      {
        value: "phone_no",
        label: "创建时间"
      }
    ],
    dataType: [
      { label: "账单编号", prop: "bill_number" },
      { label: "结算状态", prop: "name" },
      { label: "账单名称", prop: "member_id" },
      { label: "币种", prop: "account_name" },
      { label: "账单总金额", prop: "member_vip_account_id" },
      { label: "已结算金额", prop: "invoice_title_name" },
      { label: "创建时间", prop: "total_amount" }
    ]
  };
  options: any = {
    page: 1,
    limit: this.$store.getters.limit
  };
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
  //获取数据
  getList(params: any) {
    let data: any = this.data;
    data.loading = true;
    Api.getBill(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //管理详情
  handleEdit(data: any) {
    let id: number = data.id;
    this.$router.push({
      path: `/finance/billInfo/${id}`
    });
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
}
