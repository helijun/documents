package com.monitor.mapper;

import com.github.abel533.mapper.Mapper;
import com.monitor.vo.UserInfo;

public interface UserInfoMapper extends Mapper<UserInfo>{

	UserInfo findByUid(Integer uid);
}
