package com.monitor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.monitor.common.CommonStatus;
import com.monitor.common.JsonResult;
import com.monitor.service.UserInfoService;
import com.monitor.vo.UserInfo;

/**
 * 用户信息
 * @author helijun
 *
 * @Date 2016-10-25
 */
@Controller
@RequestMapping("/rest/user")
public class UserInfoController {
	@Autowired
	UserInfoService userInfoService;
	
    @RequestMapping(value = "{uid}", method = RequestMethod.GET)
    @ResponseBody
    public JsonResult findByUid(@PathVariable("uid") Integer uid) {
    	try {
    		UserInfo userInfo = userInfoService.findByUid(uid);
    		if (null != userInfo) {
    			return new JsonResult(CommonStatus.SUCCESS,userInfo,"获取用户信息成功");
			}else{
				return new JsonResult(CommonStatus.SUCCESS,"没有该用户");
			}
		} catch (Exception e) {
	        return new JsonResult(CommonStatus.ERROR,"获取用户信息失败");
		}
    }
}
