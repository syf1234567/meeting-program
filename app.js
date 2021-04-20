// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success:function(loginRes){
    //     if(loginRes){
    //       //获取用户信息
    //       wx.getUserInfo({
    //         withCredentials:true,//非必填  默认为true
    //         success:function(infoRes){
    //           //请求服务端的登录接口
    //           wx.request({
    //             url: getApp().globalData.requestUrl+'/user/login',
    //             data:{
    //               code:loginRes.code,//临时登录凭证
    //               rawData:infoRes.rawData,//用户非敏感信息
    //               signature:infoRes.signature,//签名
    //               encrypteData:infoRes.encryptedData,//用户敏感信息
    //               iv:infoRes.iv//解密算法的向量
    //             },
    //             success:function(res){
    //               getApp().globalData.userInfo = res.data;
    //             },
    //             fail:function(error){
    //               //调用服务端登录接口失败
    //              // that.showInfo('调用接口失败');
    //               console.log(error);
    //             }
    //           });
    //         }
    //       });
    //     }else{
     
    //     }
    //   }
    // });
  },
  globalData: {
    userInfo: {},
    requestUrl:"http://127.0.0.1:8080/api"
  }
})
