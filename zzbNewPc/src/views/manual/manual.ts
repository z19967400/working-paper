import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component({
  components: {}
})
export default class About extends Vue {
  data: any = {
    actIndex: 0,
    actIndex2: 0,
    rightIndex: 1,
    labers: [
      {
        label: "AI律师函",
        children: [
          { name: "Step1 申请VIP账户" },
          { name: "Step2 登录控制台" },
          { name: "Step3 发起委托" },
          { name: "Step4 确认催收信息" },
          { name: "Step5 完成支付" },
          { name: "Step6 实时查看" },
          { name: "下载操作手册" }
        ]
      },
      {
        label: "律师办案",
        children: [
          { name: "Step1 申请VIP账户" },
          { name: "Step2 登录控制台" },
          { name: "Step3 发起委托" },
          { name: "Step4 确认催收信息" },
          { name: "Step5 管理案件" },
          { name: "下载操作手册" }
        ]
      }
    ]
  };
  height: number = 0;
  sectionRefs: Array<any> = [];
  isok: boolean = true;
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this;
    self.height = document.body.offsetHeight - 208;
    for (let index = 1; index <= 11; index++) {
      let ref: any = this.$refs["section" + index];
      let item: object = {
        section: ref.offsetTop
      };
      this.sectionRefs.push(item);
    }
  }
  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this;
    self.data.actIndex = index;
    self.data.actIndex2 = 0;
    self.laberClick2(index, 0);
    return false;
  }
  //点击左侧二级菜单
  laberClick2(index: number, index2: number) {
    this.isok = false;
    if (index == 0 && index2 == 6) {
      window.open(
        "https://file.debteehelper.com/help/债主帮VIP账户操作手册-AI律师函.pdf"
      );
      return false;
    }
    if (index == 1 && index2 == 5) {
      window.open(
        "https://file.debteehelper.com/help/债主帮VIP账户操作手册-律师办案.pdf"
      );
      return false;
    }
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
      self.data.rightIndex = index2 + 1;
    }
    let top: number = self.$refs.right.offsetTop; //初始位置
    let dom: any = "section" + self.data.rightIndex; //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop;
    self.$refs.right.scrollTop = actTop - top;
    setTimeout(() => {
      this.isok = true;
    }, 100);
  }
  //跳转官网
  toWeb() {
    window.open("http://www.debteehelper.com/");
  }
  handleScroll(e: any) {
    if (!this.isok) {
      return false;
    }
    let scrollTop: number = e.target.scrollTop;
    let right: any = this.$refs.right;
    for (let index = 0; index < this.sectionRefs.length; index++) {
      if (scrollTop >= right.scrollHeight - 761) {
        this.data.actIndex = 1;
        this.data.actIndex2 = 4;
        this.data.rightIndex = 11;
        return false;
      }
      if (scrollTop == 0) {
        this.data.actIndex = 0;
        this.data.actIndex2 = 0;
        this.data.rightIndex = 1;
        return false;
      }
      if (
        scrollTop >= this.sectionRefs[index].section &&
        scrollTop < this.sectionRefs[index + 1].section
      ) {
        if (index + 1 <= 5) {
          this.data.actIndex = 0;
          this.data.actIndex2 = index + 1;
          this.data.rightIndex = index + 2;
        } else {
          this.data.actIndex = 1;
          this.data.actIndex2 = index - 5;
          this.data.rightIndex = index + 2;
        }
      }
    }
  }
  beforeDestroy() {
    //
  }
  deactivated() {
    //
  }
  init() {}
}
