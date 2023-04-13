import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import { IndexData } from "@/types/views/index.interface";
import * as Api from "@/api/index";
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
    notice: [], //通知
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
    this.GetPlatformNotice();
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
  handClose(index: number) {
    let storage: any = window.localStorage;
    this.dialogVisible = false;
    this.adminData.noticeInfo = {};
    // setCookie("isNotice", "true");
    if (storage.getItem("isNotice")) {
      if (storage.getItem("isNotice").indexOf(index) == -1) {
        // eslint-disable-next-line no-console
        console.log(storage.getItem("isNotice"));
        let val: any = storage.getItem("isNotice") + "," + index;

        storage.setItem("isNotice", val);
        this.adminData.notice[index].status = "已读";
      } else {
        this.adminData.notice[index].status = "已读";
      }
    } else {
      storage.setItem("isNotice", index);
      this.adminData.notice[index].status = "已读";
    }
  }
  //跳转页面
  toWeb(url: string) {
    window.open(url);
  }
  //获取通知
  GetPlatformNotice() {
    let storage: any = window.localStorage;
    let isNotice: any = storage.getItem("isNotice");
    Api.GetPlatformNotice().then((res: any) => {
      res.data.forEach((item: any, index: number) => {
        item["send_name"] = "债主帮";
        if (isNotice) {
          item["status"] = isNotice.indexOf(index) == -1 ? "未读" : "已读";
        } else {
          item["status"] = "未读";
        }
        item["index"] = index;
        item.start_time = item.start_time.replace("T", " ");
        item.start_time = item.start_time.substring(
          0,
          item.start_time.lastIndexOf(":")
        );
        item.end_time = item.end_time.replace("T", " ");
        item.end_time = item.end_time.substring(
          0,
          item.end_time.lastIndexOf(":")
        );
      });
      this.adminData.notice = res.data;

      let d1: any = new Date();
      let d2: any = new Date(
        this.adminData.notice[0].end_time.replace(/-/g, "/")
      );

      if (
        this.adminData.notice[0].status === "未读" &&
        d2.valueOf() > d1.valueOf()
      ) {
        this.handleClick(this.adminData.notice[0]);
      }
    });
  }
}
