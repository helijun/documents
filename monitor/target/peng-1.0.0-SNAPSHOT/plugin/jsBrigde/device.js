/**
 * js调用原生设备
 * @author helijun
 */
dnApp.device = {
		
    /**
     * 调用原生摄像头、相册
     * return 图片全路径
     */
    takePhonto: function(){
    	console.log('打开相机')
        return takePhonto()
    },

    /**
     * 地理定位
     * return json:地址位置坐标、省/城/市名
     */
    geoLocation: function(){
    	
    }
}