package com.microman.blog.common;

import com.alibaba.fastjson.JSONObject;

/**
 * 接口json返回封装
 * @author helijun
 * @date 2016-10-25
 *
 */
public class CommonResponse {

	private Integer code;// 业务代码
	private String msg;// 消息
	private Object data;// 数据对象

	public CommonResponse() {

	}

	public CommonResponse(Integer code) {
		this.code = code;
	}

	public CommonResponse(Integer code, Object data) {
		this.code = code;
		this.data = data;
	}

	public CommonResponse(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public CommonResponse(Integer code, Object data, String msg) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	public JSONObject toJSONObject() {
		JSONObject obj = new JSONObject();
		obj.put("code", this.code);
		obj.put("data", this.data);
		obj.put("msg", this.msg);
		return obj;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
