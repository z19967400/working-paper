import * as Api from "@/api/Accounts";
/* eslint-disable prettier/prettier */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import comtable from "./components/tab2.vue";
import { comselect, comOperation, comPaging } from "@/components/index";
import addAdmin from "./components/addAdmin.vue";
import seeInfo from "./components/seeInfo.vue";
@Component({
  components: {
    comtable,
    comselect,
    comOperation,
    comPaging,
    addAdmin,
    seeInfo
  }
})
export default class About extends Vue {
  @Prop({}) AccountData!: any;
  @Prop({}) accounts!: any;
  // Getter

  // Action

  @Watch("AccountData", { immediate: true, deep: true })
  AccountDataChange(newVal: any, oldVal: any) {
    this.data.Account = newVal;
    if (newVal == null) {
      return false;
    }
    if (newVal == "{}") {
      this.init(0, "");
    } else {
      this.init(newVal.id, "");
    }
  }
  // data
  data: any = {
    disabled: false,
    Account: {},
    addDialogVisible: false,
    loading: false,
    btnType: false,
    // 表格数据
    list: [],
    select: {},
    creaditors: [], //所有债权人列表
    creaditors2: [], //该管理员的债权人
    totalize: 0,
    options: [
      {
        value: "account_name",
        label: "账户名称"
      }
    ],
    dataType: [
      // {
      //   label: "账户名称",
      //   prop: "account_name"
      // },
      {
        label: "管理员姓名",
        prop: "admin_name"
      },
      {
        label: "手机号码",
        prop: "admin_phone_number"
      },
      {
        label: "权限",
        prop: "is_super"
      },
      {
        label: "债权人数量",
        prop: "creditor_count"
      }
      // {
      //   label: "审核状态",
      //   prop: "audit_status"
      // }
    ],
    account_name: "",
    dialogVisible: false,
    dialogVisible2: false,
    admin_id: ""
  };
  visible3: boolean = false;
  addAdmin: any = {};
  options: any = {
    // page: 1,
    // limit: this.$store.getters.limit,
    account_name: ""
  };
  addAdminKey: number = 1;
  seeData: any = "";
  // 初始化函数
  init(id: any, name: string) {
    let params: any = {
      account_id: id,
      admin_name: name
    };
    this.getAccountAdmins(params);
    this.getAccountCreditors();
  }
  //获取数据
  getAccountAdmins(params: any) {
    let data: any = this.data;
    data.loading = true;
    Api.getAccountAdmins(params.account_id, params.admin_name)
      .then((res: any) => {
        data.loading = false;
        data.list = res.data;
        // 数据条数
        data.totalize = data.list.length;
        data.list.forEach((item: any) => {
          item.audit_status =
            item.audit_status == "Audit_states_0"
              ? "待审核"
              : item.audit_status == "Audit_states_1"
              ? "未通过"
              : "已通过";
          item.is_super = item.is_super == "1" ? "超级管理员" : "普通管理员";
        });
      })
      .catch(() => {
        data.loading = false;
        this.$message.error("网络异常");
      });
  }
  //获取所有债权人
  getAccountCreditors() {
    Api.getAccountCreditors().then((res: any) => {
      res.data.forEach((item: any) => {
        item["checked"] = false;
      });
      res.data.forEach((item: any) => {
        item.audit_status =
          item.audit_status == "Audit_states_0"
            ? "待审核"
            : item.audit_status == "Audit_states_1"
            ? "未通过"
            : "已通过";
        item.create_time = item.create_time.replace("T", " ");
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(":")
        );
      });
      this.data.creaditors = res.data;
    });
  }
  //删除
  handleDelete(data: any) {
    let id: any = this.data.Account.id;
    Api.deleteAccountAmind(data.row.id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg);
        if (this.data.Account.is_super != 1) {
          this.init(id || 0, "");
        } else {
          this.init(id || 0, "");
        }
      } else {
        this.$message.warning(res.msg);
      }
    });
  }
  //查看
  handleSee(data: any) {
    this.data.dialogVisible2 = true;
    this.seeData = data.row;
  }
  //新增管理员
  addAccount(data: any) {
    // this.addAdminKey += 1;
    let self: any = this;
    self.visible3 = true;
    self.addAdmin = {
      id: 0,
      member_vip_account_id: this.accounts[0].id,
      admin_name: "",
      admin_head_img: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_img: "",
      id_number: "",
      is_super: "关闭",
      is_account_admin: "关闭",
      audit_status: "",
      audit_feedback: "",
      btnType: false
    };
    if (data != undefined) {
      //编辑
      data.row.is_super = data.row.is_super == 1 ? "开放" : "关闭";
      data.row.is_account_admin =
        data.row.is_account_admin == 1 ? "开放" : "关闭";
      self.addAdmin = data.row;
      self.data.disabled = true;
    } else {
      //新增
      self.data.disabled = false;
    }
  }
  //添加管理员确定
  addAdminSave(data: any) {
    let self: any = this;
    let id: any = self.data.Account.id;
    // let name: string = self.data.Account.account_name;
    // data["member_vip_account_id"] = id;
    if (data.creditor_list !== undefined && data.creditor_list.length > 0) {
      //新增
      let parmas: any = {
        admin: {
          id: data.id,
          member_vip_account_id: data.member_vip_account_id,
          admin_name: data.admin_name,
          admin_head_img: data.admin_head_img,
          admin_phone_number: data.admin_phone_number,
          admin_email: data.admin_email,
          admin_account: data.admin_account,
          id_number: data.id_number,
          is_super: data.is_super,
          is_account_admin: data.is_account_admin
        },
        creditor_list: data.creditor_list
      };
      Api.AddAdmin(parmas).then((res: any) => {
        if (res.state) {
          self.visible3 = false;
          self.data.btnType = false;
          this.addAdmin = {
            id: 0,
            member_vip_account_id: 0,
            admin_name: "",
            admin_head_img: "",
            admin_phone_number: "",
            admin_email: "",
            admin_account: "",
            authorization_img: "",
            id_number: "",
            is_super: "关闭",
            is_account_admin: "关闭",
            audit_status: "",
            audit_feedback: "",
            btnType: false
          };
          self.init(id || 0, "");
        } else {
          self.$message.warning(res.msg);
        }
      });
    } else {
      //编辑
      Api.UpdatAdmin(data).then((res: any) => {
        if (res.state) {
          self.$message.success(res.msg);
          self.visible3 = false;
          self.data.btnType = false;
          this.addAdmin = {
            id: 0,
            member_vip_account_id: 0,
            admin_name: "",
            admin_head_img: "",
            admin_phone_number: "",
            admin_email: "",
            admin_account: "",
            authorization_img: "",
            id_number: "",
            is_super: "关闭",
            is_account_admin: "关闭",
            audit_status: "",
            audit_feedback: "",
            btnType: false
          };
          self.init(id || 0, "");
        } else {
          self.$message.warning(res.msg);
        }
      });
    }
  }
  //发送账号密码
  sandAdminPassword(data: any) {
    //
  }
  //取消添加管理员
  addAdminCancel() {
    this.addAdmin = {
      id: 0,
      member_vip_account_id: 0,
      admin_name: "",
      admin_head_img: "",
      admin_phone_number: "",
      admin_email: "",
      admin_account: "",
      authorization_img: "",
      id_number: "",
      is_super: "关闭",
      is_account_admin: "关闭",
      audit_status: "",
      audit_feedback: "",
      btnType: false
    };
    this.visible3 = false;
  }
  //债权人分配
  creaditorfp(data: any) {
    this.data.dialogVisible = true;
    this.data.admin_id = data.id;
    this.data.creaditors2 = [];
    this.data.creaditors2 = JSON.parse(JSON.stringify(this.data.creaditors));
    Api.getAdminCreaditors(data.id).then((res: any) => {
      res.data.forEach((item: any) => {
        this.data.creaditors2.forEach((item2: any) => {
          if (item.entrust_creditor_id == item2.id) {
            item2.checked = true;
          }
        });
      });
    });
  }
  //债权人选中
  checkbox(row: any) {
    // this.$confirm("确定将此债权人分配给该管理员?", "提示", {
    //   confirmButtonText: "确定",
    //   cancelButtonText: "取消",
    //   type: "warning"
    // })
    //   .then(() => {
    let admin_id: number = this.data.admin_id;
    let creditor_id: number = row.id;
    //选中
    if (row.checked) {
      Api.setCreditorAdmin(admin_id, creditor_id).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg);
        } else {
          this.$message.warning(res.msg);
        }
      });
      //取消
    } else {
      Api.deleteCreditorAdmin(admin_id, creditor_id).then((res: any) => {
        if (res.state) {
          this.$message.success(res.msg);
        } else {
          this.$message.warning(res.msg);
        }
      });
    }
    // })
    // .catch(() => {
    //   this.$message({
    //     type: "info",
    //     message: "已取消分配"
    //   });
    // });
  }
  //跳转新增债权人
  toAdd() {
    this.data.dialogVisible = false;
    setTimeout(() => {
      this.$router.push({
        path: "/creditor"
      });
    }, 100);
  }
  // watchChange(val: any) {
  //   // eslint-disable-next-line no-console
  //   console.log(val);
  // }
  //获取所有管理员
  atAll() {
    this.$emit("atAll");
  }
}
