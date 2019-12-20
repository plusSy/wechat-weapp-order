 //var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({
  data: {
    tabs: ["全部", "待付款", "已付款","已完成"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth:96,
    webUrl: app.globalData.webUrl
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        that.setData({
          windowHeight: res.windowHeight-45,
          sliderWidth: (res.windowWidth / that.data.tabs.length),
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          
          sliderLeft: (res.windowWidth / that.data.tabs.length - that.data.sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    

  }, 
  onShow:function(){
    this.getOrder();
    this.treatPay();
    this.alreadyPay();
    this.achievePay();
  },
  goRefund:function(event){
    var data = event.currentTarget.dataset;
    var crsNo = data.crsno;
    var that = this;
    wx.showModal({
      title: '是否确认取消订单？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.webUrl + '/Home/Wepay/qxddh',
            header: {
              'content-type': 'application/json'
            },
            data: {
              crsNo: crsNo,
            },
            success: function (res) {
              if (res.data == 'ok') {
                that.getOrder();
                that.treatPay();
                that.alreadyPay();
                that.achievePay();
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },
  achieve: function (event) {
    var data = event.currentTarget.dataset;
    var crsNo = data.crsno;
    var that = this;
    wx.showModal({
      title: '是否确认已完成？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.webUrl + '/Home/Wepay/quwc',
            header: {
              'content-type': 'application/json'
            },
            data: {
              crsNo: crsNo,
            },
            success: function (res) {
              if (res.data == 'ok') {
                that.getOrder();
                that.treatPay();
                that.alreadyPay();
                that.achievePay();
              }
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
   
  },
  goVanish:function(event){
    var data = event.currentTarget.dataset;
    var crsNo = data.crsno;
    var that = this;
    wx.showModal({
      title: '是否确认申请退款？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.webUrl + '/Home/Wepay/sqtkj',
            header: {
              'content-type': 'application/json'
            },
            data: {
              crsNo: crsNo,
            },
            success: function (res) {
              if (res.data == 'ok') {
                that.getOrder();
                that.treatPay();
                that.alreadyPay();
                that.achievePay();
              }
            }
          })
        } else if (res.cancel) {
        }
      }
    })
   
  },
  treatPay:function(){
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/dfkddxx',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session: session,
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          treatOrderInfo: res.data
        });
      }
    })
  },
  achievePay: function () {
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    console.log(session);
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/wcddxx',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session: session
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          achieveOrderInfo: res.data
        });
      }
    })
  },
  alreadyPay: function () {
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/yzfddxx',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session: session,
      },
      success: function (res) {
        console.log(res.data);

        that.setData({
          alreadyOrderInfo: res.data
        });
      }
    })
  },
  getOrder: function () {
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/ddxx',
      header: {
        'content-type': 'application/json'
      },
      data: {
        session: session,
      },
      success: function (res) {
        console.log(res.data);
        
        that.setData({
          orderInfo: res.data
        });
      }
    })
  },
  goPay:function(event){
    var data = event.currentTarget.dataset;
    var crsNo = data.crsno;
    var goodsMoney = data.gm;
    var that = this;

    var session = wx.getStorageSync('3rd_session');
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/qu_order',
      data: {
        session: session,
        crsNo: crsNo,
        goodsMoney: goodsMoney
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
      dataType: '',
      success: function (res) {
        console.log(res.data);
        var order_sn = res.data.out_trade_no;
        var timestamp = res.data.timeStamp;
        var nocestr = res.data.nonceStr;
        var packages = res.data.package;
        var signtype = res.data.signType;
        var paysign = res.data.paySign;
        wx.requestPayment({
          timeStamp: timestamp,
          nonceStr: nocestr,
          package: packages,
          signType: signtype,
          paySign: paysign,
          success: function (data) {
            wx.request({
              url: app.globalData.webUrl + '/Home/Wepay/huid',
              data: {
                order_sn: order_sn,
                payMoney: goodsMoney
              },
              success: function (res) {
                  that.getOrder();
                  that.treatPay();
                  that.alreadyPay();
              }
            })
          },
          fail: function (res) {
            console.log("支付遇到未知错误")
          }
        })
      },
      fail: function (res) {
        console.log(res.data)
      },
      complete: function (res) { },
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});