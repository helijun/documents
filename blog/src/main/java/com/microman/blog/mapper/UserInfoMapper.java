package com.microman.blog.mapper;

import com.github.abel533.mapper.Mapper;
import com.microman.blog.vo.UserInfo;

public interface UserInfoMapper extends Mapper<UserInfo>{

	UserInfo findByUid(Integer uid);
}
