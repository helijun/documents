package com.cramix.common.utils;

import java.security.MessageDigest;

/**
 * 微信商户平台(JAVA) SDK 
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 何立军
* @日期: 2017/06/27 19:46
* @描述: [MD5Util] MD5加密算法
 */
public class MD5Util {

	private static final String hexDigits[] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"};

	private static String byteArrayToHexString(byte b[]) {
		StringBuffer resultSb = new StringBuffer();
		for (int i = 0; i < b.length; i++)
			resultSb.append(byteToHexString(b[i]));
		return resultSb.toString();
	}

	private static String byteToHexString(byte b) {
		int n = b;
		if (n < 0)
			n += 256;
		int d1 = n / 16;
		int d2 = n % 16;
		return hexDigits[d1] + hexDigits[d2];
	}

	public static String MD5Encode(String origin) {
		String result = null;
		try {
			result = new String(origin);
			MessageDigest md = MessageDigest.getInstance("MD5");
			result = byteArrayToHexString(md.digest(result.getBytes("UTF-8")));
		} catch (Exception exception) {
		}
		return result;
	}

}
