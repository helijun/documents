<template>
    <div class="wrapper">
    <!--背景-->
   <div class="wrapper-top">
     
        <table style="width:100%">
        <tr>
           <td style="width:100%;text-align:center">
            <div style="padding-top:30px;">
                <span style="font-size: 20px;color:#ffffff;font-weight:bold;">&nbsp;</span><br>
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
    <div style="margin:20px;background:#FFFFFF">
    <el-row :gutter="20" >
          <el-col :span="24" style="text-align:center;width:100%;padding-top: 40px;padding-bottom: 20px;">
              <span class="system_title">检测报告查询</span>
          </el-col>
    </el-row>
    <el-row :gutter="20" class="areacontent" >
          <el-col :span="24">
            <div class="searchtable">
                <el-row :gutter="20" >
                    <el-col :span="19"><el-input type="text" v-model="keyWord2" class="search_input" style="width:200px;" placeholder="请输入身份证号码"/></el-col>
                    <el-col :span="5"><el-button type="primary" class="search_btn" @click="getResult1">查询</el-button></el-col>
                </el-row>
                
            </div>
          </el-col>
    </el-row>

    <div style="background:#EBF0F6">
    <el-row :gutter="20" v-if="is_loading">
          <el-col :span="24">
               <div class="itemtable">
                <span style="font-size:16px;">查询说明</span><br>
                <span style="font-size:14px">请输入您要查询的身份证号，在确保身份证号无误的情况下，还未查询到，请耐心等待，稍后再试</span>
              </div>
          </el-col>
    </el-row>
    </div>
    </div>

  <div>

  </div>

  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button } from "mint-ui";
import lrz from "lrz";


document.title = "保定市新冠核酸检测信息管理平台";
export default {
  components: { Button
   },
  data() {
    return {
      datalist1: [],
      datalist2: [],
      datalist3: [],
      result1:{},
      orginfo:null,
      vehicleinfo:null,
      personifo:null,
      isNullData:false,
      userinfo:null,
      total:0,
      ordercount:0,
      drivername:null,
      keyword2:'',
      nursecount:0,
      finishordercount:0,
      quertype:1,
      is_loading1:false,
      is_loading2:false,
      is_loading3:false,
      is_loading:true,
      defaultImg:'this.src="/static/img/h/orginfo.jpg"'
    };
  },
  
  created() {
      //this.getData();
  },
  mounted() {
  },
  methods: {

        getResult1() {

			 axios.post({url: api.commn.action,
				 data: {idcard:this.keyWord2,model:'tb_check_result1',action:'selectDetail'}
			 }).then(res => {
				
				 if (res.code == 0) {
                this.result1 = res.data;

                if(null != this.result1)
                {
                   this.goVehicleInfo(this.result1.idcard);
                }else
                {
                  alert('未查到您的检测结果');
                }
               
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },

    goVehicleInfo(idcard) {
        this.$router.push({
              path: "/checkresult?idcard="+idcard
            });
    },
}
}
</script>

<style lang="scss" scoped>
@import "static/css/h5base.scss";


.wrapper{
 background:#f8f8f8;
}
.item{
  width:100vw;
  margin-bottom: 0.8vh;
   background:#FFFFFF;
}
.table-style{
    margin: 0vw;
    padding: 0vw;
    
}
  .table-tr {
        border: dashed 1px #a59e9e;
        border-left: none;
        border-right: none;
    }
.payTitle
{
 
  text-align:right;
   padding-right: 5px;
font-size: 12px;
color: #21C0BB;
letter-spacing: 0;
text-align: right;
line-height: 24px;
text-decoration:underline;

}
.orderTitle
{
  width:30vw; 
  text-align:left;
  font-size: 16px;
  font-weight:bold
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


.wrapper-car{
  background: url("/static/img/h/orginfo.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
}
.div-photo{ 
  float:left;
  width:25vw;
  margin-top: 8vw;
  margin-left: 8vw;
  } 

  
.org-item-value{
font-size: 18px;
color: #FFFFFF;
letter-spacing: 0;
line-height: 4vh;
}
.org-item-value2{
font-size: 20px;
color: #FFFFFF;
letter-spacing: 0;
line-height: 4vh;
}
.div-info{ 
  width:60vw;
  margin-left: 50vw;
  margin-top: 15vw;

  } 

.doctor-item{
    width:100vw;
    margin-top: 1vh;
    padding-bottom: 1vh;
}
.doctor-item-name{
font-size: 12px;
color: #303133;
letter-spacing: 0;
letter-spacing: 0;
line-height: 3vh;
vertical-align: top;
}
.doctor-item-job{
font-size: 12px;
color: #868686;
letter-spacing: 0;
line-height: 2vh;
vertical-align: bottom;
}
.doctor-item-state{
font-size: 14px;
color: #07C4A8;
letter-spacing: 0;
line-height: 5vh;
text-align: right;
vertical-align: top;
padding-right: 4vw;
}
.doctor-item-time{
font-size: 12px;
color: #868686;
letter-spacing: 0;
line-height: 4vh;
text-align: right;
vertical-align: bottom;
padding-right: 4vw;
}
.searchtable {
    border-radius:5px;
    background:#ffffff;
    margin: 10px;
    padding: 10px;
}
.itemtable{
    
    border-radius:5px;
   
    margin: 10px;
    padding: 10px;
}
.subitemtable
{
  width:100%;
  text-align: center;
  font-size:14px;
}

.search_input {
   width: 72vw;
  float: left;
 height: 40px;
 font-size: 16px;
  padding-right: 2x;
  border:none;
}
.search_btn {
   height: 40px;
   width: 16vw;
   font-size: 14px;
   color: blue;
   background-color: #FFFFFF;

}
.system_title
{
  font-size: 20px;
   height: 400px;
   padding-bottom: 100px;
   margin-bottom: 100px;
}
.areacontent
{
    margin-bottom: 5px;
}

</style>