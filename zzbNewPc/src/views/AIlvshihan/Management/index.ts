import { Component, Vue } from "vue-property-decorator";
import * as Api from "@/api/AIlvshihan";
import pay from "@/components/pay/pay.vue";
import { Action, Mutation } from "vuex-class";
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
    comPaging,
    pay
  }
})
export default class About extends Vue {
  @Action
  UPDATE_LAYOUY_STATE: any;
  data: any = {
    loading: false,
    visible: false,
    dialogVisible: false,
    // 表格数据
    list: [],
    select: {},
    totalize: 0,
    tableData: [], //待支付列表数据
    //返回的数据
    headerData: [],
    options: [
      {
        value: "debtor_name",
        label: "债务人名称"
      },
      {
        value: "creditor_name",
        label: "债权人名称"
      },
      {
        value: "executing_status",
        label: "执行进度"
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
        value: "debtor_number",
        label: "委托编号"
      }
    ],
    dataType: [
      {
        label: "委托编号",
        prop: "debtor_number",
        width: "150px"
      },
      {
        label: "债权人",
        prop: "creditor_name"
      },
      {
        label: "债务人",
        prop: "debtor_name"
      },
      {
        label: "欠款币种",
        prop: "currency_name",
        width: "100"
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
        label: "执行进度",
        prop: "execution_progress",
        width: "100"
      },
      // {
      //   label: "债务类别",
      //   prop: "debt_type"
      // },
      {
        label: "创建人",
        prop: "create_name",
        width: "120"
      },
      {
        label: "创建时间",
        prop: "create_time",
        width: "155"
      }
      // {
      //   label: "委托人",
      //   prop: "create_name"
      // },
      // {
      //   label: "委托时间",
      //   prop: "debtor_name"
      // }
    ]
  };
  options: any = {
    page: 1,
    limit: this.$store.getters.limit,
    debtor_number: "",
    creditor_name: "",
    debtor_name: "",
    executing_status: "",
    create_time: "",
    create_name: ""
  };
  navIndex: number = 0;
  payShow: boolean = false; //支付接口显隐
  payinfo: any = {}; //支付信息内容
  number: string = "";
  created() {
    //
  }

  activated() {
    this.init();
    Api.getPaysList().then((res: any) => {
      this.data.tableData = res.data;
      if (this.data.tableData.length != 0) {
        res.data.forEach((item: any) => {
          let time: string = item.create_time.replace("T", " ");
          item.create_time = time.substring(0, time.lastIndexOf(":"));
        });
        if (this.$store.state.layout.payTostType) {
          this.openPays();
          this.UPDATE_LAYOUY_STATE({ payTostType: false });
        }
      }
    });
  }

  mounted() {
    //
  }
  //执行状态点击
  navTo(val: number) {
    this.navIndex = val;
    let parmas: any = this.data.select;
    if (JSON.stringify(parmas) == "{}") {
      Object.assign(parmas, this.options);
    }
    switch (val) {
      case 0:
        parmas.executing_states = "";
        this.init();
        break;
      case 1:
        parmas.executing_states = "Executing_states_1";
        this.init();
        break;
      case 2:
        parmas.executing_states = "Executing_states_2";
        this.init();
        break;
      case 3:
        parmas.executing_states = "Executing_states_3";
        this.init();
        break;
      case 4:
        parmas.executing_states = "Executing_states_4";
        this.init();
        break;
      default:
        parmas.executing_states = "Executing_states_5";
        this.init();
        break;
    }
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
    let self: any = this;
    let data: any = self.data;
    data.loading = true;
    return new Promise((resovle: any, reject: any) => {
      Api.getPaging(params)
        .then((res: any) => {
          data.loading = false;
          if (self.$route.query.number != undefined) {
            data.list = res.data;
            self.number = self.$route.query.number;
          } else {
            data.list = res.data;
          }
          data.headerData = res;
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
          resovle();
        })
        .catch(() => {
          data.loading = false;
          self.$message.error("网络异常");
          reject();
        });
    });
  }
  //详情
  handleInfo(data: any) {
    let self: any = this;
    let id: any = data.row.debtor_number;
    self.$router.push({
      path: `/detailed/${id}`,
      query: {
        name: data.name
      }
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
    self.data.select = params;
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
  //打开待支付列表
  openPays() {
    this.data.dialogVisible = true;
  }
  //待支付管理
  handleClick(val: any) {
    this.data.dialogVisible = false;
    setTimeout(() => {
      Api.getPaySet().then((res2: any) => {
        val["is_postpaid"] = res2.data.is_postpaid;
        this.payinfo = val;
        this.payShow = true;
      });
    }, 500);
  }
  //关闭支付弹窗
  payClose() {
    this.payShow = false;
  }
  //删除支付
  deleteClick(row: any) {
    this.$confirm("确认删除该待支付信息吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.AIlawLetterDelete(row.batch_no).then((res: any) => {
          if (res.state) {
            this.data.tableData = this.data.tableData.filter((item: any) => {
              return item.batch_no != row.batch_no;
            });
            this.$message.success(res.msg);
          } else {
            this.$message.warning(res.msg);
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
}
