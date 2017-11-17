package com.start.vo;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "t_driving_school_info")
public class DrivingSchoolInfoVO implements Serializable  {
	
	private static final long serialVersionUID = 3463786979561856007L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int dsid;
	private String img;
	private String name;
	private String details;
	private String address;
	private String longitudeAndLatitude;
	private String functionary;
	private String phone;
	private String video;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getDsid() {
		return dsid;
	}
	public void setDsid(int dsid) {
		this.dsid = dsid;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLongitudeAndLatitude() {
		return longitudeAndLatitude;
	}
	public void setLongitudeAndLatitude(String longitudeAndLatitude) {
		this.longitudeAndLatitude = longitudeAndLatitude;
	}
	public String getFunctionary() {
		return functionary;
	}
	public void setFunctionary(String functionary) {
		this.functionary = functionary;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
	}


}
