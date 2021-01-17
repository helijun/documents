<template>
<div class='menu-container'>
  <div class="wrapper">
<div class="title">备案信息</div>
    <div class="doctor-detail">
        <table style="98%">
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">备案编号：</div><div class="div-info-item-value">{{purchaseInfo.purchaseRecordNumber}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采购项目：</div><div class="div-info-item-value">{{purchaseInfo.projectName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">备案单位：</div><div class="div-info-item-value">{{purchaseInfo.orgName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采购预算：</div><div class="div-info-item-value">{{purchaseInfo.projectAmount}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">备案时间：</div><div class="div-info-item-value">{{purchaseInfo.recordTime}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采购负责人：</div><div class="div-info-item-value">{{purchaseInfo.orgPurchaseContact}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">联系电话：</div><div class="div-info-item-value">{{purchaseInfo.orgPurchaseTel}}</div></div></td></tr>
        </table>     
    </div>
     <!---->
    <div class="title">采购明细</div>
    <div class="wrapper-top">
      <table>
          <tr>
            <td  class="doctor-photo">
              <table style=" width:25vw;">
                <tr>
                  <td>
                   <img style="width:18vw;height:20vw;"  src="/static/img/h/personinfo.png" :onerror="defaultImg"/>
                  </td>
                </tr>
              </table>
              
            </td>
            <td class="doctor-info">
                <table>
                  <tr>
                      <td style="width:25vw;text-align:center">
                          <span class="org-item-title" >预算项目:</span>
                      </td>
                      <td style="width:50vw;text-align:left">
                        <span class="org-item-value" >{{purchaseInfo.projectName}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td style="width:25vw;text-align:center">
                          <span class="org-item-title">项目单价:</span>
                      </td>
                      <td style="width:50vw;text-align:left">
                        <span class="org-item-value">&nbsp;</span>
                      </td>
                  </tr>
                   <tr>
                      <td style="width:25vw;text-align:center">
                          <span class="org-item-title">采购数量:</span>
                      </td>
                      <td style="width:50vw;text-align:left">
                        <span class="org-item-value">&nbsp;</span>
                      </td>
                  </tr>
                   <tr>
                      <td style="width:25vw;text-align:center">
                          <span class="org-item-title">采购金额:</span>
                      </td>
                      <td style="width:50vw;text-align:left">
                        <span class="org-item-value">{{purchaseInfo.projectAmount}}</span>
                      </td>
                  </tr>
                   <tr>
                      <td style="width:25vw;text-align:center">
                          <span class="org-item-title">采购需求:</span>
                      </td>
                      <td style="width:50vw;text-align:left">
                        <span class="org-item-value">&nbsp;</span>
                      </td>
                  </tr>                 
                </table>
            </td>
          </tr>
      </table>
    </div>
    <!---->   
</div>
            <div class="el-dosave">
                <mt-button type="primary" @click="checkPurchase()" >同意</mt-button>
            </div>
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button } from "mint-ui";
import lrz from "lrz";

document.title = "人员信息";
export default {
  components: { Button },
  data() {
    return {
      purchaseInfo:{},
      purchaseRecordNumber:'',
      checkBySignPic:'',
      userID:'',
      checkType:'',
      defaultImg:'this.src="/static/img/h/personinfo.jpg"'
    };
  },
  created() {

    this.applyNumber= this.$route.query.applyNumber;
    this.checkType= this.$route.query.checkType;
    this.userID = this.$route.query.userID;
    this.getUserData();
     this.getData(); 
  },
  mounted() {
 
  },
  methods: {
    	handleData(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_purchase_record';
				 _data.action = action;
			 }
			 return _data;
		 },
      getData() {
    
			 axios.post({url: api.commn.action,
				 data: this.handleData('selectDetail',{
              applyNumber:this.applyNumber
					 })
			 }).then(res => {
				
				 if (res.code == 0) {
					 this.purchaseInfo = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
    },
      getUserData() {
    
			 axios.post({url: api.commn.action,
				 data: {model:'tb_system_user',action:'selectDetail',userID:this.userID}
			 }).then(res => {
				
				 if (res.code == 0) {
					 this.checkBySignPic = res.data.signPic;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
    },
    checkPurchase() {

      var _model = "tb_purchase_record_state2";
      if(checkType == 1)
      {
         _model = "tb_purchase_record_state2";
      }
      if(checkType == 2)
      {
        _model = "tb_purchase_record_state3";
      }
      if(checkType == 3)
      {
         _model = "tb_purchase_record_state4";
      }
      if(checkType == 4)
      {
         _model = "tb_purchase_record_state5";
      }
      
			var param={
        action:"update",
				 model:_model,
				 applyNumber:this.purchaseInfo.applyNumber,
				 checkContext:'同意',
        checkBySignPic:this.checkBySignPic
             }
			 axios.post({url: api.commn.action,
				 data: param
			 }).then(res => {

				 if (res.code == 0) {
                    this.getData();
                    this.editVisible = false;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
		 },
  }
};
</script>

<style lang="scss" scoped>
@import "static/css/h5base.scss";

.title {
    &:before {
        content: ' ';
        border-left: pxrem(10px) solid #00d1b2;
        margin-right: pxrem(15px);
    }
    font-size: pxrem(30px);
    margin-left: pxrem(10px);
    padding: pxrem(10px) 0;

}
.wrapper {
  background:#f8f8f8;
}
.wrapper-top {
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
}
.doctor-photo{ 
  text-align:center;
  width:23vw;
 padding-top: 5vh;
  } 
.doctor-info{
width:77vw;
 padding-top: 5vh;
 background:#f8f8f8;

}
.doctor-state{
   width:15vw;
 margin-top: 5vh;
   height: 4vh;
  box-sizing: border-box;
  display: flex;
  text-align: right;
 
}
.state-info{
   background: url("/static/img/h/org_state.png") no-repeat center;
    background-size:100%100%;
    width:100vw;
    height:4vh;
  text-align: right;
  font-size: 15px;
  color: #07C4A8;
  letter-spacing: 0;
  line-height: 4vh;
}

.org-item-title{
font-size: 13px;
color:gray;
letter-spacing: 0;
line-height: 3vh;
}

.org-item-value{
font-size: 13px;
font-weight:bold;
color: black;
letter-spacing: 0;
line-height: 3vh;
}

.doctor-detail{
  margin-bottom: 1vh;
  background:#ffffff;
  padding-top: 2vh;
  padding-left: 2vh;
   padding-bottom: 2vh;
}

  .div-info-row{ 
  margin-left: 1vw;
  width: 90vw;
  line-height: 4vh;
  } 
  .div-info-cell-title{ 
  float:left;
  text-align: right;
  width:30vw;
  color: #868686;
  padding-right: 2vh;
  } 
  .div-info-cell-value{ 
  float:left;
  text-align: left;
  width:60vw;
  font-weight:bold;
   color: #03080C;
  } 
  .datatable
  {
    border:solid #add9c0; 
    border-width:0px 1px 1px 0px;
  }
  .datatd
  {
    border:solid #add9c0; 
    border-width:0px 1px 1px 0px;
  }
      .el-dosave {
        width: 100%;
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
        padding: pxrem(70px) pxrem(30px);
        /deep/ .mint-button {
            width: 90%;
            background-color: #00d1b2;
        }
    }
</style>