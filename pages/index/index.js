// index.js
// 获取应用实例
const app = getApp()
const requestUrl = "http://127.0.0.1:8080/api"
Page({
  data: {
    navbar: ['可预约的', '我预约的'],
    currentTab: 0,
    allRoom: [],
    myRoom: []
  },
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    let self = this
    if (e.currentTarget.dataset.idx == 1) {
      wx.request({
        url: app.globalData.requestUrl + "/meetingRoom/getByUserId",
        data: {
          userId: getApp().globalData.userInfo.id,
          day: this.dealTime(0).newday
        },
        success: function (res) {
          self.setData({
            myRoom: res.data
          })
        }
      })
    }
  },
  getMyPro: function () {
    let self = this
    wx.request({
      url: getApp().globalData.requestUrl + "/meetingRoom/getByUserId",
      data: {
        userId: getApp().globalData.userInfo.id,
        day: this.dealTime(0).newday
      },
      success: function (res) {
        self.setData({
          myRoom: res.data
        })
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
  proDistail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?itemId=' + e.currentTarget.dataset.item.id
    })
  },
  onLoad() {
    let self = this
    wx.request({
      url: getApp().globalData.requestUrl + "/meetingRoom/getAll",
      success: function (res) {
        let allRoom = res.data;
        self.setData({
          allRoom: allRoom
        })
      }
    })
  },
  onShow: function () {
    if (getApp().globalData.userInfo.id != undefined) {
      this.getMyPro()
    }
  },
  proRoomButton(e) {
    wx.navigateTo({
      url: '/pages/proRoom/proRoom?itemId=' + e.currentTarget.dataset.item.id
    })
  }

})