package com.microman.blog.vo;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "my_blog_list")
public class BlogList implements Serializable{
	
	private static final long serialVersionUID = 3463786979561856007L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private BigInteger id;
	private String listTitle;//标题
	private String listDescript;//描述
	private String listLink;//链接
	
	private Integer listType;//分类，1前端，2JAVA，3感悟
	private Integer isOwner;//1原创、2转载
	private Integer listFrom;//来源，0博客园，1github，3简书，4...
	
	private Integer listStatus;//文章状态，1显示，0隐藏
	private Integer isGood;//是否加精，1是，0否
	
	private BigInteger listRead;//阅读，外键、逗号隔开
	private BigInteger listLike;//喜欢
	private BigInteger listComment;//评论
	
	private String coverImg;//封面图片
	private String coverDesc;//封面描述
	
	private Integer listSort;//排序位
	private Date createTime;//创建时间
	private Date updateTime;//更新时间
	
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
		this.id = id;
	}
	public String getListTitle() {
		return listTitle;
	}
	public void setListTitle(String listTitle) {
		this.listTitle = listTitle;
	}
	public String getListDescript() {
		return listDescript;
	}
	public void setListDescript(String listDescript) {
		this.listDescript = listDescript;
	}
	public String getListLink() {
		return listLink;
	}
	public void setListLink(String listLink) {
		this.listLink = listLink;
	}
	public Integer getListType() {
		return listType;
	}
	public void setListType(Integer listType) {
		this.listType = listType;
	}
	public int getIsOwner() {
		return isOwner;
	}
	public void setIsOwner(Integer isOwner) {
		this.isOwner = isOwner;
	}
	public int getListFrom() {
		return listFrom;
	}
	public void setListFrom(Integer listFrom) {
		this.listFrom = listFrom;
	}
	public int getListStatus() {
		return listStatus;
	}
	public void setListStatus(Integer listStatus) {
		this.listStatus = listStatus;
	}
	public int getIsGood() {
		return isGood;
	}
	public void setIsGood(Integer isGood) {
		this.isGood = isGood;
	}
	public BigInteger getListRead() {
		return listRead;
	}
	public void setListRead(BigInteger listRead) {
		this.listRead = listRead;
	}
	public BigInteger getListLike() {
		return listLike;
	}
	public void setListLike(BigInteger listLike) {
		this.listLike = listLike;
	}
	public BigInteger getListComment() {
		return listComment;
	}
	public void setListComment(BigInteger listComment) {
		this.listComment = listComment;
	}
	public String getCoverImg() {
		return coverImg;
	}
	public void setCoverImg(String coverImg) {
		this.coverImg = coverImg;
	}
	public String getCoverDesc() {
		return coverDesc;
	}
	public void setCoverDesc(String coverDesc) {
		this.coverDesc = coverDesc;
	}
	public int getListSort() {
		return listSort;
	}
	public void setListSort(Integer listSort) {
		this.listSort = listSort;
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
	
	public BlogList(int listType) {
		super();
		this.listType = listType;
	}
	
	public BlogList(BigInteger id, String listTitle, String listDescript,
			String listLink, Integer listType, Integer isOwner, Integer listFrom,
			Integer listStatus, Integer isGood, BigInteger listRead,
			BigInteger listLike, BigInteger listComment, String coverImg,
			String coverDesc, Integer listSort, Date createTime, Date updateTime) {
		super();
		this.id = id;
		this.listTitle = listTitle;
		this.listDescript = listDescript;
		this.listLink = listLink;
		this.listType = listType;
		this.isOwner = isOwner;
		this.listFrom = listFrom;
		this.listStatus = listStatus;
		this.isGood = isGood;
		this.listRead = listRead;
		this.listLike = listLike;
		this.listComment = listComment;
		this.coverImg = coverImg;
		this.coverDesc = coverDesc;
		this.listSort = listSort;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}
	public BlogList() {
		super();
	}

}
