package com.microman.blog.service;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;

import com.microman.blog.mapper.UserInfoMapper;
import com.microman.blog.vo.UserInfo;

@Service
public class UserInfoService extends BaseService<UserInfo>{

	@Resource
	UserInfoMapper userInfoMapper;
	
	public UserInfo findByUid(Integer uid) {
		return userInfoMapper.findByUid(uid);
	}
	 
}
