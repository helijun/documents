package com.microman.blog.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.abel533.entity.Example;
import com.microman.blog.mapper.BlogListMapper;
import com.microman.blog.vo.BlogList;

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
