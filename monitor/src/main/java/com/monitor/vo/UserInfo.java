package com.monitor.vo;

public class UserInfo {

    private String token;// token

    private Integer payType;// 支付类型（0-支付宝，1-微信）

    private Long cid;// 询价ID（询价车险时使用）

    private Long cpid;// 报价ID（询价车险时使用）

    private Long userId;// 用户ID

    private Double total;// 总金额（单位：元；精确两位小数）

    private Long saleId;// 销售id

    private Integer client;// 客户端id,1-app,2-wechat

    private Long addressId;// 收货地址（车险使用）

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getPayType() {
        return payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }

    public Long getCid() {
        return cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public Long getCpid() {
        return cpid;
    }

    public void setCpid(Long cpid) {
        this.cpid = cpid;
    }

    public Integer getClient() {
        return client;
    }

    public void setClient(Integer client) {
        this.client = client;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Long getSaleId() {
        return saleId;
    }

    public void setSaleId(Long saleId) {
        this.saleId = saleId;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

}
