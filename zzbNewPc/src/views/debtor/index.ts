import * as Api from "@/api/debtor";
import { debtorData } from "./../../types/views/debtor.interface";
/* eslint-disable prettier/prettier */
import { Component, Vue } from "vue-property-decorator";
import {
  comtable,
  comselect,
  comOperation,
  comPaging
} from "@/components/index";
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging
  }
})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    loading: false,
    // 表格数据
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "debtor_name",
        label: "债务人名称"
      },
      {
        value: "account_name",
        label: "vip账户名称"
      },
      {
        value: "admin_name",
        label: "vip管理员名称"
      }
    ],
    dataType: [
      // {
      //   label: "ID",
      //   prop: "id"
      // },
      {
        label: "管理员名称",
        prop: "name"
      },
      {
        label: "委托编号",
        prop: "batch_no",
        width: "120px"
      },
      {
        label: "债务人名称",
        prop: "debtor_name"
      },
      {
        label: "债务人类别",
        prop: "debtor_type_name"
      },
      {
        label: "债务企业负责人",
        prop: "contact_person",
        width: "150px"
      },
      {
        label: "手机号码",
        prop: "phone_number",
        width: "120px"
      },
      {
        label: "邮箱",
        prop: "email",
        width: "120px"
      },
      {
        label: "地区",
        prop: "address_txt"
      },
      {
        label: "委托类别",
        prop: "entrust_type_name"
      },
      {
        label: "委托进度",
        prop: "execution_progress_name"
      },
      {
        label: "债务人反馈",
        prop: "count"
      },
      {
        label: "欠款币种",
        prop: "currency_name"
      },
      {
        label: "欠款本金",
        prop: "arrears_principal"
      },
      {
        label: "利息/违约金/滞纳金",
        prop: "arrears_interest"
      },
      {
        label: "回款金额",
        prop: "repayment_amount"
      },
      {
        label: "失信执行人",
        prop: "is_dishonesty"
      }
    ]
  };
  options: debtorData["getData"] = {
    page: 1,
    limit: this.$store.getters.limit,
    debtor_name: "",
    account_name: "",
    admin_name: ""
  };

  // created() {

  // }

  activated() {
    // eslint-disable-next-line no-console
    // console.log(111);
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  // mounted() {

  // }

  // 初始化函数
  init() {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.debtorGetPaging(params);
  }
  //获取数据
  debtorGetPaging(params: debtorData["getData"]) {
    let data: any = this.data;
    data.loading = true;
    Api.debtorGetPaging(params)
      .then((res: any) => {
        data.loading = false;
        data.list = res.data;
        // 数据条数
        data.totalize = res.count;
      })
      .catch(() => {
        data.loading = false;
        this.$message.error("网络异常");
      });
  }
  //编辑
  handleInfo(data: any) {
    this.$router.push({
      path: "/detailed",
      query: { id: data.row.id }
    });
  }
  //删除
  handleDelete(data: any) {}
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
    this.debtorGetPaging(params);
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this;
    self.data.select = {};
    this.init();
  }
  //添加编辑
  add() {
    //
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
