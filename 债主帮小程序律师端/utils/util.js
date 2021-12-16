const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//手机号码验证
function checkPhone(phone) {
  let reg = /^1[3|4|5|7|8]\d{9}$/;
  return reg.test(phone);
}
//电子邮箱验证
function checkEmail(email) {
  // let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
  let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
  return reg.test(email);
}
//身份证验证
function checkIdCard(IdCard) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(IdCard);
}
module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  checkEmail: checkEmail,
  checkIdCard: checkIdCard
}
