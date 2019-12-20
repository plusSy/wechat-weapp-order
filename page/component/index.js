//import menus from './resources/json/menus.js';
var app = getApp();
Page({
  data:{
    text:"Page main",
    background: [
      {
        color:'green',
        sort:1
      }, 
      {
        color:'red',
        sort:2
      },
      {
        color:'yellow',
        sort:3
      }
      ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 36000,
    duration: 12000,
    toView: 'blue',
    menus:'',
    selectedMenuId:1,
    total:{
      count:0,
      money:0
    },
    menuTab:1,
    goodsData:'',
    webUrl: app.globalData.webUrl,
    isable:false
  }, 
  buy: function () {
    var that = this;
      var menus = this.data.menus;
      var dataTj = this.data.dataTj;
      var dataTs = this.data.dataTs;
      this.data.goodsData = [];
      for(var i=0;i<menus.length;i++){
        var dish = menus[i].dishs;
        for (var j = 0; j < dish.length; j++) {
          if (dish[j].count > 0){
            this.data.goodsData.push(dish[j])
            }
        }
      }
      for (var k = 0; k < dataTj.length; k++){
        if (dataTj[k].count > 0) {
          this.data.goodsData.push(dataTj[k])
        }
      }
      for (var l = 0; l < dataTs.length; l++) {
        if (dataTs[l].count > 0) {
          this.data.goodsData.push(dataTs[l])
        }
      }
      console.log(this.data.goodsData);
      if(this.data.isable ==true){
        wx.setStorage({
          key: 'goodsData',
          data: this.data.goodsData
        });
        wx.setStorage({
          key: 'goodsMoney',
          data: this.data.total.money
        });
        wx.setStorage({
          key: 'goodscount',
          data: this.data.total.count
        });
        wx.navigateTo({
          url: '../checkout/checkout?way='+that.data.way,
        })
      }
        
      
      
  },
  classify: function () {
    this.setData({
      menuTab: 1
    })
  },
  bargain:function(){
    this.setData({
        menuTab:2
    })
  },
  feature:function(){
    this.setData({
      menuTab: 3
    })
  },
  selectMenu:function(event){
    let data = event.currentTarget.dataset
    this.setData({
      toView: data.tag,
      selectedMenuId: data.id
    })
    // this.data.toView = 'red'
  },
  addCount:function(event){
    let data = event.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.menus;
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    dish.count += 1;
    total.count += 1;
    total.money += dish.price*1;
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'menus':menus,
      'total':total
    })
    this.judge();
    console.log(this.data.menus)
  },
  judge:function(){
    if(this.data.total.money ==0){
      this.setData({
        isable:false
      })
    }else{
      this.setData({
        isable:true
      })
    }
  },
  addCount1: function (event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let dataTs = this.data.dataTs;
    let item = dataTs.find(function (v) {
      return v.id == data.id
    })
    // let dish = menu.dishs.find(function (v) {
    //   return v.id == data.id
    // })
    item.count += 1;
    total.count += 1;
    total.money += item.price * 1;
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'dataTs': dataTs,
      'total': total
    })
    this.judge();
    console.log(this.data.dataTs)
  },
  addCount2: function (event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let dataTj = this.data.dataTj;
    let item = dataTj.find(function (v) {
      return v.id == data.id
    })
    // let dish = menu.dishs.find(function (v) {
    //   return v.id == data.id
    // })
    item.count += 1;
    total.count += 1;
    total.money += item.price * 1;
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'dataTj': dataTj,
      'total': total
    })
    this.judge();
    console.log(this.data.dataTs)
  },
  minusCount:function(event){
    let data  = event.currentTarget.dataset
    let total = this.data.total 
    let menus = this.data.menus
    let menu = menus.find(function(v){
      return v.id == data.cid
    })
    let dish = menu.dishs.find(function(v){
      return v.id == data.id
    })
    if(dish.count <= 0)
      return 
    dish.count -= 1;
    total.count -= 1
    total.money -= (dish.price * 1).toFixed(2);
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'menus':menus,
      'total':total
    })
    this.judge();
  },
  minusCount1: function (event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let dataTs = this.data.dataTs
    let item = dataTs.find(function (v) {
      return v.id == data.id
    })
    // let dish = menu.dishs.find(function (v) {
    //   return v.id == data.id
    // })
    if (item.count <= 0)
      return
    item.count -= 1;
    total.count -= 1
    total.money -= (item.price * 1).toFixed(2);
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'dataTs': dataTs,
      'total': total
    })
    this.judge();
  },
  minusCount2: function (event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let dataTj = this.data.dataTj
    let item = dataTj.find(function (v) {
      return v.id == data.id
    })
    // let dish = menu.dishs.find(function (v) {
    //   return v.id == data.id
    // })
    if (item.count <= 0)
      return
    item.count -= 1;
    total.count -= 1
    total.money -= (item.price * 1).toFixed(2);
    total.money = Number(total.money.toFixed(2));
    this.setData({
      'dataTj': dataTj,
      'total': total
    })
    this.judge();
  },
  getData:function(){
    var that = this;
      wx.request({
        url: app.globalData.webUrl +'/Home/We/getshop',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            menus: res.data,
            selectedMenuId: res.data[0].id
          });
        }
      })
  },
  gettj:function(){
    var that = this;
    wx.request({
      url: app.globalData.webUrl + '/Home/We/gettj',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          dataTj:res.data
        });
      }
    })
  },
  getts: function () {
    var that = this;
    wx.request({
      url: app.globalData.webUrl + '/Home/We/getts',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          dataTs: res.data
        });
      }
    })
  },
  chooseGoods:function(data){
    
  },
  onLoad:function(options){
    console.log("开始执行onload")
    this.setData({
      way:options.way
    });
    var that = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("登录未过期");
        var session = wx.getStorageSync('3rd_session');
        console.log(session);
        if(!session){
          getApp().login();
          // wx.login() //重新登录
        }
      },
      fail: function () {
        console.log("登录态过期");
        getApp().login(); //重新登录
  }
})
  this.getData(); 
  this.gettj(); 
  this.getts(); 
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onScroll:function(e){
    console.log(e)
  }
})