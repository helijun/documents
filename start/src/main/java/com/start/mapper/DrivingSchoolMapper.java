package com.start.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.start.vo.BlogList;
import com.start.vo.DrivingSchoolVO;

public interface DrivingSchoolMapper extends Mapper<DrivingSchoolVO>{

	List<DrivingSchoolVO> getDrivingSchool(DrivingSchoolVO drivingSchoolVO);

}
