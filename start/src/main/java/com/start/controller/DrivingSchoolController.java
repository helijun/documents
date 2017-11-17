package com.start.controller;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.start.common.CommonResponse;
import com.start.common.CommonStatus;
import com.start.service.BlogListService;
import com.start.service.DrivingSchoolService;
import com.start.util.LocationUtils;
import com.start.vo.DrivingSchoolVO;

/**
 * 驾校
 * @author qinxixing
 *
 * @Date 2017-7-25
 */
@Controller
@ResponseBody
@RequestMapping("/driving/school")
public class DrivingSchoolController {
	private static final Logger LOGGER = LoggerFactory.getLogger(DrivingSchoolController.class);
	@Resource
	DrivingSchoolService drivingSchoolService;
	
	    @RequestMapping(value = "getDrivingSchool", method = RequestMethod.POST)
	    public CommonResponse getDrivingSchool(DrivingSchoolVO vo){
	    	List<DrivingSchoolVO> clistVo = drivingSchoolService.getDrivingSchool(vo);
	    	LOGGER.info("查询学校信息");
            return new CommonResponse(0, clistVo);
	    }
        
        
        @RequestMapping(value = "save", method = RequestMethod.POST)
	    public CommonResponse save(DrivingSchoolVO vo){
	    	Integer index = drivingSchoolService.save(vo);
            return new CommonResponse(0, index);
        }
        
        @RequestMapping(value = "update", method = RequestMethod.POST)
	    public CommonResponse update(DrivingSchoolVO vo){
	    	Integer index = drivingSchoolService.update(vo);
            return new CommonResponse(0, index);
        }
        
        
        @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	    public CommonResponse delete(@PathVariable int id){
        	DrivingSchoolVO vo = new DrivingSchoolVO();
        	vo.setId(id);
	    	Integer index = drivingSchoolService.delete(vo);
            return new CommonResponse(0, index);
        }
}
