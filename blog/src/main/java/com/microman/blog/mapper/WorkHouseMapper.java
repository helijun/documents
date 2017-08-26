package com.microman.blog.mapper;

import java.math.BigInteger;

import com.github.abel533.mapper.Mapper;
import com.microman.blog.vo.WorkHouse;

public interface WorkHouseMapper extends Mapper<WorkHouse>{

	WorkHouse findByHid(BigInteger hId);
}
