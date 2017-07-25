package com.start.controller;

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
import com.start.common.CommonResponse;
import com.start.common.CommonStatus;

/**
 * 页面转换
 * @author helijun
 *
 * @Date 2016-10-25
 */
@Controller
@RequestMapping("/")
public class PageController {
	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);
	
    /*@RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView welcomePage() {
    	return new ModelAndView("blog/list");
    }
    
    @RequestMapping(value = "{fileName}/{pageName}", method = RequestMethod.GET)
    public ModelAndView Page(
    		@PathVariable("fileName") String fileName,
    		@PathVariable("pageName") String pageName) {
        return new ModelAndView(fileName + "/"+ pageName);
    }*/
}
