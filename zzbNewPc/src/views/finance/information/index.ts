import { Component, Vue, Watch } from "vue-property-decorator";
import comInvoice from "./components/invoiceIndex.vue";
import comCollection from "./components/collectionIndex.vue";
import comTicket from "./components/ticketCollectionIndex.vue";
@Component({
  components: {
    comInvoice,
    comCollection,
    comTicket
  }
})
export default class About extends Vue {
  data: any = {
    activeName: "first"
  };
  created() {
    //
  }

  activated() {
    this.init();
  }

  mounted() {
    //
  }
  // 初始化函数
  init() {
    //
  }
  handleClick(tab: any, event: any) {
    let self: any = this;
    if (tab.index == 0) {
      self.$refs.comInvoice.init();
    } else if (tab.index == 1) {
      self.$refs.comTicket.init();
    } else {
      self.$refs.comCollection.init();
    }
  }
}
