package com.start.util;

public class LocationUtils {

	
private static double EARTH_RADIUS = 6378.137;    
    
    private static double rad(double d) {    
        return d * Math.PI / 180.0;    
    }    
    
    /**   
     * 通过经纬度获取距离(单位：米)   
     * @param lat1   
     * @param lng1   
     * @param lat2   
     * @param lng2   
     * @return   
     */    
    public static double getDistance(double lat1, double lng1, double lat2,double lng2) {    
        double radLat1 = rad(lat1);    
        double radLat2 = rad(lat2);    
        double a = radLat1 - radLat2;    
        double b = rad(lng1) - rad(lng2);    
        double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)    
                + Math.cos(radLat1) * Math.cos(radLat2)    
                * Math.pow(Math.sin(b / 2), 2)));    
        s = s * EARTH_RADIUS;    
        s = Math.round(s * 10000d) / 10000d;    
        s = s*1000;    
        return s;    
    }  
    
    public static boolean getVicinage(String sqlLocation,String location,double distance) {    
    	String[] arr = location.split(",");
    	double radLat1 = rad(Double.parseDouble(arr[0]));
        double radLat2 = rad(Double.parseDouble(arr[1]));
        String[] sqlArr = sqlLocation.split(",");
    	double lat2 = rad(Double.parseDouble(sqlArr[0]));
        double lng2 = rad(Double.parseDouble(sqlArr[1]));
    	double juli = getDistance(radLat1, radLat2, lat2, lng2);
    	if(juli<=distance){
    		return true;
    	}
        return false;    
    }
}
