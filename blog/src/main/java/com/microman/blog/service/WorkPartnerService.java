package com.microman.blog.service;

import java.math.BigInteger;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.microman.blog.mapper.WorkPartnerMapper;
import com.microman.blog.vo.WorkPartner;

@Service
public class WorkPartnerService extends BaseService<WorkPartner>{
	@Resource
	WorkPartnerMapper workPartnerMapper;
	
	public WorkPartner selectWorkPartner(BigInteger pid){
		return workPartnerMapper.selectByPrimaryKey(pid);
	}
}
