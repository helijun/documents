package com.microman.blog.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.microman.blog.common.CommonResponse;
import com.microman.blog.common.CommonStatus;
import com.microman.blog.service.BlogListService;
import com.microman.blog.vo.BlogList;

/**
 * 博客相关
 * @author helijun
 *
 * @Date 2016-11-11
 */
@Controller
@RequestMapping("/rest/blog")
public class BlogListController {
	@Resource
	BlogListService blogListService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(BlogListController.class);
	
    @RequestMapping(value = "list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse blogInfo(@RequestParam(required=false) Integer listType) {
    	try {
    		LOGGER.info("RestFul of blog/list start");
    		List<BlogList> blogInfo = null;
    		if (StringUtils.isEmpty(listType)) {
    			blogInfo = blogListService.queryAll();
			}else{
				blogInfo = blogListService.queryListByListType(listType);
			}
    		
    		if (null != blogInfo) {
    			LOGGER.info("RestFul of blog/list is successful.blogInfo:{}",blogInfo);
    			return new CommonResponse(CommonStatus.SUCCESS,blogInfo,"获取博客列表成功");
			}else{
				LOGGER.info("RestFul of blog/list is successful.but not have blog list!");
				return new CommonResponse(CommonStatus.SUCCESS,"没有博客列表");
			}
		} catch (Exception e) {
			LOGGER.error("RestFul of record/list is error.",e);
	        return new CommonResponse(CommonStatus.ERROR,"获取博客列表失败");
		}
    }
    
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public CommonResponse blogAdd(@RequestParam String json) {
    	LOGGER.info("RestFul of blog/add start,json:{}",json);
    	BlogList blogList = JSON.parseObject(json, BlogList.class);
    	blogList.setCreateTime(new Date());
    	try {
    		int count = blogListService.save(blogList);
    		if (count > 0) {
    			LOGGER.info("RestFul of rest/record/add is successful.");
    			return new CommonResponse(CommonStatus.SUCCESS,"保存文章成功");
			}else{
				LOGGER.error("Save the blogList is successful.");
				return new CommonResponse(CommonStatus.ERROR,"保存文章失败");
			}
		} catch (Exception e) {
			LOGGER.error("RestFul of rest/record/add is error.",e);
	        return new CommonResponse(CommonStatus.ERROR,"保存文章失败");
		}
    }
}
