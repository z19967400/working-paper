import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import * as Api from "@/api/creditor";
import addAdmin from "./components/addAdmin.vue";
import editAdmin from "./components/editAdmin.vue";
import { getCookie } from "../../utils/common";
import addForms from "./editcedrior.vue";
import { baseURL, pp } from "../../utils/request";
@Component({
  components: {
    addAdmin,
    editAdmin,
    addForms
  }
})
export default class creditorAdmin extends Vue {
  dialogFormVisible: boolean = false;
  dialogFormVisible2: boolean = false;
  dialogFormVisible3: boolean = false;
  creditor_id: number = 0;
  creditor_name: string = "";
  parentId: number = 0;
  adminIds: any = [];
  is_super: any = "";
  searchVal: string = "";
  data: any = {
    list: [],
    edit: {},
    creditorList: [],
    search: "",
    show: false,
    UploadAuthorization: false,
    editAdmin: {},
    submitType: false,
    admin_id: "",
    editAdminType: false,
    rules2: {
      authorization_file: [
        { required: true, message: "请上传管理员授权书", trigger: "blur" }
      ]
    }
  };
  fileList: any = [];
  burl: string = "";
  adminName: any = "";
  created() {}
  activated() {
    this.GetCreditorAdmin();
    let qz: string = pp === "production" ? "/api/" : "/api/pt";
    this.burl = baseURL + qz;
  }

  mounted() {
    this.is_super = getCookie("is_super");
    this.adminName = getCookie("userName");
    this.getAdminInfo();
  }
  //删除授权管理员
  handleClick(row: any) {
    this.$confirm("您确定删除该授权管理员吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.DeleteCreditorAdminById(row.creditor_admin_id).then((res: any) => {
          if (res.state) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.GetCreditorAdmin();
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
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
  //编辑授权管理员
  handleEdit(row: any) {
    this.dialogFormVisible2 = true;
    this.data.edit = row;
  }
  //新增债权人
  addParams() {
    this.dialogFormVisible3 = false;
    this.parentId = 0;
    this.GetCreditorAdmin();
  }
  //打开新增债权人弹窗
  openAddCreditor() {
    this.dialogFormVisible3 = true;
    this.parentId = 1;
  }
  //关闭新增管理员弹窗
  closeCreditor() {
    this.dialogFormVisible3 = false;
    this.parentId = 0;
  }
  //关闭新增授权管理员弹窗
  addAdminClose(val: any) {
    this.dialogFormVisible = val;
  }
  //关闭编辑管理员
  editAdminClose(val: any) {
    this.dialogFormVisible2 = val;
    this.data.edit = {};
  }
  //新增授权管理员
  hanlAddAdmin(parmas: any) {
    parmas.creditor_id = this.creditor_id;
    Api.AddCreditorAdmin(parmas).then((res: any) => {
      if (res.state) {
        this.$message({
          type: "success",
          duration: 6000,
          message: res.msg
        });
      } else {
        this.$message({
          type: "warning",
          message: res.msg
        });
      }
      this.addAdminClose(false);
      this.GetCreditorAdmin();
    });
  }
  //获取所有债权人及其对应管理员
  GetCreditorAdmin() {
    Api.GetCreditorAdmin().then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace("T", " ");
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(":")
        );
        item.admin_list.forEach((item2: any) => {
          item2.audit_status = this.getAuditstatusText(item2.audit_status);
        });
      });
      this.data.list = res.data;
    });
  }
  //查看授权书
  check(url: string) {
    window.open(url);
  }
  //删除债权人
  delect(id: number) {
    this.$confirm("您确定删除该债权人吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.DeleteCreditorById(id).then((res: any) => {
          if (res.state) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.GetCreditorAdmin();
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
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
  //打开新增授权管理员弹窗
  openAddAdmin(id: number, name: string) {
    this.dialogFormVisible = true;
    this.creditor_id = id;
    this.creditor_name = name;
    let row: any = this.data.list.filter((item: any) => {
      return item.creditor_id == id;
    });
    if (row[0].admin_list.length != 0) {
      row[0].admin_list.forEach((item: any) => {
        this.adminIds.push(item.admin_id);
      });
    }
  }
  //打开新增授权管理弹窗
  openAddCreditorAdmin() {
    Api.GetAllCreditorListReverseOrder().then((res: any) => {
      this.data.creditorList = res.data;
      this.data.UploadAuthorization = true;
    });
  }
  //取消新增授权管理员
  close() {
    this.data.search = "";
    this.data.editAdminType = false;
    this.data.UploadAuthorization = false;
  }
  //上传授权委托书
  UploadAuthorization(row: any) {
    this.data.editAdmin = {
      creditor_name: row.creditor_name,
      license_no: row.license_no,
      license_img_url: row.license_img_url,
      detailed_address: row.detailed_address, //详细地址
      admin: {
        //管理员信息
        creditor_id: row.id,
        admin_id: this.data.admin_id,
        admin_name: this.adminName,
        id_number: "",
        admin_phone_number: "",
        admin_email: "",
        admin_account: "",
        authorization_file: ""
      }
    };
    this.data.editAdminType = true;
    // eslint-disable-next-line no-console
    console.log(row);
  }
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3);
  }
  preview2(file: any) {
    if (file.url == undefined) {
      let url: string =
        "https://file.debteehelper.com" +
        file.response.data.FileUrl +
        file.response.data.FileExtension;
      window.open(url);
    } else {
      window.open(file.url);
    }
  }
  exceed(files: any, fileList: any) {
    let self: any = this;
    self.$message.warning("请先删除已上传文件");
  }
  beforeAvatarUpload2(file: any) {
    let self: any = this;
    self.loading2 = true;
    const isLt2M = file.size / 1024 / 1024 <= 50;
    if (!isLt2M) {
      self.loading2 = false;
      self.$message.error("上传头像图片大小不能超过 50MB!");
    }
    return isLt2M;
  }
  handleAvatarSuccess2(res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg);
      self.data.editAdmin.admin["authorization_file"] =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      let item: any = [
        {
          name: file.name,
          url:
            "https://file.debteehelper.com" +
            file.response.data.FileUrl +
            file.response.data.FileExtension
        }
      ];
      self.fileList = item;
    } else {
      self.$message.warning(res.data.Msg);
    }
    self.loading2 = false;
  }
  //表单提交
  submitForm(formName: string) {
    let self: any = this;
    let from: any = self.$refs[formName];
    if (
      self.data.editAdmin.admin.authorization_file == "" ||
      self.data.editAdmin.admin.authorization_file == null
    ) {
      self.$message.warning("请上传授权委托书");
      return false;
    }
    self.data.submitType = true;
    Api.AddCreditor(self.data.editAdmin).then((res: any) => {
      if (res.state == true) {
        self.$message.success(res.msg);
        setTimeout(() => {
          self.close();
          this.GetCreditorAdmin();
          // self.$emit("csh");
        }, 1000);
      } else {
        self.$message.warning(res.msg);
      }
      self.data.submitType = false;
    });
  }
  //获取当前管理员信息
  getAdminInfo() {
    Api.getAdminInfo(0).then((res: any) => {
      this.data.admin_id = res.data.id;
    });
  }
  //时间转码
  timeStr(time: string) {
    let time1: string = time.replace("T", " ");
    let time2: string = time1.substring(0, time1.lastIndexOf(":"));
    return time2;
  }
  //获取审核状态文本
  getAuditstatusText(val: string) {
    let value: string = "";
    switch (val) {
      case "Audit_states_0":
        value = "待审核";
        break;
      case "Audit_states_1":
        value = "未通过";
        break;
      case "Audit_states_2":
        value = "已通过";
        break;
      default:
        break;
    }
    return value;
  }
}
