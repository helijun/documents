package com.cramix.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
/**
 * 
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 陈荣安
* @日期: 2017年4月27日 下午3:26:01
* @描述: [CheckBankNumberUtil]银行卡号校验
 */
public class CheckBankNumberUtil {

	private final static String SUCCESS = "true";

	private final static String BAD_LENGTH = "银行卡号长度必须在16到19之间";

	private final static String NOT_NUMBER = "银行卡必须全部为数字";

	private final static String ILLEGAL_NUMBER = "银行卡不符合规则";

	public static String luhmCheck(String bankno) {
		if (bankno.length() < 16 || bankno.length() > 19) {
			return BAD_LENGTH;
		}

		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher match = pattern.matcher(bankno);
		if (match.matches() == false) {
			return NOT_NUMBER;
		}

		// if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
		// return "银行卡号开头6位不符合规范";
		// }

		int lastNum = Integer.parseInt(bankno.substring(bankno.length() - 1, bankno.length()));// 取出最后一位（与luhm进行比较）

		String first15Num = bankno.substring(0, bankno.length() - 1);// 前15或18位
		// System.out.println(first15Num);
		char[] newArr = new char[first15Num.length()]; // 倒叙装入newArr
		char[] tempArr = first15Num.toCharArray();
		for (int i = 0; i < tempArr.length; i++) {
			newArr[tempArr.length - 1 - i] = tempArr[i];
		}
		// System.out.println(newArr);

		int[] arrSingleNum = new int[newArr.length]; // 奇数位*2的积 <9
		int[] arrSingleNum2 = new int[newArr.length];// 奇数位*2的积 >9
		int[] arrDoubleNum = new int[newArr.length]; // 偶数位数组

		for (int j = 0; j < newArr.length; j++) {
			if ((j + 1) % 2 == 1) {// 奇数位
				if ((int) (newArr[j] - 48) * 2 < 9)
					arrSingleNum[j] = (int) (newArr[j] - 48) * 2;
				else
					arrSingleNum2[j] = (int) (newArr[j] - 48) * 2;
			} else
				// 偶数位
				arrDoubleNum[j] = (int) (newArr[j] - 48);
		}

		int[] arrSingleNumChild = new int[newArr.length]; // 奇数位*2 >9 的分割之后的数组个位数
		int[] arrSingleNum2Child = new int[newArr.length];// 奇数位*2 >9 的分割之后的数组十位数

		for (int h = 0; h < arrSingleNum2.length; h++) {
			arrSingleNumChild[h] = (arrSingleNum2[h]) % 10;
			arrSingleNum2Child[h] = (arrSingleNum2[h]) / 10;
		}

		int sumSingleNum = 0; // 奇数位*2 < 9 的数组之和
		int sumDoubleNum = 0; // 偶数位数组之和
		int sumSingleNumChild = 0; // 奇数位*2 >9 的分割之后的数组个位数之和
		int sumSingleNum2Child = 0; // 奇数位*2 >9 的分割之后的数组十位数之和
		int sumTotal = 0;
		for (int m = 0; m < arrSingleNum.length; m++) {
			sumSingleNum = sumSingleNum + arrSingleNum[m];
		}

		for (int n = 0; n < arrDoubleNum.length; n++) {
			sumDoubleNum = sumDoubleNum + arrDoubleNum[n];
		}

		for (int p = 0; p < arrSingleNumChild.length; p++) {
			sumSingleNumChild = sumSingleNumChild + arrSingleNumChild[p];
			sumSingleNum2Child = sumSingleNum2Child + arrSingleNum2Child[p];
		}

		sumTotal = sumSingleNum + sumDoubleNum + sumSingleNumChild + sumSingleNum2Child;

		// 计算Luhm值
		int k = sumTotal % 10 == 0 ? 10 : sumTotal % 10;
		int luhm = 10 - k;

		if (lastNum == luhm) {
			return SUCCESS;// 验证通过
		} else {
			return ILLEGAL_NUMBER;
		}
	}

	public static void main(String[] args) {
		String bankno = "6214857110432079";
		System.out.println(bankno + ":" + luhmCheck(bankno));
		String bankno1 = "6214856555920672";
		System.out.println(bankno1 + ":" + luhmCheck(bankno1));
		String bankno2 = "6225887851955209";
		System.out.println(bankno2 + ":" + luhmCheck(bankno2));
	}

}
