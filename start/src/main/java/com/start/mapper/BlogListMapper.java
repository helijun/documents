package com.start.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.start.vo.BlogList;

public interface BlogListMapper extends Mapper<BlogList>{

	List<BlogList> blogInfo();
}
