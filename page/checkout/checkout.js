var data = require( './data.js' );
var app = getApp();
Page( {
	data : {
    showView: true ,
    id: 0,  
    actives:'true',
    way:'' ,
    goodsData: '',
    goodsMoney:0,
   
    goodsCount:0,
    address:'',
    aId:'',
    webUrl: app.globalData.webUrl,
    choose: 'order',

    theGoodMoney: 0,//最后提交金额
    manMoney: 0,//满X元
    jianMoney: 0//减X元
	},
  onLoad: function (options) {
    // 生命周期函数--监听页面加载 
    console.log(11111111111);
    console.log(options.way); 
    this.setData({
      way: options.way
    });
    showView: (options.showView == "true" ? true : false);
    if (typeof (options.id) == "undefined"){

    }else{
      this.setData({
        aId: options.id
      })
    }
    var session = wx.getStorageSync('3rd_session');
    
    
  },
  //获取优惠券满、减金额
  // changeMoney:function(){
  //   var that = this;
  //   wx.request({
  //     url: '',
  //     data:{},
  //     success:function(res){
  //       that.setData({
  //         manMoney:res.data.manMoney,
  //         jianMoney:res.data.jianMoney
  //       })

  //     },fail:function(res){

  //     }
  //   })
  // },
   onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }, 
	onShow : function() {
    this.getGoods();
    this.getAddress();
    
    // this.changeMoney()
	},
  coupon:function(){
    var goodsMoney = 0;
    wx.getStorage({
      key: 'goodsMoney',
      success: function (res) {
        goodsMoney = res.data;
      },
    })
    console.log('sssssssssss');
    console.log(goodsMoney);
  },
  onReady:function(){
    var session = wx.getStorageSync('3rd_session');
    var that = this;
    wx.request({
      url: app.globalData.webUrl + '/Home/Wepay/getyhqq',
      data:{
        session:session,
        goodsMoney: that.data.goodsMoney,
      },
      success:function(res){
          console.log(res.data);
          if(res.data=='no'){
            that.setData({
              coupon: false
            })
              var practical = that.data.goodsMoney;
              that.setData({
                practical: practical
              })
          }else{
            that.setData({
              coupon: res.data
            })
            var practical = that.data.goodsMoney - res.data.xideo;
            var practical = Number(practical.toFixed(2));
            that.setData({
              practical: practical
            })
          }
          
          
      }
    })
  },
  formSubmit: function (event) {
    var val = event.detail.value;
    var data = event.currentTarget.dataset;
    var way = data.way;
    var couponId = data.id;
    var that = this;
    
    var session = wx.getStorageSync('3rd_session');
    if(this.data.coupon==false){
      var coupon = 0;
      var practical = this.data.goodsMoney-coupon;
      var practical = Number(practical.toFixed(2)); 
    }else{
      var coupon = this.data.coupon.xideo;
      var practical = this.data.goodsMoney - coupon;
      var practical = Number(practical.toFixed(2));
    }

    if (that.data.address != '' && way == 'take-out') {
      
      wx.request({
        url: app.globalData.webUrl+'/Home/Wepay/make_order',
        data: {
          session: session,
          way: data.way,
          goodsData: that.data.goodsData,
          goodsMoney: practical,
          practical:that.data.goodsMoney,
          address: that.data.address,
          cont: that.data.goodsCount
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
                  payMoney: practical,
                  session:session,
                  couponId: couponId
                },
                success: function (res) {
                  
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
    } else if (that.data.address == '' && way == 'take-out'){
      wx.showModal({
        title: "请填写收货地址",
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            return;
          } else if (res.cancel) {
            return;
          }
        }
      })
    } else if (val.mark != '' && way == 'consume'){
      wx.request({
        url: 'https://www.webjava.cn/Home/Wepay/make_order',
        data: {
          session: session,
          way: data.way,
          goodsData: that.data.goodsData,
          goodsMoney: practical,
          practical: that.data.goodsMoney,
          mark: val.mark,
          cont: that.data.goodsCount
        },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'GET',
        dataType: '',
        success: function (res) {
          console.log(res.data);
          var timestamp = res.data.timeStamp;
          var nocestr = res.data.nonceStr;
          var packages = res.data.package;
          var signtype = res.data.signType;
          var paysign = res.data.paySign;
          //实际支付的金额 payMoney
          wx.requestPayment({
            timeStamp: timestamp,
            nonceStr: nocestr,
            package: packages,
            signType: signtype,
            paySign: paysign,
            success: function (res) {
              wx.request({
                url: app.globalData.webUrl + '/Home/Wepay/huid',
                data: {
                  order_sn: order_sn,
                  payMoney: practical,
                  session: session,
                  couponId: couponId
                },
                success: function (res) {

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
    } else if (val.mark == '' && way =='consume'){
      wx.showModal({
        title: "请填写台号",
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          if (res.confirm) {
            return;
          } else if (res.cancel) {
            return;
          }
        }
      })
    }
  },
  choseTxtColor: function (e) {
     this.setData({
       actives:'true',
       way:'take-out'
     })
    
  }, 
  getAddress:function(){
    
    var that = this;
    var session = wx.getStorageSync('3rd_session');
    if(this.data.aId !=''){
      wx.request({
        url: app.globalData.webUrl + '/Home/We/ddhqdz',
        data: {
          session: session,
          id:this.data.aId
        },
        success: function (res) {
          console.log(res);
          that.setData({
            address: res.data
          })
        }
      })
    }else{
      wx.request({
        url: app.globalData.webUrl + '/Home/We/ddhqdz',
        data: {
          session: session
        },
        success: function (res) {
          console.log(res);
          if(res.data!='no'){
            that.setData({
              address: res.data
            })
          } 
        }
      })
    }
    
  },
  getGoods: function () {
    var that = this;
    wx.getStorage({
      key: 'goodsData',
      success: function (res) {
        that.setData({
          goodsData:res.data
        })
      },
    });
    wx.getStorage({
      key: 'goodsMoney',
      success: function (res) {
        that.setData({
          goodsMoney: res.data
        })
      },
    })
    wx.getStorage({
      key: 'goodscount',
      success: function (res) {
        that.setData({
          goodsCount: res.data
        })
      },
    })
  },
  chooseAddress:function(){
    wx.redirectTo({
      url: '../choose/index',
    })
  },
  addAddress:function(){
    var choose = this.data.choose;
    wx.redirectTo({
      url: '../address/addto/index?choose='+choose,
    })
  },
  changeTxtColor: function (e) {
    // var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      actives: 'false',
      way:'consume'
    })

  }, 
	changeTime : function( e ) {
		var list = [],
			self = this,
			time = this.data.shipment.time,
			i, t;

		for ( i = 0; t = time[i]; ++i ) {
			list.push( t.text );
		}
		wx.showActionSheet({
			itemList : list,
			success : function( res ) {
				if ( res.cancel ) {
					return;
				}
				for ( i = 0; t = time[i]; ++i ) {
					t.selected = res.tapIndex == i ? true : false;
				}
				self.setData( {
					'shipment.time' : time
				} );
			}
		});
	},
} );