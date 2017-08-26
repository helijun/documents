package com.start.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.start.mapper.DrivingSchoolInfoMapper;
import com.start.mapper.DrivingSchoolMapper;
import com.start.vo.DrivingSchoolInfoVO;
import com.start.vo.DrivingSchoolVO;

@Service
public class DrivingSchoolInfoService extends BaseService<DrivingSchoolInfoVO>{

	@Resource
	DrivingSchoolInfoMapper drivingSchoolInfoMapper;
	
	public List<DrivingSchoolInfoVO> getDrivingSchoolInfo(DrivingSchoolInfoVO vo) {
		return drivingSchoolInfoMapper.getDrivingSchoolInfo(vo);
	}
	
	
	public Integer update(DrivingSchoolInfoVO vo) {
		return drivingSchoolInfoMapper.updateByPrimaryKey(vo);
	}
	
	public int delete(DrivingSchoolInfoVO vo) {
		return drivingSchoolInfoMapper.delete(vo);
	}
	
	public Integer save(DrivingSchoolInfoVO vo) {
		return drivingSchoolInfoMapper.insert(vo);
	}

}
