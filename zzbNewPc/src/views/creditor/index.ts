import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as Api from "@/api/creditor";
import { comselect, comOperation, comPaging } from "@/components/index";
import addForms from "./editcedrior.vue";
import comtable from "./contable.vue";
import setUp from "./adminSetUp.vue";
import seeCreditor from "./seeCreditor.vue";
@Component({
  components: {
    comselect,
    comtable,
    comOperation,
    comPaging,
    addForms,
    setUp,
    seeCreditor
  }
})
export default class About extends Vue {
  data: any = {
    id: 0,
    addDialogVisible: false,
    loading: false,
    visible: false,
    visible2: false,
    visible3: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "creditor_name",
        label: "债权人名称"
      },
      {
        value: "agent_name",
        label: "联系人名称"
      },
      {
        value: "phone_number",
        label: "公司电话"
      }
    ],
    dataType: [
      {
        label: "ID",
        prop: "id",
        width: "80px"
      },
      {
        label: "债权人名称",
        prop: "creditor_name",
        width: "330px"
      },
      {
        label: "管理员",
        prop: "admin",
        width: "320px"
      },
      {
        label: "办公地址",
        prop: "detailed_address"
      },
      // {
      //   label: "审核状态",
      //   prop: "audit_status"
      // },
      {
        label: "创建人",
        prop: "create_name"
      },
      {
        label: "创建时间",
        prop: "create_time"
      }
    ]
  };
  options: any = {
    // page: 1,
    // limit: this.$store.getters.limit,
    creditor_name: "",
    phone_number: "",
    agent_name: ""
  };
  seeId: any = "";
  setUpId: any = "";
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
  // 弹框
  adddialog(adddialog: boolean) {
    this.data.addDialogVisible = adddialog;
  }
  //获取数据
  getList(params: any) {
    let data: any = this.data;
    data.loading = true;
    var reg: any = /[&，]/g;
    Api.creditorGetPaging(params).then((res: any) => {
      res.data.forEach((item: any, index: number) => {
        item.audit_status =
          item.audit_status == "Audit_states_0"
            ? "待审核"
            : item.audit_status == "Audit_states_1"
            ? "未通过"
            : "已通过";
        item.admin.admin_name = item.admin.admin_name.substring(
          0,
          item.admin.admin_name.lastIndexOf("&")
        );
        item.admin.admin_name = item.admin.admin_name.replace(/&/g, "，");
        // item.admin.admin_details = item.admin.admin_details.replace(
        //   reg,
        //   "\r\n"
        // );
      });
      data.loading = false;
      data.list = res.data;
      data.totalize = res.data.length;
    });
  }
  //添加
  add() {
    let self: any = this;
    self.data.id = -1;
    setTimeout(() => {
      self.data.id = 0;
      this.data.addDialogVisible = true;
    }, 100);
  }
  //编辑
  handleEdit(data: any) {
    let self: any = this;
    self.seeId = data.id;
    self.data.visible3 = true;
  }
  //设置
  handleSetUp(data: any) {
    let self: any = this;
    self.setUpId = data.id;
    self.data.visible2 = true;
  }
  //删除
  handleDelete(data: any) {
    Api.deletecreditor(data.row.id).then((res: any) => {
      if (res.state) {
        this.$message.success("删除债权人成功");
      } else {
        this.$message.warning("删除债权人失败");
      }
      this.init();
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
