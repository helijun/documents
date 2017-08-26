package com.microman.blog.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.microman.blog.mapper.WorkPartnerMapper;
import com.microman.blog.mapper.WorkRecordMapper;
import com.microman.blog.util.DateUtil;
import com.microman.blog.vo.WorkPartner;
import com.microman.blog.vo.WorkRecord;

@Service
public class WorkRecordService extends BaseService<WorkRecord>{
	@Resource
	WorkRecordMapper workRecordMapper;
	@Resource
	WorkPartnerService workPartnerService;
	
	public int insertWorkRecord(WorkRecord workRecord){
		return workRecordMapper.insert(workRecord);
	}
	
	public WorkRecord selectWorkRecord(String Date){
		WorkRecord wr = new WorkRecord();
		wr.setrDate(DateUtil.parseDate(Date));
		WorkRecord workRecord = workRecordMapper.selectOne(wr);
		
		try {
			String pidIsfull = workRecord.getpIdIsfull();
			String[] pidIsfullArr= pidIsfull.split(";");
			List<WorkPartner> list = new ArrayList<WorkPartner>();
			for (String pf : pidIsfullArr) {
				WorkPartner workPartner = workPartnerService.selectWorkPartner(new BigInteger(pf.split(",")[0]));
				//0整天、0.5半天，-1没来，其他代表工作小时
				if (pf.split(",")[1].equals("0")) {
					workPartner.setFlag("全勤");
				}else if(pf.split(",")[1].equals("0.5")){
					workPartner.setFlag("半天");
				}else if(pf.split(",")[1].equals("-1")){
					workPartner.setFlag("没来");
				}else{
					workPartner.setFlag("异常");
				}
				list.add(workPartner);
			}
			workRecord.setWorkPartner(list);
			return workRecord;
		} catch (Exception e) {
			// TODO: handle exception
			
		}
		return null;
	}
}
