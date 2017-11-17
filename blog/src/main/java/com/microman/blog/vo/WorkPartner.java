package com.microman.blog.vo;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Table(name = "fa_work_partner")
public class WorkPartner implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3790783147713884995L;

	//伙伴id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger pid;
    
    //真实姓名
    private String realName;
    
    //别名
    private String aliasName;
    
    //手机号码
    private String pMobile;
    
    //密码
    private String pPwd;
    
    //地址
    private String pAddress;
    
    //角色
    private Integer pRole;
    
    //归属老板id,0或者空为老板
    private BigInteger parentId;
    
    //头像
    private String pAvatar;
    
    //年龄
    private Integer pAge;
    
    //身份证
    private String idCard;

    //0整体、0.5半天，-1没来，其他代表工作小时
    @Transient
    private String flag;
    
	public BigInteger getpId() {
		return pid;
	}

	public void setpId(BigInteger pId) {
		this.pid = pId;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getAliasName() {
		return aliasName;
	}

	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}

	public String getpMobile() {
		return pMobile;
	}

	public void setpMobile(String pMobile) {
		this.pMobile = pMobile;
	}

	public String getpPwd() {
		return pPwd;
	}

	public void setpPwd(String pPwd) {
		this.pPwd = pPwd;
	}

	public String getpAddress() {
		return pAddress;
	}

	public void setpAddress(String pAddress) {
		this.pAddress = pAddress;
	}

	public Integer getpRole() {
		return pRole;
	}

	public void setpRole(Integer pRole) {
		this.pRole = pRole;
	}

	public BigInteger getParentId() {
		return parentId;
	}

	public void setParentId(BigInteger parentId) {
		this.parentId = parentId;
	}

	public String getpAvatar() {
		return pAvatar;
	}

	public void setpAvatar(String pAvatar) {
		this.pAvatar = pAvatar;
	}

	public Integer getpAge() {
		return pAge;
	}

	public void setpAge(Integer pAge) {
		this.pAge = pAge;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	
	public BigInteger getPid() {
		return pid;
	}

	public void setPid(BigInteger pid) {
		this.pid = pid;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public WorkPartner(BigInteger pid, String realName, String aliasName,
			String pMobile, String pPwd, String pAddress, Integer pRole,
			BigInteger parentId, String pAvatar, Integer pAge, String idCard) {
		super();
		this.pid = pid;
		this.realName = realName;
		this.aliasName = aliasName;
		this.pMobile = pMobile;
		this.pPwd = pPwd;
		this.pAddress = pAddress;
		this.pRole = pRole;
		this.parentId = parentId;
		this.pAvatar = pAvatar;
		this.pAge = pAge;
		this.idCard = idCard;
	}

	public WorkPartner() {
		super();
	}
    
}
