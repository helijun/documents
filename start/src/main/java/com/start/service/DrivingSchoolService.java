package com.start.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.start.mapper.DrivingSchoolMapper;
import com.start.vo.DrivingSchoolVO;

@Service
public class DrivingSchoolService extends BaseService<DrivingSchoolVO>{

	@Resource
	DrivingSchoolMapper drivingSchoolMapper;
	
	public List<DrivingSchoolVO> getDrivingSchool(DrivingSchoolVO drivingSchoolVO) {
		return drivingSchoolMapper.getDrivingSchool(drivingSchoolVO);
	}
	
	
	public Integer update(DrivingSchoolVO drivingSchoolVO) {
		return drivingSchoolMapper.updateByPrimaryKey(drivingSchoolVO);
	}
	
	public int delete(DrivingSchoolVO drivingSchoolVO) {
		return drivingSchoolMapper.delete(drivingSchoolVO);
	}
	
	public Integer save(DrivingSchoolVO drivingSchoolVO) {
		return drivingSchoolMapper.insert(drivingSchoolVO);
	}

}
