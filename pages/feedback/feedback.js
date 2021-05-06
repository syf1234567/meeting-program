// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submit: function (e) {
    if (e.detail.value.contact == "") {
      wx.showToast({
        title: "联系号码没填",
        icon: 'error',
        duration: 2000
      })
    } else if (e.detail.value.content == "") {
      wx.showToast({
        title: "问题未填",
        icon: 'error',
        duration: 2000
      })
    } else {
      wx.request({
        url: getApp().globalData.requestUrl + "/feedback/insert",
        data: {
          userId: getApp().globalData.userInfo.id,
          content: e.detail.value.content,
          contact: e.detail.value.contact
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})