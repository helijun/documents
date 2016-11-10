package com.monitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monitor.mapper.UserInfoMapper;
import com.monitor.vo.UserInfo;

@Service
public class UserInfoService extends BaseService<UserInfo>{

	@Autowired(required=true)
	UserInfoMapper userInfoMapper;
	
	public UserInfo findByUid(Integer uid) {
		return userInfoMapper.findByUid(uid);
	}
	 
}
