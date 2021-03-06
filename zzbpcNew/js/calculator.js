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
  //??????
  $('#start').click(function () {
    switch (index) {
      case 0: //???????????????
        let value = $('#Subject').val()
        let type = $('#litigationType').val()
        if (type == '????????????') {
          $('#Acceptance').text(propertyCompute(value) + '???')
        } else if (type == '????????????') {
          $('#Acceptance').text(divorce(value))
        } else if (type == '??????????????????') {
          $('#Acceptance').text(personality(value))
        } else if (type == '??????????????????') {
          $('#Acceptance').text(knowledge(value))
        } else if (type == '??????????????????') {
          $('#Acceptance').text(labour(value))
        } else if (type == '????????????????????????????????????') {
          $('#Acceptance').text(patent(value))
        } else if (type == '??????????????????') {
          $('#Acceptance').text(other(value))
        } else if (type == '??????????????????????????????') {
          $('#Acceptance').text(administer(value))
        }
        $('#Preservation').text(PreservationCompute(value) + '???')
        $('#implement').text(executeCompute(value) + '???')
        break;
      case 1:
        let value2 = $('#Subject2').val()
        let type2 = $('#litigationType2').val()
        let province = $('#province').val()
        if (type2 == '????????????') {
          $('#Acceptance2').text(civil(value2, province))
        }
        else if (type2 == '????????????') {
          $('#Acceptance2').text(civil(value2, province))
        }
        break;
      case 2:
        let type3 = $('#Interest').val()
        let principal = $('#principal').val() //??????
        let Magnification = $('#Magnification').val() //??????
        let startTime1 = $('#startTime').val() //????????????
        let startTime12 = $('#startTime2').val() //????????????2
        let endTime1 = $('#endTime').val() //????????????1
        let endTime2 = $('#endTime2').val() //????????????2
        let other = $('#other').val() //????????????
        if (type3 == 'LPR') {
          if (principal == '') {
            openToast("????????????", "warn")
            return false
          }
          if (startTime1 == '' || startTime12 == '') {
            openToast("?????????????????????", "warn")
            return false
          }
          if (endTime1 != '' && endTime2 != '') {
            $('#yanchi').text(delay(principal, endTime1, endTime2) + "???")
          }
          $('#lixi').text(interest(principal, Magnification, startTime1, startTime12) + "???")
          $('#zong').text(parseInt(interest(principal, Magnification, startTime1, startTime12)) + (parseInt(delay(principal, endTime1, endTime2)) || 0) + (parseInt(other) || 0) + parseInt(principal) + '???')
        }
        break;
      default:
        break;
    }
  })
  //???????????????????????????
  function propertyCompute(val) {
    let value = 50 //??????????????????
    if (val > 10000) { //???????????????10????????????
      value += ((val > 100000 ? 100000 : val) - 10000) * 0.025
    }
    if (val > 100000) { //??????10??????20????????????
      value += ((val > 200000 ? 200000 : val) - 100000) * 0.02
    }
    if (val > 200000) {//??????20??????50????????????
      value += ((val > 500000 ? 500000 : val) - 200000) * 0.015
    }
    if (val > 500000) {//??????50??????100????????????
      value += ((val > 1000000 ? 1000000 : val) - 500000) * 0.01
    }
    if (val > 1000000) {//??????100??????200????????????
      value += ((val > 2000000 ? 2000000 : val) - 1000000) * 0.009
    }
    if (val > 2000000) {//??????200??????500????????????
      value += ((val > 5000000 ? 5000000 : val) - 2000000) * 0.008
    }
    if (val > 5000000) {//??????500??????1000????????????
      value += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.007
    }
    if (val > 10000000) {//??????1000??????2000????????????
      value += ((val > 20000000 ? 20000000 : val) - 10000000) * 0.006
    }
    if (val > 20000000) {//??????2000????????????
      value += (val - 20000000) * 0.005
    }
    return value.toFixed(2)
  }
  //??????????????????
  function divorce(val) {
    let value = ""
    let value1 = 50
    let value2 = 300
    if (val > 200000) { //???????????????
      value1 += (val - 200000) * 0.005
      value2 += (val - 200000) * 0.005
    }
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '???'
    return value
  }
  //??????????????????
  function personality(val) {
    let value = ""
    let value1 = 100
    let value2 = 500
    if (val > 50000) { //??????5?????????10??????
      value1 += ((val > 100000 ? 100000 : val) - 50000) * 0.01
      value2 += ((val > 100000 ? 100000 : val) - 50000) * 0.01
    }
    if (val > 100000) {
      value1 += (val - 100000) * 0.05
      value2 += (val - 100000) * 0.05
    }
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '???'
    return value
  }
  //????????????????????????
  function knowledge(val) {
    let value = ""
    let value1 = 500
    let value2 = 1000
    let value3 = 50 //??????????????????
    if (val > 10000) { //???????????????10????????????
      value3 += ((val > 100000 ? 100000 : val) - 10000) * 0.025
    }
    if (val > 100000) { //??????10??????20????????????
      value3 += ((val > 200000 ? 200000 : val) - 100000) * 0.02
    }
    if (val > 200000) {//??????20??????50????????????
      value3 += ((val > 500000 ? 500000 : val) - 200000) * 0.015
    }
    if (val > 500000) {//??????50??????100????????????
      value3 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.01
    }
    if (val > 1000000) {//??????100??????200????????????
      value3 += ((val > 2000000 ? 2000000 : val) - 1000000) * 0.009
    }
    if (val > 2000000) {//??????200??????500????????????
      value3 += ((val > 5000000 ? 5000000 : val) - 2000000) * 0.008
    }
    if (val > 5000000) {//??????500??????1000????????????
      value3 += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.007
    }
    if (val > 10000000) {//??????1000??????2000????????????
      value3 += ((val > 20000000 ? 20000000 : val) - 10000000) * 0.006
    }
    if (val > 20000000) {//??????2000????????????
      value3 += (val - 20000000) * 0.005
    }
    value1 += value3
    value2 += value3
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '???'
    return value
  }
  //??????????????????
  function labour(val) {
    value = 10
    return value.toFixed(2)
  }
  //????????????????????????????????????????????????100???
  function patent(val) {
    value = 100
    return value.toFixed(2)
  }
  //??????????????????
  function other(val) {
    value = 50
    return value.toFixed(2)
  }
  //??????????????????????????????
  function administer(val) {
    value = ''
    let value1 = 50
    let value2 = 100
    value = value1.toFixed(2) + "-" + value2.toFixed(2) + '???'
    return value.toFixed(2)
  }
  //???????????????
  function PreservationCompute(val) {
    let value = 30 //??????????????????
    if (val > 1000) { //???????????????10????????????
      value += ((val > 100000 ? 100000 : val) - 1000) * 0.01
    }
    if (val > 100000) { //??????10????????????
      value += (val - 100000) * 0.005
    }
    value = value > 5000 ? 5000 : value
    return value.toFixed(2)
  }
  //???????????????
  function executeCompute(val) {
    let value = 50 //?????????1?????????
    if (val > 10000) { //???????????????50????????????
      value += ((val > 500000 ? 500000 : val) - 10000) * 0.015
    }
    if (val > 500000) { //??????50??????500????????????
      value += ((val > 5000000 ? 5000000 : val) - 500000) * 0.01
    }
    if (val > 5000000) { //??????500??????1000????????????
      value += ((val > 10000000 ? 10000000 : val) - 5000000) * 0.005
    }
    if (val > 10000000) {//??????1000????????????
      value += (val - 10000000) * 0.001
    }
    return value.toFixed(2)
  }
  //??????
  $('#reset').click(function () {
    console.log('??????');
  })
  //????????????
  function civil(val, province) {
    let value = ''
    let value1 = 0
    let value2 = 0
    if (province == '??????') {
      if (val <= 100000) { //??????????????????8%-12%
        value1 += val * 0.08
        value2 += val * 0.12
      }
      if (val > 100000) { //10??????100???
        value1 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.05 + 8000
        value2 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.07 + 12000
      }
      if (val > 1000000) { //100??????1000???
        value1 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.03
        value2 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.05
      }
      if (val > 10000000) { //1000?????????
        value1 += (val - 10000000) * 0.01
        value2 += (val - 10000000) * 0.03
      }
      value = value1 > 3000 ? value1.toFixed(2) + "-" + value2.toFixed(2) + '???' : 3000 + '???'
      return value
    } else if (province == '??????') {
      if (val < 100000) { //??????????????????
        value1 += val * 0.1
      }
      if (val >= 100000) { //10??????100???
        value1 += ((val > 1000000 ? 1000000 : val) - 100000) * 0.06 + 10000
      }
      if (val > 1000000) { //100??????1000???
        value1 += ((val > 10000000 ? 10000000 : val) - 1000000) * 0.04
      }
      if (val > 10000000) { //1000?????????
        value1 += (val - 10000000) * 0.02
      }
      value = value1 > 3000 ? value1.toFixed(2) : 3000 + '???'
      return value
    } else if (province == '??????') {
      if (val <= 50000) { //??????????????????
        value1 += 1000
        value1 += 8000
      }
      if (val > 50000) { //5??????10???
        value1 += ((val > 100000 ? 100000 : val) - 50000) * 0.08 + 1000
        value2 += ((val > 100000 ? 100000 : val) - 50000) * 0.08 + 8000
      }
      if (val > 100000) { //10??????50???
        value1 += ((val > 500000 ? 500000 : val) - 100000) * 0.05
        value2 += ((val > 500000 ? 500000 : val) - 100000) * 0.05
      }
      if (val > 500000) { //50??????100???
        value1 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.04
        value2 += ((val > 1000000 ? 1000000 : val) - 500000) * 0.04
      }
      if (val > 50000000) { //5000?????????
        value1 += (val - 50000000) * 0.005
        value2 += (val - 50000000) * 0.005
      }
      value = value1.toFixed(2) + "-" + value2.toFixed(2) + '???'
      return value
    }
  }
  //??????????????????
  function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
  }
  //??????????????????
  var time_range = function (beginTime, endTime, nowTime) {
    if (new Date(Date.parse(nowTime)) >= new Date(Date.parse(beginTime)) && new Date(Date.parse(nowTime)) < new Date(Date.parse(endTime))) {
      return true
    } else {
      return false
    }
  }
  //???????????? ?????????????????????????????????
  function getLilv(day, obj) {
    if (day <= 180) { //???????????????
      return obj.halfYear
    } else if (day > 180 && day <= 360) { //???????????????
      return obj.oneYear
    } else if (day > 360 && day <= 1080) { //???????????????
      return obj.threeYear
    } else if (day > 1080 && day <= 1800) { //???????????????
      return obj.fiveYear
    } else if (day > 1800) {
      return obj.fiveAbove
    }
  }
  //????????????
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
    let html = "<p>???????????????????????????/LPR???</p>"
    lprs.forEach((item, index) => {
      if (index === 0) {
        let days = 0
        //?????????
        if (lprs.length == 1) {
          days = getDaysBetween(startTime1, startTime12)
        } else {
          days = getDaysBetween(startTime1, lprs[index + 1].time)
        }
        let Lx = principal * (getLilv(Math.round(days), item) * 0.01).toFixed(4) * Math.round(days) * Magnification
        lixi += Lx / 360
        html += '<p>(?????? ?? ????????? ?? ?????? ?? ??????)/??????(??????360) = ??????</p>'
      } else if (index + 1 === lprs.length) {
        //??????
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
  //??????????????????
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
//????????????
function GetVal(obj) {
  //????????????????????????index??????
  var index = obj.selectedIndex;
  //??????????????????????????????
  var val = obj.options[index].value;
  //????????????????????????text
  var txt = obj.options[index].text;
  if (txt == '????????????') {
    $('.Criminal').hide()
    $('.Crimina2').show()
  } else {
    $('.Criminal').show()
    $('.Crimina2').hide()
  }
}