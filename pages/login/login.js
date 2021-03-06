// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  registerButton:function(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  submit: function (e) {
    wx.request({
      url: getApp().globalData.requestUrl + "/user/wxLogin",
      data: {
        userName: e.detail.value.name,
        password: e.detail.value.password
      },
      success: function (res) {
        if (res.data.id != undefined) {
          getApp().globalData.userInfo = res.data;
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          wx.showToast({
            title: '账号密码错误',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
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