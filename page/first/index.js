var app = getApp();
var QQMapWX = require('../../util/qqmap-wx-jssdk.min.js');
var demo = new QQMapWX({
  key: '2J2BZ-FWY34-VBCUC-XCCDT-TW5HV-VDBVU' // 必填
});
Page({
  data: {
    imgUrls: '',
    webUrl: app.globalData.webUrl,
    
  },
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: 'https://www.webjava.cn/Home/We/xcxshxi',
      data: {},
      success: function (res) {
        // console.log(res.data.canting_name)
        that.setData({
          img: app.globalData.webUrl + res.data.canting_img,
          name: res.data.canting_name,
          address: res.data.canting_address,
          tel: res.data.canting_tel,
          time: res.data.canting_time,
          jieshao: res.data.canting_jieshao

        })
      },
      fail: function () {
        console.log("请求失败")
      }
    })
    wx.request({
      url: 'https://www.webjava.cn/Home/We/banner',
      data: {},
      success: function (res) {
        console.log(res.data)
        that.setData({
          imgUrls: res.data
        })

      }
    })

    
  },
  onShow:function(){
    
  },
  // home:function(){
  //   wx.navigateTo({
  //     url: '../component/index',
  //   })
  // },
  // yuyue: function () {
  //   wx.navigateTo({
  //     url: '../yuyue/yuyue',
  //   })
  // },
  // detail:function(){
  //   wx.navigateTo({
  //     url: '../detail/detail',
  //   })
  // }, 
  callPhone: function callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    });
  },
  address:function(){
    var that = this;

console.log(that.data.name);

    // 调用接口
    // demo.getSuggestion({
    //   keyword: that.data.name,
    //   success: function (res) {
    //     console.log(666666);
    //     console.log(res);
    //     console.log(res.data[0].location.lat);
    //     console.log(res.data[0].location.lng);
    //     that.setData({
    //       lat: res.data[0].location.lat,
    //       lon: res.data[0].location.lng
    //     })
    //     // wx.openLocation({
    //     //   latitude: res.data[0].location.lat,
    //     //   longitude: res.data[0].location.lng,
    //     //   scale: 20
    //     // })
    //     wx.navigateTo({
    //       url: "../map/index?lat="+res.data[0].location.lat+"&lon="+res.data[0].location.lng
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    // });
wx.getLocation({
  type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
  success: function (res) {
    var latitude = res.data[0].location.lat
    var longitude = res.data[0].location.lng
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: "小蚂蚁智慧餐厅",
      scale: 28
    })
  },
  fail:function(res){
    console.log("location error")
  }
})  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  }
  ,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
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