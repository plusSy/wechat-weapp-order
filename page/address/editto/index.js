var app = getApp();
Page({
  data: {
      address:'',
      webUrl: app.globalData.webUrl,
      id:'',
      info:'',
      choose:''
  },
  getMaddress:function(){
    var that = this;
    wx.request({
      url: app.globalData.webUrl + '/Home/We/dzidxx',
      data: {
        id:this.data.id
      },
      success: function (res) {
          that.setData({
              info:res.data
          })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var val = e.detail.value;
    var session = wx.getStorageSync('3rd_session');
    if (val.name != '') {
      if (val.tel != '') {
        if (val.address != '') {
          wx.request({
            url: app.globalData.webUrl + '/Home/We/dzidxg',
            data: {
              session: session,
              username: val.name,
              mobile: val.tel,
              address: val.address,
              id:this.data.id
            },
            success: function (res) {
              if (res.data == 'ok') {
                console.log(that.data.choose);
                if (that.data.choose=='order') {
                  wx.redirectTo({
                    url: '../../choose/index',
                  })
                } else {
                  wx.redirectTo({
                    url: '../index',
                  })
                }

              } else {
                wx.showToast({
                  title: "修改地址失败",
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: "详细地址不能为空",
            showCancel: false,
            confirmText: "确定"
          })
        }
      }
      else {
        wx.showModal({
          title: "联系方式不能为空",
          showCancel: false,
          confirmText: "确定"
        })
      }
    } else {
      wx.showModal({
        title: "收货人姓名不能为空",
        showCancel: false,
        confirmText: "确定"
      })
    }


  },
  onLoad:function(options){
    this.data.id = options.id;
    var choose = options.choose;
    this.setData({
      choose: choose
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
    this.getMaddress();
  }
  
})