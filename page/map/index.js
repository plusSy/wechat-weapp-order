var app = getApp();
Page({
  data: {
    
  },

  onLoad:function(options){
    this.setData({
      lat: options.lat,
      lon: options.lon,
      markers: [{
        iconPath: "../../image/loca.png",
        id: 0,
        latitude: options.lat,
        longitude: options.lon,
        width: 30,
        height: 40
      }]
    })    
  }
})