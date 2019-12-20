App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          that.globalData.rawData = res.rawData;
          that.globalData.signature = res.signature;
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    hasLogin: false,
    userInfo: null,
    rawData:null,
    signature:null,
    webUrl:'https://www.webjava.cn'
    
  },
  login: function () {
    console.log("0000");
    // wx.getUserInfo({
    //   success: function (data) {
    //     console.log("0001");
    //     var userInfo = data.userInfo
    //      var nickName = userInfo.nickName
    //     // var session = wx.getStorageSync('3rd_session');
    //     // if (!session) {
    //       wx.login({
    //         success: function (res) {
    //           console.log("0002");
    //           var code = res.code;
    //           if (code) {

    //             //发起网络请求
    //             wx.request({
    //               url: 'https://www.webjava.cn/Home/We/login/',
    //               data: {
    //                 code: code,
    //                 signature: data.signature,
    //                 rawData: data.rawData,
    //                 encryptedData: data.encryptedData,
    //                 iv: data.iv,
    //                 nickName: userInfo.nickName,
    //                 avatarUrl: userInfo.avatarUrl,
    //                 gender: userInfo.gender

    //               },
    //               success: function (res) {
    //                 wx.setStorageSync('3rd_session', res.data);
    //                 console.log("success");
    //               }
    //             })
    //           } else {
    //             console.log('获取用户登录态失败！' + res.errMsg)
    //           }
    //         }
    //       });
    //     // }
    //   }
    // })
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (data) {
            var userInfo = data.userInfo
            if (code) {
              //发起网络请求
              wx.request({
                url: 'https://www.webjava.cn/Home/We/login/',
                data: {
                  code: code,
                  signature: data.signature,
                  rawData: data.rawData,
                  encryptedData: data.encryptedData,
                  iv: data.iv,
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
                  gender: userInfo.gender

                },
                success: function (res) {
                  wx.setStorageSync('3rd_session', res.data);
                  console.log("success");
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
        
       
      }
    })
  },
})

