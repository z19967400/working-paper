/* eslint-disable prettier/prettier */
// import { getshoukuanTableData } from "./../../../api/AIlvshihan";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import menuRaido from "./components/radio/Radio.vue";
import myTable from "./components/table/myTable.vue";
import myaddres from "@/components/address/address.vue";
import shoukuanTable from "./components/table/shoukuanTable.vue";
import shoukuanForm from "./components/form/shoukuan.vue";
import { baseURL, imgBaseUrl } from "@/utils/request";
import { validateEmall, validatePhone } from "@/utils/common";
import * as Api from "@/api/AIlvshihan";
import { AIlvshihanOptions } from "@/types";
import comSetTwo from "./components/form/stepTwo.vue";
import pay from "@/components/pay/pay.vue";
import addForms from "../../creditor/editcedrior.vue";
import { getCookie } from "@/utils/common";
@Component({
  components: {
    "menu-raido": menuRaido,
    "my-table": myTable,
    "my-addres": myaddres,
    "collection-table": shoukuanTable,
    "shoukuan-form": shoukuanForm,
    comSetTwo,
    pay,
    addForms
  }
})
export default class About extends Vue {
  // @Prop({default:false}) public bbb?:string
  // data
  // 表格加载
  loading: boolean = true;
  collectList: any = {
    payment_channel_name: "",
    contacts_name: "",
    contacts_phone: "",
    contacts_email: "",
    alipay_account: "",
    payee_name: "",
    bank_name: "",
    bank_account: "",
    pay_remarks: ""
  };

  data: any = {
    creditor_serch: "",
    user_code: "AI_1005",
    height: 0,
    Creditor_states_0: "Creditor_states_0",
    //债务人类别选择
    obligorType: [
      {
        dic_content: "企业",
        dic_code: "Creditor_states_0"
      },
      {
        dic_content: "个人",
        dic_code: "Creditor_states_1"
      }
    ],
    //债务类别
    Debt_type: [
      { dic_content: "企业应收账款", dic_code: "Debt_type_4", type: "any" },
      { dic_content: "逾期贷款", dic_code: "Debt_type_5", type: "any" },
      {
        dic_content: "信用卡逾期",
        dic_code: "Debt_type_6",
        type: "Creditor_states_1"
      },
      { dic_content: "保险追偿", dic_code: "Debt_type_7", type: "any" },
      {
        dic_content: "物业/采暖/房租欠费",
        dic_code: "Debt_type_8",
        type: "Creditor_states_0"
      },
      {
        dic_content: "物业/采暖/房租/购房款欠费",
        dic_code: "Debt_type_8",
        type: "Creditor_states_1"
      },
      { dic_content: "不当得利", dic_code: "Debt_type_9", type: "any" }
    ],
    //发函方式选择
    SendLetter: [
      { dic_content: "EMS+电子邮件", dic_code: "1" },
      { dic_content: "电子邮件", dic_code: "0" }
    ],
    //法催主体选择
    Logo_types: [
      { dic_content: "债主帮", dic_code: "Logo_type_1" },
      { dic_content: "诚收法催", dic_code: "Logo_type_0" }
    ],
    //主页面列表信息
    menulist: [],
    //债务类别
    collection_scene: "Debt_type_4",
    //债务人类别
    Radio: "Creditor_states_0",
    // Radio: "",
    //发函方式
    send_type: "1",
    //增值服务
    //法催主体
    logo_type: "Logo_type_1",
    //增值服务 多选列表
    checkList: ["1", "2", "3"],
    collsms: 1,
    collemail: 0,
    collphone: 0,
    //收款列表
    shoukuanTableData: [],
    //选择债权人是否显示
    dialogVisible: false,
    //新增债权人
    addDialogVisible: false,
    // 选择债权人标题
    creditortitle: "选择债权人",
    creditorType: false,
    //选择债务人弹框的列表
    tableData: [],
    // 债权人id
    collid: "",
    //下一步 控制页面切换
    flag: true,
    // 债权人识别后返回值
    collTable: [],
    //债权人识别后传回去的值
    collTablelistss: [],
    // 识别表命名
    columnTableName: "",
    // 识别明细返回值
    collTabless: [],
    //明细表命名
    columnTableNamess: "",
    //修改弹框
    errorDialogVisible: false,
    //错误单元的个数
    failcount: {},
    //错误单元格的内容
    errorForm: { val: "", msg: "", textNum: "", rownum: "", texname: "" },
    //处理后的明细表数据
    smileData: [],
    //新增债务人
    addForm: {
      name: "",
      zhenshun: "",
      zhenshunum: "",
      mobile: "",
      email: "",
      adds: [],
      address: "",
      detailed_address: ""
    },
    // 证照缩略图展示、地址
    imgDialogVisible: false,
    imgBaseUrl: "",
    dialogImageUrl: "",
    disabled: false,
    file: { url: "", name: "", exlurl: "", exname: "" },
    // 新增表单验证规则
    addRuleForm: {
      name: [
        { required: true, message: "请输入债权人名称", trigger: "blur" },
        {
          min: 2,
          max: 10,
          message: "用户名的长度在2~10个字符之间",
          trigger: "blur"
        }
      ],
      zhenshun: [
        { required: true, message: "请上传证照图片", trigger: "blur" }
      ],
      zhenshunum: [
        { required: true, message: "请输入证照编号", trigger: "blur" }
      ],
      email: [
        { required: true, message: "请输入电子邮箱", trigger: "blur" },
        { validator: validateEmall, trigger: "blur" }
      ],
      adds: [{ required: true, message: "请选择地区", trigger: "change" }],
      mobile: [
        { required: true, message: "电话号码不得为空", trigger: "blur" },
        {
          min: 4,
          max: 12,
          message: "电话号码的长度在4~12个字符之间",
          trigger: "blur"
        }
      ],
      detailed_address: [
        { required: true, message: "请输入地址详情", trigger: "blur" }
      ]
    },
    //新增收款通道
    addCollectionRuleForm: {
      // payment_channel_name: [
      //   { required: true, message: "请输入收款通道名称", trigger: "blur" },
      //   {
      //     min: 2,
      //     max: 10,
      //     message: "收款通道名称的长度在2~10个字符之间",
      //     trigger: "blur"
      //   }
      // ],
      contacts_name: [
        { required: true, message: "请输入联系人名称", trigger: "blur" },
        {
          min: 2,
          max: 10,
          message: "联系人的长度在2~10个字符之间",
          trigger: "blur"
        }
      ],
      contacts_email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        { validator: validateEmall, trigger: "blur" }
      ]
    },
    // 配置请求的基准URL地址
    basurl: "",

    //选择收款通道
    collectionDialogVisible: false,
    // 收款通道id
    moneids: "",

    // 新增收款通道
    addCollectionDialogVisible: false,

    // 获取下载模板的地址，名字
    templateName: "",
    templatePath: "",
    templateId: "",

    // 下一步表格数据
    // 债务信息识别表格标题
    columnName: [],
    // 债务明细标题表格
    columnNamess: []
  };
  left: number = 0;
  right: boolean = false;
  openType: boolean = false;
  selectCreditors: string = "请选择债权人"; //选择债权人
  selectTicket: string = "请选择收款通道"; //选择收款通道
  nextpoxType: boolean = false;
  uploadText: string = "可将文件拖曳至框内上传";
  fullscreenLoading: boolean = false;
  editTitle: string = "";
  payShow: boolean = false;
  payinfo: any = {};
  btnType: boolean = false;
  currency: any = [];
  parentId: number = 0;
  fileList: any = [];
  editCreaditor: any = {
    creditor_id: 0,
    authorization_file: "",
    creditor_name: "",
    license_no: "",
    admin_name: ""
  };
  @Watch("data.checkList", { deep: true, immediate: true })
  checkListChangeVal(newVal: any, oldVal: any) {
    if (newVal.indexOf("1") != -1) {
      this.data.collsms = 1;
    } else {
      this.data.collsms = 0;
    }
    if (newVal.indexOf("2") != -1) {
      this.data.collphone = 1;
    } else {
      this.data.collphone = 0;
    }
    if (newVal.indexOf("3") != -1) {
      this.data.collemail = 1;
    } else {
      this.data.collemail = 0;
    }
  }
  created() {
    this.editCreaditor.admin_name = getCookie("userName");
  }

  activated() {
    //
  }

  mounted() {
    let qz: string =
      process.env.NODE_ENV === "production" ? "/api/" : "/api/pt";
    // this.getzhaiwulist();
    this.data.basurl = baseURL + qz;
    // this.data.baseURL = baseURL;
    // this.getCreditorStates();
    this.getTemplateType();
    this.setheight();
    this.getCurrency();
  }
  setheight() {
    let Wheight: number | null = document.body.offsetHeight;
    let paging: any = document.getElementById("top");
    let pagingH: number = paging != null ? paging.clientHeight : 0;
    this.data.height = Wheight - 260;
    // eslint-disable-next-line no-console
    // this.data.height = 600;
  }
  //获取用户列表
  async getzhaiwulist() {
    let self: any = this;
    let params: AIlvshihanOptions["SendLetterOption"] = {
      debt_type: "Debt_type",
      creditor_states: "Creditor_states",
      lawyer_letter_send: "Lawyer_letter_send",
      logo_type: "Logo_type"
    };
    Api.SendLawyersLetter(params).then((res: any) => {
      if (!res) {
        self.$message.error("信息获取失败");
        return false;
      }
      this.data.menulist = res;
      this.data.collection_scene = res.Debt_type[0].dic_code;
    });
  }
  //重置新增债权人
  resetForm(formName: string) {
    let from: any = this.$refs[formName];
    from.resetFields();
  }
  // 地址
  setAddres(data: any) {
    this.data.addForm.adds = data;
    // eslint-disable-next-line no-console
    // console.log(this.data.addForm.adds);
  }
  // 获取债权人列表
  getTableData() {
    return new Promise(resolve => {
      Api.getTableData2().then((res: any) => {
        // res.data.forEach((item: any) => {
        //   item.audit_status =
        //     item.audit_status == "Audit_states_0"
        //       ? "待审核"
        //       : item.audit_status == "Audit_states_1"
        //       ? "未通过"
        //       : "已通过";
        // });
        this.data.tableData = res.data;
        resolve(res);
      });
    });
  }
  // 打开收款通道弹窗
  openShouKuang() {
    this.getshoukuanTableData().then(() => {
      if (this.data.shoukuanTableData.length == 0) {
        this.data.addCollectionDialogVisible = true;
      } else {
        this.data.collectionDialogVisible = true;
      }
    });
  }
  //获取收款通道
  getshoukuanTableData() {
    return new Promise(resolve => {
      Api.getshoukuanTableData().then((res: any) => {
        this.data.shoukuanTableData = res.data;
        resolve(res);
      });
    });
  }
  //获取选择债权ID
  redListenMoid(moid: number | string) {
    this.data.collid = moid;
  }
  // 控制选择债权人弹出框的显示/隐藏
  changeDialogVisible() {
    this.data.creditor_serch = "";
    this.getTableData().then(() => {
      if (this.data.tableData.length == 0) {
        this.data.addDialogVisible = true;
        this.parentId = 1;
      } else {
        this.data.dialogVisible = true;
      }
    });
  }
  // 上传证照功能
  handleRemove(file: any) {
    //删除
    file.response.data.FileName = "";
  }
  handlePictureCardPreview(file: any) {
    //打开预览
    this.data.dialogImageUrl = file.url;
    this.data.imgDialogVisible = true;
  }
  beforeAvatarUpload(file: any) {
    // 上传前预验证
    // bmp/jpg/png/jpeg/gif
    let FileExt: string = file.name.replace(/.+\./, "");
    if (
      ["bmp", "jpg", "png", "jpeg", "gif"].indexOf(FileExt.toLowerCase()) === -1
    ) {
      this.$message({
        type: "warning",
        message: "请上传后缀名为bmp/jpg/png/jpeg/gif的附件！"
      });
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 10MB!");
    }
    return isLt2M;
  }
  // 选择债权人
  chacakparams() {
    let self: any = this;
    if (!this.data.creditorType) {
      let act: any = self.data.tableData.filter((item: any) => {
        return item.id == self.data.collid;
      });
      if (self.data.collid != 0) {
        self.$message.success("选择债权人成功");
        self.selectCreditors = act[0].creditor_name;
        if (self.uploadText != "可将文件拖曳至框内上传") {
          self.nextpoxType = true;
        }
      } else {
        self.$message.warning("你未选择债权人");
      }
      self.data.dialogVisible = false;
    } else {
      const parmas: any = {
        creditor_id: this.editCreaditor.creditor_id,
        authorization_file: this.editCreaditor.authorization_file
      };
      if (parmas.authorization_file == "") {
        self.$message.warning("请上传授权委托书");
        return false;
      }
      Api.AddAuthorization(parmas).then((res: any) => {
        if (res.state) {
          self.data.creditorType = false;
          this.getTableData();
        } else {
          this.$message.warning(res.msg);
        }
      });
    }
  }
  // 上传成功钩子函数
  handleAvatarSuccess(res: any) {
    if (res.data.State == true) {
      this.data.file.url =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      this.$message.success(res.msg);
      this.data.addForm.zhenshun = this.data.file.url;
    } else {
      this.$message.warning(res.msg);
    }
  }
  // //获取状态
  // getCreditorStates() {
  //   Api.getCreditorStates("Creditor_states").then((res: any) => {
  //     this.data.menulist.Creditor_states = res.data;
  //   });
  // }
  // 新增债权人
  addParams() {
    this.data.addDialogVisible = false;
    this.parentId = 0;
  }
  //收款通道选择
  ticket() {
    let self: any = this;
    self.data.collectionDialogVisible = false;
    let act: any = self.data.shoukuanTableData.filter((item: any) => {
      return item.id == self.data.moneids;
    });
    if (self.data.moneids != 0) {
      self.$message.success("选择收款通道成功");
      self.selectTicket = act[0].payee_name;
    } else {
      self.$message.warning("你未选择收款通道");
    }
  }
  // 新增收款通道
  getAddCollection() {
    let self: any = this;
    Api.addgetmaney(this.collectList).then((res: any) => {
      if (res.state) {
        self.moneyid(res.data);
        self.getshoukuanTableData().then(() => {
          self.ticket();
        });
      } else {
        self.$message.error("添加收款通道失败");
      }
    });
    self.data.addCollectionDialogVisible = false;
  }
  //收款通道id
  moneyid(moneyid: any) {
    this.data.moneids = moneyid;
  }
  // 新增收款通道id
  addcollid(addid: any) {
    this.data.moneids = addid;
  }
  // 根据债务人类别获取下载模板所需的路径
  async getTemplateType() {
    // if (this.data.collection_scene == "Debt_type_7") {
    //   this.data.Radio = "Creditor_states_1";
    // }
    Api.getTemplateType(this.data.collection_scene, this.data.Radio, "AI").then(
      (res: any) => {
        this.data.user_code = res.data.data.use_code;
        this.data.columnTableName =
          res.data.sheet.length == 0 ? "" : res.data.sheet[0]["sheet_name"];
        this.data.columnTableNamess =
          res.data.sheet.length == 0 ? "" : res.data.sheet[1]["sheet_name"];
        this.data.templateId = res.data.data.id;
        this.data.templatePath = res.data.data.template_path;
        this.data.templateName = res.data.data.template_path.substring(
          res.data.data.template_path.lastIndexOf("/") + 1
        );
        this.data.columnName = [];
        // this.data.columnName = res.data.sheet[0].column;
        this.data.columnName =
          res.data.sheet.length == 0 ? "" : res.data.sheet[0].column;
        if (this.data.columnName.length != 0) {
          this.data.columnName.forEach((item: any) => {
            item.column_name = item.column_name.replace("（必填）*", "");
            if (item.column_name == "债务人编号") {
              item.width = "90px";
            } else if (item.column_name == "债务人企业名称 ") {
              item.width = "330px";
            } else if (item.column_name == "债务人邮箱") {
              item.width = "180px";
            } else if (item.column_name == "债务人企业负责人有效联系地址 ") {
              item.width = "530px";
            } else if (item.column_name == "债务人企业负责人邮箱") {
              item.width = "220px";
            } else {
              item.width = item.column_name.length * 16 + "px";
            }
          });
        }

        this.data.columnNamess = [];
        // this.data.columnNamess = res.data.sheet[1].column;
        this.data.columnNamess =
          res.data.sheet.length == 0 ? "" : res.data.sheet[1].column;
        if (this.data.columnNamess.length != 0) {
          let newColumnName: any = this.data.collTabless[0];
          if (newColumnName == undefined) {
            return false;
          }
          this.data.collTabless = this.data.collTabless.filter(
            (item: any, index: number) => {
              return index != 0;
            }
          );
          this.data.columnNamess.forEach((item: any) => {
            item.column_name = newColumnName[item.field_name].value;
            item.column_name = item.column_name.replace("（必填）*", "");
          });
        }
      }
    );
  }
  //下一步
  nexttip() {
    if (this.nextpoxType == false) {
      if (this.selectCreditors == "请选择债权人") {
        this.$message.warning("请选择债权人");
        return false;
      } else {
        this.$message.warning("请上传催收文件");
        return false;
      }
    }
    this.data.flag = !this.data.flag;
    this.getTemplateType();
  }
  //上一步
  gohistry() {
    this.data.flag = !this.data.flag;
  }
  //下载催收模板
  downTempaly(url: string) {
    // if (this.selectCreditors == "请选择债权人") {
    //   this.$message.warning(this.selectCreditors);
    //   return false;
    // }
    // if (this.selectTicket == "请选择收款通道") {
    //   this.$message.warning(this.selectTicket);
    //   return false;
    // }
    // if (this.data.Radio == "") {
    //   this.$message.warning("请选择债务人类别");
    //   return false;
    // }
    window.open("https://file.debteehelper.com" + url);
  }
  beforeTest(res: any) {
    this.fullscreenLoading = true;
  }
  // 上传表格校验-返回
  afterTest(res: any) {
    if (!res.state) {
      this.$notify({
        title: "文件上传失败",
        message: res.msg,
        type: "warning"
      });
      this.fullscreenLoading = false;
      return false;
    }
    this.loading = true;
    this.data.file.exlurl =
      "D:\\site\\file.debteehelper.com" +
      res.data.FileUrl +
      res.data.FileExtension;
    Api.afterTest(this.data.user_code, this.data.file.exlurl, true).then(
      (ress: any) => {
        if (ress.data == null || ress.data.length == 0) {
          this.$notify({
            title: "文件校验失败",
            message: ress.msg,
            type: "warning"
          });
          this.fullscreenLoading = false;
          return false;
        }
        this.data.failcount = {
          fail1: ress.data[0].fail_count,
          fail2:
            ress.data[1].fail_count > 0
              ? ress.data[1].fail_count - 1
              : ress.data[1].fail_count
        };
        this.data.collTable = [];
        this.data.collTabless = [];
        if (ress.data[0].row.length == 0) {
          this.$notify({
            title: "文件不能为空",
            message: "上传失败",
            type: "warning"
          });
          this.fullscreenLoading = false;
          return false;
        }
        for (var item in ress.data[0].row) {
          this.data.collTable.push(JSON.parse(ress.data[0].row[item]));
        }
        for (var items in ress.data[1].row) {
          this.data.collTabless.push(JSON.parse(ress.data[1].row[items]));
        }
        this.$notify({
          title: "文件上传成功",
          message: res.data.FileName,
          type: "success"
        });
        this.fullscreenLoading = false;
        this.uploadText = res.data.FileName;
        if (this.selectCreditors != "请选择债权人") {
          this.nextpoxType = true;
        }
      }
    );
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  // 提交委托
  async sendPlace() {
    this.$confirm("提交委托后不可修改债务信息，是否确认提交?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.fullscreenLoading = true;
        let data: any = [];
        this.data.collTabless.forEach((item: any) => {
          let data2: any = {};
          Object.keys(item).forEach((item2: any) => {
            data2[item2] = item[item2].value;
          });
          data.push(data2);
        });
        let data3: any = [];
        data.forEach((item: any) => {
          let data4: any = [];
          Object.keys(item).forEach(item2 => {
            data4.push(item[item2]);
          });
          data3.push(data4);
        });
        data3.forEach((item: any) => {
          let dd: any = {};
          dd.debtor_no = item[0];
          dd.debt_content = item.splice(1).join("╫");
          dd.is_headers = 0;
          this.data.smileData.push(dd);
        });
        //明细表 表头
        let list: any = [];
        var dss: any = {};
        this.data.columnNamess.forEach((item: any, index: number) => {
          if (index != 0) {
            list.push(item.column_name);
          }
        });
        dss.debtor_no = 0;
        dss.debt_content = list.join("╫");
        dss.is_headers = 1;
        this.data.smileData.push(dss);
        let collTablelist: any = [];
        this.data.collTable.forEach((item: any) => {
          let collTablelistss: any = {};
          Object.keys(item).forEach(item2 => {
            collTablelistss[item2] = item[item2].value;
          });
          collTablelist.push(collTablelistss);
        });
        this.data.collTablelistss = collTablelist;
        if (this.data.failcount.fail1 + this.data.failcount.fail2 > 0) {
          this.fullscreenLoading = false;
          return this.$message.warning("表格内还有错误未修改");
        }
        this.btnType = true;
        let parmas: any = {
          creditor_id: this.data.collid,
          collect_money_id: this.data.moneids,
          debt_type: this.data.collection_scene,
          send_type: this.data.send_type,
          logo_type: this.data.logo_type,
          contains_sms: this.data.collsms,
          contains_email: this.data.collemail,
          contains_phone: this.data.collphone,
          debtor_type: this.data.Radio,
          debtor: this.data.collTablelistss,
          debtor_details: this.data.smileData,
          lawyer_letter_file: this.data.file.exlurl
        };
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(parmas));
        Api.AILawyerLetterInsert(parmas).then((res: any) => {
          if (res.state) {
            this.fullscreenLoading = false;
            this.$notify({
              title: "操作成功！",
              message: "请完成支付",
              type: "success"
            });
            setTimeout(() => {
              Api.getPaySet().then((res2: any) => {
                res.data["is_postpaid"] = res2.data.is_postpaid;
                this.payinfo = res.data;
                this.payShow = true;
                this.btnType = true;
              });
            }, 1000);
          } else {
            this.fullscreenLoading = false;
            this.$notify.error({
              title: "操作失败！",
              message: "请重新尝试"
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消提交"
        });
      });
  }
  // 债务表格修改
  changeEnddate(parmas: any) {
    this.data.errorForm.val = parmas.data[parmas.item].value;
    this.editTitle =
      parmas.activeName == "first"
        ? "编辑" + this.data.columnName[parmas.index].column_name
        : "编辑" + this.data.columnNamess[parmas.index].column_name;
    if (parmas.data[parmas.item].bol == "False") {
      this.data.errorForm.msg =
        // this.data.columnName[parmas.index].column_name + "错误";
        parmas.data[parmas.item].msg;
    }
    // else {
    //   this.data.errorForm.msg = parmas.data[parmas.item].msg;
    // }
    this.data.errorForm.textNum = parmas.textindex.verify_conditions;
    this.data.errorForm.rownum = parmas.rownum;
    this.data.errorForm.texname = parmas.item;
    this.data.errorForm["type"] = parmas.type;
    this.data.errorDialogVisible = true;
  }
  // 发送后台验证
  async sendTextVal(
    val: any,
    verify: any,
    rownum: any,
    textname: any,
    colltable: any
  ) {
    Api.sendTextVal(val, verify).then((res: any) => {
      if (val == "") return this.$message.warning("请输入内容");
      if (res.state == true) {
        // eslint-disable-next-line no-console
        console.log(colltable, rownum, textname);
        colltable[rownum][textname].value = res.data;
        colltable[rownum][textname].bol = "True";
        this.$message.success("修改成功");
        this.data.failcount -= 1;
        this.data.errorDialogVisible = false;
      } else {
        this.$message.warning("请按正确格式修改");
      }
    });
  }
  //关闭支付弹窗
  payClose() {
    this.payShow = false;
    this.$router.push({
      path: "/AILawyerletter/Management"
    });
  }
  //获取币种
  getCurrency() {
    Api.getCurrency().then((res: any) => {
      this.currency = res.data;
    });
  }
  //债权人列表行选中
  creditorRowClick(row: any) {
    if (row.creditor_admin_audit_status == "") {
      return false;
    }
    this.data.collid = row.id;
  }
  //收款通道列表选中
  collectionRowClick(row: any) {
    this.data.moneids = row.id;
  }
  //打开编辑债权人信息
  openEditCreditor(row: any) {
    this.data.creditortitle = "授权委托书上传";
    this.data.creditorType = !this.data.creditorType;
    this.editCreaditor.creditor_id = row.id;
    this.editCreaditor.creditor_name = row.creditor_name;
    this.editCreaditor.license_no = row.license_no;
  }
  //图片预览
  preview(file: any) {
    let path: string =
      "https://file.debteehelper.com" +
      file.response.data.FileUrl +
      file.response.data.FileExtension;
    window.open(path);
  }
  exceed(files: any, fileList: any) {
    this.$message.warning("请先删除已上传文件");
  }
  handleChange(file: any, fileList: any) {
    this.fileList = fileList.slice(-3);
  }
  //图片上传成功
  handleAvatarSuccess2(prop: string, res: any, file: any) {
    let self: any = this;
    if (res.data.State == true) {
      self.$message.success(res.data.Msg);
      self.editCreaditor.authorization_file =
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
  }
  //上传之前
  beforeAvatarUpload2(file: any) {
    const isLt2M = file.size / 1024 / 1024 <= 50;
    if (!isLt2M) {
      this.$message.error("上传文件大小不能超过 50MB!");
    }
    return isLt2M;
  }
  //下载授权书
  upSq() {
    window.open(
      "https://file.debteehelper.com/template/授权委托书模板-新增管理员-V6.docx"
    );
  }
}
