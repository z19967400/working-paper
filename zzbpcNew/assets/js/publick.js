$(function () {
  let lang = getCookie('lan')
  if (lang == null) {
    setCookie('lan', 'cn')
  } else if (lang == 'en') {
    console.log('英文');
    language()
  } else {
    console.log('中文');
    language()
  }
  $('#language').click(function (e) {
    if ($(e.target).text() == 'EN') {
      setCookie('lan', 'en')
      language()
    } else {
      setCookie('lan', 'cn')
      language()
    }
  })
})