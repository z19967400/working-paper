import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import * as Api from "../../../api/services";
@Component({
  components: {}
})
export default class About extends Vue {
  data: any = {
    visible: false,
    actIndex: 0,
    actIndex2: 0,
    rightIndex: 0,
    infoTitle: "",
    labers: [
      {
        children: [
          { name: "执行进度" },
          { name: "委托信息" },
          { name: "委托报价" }
        ]
      }
    ],
    BasicInfo: [
      { name: "财产保全申请人", value: "", prop: "applicant" },
      { name: "财产保全被申请人", value: "", prop: "respondent" },
      { name: "管辖法院所在地", value: "", prop: "seat_of_court" },
      { name: "申请保全金额", value: "", prop: "application_amount" },
      { name: "现有证据", value: "", prop: "evidence_01" },
      { name: "证据资料文件", value: "", prop: "evidence_file" },
      { name: "债务人财产线索", value: "", prop: "property_clues" },
      { name: "财产线索说明", value: "", prop: "property_clues_explain" },
      { name: "财产线索资料文件", value: "", prop: "property_clues_file" },
      { name: "案件简介", value: "", prop: "case_profiles" },
      { name: "联系人姓名", value: "", prop: "contacts_name" },
      { name: "联系人手机号", value: "", prop: "contacts_telphone" },
      { name: "联系人邮箱", value: "", prop: "contacts_email" },
      { name: "备注", value: "", prop: "member_remarks" }
    ],
    auditStatus: "",
    quote: ""
  };
  sectionDom: any = {};
  height: number = 0;

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this;
    self.height = document.body.offsetHeight - 208;
    this.init();
  }

  beforeDestroy() {
    //
  }
  deactivated() {
    //
  }
  init() {
    let self: any = this;
    self.getInfo(self.$route.params.entrust_no);
    let top: number = self.$refs.right.offsetTop; //初始位置
    for (let index = 0; index <= this.data.labers[0].children.length; index++) {
      const domTop = self.$refs["section" + index].offsetTop - top;
      self.sectionDom["section" + index] = domTop;
    }
  }
  //获取管理详情
  getInfo(id: string) {
    let parmas: any = {
      type: 2,
      entrust_no: id
    };
    Api.GetServiceDetails(parmas)
      .then((res: any) => {
        this.data.auditStatus = res.data.execution_progress;
        this.data.quote = res.data.quoted_price;
        // res.data.a_type = res.data.a_type.replace(/"/g, "");
        // res.data.information_01 = res.data.information_01.replace(/"/g, "");
        // res.data.information_01 = res.data.information_01.replace(/,/g, "<br>");
        this.data.BasicInfo.forEach((item: any) => {
          if (res.data[item.prop] !== undefined) {
            item.value = res.data[item.prop];
          }
        });
      })
      .catch((err: any) => {
        let self: any = this;
        self.$message.error("网络错误");
      });
  }

  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this;
    self.data.actIndex = index;
    self.data.actIndex2 = 0;
    self.laberClick2(index, 0);
  }
  //点击左侧二级菜单
  laberClick2(index: number, index2: number) {
    let self: any = this;
    self.data.actIndex = index;
    self.data.actIndex2 = index2;
    if (index == 1) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length + index2;
    } else if (index == 2) {
      self.data.rightIndex =
        self.data.labers[index - 1].children.length +
        self.data.labers[index - 2].children.length +
        index2;
    } else {
      self.data.rightIndex = index2;
    }
    let top: number = self.$refs.right.offsetTop; //初始位置
    let dom: any = "section" + self.data.rightIndex; //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop;
    self.$refs.right.scrollTop = actTop - top;
  }
  //截取最后一个/后面的字符
  Mysubstring(str: string) {
    return str.substring(str.lastIndexOf("/") + 1);
  }
  //打开文件地址
  openUrl(url: string) {
    window.open(url);
  }
  //返回
  revoke() {
    let self: any = this;
    self.$router.go(-1);
  }
}
