
require.config({
  baseUrl: "../",
  paths: {
    // style: "vendor/require/css.min",
    jquery: "https://cdn.staticfile.org/jquery/1.9.0/jquery.min",
    template: "js/navi/template",
    // mock: "vendor/mockjs/mock.min",
    // data: "data/data",
    index: "js/index/index",
    coop: "js/coop/index",
    header: "js/header/index",
    footer: "js/footer/index",
    form: "js/footer/index",
    about: "js/footer/index",
    ai: "js/ai/index",
    ai_detail: "js/ai-detail/index",
    price: "js/price/index",
    solution: "js/solution/index",
    product: "js/product/index",
    help: "js/help/index",
    help_detail: "js/help_detail/index",
    question: "js/question/index",
    video: "js/video/index",
    search: "js/search/index",
    personal_web: "js/personal_web/index",
    unsubscribe: "js/unsubscribe/index",
    activity: "js/activity/index",
    navi: "js/navi/index",
    sign: "js/sign/index",
    deployment: "js/deployment/index",
    aniScroll: "js/ani-scroll/index",
  },
  shim: {
    // data: {
    //     deps: ["mock"]
    // },
    // index: {
    //     deps: ["style!css/widget/reset.css","style!css/page/index.css"]
    // },
    // header: {
    //     deps: ["style!css/widget/reset.css","style!css/page/header.css"]
    // },
    // footer: {
    //     deps: ["style!css/page/footer.css"]
    // },
    // form: {
    //     deps: ["style!css/page/form.css"]
    // },
    // about: {
    //     deps: ["style!css/page/about.css"]
    // },
    // ai: {
    //     deps: ["style!css/page/ai.css",]
    // },
    // price: {
    //     deps: ["style!css/page/price.css",]
    // },
    // ai_detail: {
    //     deps: ["style!css/page/ai.css","style!css/page/markdown.css"]
    // },
  }
});