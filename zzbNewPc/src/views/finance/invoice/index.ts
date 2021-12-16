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
    options: [],
    dataType: [
      {
        label: "发票抬头",
        prop: "invoice_title"
      },
      {
        label: "发票类型",
        prop: "invoice_title_type_name"
      },
      {
        label: "纳税人识别号",
        prop: "tax_number"
      },
      {
        label: "收票人姓名",
        prop: "name"
      },
      {
        label: "会员名称",
        prop: "account_name"
      },
      {
        label: "管理员名称",
        prop: "admin_name"
      },
      {
        label: "开户银行",
        prop: "bank_name"
      },
      {
        label: "银行电话",
        prop: "bank_telephone"
      },
      {
        label: "详细地址",
        prop: "detailed_address"
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
  getList(params: Options["GetPaging"]) {
    let data: any = this.data;
    data.loading = true;
    Api.getInformation(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //查看账单
  handleEdit(data: any) {
    //
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
