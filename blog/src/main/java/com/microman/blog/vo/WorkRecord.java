package com.microman.blog.vo;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonFormat;

@Table(name = "fa_work_record")
public class WorkRecord implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -1716073232890839042L;

	//记录id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "rId")
    private BigInteger rid;
    
    //记录者
	@Column(name = "pId")
    private BigInteger pid;
    
    //所属房子id
	@Column(name = "hId")
    private BigInteger hid;
    
    //工作日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Column(name = "r_data")
    private Date rDate;
    
    //农历日期
    @Column(name = "farmer_date")
    private String farmerDate;
    
    //工作者,是否满整天;如1,0;2,1;3,0.5;4,-1; 0全勤、0.5半天，-1没来，其他代表工作小时
    @Column(name = "pId_isfull")
    private String pidIsfull;
    
    //备注
    @Column(name = "remark")
    private String remark;
    
    //天气
    @Column(name = "r_weather")
    private Integer rWeather;
    
    //记录时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Column(name = "create_time")
    private Date createTime;
    
    //被记录者信息
    @Transient
    private List<WorkPartner> workPartner;
    
	public BigInteger getRid() {
		return rid;
	}

	public void setRid(BigInteger rid) {
		this.rid = rid;
	}

	public BigInteger getPid() {
		return pid;
	}

	public void setPid(BigInteger pid) {
		this.pid = pid;
	}

	public BigInteger getHid() {
		return hid;
	}

	public void setHid(BigInteger hid) {
		this.hid = hid;
	}

	public Date getrDate() {
		return rDate;
	}

	public void setrDate(Date rDate) {
		this.rDate = rDate;
	}

	public String getFarmerDate() {
		return farmerDate;
	}

	public void setFarmerDate(String farmerDate) {
		this.farmerDate = farmerDate;
	}

	public String getpIdIsfull() {
		return pidIsfull;
	}

	public void setpIdIsfull(String pIdIsfull) {
		this.pidIsfull = pIdIsfull;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getrWeather() {
		return rWeather;
	}

	public void setrWeather(Integer rWeather) {
		this.rWeather = rWeather;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	public String getPidIsfull() {
		return pidIsfull;
	}

	public void setPidIsfull(String pidIsfull) {
		this.pidIsfull = pidIsfull;
	}

	public List<WorkPartner> getWorkPartner() {
		return workPartner;
	}

	public void setWorkPartner(List<WorkPartner> workPartner) {
		this.workPartner = workPartner;
	}

	public WorkRecord(BigInteger rid, BigInteger pid, BigInteger hid, Date rDate,
			String farmerDate, String pIdIsfull, String remark,
			Integer rWeather, Date createTime) {
		super();
		this.rid = rid;
		this.pid = pid;
		this.hid = hid;
		this.rDate = rDate;
		this.farmerDate = farmerDate;
		this.pidIsfull = pIdIsfull;
		this.remark = remark;
		this.rWeather = rWeather;
		this.createTime = createTime;
	}

	public WorkRecord() {
		super();
	}

}
