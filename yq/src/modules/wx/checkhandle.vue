<template>
<div class='menu-container'>
  <div class="wrapper">
<div class="title">预约信息</div>
    <div class="doctor-detail">
        <table style="98%">
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">姓名：</div><div class="div-info-item-value">{{applyInfo.applyName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">身份证号：</div><div class="div-info-item-value">{{applyInfo.idcard}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">性别：</div><div class="div-info-item-value">{{applyInfo.sex}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">家庭地址：</div><div class="div-info-item-value">{{applyInfo.address}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">单位：</div><div class="div-info-item-value">{{applyInfo.unitName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">订单类型：</div><div class="div-info-item-value">{{applyInfo.payTypeName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">缴费状态：</div><div class="div-info-item-value">{{applyInfo.paystateName}}</div></div></td></tr>
        </table>     
    </div>
     <!---->
    <div class="title">核酸检测</div>
    <div class="doctor-detail">
        <table style="98%">
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采集网点：</div><div class="div-info-item-value">{{applyInfo.checkOrgName}}</div></div></td></tr>
          <tr><td><div class="div-info-row"><div class="div-info-cell-title">采集时间：</div><div class="div-info-item-value">{{applyInfo.applyTime}}</div></div></td></tr>
       </table>     
    </div>


    <div class="doctor-detail">
        <table style="98%">
          <tr><td><div class="div-info-row">

                 <article>
                <section class="module-list module-base-info">
                <mt-field label="试管编号:" type="text" placeholder="请录入试管编号" v-model="noNumber"></mt-field>
                </section>
                 </article>
                 <br>
            <div class="el-dosave">
                <mt-button type="primary" v-if="ishandle" @click="doSaveAdd()">完成检测</mt-button>
            </div>
            <div><br></div>
              <div class="el-dosave">
                <mt-button type="primary" @click="doSaveAdd2()">修定试管编号</mt-button>
            </div>
            <br>&nbsp;
            <div class="el-dosave">
                <mt-button type="primary"  @click="goback()">返回上页</mt-button>
            </div>
              </div></td></tr>

       </table>     
    </div>
    <!---->   
</div>

  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button } from "mint-ui";

export default {
  components: { Button },
      data() {
        return {
            applyInfo: {},
            result1: {},
            result2: {},
            ishandle:true,
            noNumber:'',
            idcard: '', 
        };
    },



  created() {

    this.idcard= this.$route.query.idcard;
     this.getData(); 

  },
  mounted() {

  },
      computed: {

        data() {
            return this.applyInfo;
        }
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

                         if(this.applyInfo.state == 1)
                         {
                           alert('此预约已完成检测采集');
                           this.noNumber = this.applyInfo.noNumber;
                           this.ishandle = false;

                         }else
                         {
                           this.ishandle = true;
                         }
                     }


				 } else {
					 this.$message.error(res.message);
				 }
                 });
        },
    doSaveAdd()
    {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply_state',action:'update',applyNumber:this.applyInfo.applyNumber,state:'1',noNumber:this.noNumber}
			 }).then(res => {
				 if (res.code == 0) {
          alert('采集完成');
          //this.applyInfo = {};
         
           this.ishandle = false;
           this.goback();
				 } else {
					 this.$message.error(res.message);
				 }
				 });

    },

    doSaveAdd2() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply_nonumber',action:'update',applyNumber:this.applyInfo.applyNumber,state:'1',noNumber:this.noNumber}
			 }).then(res => {
				 if (res.code == 0) {
          alert('修定完成');
          //this.applyInfo = {};
          //this.noNumber = '';
           this.ishandle = false;
           this.goback();
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },

    goback()
    {
          this.$router.push({
            path: "/applyhandle"
          });
    }
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