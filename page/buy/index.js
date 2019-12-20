var app = getApp();
Page({
  data:{
    goodsData:''
  },
  onLoad:function(){
      this.getGoods();
  },
  getGoods:function(){
    wx.getStorage({
      key: 'goodsData',
      success: function(res) {
          console.log(res.data)
      },
    })
  }
})