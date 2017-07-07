var list = {
  data: {
    baseUrl: '',
    bannerUrl: '/images/question/banner_1.jpg',
    toast2Hidden: true,
    productList: [
      {
        imgSmall:'/images/question/list_1.jpg',
        title: '国庆骑行应该注意什么事项？',
        detail: '好想为祖国庆生..',
        like: '18',
        comment: '22'
      },
      {
        imgSmall:'/images/question/list_2.jpg',
        title: '桂林最适合骑行的路线？',
        detail: '阳朔山水甲桂林..',
        like: '6',
        comment: '23'
      }
    ],
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
      'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
      'info_circle', 'cancel', 'search', 'clear'
    ]
  },
  
  onLoad: function(){
    var self = this;
    /*wx.request({
      url: 'ajax_url',
      success: function(res) {
        self.setData({
          productList:JSON.parse(res.data).detail
        })
      }
    })*/
  },

  bindItemTap:function(e){
    console.log('tap ' + e.currentTarget.dataset.name)
  },

  //功能敬请期待
  wait: function(e){
    console.log("carTap",e)
    /*wx.navigateTo({
      url: './list/list'
    })*/
    this.setData({
      toast2Hidden: false
    })

    var that = this
    setTimeout(function () {
      that.setData({
        toast2Hidden: true
      })
    }, 1500)

  }

}

Page(list)