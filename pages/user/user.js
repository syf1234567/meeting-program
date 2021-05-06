// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') ,// 如需尝试获取用户信息可改为false,
    userInfo:{},
    buttonText:"编辑信息",
    roleList:['老师','学生']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const app = getApp();
      this.setData({
        userInfo:app.globalData.userInfo
      })
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

  },

  exit:function(){
      console.log("退出登录");
      wx.navigateTo({url: '/pages/login/login'})
  },
  modifyPassword:function(){
    wx.navigateTo({url: '/pages/modifyPassword/modifyPassword'})
  },
  feedback:function(){
    wx.navigateTo({url: '/pages/feedback/feedback'})
  },
  userNameInput:function(e){
    this.setData({
      userInfo:{
        id:this.data.userInfo.id,
        userName:e.detail.value,
        openId:this.data.userInfo.openId,
        mobile:this.data.userInfo.mobile,
        role:this.data.userInfo.role,
      }
    })
  },
  mobileInput:function(e){
    this.setData({
      userInfo:{
        id:this.data.userInfo.id,
        userName:this.data.userInfo.userName,
        openId:this.data.userInfo.openId,
        mobile:e.detail.value,
        role:this.data.userInfo.role,
      }
    })
  },
  roleSelect:function(e){
    let text = "";
    if(e.detail.value==0){
      text = "老师"
    }
    if(e.detail.value==1){
      text = "学生"
    }
    console.log(this.data.userInfo);
    console.log(e.detail.value);
    this.setData({
      userInfo:{
        id:this.data.userInfo.id,
        userName:this.data.userInfo.userName,
        openId:this.data.userInfo.openId,
        mobile:this.data.userInfo.mobile,
        role:text
      }
    })
  }
})