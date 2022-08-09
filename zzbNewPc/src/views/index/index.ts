import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { IndexData } from "@/types/views/index.interface";
import * as Api from "@/api/index";
import { setCookie, getCookie } from "@/utils/common";
// import {  } from "@/components" // 组件

// 引入 ECharts 主模块
import echarts from "echarts";

@Component({})
export default class About extends Vue {
  // Getter
  // @Getter index.author

  // Action
  @Action GET_DATA_ASYN: any;

  // data
  data: IndexData = {
    pageName: "index",
    chart: null
  };
  adminData: any = {
    account: {
      account_name: "", //账户名称
      admin_role: "" //角色名称
    },
    admin_total: "", //管理员数量
    creditor_total: "", //债权人数量
    aI_lawyer_total: "", //律师函全部数量
    aI_lawyer_end_tatol: "", //律师函完成数量
    case_total: "", //律师办案全部数量
    case_end_total: "", //律师办案
    notice: [
      // {
      //   send_name: "债主帮",
      //   send_time: "2022-03-28 13:12",
      //   status: "已读",
      //   title: "债主帮春节假期通知",
      //   text: `<p>尊敬的用户，您好。</p>
      //     <p>由于受疫情影响，债主帮所在地区的EMS暂停了寄件服务，故自2022年3月28日起，EMS律师函暂停寄送，其他委托项目照常执行。</p>
      //     <p>待EMS恢复寄件后，我们将立即为您寄出律师函。由此给您带来的不便，深表歉意，谢谢。</p>`
      // },
      {
        send_name: "债主帮",
        send_time: "2022-01-25 13:12",
        status: "已读",
        title: "债主帮春节假期通知",
        text:
          "尊敬的用户：由于春节假期，债主帮于2022年1月30日至2月6日期间暂停接受法催服务委托，请您提前安排委托服务，避免造成延误及损失。如需帮助请致电4006 321 918，提前祝您节日快乐。"
      },
      {
        send_name: "债主帮",
        send_time: "2021-09-24 17:12",
        status: "已读",
        title: "债主帮国庆假期通知",
        text:
          "尊敬的用户：由于国庆假期，EMS在2021年10月1日至7日期间停止收件，请您提前安排AI律师函的委托下单。如需帮助请致电4006 321 918，提前祝您节日快乐。"
      },
      {
        send_name: "债主帮",
        send_time: "2021-02-22 17:12",
        status: "已读",
        title: "债主帮新版上线通知",
        text: ""
      }
    ], //通知
    noticeInfo: {}
  };
  pageList: any = [
    {
      name: "AI律师函",
      url: "https://file.debteehelper.com/weapp-img/saas/1.png"
    },
    {
      name: "律师办案",
      url: "https://file.debteehelper.com/weapp-img/saas/2.png"
    },
    {
      name: "案件评估",
      url: "https://file.debteehelper.com/weapp-img/saas/3.png"
    },
    {
      name: "律师查档",
      url: "https://file.debteehelper.com/weapp-img/saas/4.png"
    },
    {
      name: "诉讼助资",
      url: "https://file.debteehelper.com/weapp-img/saas/5.png"
    },
    {
      name: "保全保险",
      url: "https://file.debteehelper.com/weapp-img/saas/6.png"
    }
  ];
  tableData: any = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄"
    }
  ];
  customerVisible: boolean = false;
  dialogVisible: boolean = false;

  created() {
    //
  }

  activated() {
    //
  }
  mounted() {
    // const isNotice = getCookie("isNotice");
    // if (isNotice != "true") {
    //   this.handleClick(this.adminData.notice[0]);
    // }
    this.init();
  }

  // 初始化函数
  init() {
    Api.GetHomeData().then((res: any) => {
      // this.adminData.notice.push(res.data.notice);
      this.adminData.account.account_name = res.data.account.account_name;
      this.adminData.account.admin_role = res.data.account.admin_role;
      this.adminData.admin_total = res.data.admin_total;
      this.adminData.creditor_total = res.data.creditor_total;
      this.adminData.aI_lawyer_total = res.data.aI_lawyer_total;
      this.adminData.aI_lawyer_end_tatol = res.data.aI_lawyer_end_tatol;
      this.adminData.case_total = res.data.case_total;
      this.adminData.case_end_total = res.data.case_end_total;
    });
  }
  //首页跳转详情
  toPage(url: string, index: number) {
    if (index == 2) {
      this.$router.push({
        path: "/LawyerLawUrging/launchCase"
      });
    } else if (index == 0) {
      this.$router.push({
        path: "/AILawyerletter/SendLetter"
      });
    } else if (index == 1) {
      this.$router.push({
        path: "/LawyerLawUrging/launchCase"
      });
    } else if (index == -1) {
      window.open(url);
    } else if (index == 3) {
      this.$router.push({
        path: "/consult/consult"
      });
    } else if (index == 4) {
      this.$router.push({
        path: "/litigation/litigation"
      });
    } else if (index == 5) {
      this.$router.push({
        path: "/Preservation/Preservation"
      });
    }
  }
  //通知查看
  handleClick(row: object) {
    this.adminData.noticeInfo = row;
    this.dialogVisible = true;
  }
  //关闭通知
  handClose() {
    this.dialogVisible = false;
    this.adminData.noticeInfo = {};
    setCookie("isNotice", "true");
  }
  //跳转页面
  toWeb(url: string) {
    window.open(url);
  }
}
