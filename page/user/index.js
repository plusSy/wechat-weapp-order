//index.js
//获取应用实例
var app = getApp();
//var sta = require("../../util/statistics.js");
Page({
  data: {
    userInfo: {},
  },
  onShow:function (){
    //sta();
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo){
         that.setData({
              userInfo:userInfo
          });
    })
  },
  userdata:function (){
      wx.navigateTo({url: "/page/userdata/index"})
  },
  address: function (){
      wx.navigateTo({url:"/page/address/index"});
  },
  subscribe: function () {
      wx.navigateTo({ url: "/page/wodeyuyue/woyuyue" });
  },
  coupon:function(){
    wx.navigateTo({ url: "/page/coupon/index" });
  },
  
  order:function (){
    //订单
    wx.navigateTo({url: "/page/order/index"})
  },
  keep:function () {
    //收藏
  },
  share:function (){
    //分享
  }
})
