var app = getApp();
Page({
  data: {
    addressInfo:'',
    choose:''
  },
  addrss:function(){
    var choose = this.data.choose;
    wx.redirectTo({
      url: './addto/index?choose='+ choose,
    })
  },
  bindAgreeChange: function (event) {
    var that = this;
    var data = event.currentTarget.dataset;
    var session = wx.getStorageSync('3rd_session');
     wx.request({
       url: app.globalData.webUrl + '/Home/We/scmr',
       data: {
         id: data.id,
         session: session
       },
       success: function (res) {
         console.log(res);
         if (res.data == 'ok') {
           that.getDz();
         }
       }
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
   deleteAddress:function(event){
      var that = this;
      var data = event.currentTarget.dataset;
      var session = wx.getStorageSync('3rd_session');
      wx.showModal({
        title: '确定删除该地址吗？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.webUrl + '/Home/We/scdzxi',
              data: {
                id: data.id,
                session:session
              },
              success: function (res) {
                console.log(res);
                if (res.data == 'ok') {
                  
                  if (that.data.choose=='order') {
                    wx.redirectTo({
                      url: '../choose/index',
                    })
                  } else {
                    that.getDz();
                  }
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
   },
  
  onLoad:function(options){
    var that = this;
    var choose = options.choose;
    console.log(1111111);
    console.log(choose);
    if (typeof (choose) != "undefined"){
      this.setData({
        choose:choose
      })
    }
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
    this.getDz();
  }
})