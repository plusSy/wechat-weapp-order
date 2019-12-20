var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yuyuelist:'',
    windowHeight:''
  },
  onLoad: function (options) {
    var session = wx.getStorageSync('3rd_session');
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight - 37
        })
      }
    })
    var that = this;
    wx.request({
      url: 'https://www.webjava.cn/Home/Wepay/getyuyue',
      data: {session:session},
      header: {'content-type': 'application/json'},
      success: function(res) {
        that.setData({
          yuyuelist:res.data,
        })
      },
      fail: function(res) {
        console.log("请求失败")
      },
      complete: function(res) {},
    })
  
  },
  // subscribe:function () {
  //   console.log(111111);
  //   wx.redirectTo({
  //     url: '../yuyue/yuyue'
  //   })
  // },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  }
})