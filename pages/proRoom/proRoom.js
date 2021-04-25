// pages/proRoom/proRoom.js
const order = ['demo1', 'demo2', 'demo3']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [],
    selectDay: "",
    listData: [{
        "time": "08:00-10:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "10:00-12:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "12:00-14:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "14:00-16:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "16:00-18:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "18:00-20:00",
        "status": "",
        "operate": ""
      },
      {
        "time": "20:00-22:00",
        "status": "",
        "operate": ""
      }
    ],
    roomId: 0
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = []
    for (let i = 0; i < 7; i++) {
      arr.push(this.dealTime(i))
    }
    this.setData({
      days: arr,
      roomId: options.itemId,
      selectDay: this.dealTime(0).newday
    })
    this.getState(options.itemId, this.dealTime(0).newday)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
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
  onShareAppMessage: function () {},
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
      if (minute < 10) {
        minute = "0" + minute
      }
      if (hour < 10) {
        hour = "0" + hour
      }
      nowDate = hour + ":" + minute
    }
    wx.request({
      url: getApp().globalData.requestUrl + "/subscribeHistory/getByRoomIdAndDay",
      data: {
        roomId: roomId,
        day: day
      },
      success: function (res) {
        let listData = self.data.listData
        listData.forEach(function (list, index) {
          let msg = ""
          res.data.forEach(function (history, index) {
            if (self.data.selectDay == self.dealTime(0).newday && list.time.split("-")[0] <= nowDate && list.time.split("-")[1] >= nowDate && history.status == '未预约') {
              msg = "开门";
            }
            if (history.status == "已预约" && list.time == history.subscribeTime&&self.data.selectDay==history.day) {
              msg = "已预约";
            }
            if (self.data.selectDay == self.dealTime(0).newday && list.time == history.subscribeTime) {
              if (getApp().globalData.userInfo.id == history.userId&&list.time.split("-")[0] <= nowDate && list.time.split("-")[1] >= nowDate) {
                msg = "自己开门"
              } else if (list.time == history.subscribeTime && self.data.selectDay == history.day && history.status == "已预约") {
                msg = "已预约";
              } else {
                //msg = "已预约";
              }
            }
          })
          if (self.data.selectDay == self.dealTime(0).newday && list.time.split("-")[1] <= nowDate) {
            msg = "过时";
          }
          if (msg == "已预约") {
            list.status = "已被预约"
            list.operate = ""
          }
          if (msg == "过时") {
            list.status = "过时"
            list.operate = ""
          }
          if (msg == "开门") {
            list.status = "开门"
            list.operate = "开门"
          }
          if (msg == "") {
            list.status = "未预约"
            list.operate = "预约"
          }
          if (msg == "自己开门") {
            list.status = "已开门"
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
    let subscribeTime = e.currentTarget.dataset.subscribetime;
    let operate = e.currentTarget.dataset.operate;
    let self = this;
    if (e.currentTarget.dataset.operate == "预约") {
      wx.request({
        url: getApp().globalData.requestUrl + "/subscribeHistory/insert",
        data: {
          day: this.data.selectDay,
          subscribeTime: subscribeTime,
          roomId: this.data.roomId,
          status: "已预约",
          userId: getApp().globalData.userInfo.id
        },
        success: function (res) {
          self.getState(self.data.roomId, self.data.selectDay)
        }
      })
    }
    if (e.currentTarget.dataset.operate == "开门") {
      wx.request({
        url: getApp().globalData.requestUrl + "/subscribeHistory/insert",
        data: {
          day: this.data.selectDay,
          subscribeTime: subscribeTime,
          roomId: this.data.roomId,
          status: "开门",
          userId: getApp().globalData.userInfo.id
        },
        success: function (res) {
          self.getState(self.data.roomId, self.data.selectDay)
        }
      })
    }

    if (operate == "开门") {
      wx.request({
        url: getApp().globalData.requestUrl + "/meetingRoom/getById",
        data: {
          id: this.data.roomId
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
  }
})