import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { baseURL } from "@/utils/request";
import * as Api from "@/api/AIlvshihan";
import { validateEmall } from "@/utils/common";
import myaddres from "@/components/address/address.vue";
import comSetTwo from "./components/stepTwo.vue";
import addForms from "../../creditor/editcedrior.vue";
import { getCookie } from "@/utils/common";
@Component({
  components: {
    "my-addres": myaddres,
    comSetTwo,
    addForms
  }
})
export default class About extends Vue {
  data: any = {
    creditor_serch: "", //债权人选择搜索
    loading: false, //加载中
    flag: false, //false：第一步,true：第二步
    selectCreditors: "请选择债权人", //选择债权人
    addDialogVisible: false, //添加债权人弹窗是否显示
    creditorType: false,
    Radio: "Creditor_states_0", //债务人类别
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
      { dic_content: "企业应收账款", dic_code: "Debt_type_4" },
      { dic_content: "逾期贷款", dic_code: "Debt_type_5" }
      // { dic_content: "信用卡逾期", dic_code: "Debt_type_6" },
      // { dic_content: "保险追偿", dic_code: "Debt_type_7" },
      // { dic_content: "物业/采暖欠费", dic_code: "Debt_type_8" },
      // { dic_content: "不当得利", dic_code: "Debt_type_9" }
    ],
    menulist: [], //主页面列表信息
    collection_scene: "Debt_type_4", //债务类别
    basurl: "",
    // 获取下载模板的地址，名字
    templateName: "",
    templatePath: "",
    templateId: "",
    // 识别表命名
    columnTableName: "",
    columnTableNamess: "", //明细表命名
    columnName: [], // 债务信息识别表格标题
    columnNamess: [], // 债务明细标题表格
    creditortitle: "选择债权人", // 选择债权人弹框标题
    dialogVisible: false, //选择债权人弹框是否显示
    tableData: [], //选择债务人弹框的列表
    collid: "", // 债权人id
    uploadText: "可将文件拖曳至框内上传", //上传框文本
    file: { url: "", name: "", exlurl: "", exname: "" }, //上传内容
    failcount: 0, //错误单元的个数
    collTable: [], // 债权人识别后返回值
    collTabless: [], // 识别明细返回值
    height: 0, //第二步高度
    errorForm: { val: "", msg: "", textNum: "", rownum: "", texname: "" }, //错误单元格的内容
    errorDialogVisible: false, //修改弹框
    user_code: "",
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
    }
  };
  btnType: boolean = false;
  fullscreenLoading: boolean = false;
  nextpoxType: boolean = false;
  editTitle: string = "";
  parentId: number = 0;
  currency: any = [];
  juarantee: any = ["保证", "银行履约保函", "抵押", "质押", "留置", "无"];
  multipleVal: string[] = [];
  fileList: any = [];
  editCreaditor: any = {
    creditor_id: 0,
    authorization_file: "",
    creditor_name: "",
    license_no: "",
    admin_name: ""
  };
  confirmWay: any = [
    "付款（本金/利息/违约金）",
    "付款计划",
    "书面承诺",
    "邮件",
    "其他方式"
  ];
  //企业应收企业债务人财产线索
  property_clues: string[] = [
    "房产",
    "车辆",
    "设备",
    "货物",
    "债务人的应收账款",
    "其他资产",
    "不详"
  ];
  //企业应收个人债务人财产线索
  property_clues2: string[] = [
    "房产",
    "车辆",
    "设备",
    "货物",
    "其他资产",
    "不详"
  ];
  //预期贷款债务人财产线索
  property_clues3: string[] = [
    "房产",
    "车辆",
    "设备",
    "货物",
    "债务人的应收账款",
    "不详"
  ];
  //企业应收现有证据
  available_evidence2: string[] = [
    "合同/协议/订单",
    "发票",
    "发货及物流凭证（运单等）、收货凭证",
    "对账凭证、付款计划书、付款承诺书",
    "付款记录、催款通知记录",
    "电子证据（邮件、微信、录音录像等）",
    "判决、仲裁、公证等司法文书"
  ];
  //预期贷款现有证据
  available_evidence3: string[] = [
    "合同/贷款凭证/协议书/基于借贷关系产生的申请书",
    "担保手续",
    "贷款保证的物资和财产的凭证",
    "还款付息凭证、还款承诺书或计划书",
    "电子证据（邮件、微信、录音录像等）",
    "判决、冲裁、公证等司法文书"
  ];
  entrusted_matters2: string[] = [
    "全案委托",
    "财产保全",
    "仲裁",
    "一审",
    "二审",
    "强制执行",
    "破产清算/重组",
    "再审"
  ];
  get guarantee_typeTips() {
    let val: string = "";
    switch (this.data.errorForm.val) {
      case "保证":
        val = "保证-保证人与债权人约定，债务人不付款时，保证人代为偿还债务";
        break;
      case "银行履约保函":
        val =
          "银行履约保函-乙方通过银行向甲方提供的保证认真履行合同的一种经济担保";
        break;
      case "抵押":
        val = "抵押-抵押指用房屋、车辆等财产提供担保，但财产不会交付给债权人";
        break;
      case "质押":
        val =
          "质押-质押指用车辆、股权等财产提供担保切财产交付给债权人或对财产权利进行出质登记";
        break;
      case "留置":
        val = "留置-债权人因合同关系占有债务人的财务";
        break;
      case "无":
        val = "相当于应收账款没有担保";
        break;
      default:
        break;
    }
    return val;
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
    // this.getCreditorStates();
    this.getTemplateType();
    this.setheight();
    this.getCurrency();
  }
  //获取币种
  getCurrency() {
    Api.getCurrency().then((res: any) => {
      this.currency = res.data;
    });
  }
  // 控制选择债权人弹出框的显示/隐藏
  changeDialogVisible() {
    this.data.creditor_serch = "";
    this.getTableData().then(() => {
      if (this.data.tableData.length == 0) {
        this.data.addDialogVisible = false;
        this.parentId = 1;
      } else {
        this.data.dialogVisible = true;
      }
    });
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
  // 根据债务人类别获取下载模板所需的路径
  async getTemplateType() {
    if (this.data.collection_scene == "Debt_type_7") {
      this.data.Radio = "Creditor_states_1";
    }
    Api.getTemplateType(
      this.data.collection_scene,
      this.data.Radio,
      "Case"
    ).then((res: any) => {
      this.data.user_code = res.data.data.use_code;
      this.data.columnTableName =
        res.data.sheet.length == 0 ? "" : res.data.sheet[0]["sheet_name"];
      // this.data.columnTableNamess =
      //   res.data.sheet.length == 0 ? "" : res.data.sheet[1]["sheet_name"];
      this.data.templateId = res.data.data.id;
      this.data.templatePath = res.data.data.template_path;
      this.data.templateName = res.data.data.template_path.substring(
        res.data.data.template_path.lastIndexOf("/") + 1
      );
      this.data.columnName = [];
      // this.data.columnName =
      //   res.data.sheet.length == 0 ? "" : res.data.sheet[0].column;
      if (res.data.sheet[0].column.length != 0) {
        this.data.columnName = this.sheetHandle(res.data.sheet[0].column);
      }
      // eslint-disable-next-line no-console
      // console.log(this.data.columnName);

      // this.data.columnNamess = [];
      // this.data.columnNamess = res.data.sheet[1].column;
      // this.data.columnNamess =
      //   res.data.sheet.length == 0 ? "" : res.data.sheet[1].column;
      // if (this.data.columnNamess.length != 0) {
      //   this.data.columnNamess.forEach((item: any) => {
      //     item.column_name = item.column_name.replace("（必填）*", "");
      //   });
      // }
    });
  }
  //表头数组处理方法
  sheetHandle(arr: any) {
    let arr2: any = new Array();
    arr.forEach((item: any, index: number) => {
      item.column_name = item.column_name.replace("（必填）*", "");
      if (index > 0 && item.column_name != arr[index - 1].column_name) {
        arr2.push(item);
      }
    });
    return arr2;
  }
  //获取用户列表
  async getzhaiwulist() {
    let self: any = this;
    let params: any = {
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
  //获取状态
  getCreditorStates() {
    Api.getCreditorStates("Creditor_states").then((res: any) => {
      this.data.menulist.Creditor_states = res.data;
    });
  }
  //下载催收模板
  downTempaly(url: string) {
    // if (this.data.selectCreditors == "请选择债权人") {
    //   this.$message.warning(this.data.selectCreditors);
    //   return false;
    // }
    window.open("https://file.debteehelper.com" + url);
  }
  // 选择债权人
  chacakparams() {
    let self: any = this;
    if (!this.data.creditorType) {
      self.data.dialogVisible = false;
      let act: any = self.data.tableData.filter((item: any) => {
        return item.id == self.data.collid;
      });
      if (self.data.collid != 0) {
        self.$message.success("选择债权人成功");
        self.data.selectCreditors = act[0].creditor_name;
        if (self.data.uploadText != "可将文件拖曳至框内上传") {
          self.nextpoxType = true;
        }
      } else {
        self.$message.warning("你未选择债权人");
      }
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
  beforeTest(res: any) {
    this.fullscreenLoading = true;
  }
  // 上传表格校验-返回
  afterTest(res: any) {
    if (res.msg != "操作成功") {
      this.$notify({
        title: "文件上传失败",
        message: res.msg,
        type: "warning"
      });
      this.fullscreenLoading = false;
      return false;
    }
    this.data.loading = true;
    this.data.file.exlurl =
      "D:\\site\\file.debteehelper.com" +
      res.data.FileUrl +
      res.data.FileExtension;
    Api.afterTest(this.data.user_code, this.data.file.exlurl, true).then(
      (ress: any) => {
        if (ress.data.length == 0) {
          this.$notify({
            title: "文件校验失败",
            message: ress.msg,
            type: "warning"
          });
          this.fullscreenLoading = false;
          return false;
        }
        this.data.failcount = ress.fail_count;
        this.data.collTable = [];
        // this.data.collTabless = [];
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
          let row: any = this.strhandle(ress.data[0].row[item]);
          this.data.collTable.push(row);
        }
        // for (var items in ress.data[1].row) {
        //   this.data.collTabless.push(JSON.parse(ress.data[1].row[items]));
        // }
        this.$notify({
          title: "文件上传成功",
          message: res.data.FileName,
          type: "success"
        });
        this.fullscreenLoading = false;
        this.data.uploadText = res.data.FileName;
        if (this.data.selectCreditors != "请选择债权人") {
          this.nextpoxType = true;
        }
      }
    );
    setTimeout(() => {
      this.data.loading = false;
    }, 1000);
  }
  //字符串处理
  strhandle(str: string) {
    let str2: any = str.substring(1, str.lastIndexOf("}"));
    let str3: any = str2.split("},");
    let newObj: any = new Object();
    let newObj2: any = new Object();
    str3.forEach((item: any, index: number) => {
      if (index == str3.length - 1) {
        item = "{" + item + "}";
      } else {
        item = "{" + item + "}}";
      }
      let objName: string = item.match(/{"(\S*)":{/)[1];
      let objContent: any = JSON.parse(item)[objName];
      newObj[objName] = objContent;
      if (objContent.value != null && objContent.value != "") {
        newObj2[objName] += objContent.value + ",";
      }
    });
    Object.keys(newObj).forEach((key: any) => {
      if (newObj2[key] != undefined) {
        let newObj2Val: string = newObj2[key].replace(/undefined/, "");
        newObj[key].value = newObj2Val.substring(
          0,
          newObj2Val.lastIndexOf(",")
        );
      }
    });
    return newObj;
  }
  // 上传前预验证
  beforeAvatarUpload(file: any) {
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
  //新增债权人上传证照成功函数
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
  // 地址
  setAddres(data: any) {
    this.data.addForm.adds = data;
    // eslint-disable-next-line no-console
    // console.log(this.data.addForm.adds);
  }
  // 新增债权人
  addParams() {
    this.data.addDialogVisible = false;
    this.parentId = 0;
  }
  //重置新增债权人表单验证
  resetForm(formName: string) {
    let from: any = this.$refs[formName];
    // from.resetFields();
  }
  setheight() {
    let Wheight: number | null = document.body.offsetHeight;
    // let paging: any = document.getElementById("top");
    // let pagingH: number = paging != null ? paging.clientHeight : 0;
    this.data.height = Wheight - 260;
  }
  //下一步
  nexttip() {
    if (this.nextpoxType == false) {
      if (this.data.selectCreditors == "请选择债权人") {
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
  // 债务表格修改
  changeEnddate(parmas: any) {
    this.multipleVal = [];
    this.$forceUpdate();
    this.data.errorForm.val = parmas.data[parmas.item].value;
    this.editTitle =
      parmas.activeName == "first"
        ? "编辑" + this.data.columnName[parmas.index].column_name
        : "编辑" + this.data.columnNamess[parmas.index].column_name;
    this.data.errorForm.textNum = parmas.textindex.verify_conditions;
    this.data.errorForm.rownum = parmas.rownum;
    this.data.errorForm.texname = parmas.item;
    if (
      parmas.item == "property_clues" ||
      parmas.item == "available_evidence" ||
      parmas.item == "entrusted_matters"
    ) {
      this.multipleVal =
        this.data.errorForm.val == "" ? [] : this.data.errorForm.val.split(",");
      this.data.errorDialogVisible = true;
    } else {
      this.data.errorDialogVisible = true;
    }
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
  //提交委托
  sendPlace() {
    this.$confirm("提交委托后不可修改债务信息，是否确认提交?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        // this.btnType = false;
        if (this.data.failcount > 0) {
          return this.$message.warning("表格内还有错误未修改");
        }
        let collTablelist: any = [];
        this.data.collTable.forEach((item: any) => {
          let collTablelistss: any = {};
          Object.keys(item).forEach(item2 => {
            collTablelistss[item2] = item[item2].value;
          });
          collTablelist.push(collTablelistss);
        });
        this.btnType = true;
        let parmas: any = {
          creditor_id: this.data.collid, //债权人id
          collection_scene: this.data.collection_scene, //债务类别
          debtor_type: this.data.Radio, //债务人类别
          debtor: collTablelist //债务人 对应上传表格数据
        };
        Api.establishCase(parmas).then((res: any) => {
          if (res.state) {
            this.fullscreenLoading = false;
            this.$notify({
              title: "操作成功！",
              message: "案件创建完成",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({
                path: "/LawyerLawUrging/caseAdmin"
              });
            }, 1000);
          } else {
            this.fullscreenLoading = false;
            this.$notify.error({
              title: "操作失败！",
              message: "请刷新重试"
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
  //债权人列表行选中
  creditorRowClick(row: any) {
    if (row.creditor_admin_audit_status == "") {
      return false;
    }
    this.data.collid = row.id;
  }
  multipleSelect(e: any) {
    let cotent: string = "";
    e.forEach((item: any) => {
      cotent += item + ",";
    });
    this.data.errorForm.val = cotent.substring(0, cotent.lastIndexOf(","));
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
  //打开编辑债权人信息
  openEditCreditor(row: any) {
    this.data.creditortitle = "授权委托书上传";
    this.data.creditorType = !this.data.creditorType;
    this.editCreaditor.creditor_id = row.id;
    this.editCreaditor.creditor_name = row.creditor_name;
    this.editCreaditor.license_no = row.license_no;
  }
}
