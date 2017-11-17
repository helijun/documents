package com.microman.blog.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import com.microman.blog.mapper.PageRecordMapper;
import com.microman.blog.vo.PageRecord;

@Service
public class PageRecordService extends BaseService<PageRecord>{

	@Resource
	PageRecordMapper pageRecordMapper;
	
	public int insertRecord(PageRecord pageRecord) {
		return pageRecordMapper.insertRecord(pageRecord);
	}
	 
}
