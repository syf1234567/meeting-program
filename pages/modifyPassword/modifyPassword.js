// pages/modifyPassword/modifyPassword.js
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
  submit: function (e) {
    let password1 = e.detail.value.password1;
    let password2 = e.detail.value.password2;
    let password3 = e.detail.value.password3;
    if (password2 != password3) {
      wx.showToast({
        title: '新密码前后不一致',
        icon: 'error',
        duration: 2000
      })
    }
    wx.request({
      url: getApp().globalData.requestUrl + "/user/modifyPassword",
      data: {
        id: getApp().globalData.userInfo.id,
        password1: password1,
        password2: password2
      },
      success: function (res) {
        console.log(res);
        if(res.data=="修改成功"){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          // wx.switchTab({
          //   url: '/pages/index/index'
          // });
        }else{
          wx.showToast({
            title: res.data,
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