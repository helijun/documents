package com.microman.blog.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.microman.blog.common.CommonStatus;
import com.microman.blog.common.CommonResponse;
import com.microman.blog.service.PageRecordService;
import com.microman.blog.vo.PageRecord;

/**
 * 页面转换
 * @author helijun
 *
 * @Date 2016-10-25
 */
@Controller
@RequestMapping("/")
public class PageController {
	
	@Resource
	PageRecordService pageRecordService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);
	
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView welcomePage() {
        //return new ModelAndView("mogu/index");
    	return new ModelAndView("blog/list");
    }
    
    @RequestMapping(value = "{fileName}/{pageName}", method = RequestMethod.GET)
    public ModelAndView Page(
    		@PathVariable("fileName") String fileName,
    		@PathVariable("pageName") String pageName) {
        return new ModelAndView(fileName + "/"+ pageName);
    }
    
    /**
     * 保存页面浏览记录
     * @param json 
     * @return
     */
    @RequestMapping(value = "/rest/record/page", method = RequestMethod.POST)
    @ResponseBody
    public CommonResponse PageRecord(@RequestParam String json) {
    	LOGGER.info("RestFul of record/page start,json:{}",json);
    	PageRecord pageRecord = JSON.parseObject(json, PageRecord.class);
    	try {
    		int count = pageRecordService.insertRecord(pageRecord);
    		if (count > 0) {
    			LOGGER.info("RestFul of rest/record/page is successful.");
    			return new CommonResponse(CommonStatus.SUCCESS,"保存页面浏览记录成功");
			}else{
				LOGGER.error("Save the PageRecord is successful.");
				return new CommonResponse(CommonStatus.ERROR,"保存页面浏览记录失败");
			}
		} catch (Exception e) {
			LOGGER.error("RestFul of rest/record/page is error.",e);
	        return new CommonResponse(CommonStatus.ERROR,"保存页面浏览记录失败");
		}
    }
}
