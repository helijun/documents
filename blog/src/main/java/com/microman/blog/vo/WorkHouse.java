package com.microman.blog.vo;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "fa_work_house")
public class WorkHouse implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4677097978659427175L;

	//房子id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger hid;
    
    //承包人id
    private BigInteger pid;
    
    //预计需要工作日
    private Integer predictDate;
    
    //开工日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date startDate;
    
    //竣工日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date endDate;
    
    //房子描述
    private String hDescription;
    
    //创建时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;
    
    //最后更新时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lastUpdateTime;

	public BigInteger getHid() {
		return hid;
	}

	public void setHid(BigInteger hid) {
		this.hid = hid;
	}

	public BigInteger getPid() {
		return pid;
	}

	public void setPid(BigInteger pid) {
		this.pid = pid;
	}

	public Integer getPredictDate() {
		return predictDate;
	}

	public void setPredictDate(Integer predictDate) {
		this.predictDate = predictDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String gethDescription() {
		return hDescription;
	}

	public void sethDescription(String hDescription) {
		this.hDescription = hDescription;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}

	public WorkHouse(BigInteger hid, BigInteger pid, Integer predictDate,
			Date startDate, Date endDate, String hDescription, Date createTime,
			Date lastUpdateTime) {
		super();
		this.hid = hid;
		this.pid = pid;
		this.predictDate = predictDate;
		this.startDate = startDate;
		this.endDate = endDate;
		this.hDescription = hDescription;
		this.createTime = createTime;
		this.lastUpdateTime = lastUpdateTime;
	}

	public WorkHouse() {
		super();
	}

}
