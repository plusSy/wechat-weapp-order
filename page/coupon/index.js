var app = getApp();
Page({
  data: {
    
  },
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getCoupon:function(){
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/grywq',
      header: {
        'content-type': 'application/json'
      },
      data:{
          session:session
      },
      success: function (res) {
        console.log(res);
        var data = res.data;
        for(var i=0;i<data.length;i++){
          data[i].stime = data[i].stime.replace(/-/g, ".");
          data[i].etime = data[i].etime.replace(/-/g, ".");
        }
        that.setData({
          coupon:data
        })
      }
    })
  },
  collect:function(event){
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    var data = event.currentTarget.dataset;
    var id = data.id;
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/getyhq',
      header: {
        'content-type': 'application/json'
      },
      data:{
          session:session,
          id:id
      },
      success: function (res) {
        console.log(res);
        that.getCoupon();
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    this.getCoupon();
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
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
})