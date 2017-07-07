package com.cramix.common.utils;

import java.util.HashMap;
import java.util.Map;

 
import cn.jpush.api.JPushClient;
import cn.jpush.api.push.PushResult;
import cn.jpush.api.push.model.Message;
import cn.jpush.api.push.model.Options;
import cn.jpush.api.push.model.Platform;
import cn.jpush.api.push.model.PushPayload;
import cn.jpush.api.push.model.audience.Audience;
import cn.jpush.api.push.model.notification.AndroidNotification;
import cn.jpush.api.push.model.notification.IosNotification;
import cn.jpush.api.push.model.notification.Notification;
/**
 * 推送工具类
* <p>版权所有:(C)2016-2018 达农保险</p>
* @作者: 阳建
* @日期: 2017年6月2日 下午5:43:53
* @描述: [JPushUtil]
 */
public class JPushUtil { 
    
 // 极光秘钥
    private static String MASTERSECRET = "458b040f11663396f0d16775";

    // APPkey
    private static String APPKEY = "3b622dfed1fcdf2160bb898a";
    
    public static JPushClient build() {
         
        JPushClient jpushClient=null;
            try{
         jpushClient = new JPushClient(MASTERSECRET, APPKEY, 3);
         System.out.println(jpushClient);
            }catch(Exception e){
                e.printStackTrace();
            }
        return jpushClient;
    }
    
    /***        
     * 全局推送
     * 
     * @param id 推送id
     * @param title 推送标题
     * @param content 推送简介
     * @return
     */
    public static PushPayload buildPushAll(Long id, String title, String content) {
        return buildPushAll(id, title, content, null);
    }
    /***
     * 全局推送
     * 
     * @param id 推送id
     * @param title 推送标题
     * @param content 推送简介
     * @param extras 自定义参数
     * @return
     */
    public static PushPayload buildPushAll(Long id, String title, String content, Map<String, String> extras) {

        Map<String, String> map = new HashMap<String, String>();
        map.put("id", String.valueOf(id));
        if(extras!=null){
            map.putAll(extras);
        }
        return PushPayload
                .newBuilder()
                .setPlatform(Platform.all())
                .setAudience(Audience.all())
                .setNotification(
                        Notification
                                .newBuilder()
                                .addPlatformNotification(
                                        AndroidNotification.newBuilder().setTitle(title).setAlert(content)
                                                .addExtras(map).build())
                                .addPlatformNotification(
                                        IosNotification.newBuilder().setAlert(content).autoBadge()
                                                .addExtras(map).build()).build())
                .setOptions(Options.newBuilder().setApnsProduction(true).build())
                .setMessage(Message.newBuilder().setMsgContent(content).build()).build();
    }
    /**
     * android单推
     * 
     * @param id 推送id
     * @param uid 推送的用户ID
     * @param title 推送标题
     * @param content 推送简介
     * @return
     */
    public static PushPayload buildPushAndroid(Long id, Long uid, String title, String content){
        return buildPushAndroid(id, uid, title, content, null);
    }
    /**
     * android单推
     * 
     * @param id 推送id
     * @param uid 推送的用户ID
     * @param title 推送标题
     * @param content 推送简介
     * @param extras 自定义参数
     * @return
     */
    public static PushPayload buildPushAndroid(Long id, Long uid, String title, String content, Map<String, String> extras) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", String.valueOf(id));
        if(extras!=null){
            map.putAll(extras);
        }
        return PushPayload.newBuilder().setPlatform(Platform.android()).setAudience(Audience.tag(uid + ""))
                .setMessage(Message.newBuilder().setMsgContent(content).addExtras(map).build())
                .setNotification(Notification.android(content, title, map)).build();

    }
    /**
     * ios单推
     * 
     * @param id 推送id
     * @param uid 推送的用户ID
     * @param title 推送标题
     * @param content 推送简介
     * @return
     */
    public static PushPayload buildPushIos(Long id, Long uid, String title, String content) {
      
        return buildPushIos(id, uid, title, content,null);
    }
    /**
      * ios单推
     * 
     * @param id 推送id
     * @param uid 推送的用户ID
     * @param title 推送标题
     * @param content 推送简介
     * @param extras 自定义参数
     * @return
     */
    public static PushPayload buildPushIos(Long id, Long uid, String title, String content,Map<String, String> extras) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", String.valueOf(id));
        if(extras!=null){
            map.putAll(extras);
        }
        return PushPayload
                .newBuilder()
                .setOptions(Options.newBuilder().setApnsProduction(true).build())
                .setPlatform(Platform.ios())
                .setAudience(Audience.alias(uid + ""))
                .setMessage(Message.newBuilder().setMsgContent(content).addExtras(map).build())
                // Message.content(sendMessage.getStatus())
                .setNotification(
                        Notification
                                .newBuilder()
                                .addPlatformNotification(
                                        IosNotification.newBuilder().setAlert(content)
                                                .autoBadge().addExtras(map).build()).build()).build();

    }
    public static void main(String[] args) {
       
        PushResult result=null;
        try {
            PushPayload push=JPushUtil.buildPushAll(1L, "推送测试", "推送测试");
            System.out.println(push);
            result = JPushUtil.build().sendPush(push);
        } catch (Exception e) {
            
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(result);
    }
   
}
