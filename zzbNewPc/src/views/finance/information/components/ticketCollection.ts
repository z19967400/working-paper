import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance.ts";
import { Options } from "@/types/index";
import { validatePhone, validateEmall } from "@/utils/common";
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
    submitType: false,
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
        label: "收票人姓名",
        prop: "consignee_name"
      },
      {
        label: "收票人地址",
        prop: "detailed_address"
      },
      {
        label: "收票人手机",
        prop: "consignee_telephone"
      },
      {
        label: "收票人邮箱",
        prop: "consignee_email"
      }
    ],
    rules: {
      consignee_name: [
        { required: true, message: "请输入收票人姓名", trigger: "blur" },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ],
      detailed_address: [
        { required: true, message: "请输入详细地址", trigger: "blur" }
      ],
      county: [{ required: true, message: "请选择地区", trigger: "blur" }],
      consignee_telephone: [
        { required: true, validator: validatePhone, trigger: "blur" }
      ],
      consignee_email: [
        { required: true, validator: validateEmall, trigger: "blur" }
      ]
    }
  };
  options: Options["GetPaging"] = {
    page: 1,
    limit: this.$store.getters.limit
  };
  editData: Options["editTicket"] = {
    id: 0,
    consignee_name: "", //收票人姓名
    consignee_telephone: "", // 收票人电话
    consignee_email: "", // 收票人邮箱
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
    Api.ticketCollection(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //编辑
  handleEdit(data: any) {
    let self: any = this;
    Api.getTicketInfo(data.row.id).then((res: any) => {
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
    Api.ticketDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        self.$message.success(res.msg + "");
        self.init();
      } else {
        self.$message.warning(res.msg + "");
      }
    });
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
  add() {
    let self: any = this;
    self.editData.id = 0;
    self.data.visible = true;
  }
  //关闭
  close() {
    this.resetForm("ruleForm");
  }
  //确定
  submitForm(formName: string) {
    let from: any = this.$refs[formName];
    let self: any = this;
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.submitType = true;
        Api.addTicket(self.editData).then((res: any) => {
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
  //取消
  resetForm(formName: string) {
    let self: any = this;
    let from: any = self.$refs[formName];
    from.resetFields();
    self.data.visible = false;
  }
  //地区选择
  selectAddress(data: any) {
    let self: any = this;
    self.editData.country = data.county;
    self.editData.province = data.province;
    self.editData.city = data.city;
    self.editData.county = data.country;
  }
}
