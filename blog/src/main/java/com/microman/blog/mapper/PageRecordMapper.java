package com.microman.blog.mapper;

import com.github.abel533.mapper.Mapper;
import com.microman.blog.vo.PageRecord;

public interface PageRecordMapper extends Mapper<PageRecord>{

	int insertRecord(PageRecord pageRecord);
}
