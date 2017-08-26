package com.microman.blog.vo;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*
 * 页面统计
 */
@Table(name = "my_record_page")
public class PageRecord implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//记录id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    
    private String source;
    
    private int page;
    
    private String model;
    
    private int networkState;
    
    private String browser;
    
    private Date createTime;
    private Date updateTime;
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public int getNetworkState() {
		return networkState;
	}
	public void setNetworkState(int networkState) {
		this.networkState = networkState;
	}
	public String getBrowser() {
		return browser;
	}
	public void setBrowser(String browser) {
		this.browser = browser;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public PageRecord(BigInteger id, String source, int page, String model,
			int networkState, String browser, Date createTime, Date updateTime) {
		super();
		this.id = id;
		this.source = source;
		this.page = page;
		this.model = model;
		this.networkState = networkState;
		this.browser = browser;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}
	public PageRecord() {
		super();
	}

}
