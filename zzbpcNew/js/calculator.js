$(function () {
  var index = 0
  const LPR = [
    { time: '1991/4/21', halfYear: '8.1', oneYear: "8.64", threeYear: "9", fiveYear: "9.54", fiveAbove: "9.72" },
    { time: '1993/5/15', halfYear: '8.82', oneYear: "9.36", threeYear: "10.8", fiveYear: "12.06", fiveAbove: "12.24" },
    { time: '1993/7/11', halfYear: '9', oneYear: "10.98", threeYear: "12.24", fiveYear: "13.86", fiveAbove: "14.04" },
    { time: '1995/1/1', halfYear: '9', oneYear: "10.98", threeYear: "12.96", fiveYear: "14.58", fiveAbove: "14.76" },
    { time: '1995/7/1', halfYear: '10.08', oneYear: "12.0", threeYear: "13.5", fiveYear: "15.12", fiveAbove: "15.3" },
    { time: '1996/5/1', halfYear: '9.72', oneYear: "10.98", threeYear: "13.14", fiveYear: "14.94", fiveAbove: "15.12" },
    { time: '1996/8/23', halfYear: '9.18', oneYear: "10.08", threeYear: "10.98", fiveYear: "11.7", fiveAbove: "12.42" },
    { time: '1997/10/23', halfYear: '7.65', oneYear: "8.64", threeYear: "9.36", fiveYear: "9.9", fiveAbove: "10.53" },
    { time: '1998/3/25', halfYear: '7.02', oneYear: "7.92", threeYear: "9", fiveYear: "9.72", fiveAbove: "10.35" },
    { time: '1998/7/1', halfYear: '6.57', oneYear: "6.93", threeYear: "7.11", fiveYear: "7.65", fiveAbove: "8.01" },
    { time: '1998/12/7', halfYear: '6.12', oneYear: "6.39", threeYear: "6.66", fiveYear: "7.2", fiveAbove: "7.56" },
    { time: '1999/6/10', halfYear: '5.58', oneYear: "5.85", threeYear: "5.94", fiveYear: "6.03", fiveAbove: "6.21" },
    { time: '2002/2/21', halfYear: '5.04', oneYear: "5.31", threeYear: "5.49", fiveYear: "5.58", fiveAbove: "5.76" },
    { time: '2004/10/29', halfYear: '5.22', oneYear: "5.58", threeYear: "5.76", fiveYear: "5.85", fiveAbove: "6.12" },
    { time: '2006/4/28', halfYear: '5.4', oneYear: "5.85", threeYear: "6.03", fiveYear: "6.12", fiveAbove: "6.39" },
    { time: '2006/8/19', halfYear: '5.58', oneYear: "6.12", threeYear: "6.3", fiveYear: "6.48", fiveAbove: "6.84" },
    { time: '2007/3/18', halfYear: '5.67', oneYear: "6.39", threeYear: "6.57", fiveYear: "6.75", fiveAbove: "7.11" },
    { time: '2007/5/19', halfYear: '5.85', oneYear: "6.57", threeYear: "6.75", fiveYear: "6.93", fiveAbove: "7.2" },
    { time: '2007/7/21', halfYear: '6.03', oneYear: "6.84", threeYear: "7.02", fiveYear: "7.2", fiveAbove: "7.38" },
    { time: '2007/8/22', halfYear: '6.21', oneYear: "7.02", threeYear: "7.2", fiveYear: "7.38", fiveAbove: "7.56" },
    { time: '2007/9/15', halfYear: '6.48', oneYear: "7.29", threeYear: "7.47", fiveYear: "7.65", fiveAbove: "7.83" },
    { time: '2007/12/21', halfYear: '6.57', oneYear: "7.47", threeYear: "7.56", fiveYear: "7.74", fiveAbove: "7.83" },
    { time: '2008/9/16', halfYear: '6.21', oneYear: "7.2", threeYear: "7.29", fiveYear: "7.56", fiveAbove: "7.74" },
    { time: '2008/10/9', halfYear: '6.12', oneYear: "6.93", threeYear: "7.02", fiveYear: "7.29", fiveAbove: "7.47" },
    { time: '2008/10/30', halfYear: '6.03', oneYear: "6.66", threeYear: "6.75", fiveYear: "7.02", fiveAbove: "7.2" },
    { time: '2008/11/27', halfYear: '5.04', oneYear: "5.58", threeYear: "5.67", fiveYear: "5.94", fiveAbove: "6.12" },
    { time: '2008/12/23', halfYear: '4.86', oneYear: "5.31", threeYear: "5.4", fiveYear: "5.76", fiveAbove: "5.94" },
    { time: '2010/10/20', halfYear: '5.1', oneYear: "5.56", threeYear: "5.6", fiveYear: "5.96", fiveAbove: "6.14" },
    { time: '2010/12/26', halfYear: '5.35', oneYear: "5.81", threeYear: "5.85", fiveYear: "6.22", fiveAbove: "6.4" },
    { time: '2011/2/9', halfYear: '5.6', oneYear: "6.06", threeYear: "6.1", fiveYear: "6.45", fiveAbove: "6.6" },
    { time: '2011/4/6', halfYear: '5.85', oneYear: "6.31", threeYear: "6.4", fiveYear: "6.65", fiveAbove: "6.8" },
    { time: '2011/7/7', halfYear: '6.1', oneYear: "6.56", threeYear: "6.65", fiveYear: "6.9", fiveAbove: "7.05" },
    { time: '2012/6/8', halfYear: '5.85', oneYear: "6.31", threeYear: "6.4", fiveYear: "6.65", fiveAbove: "6.8" },
    { time: '2012/7/6', halfYear: '5.6', oneYear: "6", threeYear: "6.15", fiveYear: "6.4", fiveAbove: "6.55" },
    { time: '2014/11/22', halfYear: '5.6', oneYear: "5.6", threeYear: "6", fiveYear: "6", fiveAbove: "6.15" },
    { time: '2015/3/1', halfYear: '5.35', oneYear: "5.35", threeYear: "5.75", fiveYear: "5.75", fiveAbove: "5.9" },
    { time: '2015/5/11', halfYear: '5.1', oneYear: "5.1", threeYear: "5.5", fiveYear: "5.5", fiveAbove: "5.9" },
    { time: '2015/6/28', halfYear: '4.85', oneYear: "4.85", threeYear: "5.25", fiveYear: "5.25", fiveAbove: "5.4" },
    { time: '2015/8/26', halfYear: '4.6', oneYear: "4.6", threeYear: "5", fiveYear: "5", fiveAbove: "5.15" },
    { time: '2015/10/24', halfYear: '4.35', oneYear: "4.35", threeYear: "4.75", fiveYear: "4.75", fiveAbove: "4.9" },
    { time: '2019/8/20', halfYear: '4.25', oneYear: "4.25", threeYear: "4.25", fiveYear: "4.25", fiveAbove: "4.85" },
    { time: '2019/9/20', halfYear: '4.2', oneYear: "4.2", threeYear: "4.2", fiveYear: "4.2", fiveAbove: "4.85" },
    { time: '2019/10/21', halfYear: '4.2', oneYear: "4.2", threeYear: "4.2", fiveYear: "4.2", fiveAbove: "4.85" },
    { time: '2019/11/20', halfYear: '4.15', oneYear: "4.15", threeYear: "4.15", fiveYear: "4.15", fiveAbove: "4.8" },
    { time: '2019/12/20', halfYear: '4.15', oneYear: "4.15", threeYear: "4.15", fiveYear: "4.15", fiveAbove: "4.8" },
    { time: '2020/1/20', halfYear: '4.15', oneYear: "4.15", threeYear: "4.15", fiveYear: "4.15", fiveAbove: "4.8" },
    { time: '2020/2/20', halfYear: '4.05', oneYear: "4.05", threeYear: "4.05", fiveYear: "4.05", fiveAbove: "4.75" },
    { time: '2020/3/20', halfYear: '4.05', oneYear: "4.05", threeYear: "4.05", fiveYear: "4.05", fiveAbove: "4.75" },
    { time: '2020/4/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/5/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/6/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/7/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/8/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/9/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/10/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" },
    { time: '2020/11/20', halfYear: '3.85', oneYear: "3.85", threeYear: "3.85", fiveYear: "3.85", fiveAbove: "4.65" }
  ]
  $('.left .fenlei').click(function (e) {
    index = $('.left .fenlei').index(this)
    $('.left .fenlei').removeClass('act')
    $(this).addClass('act')
    switch (index) {
      case 0:
        $('.box>.left>.xian>.xian').css('top', '0')
        $('#first').show()
        $('#first1').show()
        $('#second').hide()
        $('#second2').hide()
        $('#third').hide()
        $('#third3').hide()
        break;
      case 1:
        $('.box>.left>.xian>.xian').css('top', '40px')
        $('#first').hide()
        $('#first1').hide()
        $('#second').show()
        $('#second2').show()
        $('#third').hide()
        $('#third3').hide()
        break;
      case 2:
        $('.box>.left>.xian>.xian').css('top', '80px')
        $('#first').hide()
        $('#first1').hide()
        $('#second').hide()
        $('#second2').hide()
        $('#third').show()
        $('#third3').show()
        break;
      default:
        break;
    }
  })
  //计算
  $('#start').click(function () {
    switch (index) {
      case 0: //诉讼费计算
        let value = $('#Subject').val()
        let type = $('#litigationType').val()
        if (type == '财产案件') {
          $('#Acceptance').text(propertyCompute(value) + '元')
        } else if (type == '离婚案件') {
          $('#Acceptance').text(divorce(value))
        } else if (type == '人格人权案件') {
          $('#Acceptance').text(personality(value))
        } else if (type == '知识产权案件') {
          $('#Acceptance').text(knowledge(value))
        } else if (type == '劳动争议案件') {
          $('#Acceptance').text(labour(value))
        } else if (type == '商标、专利、海事行政案件') {
          $('#Acceptance').text(patent(value))
        } else if (type == '其他行政案件') {
          $('#Acceptance').text(other(value))
        } else if (type == '管辖权异议不成立案件') {
          $('#Acceptance').text(administer(value))
        }
        $('#Preservation').text(PreservationCompute(value) + '元')
        $('#implement').text(executeCompute(value) + '元')
        break;
      case 1:
        let value2 = $('#Subject2').val()
        let type2 = $('#litigationType2').val()
        let province = $('#province').val()
        if (type2 == '民事案件') {
          $('#Acceptance2').text(civil(value2, province))
        }
        else if (type2 == '行政案件') {
          $('#Acceptance2').text(civil(value2, province))
        }
        break;
      case 2:
        let type3 = $('#Interest').val()
        let principal = $('#principal').val() //本金
        let Magnification = $('#Magnification').val() //倍率
        let startTime1 = $('#startTime').val() //起息日期
        let startTime12 = $('#startTime2').val() //起息日期2
        let endTime1 = $('#endTime').val() //延迟日期1
        let endTime2 = $('#endTime2').val() //延迟日期2
        let other = $('#other').val() //其他金额
        if (type3 == 'LPR') {
          if (principal == '') {
            openToast("填写本金", "warn")
            return false
          }
          if (startTime1 == '' || startTime12 == '') {
            openToast("请选择起息日期", "warn")
            return false
          }
          if (endTime1 != '' && endTime2 != '') {
            $('#yanchi').text(delay(principal, endTime1, endTime2) + "元")
          }
          $('#lixi').text(interest(principal, Magnification, startTime1, startTime12) + "元")
          $('#zong').text(parseInt(interest(principal, Magnification, startTime1, startTime12)) + (parseInt(delay(principal, endTime1, endTime2)) || 0) + (parseInt(other) || 0) + parseInt(principal) + '元')
        }
        break;
      default:
        break;
    }
  })
  //财产案件受理费计算
  function propertyCompute(val) {
    let value = 50 //不超过一万元
    if (val > 10000) { //超过一万至10万的部分
      value += ((val > 100000 ? 100000 : val) - 10000) * 0.025
    }
    if (val > 100000) { //超过10万至20万的部分
      value += ((val > 200000 ? 200000 : val) - 100000) * 0.02
    }
    if (val > 200000) {//超过20万至50万的部分
      value += ((val > 500000 ? 500000 : val) - 200000) * 0.015
    }
    if (val > 500000) {//超过50万至100万的部分
      value += ((val > 1000000 ? 1000000 : val) - 500000) * 0.01
    }
    if (val > 1000000) {//超过100万至200万的部分
      value += ((val > 2000000 ? 2000000 : val) - 1000000) * 0.009
    }
    if (val > 2000000) {//超过200万至500万的部分
      value += ((val > 5000000 ? 5000000 : val) - 2000000) * 0.008
    }
    if (val > 5000000) {//超过500万至1000万的部分
      value += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.007
    }
    if (val > 10000000) {//超过1000万至2000万的部分
      value += ((val > 20000000 ? 20000000 : val) - 10000000) * 0.006
    }
    if (val > 20000000) {//超过2000万的部分
      value += (val - 20000000) * 0.005
    }
    return value.toFixed(2)
  }
  //离婚案件计算
  function divorce(val) {
    let value = ""
    let value1 = 50
    let value2 = 300
    if (val > 200000) { //超过二十万
      value1 += (val - 200000) * 0.005
      value2 += (val - 200000) * 0.005
    }
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '元'
    return value
  }
  //人格案件计算
  function personality(val) {
    let value = ""
    let value1 = 100
    let value2 = 500
    if (val > 50000) { //超过5万元至10万元
      value1 += ((val > 100000 ? 100000 : val) - 50000) * 0.01
      value2 += ((val > 100000 ? 100000 : val) - 50000) * 0.01
    }
    if (val > 100000) {
      value1 += (val - 100000) * 0.05
      value2 += (val - 100000) * 0.05
    }
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '元'
    return value
  }
  //知识产权案件计算
  function knowledge(val) {
    let value = ""
    let value1 = 500
    let value2 = 1000
    let value3 = 50 //不超过一万元
    if (val > 10000) { //超过一万至10万的部分
      value3 += ((val > 100000 ? 100000 : val) - 10000) * 0.025
    }
    if (val > 100000) { //超过10万至20万的部分
      value3 += ((val > 200000 ? 200000 : val) - 100000) * 0.02
    }
    if (val > 200000) {//超过20万至50万的部分
      value3 += ((val > 500000 ? 500000 : val) - 200000) * 0.015
    }
    if (val > 500000) {//超过50万至100万的部分
      value3 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.01
    }
    if (val > 1000000) {//超过100万至200万的部分
      value3 += ((val > 2000000 ? 2000000 : val) - 1000000) * 0.009
    }
    if (val > 2000000) {//超过200万至500万的部分
      value3 += ((val > 5000000 ? 5000000 : val) - 2000000) * 0.008
    }
    if (val > 5000000) {//超过500万至1000万的部分
      value3 += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.007
    }
    if (val > 10000000) {//超过1000万至2000万的部分
      value3 += ((val > 20000000 ? 20000000 : val) - 10000000) * 0.006
    }
    if (val > 20000000) {//超过2000万的部分
      value3 += (val - 20000000) * 0.005
    }
    value1 += value3
    value2 += value3
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '元'
    return value
  }
  //劳动争议案件
  function labour(val) {
    value = 10
    return value.toFixed(2)
  }
  //商标、专利、海事行政案件每件交纳100元
  function patent(val) {
    value = 100
    return value.toFixed(2)
  }
  //其他行政案件
  function other(val) {
    value = 50
    return value.toFixed(2)
  }
  //管辖权异议不成立案件
  function administer(val) {
    value = ''
    let value1 = 50
    let value2 = 100
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '元'
    return value.toFixed(2)
  }
  //保全费计算
  function PreservationCompute(val) {
    let value = 30 //不超过一千元
    if (val > 1000) { //超过一千至10万的部分
      value += ((val > 100000 ? 100000 : val) - 1000) * 0.01
    }
    if (val > 100000) { //超过10万的部分
      value += (val - 100000) * 0.005
    }
    value = value > 5000 ? 5000 : value
    return value.toFixed(2)
  }
  //执行费计算
  function executeCompute(val) {
    let value = 50 //不超过1万元的
    if (val > 10000) { //超过一万至50万的部分
      value += ((val > 500000 ? 500000 : val) - 10000) * 0.015
    }
    if (val > 500000) { //超过50万至500万的部分
      value += ((val > 5000000 ? 5000000 : val) - 500000) * 0.01
    }
    if (val > 5000000) { //超过500万至1000万的部分
      value += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.005
    }
    if (val > 10000000) {//超过1000万的部分
      value += (val - 10000000) * 0.001
    }
    return value.toFixed(2)
  }
  //重置
  $('#reset').click(function () {
    console.log('重置');
  })
  //民事案件
  function civil(val, province) {
    let value = ''
    let value1 = 0
    let value2 = 0
    if (province == '上海') {
      if (val <= 100000) { //十万以下收取8%-12%
        value1 += val * 0.08
        value2 += val * 0.12
      }
      if (val > 100000) { //10万至100万
        value1 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.05 + 8000
        value2 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.07 + 12000
      }
      if (val > 1000000) { //100万至1000万
        value1 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.03
        value2 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.05
      }
      if (val > 10000000) { //1000万以上
        value1 += (val - 10000000) * 0.01
        value2 += (val - 10000000) * 0.03
      }
      value = value1 > 3000 ? value1.toFixed(2) + "-" + value2.toFixed(2) + '元' : 3000 + '元'
      return value
    } else if (province == '北京') {
      if (val < 100000) { //十万以下收取
        value1 += val * 0.1
      }
      if (val >= 100000) { //10万至100万
        value1 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.06 + 10000
      }
      if (val > 1000000) { //100万至1000万
        value1 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.04
      }
      if (val > 10000000) { //1000万以上
        value1 += (val - 10000000) * 0.02
      }
      value = value1 > 3000 ? value1.toFixed(2) : 3000 + '元'
      return value
    } else if (province == '广东') {
      if (val <= 50000) { //十万以下收取
        value1 += 1000
        value1 += 8000
      }
      if (val > 50000) { //5万至10万
        value1 += ((val > 100000 ? 100000 : val) - 50000) * 0.08 + 1000
        value2 += ((val > 100000 ? 100000 : val) - 50000) * 0.08 + 8000
      }
      if (val > 100000) { //10万至50万
        value1 += ((val > 500000 ? 500000 : val) - 100000) * 0.05
        value2 += ((val > 500000 ? 500000 : val) - 100000) * 0.05
      }
      if (val > 500000) { //50万至100万
        value1 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.04
        value2 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.04
      }
      if (val > 50000000) { //5000万以上
        value1 += (val - 50000000) * 0.005
        value2 += (val - 50000000) * 0.005
      }
      value = value1.toFixed(2) + "-" + value2.toFixed(2) + '元'
      return value
    }
  }
  //获取日期天数
  function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
  }
  //判断时间区间
  var time_range = function (beginTime, endTime, nowTime) {
    if (new Date(Date.parse(nowTime)) >= new Date(Date.parse(beginTime)) && new Date(Date.parse(nowTime)) < new Date(Date.parse(endTime))) {
      return true
    } else {
      return false
    }
  }
  //获取利率 接收天数，对应利率表列
  function getLilv(day, obj) {
    if (day <= 180) { //半年及以下
      return obj.halfYear
    } else if (day > 180 && day <= 360) { //半年至一年
      return obj.oneYear
    } else if (day > 360 && day <= 1080) { //一年至三年
      return obj.threeYear
    } else if (day > 1080 && day <= 1800) { //三年至五年
      return obj.fiveYear
    } else if (day > 1800) {
      return obj.fiveAbove
    }
  }
  //利息计算
  function interest(principal, Magnification, startTime1, startTime12) {
    let actTime = ""
    LPR.forEach((item, index) => {
      if (index + 1 == LPR.length && actTime == '') {
        actTime = item.time
      }
      if (index + 1 < LPR.length) {
        if (time_range(item.time, LPR[index + 1].time, startTime1)) {
          actTime = item.time
        }
      }
    })
    let lprs = LPR.filter(item => { return new Date(Date.parse(item.time)) >= new Date(Date.parse(actTime)) && new Date(Date.parse(item.time)) < new Date(Date.parse(startTime12)) })
    let lixi = 0
    let html = "<p>利息（银行同期利率/LPR）</p>"
    lprs.forEach((item, index) => {
      if (index === 0) {
        let days = 0
        //第一个
        if (lprs.length == 1) {
          days = getDaysBetween(startTime1, startTime12)
        } else {
          days = getDaysBetween(startTime1, lprs[index + 1].time)
        }
        let Lx = principal * (getLilv(Math.round(days), item) * 0.01).toFixed(4) * Math.round(days) * Magnification
        lixi += Lx / 360
        html += '<p>(本金 × 年利率 × 天数 × 倍数)/天数(年：360) = 利息</p>'
      } else if (index + 1 === lprs.length) {
        //末尾
        let days = getDaysBetween(item.time, startTime12)
        let Lx = principal * (getLilv(Math.round(days), item) * 0.01).toFixed(4) * Math.round(days) * Magnification
        lixi += Lx / 360
      } else {
        let days = getDaysBetween(item.time, lprs[index + 1].time)
        let Lx = principal * (getLilv(Math.round(days), item) * 0.01).toFixed(4) * Math.round(days) * Magnification
        lixi += Lx / 360
      }
      $('#process').html(html)
    })
    return lixi.toFixed(2)
  }
  //延迟利息计算
  function delay(principal, endTime1, endTime2) {
    let val = 0
    console.log(getDaysBetween(endTime1, '2014/08/01'));
    if (getDaysBetween(endTime1, '2014/08/01') > 0) {
      val += parseInt(interest(principal, 2, endTime1, '2014/08/01'))
      console.log(interest(principal, 2, endTime1, '2014/08/01'));
    }
    let days = getDaysBetween('2014/08/01', endTime2)
    val += parseInt(principal * 0.000175 * Math.round(days))
    console.log(parseInt(principal * 0.000175 * Math.round(days)));

    return val
  }
})
//分类选择
function GetVal(obj) {
  //代表的是选中项的index索引
  var index = obj.selectedIndex;
  //代表的是选中项的的值
  var val = obj.options[index].value;
  //代表的是选中项的text
  var txt = obj.options[index].text;
  if (txt == '刑事案件') {
    $('.Criminal').hide()
    $('.Crimina2').show()
  } else {
    $('.Criminal').show()
    $('.Crimina2').hide()
  }
}