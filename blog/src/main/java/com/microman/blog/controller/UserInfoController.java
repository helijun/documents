package com.microman.blog.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.microman.blog.common.CommonStatus;
import com.microman.blog.common.CommonResponse;
import com.microman.blog.service.UserInfoService;
import com.microman.blog.vo.UserInfo;

/**
 * 用户信息
 * @author helijun
 *
 * @Date 2016-10-25
 */
@Controller
@RequestMapping("/rest/user")
public class UserInfoController {
	@Resource
	UserInfoService userInfoService;
	
    @RequestMapping(value = "{uid}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse findByUid(@PathVariable("uid") Integer uid) {
    	try {
    		UserInfo userInfo = userInfoService.findByUid(uid);
    		if (null != userInfo) {
    			return new CommonResponse(CommonStatus.SUCCESS,userInfo,"获取用户信息成功");
			}else{
				return new CommonResponse(CommonStatus.SUCCESS,"没有该用户");
			}
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"获取用户信息失败");
		}
    }
}
