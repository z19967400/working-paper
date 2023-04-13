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
  //司法鉴定类别
  const jd = [
    [
      { label: '早期尸表检验', value: '500/具', base: '死亡后24小时以内，含照相、录像' },
      { label: '晚期尸表检验', value: '1000/具', base: '死亡后24小时以外，含照相、录像。高度腐败尸体加收50%' },
      { label: '早期尸体解剖', value: '1000/具', base: '死亡后24小时以外，含照相、录像。高度腐败尸体加收50%' }
    ]
  ]

  $('.left .fenlei').click(function (e) {
    index = $('.left .fenlei').index(this)
    $('.left .fenlei').removeClass('act')
    $(this).addClass('act')
    console.log(index);
    $('.box>.left>.xian>.xian').css('top', index * 40 + "px")
    $(`.right>div>div:nth-child(${index + 1})`).show()
    $(`.right>div>div:nth-child(${index + 1})`).siblings().hide()
    if (index > 2) {
      $('.other').show()
      $('#first1').hide()
      $('#second2').hide()
      $('#third3').hide()
      $('#table').html('')
      $('.qrm-input').val('')
    }
    switch (index) {
      case 0:
        $('#first1').show()
        $('#second2').hide()
        $('#third3').hide()
        $('.other').hide()
        break;
      case 1:
        $('#first1').hide()
        $('#second2').show()
        $('#third3').hide()
        $('.other').hide()
        break;
      case 2:
        $('#first1').hide()
        $('#second2').hide()
        $('#third3').show()
        $('.other').hide()
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
      case 3:
        //司法鉴定
        jianding()
        break
      case 4:
        //公证
        gongzheng()
        break
      case 5:
        //仲裁
        zhongcai()
        break
      case 6:
        //房屋贷款
        daikuang()
        break
      default:
      case 7:
        paimai()
        break
      case 8:
        yiliao()
        break
      case 9:
        fangchan()
        break
      case 10:
        weiyue()
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
    location.reload(true)
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
//司法鉴定
function jianding() {
  let value1 = $('#province2').val()
  let leibie = $('#leibie').val()
  switch (leibie) {
    case '法医类/法医病理鉴定':
      let html = `<tbody>
        <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
        <tr><td>早期尸表检验</td><td>750/具</td><td>死亡后24小时以内，含照相、录像</td></tr>
        <tr><td>晚期尸表检验</td><td>1500/具</td><td>	死亡后24小时以外，含照相、录像。高度腐败尸体加收50%</td></tr>
        <tr><td>早期尸体解剖</td><td>3750/具</td><td>	死亡后24小时以内，含照相、录像、尸表检验、死亡原因、死亡方式、死亡时间、生前伤死后伤、致伤（死）物鉴定，不含组织学检查和毒物分析</td></tr>
        <tr><td>晚期尸体解剖</td><td>6000/具</td><td>	死亡后24小时以外，含照相、录像、尸表检验、死亡原因、死亡方式、死亡时间、生前伤死后伤、致伤（死）物鉴定，不含组织学检查和毒物分析</td></tr>
        <tr><td>开棺验尸</td><td>9000/具</td><td>	含照相、录像、尸表检验、尸体解剖、死亡原因、死亡方式、死亡时间、生前伤死后伤、致伤（死）物鉴定，不含组织学检查和毒物分析</td></tr>
        <tr><td>生前伤死后伤鉴别</td><td>1500/例</td><td>仅适用于单做此项鉴定</td></tr>
        <tr><td>致伤(死)物认定</td><td>1500/例</td><td>仅适用于单做此项鉴定</td></tr>
        <tr><td>脏体硅藻检查</td><td>750/例</td><td></td></tr>
        <tr><td>单器官组织学检查与鉴定</td><td>750或1500/例</td><td>心、脑器官每例1000元，其他器官每例500元。</td></tr>
        <tr><td>多器官组织学检查与鉴定</td><td>4500/例</td><td></td></tr>
        <tr><td>病理组织切片检查</td><td>105/张</td><td></td></tr>
        <tr><td>特殊染色技术</td><td>150/张</td><td>如特殊组织染色、组织化学染色、免疫组化染色、免疫荧光染色等。</td></tr>
        <tr><td>电镜病理检查</td><td>450/标本</td><td>电镜、免疫电镜、扫描电镜等。</td></tr>
        <tr><td>尸体X光检验</td><td>120/张</td><td></td></tr>
        <tr><td>尸体CR检验</td><td>225/张</td><td></td></tr>
        <tr><td>法医现场检查</td><td>1500/例</td><td>进行现场勘验、物证搜集和现场重建工作。</td></tr>
        <tr><td>法医病理鉴定文证审查</td><td>1800/例</td><td></td></tr>
      </tbody>`
      $('#table').html(html)
      break;
    case '法医类/法医临床鉴定':
      let html2 = `<tbody>
        <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
        <tr><td>损伤程度鉴定</td><td>450或1050/例</td><td>只涉及体表损伤程度鉴定的，每例300元。含活体检验、活体照相，不含医学辅助检查费用</td></tr>
        <tr><td>伤残程度评定</td><td>1050/例</td><td>	含活体检验、活体照相，不含医学辅助检查费用</td></tr>
        <tr><td>伤病关系鉴定</td><td>1500/例</td><td>	</td></tr>
        <tr><td>诈病、诈伤鉴定</td><td>2250/例</td><td>	</td></tr>
        <tr><td>医疗纠纷鉴定</td><td>6450/例</td><td>	</td></tr>
        <tr><td>劳动能力鉴定</td><td>1050/例</td><td></td></tr>
        <tr><td>活体年龄鉴定</td><td>1200/例</td><td></td></tr>
        <tr><td>男性性功能评定</td><td>1050/例</td><td></td></tr>
        <tr><td>听觉功能评定</td><td>1050/例</td><td></td></tr>
        <tr><td>视觉功能评定</td><td>1050/例</td><td></td></tr>
        <tr><td>致伤物和致伤方式推断</td><td>1350/例</td><td></td></tr>
        <tr><td>医疗费合理性评定</td><td>900/例</td><td></td></tr>
        <tr><td>后期医疗费评定</td><td>900/例</td><td></td></tr>
        <tr><td>医疗护理依赖程度评定</td><td>900/例</td><td></td></tr>
        <tr><td>误工、护理、营养时限评定</td><td>900/例</td><td></td></tr>
        <tr><td>治疗时限评定</td><td>900/例</td><td></td></tr>
        <tr><td>法医临床鉴定文证审查</td><td>1200/例</td><td></td></tr>
      </tbody>`
      $('#table').html(html2)
      break;
    case '法医类/法医物证鉴定':
      let html3 = `<tbody>
        <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
        <tr><td>体液斑(精斑)的确证试验</td><td>一样本150元</td><td></td></tr>
        <tr><td>种属的血清学检验</td><td>一样本150元</td><td>	</td></tr>
        <tr><td>ABO血型的血清学检验</td><td>一样本225元</td><td>	</td></tr>
        <tr><td>红细胞酶型的血清学检验</td><td>一样本225元</td><td>按照每个检验的酶型收取费用</td></tr>
        <tr><td>白细胞血型的血清学检验</td><td>一样本1200元</td><td>	</td></tr>
        <tr><td>血清蛋白的血清学检验</td><td>一样本225元</td><td>按照每个检验的酶型收取费用</td></tr>
        <tr><td>ABO血型的DNA检验</td><td>一样本750元</td><td></td></tr>
        <tr><td>常染色体DNA检验</td><td>一样本120元</td><td>对每个样本的检验应不少于15个基因座;单亲亲子鉴定加1倍收费;骨骼、牙齿、指甲要加收500元/样本;同时做性别检验不另收费用。</td></tr>
        <tr><td>Y染色体DNA检验</td><td>一样本1800元</td><td>对每个样本的检验应不少于15个基因座;骨骼、牙齿、指甲要加收500元/样本。</td></tr>
        <tr><td>X染色体DNA检验</td><td>一样本1800元</td><td>对每个样本的检验应不少于15个基因;骨骼、牙齿、指甲要加收500元/样本。</td></tr>
        <tr><td>线粒体DNA检验</td><td>一样本2250元</td><td></td></tr>
        <tr><td>种属的DNA检验</td><td>一样本1500元</td><td></td></tr>
        <tr><td>性别的DNA检验</td><td>一样本750元</td><td></td></tr>
        <tr><td>动植物的DNA检验</td><td>一样本3000元</td><td>不含人类。</td></tr>
        <tr><td>其他法医DNA鉴定</td><td>一样本450元</td><td>其他未在试剂盒中包括的基因座;按每个检验的基因座计收。</td></tr>
        <tr><td>法医物证鉴定文证审查</td><td>一例750元</td><td></td></tr>
      </tbody>`
      $('#table').html(html3)
      break;
    case '法医类/法医毒物鉴定':
      let html4 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>人体体液中乙醇定性定量分析</td><td>一样本450元</td><td></td></tr>
          <tr><td>血液中碳氧血红蛋白饱和度检测</td><td>一样本450元</td><td></td></tr>
          <tr><td>毛发中滥用药物定性分析</td><td>一样本或目标物1800元</td><td>需定量分析，每样本或目标物加收50%。	</td></tr>
          <tr><td>毒物、毒品定性分析(体外)</td><td>一样本或目标物1200元</td><td>需定量分析，每样本或目标物加收50%。</td></tr>
          <tr><td>常见挥发性毒物分析</td><td>一样本或目标物1500元</td><td>需定量分析，每样本或目标物加收50%。	</td></tr>
          <tr><td>常见有机毒物分析</td><td>一样本或目标物1500元</td><td>需定量分析，每样本或目标物加收50%。</td></tr>
          <tr><td>常见无机毒物分析</td><td>一样本或目标物1500元</td><td>需定量分析，每样本或目标物加收50%。</td></tr>
          <tr><td>常见动、植物有毒成分分析</td><td>一样本或目标物3150元</td><td>需定量分析，每样本或目标物加收50%。</td></tr>
          <tr><td>法医毒物鉴定文证审查</td><td>一例1200元</td><td></td></tr>
        </tbody>`
      $('#table').html(html4)
      break;
    case '法医类/法医人类学鉴定':
      let html5 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>颅像重合鉴定</td><td>一例1800元</td><td></td></tr>
          <tr><td>颅像面貌画像</td><td>一例1500元</td><td></td></tr>
          <tr><td>颅像面貌塑像</td><td>一例750元</td><td>	</td></tr>
          <tr><td>尸骨个体识别</td><td>一例1500元</td><td></td></tr>
          <tr><td>人类学骨龄鉴定</td>一例1500元<td></td></tr>
          <tr><td>法医人类学鉴定文证审查</td><td>一例750元</td><td></td></tr>
        </tbody>`
      $('#table').html(html5)
      break;
    case '法医类/法医精神病鉴定':
      let html6 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>精神状态鉴定</td><td>一例900元</td><td>包括智能障碍评定、精神疾病医学诊断等。</td></tr>
          <tr><td>刑事能力评定</td><td>一例2250元</td><td>包括责任能力、服刑能力、性自卫能力等。</td></tr>
          <tr><td>民事能力评定</td><td>一例2250元</td><td>包括民事行为能力、劳动能力等。</td></tr>
          <tr><td>诉讼能力评定</td><td>一例1500元</td><td>包括受审能力、作证能力、诉讼行为能力等。</td></tr>
          <tr><td>司法精神病因果关系鉴定</td>一例3000元<td>包括精神损失、精神伤残评定、精神伤病关系鉴定等。</td></tr>
          <tr><td>多导心理生理检测评定</td><td>一例3000元</td><td></td></tr>
          <tr><td>法医精神病鉴定文证审查</td><td>一例1500元</td><td></td></tr>
        </tbody>`
      $('#table').html(html6)
      break;
    case '物证类/文书鉴定':
      let html7 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>笔迹鉴定</td><td>一项1500元</td><td>涉及财产案件，标的额不超过10万元的，按照本表左侧所列收费标准执行;超过10万元至50万元的部分，按照1%收取;超过50万元至100万元的部分，按照0.8%收取;超过100万元至200万元的部分，按照0.6%收取;超过200万元至500万元的部分，按照0.4%收取;超过500万元至1000万元的部分，按照0.2%收取;超过1000万元的部分，按照0.1%收取。</td></tr>
          <tr><td>印章印文鉴定</td><td>一项1500元</td><td></td></tr>
          <tr><td>印刷文件同一性、同源性鉴定</td><td>一项1800元</td><td></td></tr>
          <tr><td>文件制作方法鉴定</td><td>一件1800元</td><td></td></tr>
          <tr><td>印刷机具鉴定</td>一件1800元<td></td></tr>
          <tr><td>文书形成时间鉴定</td><td>一项3300元</td><td></td></tr>
          <tr><td>朱墨或文字时序鉴定</td><td>一例3300元</td><td></td></tr>
          <tr><td>变造文件鉴定</td><td>一项1800元</td><td></td></tr>
          <tr><td>污损文件鉴定</td><td>一项1800元</td><td></td></tr>
          <tr><td>证件、证书、票据真伪鉴定</td><td>一项1800元</td><td></td></tr>
          <tr><td>字迹压痕显现</td><td>一项1500元</td><td></td></tr>
          <tr><td>文书物质材料鉴定</td><td>一项1500元</td><td></td></tr>
          <tr><td>文书鉴定文证审查</td><td>一项1200元</td><td></td></tr>
        </tbody>`
      $('#table').html(html7)
      break;
    case '物证类/痕迹鉴定':
      let html8 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>手印鉴定</td><td>一枚1200元</td><td>涉及财产案件，收费办法同上。痕迹鉴定均以检材数量为单位基数，不计样本数量。</td></tr>
          <tr><td>足迹鉴定</td><td>一枚1020元</td><td>痕迹鉴定均以检材数量为单位基数，不计样本数量。</td></tr>
          <tr><td>工具痕迹鉴定</td><td>一个1275元</td><td></td></tr>
          <tr><td>弹头弹壳痕迹鉴定</td><td>一枚1320元</td><td></td></tr>
          <tr><td>枪支性能及致伤力鉴定</td>一支1500元<td></td></tr>
          <tr><td>弹道分析鉴定</td><td>一例1500元</td><td></td></tr>
          <tr><td>枪弹检验建档</td><td>一支300元</td><td></td></tr>
          <tr><td>动物蹄迹痕迹鉴定</td><td>一枚1170元</td><td></td></tr>
          <tr><td>整体分离痕迹鉴定</td><td>一件945元</td><td></td></tr>
          <tr><td>钥匙痕迹鉴定</td><td>一件960元</td><td></td></tr>
          <tr><td>纺织品痕迹鉴定</td><td>一件975元</td><td></td></tr>
          <tr><td>玻璃破碎痕迹鉴定</td><td>一件975元</td><td></td></tr>
          <tr><td>牙齿痕迹鉴定</td><td>一件1275元</td><td></td></tr>

          <tr><td>唇纹痕迹鉴定</td><td>一个975元</td><td></td></tr>
          <tr><td>皮肤纹痕迹鉴定</td><td>一个1275元</td><td></td></tr>
          <tr><td>耳廓痕迹鉴定</td>一个975元<td></td></tr>
          <tr><td>车辆轮迹鉴定</td><td>一个1275元</td><td></td></tr>
          <tr><td>车辆痕迹鉴定</td><td>一辆1500元</td><td></td></tr>
          <tr><td>机动车辆号码化学显现</td><td>一组570元</td><td></td></tr>
          <tr><td>痕迹显现</td><td>一件600元</td><td></td></tr>
          <tr><td>实物照片与实物同一鉴定</td><td>一件900元</td><td></td></tr>
          <tr><td>物体爆破(裂)痕迹鉴定</td><td>一件1500元</td><td></td></tr>
          <tr><td>常见炸药鉴定</td><td>一项1500元</td><td></td></tr>
          <tr><td>导火索、导爆索鉴定</td><td>一段1200元</td><td></td></tr>

          <tr><td>火雷管、电雷管鉴定</td><td>一段1500元</td><td></td></tr>
          <tr><td>制式手榴弹、手雷鉴定</td><td>一项1200元</td><td></td></tr>
          <tr><td>爆炸装置鉴定</td><td>一项3000元</td><td></td></tr>
          <tr><td>痕迹鉴定文证审查</td><td>一例1200元</td><td></td></tr>
          <tr><td>扫描电镜/x射线能谱仪成分检验(定性)</td><td>一样本690元</td><td></td></tr>
          <tr><td>扫描电镜/x射线能谱仪比对检验</td><td>一组1500元</td><td></td></tr>
        </tbody>`
      $('#table').html(html8)
      break;
    case '物证类/微量物证理化检验鉴定':
      let html9 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>射击、爆炸残留物的扫描电镜/x射线能谱仪成分检验</td><td>一样本1800元</td><td></td></tr>
          <tr><td>傅立叶(显微)显微红外光谱仪成分检验</td><td>一样本525元</td><td></td></tr>
          <tr><td>傅立叶(显微)显微红外光谱仪成分比对检验</td><td>一组975元</td><td></td></tr>
          <tr><td>偏振光显微镜检验</td><td>一样本300元</td><td></td></tr>
          <tr><td>拉曼(激光)光谱仪检验</td>一样本600元<td></td></tr>
          <tr><td>(激光)等离子发射光谱仪/质谱仪成分检验</td><td>一样本1050元</td><td>超过5个元素的，每增加一个元素加收100元。</td></tr>
          <tr><td>(激光)等离子发射光谱仪/质谱仪成分比对检验</td><td>一元素450元</td><td>需定量检验，每元素加收50%</td></tr>
          <tr><td>气相色谱/质谱仪检验</td><td>一样本600元</td><td>需定量检验，每样本·目标物加收50%。</td></tr>
          <tr><td>裂解-气相色谱/质谱仪检验</td><td>一样本525元</td><td></td></tr>
          <tr><td>气相色谱检验</td><td>一样本450元</td><td></td></tr>
          <tr><td>热差、热重仪检验</td><td>一样本450元</td><td></td></tr>
          <tr><td>X射线荧光光谱仪检验</td><td>一样本525元</td><td></td></tr>
          <tr><td>X射线衍射仪检验</td><td>一样本600元</td><td></td></tr>
          <tr><td>离子色谱或离子色谱/质谱仪检验</td><td>一样本525元</td><td></td></tr>
          <tr><td>微量物证理化检验鉴定文证审查</td><td>一例1200元</td><td></td></tr>
        </tbody>`
      $('#table').html(html9)
      break;
    case '声像资料类/电子数据鉴定':
      let html10 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>硬盘检验</td><td>1GB30元</td><td>包括台式机硬盘、笔记本硬盘、移动硬盘。</td></tr>
          <tr><td>服务器检验</td><td>1GB45元</td><td>包括磁盘阵例柜、网络硬盘等。</td></tr>
          <tr><td>CD及DVD光盘检测鉴定</td><td>一片300元</td><td></td></tr>
          <tr><td>U盘及存储卡检测鉴定</td><td>一个450元</td><td>含SIM卡</td></tr>
          <tr><td>软盘检测鉴定</td><td>一张150元</td><td></td></tr>
          <tr><td>电子设备检验鉴定</td><td>一个900元</td><td>包括录音笔、传真机、电子秤等同类电子设备。</td></tr>
          <tr><td>存储介质物理故障排除</td><td>一部件1350元</td><td>包括调换磁头、电机;更换PCB板;坏扇处理等。</td></tr>
          <tr><td>手机机身检验</td><td>一个1350元</td><td></td></tr>
          <tr><td>注册表检验鉴定</td><td>一个1500元</td><td></td></tr>
          <tr><td>气相色谱检验</td><td>一样本450元</td><td></td></tr>
          <tr><td>软件一致性检验鉴定</td><td>100个程序行180元</td><td></td></tr>
          <tr><td>软件功能检验</td><td>一个2250元</td><td>按每个检验的软件收费。</td></tr>
          <tr><td>文件一致性检验鉴定</td><td>一对1200元</td><td></td></tr>
          <tr><td>数据库数据恢复</td><td>一个5250元</td><td></td></tr>
          <tr><td>数据库一致性检验鉴定</td><td>一对6300元</td><td></td></tr>
          <tr><td>其他电子数据检验鉴定</td><td>1MB7.5元</td><td>包括网络数据包等。</td></tr>
          <tr><td>密码破解</td><td>一个2250元</td><td></td></tr>
          <tr><td>现场数据获取</td><td>1GB12元</td><td></td></tr>
          <tr><td>网络数据获取</td><td>接入一小时390元</td><td></td></tr>
          <tr><td>光盘朔源检验</td><td>一片900元</td><td></td></tr>
          <tr><td>光盘刻录机检验</td><td>一片1200元</td><td></td></tr>
          <tr><td>电子物证鉴定文证复审</td><td>一例1800元</td><td></td></tr>
        </tbody>`
      $('#table').html(html10)
      break;
    case '声像资料类/声像资料鉴定':
      let html11 = `<tbody>
          <tr><th width="20%">收费项目</th><th width="20%">基准价(元)</th><th width="40%">备注</th></tr>
          <tr><td>录音资料中话者同一认定</td><td>一人3300元</td><td></td></tr>
          <tr><td>录音资料辨识</td><td>一件1800元</td><td>按每20分钟计收。</td></tr>
          <tr><td>录音资料的真实性完整性鉴定</td><td>一件3000元</td><td>按每20分钟计收。</td></tr>
          <tr><td>录音资料的降噪处理</td><td>一件2700元</td><td>按每20分钟计收。</td></tr>
          <tr><td>语音分析检验</td><td>一件1200元</td><td>按每20分钟计收。</td></tr>
          <tr><td>录音器材检验</td><td>一件900元</td><td></td></tr>
          <tr><td>录像资料同一性认定</td><td>一件3300元</td><td></td></tr>
          <tr><td>录像资料辨识</td><td>一件1350元</td><td></td></tr>
          <tr><td>录像资料的真实性完整性鉴定</td><td>一件2250元</td><td>按每20分钟计收。</td></tr>
          <tr><td>录像资料的模糊图像处理</td><td>一件2700元</td><td></td></tr>
          <tr><td>图片资料同一性认定</td><td>一件2700元</td><td></td></tr>
          <tr><td>图片资料辨识</td><td>一件1200元</td><td></td></tr>
          <tr><td>图片资料的真实性完整性鉴定</td><td>一件2250元</td><td></td></tr>
          <tr><td>图片资料的模糊图像处理</td><td>一件1500元</td><td></td></tr>
          <tr><td>人像鉴定</td><td>一件1200元</td><td></td></tr>
          <tr><td>特种光学技术检验</td><td>一件750元</td><td></td></tr>
          <tr><td>多(超)光谱检验</td><td>一件1200元</td><td></td></tr>
          <tr><td>计算机人像组合</td><td>一件750元</td><td></td></tr>
          <tr><td>手工模拟画像</td><td>一件1200元</td><td></td></tr>
          <tr><td>手工雕塑复原头像</td><td>一件3000元</td><td></td></tr>
          <tr><td>计算机模拟复原头像</td><td>一件1500元</td><td></td></tr>
          <tr><td>声像资料鉴定文证复审</td><td>一件1800元</td><td></td></tr>
        </tbody>`
      $('#table').html(html11)
      break;
    default:
      break;
  }
}
//公证
function gongzheng() {
  let leibie = $('#leibie1').val()
  let value = $('#Subject3').val()
  let value2 = ''

  if (leibie == '证明法律行为/证明土地使用权、房屋、股权等出让、转让、买卖') {
    if (!value) {
      openToast("请填写标的", "warn")
      return false
    }
    if (value <= 500000) {
      value2 = value * 0.003 > 200 ? value * 0.003 : 200
    } else if (value > 500000 && value <= 5000000) {
      value2 = 1500 + (value - 500000) * 0.0025
    } else if (value > 5000000 && value <= 10000000) {
      value2 = 12750 + (value - 5000000) * 0.002
    } else if (value > 10000000 && value <= 20000000) {
      value2 = 22750 + (value - 10000000) * 0.0015
    } else if (value > 20000000 && value <= 50000000) {
      value2 = 37750 + (value - 20000000) * 0.001
    } else if (value > 50000000 && value <= 100000000) {
      value2 = 67750 + (value - 50000000) * 0.0005
    } else if (value > 100000000) {
      value2 = 92750 + (value - 100000000) * 0.0001
    }
  } else if (leibie == '证明法律行为/证明其他经济合同') {
    if (!value) {
      openToast("请填写标的", "warn")
      return false
    }
    if (value <= 20000) {
      value2 = value * 0.01
    } else if (value > 20000 && value <= 50000) {
      value2 = 200 + (value - 20000) * 0.08
    } else if (value > 50000 && value <= 100000) {
      value2 = 2600 + (value - 50000) * 0.06
    } else if (value > 100000 && value <= 500000) {
      value2 = 5600 + (value - 100000) * 0.05
    } else if (value > 500000 && value <= 1000000) {
      value2 = 25600 + (value - 500000) * 0.04
    } else if (value > 1000000 && value <= 2000000) {
      value2 = 45600 + (value - 1000000) * 0.03
    } else if (value > 2000000 && value <= 3000000) {
      value2 = 75600 + (value - 2000000) * 0.02
    } else if (value > 3000000 && value <= 4000000) {
      value2 = 95600 + (value - 3000000) * 0.01
    } else if (value > 4000000) {
      value2 = 105600 + (value - 4000000) * 0.005
    }
  } else if (leibie == '提存公证/提存公证' || leibie == '赋予债权文书具有强制执行效力/赋予债权文书具有强制执行效力') {
    if (!value) {
      openToast("请填写标的", "warn")
      return false
    }
    value2 = value * 0.003 > 100 ? value * 0.003 : 100
  } else if (leibie == '证明法律行为/证明民事协议（不涉及财产)' || leibie == '证明有法律意义的文书/证明其他有法律意义的文书') {
    value2 = 100
  } else if (leibie == '证明法律行为/证明民事协议（涉及财产)' || leibie == '证明有法律意义的事实/证明不可抗力事件' || leibie == '证明有法律意义的事实/其他物证保全' || leibie == '证明有法律意义的事实/制作票据拒绝证书') {
    value2 = 400
  } else if (leibie == '证明法律行为/证明收养关系.生父母单方送养' || leibie == '证明有法律意义的事实/证明法人和其他组织的资格、资信' || leibie == '证明有法律意义的文书/证明知识产权的享有、转让和使用许可文书' || leibie == '证明有法律意义的文书/证证明法人等的授权委托书、公司章程、会议决议等' || leibie == '其他民事法律行为的设立、变更、终止/公证监督类.商品抽样检测') {
    value2 = 500
  } else if (leibie == '证明法律行为/证明收养关系.其他监护人送养' || leibie == '证明有法律意义的事实/不动产保全' || leibie == '证明有法律意义的事实/侵权行为和事实证据保全' || leibie == '其他民事法律行为的设立、变更、终止/公证监督类.拍卖' || leibie == '其他民事法律行为的设立、变更、终止/公证监督类.评奖、开奖类公证') {
    value2 = 1000
  } else if (leibie == '证明法律行为/证明收养关系.其他监护人送养' || leibie == '证明有法律意义的事实/声像资料、电脑软件保全') {
    value2 = 800
  } else if (leibie == '证明法律行为/证明财产继承、赠与和遗赠') {
    if (!value) {
      openToast("请填写标的", "warn")
      return false
    }
    value2 = value * 0.02 > 200 ? value * 0.02 : 200
  } else if (leibie == '证明有法律意义的事实/证明出生、生存、死亡、身份、经历、学历、国籍等' || leibie == '证明有法律意义的事实/证明婚姻状况、亲属关系、未受(受过)刑事处分等') {
    value2 = 80
  } else if (leibie == '遗嘱相关/清点遗产') {
    value2 = '300 ― 1000'
  } else if (leibie == '遗嘱相关/确认遗嘱效力') {
    if (!value) {
      openToast("请填写标的", "warn")
      return false
    }
    value2 = value * 0.015 > 200 ? value * 0.015 : 200
  } else if (leibie == '遗嘱相关/保管遗产' || leibie == '其他/与公证事项相关的登记代办费') {
    value2 = 300
  } else if (leibie == '证明对财产的清点、清算、评估和估损/证明对财产的清点、清算.公民') {
    value2 = "500 - 1000"
  } else if (leibie == '证明对财产的清点、清算、评估和估损/证明对财产的清点、清算.法人') {
    value2 = "1000 - 2000"
  } else if (leibie == '证明对财产的清点、清算、评估和估损/证明对财产的评估、估损.公民') {
    value2 = 500
  } else if (leibie == '证明对财产的清点、清算、评估和估损/证明对财产的评估、估损.法人') {
    value2 = 1000
  } else if (leibie == '其他民事法律行为的设立、变更、终止/公证监督类.招、投标') {
    value2 = 3000
  } else if (leibie == '其他/与公证事项相关的登记代办费') {
    value2 = 50
  } else if (leibie == '其他/公证书副本.无译文的副本') {
    value2 = 10
  } else if (leibie == '其他/公证书副本.有译文的副本') {
    value2 = '公证书翻译费每千字收费60'
  } else {
    value2 = 200
  }

  let html = `<tbody>
    <tr><th width="50%">费用类别</th><th width="50%">金额</th></tr>
    <tr><td>公证费</td><td>${value2}元</td></tr>
  </tbody>`
  $('#table').html(html)
  $('#table').addClass('table')
}
//仲裁
function zhongcai() {
  let lx = $('#province4').val()
  let value = $('#Subject4').val()
  let value2 = ''
  if (!value) {
    openToast("请填写标的", "warn")
    return false
  }
  if (lx == '案件受理费') {
    if (value <= 1000) {
      value2 = 100
    } else if (value > 1000 && value <= 50000) {
      value2 = 100 + (value - 1000) * 0.05
    } else if (value > 50000 && value <= 100000) {
      value2 = 2550 + (value - 50000) * 0.04
    } else if (value > 100000 && value <= 200000) {
      value2 = 4550 + (value - 100000) * 0.03
    } else if (value > 200000 && value <= 500000) {
      value2 = 7550 + (value - 200000) * 0.02
    } else if (value > 500000 && value <= 1000000) {
      value2 = 13550 + (value - 500000) * 0.01
    } else if (value > 1000000) {
      value2 = 18550 + (value - 1000000) * 0.005
    }
  } else {
    if (value <= 200000) {
      if (value * 0.01 < 2000) {
        value2 = '最低收费基数为：双方均在上海的1000元，一方在外地的1500元，双方均在外地的2000'
      } else {
        value2 = value * 0.01
      }

    } else if (value > 200000 && value <= 500000) {
      value2 = 2000 + (value - 200000) * 0.0075
    } else if (value > 500000 && value <= 1000000) {
      value2 = 4250 + (value - 500000) * 0.04
    } else if (value > 1000000) {
      value2 = 6250 + (value - 1000000) * 0.03
    }
  }
  let html = `<tbody>
    <tr><th width="50%">费用类别</th><th width="50%">金额</th></tr>
    <tr><td>仲裁费</td><td>${value2}元</td></tr>
  </tbody>`
  $('#table').html(html)
  $('#table').addClass('table')
}
//房屋贷款
$('#province5').change(function () {
  let val = $(this).val()
  if (val == '公积金贷款') {
    $('#Subject5-3').hide()
    $('#Subject5-4').hide()
    // $('.dk-2').hide()
    $('#Subject5-2').val('3.25')
  } else if (val == '商业贷款') {
    $('#Subject5-3').hide()
    $('#Subject5-4').show()
    $('#Subject5').hide()
    // $('#dk-2').show()
    // $('#dk-2').value('100')
    $('#Subject5-2').val('4.9')
  } else {
    // $('#dk-2').show()
    $('#Subject5-3').show()
    $('#Subject5-4').show()
    $('#Subject5-2').val('3.25')
    $('#Subject5-3').val('4.9')
    // $('#dk-2').value('100')
  }
})
function daikuang() {
  let val = $('#province5').val() //贷款类型
  let val2 = $('#Subject5').val() * 10000//本金
  let val3 = $('#Subject5-1').val() * 12 //期限
  let html = ''
  if (val == '公积金贷款' || val == '商业贷款') {
    let lilv = $('#Subject5-2').val() / 100 //年利率
    //等额本息
    let value = [val2 * (lilv / 12) * (1 + lilv / 12) ** val3] / [(1 + lilv / 12) ** val3 - 1]
    //等额本金
    let value2 = (val3 + 1) * val2 * (lilv / 12) / 2
    html = `
      <tbody >
        <tr><th width="50%">等额本金</th><th width="50%"></th></tr>
        <tr><td>还款月数</td><td>${val3}</td></tr>
        <tr><td>总支付利息(元)</td><td>${value2.toFixed(2)}</td></tr>
        <tr><td>本息合计(元)</td><td>${(value2 + val2).toFixed(2)}</td></tr>
        <tr><th width="50%">等额本息</th><th width="50%"></th></tr>
        <tr><td>每月还款</td><td>${value.toFixed(2)}</td></tr>
        <tr><td>还款月数</td><td>${val3}</td></tr>
        <tr><td>总支付利息(元)</td><td>${(value * val3 - val2).toFixed(2)}</td></tr>
        <tr><td>本息合计(元)</td><td>${(value * val3).toFixed(2)}</td></tr>
      </tbody>
    `
    $('#table').html(html)
    $('#table').addClass('table')
  }
  //  else if (val == '商业贷款') {

  // } 
  else {
    let val4 = $('#Subject5-4').val() * 10000  //商业贷款本金
    let lilv = $('#Subject5-2').val() / 100 //年利率
    let live2 = $('#Subject5-3').val() / 100 //年利率
    //等额本息
    let value = [val2 * (lilv / 12) * (1 + lilv / 12) ** val3] / [(1 + lilv / 12) ** val3 - 1] + [val4 * (live2 / 12) * (1 + live2 / 12) ** val3] / [(1 + live2 / 12) ** val3 - 1]
    //等额本金
    let value2 = (val3 + 1) * val2 * (lilv / 12) / 2 + (val3 + 1) * val4 * (live2 / 12) / 2
    html = `
      <tbody >
        <tr><th width="50%">等额本金</th><th width="50%"></th></tr>
        <tr><td>还款月数</td><td>${val3}</td></tr>
        <tr><td>总支付利息(元)</td><td>${value2.toFixed(2)}</td></tr>
        <tr><td>本息合计(元)</td><td>${(value2 + val2 + val4).toFixed(2)}</td></tr>
        <tr><th width="50%">等额本息</th><th width="50%"></th></tr>
        <tr><td>每月还款</td><td>${value.toFixed(2)}</td></tr>
        <tr><td>还款月数</td><td>${val3}</td></tr>
        <tr><td>总支付利息(元)</td><td>${(value * val3 - (val2 + val4)).toFixed(2)}</td></tr>
        <tr><td>本息合计(元)</td><td>${(value * val3).toFixed(2)}</td></tr>
      </tbody>
    `
    $('#table').html(html)
    $('#table').addClass('table')
  }
}
//拍卖
function paimai() {
  let val = $('#Subject6').val() //标的
  let value = 0
  if (val <= 2000000) {
    value = val * 0.05
  } else if (val > 2000000 && val <= 10000000) {
    value = 100000 + (val - 2000000) * 0.03
  } else if (val > 10000000 && val <= 50000000) {
    value = 340000 + (val - 10000000) * 0.02
  } else if (val > 50000000 && val <= 100000000) {
    value = 1140000 + (val - 100000) * 0.01
  } else if (val > 100000000) {
    value = 1640000 + (val - 100000000) * 0.005
  }
  let html = `<tbody>
    <tr><th width="50%">费用类别</th><th width="50%">金额</th></tr>
    <tr><td>拍卖佣金</td><td>${value}元</td></tr>
  </tbody>`
  $('#table').html(html)
  $('#table').addClass('table')

}
//工伤赔偿
function yiliao() {
  let value1 = parseInt($('#Subject7-4').val())
  let value2 = parseInt($('#Subject7-5').val())
  let value3 = $('#Subject7-6').val() //停工留薪天数
  let value4 = $('#Subject7-2').val() //月平均工资
  let value5 = Number($('#Subject7-1').val()) //伤残级别
  let value6 = 0
  let value7 = value4 / 30 * value3 //误工费
  let value8 = 0 //月补助津贴
  switch (value5) {
    case 1:
      value6 = 27 * value4
      value8 = 0.9 * value4
      break;
    case 2:
      value6 = 25 * value4
      value8 = 0.85 * value4
      break
    case 3:
      value6 = 23 * value4
      value8 = 0.8 * value4
      break
    case 4:
      value6 = 21 * value4
      value8 = 0.75 * value4
      break
    case 5:
      value6 = 18 * value4
      value8 = 0.7 * value4
      break
    case 6:
      value6 = 16 * value4
      value8 = 0.6 * value4
      break
    case 7:
      value6 = 13 * value4
      break
    case 8:
      value6 = 11 * value4
      break
    case 9:
      value6 = 9 * value4
      break
    case 10:
      value6 = 7 * value4
      break
    case 11:
      value6 = 49300 * 20
      break
    default:
      break;
  }
  let value = value1 + value2 + value6 + value7
  let html = `<tbody>
  <tr><th width="50%">费用类别</th><th width="50%">金额</th></tr>
  <tr><td>医疗费用</td><td>${value1}元</td></tr>
  <tr><td>辅助器材费</td><td>${value2}元</td></tr>
  <tr><td>医赔偿费用</td><td>${value6}元</td></tr>
  <tr><td>伤残津贴/月</td><td>${value8}元</td></tr>
  <tr><td>总计</td><td>${value}元</td></tr>
</tbody>`
  $('#table').html(html)
  $('#table').addClass('table')
}
//房产分割
function fangchan() {
  let value1 = $('#Subject8-1').val() //结婚时房产价格
  let value2 = $('#Subject8-2').val() //离婚时房产价格
  let value3 = $('#Subject8-3').val() //共同已还利息
  let value4 = $('#Subject8-4').val() //契税等其他费用
  let value5 = $('#Subject8-5').val() //共同还贷部分
  let html = `<tbody>
  <tr><td>房产的升值率（%）</td><td>${33}%</td></tr>
  <tr><td>婚后增值金额（万）</td><td>${33.33}</td></tr>
</tbody>`
  $('#table').html(html)
  $('#table').addClass('table')
}
//违约金
function weiyue() {
  let html = `<tbody>
    <tr><td>逾期期限</td><td>${365}天</td></tr>
    <tr><td>利率</td><td>${0.000139}每天</td></tr>
    <tr><td>违约金</td><td>${50874.00}元</td></tr>
  </tbody>`
  $('#table').html(html)
  $('#table').addClass('table')
}