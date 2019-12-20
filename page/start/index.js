var App = getApp();

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !1,
    },
    onLoad:function() {},
    onShow: function() {},
    bindload(e) {
      var that = this;
      setTimeout(this.goNext, 3000)
    },
    goIndex() {
      wx.switchTab({
          url: '/page/component/index'
        })
    },
    goNext(){
      wx.redirectTo({
        url: '/page/first/index',
      })
    }
    
})
