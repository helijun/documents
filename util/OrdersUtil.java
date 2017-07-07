package com.cramix.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 订单工具类
 * 
 * @author lijinliang
 * @date 2016-08-08
 *
 */
public class OrdersUtil {

    /**
     * 生成系统唯一订单编号（通过用户ID）
     * 
     * @param uid 用户ID(不能空)
     * @return
     */
    public static String buildOrdersId(Long uid) {
        StringBuffer sb = new StringBuffer(String.valueOf(uid));
        // 用户ID统一格式化为8位（千万级），不够位数的补零
        int size = 8 - sb.length();
        for (int i = 0; i < size; i++) {
            sb.append("0");
        }
        // 加入时间戳
        sb.append(System.currentTimeMillis());
        return sb.toString();
    }

    /**
     * 获取支付截止时间
     * 
     * @param date 起保时间
     * @throws ParseException
     */
    public static Date getDayForWeek(Date date) {
        Date payEndDate = null;
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int dayForWeek = 0;
        if (c.get(Calendar.DAY_OF_WEEK) == 1) {
            dayForWeek = 7;// 周日
        } else {
            dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
        }
        // 周二至周六-2
        if (dayForWeek >= 2 && dayForWeek <= 6) {
            payEndDate = DateUtil.dayAddDate(date, -2);
        } else if (dayForWeek == 1) {// 周一 -4
            payEndDate = DateUtil.dayAddDate(date, -4);
        } else if (dayForWeek == 7) { // 周日 -3
            payEndDate = DateUtil.dayAddDate(date, -3);
        }
        //
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String datestr = format.format(payEndDate);
        datestr += " 23:59:59";
        try {
            payEndDate = format1.parse(datestr);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return payEndDate;
    }
 
   public static void main(String[] args) {
       System.out.println(buildOrdersId(1L));
}

}
