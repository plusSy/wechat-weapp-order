var app = getApp();
Page({
  data: {
    addressInfo:'',
    choose:'order'
  },
  addrss:function(){
    var choose = this.data.choose;
    console.log('..................'+choose);
    wx.redirectTo({
      url: '../address/index?choose=' + choose,
    })
  },
  chooseAddress: function (event){
    var data = event.currentTarget.dataset;
    var id = data.id;
    console.log(id);
    wx.redirectTo({
      url: '../checkout/checkout?id=' + id,
    })
  },
  getDz: function () {
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/We/getdzxi',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session: session,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          addressInfo: res.data
        });
      }
    })
  },
  onLoad:function(){
    var that = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("登录未过期");
        var session = wx.getStorageSync('3rd_session');
        console.log(session);
        if (!session) {
          getApp().login();
          // wx.login() //重新登录
        }
      },
      fail: function () {
        console.log("登录态过期");
        getApp().login(); //重新登录
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight-37
        })
      }
    })
    
  },
  onShow:function(){
    this.getDz();
  }
})