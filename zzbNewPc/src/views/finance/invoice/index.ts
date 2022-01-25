import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance";
import { Options } from "@/types/index";
@Component({
  components: {}
})
export default class About extends Vue {
  data: any = {
    height: 0,
    searchVal1: "",
    searchVal2: "",
    searchVal3: "",
    list: [],
    list2: [],
    outerVisible: false,
    title: "",
    addInvoiceData: {
      id: 0,
      invoice_type: "",
      invoice_name: "",
      duty_paragraph: "",
      detailed_address: "",
      telephone: "",
      bank_of_deposit: "",
      bank_account: "",
      invoice_remarks: ""
    },
    addTicketData: {
      //新增收票地址数据
      id: 0,
      name: "",
      phone: "",
      email: "",
      detailed_address: ""
    }
  };
  rules: any = {
    invoice_type: [
      { required: true, message: "请选择发票类型", trigger: "blur" }
    ],
    invoice_name: [
      { required: true, message: "请输入发票名称", trigger: "blur" }
    ],
    duty_paragraph: [
      { required: true, message: "请输入发票税号", trigger: "blur" }
    ],
    detailed_address: [
      { required: true, message: "请选输入地址", trigger: "blur" }
    ],
    telephone: [{ required: true, message: "请输入电话", trigger: "blur" }],
    bank_of_deposit: [
      { required: true, message: "请输入开户行", trigger: "blur" }
    ],
    bank_account: [
      { required: true, message: "请输入银行账号", trigger: "blur" }
    ]
  };
  rules2: any = {
    name: [{ required: true, message: "请输入收票人姓名", trigger: "blur" }],
    phone: [{ required: true, message: "请输入收票人手机号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入收票人电子邮箱", trigger: "blur" }
    ],
    detailed_address: [
      { required: true, message: "请输入收票人地址", trigger: "blur" }
    ]
  };
  created() {
    let Wheight: number | null = document.body.offsetHeight;
    this.data.height = Wheight - 260;
  }

  activated() {
    this.init();
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    this.getTicketDown();
    this.getInvoiceDown();
  }

  //获取收票地址列表
  getTicketDown() {
    let self: any = this;
    let parmas: any = {
      name: this.data.searchVal2,
      phone: this.data.searchVal3
    };
    Api.getTicketDown(parmas).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = this.timeStr(item.create_time);
      });
      self.data.list2 = res.data;
    });
  }
  //获取发票列表
  getInvoiceDown() {
    let self: any = this;
    Api.getInvoiceDown(self.data.searchVal1).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = this.timeStr(item.create_time);
        item.invoice_type = this.getInvoceName(item.invoice_type);
      });
      self.data.list = res.data;
    });
  }
  //编辑发票信息
  edit1(row: any) {
    Object.keys(this.data.addInvoiceData).forEach((key: string) => {
      if (row[key]) {
        this.data.addInvoiceData[key] = row[key];
      }
    });

    this.data.title = "编辑发票信息";
    this.data.outerVisible = true;
  }
  //编辑收票信息
  edit2(row: any) {
    Object.keys(this.data.addTicketData).forEach((key: string) => {
      if (row[key]) {
        this.data.addTicketData[key] = row[key];
      }
    });
    this.data.title = "编辑收票信息";
    this.data.outerVisible = true;
  }
  //删除发票
  delect1(id: number) {
    this.$confirm("您确定删除该发票信息吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.DeleteInvoice(id).then((res: any) => {
          if (res.state) {
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
  }
  //删除收票
  delect2(id: number) {
    this.$confirm("您确定删除该收票信息吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        Api.DeleteTicketAddress(id).then((res: any) => {
          if (res.state) {
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
  }
  //清除搜索
  clearSearch1() {
    this.data.searchVal1 = "";
    this.init();
  }
  //清除搜索2
  clearSearch2() {
    this.data.searchVal2 = "";
    this.data.searchVal3 = "";
    this.init();
  }
  //时间转码
  timeStr(str: string) {
    let str1: string = str.replace("T", " ");
    let str2: string = str1.substring(0, str1.lastIndexOf(":"));
    return str2;
  }
  //发票类型
  getInvoceName(str: string) {
    let val: string = "";
    switch (str) {
      case "Invoice_Type_0":
        val = "增值税普通发票（电子）";
        break;
      case "Invoice_Type_1":
        val = "增值税普通发票（纸质）";
        break;
      case "Invoice_Type_2":
        val = "增值税专用发票（纸质）";
        break;
      default:
        break;
    }
    return val;
  }
  //新增发票
  addInvoice() {
    this.data.title = "新增发票信息";
    this.data.outerVisible = true;
  }
  //新增收票
  addTicket() {
    this.data.title = "新增收票信息";
    this.data.outerVisible = true;
  }
  //关闭弹窗
  handleClose() {
    this.data.outerVisible = false;
    this.data.addInvoiceData = {
      id: 0,
      invoice_type: "",
      invoice_name: "",
      duty_paragraph: "",
      detailed_address: "",
      telephone: "",
      bank_of_deposit: "",
      bank_account: "",
      invoice_remarks: ""
    };
    this.data.addTicketData = {
      id: 0,
      name: "",
      phone: "",
      email: "",
      detailed_address: ""
    };
  }
  //弹窗确定
  submit() {
    if (
      this.data.title == "新增发票信息" ||
      this.data.title == "编辑发票信息"
    ) {
      this.onSubmit("ruleForm");
    } else {
      this.onSubmit2("ruleForm2");
    }
  }
  //新增发票
  onSubmit(formName: string) {
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        Api.UpdateInvoice(this.data.addInvoiceData).then((res: any) => {
          if (res.state) {
            this.handleClose();
            this.init();
          } else {
            this.$message.warning(res.msg);
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("error submit!!");
        return false;
      }
    });
  }
  //新增收票地址
  onSubmit2(formName: string) {
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        Api.UpdateTicketAddress(this.data.addTicketData).then((res: any) => {
          if (res.state) {
            this.handleClose();
            this.init();
          } else {
            this.$message.warning(res.msg);
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("error submit!!");
        return false;
      }
    });
  }
}
