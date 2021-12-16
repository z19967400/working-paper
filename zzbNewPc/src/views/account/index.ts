import * as Api from "@/api/Accounts";
/* eslint-disable prettier/prettier */
import { Component, Vue } from "vue-property-decorator";
import { comselect, comOperation, comPaging } from "@/components/index";
import comRight from "./info.vue";
import comtable from "./tab.vue";
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    comRight
  }
})
export default class About extends Vue {
  // Getter

  // Action

  // data
  data: any = {
    addDialogVisible: false,
    loading: false,
    // 表格数据
    list: [],
    select: {},
    totalize: 0,
    height: 0,
    options: [
      {
        value: "account_name",
        label: "账户名称"
      }
      // {
      //   value: "account_name",
      //   label: "vip账户名称"
      // },
      // {
      //   value: "admin_name",
      //   label: "vip管理员名称"
      // }
    ],
    dataType: [
      // {
      //   label: "ID",
      //   prop: "id"
      // },
      {
        label: "序号",
        prop: "id",
        width: "80px"
      },
      {
        label: "账户名称",
        prop: "account_name"
      },
      {
        label: "是否为总账户",
        prop: "is_super"
      },
      {
        label: "管理员数量",
        prop: "admin_total"
      },
      {
        label: "创建时间",
        prop: "create_time"
      }
    ],
    accounts: [],
    addData: {
      account_name: "",
      id: 0,
      member_vip_id: 0,
      parent_account_id: 0
    },
    AccountData: "{}"
  };
  options: any = {
    // page: 1,
    // limit: this.$store.getters.limit,
    account_name: ""
  };

  // created() {

  // }

  activated() {
    this.data.loading = true;
    // eslint-disable-next-line no-console
    // console.log(111);
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  mounted() {
    let Wheight: number | null = document.body.offsetHeight;
    let select: any = document.getElementById("select");
    let operation: any = document.getElementById("operation");
    let paging: any = document.getElementById("paging");
    let selectH: number = select != null ? select.offsetHeight : 0;
    let operationH: number = operation != null ? operation.offsetHeight : 0;
    let pagingH: number = paging != null ? paging.offsetHeight : 0;
    this.data.height = Wheight - (pagingH + operationH + selectH + 208) - 20;
  }

  // 初始化函数
  init() {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.getAccountList(params);
  }
  //获取数据
  getAccountList(params: any) {
    let data: any = this.data;
    Api.getAccountList(params.account_name)
      .then((res: any) => {
        data.loading = false;
        let arr: any = [];
        this.data.accounts = res.data;
        if (res.data.length <= 0) {
          return false;
        }
        res.data.forEach((item: any) => {
          if (item.is_super == 1) {
            item["children"] = [];
            item["cheeked"] = false;
            arr.push(item);
          } else {
            arr[0].children.push(item);
            item["cheeked"] = false;
          }
        });
        data.list = arr;
        // 数据条数
        data.totalize = data.list[0].children.length + 1;
        data.list.forEach((item: any) => {
          item.is_super = item.is_super == 1 ? "是" : "否";
        });
      })
      .catch(() => {
        data.loading = false;
        this.$message.error("网络异常");
      });
  }
  //编辑
  handleInfo(data: any) {
    this.data.addDialogVisible = true;
    Object.keys(this.data.addData).forEach((key: string) => {
      this.data.addData[key] = data[key];
    });
  }
  //删除
  handleDelete(data: any) {
    Api.getAccountAdmins(data.id, "").then((res: any) => {
      this.$confirm("此操作将永久删除该账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Api.deleteAccoundt(data.id).then((res: any) => {
            if (res.state) {
              this.$message.success(res.msg);
              this.init();
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
    this.getAccountList(params);
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
  //新增账户
  addAccount() {
    this.data.addDialogVisible = true;
    this.data.addData = {
      account_name: "",
      id: 0,
      member_vip_id: 0,
      parent_account_id: 0
    };
  }
  //确认添加
  submitForm() {
    Api.addAccount(this.data.addData).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg);
        this.data.addDialogVisible = false;
        this.init();
      } else {
        this.$message.warning(res.msg);
      }
    });
  }
  //设置管路员
  setingAdmin(data: any) {
    // let id: number = data.id;
    // let name: string = data.account_name;
    // this.$router.push({
    //   path: `/account/info/${id}`
    // });
    this.data.AccountData = data;
  }
  //列表选中
  treeAct(id: any) {
    this.data.list.forEach((item: any) => {
      if (item.id == id) {
        item.cheeked = true;
        item.children.forEach((item2: any) => {
          item2.cheeked = false;
        });
      } else {
        item.cheeked = false;
        item.children.forEach((item2: any) => {
          if (item2.id == id) {
            item2.cheeked = true;
          } else {
            item2.cheeked = false;
          }
        });
      }
    });
  }
  //获取所有管理员
  atAll() {
    this.data.AccountData = "{}";
    this.data.list.forEach((item: any) => {
      item.cheeked = false;
      item.children.forEach((item2: any) => {
        item2.cheeked = false;
      });
    });
  }
}
