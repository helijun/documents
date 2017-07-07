package com.cramix.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 陈荣安
* @日期: 2017年4月27日 下午3:27:05
* @描述: [CheckUtil]校验工具类
 */
public class CheckUtil {

	/**
	 * 校验手机
	 *
	 * @param str
	 * @return 验证通过返回true
	 */
	public static boolean isMobile(String str) {
		Pattern pattern = Pattern.compile("^[1][3,4,5,7,8][0-9]{9}$"); // 验证手机号
		Matcher match = pattern.matcher(str);
		return match.matches();
	}

	/**
	 * 校验密码
	 *
	 * @param str
	 * @return
	 */
	public static boolean isRightPwd(String str) {
		Pattern pattern = Pattern.compile("^(?![^a-zA-Z]+$)(?!\\D+$).{6,20}$");
		Matcher match = pattern.matcher(str);
		return match.matches();
	}

	/**
	 * 校验金额
	 *
	 * @param str
	 * @return
	 */
	public static boolean isRightMoney(String str) {
		Pattern pattern = Pattern.compile("^[0-9]+(.[0-9]{1,2})?$");
		Matcher match = pattern.matcher(str);
		return match.matches();
	}

	/**
	 * 校验中文名字
	 *
	 * @param str
	 * @return
	 */
	public static boolean isRealName(String str) {
		Pattern pattern = Pattern.compile("^[\\u4e00-\\u9fa5]+$");
		Matcher match = pattern.matcher(str);
		return match.matches();
	}

}
