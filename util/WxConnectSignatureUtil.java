package com.cramix.common.utils;

import java.util.Arrays;

/**
 * 微信接入校验工具类 
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 何立军
* @日期: 2016/06/20 09:19
* @描述: [CheckSignatureUtil] 验证微信接入签名 
 */
public class WxConnectSignatureUtil {  
  
    /** 
     * 验证签名 
     * 
     * @param token 微信服务器token，在env.properties文件中配置的和在开发者中心配置的必须一致 
     * @param signature 微信服务器传过来sha1加密的证书签名
     * @param timestamp 时间戳
     * @param nonce 随机数 
     * @return 
     */  
    public static boolean checkSignature(String token,String signature, String timestamp, String nonce) {  
        String[] arr = new String[] { token, timestamp, nonce };  
        // 将token、timestamp、nonce三个参数进行字典序排序  
        Arrays.sort(arr);  
        
        // 将三个参数字符串拼接成一个字符串进行sha1加密  
        String tmpStr = SHA1Util.encode(arr[0] + arr[1] + arr[2]);  
        
        // 将sha1加密后的字符串可与signature对比，标识该请求来源于微信  
        return tmpStr != null ? tmpStr.equals(signature.toUpperCase()) : false;  
    }  
    
}  

