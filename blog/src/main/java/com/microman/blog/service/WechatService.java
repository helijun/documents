package com.microman.blog.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Date;
import java.util.Formatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.ClientProtocolException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

@Service
public class WechatService {
	private static final Logger LOGGER = LoggerFactory.getLogger(WechatService.class);

	/*@Autowired(required = true)
	private RedisService redisService;// 引入redis
	
	//后台工程地址
	@Value("${DANONG_MANAGE_URL}")
	private String DANONG_MANAGE_URL;

	//sso工程地址
	@Value("${DANONG_SSO_URL}")
	private String DANONG_SSO_URL;
	
	//微信授权地址
	@Value("${WX_OAUTH_ACCESS_TOKEN_URL}")
	private String WX_OAUTH_ACCESS_TOKEN_URL;
		
	//微信服务号id
	@Value("${WX_APPID}")
	private String WX_APPID;
		
	//微信服务号密码
	@Value("${WX_APPSECRET}")
	private String WX_APPSECRET;
	
	//微信授权全局基础access_token
	@Value("${WX_BASE_ACCESS_TOKEN}")
	private String WX_BASE_ACCESS_TOKEN;

	*//**
	 * 处理微信发来的请求
	 * 
	 * @param request
	 * @return
	 *//*
	public String weixinPost(HttpServletRequest request) {
		String respMessage = null;
		try {

			// xml请求解析
			Map<String, String> requestMap = MessageUtil.xmlToMap(request);

			// 发送方帐号（open_id）
			String fromUserName = requestMap.get("FromUserName");
			// 公众帐号
			String toUserName = requestMap.get("ToUserName");
			// 消息类型
			String msgType = requestMap.get("MsgType");
			// 消息内容
			String content = requestMap.get("Content");
			
			LOGGER.info("FromUserName is:" + fromUserName + ", ToUserName is:" + toUserName + ", MsgType is:" + msgType);

			// 文本消息
			if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {
				//微信聊天机器人测试 2015-3-31
				if(content != null){
					respContent = TulingApiProcess.getTulingResult(content);
					if(respContent==""||null==respContent){
						MessageResponse.getTextMessage(fromUserName , toUserName , "服务号暂时无法回复，请稍后再试！");
					}
					//return FormatXmlProcess.formatXmlAnswer(toUserName, fromUserName, respContent);
					return MessageResponse.getTextMessage(fromUserName , toUserName , respContent);
				}
				
				//自动回复
				TextMessage text = new TextMessage();
				text.setContent("the text is" + content);
				text.setToUserName(fromUserName);
				text.setFromUserName(toUserName);
				text.setCreateTime(new Date().getTime() + "");
				text.setMsgType(msgType);
				
				respMessage = MessageUtil.textMessageToXml(text);
				
//				else if (content.startsWith("ZY")) {//查作业
//					String keyWord = content.replaceAll("^ZY" , "").trim();
//					if ("".equals(keyWord)) {
//						respContent = AutoReply.getXxtUsage("24");
//					} else {
//						return XxtService.getHomework("24" , fromUserName , toUserName , keyWord);
//					}
//				} else if (content.startsWith("SJX")) {//收件箱
//					String keyWord = content.replaceAll("^SJX" , "").trim();
//					if ("".equals(keyWord)) {
//						respContent = AutoReply.getXxtUsage("25");
//					} else {
//						return XxtService.getRecvBox("25" , fromUserName , toUserName , keyWord);
//					}
//				}
//				return MessageResponse.getTextMessage(fromUserName , toUserName , respContent);
			} else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {// 事件推送
				String eventType = requestMap.get("Event");// 事件类型
				
				if (eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {// 订阅
					respContent = "欢迎关注沪动校讯通！";
					return MessageResponse.getTextMessage(fromUserName , toUserName , respContent);
				} else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {// 取消订阅
					// TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息
				} else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {// 自定义菜单点击事件
					String eventKey = requestMap.get("EventKey");// 事件KEY值，与创建自定义菜单时指定的KEY值对应
					logger.info("eventKey is:" +eventKey);
					return MenuClickService.getClickResponse(eventKey , fromUserName , toUserName);
				}
			}
			//开启微信声音识别测试 2015-3-30
			else if(msgType.equals("voice"))
			{
				String recvMessage = requestMap.get("Recognition");
				//respContent = "收到的语音解析结果："+recvMessage;
				if(recvMessage!=null){
					respContent = TulingApiProcess.getTulingResult(recvMessage);
				}else{
					respContent = "您说的太模糊了，能不能重新说下呢？";
				}
				return MessageResponse.getTextMessage(fromUserName , toUserName , respContent); 
			}
			//拍照功能
			else if(msgType.equals("pic_sysphoto"))
			{
				
			}
			else
			{
				return MessageResponse.getTextMessage(fromUserName , toUserName , "返回为空"); 
			}
			// 事件推送
			else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
				String eventType = requestMap.get("Event");// 事件类型
				// 订阅
				if (eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {
					
					TextMessage text = new TextMessage();
					text.setContent("欢迎关注，达农保险~																			在这里你可以点击“车险询价”为你的爱车购买车险，同时也将定时收到我们的精选内容！参加我们的各种活动赢取福利~后续我们将会推出各种性价比的保险产品，敬请期待！");
					text.setToUserName(fromUserName);
					text.setFromUserName(toUserName);
					text.setCreateTime(new Date().getTime() + "");
					text.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
					
					respMessage = MessageUtil.textMessageToXml(text);
				} 
				// TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息
				else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {// 取消订阅
					
					
				} 
				// 自定义菜单点击事件
				else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {
					String eventKey = requestMap.get("EventKey");// 事件KEY值，与创建自定义菜单时指定的KEY值对应
					if (eventKey.equals("customer_telephone")) {
						TextMessage text = new TextMessage();
						text.setContent("0755-86671980");
						text.setContent("0755-86671806");
						text.setToUserName(fromUserName);
						text.setFromUserName(toUserName);
						text.setCreateTime(new Date().getTime() + "");
						text.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
						
						respMessage = MessageUtil.textMessageToXml(text);
					}
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return respMessage;
	}
	
	*//**
	 * 微信全局票据 ---->>>> access_token
	 * @return
	 * @throws ClientProtocolException
	 * @throws IOException
	 *//*
	public String getBaseAccessToken() throws ClientProtocolException, IOException{
		
		try {
			String value = redisService.get("WEIXIN_BASE_ACCESS_TOKEN");
			if (!StringUtils.isEmpty(value)) {
				LOGGER.info("Get base access_token from redis is successful.value:{}",value);
				return value;
			}else{
				synchronized (this) {
					//缓存中没有、或已经失效
					String url = WX_BASE_ACCESS_TOKEN + "?grant_type=client_credential&appid="+WX_APPID+"&secret="+ WX_APPSECRET;
					String rs = apiService.doGet(url);
					
					JSONObject obj_content = JSONObject.parseObject(rs);
					String accessToken = obj_content.getString("access_token");
					Integer time = Integer.parseInt(obj_content.getString("expires_in").toString());
					
					//写缓存
					redisService.set("WEIXIN_BASE_ACCESS_TOKEN", accessToken, time - 3600);
					LOGGER.info("Set base access_token to redis is successful.parameters time:{},realtime",time,time-3600);
					return accessToken;
				}
			}
		} catch (Exception e) {
			LOGGER.error("Get base access_token from redis is error.");
		}
		return null;
	}

	*//**
	 * 根据code 获取授权的token 仅限授权时使用，与全局的access_token不同
	 * @param code
	 * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
	 *//*
	public String getOauthAccessToken(String code) throws ClientProtocolException, IOException{
		String data = redisService.get("WEIXIN_SQ_ACCESS_TOKEN");
		String rs_access_token = null;
		String rs_openid = null;
		String url = WX_OAUTH_ACCESS_TOKEN_URL + "?appid="+WX_APPID+"&secret="+WX_APPSECRET+"&code="+code+"&grant_type=authorization_code";
		if (StringUtils.isEmpty(data)) {
			synchronized (this) {
				//已过期，需要刷新
				String hs = apiService.doGet(url);
				JSONObject json = JSONObject.parseObject(hs);
				String refresh_token = json.getString("refresh_token");
	
				String refresh_url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="+WX_APPID+"&grant_type=refresh_token&refresh_token="+refresh_token;
				String r_hs = apiService.doGet(refresh_url);
				JSONObject r_json = JSONObject.parseObject(r_hs);
				String r_access_token = r_json.getString("access_token");
				String r_expires_in = r_json.getString("expires_in");
				rs_openid = r_json.getString("openid");
				
				rs_access_token = r_access_token;
				redisService.set("WEIXIN_SQ_ACCESS_TOKEN", r_access_token, Integer.parseInt(r_expires_in) - 3600);
				LOGGER.info("Set sq access_token to redis is successful.parameters time:{},realtime",Integer.parseInt(r_expires_in), Integer.parseInt(r_expires_in) - 3600);
			}
		}else{
			//还没有过期
			String hs = apiService.doGet(url);
			JSONObject json = JSONObject.parseObject(hs);
			rs_access_token = json.getString("access_token");
			rs_openid = json.getString("openid");
			LOGGER.info("Get sq access_token from redis is successful.rs_access_token:{},rs_openid:{}",rs_access_token,rs_openid);
		}
		
		return getOauthUserInfo(rs_access_token,rs_openid);
	}
	
	*//**
	 * 根据授权token获取用户信息
	 * @param access_token
	 * @param openid
	 * @return
	 *//*
	public String getOauthUserInfo(String access_token,String openid){
		String url = "https://api.weixin.qq.com/sns/userinfo?access_token="+ access_token +"&openid="+ openid +"&lang=zh_CN";
		try {
			String hs = apiService.doGet(url);
			
			//保存用户信息
			saveWeixinUser(hs);
			
			return hs;
		} catch (IOException e) {
			LOGGER.error("RestFul of authorization is error.",e);
		}
		return null;
	}
	
	//保存用户信息
	public HttpResult saveWeixinUser(String json) throws IOException{
		JSONObject obj_content = JSONObject.parseObject(json);
		
		//保存用户信息
		String save_url = DANONG_SSO_URL + SAVEUSERWEIXIN_URL;
		Map<String, String> map = new HashMap<String, String>();
		map.put("city", obj_content.getString("city"));
		map.put("country", obj_content.getString("country"));
		map.put("headimgurl", obj_content.getString("headimgurl"));
		map.put("language", obj_content.getString("language"));
		map.put("nickname", obj_content.getString("nickname"));
		map.put("openid", obj_content.getString("openid") );
		map.put("privilege", obj_content.getString("privilege"));
		map.put("province", obj_content.getString("province"));
		map.put("sex", obj_content.getString("sex"));
		map.put("mobile", obj_content.getString("mobile"));
		
		return apiService.doPost(save_url,map);
	}
	
	*//**
	 * jsapi_ticket是公众号用于调用微信JS接口的临时票据
	 * @return
	 * @throws IOException 
	 * @throws ClientProtocolException 
	 *//*
	public String getJsapiTicket() throws ClientProtocolException, IOException{
		try {
			String value = redisService.get("WEIXIN_JS_API_TICKET");
			if (!StringUtils.isEmpty(value)) {
				return value;
			}else{
				synchronized (this) {
					//缓存中没有、或已经失效
					//获取全局的access_token，唯一票据
					String accessToken = getBaseAccessToken();
					
					String url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+ accessToken +"&type=jsapi";
					
					String rs = apiService.doGet(url);
					
					JSONObject obj_content = JSONObject.parseObject(rs);
					String jsapi_ticket = obj_content.getString("ticket");
					Integer time = Integer.parseInt(obj_content.getString("expires_in").toString());
					
					//写缓存
					redisService.set("WEIXIN_JS_API_TICKET", jsapi_ticket, time - 200);
					
					return jsapi_ticket;
				}
			}
		} catch (Exception e) {
			LOGGER.error("Get js_api_ticket from redis is error:{}",e);
		}
		
		return null;
	}
	
	*//**
	 * 根据jsapi_ticket等参数进行SHA1加密
	 * @param nonceStr
	 * @param timestamp
	 * @param url
	 * @return
	 * @throws ClientProtocolException
	 * @throws IOException
	 *//*
	public String createSignature(String url) throws ClientProtocolException, IOException{
		String nonceStr = create_nonce_str();
		String timestamp = create_timestamp();
		
		String signature="jsapi_ticket="+getJsapiTicket();
			   signature+="&noncestr="+nonceStr;
			   signature+="&timestamp="+timestamp;
			   signature+="&url="+url;
		
	   try {
            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            crypt.update(signature.getBytes("UTF-8"));
            signature = byteToHex(crypt.digest());
        } catch (Exception e) {
        	LOGGER.error("Signature for SHA-1 is error:{}",e);
        }
	   
		Map<String, String> map = new HashMap<String, String>();
		map.put("timestamp", timestamp);
	    map.put("nonceStr", nonceStr);
	    map.put("signature", SHA1.encode(signature)signature);
	    map.put("appid", WX_APPID);
		return JSON.toJSONString(map, true);
	}
	
	private static String byteToHex(final byte[] hash) {
        Formatter formatter = new Formatter();
        for (byte b : hash) {
            formatter.format("%02x", b);
        }
        String result = formatter.toString();
        formatter.close();
        return result;
    }
	
	*//**
	 * 生成随机的字符串
	 * @return
	 *//*
	private static String create_nonce_str() {
        return UUID.randomUUID().toString();
    }

	*//**
	 * 时间格式化
	 * @return
	 *//*
    private static String create_timestamp() {
        return Long.toString(System.currentTimeMillis() / 1000);
    }

    *//**
     * 发送模板消息
     * @param dataJson
     * @return
     * @throws IOException
     *//*
    public HttpResult sendTemplateMessage(String dataJson) throws IOException{
		String doUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+getBaseAccessToken();
		
		JSONObject data = JSONObject.parseObject(dataJson);
		Object touser = data.get("touser");
		
		String template_id = null;
		String templateType = data.get("templateType") + "";
		
		Object url = data.get("url");
		Object first = data.get("first");
		Object remark = data.get("remark");
		Object keyword1 = data.get("keyword1");
		Object keyword2 = data.get("keyword2");
		Object keyword3 = data.get("keyword3");
		Object keyword4 = null;
		Object keyword5 = null;
		
		JSONObject parentJSON = new JSONObject();
		parentJSON.put("touser", touser);
		
		if ("1".equals(templateType)) {
			template_id = TEMPLATE_ONE;//投保成功通知，暂时不用
		}else if("2".equals(templateType)){
			template_id = TEMPLATE_TWO;//车险保费询价成功通知 有keyword4、5
			keyword4 = data.get("keyword4");
			keyword5 = data.get("keyword5");
		}else if("3".equals(templateType)){//保单出单通知
			template_id = TEMPLATE_THREE;
		}else{
			template_id = "";
		}
		
		parentJSON.put("template_id", template_id);
		parentJSON.put("url", url);

		JSONObject json = new JSONObject();
    	json.put("first", toJson(first+""));
    	json.put("keyword1", toJson(keyword1+""));
    	json.put("keyword2", toJson(keyword2+""));
    	json.put("keyword3", toJson(keyword3+""));
    	json.put("keyword4", toJson(keyword4+""));
    	
    	if("2".equals(templateType)){
    		json.put("keyword4", toJson(keyword4+""));
    		json.put("keyword5", toJson(keyword5+""));
    	}  
    	
    	json.put("remark", toJson(remark+""));
    	
    	parentJSON.put("data", json);

    	HttpResult rs = null;
    	try {
    		rs = apiService.doPostJson(doUrl,parentJSON.toJSONString());
		} catch (Exception e) {
			LOGGER.error("RestFul of doLogin is error:{}",e);
		}
    	
    	return rs;
	}
	
	public JSONObject toJson(String value){
		JSONObject json = new JSONObject();
    	json.put("value", value);
    	json.put("color", "#173177");
    	return json;
	}
	
	*//**
	 * 根据文件id下载文件 
	 * @param accessToken
	 * @param mediaId 
	 * @return 文件流对象
	 *//*
	public InputStream getInputStream(String accessToken, String mediaId) {  
        InputStream is = null;  
        String url = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token="+ accessToken + "&media_id=" + mediaId;  
        try {  
            URL urlGet = new URL(url);  
            HttpURLConnection http = (HttpURLConnection) urlGet.openConnection();  
            http.setRequestMethod("GET"); // 必须是get方式请求  
            http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");  
            http.setDoOutput(true);  
            http.setDoInput(true);  
            System.setProperty("sun.net.client.defaultConnectTimeout", "30000");// 连接超时30秒  
            System.setProperty("sun.net.client.defaultReadTimeout", "30000"); // 读取超时30秒  
            http.connect();  
            // 获取文件转化为byte流  
            is = http.getInputStream();  
        } catch (Exception e) {  
        	LOGGER.error("Failed to convert inputStream from weixin server,accessToken:{},mediaId:{}",accessToken,mediaId);
        }  
        return is;  
  
    }  
	
	*//**
	 * 获取下载图片信息（jpg）
	 * @param accessToken 
	 * @param mediaId 
	 * @param picName
	 * @param picPath
	 * @throws Exception
	 *//*
	public void saveImageToDisk(String mediaId, String picName, String picPath)throws Exception {  
		String accessToken = getBaseAccessToken();
		InputStream inputStream = getInputStream(accessToken, mediaId); 
        
        // 循环取出流中的数据
        byte[] data = new byte[1024];  
        int len = 0;  
        FileOutputStream fileOutputStream = null;  
        try {  
            fileOutputStream = new FileOutputStream(picPath+picName+".jpg");  
            while ((len = inputStream.read(data)) != -1) {  
                fileOutputStream.write(data, 0, len);  
            }  
            LOGGER.info("Write the fileInputStream is successful");
        } catch (IOException e) {  
            LOGGER.error("Write the fileInputStream is error");
        } finally {  
            if (inputStream != null) {  
                try {  
                    inputStream.close();  
                } catch (IOException e) {  
                	LOGGER.error("Close the fileInputStream is error");
                }  
            }  
            if (fileOutputStream != null) {  
                try {  
                    fileOutputStream.close();  
                } catch (IOException e) {  
                	LOGGER.error("Close the fileOutputStream is error");
                }  
            }  
        }  
    }  */

}
