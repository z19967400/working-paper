import { Component, Vue, Watch } from "vue-property-decorator";
import { LayoutData } from "@/types/views/layout.interface";
import { Action } from "vuex-class";
import { Menu } from "@/components"; // 组件
import { verifyPhone, validateEmall } from "@/utils/common";
import * as Api from "@/api/layout";
const validPassword: any = (rule: any, value: any, callback: any) => {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
  if (!reg.test(value)) {
    callback(new Error("密码必须是由8-12位字母+数字组合"));
  } else {
    callback();
  }
};
@Component({
  components: {
    Menu
  }
})
export default class Layout extends Vue {
  //
  @Action
  LOGIN_OUT: any;
  //路由监听
  @Watch("$route")
  onChangeValue(newVule: any, oldVule: any) {
    //isTag是路由里定义的是否显示标签的函数，是个布尔值
    if (newVule.meta.isTag == false) {
      //为否就不添加到标签
      return false;
    }
    //标签的对象格式
    let tag: any = {
      name: newVule.meta.title, //名称
      path: newVule.path, //路径
      type: "info", //样式，此时为无色白底，请看样式表
      active: true, //是否当前页
      closable: true //是否可关闭，只有首页是无法关闭的
    };
    //判断此路由是否已经存在于标签
    let includes: any = this.data.tags.filter((item: any) => {
      return tag.name.includes(item.name);
    });
    //未存在则添加
    if (includes.length == 0) {
      if (this.data.tags.length != 0) {
        this.data.tags.forEach((item: any) => {
          item.active = false;
        });
      }
      this.data.tags.push(tag);
      //已存在则选中
    } else {
      this.data.tags.forEach((item: any) => {
        if (item.name == newVule.meta.title) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    }
    //本地会话备份，防止刷新丢失
    sessionStorage.setItem("tags", JSON.stringify(this.data.tags));
  }
  //头部标签页数据监听
  @Watch("data.tags")
  onChangeTags(newValue: any, oldValue: any) {
    let width: number = newValue.length * 120 + 1;
    let tagsBox: any = this.$refs.tagsBox;
    let headerTag: any = this.$refs.headerTag;
    let headerTagWidth: number = headerTag.getBoundingClientRect().width;
    tagsBox.style.width = width + "px";
    if (width > headerTagWidth) {
      this.left = (width - headerTagWidth) * -1;
    } else {
      this.left = 0;
    }
  }
  // data
  data: LayoutData = {
    customerVisible: false,
    customerVisible2: false,
    pageName: "layout",
    fullscreenLoading: false,
    tags: [
      {
        name: "首页",
        path: "/",
        type: "info",
        active: true,
        closable: false
      }
    ]
  };
  left: number = 0;
  right: boolean = false;
  openType: boolean = false;
  admin_name: string = "";
  form: any = {
    account_name: "",
    phone_number: "",
    email: "",
    update_password: "0",
    password: "",
    password_01: "",
    password_02: ""
  };
  validPassword2: any = (rule: any, value: any, callback: any) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
    if (!reg.test(value)) {
      callback(new Error("密码必须是由8-12位字母+数字组合"));
    } else if (value !== this.form.password_01) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
  rules: any = {
    account_name: [
      { required: true, message: "请输入登录名", trigger: "blur" },
      { validator: this.VerifyAccountName, trigger: "blur" }
    ],
    phone_number: [
      { required: true, message: "请输入手机号码", trigger: "blur" },
      { validator: this.VerifyPhoneNumber, trigger: "blur" }
    ],
    email: [
      { required: true, message: "请输入电子邮箱", trigger: "blur" },
      { validator: validateEmall, trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入原密码", trigger: "blur" }
      // { validator: validPassword, trigger: "blur" }
    ],
    password_01: [
      { required: true, message: "请输入新密码", trigger: "blur" },
      { validator: validPassword, trigger: "blur" }
    ],
    password_02: [
      { required: true, message: "请再次输入新密码", trigger: "blur" },
      { validator: this.validPassword2, trigger: "blur" }
    ]
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let tags: string | null = sessionStorage.getItem("tags");
    if (tags != null) {
      this.data.tags = JSON.parse(tags);
    }
  }

  // 初始化函数
  init() {
    //
  }
  //登录名验证
  VerifyAccountName(rule: any, value: any, callback: any) {
    Api.VerifyAccountName(value).then((res: any) => {
      if (res.state) {
        callback();
      } else {
        callback(new Error(res.msg));
      }
    });
  }
  //手机号验证
  VerifyPhoneNumber(rule: any, value: any, callback: any) {
    let vtf: any = verifyPhone(value);
    if (!vtf.done) {
      callback(new Error(vtf.errMsg));
    } else {
      Api.VerifyPhoneNumber(value).then((res: any) => {
        if (res.state) {
          callback();
        } else {
          callback(new Error(res.msg));
        }
      });
    }
  }
  handleCommand(command: string | number | object) {
    if (command == "logout") {
      this.$confirm("您确认退出吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.logout();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
    if (command == "modify") {
      this.modify();
    }
  }
  //登出
  logout() {
    let data = {
      Routers: [],
      rouls: []
    };
    this.LOGIN_OUT();
    this.$store.dispatch("UPDATE_LAYOUY_STATE", data);
    // this.$router.push({ name: "login" });
    window.location.href = "https://www.debteehelper.com/views/login.html";
  }
  //修改密码
  modify() {
    Api.getAdminInfo().then((res: any) => {
      if (res.state) {
        // this.form.account_name = res.data.admin_account;
        // this.form.phone_number = res.data.admin_phone_number;
        // this.form.email = res.data.admin_email;
        // this.form.update_password = "0";
        this.form = {
          account_name: "",
          phone_number: res.data.admin_phone_number,
          email: res.data.admin_email,
          update_password: "0",
          password: "",
          password_01: "",
          password_02: ""
        };
        this.admin_name = res.data.admin_name;
        this.data.customerVisible2 = true;
      } else {
        this.$message.warning(res.msg);
      }
    });
    // window.open("https://www.debteehelper.com/views/login.html?edit=true");
  }
  //刷新页面
  Refresh() {
    location.reload();
  }
  //导航栏标签删除
  handleClose(tag: any) {
    //获取当前删除的标签在数组中的下标
    let index: number = this.data.tags
      .map((item: any) => item.name)
      .indexOf(tag.name);
    //从数组中删除该标签
    this.data.tags.splice(this.data.tags.indexOf(tag), 1);
    //更新本地会话存储
    sessionStorage.setItem("tags", JSON.stringify(this.data.tags));
    //定义要回跳的页面路由，此时为该标签的上一个标签
    let history: any = this.data.tags[index - 1];
    //点击的是当前页的标签才会跳转，不是则不跳转
    if (tag.active == true) {
      this.$router.push({
        path: history.path
      });
    }
  }
  //导航栏标签点击
  handleClick(tag: any) {
    this.$router.push({
      path: tag.path
    });
  }
  openWacth(val: boolean) {
    this.openType = val;
  }
  //
  tagRight() {
    let tagsBox: any = this.$refs.tagsBox;
    let headerTag: any = this.$refs.headerTag;
    let headerTagWidth: number = headerTag.getBoundingClientRect().width;
    let tagsWidth: number = tagsBox.getBoundingClientRect().width;
    this.left = (tagsWidth - headerTagWidth) * -1;
    this.right = false;
  }
  //提交修改密码
  submitForm(formName: any) {
    const from: any = this.$refs[formName];
    from.validate((valid: any) => {
      if (valid) {
        Api.UpdateAccountInfo(this.form).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg);
            this.resetForm(formName);
          } else {
            this.$message.warning(res.msg);
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
  resetForm(formName: any) {
    const from: any = this.$refs[formName];
    from.resetFields();
    this.data.customerVisible2 = false;
  }
}
