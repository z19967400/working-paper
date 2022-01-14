<template>
  <div class="pay-wrap">
    <div class="zhezhao"></div>
    <div v-loading.fullscreen.lock="data.loading" class="pay-box">
      <div class="pay-header">
        <span>{{ data.title }}</span>
        <span @click="close" class="el-icon-close close"></span>
      </div>
      <div v-show="!data.isCode" class="pay-content">
        <div>
          <span>
            <img src="../../assets/images/pay/VipPay.png" alt="" />
            VIP先催后付</span
          >
          <span>
            <el-radio
              :disabled="data.info.is_postpaid != 1"
              v-model="data.radio"
              label="4"
            ></el-radio>
          </span>
        </div>
        <div>
          <span>
            <img src="../../assets/images/pay/WeChat.png" alt="" />
            微信支付</span
          >
          <span>
            <el-radio v-model="data.radio" label="1"></el-radio>
          </span>
        </div>
        <div>
          <span>
            <img src="../../assets/images/pay/Alipay.png" alt="" />
            支付宝支付</span
          >
          <span>
            <el-radio v-model="data.radio" label="2"></el-radio>
          </span>
        </div>
        <div>
          <span>
            <img src="../../assets/images/pay/UnionPay.png" alt="" />
            银行对公转账</span
          >
          <span>
            <el-radio v-model="data.radio" label="3"></el-radio>
          </span>
        </div>
      </div>
      <div v-show="data.radio == '3'" class="pay-UnionPay">
        <el-divider></el-divider>
        <!-- <span class="title2">银行对公转账</span> -->
        <el-row>
          <el-col :span="4"><span> </span></el-col>
          <el-col :span="4"><span class="laber">电子邮箱地址</span></el-col>
          <el-col style="position:relative;" :span="12">
            <el-input
              size="small"
              v-model="data.email"
              placeholder="请输入邮箱"
            ></el-input>
            <span class="tips"
              ><span class="el-icon-warning-outline"></span
              >对公转账信息将发送至该邮箱,请及时转账付款</span
            >
          </el-col>
          <el-col :span="4"><span> </span></el-col>
        </el-row>
      </div>
      <div v-show="!data.isCode" class="pay-bottom">
        <span>￥ {{ thousand(data.info.payment_amount) }}</span>
        <el-button @click="pay" type="primary">{{
          data.radio == "3" ? "立即发送" : "立即支付"
        }}</el-button>
      </div>
      <div v-show="data.isCode" class="pay-code">
        <div
          v-show="data.radio == '1' && data.isCode"
          id="qrcode"
          class="qrcode"
          ref="qrcode"
        ></div>
        <div v-if="data.radio == '2' && data.isCode" class="qrcode">
          <iframe
            :src="'#/pay'"
            frameborder="0"
            width="205px"
            height="205px;"
            ref="child"
            @load="loaded"
          ></iframe>
        </div>
        <div class="code-text">
          <!-- <p>扫一扫付款（元）</p> -->
          <span>{{ thousand(data.info.payment_amount) }} 元</span>
          <p>打开手机{{ data.title }}</p>
          <p>扫一扫继续付</p>
          <el-button @click="completePay" type="primary">已完成支付</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../api/pay";
import baseURL from "../../utils/request";
import { verifyEmall } from "../../utils/common";
@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: true,
    default: ""
  })
  info!: any; //支付详情
  private QRCode: any;
  // data
  data: any = {
    title: "选择支付方式",
    radio: "1",
    email: "",
    loading: false,
    isCode: false,
    payCode: "",
    info: {},
    baseURL: "",
    timer: null,
    payQuery: false,
    wxCode: ""
  };
  @Watch("info", { immediate: true, deep: true })
  infoChange(newVal: any, oldVal: any) {
    this.data.info = newVal;
    if (newVal.is_postpaid == 1) {
      this.data.radio = "4";
    }
  }
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    this.data.baseURL = baseURL;
  }
  deactivated() {
    clearInterval(this.data.timer);
    this.data.timer = null;
  }
  //关闭支付弹窗
  close() {
    clearInterval(this.data.timer);
    if (this.data.isCode) {
      this.data.isCode = false;
      return false;
    }
    this.data = {
      title: "选择支付方式",
      radio: "1",
      price: "0",
      email: "",
      loading: false,
      isCode: false,
      payCode: "",
      info: this.data.info,
      baseURL: "",
      timer: null,
      payQuery: false
    };

    this.$emit("close");
  }
  //立即支付
  pay() {
    this.data.loading = true;
    if (this.data.radio == "1") {
      this.WeChat(this.data.info.pay_number);
    } else if (this.data.radio == "2") {
      this.Alipay(this.data.info.pay_number);
    } else if (this.data.radio == "3") {
      this.UnionPay();
    } else {
      this.afterPay();
    }
  }
  //完成支付
  completePay() {
    let self: any = this;
    if (this.data.payQuery) {
      //支付成功
      self.callbackTO();
    } else {
      self.$notify({
        title: "未支付",
        message: "请确认支付完成",
        type: "warning"
      });
    }
  }
  //支付宝支付
  Alipay(number: string) {
    let self: any = this;
    Api.Alipay(number).then((res: any) => {
      self.data.payCode = res.qr_code_url;
      this.data.isCode = true;
      this.data.title = "支付宝";
      this.data.timer = setInterval(this.AlipayQuery, 1000);
      setTimeout(() => {
        self.data.loading = false;
      }, 2000);
    });
  }
  //微信支付
  WeChat(number: string) {
    Api.WeChat(number).then((res: any) => {
      this.qrCode(res.qr_code_url);
      this.data.loading = false;
      this.data.isCode = true;
      this.data.title = "微信";
      this.data.wxCode = res.out_trade_no;
      this.data.timer = setInterval(this.WeChatQuery, 1000);
    });
  }
  //对公转账
  UnionPay() {
    let vtf: any = verifyEmall(this.data.email);
    let self: any = this;
    if (!vtf.done) {
      setTimeout(() => {
        self.data.loading = false;
        self.$notify({
          title: "对公转账提交失败",
          message: vtf.errMsg,
          type: "error"
        });
      }, 1000);
    } else {
      Api.UnionPay(self.data.info.pay_number, self.data.email).then(
        (res: any) => {
          Api.SendTransfer(self.data.email, self.data.info.pay_number).then(
            (res2: any) => {
              self.data.loading = false;
              if (res2.state) {
                self.$notify({
                  title: "提交成功",
                  message: "银行账户信息已发送，请查看邮箱",
                  type: "success"
                });
                self.callbackTO();
              } else {
                self.$notify({
                  title: "提交失败",
                  message: res2.msg,
                  type: "error"
                });
              }
            }
          );
        }
      );
    }
  }
  //先催后付
  afterPay() {
    let self: any = this;
    Api.AfterPay(self.data.info.pay_number).then((res: any) => {
      self.data.loading = false;
      if (res.state) {
        self.$notify({
          title: "先催后付支付成功",
          message: "VIP会员专享先催后付特权",
          type: "success"
        });
        self.callbackTO();
      }
    });
  }
  //生成二维码
  private qrCode(url: any): void {
    let qr: any = document.getElementById("qrcode");
    let img: any = document.createElement("img");
    let imgSrc: string =
      "data:image/png;base64,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";
    img.setAttribute("src", imgSrc);
    img.classList.add("weChat");
    qr.innerHTML = "";
    qr.appendChild(img);
    let qrcode = new this.QRCode("qrcode", {
      width: 205, //图像宽度
      height: 205, //图像高度
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      typeNumber: 4,
      correctLevel: this.QRCode.CorrectLevel.L //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    });
    qrcode.clear(); //清除二维码
    qrcode.makeCode(url); //生成另一个新的二维码
  }
  //iframe加载事件
  loaded() {
    let child: any = this.$refs.child;
    child.contentWindow.postMessage(
      {
        type: "myData",
        data: this.data.payCode
      },
      "*"
    );
  }
  //微信支付结果查询
  WeChatQuery() {
    let self: any = this;
    Api.WeChatQuery(self.data.wxCode).then((res: any) => {
      if (res.state) {
        clearInterval(self.data.timer);
        self.data.timer = null;
        self.data.payQuery = true;
        self.$notify({
          title: "微信支付成功",
          message: "点击已完成支付跳转委托管理,3秒后自动跳转",
          type: "success"
        });
        setTimeout(() => {
          self.callbackTO();
        }, 3000);
      }
    });
  }
  //支付宝支付结果查询
  AlipayQuery() {
    let self: any = this;
    Api.AlipayQuery(self.data.info.pay_number).then((res: any) => {
      if (res.state) {
        clearInterval(self.data.timer);
        self.data.timer = null;
        self.data.payQuery = true;
        self.$notify({
          title: "支付宝支付成功",
          message: "点击已完成支付跳转委托管理,3秒后自动跳转",
          type: "success"
        });
        setTimeout(() => {
          self.callbackTO();
        }, 3000);
      }
    });
  }
  //支付成功跳转
  callbackTO() {
    let self: any = this;
    // self.close();
    if (self.$router.history.current.name == "AILawyerletter/Management") {
      self.$router.go(0);
    } else {
      self.$router.push({
        path: "/AILawyerletter/Management"
      });
    }
  }
  //支付金额千位符
  thousand(num: number) {
    if (num) {
      let str: string = num.toString();
      if (str.indexOf(".") != -1) {
        //有小数
        let str1: string = str.substring(0, str.indexOf("."));
        let str2: string = str.substring(str.indexOf("."), str.length);
        let num2: number = Number(str1);
        if (str2.length >= 3) {
          //小数点后大于等于2位
          return num2.toLocaleString() + str2;
        } else {
          return num2.toLocaleString() + str2 + "0";
        }
      } else {
        //无小数
        return num.toLocaleString() + ".00";
      }
    } else {
      return num;
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.pay-wrap {
  width: 100%;
  & > .pay-box {
    width: 600px;
    background: white;
    padding: 20px 40px;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    & > .pay-header {
      position: relative;
      text-align: left;
      color: $Main-characters;
      font-size: $Medium-title;
      & > .close {
        position: absolute;
        right: 0;
        cursor: pointer;
      }
    }
    & > .pay-content {
      margin-top: 40px;
      & > div:hover {
        background-color: #f5f7fa;
      }
      & > div {
        display: flex;
        justify-content: space-between;
        padding: 12px 40px;
        & > span:nth-child(1) {
          color: $General-colors;
          & img {
            height: 20px;
            position: relative;
            top: 4px;
            margin-right: 5px;
          }
        }
        & > span:nth-child(2) {
          & > .el-radio {
            & > .el-radio__label {
              display: none;
            }
            & > .el-radio__input {
              & > .el-radio__inner {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
    & > .pay-UnionPay {
      & > .el-divider {
        margin: 20px 0;
      }
      & > .title2 {
        font-size: $Text-font;
        color: $General-colors;
        display: block;
        text-align: center;
      }
      & > .el-row {
        display: flex;
        margin-top: 20px;
        height: 60px;
        margin-bottom: 20px;
        & .el-col {
          display: block !important;
          & .laber {
            font-size: 14px;
            margin-right: 5px;
            line-height: 30px;
            color: #606066;
          }
        }
        & .tips {
          // position: absolute;
          font-size: $fuzhu-font;
          color: #ec193a;
          // bottom: -30px;
          width: 120%;
          & > span {
            font-size: $large-title;
            position: relative;
            top: 2px;
            margin-right: 5px;
          }
        }
      }
    }
    & > .pay-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 10px;
      & > span {
        line-height: 40px;
        font-size: 28px;
        color: #ec193a;
      }
    }
    & > .pay-code {
      margin-top: 40px;
      // text-align: center;
      display: flex;
      & > .qrcode {
        display: inline-block;
        margin-bottom: 40px;
        position: relative;
        width: 50%;
        & > img {
          margin: auto;
        }
        & > iframe {
          margin: auto;
          display: block;
        }
        & > .weChat {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      & > .code-text {
        text-align: center;
        width: 50%;
        & > p {
          color: $General-colors;
          font-size: $Text-font;
        }
        & > span {
          color: #ec193a;
          font-size: 28px;
        }
        & .el-button {
          display: inline-block;
          margin: 0 auto 20px auto;
        }
      }
    }
  }
}
</style>
