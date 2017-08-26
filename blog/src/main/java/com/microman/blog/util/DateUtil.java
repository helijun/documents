package com.microman.blog.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;

/**
 * 日期工具类
 * 
 * @author
 * 
 */
public class DateUtil {

	/**
	 * 计算日期加月数 返回String
	 * 
	 * @param date
	 * @param mth
	 * @return
	 */
	public static String monthAdd(Date date, int mth) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置当前日期
		calendar.add(Calendar.MONTH, mth);// 月份+
		return sdf.format(calendar.getTime());// 输出格式化的日期

	}

	/**
	 * 计算日期加月数 返回Date
	 * 
	 * @param date
	 * @param mth
	 * @return
	 */
	public static Date monthAddDate(Date date, int mth) {
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置当前日期
		calendar.add(Calendar.MONTH, mth);// 月份+
		return calendar.getTime();// 输出格式化的日期

	}

	/**
	 * 计算日期加天数 返回String
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static String dayAdd(Date date, int days) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置当前日期
		calendar.add(Calendar.DAY_OF_MONTH, days);// 天数+
		return sdf.format(calendar.getTime());// 输出格式化的日期

	}

	/**
	 * 计算日期加天数 返回Date
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date dayAddDate(Date date, int days) {
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置当前日期
		calendar.add(Calendar.DAY_OF_MONTH, days);// 天数+
		return calendar.getTime();// 输出格式化的日期

	}

	/**
	 * 计算日期加天数 返回String
	 * 
	 * @param sDate
	 * @param days
	 * @return
	 */
	public static String dayAdd(String sDate, int days) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		Calendar calendar = Calendar.getInstance();// 日历对象
		try {
			calendar.setTime(sdf.parse(sDate));
		} catch (ParseException e) {
			e.printStackTrace();
		}// 设置当前日期
		calendar.add(Calendar.DAY_OF_MONTH, days);// 天数+
		return sdf.format(calendar.getTime());// 输出格式化的日期

	}

	/**
	 * 日期加减操作（年）正数为加，负数为减
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date yearUpdateDate(Date date, int year) {
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置当前日期
		calendar.add(Calendar.YEAR, year);//
		return calendar.getTime();// 输出格式化的日期

	}

	/**
	 * 设置时间为：23：59:59，日期不变
	 * 
	 * @param date
	 * @return
	 */
	public static Date setEndTime(Date date) {
		Calendar calendar = Calendar.getInstance();// 日历对象
		calendar.setTime(date);// 设置时间
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		return calendar.getTime();// 输出格式化的日期

	}

	/**
	 * 格式化时间
	 * 
	 * @param date
	 * @return
	 */
	public static Date parseDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		Date forMatDate = null;
		try {
			forMatDate = sdf.parse(sdf.format(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return forMatDate;
	}

	public static String parseString(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		String forMatDate = "";
		try {
			forMatDate = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return forMatDate;
	}

	public static String parseString(Date date, String pattern) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);// 格式化对象
		String forMatDate = "";
		try {
			forMatDate = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return forMatDate;
	}

	public static String parseStringMM(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");// 格式化对象
		String forMatDate = "";
		try {
			forMatDate = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return forMatDate;
	}

	public static String parseStringMMdd(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");// 格式化对象
		String forMatDate = "";
		try {
			forMatDate = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

		return forMatDate;
	}

	public static String parseStringHHMMSS(Date date) {
		if (date == null) {
			return "";
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 格式化对象
		String forMatDate = "";
		try {
			forMatDate = sdf.format(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return forMatDate;
	}

	/**
	 * 格式化时间
	 * 
	 * @param str
	 * @return
	 */
	public static Date parseDate(String str) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 格式化对象
		Date forMatDate = null;
		try {
			forMatDate = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return forMatDate;
	}

	/**
	 * 
	 * @param str
	 * @param format
	 * @return
	 */
	public static Date parseDate(String str, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);// 格式化对象
		Date forMatDate = null;
		try {
			forMatDate = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return forMatDate;
	}

	/**
	 * 格式化时间
	 * 
	 * @param str
	 * @return
	 */
	public static Date parseDateHour(String str) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 格式化对象
		Date forMatDate = null;
		try {
			forMatDate = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return forMatDate;
	}

	/**
	 * 根据起始 日期计算 间隔年 数
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int calculateYears(Date startDate, Date endDate) {
		if (startDate == null || endDate == null) {
			return 0;
		}
		long lstart = startDate.getTime();
		long lend = endDate.getTime();
		int days = (int) ((lend - lstart) / (1000 * 60 * 60 * 24));
		int year = days / 365;
		return year;

	}

	/**
	 * 计算日期间隔天数
	 * 
	 * @param smdate
	 * @param bdate
	 * @return
	 * @throws
	 * @throws ParseException
	 */
	public static int daysBetween(Date smdate, Date bdate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			smdate = sdf.parse(sdf.format(smdate));
			bdate = sdf.parse(sdf.format(bdate));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Calendar cal = Calendar.getInstance();
		cal.setTime(smdate);
		long time1 = cal.getTimeInMillis();
		cal.setTime(bdate);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);
		return Integer.parseInt(String.valueOf(between_days));
	}

	/**
	 * 计算日期间隔天数
	 * 
	 * @param smdate
	 * @param bdate
	 * @return
	 * @throws ParseException
	 */
	public static int daysBetween(String smdate, String bdate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		try {
			cal.setTime(sdf.parse(smdate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long time1 = cal.getTimeInMillis();
		try {
			cal.setTime(sdf.parse(bdate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);
		return Integer.parseInt(String.valueOf(between_days));
	}

	/**
	 * 截取小数点后2位
	 * 
	 * @param num
	 * @return
	 */
	public static double subLastTwo(double num) {
		BigDecimal b = new BigDecimal(num);
		double newNum = b.setScale(2, BigDecimal.ROUND_DOWN).doubleValue();
		return newNum;
	}

	/**
	 * 获取当月第一天
	 * 
	 * @return
	 */
	public static Date getMonthFirstDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		// 获取前月的第一天
		c.add(Calendar.MONTH, 0);
		c.set(Calendar.DAY_OF_MONTH, 1);
		return c.getTime();

	}

	/**
	 * 获取当月最后一天
	 * 
	 * @return
	 */
	public static Date getMonthLastDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		// 获取前月的最后一天
		c.add(Calendar.MONTH, 1);
		c.set(Calendar.DAY_OF_MONTH, 0);
		return c.getTime();
	}

	/**
	 * 查询日期间隔 描述
	 * 
	 * @param begin
	 * @param end
	 * @return
	 */
	public static Integer getDateBetweenSeconds(Date begin, Date end) {
		Long milliSeconds = end.getTime() - begin.getTime();
		Long seconds = milliSeconds / 1000;
		return seconds.intValue();
	}

	/**
	 * 获取一年毫秒数
	 * 
	 * @return
	 */
	public static Long getOneYearMilliseconds() {
		Long l = 60 * 60 * 24 * 365 * 1000L;
		return l;
	}

	/**
	 * // * 时间加一年，再减一天
	 * 
	 * @param time
	 * @return
	 */
	public static Date getPaulEndDate(Date time) {
		Date date = dayAddDate(DateUtil.monthAddDate(time, 12), -1);
		return date;
	}

	public static String getPaulEndDateString(Date time) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = dayAddDate(DateUtil.monthAddDate(time, 12), -1);
		return format.format(date);
	}

	/**
	 * 时间比较函数 (返回最小的时间)
	 * 
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static Date compareDate(Date date1, Date date2) {
		Calendar ca1 = Calendar.getInstance();
		Calendar ca2 = Calendar.getInstance();
		ca1.setTime(date1);
		ca1.setTime(date2);
		int result = ca1.compareTo(ca2);
		if (result == 0) {// c1相等c2
			return date1;
		} else if (result < 0) {// c1小于c2
			return date1;
		} else {// c1大于c2
			return date2;
		}
	}

	/**
	 * 取得当前日期所在周的第一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getFirstDayOfWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
		return calendar.getTime();
	}

	/**
	 * 取得当前日期所在周的最后一天
	 *
	 * @param date
	 * @return
	 */
	public static Date getLastDayOfWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek() + 6);
		return calendar.getTime();
	}

	/**
	 * 获取本周第一天
	 * 
	 * @return
	 */
	public static Date getWeekFirstDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		// 获取本周的第一天
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		return calendar.getTime();
	}

	/**
	 * 获取本周星期几
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date getWeekDay(Date date, int days) {
		Calendar calendar = Calendar.getInstance();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek() + days);
		return calendar.getTime();
	}

	/**
	 * 测试方法
	 * 
	 */
	public static void main(String[] args) throws Exception {
		System.out.println(DateFormatUtils.format(getFirstDayOfWeek(new Date()), "yyyy-MM-dd HH:mm:ss"));
		System.out.println(DateFormatUtils.format(getLastDayOfWeek(new Date()), "yyyy-MM-dd HH:mm:ss"));
		System.out.println(DateFormatUtils.format(getWeekFirstDay(new Date()), "yyyy-MM-dd HH:mm:ss"));
		System.out.println(DateFormatUtils.format(getWeekDay(new Date(), 5), "yyyy-MM-dd HH:mm:ss"));

	}

}
