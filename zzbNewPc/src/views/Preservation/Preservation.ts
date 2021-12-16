import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import adress from "@/components/address/address.vue";
import { baseURL } from "@/utils/request";
import * as Api from "@/api/services";
@Component({
  components: {
    adress
  }
})
export default class About extends Vue {
  basurl: string = "";
  fullscreenLoading: Boolean = false;
  uploadText: string = "可拖拽至框内上传,文件小于50M,仅支持zip/rar/7z格式";
  uploadText2: string = "可拖拽至框内上传,文件小于50M,仅支持zip/rar/7z格式";
  nextpoxType: boolean = false;
  evidence: any = [
    "合同/协议/订单",
    "发票",
    "发货及物流凭证（运单等）、收货凭证",
    "对账凭证、付款计划书、付款承诺书",
    "付款记录、催款通知记录",
    "电子证据（邮件、微信、录音录像等）",
    "判决、仲裁、公证等司法文书"
  ];
  property: any = [
    "当事人姓名",
    "当事人身份证号",
    "当事人户籍地址",
    "房产具体地址",
    "公司名称",
    "法院立案通知书",
    "执行通知书",
    "法院判决",
    "法院调查令",
    "仲裁受理通知书",
    "其他资料"
  ];
  data: any = {
    applicant: "",
    respondent: "",
    seat_of_court: "",
    application_amount: "",
    evidence_01: [],
    evidence_02: "",
    property_clues: [],
    property_clues_explain: "",
    property_clues_file: "",
    evidence_file: "",
    case_profiles: "",
    contacts_name: "",
    contacts_telphone: "",
    contacts_email: "",
    member_remarks: ""
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
    this.basurl = baseURL + qz;
  }
  beforeTest(file: any) {
    let type = file.name.substring(file.name.lastIndexOf(".") + 1);
    const isJPG = type === "zip" || type === "rar" || type === "7z";
    const isLt2M = file.size / 1024 / 1024 < 50;

    if (!isJPG) {
      this.$message.error("上传压缩包文件只能是 zip/rar/7z 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传压缩包文件大小不能超过 50MB!");
    }
    return isJPG && isLt2M;
  }
  // 上传表格校验-返回
  afterTest(res: any) {
    if (!res.data.State) {
      this.$notify({
        title: "文件上传失败",
        message: res.data.Msg,
        type: "warning"
      });
      this.fullscreenLoading = false;
      return false;
    } else {
      this.$notify({
        title: "文件上传成功",
        message: res.data.Msg,
        type: "success"
      });
      this.fullscreenLoading = false;
      this.data.property_clues_file =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      this.uploadText = res.data.FileName;
      return false;
    }
  }
  afterTest2(res: any) {
    if (!res.data.State) {
      this.$notify({
        title: "文件上传失败",
        message: res.data.Msg,
        type: "warning"
      });
      this.fullscreenLoading = false;
      return false;
    } else {
      this.$notify({
        title: "文件上传成功",
        message: res.data.Msg,
        type: "success"
      });
      this.fullscreenLoading = false;
      this.data.file2 =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      this.uploadText2 = res.data.FileName;
      return false;
    }
  }
  emitAddress(val: any) {
    this.data.seat_of_court = [val.country, val.province, val.city, val.county];
  }
  //获取地区iD文本值
  getAddressText(val: any) {
    return new Promise((resolve: any, reject: any) => {
      let text: string = "";
      let parmas: any = {
        country_id: val[0],
        province_id: val[1],
        city_id: val[2],
        county_id: val[3]
      };
      Api.GetAddressDetails(parmas).then((res: any) => {
        text = `${res.data.country}/${res.data.province}/${res.data.city}/${res.data.county}`;
        resolve(text);
      });
    });
  }
  //去除字符串中'['']'
  strReplace(str: string) {
    let sstr: string = str.replace("[", "");
    let ssstr: string = sstr.replace("]", "");
    // eslint-disable-next-line no-useless-escape
    return ssstr.replace(/\"/g, "");
  }
  //提交
  tijiao() {
    let parmas = Object.assign({}, this.data);
    parmas.evidence_01 = this.strReplace(JSON.stringify(parmas.evidence_01));
    parmas.property_clues = this.strReplace(
      JSON.stringify(parmas.property_clues)
    );
    if (parmas.seat_of_court === "") {
      this.$message.warning("清选择管辖法院所在地");
      return false;
    }
    if (parmas.applicant === "") {
      this.$message.warning("清填写财产保全申请人");
      return false;
    }
    if (parmas.respondent === "") {
      this.$message.warning("清填写财产保全被申请人");
      return false;
    }
    if (parmas.application_amount === "") {
      this.$message.warning("清填写保全金额");
      return false;
    }
    if (parmas.evidence_01.length === 0) {
      this.$message.warning("请选择现有证据");
      return false;
    }
    if (parmas.contacts_name === "") {
      this.$message.warning("请填写联系人");
      return false;
    }
    if (parmas.contacts_telphone === "") {
      this.$message.warning("请填写联系人手机号");
      return false;
    }
    if (parmas.contacts_email === "") {
      this.$message.warning("请填写联系人邮箱");
      return false;
    }
    this.getAddressText(parmas.seat_of_court)
      .then((res: any) => {
        parmas.seat_of_court = res;
      })
      .then(() => {
        Api.CreatePreservationInsurance(parmas).then((res: any) => {
          if (res.state) {
            // this.$message.success(res.msg);
            this.$message({
              message: res.msg,
              type: "success",
              duration: 10000
            });
            this.nextpoxType = true;
            this.$router.push("/servicesAdmin/services3");
          } else {
            // this.$message.warning(res.msg);
            this.$message({
              message: res.msg,
              type: "warning",
              duration: 10000
            });
          }
        });
      });
  }
}
