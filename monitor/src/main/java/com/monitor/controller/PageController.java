package com.monitor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * 页面转换
 * @author helijun
 *
 * @Date 2016-10-25
 */
@Controller
@RequestMapping("/")
public class PageController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView welcomePage() {
        return new ModelAndView("base/welcome");
    }
    
    @RequestMapping(value = "{fileName}/{pageName}", method = RequestMethod.GET)
    public ModelAndView Page(
    		@PathVariable("fileName") String fileName,
    		@PathVariable("pageName") String pageName) {
        return new ModelAndView(fileName + "/"+ pageName);
    }
}
