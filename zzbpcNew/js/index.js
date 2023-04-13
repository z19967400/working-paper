const url = window.location.href;
const head = url.split(":")[0];
$('#goTop').hide()
// if (head === "http") {
//   window.location.href = url.replace("http", "https");
// }
const token = getCookie("token")
if (token == null) {
  $('.loginBtn').find('a').text('登录/注册')
} else {
  $('.loginBtn').find('a').text('控制台')
}
//banner
$('.index_banner').slick({
  autoplay: true,
  arrows: false,
  dots: false,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  pauseOnHover: false,
  fade: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        dots: true
      }
    }
  ]
});
if (IEVersion() != -1) {
  alert("您的浏览器版本过低,为保证您的操作体验请升级浏览器版本,点击确定下载谷歌浏览器", "温馨提示", "确定");
  window.open("https://file.debteehelper.com/ChromeSetup.exe");
}
$('.index_banner').init(function (slick) {
  $('.index_banner .item.slick-current').addClass('active').siblings().removeClass('active')
})
$('.index_banner').on('afterChange', function (slick, currentSlide) {
  $('.index_banner .item.slick-current').addClass('active').siblings().removeClass('active');
  var _index = $('.index_banner').slick('slickCurrentSlide')
  $('.section1 .number span').eq(_index).addClass('active').siblings().removeClass('active')
})
$('.section1 .number span').click(function () {
  var _index = $(this).index();
  $('.index_banner').slick('slickGoTo', _index);
  $(this).addClass("active").siblings().removeClass("active")
});
$('.section1 .prev').click(function () {
  $('.index_banner').slick('slickPrev')
})
$('.section1 .next').click(function () {
  $('.index_banner').slick('slickNext');
});

//导航
//超过一定高度导航添加类名
var nav = $("header"); //得到导航对象  
var win = $(window); //得到窗口对象  
var sc = $(document);//得到document文档对象。  
win.scroll(function () {
  if (sc.scrollTop() >= 100) {
    nav.addClass("on");
  } else {
    nav.removeClass("on");
  }
})

//移动端展开nav
$('#navToggle').on('click', function () {
  $('.m_nav').addClass('open');
})
//关闭nav
$('.m_nav .top .closed').on('click', function () {
  $('.m_nav').removeClass('open');
})

//二级导航  移动端
$(".m_nav .ul li").click(function () {
  $(this).children("div.dropdown_menu").slideToggle('slow')
  $(this).siblings('li').children('.dropdown_menu').slideUp('slow');
});

//全屏滚动
$('#index_main').fullpage({
  'navigation': true,
  slidesNavigation: true,
  controlArrows: false,
  continuousHorizontal: true,
  scrollingSpeed: 1000,
  showActiveTooltip: true,
  anchors: ['hero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'Nine', 'Ten'],
  loopHorizontal: true,
  afterLoad: function (anchorLink, index) {
    if (index == 1) {
      $('header').removeClass('on');
    } else {
      $('header').addClass('on');
      $('.section' + index + ' h3').addClass('animated fadeInUp').css('animation-delay', '.1s');
    }
  },
  onLeave: function (index, direction) {
    console.log(direction);
    if (direction == 1) {
      $('#goTop').hide()
    } else {
      $('#goTop').show()
    }
    let video = document.getElementById('video');
    let h = document.body.clientHeight
    let w = document.body.clientWidth
    if (video != null) {
      if (direction == 5) {
        // $('header').hide()
        // $('#video').addClass('fixd')
        video.play()
        // if (w > 750) {
        //   $('#video').css('height', `${h}px`)
        // }
      } else {
        // $('header').show()
        // $('#video').removeClass('fixd')
        video.pause()
      }
    }
  }
})
//获取Cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
$('.loginBtn').click(function () {
  if (token == null) {
    window.location.href = "/views/login.html"
  } else {
    window.location.href = "https://saas.debteehelper.com/"
  }
})
//弹窗提示
function openToast(msg, icon, time) {
  $('.toast-text').html(msg)
  if (icon === 'success') {
    $('.toast-icon').attr('src', '/image/success.svg')
  } else if (icon === 'err') {
    $('.toast-icon').attr('src', '/image/error.svg')
  } else if (icon === 'warn') {
    $('.toast-icon').attr('src', '/image/warn.svg')
  } else if (icon === '') {
    $('.toast-icon').hide()
  }
  $('.toast').fadeIn(500)
  $('.toast').css('display', 'flex')
  setTimeout(function () {
    $('.toast').fadeOut(500)
  }, time || 2000)
};
//判断是否是IE浏览器
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}
$('#phone-right').mouseover(function () {
  $('#phone-text').show()
}).mouseout(function () {
  $('#phone-text').hide()
})
$('#weChat').mouseover(function () {
  $('#weChat-img').show()
}).mouseout(function () {
  $('#weChat-img').hide()
})
$('#goTop').click(function () {
  window.location.hash = "hero"
  $('body,html').animate({
    scrollTop: 0
  }, 800);
})

$(window).scroll(function () {
  let winPos = $(document).scrollTop()
  if (winPos >= 500) {
    $('#goTop').show()
  } else {
    $('#goTop').hide()
  }
})

