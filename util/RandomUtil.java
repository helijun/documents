package com.cramix.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * 
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 陈荣安
* @日期: 2017年4月27日 下午3:52:00
* @描述: [RandomUtil]生成随机数工具类
 */
public class RandomUtil {

	/**
	 * 生成四位随机数
	 * 
	 * @return
	 */
	public static String getRandBy4() {
		Random random = new Random();
		return String.valueOf(random.nextInt(9000) + 1000);
	}

	/**
	 * 生成六位随机数
	 * 
	 * @return
	 */
	public static String getRandBy6() {
		Random random = new Random();
		return String.valueOf(random.nextInt(900000) + 100000);
	}

	/**
	 * 生成十位随机数
	 * 
	 * @return
	 */
	public static String getRandBy10() {

		String time = (new SimpleDateFormat("ssSSS")).format(new Date());
		Random randome = new Random();
		int num = 10000 + randome.nextInt(89999) + 1;
		// 得到当前时间
		return time + (num + "");
	}

	/**
	 * 根据概率获取奖品
	 * 
	 * @param obj
	 * @return
	 */
	public static Integer getLotteryRand(Integer obj[]) {
		Integer result = null;
		try {
			int sum = 0;// 概率数组的总权重
			for (int i = 0; i < obj.length; i++) {
				sum += obj[i];
			}
			// System.out.println("所有奖品权重sum:" + sum);
			for (int i = 0; i < obj.length; i++) {// 概率数组循环
				int randomNum = new Random().nextInt(sum);// 随机生成0到sum的整数
				// System.out.println("第" + i + "次循环" + "权重值为:" + obj[i] + " sum值为:" + sum + " randomNum:" + randomNum);
				if (randomNum < obj[i]) {// 中奖 跳出循环 返回奖品序号
					result = i;
					break;
				} else {// 未中奖 继续
					sum -= obj[i];
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		// System.out.println("抽中第" + (result + 1) + "个奖品！");
		return result;
	}

	/**
	 * 生成随机数字和字母
	 * 
	 * @param length
	 * @return
	 */
	public static String getStringRandom(int length) {
		String val = "";
		Random random = new Random();
		// 参数length，表示生成几位随机数
		for (int i = 0; i < length; i++) {
			String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";
			// 输出字母还是数字
			if ("char".equalsIgnoreCase(charOrNum)) {
				// 输出是大写字母还是小写字母
				//int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
				int temp = 65;
				val += (char) (random.nextInt(26) + temp);
			} else if ("num".equalsIgnoreCase(charOrNum)) {
				val += String.valueOf(random.nextInt(10));
			}
		}
		return val;
	}

	/**
	 * 生成随机的字符串 java JDK提供的生成主键策略，保证生成的字符串唯一
	 * 
	 * @return
	 */
	public static String createUniqueStr() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * 测试抽奖算法
	 * 
	 * @param args
	 */
	public static void main(String[] args) {

		System.out.println(getStringRandom(8));
	}
}
