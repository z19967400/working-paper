//写入cookie函数
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
// 下拉选择
$(function () {
  $("header .project").hover(function () {
    $(this).children().addClass("show")
  }, function () {
    $(this).children().removeClass("show")
  })
})
//回到顶部
// pc
$("#gotop").click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 800);
})
// 手机
$("#gotops").click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 500);
})
//页面滚动
window.addEventListener('scroll', function () {
  let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
  if (t > 90) {
    $('.head').addClass('headclass')
  } else {
    $('.head').removeClass('headclass')
  }
})
//setCookie('lan','cn');    简体中文
//setCookie('lan','en');    英文

function language() {

  $('[set-lan]').each(function () {
    var me = $(this);
    var a = me.attr('set-lan').split(':');
    var p = a[0];   //文字放置位置
    var m = a[1];   //文字的标识

    //用户选择语言后保存在cookie中，这里读取cookie中的语言版本
    var lan = getCookie('lan');

    //选取语言文字
    switch (lan) {
      case 'cn':
        var t = cn[m];  //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
        break;
      default:
        var t = en[m];
    }

    //如果所选语言的json中没有此内容就选取其他语言显示
    if (t == undefined) t = cn[m];
    if (t == undefined) t = en[m];

    if (t == undefined) return true;   //如果还是没有就跳出

    //文字放置位置有（html,val等，可以自己添加）
    switch (p) {
      case 'html':
        me.html(t);
        break;
      case 'val':
      case 'value':
        me.val(t);
        break;
      default:
        me.html(t);
    }

  });
}