package com.cramix.common.utils;

 

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLDecoder;
import java.text.MessageFormat;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.URI;
import org.apache.commons.httpclient.methods.GetMethod;

import com.cramix.common.constants.ConstComn;

 

/**
 * 发送短信工具类
 * 
 *
 */
public class MessageSendUtil {

	/**
	 * 
	 * @param url
	 *            应用地址，类似于http://ip:port/msg/
	 * @param account
	 *            账号
	 * @param pswd
	 *            密码
	 * @param mobile
	 *            手机号码，多个号码使用","分割
	 * @param msg
	 *            短信内容
	 * @param needstatus
	 *            是否需要状态报告，需要true，不需要false
	 * @return 返回值定义参见HTTP协议文档
	 * @throws Exception
	 */
	public static String batchSend(String url, String account, String pswd, String mobile, String msg, String needstatus, String extno) throws Exception {
	    HttpClient client = new HttpClient();
            GetMethod method = new GetMethod();
            try {
                    URI base = new URI(url, false);
                    method.setURI(new URI(base, "", false));
                    method.setQueryString(new NameValuePair[] {
                                    new NameValuePair("un", account),
                                    new NameValuePair("pw", pswd),
                                    new NameValuePair("phone", mobile),
                                    new NameValuePair("msg", msg),
                                    new NameValuePair("rd", needstatus),
                                    new NameValuePair("extno", extno) });
                    int result = client.executeMethod(method);
                    if (result == HttpStatus.SC_OK) {
                            InputStream in = method.getResponseBodyAsStream();
                            ByteArrayOutputStream baos = new ByteArrayOutputStream();
                            byte[] buffer = new byte[1024];
                            int len = 0;
                            while ((len = in.read(buffer)) != -1) {
                                    baos.write(buffer, 0, len);
                            }
                            in.close();// 1
                            baos.close();// 2
                            return URLDecoder.decode(baos.toString(), "UTF-8");
                    } else {
                            throw new Exception("HTTP ERROR Status: " + method.getStatusCode() + ":" + method.getStatusText());
                    }
            } finally {
                    method.releaseConnection();
            }
	}

	/**
	 * 发送验证码短信
	 * @param mobile
	 * @param msg
	 * @return
	 */
	public static String send(String mobile, String msg) {
		String url = ConstComn.MESSAGE_URL;
		/*String account = ConstComn.MESSAGE_ACCOUNT;
		String pswd = ConstComn.MESSAGE_PASSWORD;*/
		String account ="N3698783";
                String pswd ="mxlbQJkr0";
		// System.out.println("手机号：" + mobile + " 短信内容：" + msg);
		String needstatus = "1";// 是否需要状态报告，需要1，不需要0
		// String product = null;
		String extno = null;// 扩展码
		String returnString = "";
		try {
			returnString = MessageSendUtil.batchSend(url, account, pswd, mobile, msg, needstatus, extno);
			System.out.println("短信发送成功 returnString：" + returnString);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnString;

	}
	/**
         * 发送营销短信
         * @param mobile
         * @param msg
         * @return
         */
        public static String sendMarketing(String mobile, String msg) {
                String url = ConstComn.MESSAGE_URL;
                /*String account = ConstComn.MESSAGE_ACCOUNT;
                String pswd = ConstComn.MESSAGE_PASSWORD;*/
                String account ="M1431655";
                String pswd ="aYQ4vqHldVa3d4";
                // System.out.println("手机号：" + mobile + " 短信内容：" + msg);
                String needstatus = "1";// 是否需要状态报告，需要1，不需要0
                // String product = null;
                String extno = null;// 扩展码
                String returnString = "";
                try {
                        returnString = MessageSendUtil.batchSend(url, account, pswd, mobile, msg, needstatus, extno);
                        System.out.println("短信发送成功 returnString：" + returnString);
                } catch (Exception e) {
                        e.printStackTrace();
                }
                return returnString;

        }

	/**
	 * 测试短信接口方法
	 */
	public static void main(String[] args) {
		MessageSendUtil.sendMarketing("18665925535", MessageFormat.format(ConstComn.MESSAGE_CONTENT, "225678"));
		
	}

}
