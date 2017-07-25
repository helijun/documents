package com.start.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.abel533.entity.Example;
import com.start.mapper.BlogListMapper;
import com.start.vo.BlogList;

@Service
public class BlogListService extends BaseService<BlogList>{

	@Resource
	BlogListMapper blogListMapper;
	
	public List<BlogList> blogInfo() {
		return blogListMapper.blogInfo();
	}
	
	public List<BlogList> queryListByListType(Integer listType){
		Example example=new Example(BlogList.class); 
		example.createCriteria().andEqualTo("listType", listType);
		return blogListMapper.selectByExample(example);
	}
}
