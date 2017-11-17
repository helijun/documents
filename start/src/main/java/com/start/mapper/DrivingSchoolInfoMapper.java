package com.start.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.start.vo.BlogList;
import com.start.vo.DrivingSchoolInfoVO;
import com.start.vo.DrivingSchoolVO;

public interface DrivingSchoolInfoMapper extends Mapper<DrivingSchoolInfoVO>{

	List<DrivingSchoolInfoVO> getDrivingSchoolInfo(DrivingSchoolInfoVO vo);

}
