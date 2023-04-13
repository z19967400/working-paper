var app = new Vue({
  el: '#app',
  data: {
    isMore: false,
    isRight: false,
    width: document.body.clientWidth,
    list: [
      {
        title: '技术创新',
        text: "利用灵活定制的SaaS服务、法律大数据、智能案件评估、区块链电子存证、可视化案件管理系统等多种技术助力法律＋科技化进程，颠覆、重塑法律服务价值链。"
      },
      {
        title: '一体化分布',
        text: "与松散的律师联盟不同，我们是一家分布式一体化运作的现代律所，覆盖全国各地的团队使我们不受地理位置的限制，有足够人员应对交易和诉讼，能够随时随地在客户需要我们的时候工作。"
      },
      {
        title: '线上服务',
        text: "在互联网和后疫情时代，我们利用法律文书自动化生成、电子印章、线上OA系统、数字化工位等多种灵活、高效的概念，点阵式互联互通合作无间，降低客户的法律服务成本。"
      },
      {
        title: '全生命周期解决方案',
        text: "我们通过协同、共享、创新向客户提供全方位、全领域、全地域的一站式法律服务。为金融、保险、电商等行业客户成功提供了从非诉到诉讼的案件全生命周期解决方案。"
      }
    ],
    list2: [
      // {
      //   url: '../../img/u16.svg',
      //   num: '160+',
      //   text: '全球服务国家160 +'
      // },
      {
        url: '../../img/u50.svg',
        num: '600+',
        text: '中国服务城市600 +'
      },
      {
        url: '../../img/u22.svg',
        num: '10万+',
        text: '处理案件累计10万 +'
      },
      {
        url: '../../img/u32.svg',
        num: '1万+',
        text: '服务用户累计1万 +'
      },

      // {
      //   url: '../../img/u38.svg',
      //   num: '50亿+',
      //   text: '回款金额累计50亿 +'
      // },
      // {
      //   url: '../../img/u48.svg',
      //   num: '2万+',
      //   text: '平台律师累计2万 +'
      // },
    ],
    list3: [
      {
        title: '客户只为优质的法律服务支付律师费，不再为律所支付高档写字楼的房租',
        text: "我们在业务模式上识别和消除传统律师事务所的劣势，我们坚守处理法律事务的复杂性、广度深度经验方面的优势，同时利用技术和人才而不是规模化的办公场所和奢侈的装修为客户提供法律服务。"
      },
      {
        title: '技术创新',
        text: "利用灵活定制的SaaS服务、法律大数据、智能案件评估、区块链电子存证、可视化案件管理系统等多种技术助力法律＋科技化进程，颠覆、重塑法律服务价值链。"
      },
      {
        title: '一体化分布',
        text: "与松散的律师联盟不同，我们是一家分布式一体化运作的现代律所，覆盖全国各地的团队使我们不受地理位置的限制，有足够人员应对交易和诉讼，能够随时随地在客户需要我们的时候工作。"
      },
      {
        title: '线上服务',
        text: "在互联网和后疫情时代，我们利用法律文书自动化生成、电子印章、线上OA系统、数字化工位等多种灵活、高效的概念，点阵式互联互通合作无间，降低客户的法律服务成本。"
      },
      {
        title: '全生命周期解决方案',
        text: "我们通过协同、共享、创新向客户提供全方位、全领域、全地域的一站式法律服务。为金融、保险、电商等行业客户成功提供了从非诉到诉讼的案件全生命周期解决方案。"
      },

    ],
  },
  methods: {
    more() {
      this.isMore = true
    },
    navOpenRight() {
      this.isRight = true
    },
    navCloseRight() {
      this.isRight = false
    }
  }

})
var swiper = new Swiper('.swiper-container', {
  // pagination: '.swiper-pagination',
  // paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  spaceBetween: 30,
  autoplay: 5000,
  loop: true,
});
//企业应收点击切换
$(".maxwidthbox .left .option").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  $(".maxwidthbox .right .tab-item").removeClass("show").eq($(this).index()).addClass("show")
  $(".maxwidthbox>.right-img .tab-item").eq($(this).index()).addClass("show").siblings().removeClass("show");
})
//企业应收自动切换
function qiehuan(num) {
  $('.maxwidthbox .left .option').removeClass("active").eq(num).addClass("active");
  $(".maxwidthbox .right .tab-item").removeClass("show").eq(num).addClass("show")
  $(".maxwidthbox>.right-img .tab-item").eq(num).addClass("show").siblings().removeClass("show");
}