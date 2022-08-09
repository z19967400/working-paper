import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../../api/AIlvshihan";
// import { verifyPhone, verifyEmall } from "../../../utils/common";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import smsPhone from "./components/smsPhone.vue";
import handCasePross from "./components/handCasePross.vue";
import offer from "./components/offer.vue";
@Component({
  components: {
    table1,
    table2,
    smsPhone,
    handCasePross,
    offer
  }
})
export default class About extends Vue {
  data: any = {
    visible: false,
    actIndex: 0,
    actIndex2: 0,
    rightIndex: 0,
    infoTitle: "",
    case_report_file: "",
    operation_authority: false,
    labers: [
      {
        // label: "案件概览",
        children: [
          { name: "案件概览" },
          { name: "办案事项" },
          { name: "案件信息" },
          { name: "债权人" },
          { name: "服务费报价" },
          { name: "签署合同" },
          { name: "办案律师" },
          { name: "法院信息" },
          { name: "专案客服" },
          { name: "办案进度" },
          { name: "服务费" }
          // { name: "回款记录" }
        ]
      }
    ],
    BasicInfo: [
      //委托信息
      [
        { name: "委托编号", value: "", prop: "debtor_number" },
        { name: "创建人", value: "", prop: "member_name" }
      ],
      [
        { name: "案件状态", value: "", prop: "case_status" },
        { name: "创建时间", value: "", prop: "entrust_time" }
      ],
      [
        { name: "债务类别", value: "", prop: "collection_scene" },
        { name: "委托记录", value: "", prop: "ai_number" }
      ]
    ],
    //办案事项
    case_matters_name: [],
    //客服
    case_customer_service: [],
    //债权人
    // case_creditor: [
    //   [
    //     { name: "债权人名称", value: "", prop: "creditor_name" },
    //     { name: "债权人类别", value: "", prop: "creditor_type_name" }
    //   ],
    //   [
    //     { name: "手机号码", value: "", prop: "phone_number" },
    //     { name: "审核状态", value: "", prop: "audit_status_name" }
    //   ],
    //   [{ name: "认证时间", value: "", prop: "certification_time" }]
    // ],
    case_creditorOption: [
      { prop: "creditor_name", label: "债权人名称" },
      // { prop: "creditor_type_name", label: "债权人类别" },
      // { prop: "phone_number", label: "手机号码" },
      { prop: "audit_status_name", label: "审核状态" },
      { prop: "certification_time", label: "创建时间" }
    ],
    case_creditorData: [],
    //案件信息
    caseInformation: [],
    //案件数据
    caseData: [
      [
        { name: "案件评级", value: "", prop: "batch_no" },
        { name: "服务费模式", value: "", prop: "logo_type_name" },
        { name: "浮动服务费率", value: "", prop: "logo_type_name" }
      ],
      [
        { name: "预计胜诉率", value: "", prop: "name" },
        { name: "固定服务费报价（人民币元）", value: "", prop: "time" },
        { name: "浮动佣金平台管理费率", value: "", prop: "logo_type_name" }
      ],
      [
        { name: "预计回款率", value: "", prop: "collection_scene_name" },
        { name: "固定佣金平台管理费", value: "", prop: "time" },
        { name: "展示律师费（人民币元）", value: "", prop: "logo_type_name" }
      ]
    ],
    //回款记录
    collectionList: [],
    collectionOption: [
      { prop: "ID", label: "回款ID" },
      { prop: "creditor_type_name", label: "办案事项" },
      { prop: "audit_status_name", label: "办案律师" },
      { prop: "time", label: "回款币种" },
      { prop: "time", label: "回款金额" },
      { prop: "time", label: "回款方式" },
      { prop: "time", label: "回款日期" },
      { prop: "time", label: "确认状态" },
      { prop: "time", label: "后台备注" }
    ],
    //一审
    firstInstance: {
      //办案律师
      caseLawyerList: [],
      caseLawyerOption: [
        { prop: "", label: "律师名称" },
        { prop: "", label: "手机号码" },
        { prop: "", label: "电子邮箱" },
        { prop: "", label: "类别" }
      ],
      //案件合同
      caseContractList: [],
      caseContractOption: [
        { prop: "", label: "合同编号" },
        { prop: "", label: "合同类别" },
        { prop: "", label: "签署状态" },
        { prop: "", label: "签署时间" }
      ],
      //法院信息
      courtInformationList: [],
      courtInformationOption: [
        { prop: "", label: "法院名称" },
        { prop: "", label: "法庭名称" },
        { prop: "", label: "法官名称" },
        { prop: "", label: "联系电话" }
      ],
      //办案进度
      caseHandlingProgressList: [],
      caseHandlingProgressOption: [
        { prop: "", label: "流程名称" },
        { prop: "", label: "执行状态" },
        { prop: "", label: "计划执行时间" },
        { prop: "", label: "完成时间" }
      ]
    },
    //债务人基础信用信息
    creditInformation: [
      [
        { name: "债务人", value: "xxxx", prop: "" },
        { name: "资产信息", value: "xxxx", prop: "" },
        { name: "司法案件", value: "xxxx", prop: "" }
      ],
      [
        { name: "被执行人", value: "xxxx", prop: "" },
        { name: "终本案件", value: "xxxx", prop: "" },
        { name: "限制高消费", value: "xxxx", prop: "" }
      ],
      [
        { name: "股权冻结", value: "xxxx", prop: "" },
        { name: "动产抵押", value: "xxxx", prop: "" }
      ]
    ],
    //评级结果
    ratingResults: [
      [
        { name: "案件评级", value: "c", prop: "", width: "100%" },
        {
          name: "评估结果说明",
          value:
            "债权质量好，债务人经营状况和财务状况良好，最终催收成功率高，各方面风险较低。现有的证据完全能够证明欠款事实，胜诉率非常大。",
          prop: "",
          width: "300%"
        }
      ],
      [{ name: "预计胜诉率", value: "80 %", prop: "", width: "100%" }],
      [{ name: "预计回款率", value: "50 %", prop: "", width: "100%" }]
    ],
    //费用预估
    costEstimate: [
      [{ name: "诉讼/仲裁费", value: "xxx 元", prop: "" }],
      [{ name: "财产保全费", value: "xxx 元", prop: "" }],
      [{ name: "财产保全保险费", value: "xxx 元", prop: "" }]
    ],
    //报价方案
    quotationScheme: [
      [{ name: "固定服务费模式", value: "xxx 元", prop: "" }],
      [{ name: "风险服务费模式", value: "xxx 元", prop: "" }],
      [{ name: "固定+风险服务费模式", value: "xxx 元", prop: "" }]
    ],
    //后台备注
    shenhe: {
      //后台备注
      desc: "",
      audit_status: "" //审核状态
    },
    lawyerType: [
      { prop: "lawyer_name", label: "律师名称" },
      { prop: "law_firm_name", label: "律所名称" },
      { prop: "lawyer_phone_number", label: "联系电话" },
      { prop: "lawyer_email", label: "联系邮箱" }
    ],
    //合同数据
    contractType: [
      { prop: "contract_number", label: "合同编号" },
      { prop: "contract_type", label: "合同类别" },
      { prop: "sign_status", label: "签署状态" }
    ],
    courtType: [
      { prop: "judge_name", label: "法官姓名" },
      { prop: "telephone", label: "联系电话" },
      { prop: "court_name", label: "法院名称" },
      { prop: "tribunal_name", label: "法庭名称" }
    ],
    contractVisible: false,
    contractData: [],
    list2: [],
    dataType2: [
      // {
      //   label: "委托编号",
      //   prop: "debtor_number",
      //   width: "150"
      // },
      {
        label: "结算状态",
        prop: "settlement_status",
        width: "120"
      },
      // {
      //   label: "债权人",
      //   prop: "creditor_name",
      //   width: "250"
      // },
      // {
      //   label: "债务人",
      //   prop: "debtor_name",
      //   width: "250"
      // },
      {
        label: "办案事项",
        prop: "entrusted_matters",
        width: "280"
      },
      {
        label: "办案律师",
        prop: "lawyer_name",
        width: "100"
      },
      {
        label: "管理员",
        prop: "admin_name",
        width: "100"
      },
      {
        label: "固定服务费",
        prop: "fixed_service_fee",
        width: "120"
      },
      {
        label: "风险服务费",
        prop: "fixed_service_fee",
        width: "120"
      },
      {
        label: "备注",
        prop: "bill_remarks",
        width: "220"
      },
      {
        label: "创建时间",
        prop: "create_time",
        width: "150"
      }
    ]
  };
  height: number = 0;
  sectionDom: any = {};
  infoData: any = {};
  dictionaries: Array<object> = [
    { name: "Executing_states_send_0", value: "待审核" },
    { name: "Executing_states_send_1", value: "待执行" },
    { name: "Executing_states_send_2", value: "执行中" },
    { name: "Executing_states_send_3", value: "执行完毕" },
    { name: "Executing_states_send_5", value: "执行异常" },
    { name: "Executing_states_send_6", value: "已撤销" },
    { name: "Executing_states_send_-1", value: "不含电催" }
  ];
  caseProssData: any = {}; //办案进度
  case_status: string = "";

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this;
    self.height = document.body.offsetHeight - 208;
    this.init();
  }

  beforeDestroy() {
    //
  }
  deactivated() {
    //
  }
  init() {
    let self: any = this;
    if (self.$route.params.id != 0 && self.$route.params.id != null) {
      self.getInfo(self.$route.params.id);
      self.getCasePross();
    }
    let top: number = self.$refs.right.offsetTop; //初始位置
    for (let index = 0; index <= 10; index++) {
      const domTop = self.$refs["section" + index].offsetTop - top;
      self.sectionDom["section" + index] = domTop;
    }
  }
  // 支付详情
  paymentInfo() {}
  //获取管理详情
  getInfo(id: string) {
    let debtor_number: string = id;
    this.data.obligorList = [];
    Api.getCaseInfo(debtor_number)
      .then((res: any) => {
        this.case_status = res.data.case_daetails.case_status_code; //案件状态
        this.data.case_report_file = res.data.case_daetails.case_report_file;
        this.data.operation_authority = res.data.operation_authority;
        res.data.pay_case.forEach((item: any) => {
          item.settlement_status = this.getSettlementName(
            item.settlement_status
          );
          item.create_time = this.timeStr(item.create_time);
          item.fixed_service_fee = this.thousandBitSeparator(
            item.fixed_service_fee
          );
          item.collection_amount = this.thousandBitSeparator(
            item.collection_amount
          );
          item.float_service_rate = item.float_service_rate + " %";
          item.float_service_fee = this.thousandBitSeparator(
            item.float_service_fee
          );
        });
        this.data.list2 = res.data.pay_case;
        //委托信息赋值
        this.data.BasicInfo.forEach((item: any) => {
          item.forEach((item2: any) => {
            if (item2.prop == "entrust_time") {
              item2.value = res.data.case_daetails[item2.prop].substring(
                0,
                res.data.case_daetails[item2.prop].lastIndexOf(":")
              );
            } else if (item2.prop === "ai_number") {
              item2.value = res.data.case_debtor.ai_number;
            } else {
              item2.value = res.data.case_daetails[item2.prop];
            }
          });
        });
        //办案事项赋值
        this.data.case_matters_name = res.data.case_matters_name;
        //客服赋值
        this.data.case_customer_service = res.data.case_customer_service;
        //债权人信息赋值
        // this.data.case_creditor.forEach((item: any) => {
        //   item.forEach((item2: any) => {
        //     item2.value = res.data.case_creditor[item2.prop];
        //   });
        // });
        res.data.case_creditor.certification_time = res.data.case_creditor.certification_time.substring(
          0,
          res.data.case_creditor.certification_time.lastIndexOf(":")
        );
        this.data.case_creditorData.push(res.data.case_creditor);
        //案件信息赋值
        this.data.caseInformation = this.caseDataMatching(res.data.case_debtor);
      })
      .catch((err: any) => {
        let self: any = this;
        self.$message.error("网络错误");
      });
  }
  //案件信息赋值匹配
  caseDataMatching(res: any) {
    let arr: any = [];
    const matching: any = [
      {
        lable: "债务人企业名称",
        value: "",
        width: 1,
        type: "Creditor_states_0",
        prop: "debtor_name",
        required: true
      },
      {
        lable: "债务人姓名",
        value: "",
        width: 1,
        type: "Creditor_states_1",
        prop: "debtor_name",
        required: true
      },
      {
        lable: "欠款币种",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "currency_name",
        required: true
      },
      {
        lable: "债务人企业负责人姓名",
        value: "",
        width: 1,
        type: "Creditor_states_0",
        prop: "contact_person"
      },
      {
        lable: "债务人手机号码",
        value: "",
        width: 1,
        type: "Creditor_states_1",
        prop: "phone_number"
      },
      {
        lable: "欠款本金",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "arrears_principal",
        required: true
      },

      {
        lable: "债务人企业负责人手机号码",
        value: "",
        width: 1,
        type: "Creditor_states_0",
        prop: "phone_number"
      },
      {
        lable: "债务人身份证号码",
        value: "",
        width: 1,
        type: "Creditor_states_1",
        prop: "id_card_no",
        required: true
      },
      {
        lable: "违约金/利息/滞纳金",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "arrears_interest"
      },
      {
        lable: "债务人实际经营地址",
        value: "",
        width: 3,
        type: "Creditor_states_0",
        prop: "address_txt"
      },
      {
        lable: "债务人有效联系地址",
        value: "",
        width: 3,
        type: "Creditor_states_1",
        prop: "address_txt"
      },
      {
        lable: "约定付款日期",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "agreed_payment_date"
      },
      {
        lable: "担保类型",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "guarantee_type",
        required: true
      },
      {
        lable: "债务人状态",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "debtor_status",
        required: true
      },
      {
        lable: "最后一次催款日期（有证据证明）",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "confirmation_date"
      },
      {
        lable: "债务人财产线索",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "property_clues",
        required: true
      },
      {
        lable: "债务人财产线索补充",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "property_clues_bc"
      },
      {
        lable: "现有证据",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "available_evidence",
        required: true
      },
      {
        lable: "其他证据",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "other_evidence"
      },
      {
        lable: "欠款是否存在争议",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "is_dispute",
        required: true
      },
      {
        lable: "案件管辖地区一",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "jurisdiction_01_txt"
      },
      {
        lable: "案件管辖地区二",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "jurisdiction_02_txt"
      },
      {
        lable: "其它管辖地区",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "jurisdiction_03_txt"
      },
      {
        lable: "委托事项",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "entrusted_matters",
        required: true
      },
      {
        lable: "其他委托",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "other_entrustment"
      },
      {
        lable: "债权人联系人姓名",
        value: "",
        width: 1,
        type: "Creditor_states",
        prop: "creditor_name",
        required: true
      },
      {
        lable: "债权人联系人电话",
        value: "",
        width: 2,
        type: "Creditor_states",
        prop: "creditor_telphone",
        required: true
      },
      {
        lable: "债权人联系人邮箱",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "creditor_email",
        required: true
      },
      {
        lable: "备注",
        value: "",
        width: 3,
        type: "Creditor_states",
        prop: "f_remarks"
      }
    ];
    arr = matching.filter((item: any) => {
      return item.type == res.debtor_type || item.type == "Creditor_states";
    });
    arr.forEach((item: any) => {
      item.value = res[item.prop] || "-";
    });
    return arr;
  }
  //千位符
  qianwei(num: number) {
    let value = num.toString();
    if (num) {
      if (value.indexOf(".") == -1 && value !== "-") {
        return num.toLocaleString() + ".00";
      } else {
        return num.toLocaleString();
      }
    } else {
      return num;
    }
  }
  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this;
    self.data.actIndex = index;
    self.data.actIndex2 = 0;
    self.laberClick2(index, 0);
  }
  //点击左侧二级菜单
  laberClick2(index: number, index2: number) {
    let self: any = this;
    self.data.actIndex = index;
    self.data.actIndex2 = index2;
    if (index == 1) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length + index2;
    } else if (index == 2) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length +
        self.data.labers[index - 2].children.length +
        index2;
    } else {
      self.data.rightIndex = index2;
    }
    let top: number = self.$refs.right.offsetTop; //初始位置
    let dom: any = "section" + self.data.rightIndex; //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop;
    self.$refs.right.scrollTop = actTop - top;
  }
  //审核
  beizhu() {
    let self: any = this;
    let parmas: any = {
      id: self.data.BasicInfo[0][0].value,
      audit_status: self.data.shenhe.audit_status,
      back_remarks: self.data.shenhe.desc
    };
  }
  //删除
  entrustDelet() {
    let self: any = this;
    self
      .$confirm("您确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // Api.entrustDelete(self.data.BasicInfo[0][0].value).then((res: any) => {
        //   if (res.data != 0) {
        //     self.$message.success(res.msg)
        //     self.$router.push({
        //       path: '/LawyerLetter/entrustList'
        //     })
        //   } else {
        //     self.$message.warning(res.msg)
        //   }
        // })
      })
      .catch(() => {
        self.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
  //撤销
  revoke() {
    let self: any = this;
    // self.$router.go(-1);
    self.$router.push({
      path: "/LawyerLawUrging/caseAdmin"
    });
  }
  //关闭弹窗
  close() {
    this.data.visible = false;
  }
  //打开详情弹窗
  openInfo(data: any) {
    this.data.infoTitle = data.name;
    this.data.visible = true;
    if (data.name == "首次催收短信" || data.name == "末次催收短信") {
      this.getSmsInfo(data.id);
    } else if (data.name == "首次催收电话" || data.name == "末次催收电话") {
      this.getPhoneInfo(data.id);
    } else if (data.name == "催收律师函") {
      this.getLawyerInfo(data.id, data.logistics_id);
    } else if (data.name == "催收函邮件") {
      this.getEmail(data.id);
    }
  }
  //获取短信详情
  getSmsInfo(id: number) {
    // Api.getSmsInfo(id).then((res: any) => {
    //   res.data["dic_content"] = this.getState(res.data.execution_status);
    //   this.infoData = res.data;
    // });
  }
  //获取电话详情
  getPhoneInfo(id: number) {
    Api.getPhoneInfo(id).then((res: any) => {
      res.data["dic_content"] = this.getState(res.data.execution_status);
      this.infoData = res.data;
    });
  }
  //获取律师函详情
  getLawyerInfo(id: number, logistics_id: number) {
    Api.getLawyerInfo(id, logistics_id).then((res: any) => {
      res.data.data["dic_content"] = this.getState(
        res.data.data.execution_status
      );
      this.infoData = res.data;
    });
  }
  //获取邮件详情
  getEmail(id: number) {
    Api.getEmail(id).then((res: any) => {
      res.data["dic_content"] = this.getState(res.data.execution_status);
      this.infoData = res.data;
    });
  }
  //执行状态码转化文本说明
  getState(code: number) {
    let state: any = this.dictionaries.filter((item: any) => {
      return item.name == "Executing_states_send_" + code;
    });
    return state[0].value;
  }
  //获取案件进程
  getCasePross() {
    let id: any = this.$route.params.id;
    Api.getCasePross(id).then((res: any) => {
      this.caseProssData = res.data;
    });
  }
  //查看
  handleSee(row: any) {
    if (row.contract_sign_method == 0) {
      let self: any = this;
      Api.getNoticeInfo(row.id).then((res: any) => {
        self.toinfo(res.data);
      });
      return false;
    }
    this.data.contractVisible = true;
    let text: string = row.contract_file_url;
    let arr: any = JSON.parse(text);
    this.data.contractData = arr;
  }
  //查看合同详情
  toinfo(url: string) {
    window.open(url);
  }
  //签署
  handleSign(row: any) {
    Api.SignNotice(row.id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    });
  }
  //时间转码
  timeStr(str: string) {
    let str1: string = str.replace("T", " ");
    let str2: string = str1.substring(0, str1.lastIndexOf(":"));
    return str2;
  }
  //结算状态转码
  getSettlementName(str: string) {
    let val: string = "未生成";
    switch (str) {
      case "Settlement_Status_0":
        val = "审核中";
        break;
      case "Settlement_Status_1":
        val = "待确认账单";
        break;
      case "Settlement_Status_2":
        val = "账单复核中";
        break;
      case "Settlement_Status_3":
        val = "开票中";
        break;
      case "Settlement_Status_4":
        val = "结算中";
        break;
      case "Settlement_Status_5":
        val = "已结算";
        break;
      case "Settlement_Status_6":
        val = "已退款";
        break;
      default:
        break;
    }
    return val;
  }
  //千位符
  thousandBitSeparator(num: number) {
    return num.toLocaleString();
  }
  //跳转账单
  handlInfo(row: any) {
    let number: string = row.bill_number;
    this.$router.push({
      path: `/finance/billInfo/${number}`
    });
  }
}
