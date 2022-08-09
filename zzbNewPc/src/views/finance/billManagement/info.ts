import { Component, Vue } from "vue-property-decorator";
import * as Api from "@/api/Finance";
import { thousandBitSeparator } from "@/utils/common";
// import { UserOptions } from "../../../types";
@Component({})
export default class About extends Vue {
  // 展示信息
  data: any = {
    actIndex: 0,
    actIndex2: 0,
    bill_id: 0,
    bill_file: "",
    addInvoiceShow: false,
    addTicketShow: false,
    labers: [
      { name: "账单明细" },
      { name: "AI律师函<br/>服务明细" },
      { name: "律师办案<br/>法律服务明细" },
      { name: `债主帮收款<br/>银行账号信息` },
      { name: "发票信息" },
      { name: "发票开具状态" },
      { name: "结算记录" },
      { name: "退款记录" },
      { name: "专属客服" }
    ],
    id: 0,
    tabPosition: "left",
    activeName: "账单概况",
    ApplyForInvoiceShow: false,
    survey: {
      member_id: "", //member_id
      member_name: "xx", //用户名称
      bill_numebr: "xx", //账单编号
      create_time: "xx", //请款日期
      last_payment_date: "", //最后付款日期
      bill_total_amount: "", //应付金额
      bill_total_amount_x: "", //总金额大写
      customer_service_name: "-", //客服姓名
      customer_service_phone_number: "-", //客服电话
      customer_service_email: "-", //客服邮箱
      settlement_status: "" //结算状态
    },
    tableData: [], //AI律师函服务明细
    case_pay: [], //律师办案法律服务明细
    invoice: {
      //发票信息
      id: "",
      invoice_type: "-",
      invoice_name: "-",
      duty_paragraph: "-",
      detailed_address: "-",
      telephone: "-",
      bank_of_deposit: "-",
      bank_account: "-",
      invoice_remarks: "-"
    },
    ticket: {
      //收票信息
      id: "-",
      name: "-",
      phone: "-",
      email: "-",
      detailed_address: "-"
    },
    open_invoice: {
      //开票信息
      id: "",
      bill_number: "-",
      invoice_type: "-",
      invoice_tax_rate: "-",
      invoice_amount: "-",
      invoice_remarks: "-",
      billing_date: "-",
      invoice_number: "-",
      courier_services_company: "-",
      courier_number: "-",
      express_fee: "-",
      invoicing_status: "-",
      invoice_img: "-",
      create_time: "-"
    },
    settlement_records: [], //结算记录
    refund_records: [], //退款记录
    addInvoiceData: {
      //新增发票信息
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
    },
    options1: [],
    options2: []
  };
  height: number = 0;
  btnLoad: boolean = false;
  selectInvoceId: number = 0; //选中的发票
  selectTicketId: number = 0; //选中
  invoiceSerch: string = ""; //发票列表搜索
  getTicketData: any = {
    //获取收票地址
    name: "",
    phone: ""
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
    this.height = document.body.offsetHeight - 148;
  }

  activated() {
    this.data.id = this.$route.params.id;
    this.getInfo(this.data.id);
  }

  mounted() {
    //
  }

  beforeDestroy() {
    //
  }
  //获取会员管理信息
  getInfo(id: string) {
    this.data.scence = [];
    Api.GetBillDetailsByBillNumber(id).then((res: any) => {
      this.data.bill_id = res.data.bill.bill_id;
      this.data.bill_file = res.data.bill.bill_file;
      this.data.bill_file_ai = res.data.bill.bill_file_ai;
      this.data.bill_file_case = res.data.bill.bill_file_case;
      Object.keys(this.data.survey).forEach((key: string) => {
        if (res.data.bill[key]) {
          this.data.survey[key] = res.data.bill[key];
        }
      });
      res.data.ai_pay.forEach((item: any, index: number) => {
        item["index"] = index + 1;
        item.create_time = this.timeStr(item.create_time);
      });
      this.data.tableData = res.data.ai_pay;
      res.data.case_pay.forEach((item: any, index: number) => {
        item["index"] = index + 1;
        item.create_time = this.timeStr(item.create_time);
      });
      this.data.case_pay = res.data.case_pay;
      if (res.data.invoice) {
        Object.keys(this.data.invoice).forEach((key: string) => {
          if (res.data.invoice[key]) {
            if (key == "invoice_type") {
              this.data.invoice[key] = this.getInvoceName(
                res.data.invoice[key]
              );
            } else {
              this.data.invoice[key] = res.data.invoice[key];
            }
          }
        });
      } else {
        this.$confirm("请完善发票与收票信息", "提示", {
          confirmButtonText: "完善信息",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.data.ApplyForInvoiceShow = true;
          })
          .catch(() => {
            //
          });
      }
      if (res.data.ticket_address) {
        Object.keys(this.data.ticket).forEach((key: string) => {
          if (res.data.ticket_address[key]) {
            this.data.ticket[key] = res.data.ticket_address[key];
          }
        });
      }
      if (res.data.open_invoice) {
        Object.keys(this.data.open_invoice).forEach((key: string) => {
          if (res.data.open_invoice[key]) {
            this.data.open_invoice[key] = res.data.open_invoice[key];
          }
        });
      }
      if (res.data.settlement_records) {
        res.data.settlement_records.forEach((item: any) => {
          item.settlement_time = item.settlement_time.replace("T", " ");
          item.settlement_amount = this.thousandBitSeparator(
            item.settlement_amount
          );
        });
        this.data.settlement_records = res.data.settlement_records;
      }
      if (res.data.refund_records) {
        res.data.refund_records.forEach((item: any) => {
          item.refund_time = item.refund_time.replace("T", " ");
          item.refund_amount = this.thousandBitSeparator(item.refund_amount);
        });
        this.data.refund_records = res.data.refund_records;
      }
    });
  }

  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this;
    self.data.actIndex = index;
    let top: number = self.$refs.right.offsetTop; //初始位置
    let dom: any = "section" + index; //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop;
    self.$refs.right.scrollTop = actTop - top;
  }
  //打开申请开票弹窗
  open() {
    this.getTicketDown();
    this.getInvoiceDown();
    this.data.ApplyForInvoiceShow = !this.data.ApplyForInvoiceShow;
  }
  //获取收票地址列表
  getTicketDown() {
    let self: any = this;
    Api.getTicketDown(self.getTicketData).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = this.timeStr(item.create_time);
      });
      self.data.options2 = res.data;
    });
  }
  //获取发票列表
  getInvoiceDown() {
    let self: any = this;
    Api.getInvoiceDown(self.invoiceSerch).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = this.timeStr(item.create_time);
        item.invoice_type = this.getInvoceName(item.invoice_type);
      });
      self.data.options1 = res.data;
    });
  }
  //关闭弹窗
  close() {
    this.data.ApplyForInvoiceShow = false;
    this.data.addInvoiceShow = false;
    this.invoiceSerch = ""; //发票列表搜索
    this.data.actIndex2 = 0;
    this.selectInvoceId = 0;
    this.selectTicketId = 0;
    this.getTicketData = {
      //获取收票地址
      name: "",
      phone: ""
    };
  }
  //申请开票信息提交
  submitForm() {
    let params: any = {
      bill_number: this.data.id,
      invoice_id: this.data.ApplyForInvoice.invoice,
      address_id: this.data.ApplyForInvoice.ticketCollection
    };
    if (params.invoice_id == "" || params.address_id == "") {
      this.$message.warning("请完善信息");
      return false;
    }
    this.btnLoad = true;
    Api.addBill(params).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg + "");
        this.btnLoad = false;
        this.close();
        this.getInfo(this.data.id);
      } else {
        this.$message.warning(res.msg + "");
        this.btnLoad = false;
      }
    });
  }
  //合计逻辑
  getSummaries(param: any) {
    const self: any = this;
    const { columns, data } = param;
    const sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "总计";
        return;
      }
      if (
        index === columns.length - 1 ||
        column.property === "float_service_rate"
      ) {
        sums[index] = " ";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = self.thousandBitSeparator(
          values.reduce((prev: any, curr: any) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)
        );
        sums[index] += "";
      } else {
        sums[index] = "";
      }
    });
    return sums;
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
  onSubmit(formName: string) {
    const form: any = this.$refs[formName];
    form.validate((valid: boolean) => {
      if (valid) {
        Api.UpdateInvoice(this.data.addInvoiceData).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg);
            this.data.addInvoiceShow = false;
            this.getInvoiceDown();
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
            this.$message.success(res.msg);
            this.data.addTicketShow = false;
            this.getTicketDown();
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
  //选择发票收票信息
  selects() {
    this.SelectBillInvoice().then(() => {
      this.SelectBillTicketAddress().then((res: any) => {
        if (res.state) {
          this.close();
          this.getInfo(this.data.id);
        } else {
          this.$message.warning(res.msg);
        }
      });
    });
  }
  //选择发票信息
  SelectBillInvoice() {
    return new Promise((resolve: any, reject: any) => {
      let parmas: any = {
        bill_id: this.data.bill_id,
        invoice_id: this.selectInvoceId
      };
      Api.SelectBillInvoice(parmas).then((res: any) => {
        if (res.state) {
          resolve();
        } else {
          this.$message.warning(res.msg);
          reject();
        }
      });
    });
  }
  //选择收票信息
  SelectBillTicketAddress() {
    return new Promise((resolve: any, reject: any) => {
      let parmas: any = {
        bill_id: this.data.bill_id,
        ticket_address_id: this.selectTicketId
      };
      Api.SelectBillTicketAddress(parmas).then((res: any) => {
        if (res.state) {
          resolve(res);
        } else {
          reject();
        }
      });
    });
  }
  //账单申请开票
  ApplyInvoicing() {
    Api.ApplyInvoicing(this.data.id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg);
      } else {
        this.$message.warning(res.msg);
      }
    });
  }
  goBack() {
    let self: any = this;
    self.$router.push({
      path: "/finance/billManagement"
    });
  }
  //下载账单
  download(path: string) {
    window.open(path);
  }
  //数字千位符保留小数点后两位
  thousandBitSeparator(num: any) {
    return thousandBitSeparator(num);
  }
}
