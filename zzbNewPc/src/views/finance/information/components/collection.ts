import { Component, Vue, Watch } from "vue-property-decorator";
import * as Api from "@/api/Finance.ts";
import { Options } from "@/types/index";
import { validatePhone, validateEmall } from "@/utils/common";
import {
  comselect,
  comtable,
  comOperation,
  comPaging
} from "@/components/index";
@Component({
  components: {
    comselect,
    comtable,
    comOperation,
    comPaging
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
        value: "payment_channel_name",
        label: "收款通道名称"
      }
    ],
    dataType: [
      {
        label: "收款通道名称",
        prop: "payment_channel_name"
      },
      {
        label: "联系人",
        prop: "contacts_name"
      },
      {
        label: "联系电话",
        prop: "contacts_phone"
      },
      {
        label: "企业支付宝",
        prop: "alipay_account"
      },
      {
        label: "账户名称",
        prop: "payee_name"
      },
      {
        label: "收款银行",
        prop: "bank_name"
      },
      {
        label: "收款账号",
        prop: "bank_account"
      },
      {
        label: "创建人",
        prop: "create_name"
      },
      {
        label: "创建时间",
        prop: "create_time"
      }
    ],
    rules: {
      payment_channel_name: [
        { required: true, message: "请输入收款通道名称", trigger: "blur" },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ],
      contacts_name: [
        { required: true, message: "请输入联系人", trigger: "blur" },
        { max: 20, message: "长度不能超过10个字符", trigger: "blur" }
      ],
      contacts_phone: [
        { required: true, validator: validatePhone, trigger: "blur" }
      ],
      contacts_email: [
        { required: true, validator: validateEmall, trigger: "blur" }
      ],
      alipay_account: [
        { required: true, message: "请输入账户名称", trigger: "blur" },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ],
      payee_name: [
        { required: true, message: "请输入收款账号", trigger: "blur" },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ],
      bank_name: [
        { required: true, message: "请输入收款银行", trigger: "blur" }
      ],
      bank_account: [
        { required: true, message: "请输入企业支付宝", trigger: "blur" }
      ],
      pay_remarks: [
        { required: true, message: "请输入付款备注", trigger: "blur" }
      ]
    }
  };
  options: any = {
    // page: 1,
    // limit: this.$store.getters.limit
    payment_channel_name: ""
  };
  editData: Options["editCollection"] = {
    id: 0,
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
    Api.getCollection(params).then((res: any) => {
      data.loading = false;
      data.list = res.data;
      data.totalize = res.count;
    });
  }
  //编辑
  handleEdit(data: any) {
    let self: any = this;
    Api.getCollectionInfo(data.row.id).then((res: any) => {
      Object.keys(self.editData).forEach((key: string) => {
        self.editData[key] = res.data[key];
      });
    });
    this.data.visible = true;
  }
  //删除
  handleDelete(data: any) {
    Api.collectionDelete(data.row.id).then((res: any) => {
      if (res.data != 0) {
        this.$message.success(res.msg + "");
        this.init();
      } else {
        this.$message.warning(res.msg + "");
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
  //添加
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
    let self: any = this;
    let from: any = self.$refs[formName];
    from.validate((valid: Boolean) => {
      if (valid) {
        self.data.submitType = true;
        Api.addCollection(self.editData).then((res: any) => {
          if (res.state) {
            self.$message.success(res.msg + "");
            setTimeout(() => {
              self.data.submitType = false;
              self.data.visible = false;
              from.resetFields();
              self.init();
            }, 1000);
          } else {
            self.$message.warning(res.msg + "");
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
}
