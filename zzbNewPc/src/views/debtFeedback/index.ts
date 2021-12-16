import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
// import {  } from "@/components" // 组件
import * as Api from "@/api/layout";
import { baseURL } from "@/utils/request";
declare var ip: any;
@Component({})
export default class About extends Vue {
  // Getter
  // @Getter index.author

  // Action
  @Action GET_DATA_ASYN: any;

  // data
  data: any = {
    id: 0,
    ip: "",
    btnType: false,
    form: {
      phone: "",
      code: ""
    },
    dialogFormVisible: false,
    formLabelWidth: "60px",
    number: "123",
    activeName: "first",
    baseURL: "",
    type: 0,
    debtInfo: [
      {
        title: "债权人信息",
        list: [
          {
            lebel: "债权人姓名",
            value: "默认债权人姓名",
            prop: "creditor_name"
          },
          {
            lebel: "债权人电话",
            value: "默认债权人电话",
            prop: "creditor_telphone"
          },
          {
            lebel: "债权人邮箱",
            value: "默认债权人邮箱",
            prop: "creditor_email"
          }
        ]
      },
      {
        title: "债务人信息",
        list: [
          {
            lebel: "债务人",
            value: "默认企业名称",
            prop: "debtor_name"
          },
          {
            lebel: "负责人名称",
            value: "默认负责人名称",
            prop: "contact_person"
          },
          {
            lebel: "债务人电话",
            value: "默认债务人电话",
            prop: "phone_number"
          }
        ]
      },
      {
        title: "债务详情",
        list: [
          {
            lebel: "债务类型",
            value: "默认债务类型",
            prop: "entrust_type_name"
          },
          {
            lebel: "债务本金",
            value: "默认债务本金",
            prop: "arrears_principal"
          },
          {
            lebel: "违约金/利息/滞纳金",
            value: "默认违约金/利息/滞纳金",
            prop: "arrears_interest"
          }
        ]
      }
    ],
    objection: 1,
    checkList: [],
    feedBack: {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    },
    remarks: "",
    Payment: [
      { lebel: "联系人", value: "默认联系人", prop: "contacts_name" },
      { lebel: "联系电话", value: "默认联系电话", prop: "contacts_phone" },
      { lebel: "电子邮箱", value: "默认电子邮箱", prop: "contacts_email" },
      { lebel: "账户名称", value: "默认账户名称", prop: "payee_name" },
      { lebel: "收款账户", value: "默认收款账户", prop: "bank_account" },
      { lebel: "收款银行", value: "默认收款银行", prop: "bank_name" },
      { lebel: "企业支付宝", value: "默认企业支付宝", prop: "alipay_account" },
      { lebel: "付款备注", value: "pay_remarks", prop: "contacts_name" }
    ],
    details: [],
    tabHeaders: [],
    headerLabel: [],
    filList: []
  };

  created() {
    //
  }

  activated() {
    //
  }
  mounted() {
    let qz: string =
      process.env.NODE_ENV === "production" ? "/api/" : "/api/pt";
    this.data.baseURL = baseURL + qz + "/Upload/UploadImage?type=0";
    this.data.id = this.$route.params.id;
    this.data.ip = ip;
    this.init();
  }

  // 初始化函数
  init() {
    // this.data.dialogFormVisible = true;
    this.getInfo(this.data.id);
  }
  //获取详情
  getInfo(id: number) {
    Api.getDebtFeadback(id).then((res: any) => {
      this.data.type = res.data.type;
      this.data.debtInfo.forEach((item: any) => {
        item.list.forEach((item2: any) => {
          item2.value = res.data[item2.prop];
        });
      });
      this.data.Payment.forEach((item: any) => {
        item.value = res.collect_money[item.prop];
      });
      if (res.details.length != 0) {
        let header: any = res.details.filter((item: any) => {
          return item.is_headers == 1;
        });
        let props: any = res.details.filter((item: any) => {
          return item.is_headers != 1;
        });
        this.data.headerLabel = header[0].debt_content.split(",");
        this.data.headerLabel.forEach((item: any) => {
          let data: any = {
            prop: item,
            label: item
          };
          this.data.tabHeaders.push(data);
        });
        props.forEach((item: any, index: number) => {
          let data: any = {};
          let list: any = item.debt_content.split(",");
          list.forEach((item2: any, index2: number) => {
            data[this.data.headerLabel[index2]] = item2;
          });
          this.data.details.push(data);
        });
      }
    });
  }
  //获取手机验证吗
  getCode() {
    //
  }
  //确认并提交
  Submit() {
    if (this.data.checkList.length == 0) {
      this.$message.warning("请至少勾选一条异议或条件");
      return false;
    }
    let dissent: any = "";
    this.data.checkList.forEach((item: any) => {
      dissent += item + ",";
    });
    let addData: any = {
      debtor_id: this.data.id, // 债务人id
      member_remarks: this.data.remarks, // 用户备注
      member_ip: this.data.ip, // 用户ip
      is_dissent: this.data.objection, // 是否有异议  0：无 1：有
      dissent_content: dissent.substring(0, dissent.length - 1), // 异议内容 逗号分隔
      data: this.data.filList
    };
    Api.addFeadBack(addData).then((res: any) => {
      if (res.data != 0) {
        this.$message.success("提交成功");
        this.data.btnType = true;
      } else {
        this.$message.warning("提交失败");
      }
    });
  }
  //标签切换
  handleClick(tab: any, event: any) {
    //
  }
  //有无异议
  choice(val: number) {
    this.data.checkList = [];
  }
  //图片删除
  handleRemove(file: any) {
    // eslint-disable-next-line no-console
    console.log(file);
  }
  //图片预览
  handlePictureCardPreview(file: any) {
    this.data.feedBack.dialogImageUrl = file.url;
    this.data.feedBack.dialogVisible = true;
  }
  //图片下载
  handleDownload(file: any) {
    window.location.href =
      "https://file.zhaizhubang.net/" +
      file.response.data.FileUrl +
      file.response.data.FileExtension;
  }
  handleAvatarSuccess(response: any, file: any, fileList: any) {
    // eslint-disable-next-line no-console
    console.log(fileList);
    fileList.forEach((item: any) => {
      let data: any = {
        file_name: item.name,
        file_path:
          "https://file.zhaizhubang.net/" +
          file.response.data.FileUrl +
          file.response.data.FileExtension,
        file_size: item.size
      };
      this.data.filList.push(data);
    });
  }
}
