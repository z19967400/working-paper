<template>
  <div class="entrustAdmin-wrap">
    <div class="entrustAdmin-box">
      <div :style="{ height: data.labers.length * 40 + 'px' }" class="left">
        <div class="text">
          <div
            v-for="(item, index) in data.labers"
            :key="index"
            :class="{ act: index == data.actIndex }"
            @click="laberClick(index)"
          >
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="shuxian-box">
          <div
            :style="{ transform: ' translateY(' + data.actIndex * 40 + 'px)' }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div ref="right" :style="{ height: height + 'px' }" class="right">
        <div ref="section0" class="section">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 0 }"
            >委托概况</span
          >
          <el-divider></el-divider>
          <div style="padding-left: 10px;" class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
            >
              <p v-for="(item2, index2) in item" :key="index2">
                <span>{{ item2.name }}</span>
                <span>{{ item2.value }}</span>
              </p>
            </div>
          </div>
        </div>
        <div ref="section1" class="section">
          <span :class="{ act: data.actIndex == 1 }">审核状态</span>
          <el-divider></el-divider>
          <div style="padding-left: 10px;" class="box">
            <div class="text">
              <p>
                <span>审核状态</span
                ><span
                  :style="{
                    color:
                      data.shenhe.audit_status == 'Audit_states_2'
                        ? '#67C23A'
                        : data.shenhe.audit_status == 'Audit_states_1'
                        ? '#e01f3c'
                        : '#E6A23C'
                  }"
                  >{{
                    data.shenhe.audit_status == "Audit_states_2"
                      ? "已通过"
                      : data.shenhe.audit_status == "Audit_states_1"
                      ? "未通过"
                      : "待审核"
                  }}</span
                >
              </p>
              <p v-show="data.shenhe.desc != null">
                <span>审核反馈</span><span>{{ data.shenhe.desc }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div ref="section1" class="section">
          <span :class="{ act: data.actIndex == 1 }">支付信息</span>
          <el-divider></el-divider>
          <div class="box">
            <div v-for="(item, index) in data.payment" :key="index" class="text">
              <p v-for="(item2, index2) in item" :key="index2">
                <span>{{ item2.name }}</span>
                <span v-if="item2.name != '收支详情'">{{ item2.value }}</span>
                <el-button v-if="item2.name == '收支详情'" class="info" size="small" type="text" @click="paymentInfo()">查看</el-button>
              </p>
            </div>
          </div>
        </div> -->
        <div ref="section2" class="section">
          <span style="position:relative;" :class="{ act: data.actIndex == 2 }">
            执行进度
            <img
              style="width:20px;cursor: pointer;position:absolute ;top:-3px;left:72px;"
              src="../../../../assets/images/tips.svg"
              alt=""
              @click="dialogVisible = true"
            />
          </span>
          <el-divider></el-divider>
          <div class="box">
            <table2
              :tableOption="data.implementOption"
              :tableData="data.implementList"
              @info="openInfo"
            ></table2>
          </div>
        </div>
        <div ref="section3" class="section">
          <span :class="{ act: data.actIndex == 3 }">债务人</span>
          <el-divider></el-divider>
          <div class="box">
            <table1
              :tableOption="data.obligorOption"
              :tableData="data.obligorList"
            ></table1>
          </div>
        </div>
        <div ref="section4" class="section">
          <span :class="{ act: data.actIndex == 4 }">债务明细</span>
          <el-divider></el-divider>
          <div class="box">
            <table1
              class="right-table"
              :tableOption="data.debtDetailsOption"
              :tableData="data.debtDetailsList"
            ></table1>
          </div>
        </div>
        <div ref="section5" class="section">
          <span :class="{ act: data.actIndex == 5 }">债务反馈</span>
          <el-divider></el-divider>
          <div class="box">
            <table1
              :tableOption="data.feedbackOption"
              :tableData="data.feedbackList"
            ></table1>
          </div>
        </div>
        <div ref="section6" class="section">
          <span :class="{ act: data.actIndex == 6 }">债权人</span>
          <el-divider></el-divider>
          <div class="box">
            <table1
              :tableOption="data.creditorOption"
              :tableData="data.creditorList"
            ></table1>
          </div>
        </div>
      </div>
    </div>
    <div class="zhezhao" @click="close" v-show="data.visible"></div>
    <el-popover
      :title="data.infoTitle"
      popper-class="editData"
      v-model="data.visible"
    >
      <span @click="close" class="el-icon-close close"></span>
      <el-divider></el-divider>
      <smsPhone
        :auditStatus="data.shenhe.audit_status"
        :name="data.infoTitle"
        :info="infoData"
        :lawyer_file="downloadFie"
      ></smsPhone>
    </el-popover>
    <div class="btn-box">
      <!-- <el-button size="small" type="success">下载催收报告</el-button>
      <el-button size="small" type="success">下载快递信息</el-button> -->
      <!-- <el-button size="small" @click="entrustDelet" type="primary"
        >删除</el-button
      > -->
      <el-button size="small" plain @click="goBack" type="primary"
        >返回
      </el-button>
      <el-button
        size="small"
        :disabled="data.shenhe.audit_status != 'Audit_states_2'"
        plain
        @click="report"
        type="primary"
        >下载/查看执行报告
      </el-button>
      <el-button
        size="small"
        :disabled="data.shenhe.audit_status != 'Audit_states_2'"
        plain
        @click="downloadLaysletter"
        type="primary"
        >下载律师函
      </el-button>
      <el-button
        size="small"
        :disabled="execution_progress != '待审核' || !data.operation_authority"
        plain
        @click="revoke"
        type="primary"
        >撤销执行
      </el-button>
      <el-button
        :disabled="execution_progress != '执行中' || !data.operation_authority"
        size="small"
        plain
        @click="termination"
        type="primary"
        >终止执行
      </el-button>
      <el-button
        size="small"
        v-show="
          data.BasicInfo[0][1].value == '企业应收账款' ||
            data.BasicInfo[0][1].value == '逾期贷款'
        "
        @click="CreateCasesByAI"
        type="primary"
        >发起律师办案
      </el-button>
    </div>
    <div class="zhezhao" @click="reportShow = false" v-show="reportShow"></div>
    <el-popover
      title="查看/下载执行报告"
      popper-class="editData  report"
      v-model="reportShow"
    >
      <span @click="reportShow = false" class="el-icon-close close"></span>
      <div v-loading="loading" class="reportBox">
        <el-button
          size="small"
          :disabled="execution_progress == '待审核'"
          plain
          @click="goReport"
          type="primary"
          >查看报告
        </el-button>
        <el-button
          size="small"
          :disabled="
            executing_status != 'AI_State_3' && executing_status != 'AI_State_4'
          "
          plain
          @click="download"
          type="primary"
          >下载报告
        </el-button>
      </div>
    </el-popover>
    <el-dialog
      title="请您知晓"
      custom-class="tipsBox"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-divider></el-divider>
      <!-- <p>请您知晓</p> -->
      <p>
        1.由于我们的短信、电话供应商限流，以及节假日EMS停止收件等原因，您的委托计划执行时间可能会有一定提前或延迟，请您自行留意相关案件的诉讼时效，并于每个催收项目执行结束后查看实际执行时间。
      </p>
      <p>
        2.如您需保存律师函的EMS官网物流信息，请在查询期限内自行至EMS官网
        <el-link @click="openEms" type="success">（www.ems.com.cn）</el-link>
        查询保存，债主帮的服务中不包含前述内容。
      </p>
      <p>如需帮助，请致电4006321918，谢谢。</p>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="width:100px;"
          type="primary"
          @click="dialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../../../api/AIlvshihan";
import * as Api2 from "../../../../api/layout";
// import { verifyPhone, verifyEmall } from "../../../utils/common";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import smsPhone from "./components/smsPhone.vue";
@Component({
  components: {
    table1,
    table2,
    smsPhone
  }
})
export default class About extends Vue {
  data: any = {
    visible: false,
    actIndex: 0,
    infoTitle: "",
    operation_authority: false,
    labers: [
      { name: "委托概况" },
      // { name: '支付信息' },
      { name: "审核状态" },
      { name: "执行进度" },
      { name: "债务人" },
      { name: "债务明细" },
      { name: "债务反馈" },
      { name: "债权人" }
    ],
    BasicInfo: [
      //基础信息
      [
        { name: "委托编号", value: "", prop: "debtor_number" },

        { name: "债务类别", value: "", prop: "debt_type" }
      ],
      [
        { name: "发函方式", value: "", prop: "send_type" },
        { name: "创建人", value: "", prop: "create_name" }
      ],
      [
        { name: "法催主体", value: "", prop: "logo_type" },
        { name: "创建时间", value: "", prop: "create_time" }
      ]
    ],
    payment: [
      //支付信息
      [{ name: "支付金额", value: "" }],
      [{ name: "订单编号", value: "" }],
      [{ name: "收支详情", value: "" }]
    ],
    //执行进度
    implementList: [],
    implementOption: [
      { prop: "sort", label: "进程", width: "80px" },
      { prop: "task_name", label: "项目" },
      { prop: "execution_time", label: "计划执行时间" },
      { prop: "execution_status", label: "执行状态" }
    ],
    //债权人
    creditorList: [],
    creditorOption: [
      // { prop: "id", label: "ID", width: "80px" },
      { prop: "creditor_name", label: "债权人名称" },
      // { prop: "phone_number", label: "公司电话" },
      // { prop: "email", label: "电子邮箱" },
      { prop: "audit_status", label: "审核状态" },
      { prop: "create_time", label: "创建时间" }
    ],
    //债务人
    obligorList: [],
    obligorOption: [],
    //债务明细
    debtDetailsList: [],
    debtDetailsOption: [
      { prop: "id", label: "委托编号" },
      { prop: "id", label: "表头001" },
      { prop: "id", label: "表头002" },
      { prop: "id", label: "表头003" },
      { prop: "id", label: "表头004" }
    ],
    feedbackList: [],
    feedbackOption: [
      { prop: "debtor_number", label: "委托编号" },
      { prop: "is_dissent", label: "是否有异议" },
      { prop: "dissent_content", label: "异议内容" },
      { prop: "member_remarks", label: "用户备注" },
      { prop: "feedback_source", label: "反馈来源" },
      { prop: "create_time", label: "反馈时间" }
    ],
    shenhe: {
      //审核反馈
      desc: "",
      audit_status: "" //审核状态
    },
    obligorType: "", //债务人类别
    creditor_id: "" //债权人ID
  };
  dialogVisible: boolean = false;
  height: number = 0;
  sectionDom: any = {};
  infoData: any = {
    phone_number: "",
    email: "",
    execution_status: "",
    execution_time: "",
    data: "",
    debtor_number: "",
    execution_err_msg: "",
    logistics: {},
    logistics_details: [],
    call_send_time: "",
    call_send_count: ""
  };
  dictionaries: Array<object> = [
    { name: "Executing_states_send_0", value: "待审核" },
    { name: "Executing_states_send_1", value: "待执行" },
    { name: "Executing_states_send_2", value: "执行中" },
    { name: "Executing_states_send_3", value: "执行完毕" },
    { name: "Executing_states_send_5", value: "执行异常" },
    { name: "Executing_states_send_6", value: "已撤销" },
    { name: "Executing_states_send_-1", value: "不含电催" }
  ];
  execution_progress: string = "";
  reportShow: boolean = false;
  downloadFie: string = "";
  reportStatus: string = "";
  executing_status: string = "";
  loading: boolean = false;
  reportID: any = "";
  timer: any = "";
  created() {
    //
  }

  activated() {}

  mounted() {
    let self: any = this;
    self.height = document.body.offsetHeight - 208;
    this.init();
    if (self.$route.query.name === "执行进度") {
      self.laberClick(1);
    }
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
      this.getInfo(self.$route.params.id);
    }
    let top: number = self.$refs.right.offsetTop; //初始位置
    for (let index = 0; index <= 6; index++) {
      const domTop = self.$refs["section" + index].offsetTop - top;
      self.sectionDom["section" + index] = domTop;
    }
  }
  // 支付详情
  paymentInfo() {}
  //获取管理详情
  getInfo(id: any) {
    this.data.creditorList = [];
    this.data.obligorList = [];
    Api.getAdmin(id)
      .then((res: any) => {
        this.data.operation_authority = res.data.operation_authority;
        // 执行进度(集合)
        this.data.implementList = res.data.task_list;
        this.execution_progress = res.data.overview.execution_progress;
        this.executing_status = res.data.overview.executing_status;
        this.data.creditor_id = res.data.overview.creditor_id;
        if (
          this.execution_progress == "已终止" ||
          this.execution_progress == "已撤销"
        ) {
          this.data.implementList.forEach((item: any) => {
            if (item.execution_status == "待执行") {
              item.execution_status = this.execution_progress;
            }
          });
        }
        // 债权人
        if (res.data.creditor != null) {
          res.data.creditor.audit_status =
            res.data.creditor.audit_status == "Audit_states_0"
              ? "待审核"
              : res.data.creditor.audit_status == "Audit_states_1"
              ? "未通过"
              : "已通过";
          res.data.creditor.create_time = res.data.creditor.create_time.replace(
            "T",
            " "
          );
          res.data.creditor.create_time = res.data.creditor.create_time.substring(
            0,
            res.data.creditor.create_time.lastIndexOf(":")
          );
          this.data.creditorList.push(res.data.creditor);
        }
        // 债务人
        this.setObligorOption(res);
        // 支付信息
        // this.data.payment[0][0].value = res.Order.order_amount
        // this.data.payment[1][0].value = res.Order.pay_number
        // 审核反馈
        this.data.shenhe.audit_status = res.data.overview.audit_status;
        if (this.data.shenhe.audit_status == "Audit_states_2") {
          this.data.implementOption[2].label = "执行时间";
        }
        this.data.shenhe.desc = res.data.overview.audit_feedback;
        this.downloadFie = res.data.overview.lawyer_file;
        // 基础信息
        if (res.data.overview != null) {
          this.data.BasicInfo.forEach((item: any) => {
            item.forEach((item2: any) => {
              if (item2.prop == "send_type") {
                item2.value =
                  res.data.overview[item2.prop] == 0
                    ? "电子律师函"
                    : "EMS律师函";
              } else if (item2.prop == "logo_type") {
                item2.value =
                  res.data.overview[item2.prop] == "Logo_type_0"
                    ? "诚收法催"
                    : "债主帮";
              } else if (item2.prop == "debt_type") {
                item2.value =
                  res.data.overview[item2.prop] == "Debt_type_0"
                    ? "民间借贷"
                    : res.data.overview[item2.prop] == "Debt_type_4"
                    ? "企业应收账款"
                    : res.data.overview[item2.prop] == "Debt_type_5"
                    ? "逾期贷款"
                    : res.data.overview[item2.prop] == "Debt_type_6"
                    ? "信用卡逾期"
                    : res.data.overview[item2.prop] == "Debt_type_7"
                    ? "保险追偿"
                    : res.data.overview[item2.prop] == "Debt_type_8"
                    ? "物业/采暖费"
                    : "不当得利";
              } else if (item2.prop == "create_time") {
                let time: string = res.data.overview[item2.prop].replace(
                  "T",
                  " "
                );
                item2.value = time.substring(0, time.lastIndexOf(":"));
              } else {
                item2.value = res.data.overview[item2.prop];
              }
            });
          });
        }
        // 债务明细
        // if (res.data.debtor_details.length <= 1) {
        //   this.data.labers = [
        //     { name: '委托概况' },
        //     { name: '审核状态' },
        //     { name: '执行进度' },
        //     { name: '债务人' },
        //     { name: '债权人' },
        //   ]
        // }
        if (res.data.debtor_details.length != 0) {
          // this.data.labers = [
          //   { name: '委托概况' },
          //   { name: '审核状态' },
          //   { name: '执行进度' },
          //   { name: '债务人' },
          //   { name: '债权人' },
          //   { name: '债务明细' },
          // ]
          let debtDetailsOption: any = [
            // { prop: "batch_no", label: "委托批次号", width: "200px" }
          ];
          let headers: any = res.data.debtor_details.filter((item: any) => {
            return item.is_headers == 1;
          });
          let content: any = headers[0].debt_content.split("╫");
          content.forEach((item: any, index: number) => {
            let dd: any = {
              prop: "prop" + index,
              label: item
              // width: item.replace('↵', '').length * 20 + 'px',
            };
            debtDetailsOption.push(dd);
          });
          this.data.debtDetailsOption = debtDetailsOption;
          let body: any = res.data.debtor_details.filter((item: any) => {
            return item.is_headers != 1;
          });
          if (body.length != 0) {
            let debtDetailsList: any = [];
            body.forEach((item: any, index: number) => {
              let list: any = item.debt_content.split("╫");
              let obj: any = {};
              // obj["batch_no"] = item.batch_no;
              list.forEach((item2: any, index2: number) => {
                // if (index2 === 3) {
                //   obj["prop" + index2] = parseInt(item2).toLocaleString();
                // } else {
                obj["prop" + index2] = item2;
                // }
              });
              debtDetailsList.push(obj);
            });
            this.data.debtDetailsList = debtDetailsList;
          }
        }
        //债务反馈
        if (res.data.feedback_list.length > 0) {
          res.data.feedback_list.forEach((item: any) => {
            item.is_dissent = item.is_dissent == 1 ? "有" : "无";
            item.feedback_source =
              item.feedback_source == 1 ? "债务人提交" : "客服添加";
            item.create_time = item.create_time
              .substring(0, item.create_time.lastIndexOf(":"))
              .replace("T", " ");
          });
        }
        this.data.feedbackList = res.data.feedback_list;
      })
      .catch((err: any) => {
        let self: any = this;
        self.$message.error("网络错误");
      });
  }
  //债务人表头信息填充
  setObligorOption(res: any) {
    let obligorType: string = res.data.debtor.debtor_type; //债务人类别
    this.data.obligorType = obligorType;
    let debtorType: string = res.data.debtor.entrust_type; //债务类别
    let variable: any = [];
    let constant: any = [
      // { prop: "debtor_number", label: "委托编号", width: "180px" },
      { prop: "currency_name", label: "欠款币种", width: "90px" },
      { prop: "arrears_principal", label: "欠款本金", width: "150px" },
      { prop: "arrears_interest", label: "违约金/利息/滞纳金", width: "150px" },
      { prop: "creditor_name", label: "债权人联系人姓名", width: "200px" },
      { prop: "creditor_telphone", label: "债权人联系人电话", width: "200px" },
      { prop: "creditor_email", label: "债权人联系人邮箱", width: "250px" }
    ];
    // 个人
    if (obligorType == "Creditor_states_1") {
      let currency: any = [
        { prop: "debtor_name", label: "债务人", width: "120px" },
        { prop: "phone_number", label: "债务人手机", width: "200px" },
        { prop: "email", label: "债务人邮箱", width: "220px" },
        { prop: "address_txt", label: "债务人地址", width: "330px" }
      ];
      if (debtorType == "Debt_type_7") {
        let item: any = {
          prop: "insurer_name",
          label: "被保险人名称",
          width: "120px"
        };
        currency.push(item);
      } else if (debtorType == "Debt_type_8") {
        let item: any = {
          prop: "arrearage_type",
          label: "欠费类型",
          width: "120px"
        };
        currency.push(item);
      } else if (debtorType == "Debt_type_6") {
        let item: any = {
          prop: "settlement_date",
          label: "结算日期",
          width: "200px"
        };
        currency.push(item);
      }
      variable = currency;
      //企业
    } else if (obligorType == "Creditor_states_0") {
      let currency: any = [
        { prop: "debtor_name", label: "债务人", width: "280px" },
        {
          prop: "contact_person",
          label: "企业负责人",
          width: "120px"
        },
        {
          prop: "phone_number",
          label: "债务人手机",
          width: "120px"
        },
        { prop: "email", label: "债务人邮箱", width: "250px" },
        {
          prop: "address_txt",
          label: "债务人地址",
          width: "330px"
        }
      ];
      if (debtorType == "Debt_type_7") {
        let item: any = {
          prop: "insurer_name",
          label: "被保险人名称",
          width: "120px"
        };
        currency.push(item);
      } else if (debtorType == "Debt_type_8") {
        let item: any = {
          prop: "arrearage_type",
          label: "欠费类型",
          width: "120px"
        };
        currency.push(item);
      }
      variable = currency;
    }
    this.data.obligorOption = variable.concat(constant);
    this.data.obligorList.push(res.data.debtor);
    let self: any = this;
    self.data.obligorList.forEach((item: any) => {
      if (this.getStr(item.arrears_principal).length == 3) {
        item.arrears_principal = item.arrears_principal.toLocaleString();
      } else if (this.getStr(item.arrears_principal).length == 2) {
        item.arrears_principal = item.arrears_principal.toLocaleString() + "0";
      } else {
        item.arrears_principal =
          item.arrears_principal.toLocaleString() + ".00";
      }
      if (this.getStr(item.arrears_interest).length == 3) {
        item.arrears_interest = item.arrears_interest.toLocaleString();
      } else if (this.getStr(item.arrears_interest).length == 2) {
        item.arrears_interest = item.arrears_interest.toLocaleString() + "0";
      } else {
        item.arrears_interest = item.arrears_interest.toLocaleString() + ".00";
      }
    });
  }
  //获取小数点后两位
  getStr(str: any) {
    let str2: string = JSON.stringify(str);
    if (str2.indexOf(".") != -1) {
      return str2.substring(str2.indexOf("."), str2.length);
    }
    return "";
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
  //滚动监听
  scrollGet(e: any) {
    if (e.target.scrollTop <= this.sectionDom.section0) {
      this.data.actIndex = 0;
    } else if (e.target.scrollTop <= this.sectionDom.section1) {
      this.data.actIndex = 1;
    } else if (e.target.scrollTop <= this.sectionDom.section2) {
      this.data.actIndex = 2;
    } else if (e.target.scrollTop <= this.sectionDom.section3) {
      this.data.actIndex = 3;
    } else if (e.target.scrollTop <= this.sectionDom.section4) {
      this.data.actIndex = 4;
    } else if (e.target.scrollTop <= this.sectionDom.section5) {
      this.data.actIndex = 5;
    }
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
  //返回
  goBack() {
    let self: any = this;
    let number: string = this.data.BasicInfo[0][0].value;
    self.$router.push({
      path: "/AILawyerletter/Management/",
      query: {
        number
      }
    });
  }
  //撤销
  revoke() {
    let self: any = this;
    let number: string = self.data.BasicInfo[0][0].value;
    self
      .$confirm("您确认撤销改委托吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        Api.stopAiLetter(number, 2).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg);
            self.goBack();
          } else {
            self.$message.warning(res.msg);
          }
        });
      })
      .catch(() => {
        self.$message({
          type: "info",
          message: "已取消撤销"
        });
      });
  }
  //关闭弹窗
  close() {
    this.data.visible = false;
  }
  //打开详情弹窗
  openInfo(data: any) {
    let debtor_number = this.data.BasicInfo[0][0].value;
    let ai_task_code = data.task_code;
    this.data.infoTitle = data.task_name;
    this.data.visible = true;
    this.infoData.phone_number = this.data.obligorList[0].phone_number;
    this.infoData.email = this.data.obligorList[0].email;
    this.infoData.execution_err_msg = data.execution_err_msg;
    this.infoData.call_send_time = data.call_send_time;
    this.infoData.call_send_count = data.call_send_count;
    this.getSmsInfo(ai_task_code, debtor_number, data);
    if (data.task_name == "EMS律师函") {
      setTimeout(() => {
        this.getEms(data.task_id);
      }, 500);
    }
  }
  //获取短信详情
  getSmsInfo(ai_task_code: string, debtor_number: string, data: any) {
    Api.getSmsInfo(ai_task_code, debtor_number).then((res: any) => {
      this.infoData.execution_status = data.execution_status;
      this.infoData.execution_time = data.execution_time;
      this.infoData.debtor_number = debtor_number;
      this.infoData.data = res.data;
    });
  }
  //获取物流信息
  getEms(id: number) {
    Api.getEmail(id).then((res: any) => {
      this.infoData.logistics = res.data.logistics;
      this.infoData.logistics_details = res.data.logistics_details;
    });
  }
  //执行状态码转化文本说明
  getState(code: number) {
    let stateTexy: string = "";
    let state: any = this.dictionaries.filter((item: any) => {
      return item.name == "Executing_states_send_" + code;
    });
    if (state[0].value == "待执行" && this.execution_progress == "已终止") {
      stateTexy = "已终止";
    } else {
      stateTexy = state[0].value;
    }
    return stateTexy;
  }
  //终止
  termination() {
    let self: any = this;
    let number: string = self.data.BasicInfo[0][0].value;
    self
      .$confirm("终止执行后不可恢复，是否确认终止?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        Api.stopAiLetter(number, 1).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg);
            self.goBack();
          } else {
            self.$message.warning(res.msg);
          }
        });
      })
      .catch(() => {
        self.$message({
          type: "info",
          message: "已取消终止"
        });
      });
  }
  //打开执行报告选择
  report() {
    this.reportShow = true;
    let debtor_number = this.data.BasicInfo[0][0].value;
    Api.GetAILawyerLetterReport(debtor_number).then((res: any) => {
      this.reportStatus = res.data.report_status;
      this.reportID = res.data.id;
    });
  }
  //数字千位符转化
  thousandBitSeparator(num: any) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  }
  //查看执行报告
  goReport() {
    let number: string = this.data.BasicInfo[0][0].value;
    window.open(
      "http://api1.debteehelper.com/AILawyerLetter/AILawyerLetterReport?debtor_number=" +
        number
    );
  }
  //下载执行报告
  download() {
    let self: any = this;
    let reportStatus: any = self.reportStatus;
    let debtor_number = this.data.BasicInfo[0][0].value;
    if (reportStatus == 1) {
      Api.GetAILawyerLetterReport(debtor_number).then((res: any) => {
        window.open(res.data.report_file);
      });
    } else {
      self.loading = true;
      Api.GenerateReport(self.reportID).then(() => {
        self.timer = setInterval(() => {
          self.getReport();
        }, 1000);
      });
    }
  }
  // 获取报告
  getReport() {
    let self: any = this;
    let debtor_number: string = self.data.BasicInfo[0][0].value;
    Api.GetAILawyerLetterReport(debtor_number).then((res: any) => {
      let reportStatus: any = res.data.report_status;
      this.reportStatus = reportStatus;
      if (reportStatus == 1) {
        self.loading = false;
        clearInterval(self.timer);
        window.open(res.data.report_file);
      }
    });
  }
  //下载律师函
  downloadLaysletter() {
    window.open(this.downloadFie);
  }
  //打开EMs官网
  openEms() {
    window.open("https://www.ems.com.cn/");
  }
  //AI律师函转律师办案
  CreateCasesByAI() {
    let self: any = this;
    self.$router.push({
      path: "/LawyerLawUrging/apply",
      query: {
        type: self.data.BasicInfo[0][1].value,
        obligorType: self.data.obligorType,
        creditor_id: self.data.creditor_id,
        debtor_number: self.data.BasicInfo[0][0].value
      }
    });
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.entrustAdmin-wrap {
  width: 100%;
  min-height: 100%;
  background-color: $main-body-bgColor;
  position: relative;
  .entrustAdmin-box {
    display: flex;
    .el-table th,
    .el-table td {
      text-align: center;
    }
    & .left {
      width: 120px;
      display: flex;
      & > .text {
        div {
          color: $Main-characters;
          font-size: $Text-font;
          height: 40px;
          line-height: 40px;
          padding: 0 25px 0 0;
          text-align: center;
          cursor: pointer;
        }
        .act {
          color: #ec193a;
        }
      }
      & > .shuxian-box {
        height: 100%;
        width: 2px;
        background-color: #e4e7ed;
        position: relative;
        & > .shuxian {
          width: 100%;
          height: 40px;
          background-color: #ec193a;
          transition: transform 0.5s ease;
          transform: translateY(0);
        }
      }
    }
    & .right {
      width: 90%;
      overflow-y: auto;
      padding-right: 20px;
      .act {
        color: #ec193a !important;
      }
      & .section {
        margin-bottom: 20px;

        & > span:first-child {
          font-size: 14px;
          color: #606266;
          font-weight: bold;
          margin-top: 10px;
          display: block;
          border-left: 3px solid #e01f3c;
          height: 15px;
          line-height: 15px;
          padding-left: 10px;
        }
        .box {
          display: flex;
          .text {
            width: 33.33%;
            p {
              color: $General-colors;
              font-size: 14px;
              margin: 0;
              margin-bottom: 10px;
              line-height: 32px;
              display: flex;
              & > span:first-child {
                margin-right: 20px;
                font-size: 12px;
                color: $Secondary-text;
                min-width: 48px;
              }
            }
          }
        }
      }
    }
  }
  .el-form {
    width: 600px;
  }
  .el-divider--horizontal {
    margin: 5px 0 20px 0;
  }
  .info {
    color: #409eff;
  }
  .btn-box {
    position: absolute;
    bottom: 0;
    left: 10%;
  }
  .report {
    width: 300px;
  }
  .reportBox {
    text-align: center;
  }
  & .editData {
    & .el-divider {
      position: relative;
      top: -8px;
    }
  }
  & .tipsBox {
    border-radius: 10px;
    padding: 10px;
    & .el-dialog__body {
      padding-top: 0;
    }
    & .el-divider {
      margin: 5px 0 15px 0;
    }
    & .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
