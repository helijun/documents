package com.microman.blog.controller;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.microman.blog.common.CommonResponse;
import com.microman.blog.common.CommonStatus;
import com.microman.blog.service.WorkHouseService;
import com.microman.blog.service.WorkPartnerService;
import com.microman.blog.service.WorkRecordService;
import com.microman.blog.vo.WorkHouse;
import com.microman.blog.vo.WorkPartner;
import com.microman.blog.vo.WorkRecord;

/**
 * 工作记录相关
 * @author helijun
 *
 * @Date 2016-11-02
 */
@Controller
@RequestMapping("/rest/work")
public class WorkController {
	@Resource
	WorkHouseService workHouseService;
	@Resource
	WorkPartnerService workPartnerService;
	@Resource
	WorkRecordService workRecordService;

	/**
	 * 房子信息
	 * @param hId
	 * @return
	 */
    @RequestMapping(value = "/house-detail/{hid}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse findByUid(@PathVariable("hid") BigInteger hId) {
    	try {
    		WorkHouse workHouse = workHouseService.findByHid(hId);
    		if (null != workHouse) {
    			return new CommonResponse(CommonStatus.SUCCESS,workHouse,"获取房子信息成功");
			}else{
				return new CommonResponse(CommonStatus.SUCCESS,"没有该房子");
			}
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"获取房子信息失败");
		}
    }
    
    /**
	 * 房子列表
	 * @param hId
	 * @return
	 */
    @RequestMapping(value = "/house-list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse houseList() {
    	try {
    		List<WorkHouse> workHouse = workHouseService.queryAll();
    		if (null != workHouse) {
    			return new CommonResponse(CommonStatus.SUCCESS,workHouse,"获取房子列表成功");
			}else{
				return new CommonResponse(CommonStatus.SUCCESS,"没有房子");
			}
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"获取房子信息失败");
		}
    }
    
    /**
     * 工友列表
     * @return
     */
    @RequestMapping(value = "/partner-list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse partnerList() {
    	try {
    		List<WorkPartner> list = workPartnerService.queryAll();
    		return new CommonResponse(CommonStatus.SUCCESS,list,"获取工友列表成功");
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"获取工友列表失败");
		}
    }
    
    /**
     * 工友详情
     * @param hId
     * @return
     */
    @RequestMapping(value = "/partner-detail/{pid}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse findByPid(@PathVariable("pid") Long pId) {
    	try {
    		WorkPartner detail = workPartnerService.queryById(pId);
    		return new CommonResponse(CommonStatus.SUCCESS,detail,"获取工友详情成功");
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"获取工友详情失败");
		}
    }
    
    /**
     * 保存工作记录
     * @param hId
     * @return
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public CommonResponse saveRecord(@RequestParam String json) {
    	try {
    		WorkRecord workRecord = JSON.parseObject(json, WorkRecord.class);
    		workRecord.setCreateTime(new Date());
    		workRecord.setrDate(new Date());
    		Integer count = workRecordService.insertWorkRecord(workRecord);
    		if (count > 0) {
    			return new CommonResponse(CommonStatus.SUCCESS,"保存工作记录成功");
			}else{
				return new CommonResponse(CommonStatus.ERROR,"保存工作记录失败");
			}
		} catch (Exception e) {
			return new CommonResponse(CommonStatus.ERROR,"保存工作记录失败");
		}
    }
    
    /**
     * 查询工作记录
     * @param hId
     * @return
     */
    @RequestMapping(value = "/record", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse selectRecord(@RequestParam String date) {
    	try {
    		WorkRecord record = workRecordService.selectWorkRecord(date);
    		if (record != null) {
    			return new CommonResponse(CommonStatus.SUCCESS,record,"查询工作记录成功");
			}else{
				return new CommonResponse(CommonStatus.SUCCESS,date + "没有工作记录");
			}
		} catch (Exception e) {
			return new CommonResponse(CommonStatus.ERROR,"查询工作记录失败");
		}
    }
    
    /**
     * 写日志
     * @param json
     * @return
     */
    @RequestMapping(value = "/save-date-log", method = RequestMethod.GET)
    @ResponseBody
    public CommonResponse saveDateLog(@RequestParam String json) {
    	try {
    		return null;
		} catch (Exception e) {
	        return new CommonResponse(CommonStatus.ERROR,"保存日志失败");
		}
    }
}
