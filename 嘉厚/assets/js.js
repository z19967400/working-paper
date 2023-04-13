document.body.style.zoom = String(document.body.offsetWidth / 1920)
let zoom = 1
if (navigator.userAgent.toLowerCase().includes("webkit")) {
  zoom = document.body.offsetWidth / 1920
}
document.body.style.setProperty("--zoom", zoom)
document.body.style.zoom = zoom

isEng = localStorage.getItem('language')
onload = function () {
  if (isEng == 'en') {
    loadProperties('en');
  } else {
    loadProperties('zh');
  }
}
function loadProperties(lang) {
  let pathname = window.location.pathname
  let pageName = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.lastIndexOf('.'))
  $.i18n.properties({
    name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
    path: pageName === 'index' ? '../i18n/' : '../../i18n/',   //注意这里路径是你属性文件的所在文件夹
    mode: 'map',
    language: lang,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
    callback: function () {
      $("[data-locale]").each(function () {
        $(this).text($.i18n.prop($(this).data("locale")));
      });
    }
  });
}
$(function () {
  $('.language').click(function () {
    let lang = localStorage.getItem('language')
    if (lang == 'en') {
      localStorage.setItem('language', 'zh');
      loadProperties('zh')
    } else {
      localStorage.setItem('language', 'en');
      loadProperties('en')
    }

  })
})
