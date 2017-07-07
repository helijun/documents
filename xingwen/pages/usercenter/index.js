//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bgImg: '../../images/owner/hengshan-bg.jpg',
    motto: 'Hello World',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  onLoad: function () {
    console.log('globalData.userInfo',wx.globalData)
  }
})
