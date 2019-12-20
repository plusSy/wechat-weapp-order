var app = getApp();
Page({
  data: {
      address:'',
      webUrl: app.globalData.webUrl,
      switchTab:'true',
      choose:''
  },
  onLoad:function(options){
    var choose = options.choose;
    console.log(11111);
    console.log(choose);
    this.setData({
      choose:choose
    })
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
  },
  checkboxChange: function (e) {
    this.setData({
      switchTab : e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var val = e.detail.value;
    var session = wx.getStorageSync('3rd_session');
    if (val.name!=''){
      if (val.tel != '') {
        if (val.address != '') {
          wx.request({
            url: app.globalData.webUrl + '/Home/We/getdz',
            data: {
              session: session,
              username: val.name,
              mobile: val.tel,
              address: val.address,
              checked: that.data.switchTab
            },
            success: function (res) {
              if (res.data == 'ok') {
                console.log(res.data);
                if (that.data.choose=='order'){
                  wx.redirectTo({
                    url: '../../checkout/checkout',
                  })
                }
                if (!that.data.choose) {
                  wx.redirectTo({
                    url: '../index',
                  })
                }
                

              } else {
                wx.showToast({
                  title: "保存地址失败",
                  duration: 2000
                })
              }
            }
          })
        }else{
          wx.showModal({
            title: "您的详细地址还没填呢",
            showCancel: false,
            confirmText: "确定"
          })
        }
      }
      else {
        wx.showModal({
          title: "您的联系方式还没填呢",
          showCancel: false,
          confirmText: "确定"
        })
      }
    } else {
      wx.showModal({
        title: "您的收货人姓名还没填呢",
        showCancel: false,
        confirmText: "确定"
      })
    }
      
    
  }
})