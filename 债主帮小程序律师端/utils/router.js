// router.js
module.exports = {
  navigateTo(object) {
    if (getCurrentPages().length > 9) {
      this.redirectTo(object)
      // this.reLaunch(object)
      // wx.navigateTo(object)
    } else {
      wx.navigateTo(object)
    }
  },
  // 其他跳转不处理
  navigateBack(object) {
    if (getCurrentPages().length == 1) {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    } else {
      wx.navigateBack(object)
    }

  },
  switchTab(object) {
    wx.switchTab(object)
  },
  redirectTo(object) {
    wx.redirectTo(object)
  },
  reLaunch(object) {
    wx.reLaunch(object)
  },
}
