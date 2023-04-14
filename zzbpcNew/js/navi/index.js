"use strict";
define(["jquery", "template"], function (e, t) {
  function o(t, e) {
    "百度搜索" == t ? window.open("http://www.baidu.com/s?wd=" + e + "&ie=utf-8") : "案件检索" == t ? window.open("https://wenshu.court.gov.cn/website/wenshu/181217BMTKHNT2W0/index.html?pageId=95ac6c243aa20577f6b6e3e2faf4fdc5&s21=" + e) : "百度文库" == t ? window.open("https://wenku.baidu.com/search?word=" + e + "&ie=utf-8") : "搜微信" == t ? window.open("https://weixin.sogou.com/weixin?type=2&s_from=input&query=" + e) : "百度百科" == t ? window.open("https://baike.baidu.com/item/" + e) : "淘宝" == t ? window.open("https://s.taobao.com/search?q=" + e) : "谷歌" == t ? window.open("http://www.google.com/search?q=" + e) : "知乎" == t && window.open("https://www.zhihu.com/search?q=" + e + "&type=content")
  }
  e("#searchBtn").click(function () {
    var t = e("#searchInput").val();
    o(e("#selfSelect").text(), t)
  }),
    e(".top-item-wrap .top-item").click(function () {
      var t = e("#searchInput").val();
      o(e(this).data("type"), t)
    }),
    e(".self-option .option-item").click(function () {
      var t = e(this).index();
      e(".self-option .option-item").removeClass("option-active").eq(t).addClass("option-active"),
        e("#selfSelect").text(e(this).text())
    }),
    e("#selfSelect").click(function (t) {
      t.stopPropagation(),
        e("#selfOption").show()
    }),
    e(document).click(function () {
      e("#selfOption").hide()
    })
});
