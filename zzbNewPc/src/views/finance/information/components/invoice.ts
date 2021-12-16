import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance.ts";
import { Options } from "@/types/index";
import { validatePhone, objClone } from "@/utils/common";
import {
  comselect,
  comtable,
  comOperation,
  comPaging,
  comAddress
} from "@/components/index";
@Component({
  components: {
    comselect,
    comtable,
    comOperation,
    comPaging,
    comAddress
  }
})
export default class About extends Vue {
  data: any = {
    loading: false,
    visible: false,
    list: [],
    select: {},
    totalize: 0,
    options: [
      {
        value: "job_number",
        label: "工号"
      },
      {
        value: "real_name",
        label: "姓名"
      },
      {
        value: "phone_no",
        label: "手机号"
      }
    ],
    dataType: [
      {
        label: "发票抬头",
        prop: "invoice_title"
      },
      {
        label: "纳税人识别号",
        prop: "tax_number"
      },
      {
        label: "开户银行",
        prop: "bank_name"
      },
      {
        label: "详细地址",
        prop: "detailed_address"
      },
      {
        label: "银行电话",
        prop: "bank_telephone"
      },
      {
        label: "发票类型",
        prop: "invoice_title_type_name"
      }
    ],
    rules: {
      invoice_type: [
        { required: true, message: "请选择发票类型", trigger: "change" }
      ],
      invoice_title_type: [
        { required: true, message: "请选择发票抬头类型", trigger: "change" }
      ],
      invoice_title: [
        { required: true, message: "请输入发票抬头", trigger: "blur" }
      ],
      tax_number: [
        { required: true, message: "请输入纳税人识别号", trigger: "blur" }
      ],
      bank_name: [
        { required: true, message: "请输入开户银行", trigger: "blur" }
      ],
      bank_account: [
        { required: true, message: "请输入银行账号", trigger: "blur" }
      ],
      bank_telephone: [
        { required: true, validator: validatePhone, trigger: "blur" }
      ],
      detailed_address: [
        { required: true, message: "请输入详细地址", trigger: "blur" }
      ],
      county: [{ required: true, message: "请选择地区", trigger: "blur" }]
    }
  };
  options: Options["GetPaging"] = {
    page: 1,
    limit: this.$store.getters.limit
  };
  editData: Options["invoiceEdit"] = {
    id: 0,
    invoice_type: "", // 发票类型
    invoice_title_type: "", // 发票抬头类型
    invoice_title: "", // 发票抬头
    tax_number: "", // 纳税人识别号
    invoice_tax_rate: "", // 发票税率
    bank_name: "", // 开户银行
    bank_account: "", // 银行账号
    bank_telephone: "", // 银行电话
    country: "", // 国家
    province: "", // 省份
    city: "", // 城市
    county: "", // 区/县
    detailed_address: "", // 详细地址
    back_remarks: "" // 后台备注
  };
  region: string = "";
  created() {
    //
  }

  activated() {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    this.getList(params);
  }
  //获取数据
  getList(params: Options["GetPaging"]) {
    let data: any = this.data;
    data.loading = true;
    Api.getInformation(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //编辑
  handleEdit(data: any) {
    let self: any = this;
    Api.getInvoiceInfo(data.row.id).then((res: any) => {
      Object.keys(self.editData).forEach((key: string) => {
        self.editData[key] = res.data[key];
      });
      self.region =
        res.data.country_name +
        "/" +
        res.data.province_name +
        "/" +
        res.data.city_name +
        "/" +
        res.data.county_name;
    });
    self.data.visible = true;
  }
  //删除
  handleDelete(data: any) {
    let self: any = this;
    Api.invoiceDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        self.$message.success(res.msg + "");
        self.init();
      } else {
        self.$message.warning(res.msg + "");
      }
    });
  }
  //添加
  add() {
    let self: any = this;
    self.editData.id = 0;
    self.data.visible = true;
  }
  //搜索
  search(data: any) {
    let self: any = this;
    self.data.loading = true;
    self.options.page = 1;
    let params: any = Object.assign({}, self.options);
    data.forEach((item: any) => {
      let name: string = item.label;
      params[name] = item.value;
    });
    self.data.select = params;
    this.getList(params);
  }
  //清除搜索项
  clearSelection(data: any) {
    let self: any = this;
    self.data.select = {};
    this.init();
  }
  //分页
  watchChange(index: number) {
    let self: any = this;
    let params: any =
      JSON.stringify(self.data.select) == "{}"
        ? self.options
        : self.data.select;
    params.page = index;
    self.init();
  }
  //关闭
  close() {
    let self: any = this;
    self.resetForm("ruleForm");
  }
  //取消
  resetForm(formName: string) {
    let self: any = this;
    let from: any = self.$refs[formName];
    from.resetFields();
    self.data.visible = false;
  }
  //确定
  submitForm(formName: string) {
    let from: any = this.$refs[formName];
    let self: any = this;
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.submitType = true;
        Api.invoiceEdit(self.editData).then((res: any) => {
          if (res.data == 1) {
            self.$message.success(res.msg);
            setTimeout(() => {
              self.data.submitType = false;
              self.data.visible = false;
              from.resetFields();
              self.init();
            }, 1000);
          } else {
            self.$message.warning(res.msg);
            self.data.submitType = false;
          }
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("error submit!!");
        return false;
      }
    });
  }
  //地址选择反馈
  selectAddress(data: any) {
    let self: any = this;
    self.editData.country = data.county;
    self.editData.province = data.province;
    self.editData.city = data.city;
    self.editData.county = data.country;
  }
}
