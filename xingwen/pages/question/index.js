//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: '行问',
    introduce: '行问，骑行问题交流平台',
    bgImg: '/image/road.jpg',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: './list/list'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    wx.setNavigationBarTitle({
      title: '行问，解惑骑行者'
    })

  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  }
})
