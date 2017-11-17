package com.microman.blog.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.microman.blog.vo.BlogList;

public interface BlogListMapper extends Mapper<BlogList>{

	List<BlogList> blogInfo();
}
