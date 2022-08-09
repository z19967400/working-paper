import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Mutation } from "vuex-class";
import { LoginData } from "@/types/views/login.interface";
import { getAsyncRoute } from "@/router/pommies";
import { verifyPhone } from "@/utils/common";
import { setToken, setCookie } from "@/utils/common";
import * as Api from "@/api/login";
@Component({})
export default class About extends Vue {
  // Getter
  // @Getter author: any;

  // Action
  @Action
  LOGIN_DATA: any;

  @Mutation
  UPDATE_LAYOUY_STATE: any;
  validateuserName = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入账号"));
    } else {
      callback();
    }
    return false;
    // eslint-disable-next-line no-unreachable
    let verify: any = verifyPhone(value);
    if (verify.done) {
      callback();
    } else {
      callback(new Error(verify.errMsg));
    }
  };
  validatePassWord = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      callback();
    }
  };
  // data
  data: LoginData = {
    name: "诚收法催大客户平台",
    ruleForm: {
      userName: "zrn",
      passWord: "10081058"
    },
    rules: {
      userName: [{ validator: this.validateuserName, trigger: "blur" }],
      passWord: [{ validator: this.validatePassWord, trigger: "blur" }]
    },
    login: true
  };
  disabled: boolean = false;
  codeText: string = "获取验证码";
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.init();
    //
  }

  // 初始化函数
  init() {
    window.location.href = "https://www.debteehelper.com/views/login.html";
  }
  //获取手机验证吗
  getCode() {
    let from: any = this.$refs["ruleForm"];
    from.validateField("userName", (errorMsg: string) => {
      if (errorMsg == "") {
        this.disabled = true;
        var timesRun = 60;
        var interval = setInterval(() => {
          timesRun -= 1;
          this.codeText = timesRun + "s后重新获取";
          if (timesRun === 0) {
            this.disabled = false;
            this.codeText = "获取验证码";
            clearInterval(interval);
          }
        }, 1000);
        Api.getCode(this.data.ruleForm.userName).then((res: any) => {
          if (res.data != 0) {
            return false;
          } else {
            this.$message.warning(res.msg);
          }
        });
      }
    });
  }
  //登录
  submitForm(formName: string | number) {
    let from: any = this.$refs[formName];
    from.validate((valid: any) => {
      if (valid) {
        let userName = this.data.ruleForm.userName;
        let passWord = this.data.ruleForm.passWord;
        this.LOGIN_DATA({ userName, passWord }).then((res: any) => {
          if (res.data != "") {
            let token = res.data.tokey;
            let dta = {
              token,
              userName: res.data.userInfo.name,
              headImg: res.data.userInfo.head_img
            };
            let parmas = {
              rouls: ["platform", "user", "business"]
            };
            setToken(token);
            setCookie("userName", res.data.userInfo.name);
            // setCookie("headImg", res.data.userInfo.head_img);
            setCookie(
              "headImg",
              "https://file.debteehelper.com/weapp-img/default_head_img.png"
            );
            this.$store.commit("UPDATE_LOGIN_STATE", dta);
            this.UPDATE_LAYOUY_STATE(parmas);
            getAsyncRoute();
            this.$message.success("登录成功");
            setTimeout(() => {
              this.$router.push({ path: "/index" });
            }, 1000);
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
}
