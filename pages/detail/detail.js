// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    this.setData({
      roomId: options.itemId
    })
    wx.request({
      url: getApp().globalData.requestUrl + "/subscribeHistory/getByUserId",
      data: {
        roomId: options.itemId,
        day: self.dealTime(0).newday
      },
      success: function (res) {
        var arr = []
        for (let i = 0; i < 7; i++) {
          arr.push(self.dealTime(i))
        }
        self.setData({
          days: arr,
          roomId: options.itemId,
          selectDay: self.dealTime(0).newday
        })
        self.getState(options.itemId, self.dealTime(0).newday)
      }
    })
  },

  // 处理未来七天的函数
  dealTime: function (num) { // num：未来天数
    var time = new Date() // 获取当前时间日期
    var date = new Date(time.setDate(time.getDate() + num)).getDate() //这里先获取日期，在按需求设置日期，最后获取需要的
    var month = time.getMonth() + 1 // 获取月份
    var day = time.getDay() //  获取星期
    switch (day) { //  格式化
      case 0:
        day = "(周日)"
        break
      case 1:
        day = "(周一)"
        break
      case 2:
        day = "(周二)"
        break
      case 3:
        day = "(周三)"
        break
      case 4:
        day = "(周四)"
        break
      case 5:
        day = "(周五)"
        break
      case 6:
        day = "(周六)"
        break
    }
    if (date < 10) {
      date = "0" + date
    }
    var obj = {
      date: date,
      day: day,
      month: month,
      newday: month + '-' + date
    }
    return obj // 返回对象
  },
  timeClick: function (e) {
    let selectDay = e.currentTarget.dataset.selectday;
    this.setData({
      selectDay: selectDay
    })
    this.getState(this.data.roomId, selectDay)
  },
  getState: function (roomId, day) {
    let self = this
    let nowDate = ""
    if (day == this.dealTime(0).newday) {
      let date = new Date();
      let hour = date.getHours()
      let minute = date.getMinutes()
      if(hour<10){
        hour = "0"+hour;
      }
      if(minute<10){
        minute = "0"+minute;
      }
      nowDate = hour + ":" + minute
    }
    wx.request({
      url: getApp().globalData.requestUrl + "/subscribeHistory/getByRoomIdAndDay",
      data: {
        roomId: roomId,
        day: day,
        userId: getApp().globalData.userInfo.id
      },
      success: function (res) {
        let listData = res.data
        listData.forEach(function (list, index) {
          let msg = ""
          if (self.data.selectDay == self.dealTime(0).newday  && list.status=="已预约") {
            if(list.subscribeTime.split("-")[1] >= nowDate && list.subscribeTime.split("-")[0] <= nowDate){
              msg = "签到";
            }else if (list.subscribeTime.split("-")[1] <= nowDate){
              msg = "超时";
            }
          }
          if(list.status=="已预约"){
            list.operate = "取消预约"
          }
          if(list.status=="开门"){
            list.status = "可开门"
            list.operate = "开门"
          }
          if (msg == "签到") {
            list.status = "可开门"
            list.operate = "开门"
          }
          if(list.status=="取消预约"){
            list.status = "已取消预约"
            list.operate = ""
          }
          if (msg == "超时") {
            list.status = "已超时"
            list.operate = ""
          }
        })
        self.setData({
          listData: listData
        })
      }
    })
  },
  proButton: function (e) {
    let self = this
    if (e.currentTarget.dataset.operate != "") {
      wx.request({
        url: getApp().globalData.requestUrl + "/subscribeHistory/update",
        data: {
          id: e.currentTarget.dataset.id,
          status: e.currentTarget.dataset.operate
        },
        success: function (res) {
          self.getState(self.data.roomId, self.data.selectDay)
        }
      })
    }
    if(e.currentTarget.dataset.operate == "开门"){
      wx.request({
        url: getApp().globalData.requestUrl + "/meetingRoom/getById",
        data: {
          id: e.currentTarget.dataset.roomid
        },
        success: function (res) {
          wx.request({
            url: 'http://www.jyyltech.com/IOTREST/UserInfoService/OPENAPI/BasicApi/',
            data: {
              ablity: res.data.ablity,
              applictionId: res.data.applictionId,
              applictionSecrit: res.data.applictionSecrit,
              productId: res.data.productId,
              deviceId: res.data.deviceId,
              msg_id: res.data.msgId,
              service: JSON.parse(res.data.service)
            }
          })
        }
      })
    }
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