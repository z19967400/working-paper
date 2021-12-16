import { Component, Vue } from "vue-property-decorator";
import * as Api from "@/api/AIlvshihan";
import {
  comselect,
  comtable,
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
  data: any = {
    loading: false,
    visible: false,
    // 表格数据
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "debtor_number",
        label: "委托编号"
      },
      {
        value: "creditor_name",
        label: "债权人名称"
      },
      {
        value: "debtor_name",
        label: "债务人名称"
      },
      {
        value: "create_name",
        label: "创建人"
      },
      {
        value: "create_time",
        label: "创建时间"
      },
      {
        value: "case_status",
        label: "办案进度"
      }
    ],
    dataType: [
      {
        label: "委托编号",
        prop: "debtor_number",
        width: "180"
      },
      {
        label: "债权人名称",
        prop: "creditor_name",
        width: "330"
      },
      {
        label: "债务人名称",
        prop: "debtor_name",
        width: "220"
      },
      {
        label: "欠款币种",
        prop: "currency_name",
        width: "90"
      },
      {
        label: "欠款本金",
        prop: "arrears_principal",
        width: "150"
      },
      {
        label: "违约金/利息/滞纳金",
        prop: "arrears_interest",
        width: "150"
      },
      {
        label: "办案地区",
        prop: "case_handling_area",
        width: "220"
      },
      {
        label: "办案进度",
        prop: "case_progress",
        width: "120"
      },
      // {
      //   label: "债务类别",
      //   prop: "collection_scene"
      // },
      // {
      //   label: "案件状态",
      //   prop: "case_status"
      // },
      {
        label: "创建人",
        prop: "member_name",
        width: "150"
      },
      {
        label: "创建时间",
        prop: "entrust_time",
        width: "180"
      }
    ]
  };
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    case_status: "",
    debtor_number: "",
    creditor_name: "",
    debtor_name: "",
    create_time: "",
    create_name: ""
  };
  navIndex: number = 0;
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
    Api.getCaseList(params)
      .then((res: any) => {
        data.loading = false;
        data.list = res.data;
        data.list.forEach((item: any) => {
          item.entrust_time = item.entrust_time.substring(
            0,
            item.entrust_time.lastIndexOf(":")
          );
        });
        // 数据条数
        data.totalize = res.total;
        if (data.list.length > 0) {
          data.list.forEach((item: any) => {
            item.arrears_principal = item.arrears_principal.toLocaleString();
            if (item.arrears_principal.indexOf(".") == -1) {
              item.arrears_principal = item.arrears_principal + ".00";
            } else {
              let str1: string = item.arrears_principal.substring(
                0,
                item.arrears_principal.indexOf(".")
              );
              let str2: string = item.arrears_principal_str.substring(
                item.arrears_principal_str.indexOf("."),
                item.arrears_principal_str.length
              );
              item.arrears_principal = str1 + str2;
            }
            item.arrears_interest = item.arrears_interest.toLocaleString();
            if (item.arrears_interest.indexOf(".") == -1) {
              item.arrears_interest = item.arrears_interest + ".00";
            } else {
              let str1: string = item.arrears_interest.substring(
                0,
                item.arrears_interest.indexOf(".")
              );
              let str2: string = item.arrears_interest_str.substring(
                item.arrears_interest_str.indexOf("."),
                item.arrears_interest_str.length
              );
              item.arrears_interest = str1 + str2;
            }
          });
        }
      })
      .catch(() => {
        data.loading = false;
        this.$message.error("网络异常");
      });
  }
  //详情
  handleInfo(data: any) {
    let self: any = this;
    let id: any = data.debtor_number;
    self.$router.push({
      path: `/LawyerLawUrging/caseInfo/${id}`
    });
  }
  //删除
  handleDelete(data: any) {
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
    self.data.select = Object.assign({}, params);
    this.getList(params);
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
