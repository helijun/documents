package com.microman.blog.util;
  
import java.security.MessageDigest;  

/** 
 * 微信公众平台(JAVA) SDK 
 * 
 * SHA1算法
 * 
 * @author helijun 2016/06/15 19:49
 */  
public final class SHA1 {  
  
    private static final char[] HEX_DIGITS = {'0', '1', '2', '3', '4', '5',  
                           '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };  
  
    /** 
     * Takes the raw bytes from the digest and formats them correct. 
     * 
     * @param bytes the raw bytes from the digest. 
     * @return the formatted bytes. 
     */  
    private static String getFormattedText(byte[] bytes) {  
        int len = bytes.length;  
        StringBuilder buf = new StringBuilder(len * 2);  
        // 把密文转换成十六进制的字符串形式  
        for (int j = 0; j < len; j++) {  
            buf.append(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);  
            buf.append(HEX_DIGITS[bytes[j] & 0x0f]);  
        }  
        return buf.toString();  
    }  
  
    public static String encode(String str) {  
        if (str == null) {  
            return null;  
        }  
        try {  
            MessageDigest messageDigest = MessageDigest.getInstance("SHA1");  
            messageDigest.update(str.getBytes());  
            return getFormattedText(messageDigest.digest());  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  
    }  
}  