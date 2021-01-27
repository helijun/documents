<template>
<div class='menu-container'>
  <div class="wrapper">
       <div class="wrapper-top">
     
        <table style="width:100%">
        <tr>
           <td style="width:100%;text-align:center">
            <div style="padding-top:30px;">
                <span style="font-size: 20px;color:#ffffff;font-weight:bold;font-family：'宋体';">&nbsp;</span><br>
            </div>
           </td>
         </tr>



        <tr>
           <td style="width:100%;text-align:center">
            <div style="padding-top:10px;">
                <span style="font-size: 30px;color:#ffffff;font-weight:bold;">&nbsp;</span><br>
            </div>
           </td>
         </tr>
        </table>

    </div>


    <div class="doctor-detail">
      <div class="title">采集信息</div>
      <div style="background-color:#EBF0F6;padding:4px">
        <table style="98%">
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">姓名：</div><div class="div-info-item-value">{{applyInfo.applyName || result1.name}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">身份证号：</div><div class="div-info-item-value">{{applyInfo.idcard || result1.idcard}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采集网点：</div><div class="div-info-item-value">{{applyInfo.checkOrgName}}</div></div></td></tr>
          <!-- <tr><td><div class="div-info-row"><div class="div-info-cell-title">采集时间：</div><div class="div-info-item-value">{{applyInfo.applyTime}}</div></div></td></tr> -->
        </table> 
      </div>    
    </div>
     <!---->
    
    <div class="doctor-detail">
      <div class="title">核酸检测结果</div>
      <div style="background-color:#EBF0F6;padding:4px">
        <table style="98%">
          <tr><td><div class="div-info-row" style="text-align:center;font-size:20px">{{result1.result}}</div></td></tr>          
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">检测机构：</div><div class="div-info-item-value">{{result1.checkOrgNumber}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">检测时间：</div><div class="div-info-item-value">{{result1.checkTime}}</div></div></td></tr>
       </table>     
      </div>
    </div>

   
    <div class="doctor-detail">
       <div class="title">抗体检测结果</div>
       <div style="background-color:#EBF0F6;padding:4px">
        <table style="98%">
          <tr><td><div class="div-info-row" style="text-align:center;font-size:20px">{{result2.result}}</div></td></tr>         
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">检测机构：</div><div class="div-info-item-value">{{result2.checkOrgNumber}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">检测时间：</div><div class="div-info-item-value">{{result2.checkTime}}</div></div></td></tr>
       </table>   
       </div>  
    </div>
 
</div>

  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button } from "mint-ui";
import lrz from "lrz";

export default {
  components: { Button },
  data() {
    return {
      applyInfo:{},
     result1:{checkOrgNumber:'',result:'',checkTime:''},
     result2:{checkOrgNumber:'',result:'',checkTime:''},
      idcard:'',
      defaultImg:'this.src="/static/img/h/personinfo.jpg"'
    };
  },
  created() {

    this.idcard= this.$route.query.idcard;
 
     this.getData(); 
     this.getResult1();
     this.getResult2();
  },
  mounted() {
 
  },
  methods: {

      getData() {
    
        axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply',action:'select',keyword2:this.idcard}
			 }).then(res => {
				 if (res.code == 0) {
                     var arry = res.data;
                     if(null != arry && arry.length > 0)
                     {
                         this.applyInfo = arry[0];
                     }
				 } else {
					 this.$message.error(res.message);
				 }
                 });

        },
        getResult1() {
    
			 axios.post({url: api.commn.action,
				 data: {idcard:this.idcard,model:'Newtb_check_result1',action:'selectDetail'}
			 }).then(res => {
				
				 if (res.code == 0) {
           if(null != res.data)
           {
            this.result1 = res.data;
           }
					 
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },
      getResult2() {
    
			 axios.post({url: api.commn.action,
				 data: {idcard:this.idcard,model:'tb_check_result2',action:'selectDetail'}
			 }).then(res => {
				
				 if (res.code == 0) {
					if(null != res.data)
           {
            this.result2 = res.data;
           }
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
  padding-bottom: 5px;

}
.wrapper {
  background:#f8f8f8;
  //background:red;
}

.wrapper-top {
  width: 100vw;
  height: 20vh;
  background: url("/static/img/h/apply_head3.png") no-repeat center;
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
  padding-right: 2vh;
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