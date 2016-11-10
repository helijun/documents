package com.monitor.vo;

import javax.persistence.Table;

@Table(name = "a_user")
public class UserInfo {

    private String uid;
    
    private String pwd;

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
    
}
