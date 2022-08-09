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
  nextpoxType: boolean = false;
  searchTypes: any = [
    "户籍信息",
    "工商内档",
    "婚姻信息",
    "房产信息",
    "工商外档",
    "车辆信息",
    "身份信息",
    "社保信息",
    "其他类型"
  ];
  information: any = [
    "当事人姓名",
    "当事人身份证号",
    "当事人户籍地址",
    "房产具体地址",
    "公司名称",
    "当事人授权委托书",
    "法院立案通知书",
    "执行通知书",
    "法院判决",
    "法院调查令",
    "仲裁受理通知书",
    "其他资料"
  ];
  replenish: any = [
    { name: "当事人姓名", value: "", show: false },
    { name: "当事人身份证号", value: "", show: false },
    { name: "当事人户籍地址", value: "", show: false },
    { name: "房产具体地址", value: "", show: false },
    { name: "公司名称", value: "", show: false },
    { name: "当事人授权委托书", value: "", show: false },
    { name: "法院立案通知书", value: false, show: false },
    { name: "执行通知书", value: false, show: false },
    { name: "法院判决", value: false, show: false },
    { name: "法院调查令", value: false, show: false },
    { name: "仲裁受理通知书", value: false, show: false },
    { name: "其他资料", value: "", show: false }
  ];
  oldReplenish: any = [];
  data: any = {
    name: "",
    area: "",
    a_type: [],
    a_type_01: "",
    information_01: [],
    information_file: "",
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
      this.data.information_file =
        "https://file.debteehelper.com" +
        res.data.FileUrl +
        res.data.FileExtension;
      this.uploadText = res.data.FileName;
      return false;
    }
  }
  //现有资料选中事件
  handChange(val: any) {
    let a = val;
    let b = this.oldReplenish;
    if (a.length > b.length) {
      //增
      let differenceABSet = a.filter(function(val: any) {
        return b.indexOf(val) === -1;
      });
      this.replenish.forEach((item: any) => {
        if (item.name == differenceABSet[0]) {
          item.show = true;
          if (
            item.name === "法院立案通知书" ||
            item.name === "执行通知书" ||
            item.name === "法院判决" ||
            item.name === "法院调查令" ||
            item.name === "仲裁受理通知书"
          ) {
            item.value = true;
          }
        }
      });
    }
    if (a.length < b.length) {
      //减
      let differenceABSet = b.filter(function(val: any) {
        return a.indexOf(val) === -1;
      });
      this.replenish.forEach((item: any) => {
        if (item.name == differenceABSet[0]) {
          item.show = false;
          if (
            item.name === "法院立案通知书" ||
            item.name === "执行通知书" ||
            item.name === "法院判决" ||
            item.name === "法院调查令" ||
            item.name === "仲裁受理通知书"
          ) {
            item.value = false;
          }
        }
      });
    }
    this.oldReplenish = val;
  }
  emitAddress(val: any) {
    this.data.area = [val.country, val.province, val.city, val.county];
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
  //去除字符串中'['']'"'
  strReplace(str: string) {
    let sstr: string = str.replace("[", "");
    let ssstr: string = sstr.replace("]", "");
    // eslint-disable-next-line no-useless-escape
    return ssstr.replace(/\"/g, "");
  }
  //提交
  tijiao() {
    let parmas = Object.assign({}, JSON.parse(JSON.stringify(this.data)));
    let information_01: any = [];
    parmas.information_01.forEach((item: string) => {
      this.replenish.forEach((item2: any) => {
        if (item === item2.name) {
          if (typeof item2.value === "boolean") {
            let li: any = `${item} : ${item2.value ? "有" : "无"}`;
            information_01.push(li);
          } else {
            let li: any = `${item} : ${item2.value}`;
            information_01.push(li);
          }
        }
      });
    });
    if (parmas.name === "") {
      this.$message.warning("请填写当事人/公司名称");
      return false;
    }
    if (parmas.area === "") {
      this.$message.warning("请选择查档地域");
      return false;
    }
    if (parmas.a_type.length === 0) {
      this.$message.warning("请选择查档类型");
      return false;
    }
    if (parmas.information_01.length === 0) {
      this.$message.warning("请选择现有资料");
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
    parmas.information_01 = this.strReplace(JSON.stringify(information_01));
    parmas.a_type = this.strReplace(JSON.stringify(parmas.a_type));
    this.getAddressText(parmas.area)
      .then((res: any) => {
        parmas.area = res === "///" ? "" : res;
      })
      .then(() => {
        Api.CreateQueryQrchives(parmas).then((res: any) => {
          if (res.state) {
            // this.$message.success(res.msg);
            this.$message({
              message: res.msg,
              type: "success",
              duration: 10000
            });
            this.nextpoxType = true;
            this.$router.push("/servicesAdmin/services");
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
