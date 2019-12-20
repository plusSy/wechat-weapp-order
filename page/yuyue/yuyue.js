var app = getApp();
Page({
  data: {
    beizhu: '',
    webUrl: app.globalData.webUrl,
    date: "2016-09-01",
    time: "12:01",
  },
  onLoad: function () {
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var val = e.detail.value;
    console.log(val);
    var session = wx.getStorageSync('3rd_session');
    if (val.name != '') {
      if (val.tel != ''){
        if (val.num != '' && val.num != 0){
          wx.request({
            url: 'https://www.webjava.cn/Home/We/tjddyy',
            data: {
              session: session,
              name: val.name,
              date: that.data.date,
              time: that.data.time,
              mobile: val.tel,
              num: val.num,
              beizhu: val.beizhu
            },
            success: function (res) {
              if (res.data == 'ok') {
                console.log("成功");
                wx.showToast({
                  title: "预约成功",
                  duration: 2000
                })
                wx.redirectTo({
                  url: '../wodeyuyue/woyuyue',
                })

              } else {
                wx.showToast({
                  title: "预约失败",
                  duration: 2000
                })
              }
            },
            fail: function () {
              console.log("null")
            }
          })
        } else {
          if (val.num == ''){
            wx.showModal({
              title: "您的用餐人数还没填呢",
              showCancel: false,
              confirmText: "确定"
            })
          } else if (val.num == 0){
            wx.showModal({
              title: "您的用餐人数不能为零",
              showCancel: false,
              confirmText: "确定"
            })
          } 
        }
      }else{
        wx.showModal({
          title: "您的联系方式还没填呢",
          showCancel: false,
          confirmText: "确定"
        })
      }
    } else {
      wx.showModal({
        title: "您的姓名还没填呢",
        showCancel: false,
        confirmText: "确定"
      })
    }
         
        


  }
})