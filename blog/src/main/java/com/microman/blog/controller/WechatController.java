package com.microman.blog.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.ClientProtocolException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.microman.blog.util.SignUtil;

@Controller
@RequestMapping("rest/wechat")
public class WechatController {
	
	/*//微信服务器接入token
	@Value("${DNBX_TOKEN}")
    private String DNBX_TOKEN;
	
	//后台工程地址
	@Value("${DANONG_MANAGE_URL}")
	private String DANONG_MANAGE_URL;

	//sso工程地址
	@Value("${DANONG_SSO_URL}")
	private String DANONG_SSO_URL;
	
	//公众号id
	@Value("${WX_APPID}")
	private String WX_APPID;
	
	//根据openid判断是否在我们系统保存用户信息，补授权机制
	@Value("${QUERYISWEIXINAUTHORIZE_URL}")
	private String QUERYISWEIXINAUTHORIZE_URL;
	
	//保存微信授权信息到user表
	@Value("${SAVEWEIXININFOTOUSER_URL}")
	private String SAVEWEIXININFOTOUSER_URL;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WechatController.class);
	
	@Resource
	WechatService wechatService;
	
	*//**
	 * 微信接入
	 * @param wc
	 * @return
	 * @throws IOException 
	 *//*
	@RequestMapping(value="/connect",method = {RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public void connectWeixin(HttpServletRequest request, HttpServletResponse response) throws IOException{
		// 将请求、响应的编码均设置为UTF-8（防止中文乱码）  
        request.setCharacterEncoding("UTF-8");  //微信服务器POST消息时用的是UTF-8编码，在接收时也要用同样的编码，否则中文会乱码；
        response.setCharacterEncoding("UTF-8"); //在响应消息（回复消息给用户）时，也将编码方式设置为UTF-8，原理同上；
		
        boolean isGet = request.getMethod().toLowerCase().equals("get"); 
      
    	PrintWriter out = response.getWriter();
         
    	try {
    		if (isGet) {
            	String signature = request.getParameter("signature");// 微信加密签名  
                String timestamp = request.getParameter("timestamp");// 时间戳  
                String nonce = request.getParameter("nonce");// 随机数  
                String echostr = request.getParameter("echostr");//随机字符串  
                
                // 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败  
                if (SignUtil.checkSignature(DNBX_TOKEN, signature, timestamp, nonce)) {  
                	LOGGER.info("Connect the weixin server is successful.");
                	response.getWriter().write(echostr);  
                } else {  
                	LOGGER.error("Failed to verify the signature!"); 
                }
    		}else{
            	String respMessage = "异常消息！";
            	
            	try {
            		respMessage = wechatService.weixinPost(request);
                	out.write(respMessage);
                	LOGGER.info("The request completed successfully");
                	LOGGER.info("to weixin server "+respMessage);
    			} catch (Exception e) {
    				LOGGER.error("Failed to convert the message from weixin!"); 
    			}
            	
    		}
		} catch (Exception e) {
			LOGGER.error("Connect the weixin server is error.");
		}finally{
			out.close();
		}
	}

	*//**
	 * 微信授权
	 * @param code 使用一次后失效
	 * 
	 * @return 用户基本信息
	 * @throws IOException 
	 *//*
	@RequestMapping(value = "/authorization", method = RequestMethod.GET)
    public void authorizationWeixin(
    		@RequestParam String code,
    		HttpServletRequest request, 
    		HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("UTF-8");  
        response.setCharacterEncoding("UTF-8"); 

        PrintWriter out = response.getWriter();
    	LOGGER.info("RestFul of authorization parameters code:{}",code);
    	
    	try {
    		String rs = wechatService.getOauthAccessToken(code);
    		out.write(rs);
    		LOGGER.info("RestFul of authorization is successful.",rs);
		} catch (Exception e) {
			LOGGER.error("RestFul of authorization is error.",e);
		}finally{
			out.close();
		}
    }
	
	
	*//**
	 * 微信分享证书获取
	 * @param 
	 * @return signature
	 * @throws IOException 
	 *//*
	@RequestMapping(value = "/signature", method = RequestMethod.GET)
    public @ResponseBody String createSignature(
					    		@RequestParam String url) throws IOException{

    	LOGGER.info("RestFul of createSignature parameters url:{}",url);
    	
    	try {
    		String rs = wechatService.createSignature(url);
    		LOGGER.info("RestFul of signature is successful.",rs);
    		
    		return rs;
		} catch (Exception e) {
			LOGGER.error("RestFul of signature is error.",e);
		}
    	
    	return null;
    }
	
	*//**
	 * 发送模板消息
	 * @return
	 *//*
	@RequestMapping(value = "/sendTemplateMessage", method = RequestMethod.POST)
    public @ResponseBody HttpResult sendTemplateMessage(@RequestParam String dataJson){  
    	HttpResult hr = null;
    	LOGGER.info("RestFul of sendTemplateMessage parameters dataJson:{}",dataJson);
    	
    	try {
    		hr = wechatService.sendTemplateMessage(dataJson);
    		LOGGER.info("Send template message is successful!",hr);
		} catch (Exception e) {
			LOGGER.error("RestFul of sendTemplateMessage is error:{}",e);
		}
    	
    	return hr;
    }
	
	*//**
     * 上传车主信息照片
     * 
     * @param photoName type + 时间戳 + 随机字符串
     * 
     * @return 图片的路径、名称，用来图片的预览
     * @throws Exception 
     *//*
    @RequestMapping(value = "/uploadPhoto", method = RequestMethod.POST)
    public @ResponseBody HttpResult uploadPhoto(@RequestParam String serverId,@RequestParam String type) throws Exception{
    	LOGGER.info("RestFul of uploadPhoto parameters serverId:{},type:{}",serverId,type);
    	
    	try {
    		*//** 将图片保存到本地服务器 **//*
        	String photoName = type + new Date().getTime() + UUID.randomUUID().toString();
        	
        	//文件路径不存在则创建
        	File saveFile = new File(PIC_PATH + type);
        	if (!saveFile.mkdir()) saveFile.mkdir();
        	
    		wechatService.saveImageToDisk(serverId, photoName, PIC_PATH + type + "/");
    		LOGGER.info("Download the picture from weixin server pathL:{}",PIC_PATH + type + "/");
    		JSONObject data = new JSONObject();
    		data.put("name", type + "/" + photoName+".jpg");
    		data.put("path", PIC_SERVER + "/");
    		
        	HttpResult rs = new HttpResult();
        	rs.setCode(200);
        	rs.setData(data.toJSONString());
        	LOGGER.info("Download the picture from weixin server is successful!serverId:{},photoName:{}",serverId,photoName);
        	LOGGER.info("HttpResult data:{}",rs.getData());
        	return rs;
		} catch (Exception e) {
			LOGGER.error("Download the picture from weixin server is error",serverId);
			return null;
		}
    }
	*/
}
