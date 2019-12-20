'use strict';
var app=getApp();
// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
var img;var name;var address;var tel;var time;var jieshao;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'detail',
    // detailRules: '听到叫号请到迎宾台，过号不作废，延三桌安排',
    imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'],
    // waitInfo: [{
    //   kind: '餐桌类型',
    //   desk: '等待桌数',
    //   time: '预估时间'
    // }, {
    //   kind: '小桌（1-2人）',
    //   desk: '桌',
    //   number: '1',
    //   time: '--分钟'
    // }, {
    //   kind: '中桌（3-4人）',
    //   desk: '桌',
    //   number: '1',
    //   time: '--分钟'
    // }, {
    //   kind: '大桌（5人以上）',
    //   desk: '桌',
    //   time: '--分钟'
    // }],
    
      img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      name: '小蚂蚁餐厅',
      // distance: '100',
      address: '中原第一城',
      tel: '18039555555',
      time: '10:00-22:00',
      jieshao:'中原第一城中原第一城中原第一城',
      imgdizhi: app.globalData.webUrl
      
    
  },
  /**
   * 拨打电话
   */
  callPhone: function callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.tel
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    var that=this;
    wx.request({
      url: 'https://www.webjava.cn/Home/We/xcxshxi',
      data:{},
      success:function(res){
        // console.log(res.data.canting_name)
        that.setData({
          img: app.globalData.webUrl +res.data.canting_img,
          name:res.data.canting_name,
          address:res.data.canting_address,
          tel:res.data.canting_tel,
          time:res.data.canting_time,
          jieshao:res.data.canting_jieshao

        })
      },
      fail:function(){
        console.log("请求失败")
      }
    })
    wx.request({
      url: 'https://www.webjava.cn/Home/We/banner',
      data:{},
      success:function(res){
        console.log(res.data)
        that.setData({
          imgUrls:res.data
        })
        
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=detail.js.map
