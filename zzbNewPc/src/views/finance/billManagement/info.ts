import { Component, Vue } from "vue-property-decorator";
import * as Api from "@/api/Finance";
// import { UserOptions } from "../../../types";
@Component({})
export default class About extends Vue {
  // 展示信息
  data: any = {
    actIndex: 0,
    labers: [
      { name: "账单概况" },
      { name: "账单明细" },
      { name: "开票信息" },
      { name: "结算信息" }
    ],
    id: 0,
    tabPosition: "left",
    activeName: "账单概况",
    ApplyForInvoiceShow: false,
    survey: {
      bill_number: "xx", //账单编号
      invoice_title_name: "xx", //账单类别
      time: "xx", //创建时间
      invoice_status_name: "", //开票状态
      settlement_status_name: "", //结算状态
      total_amount: "xx", //原单金额
      invoice_amount: "xx", //发票金额
      paid_amount: "" //已结算金额
    },
    tableData: [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }
    ],
    billInfo: {
      invoice_title_type_name: "", //发票抬头类型
      invoice_type_name: "", //发票类型
      invoice_title: "", // 发票抬头
      tax_number: "", //纳税人识别号
      bank_name: "", // 开户银行
      bank_account: "", //银行账号
      bank_telephone: "", //开票电话(银行电话)
      bank_address: "", //开票地址
      consignee_name: "", // 收票人姓名
      consignee_telephone: "", //收票人电话
      consignee_email: "", //收票人邮箱
      consignee_address: "", //详细地址
      invoice_number: "", //发票号码
      tracking_number: "", //快递单号
      invoice_time: "" //开票日期
    },
    billInfoShow: true,
    settlement: [],
    //申请开票
    ApplyForInvoice: {
      invoice: "", //开票信息
      ticketCollection: "" //收票信息
    },
    options1: [],
    options2: []
  };
  height: number = 0;
  btnLoad: boolean = false;
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
  getInfo(id: number) {
    this.data.scence = [];
    Api.getBillInfo(id).then((res: any) => {
      Object.keys(this.data.survey).forEach((key: string) => {
        this.data.survey[key] = res.data[key];
      });
      this.data.tableData = res.pay;
      if (res.invoice != null) {
        Object.keys(this.data.billInfo).forEach((key: string) => {
          this.data.billInfo[key] = res.invoice[key];
        });
      } else {
        this.data.billInfoShow = false;
      }
      this.data.settlement = res.settlement;
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
  //获取收票地址下拉
  getTicketDown() {
    let self: any = this;
    Api.getTicketDown().then((res: any) => {
      self.data.options2 = res.data;
    });
  }
  //获取发票下拉
  getInvoiceDown() {
    let self: any = this;
    Api.getInvoiceDown().then((res: any) => {
      self.data.options1 = res.data;
    });
  }
  //关闭弹窗
  close() {
    this.btnLoad = false;
    this.data.ApplyForInvoiceShow = false;
  }
  //申请开票信息提交
  submitForm() {
    let params: any = {
      bill_number: this.data.survey.bill_number,
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
}
