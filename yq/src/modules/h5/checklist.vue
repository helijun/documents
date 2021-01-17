<template>
<div v-wechat-title="$route.meta.title" style="background:#E5E5E5">
  <table class="searchtable">
      <tr>
          <td><input type="text" v-model="keyWord" class="search_input" placeholder="请输入搜索词"/></td>
          <td><el-button type="primary" class="search_btn" @click="getData">搜索</el-button></td>
      </tr>
  </table>
    <mt-cell v-for="(item,index) in datalist" :key="index" class="item">            
        <div v-if="item.orgnumber != 100" class="doctor-item" >
            <table class="table-style">
                <tr>
                    <td style="width:20vw;text-align:center">
                        <div>
                              <div style="width:16vw;height:18vw;"  class="wrapper-car"/>
                        </div>
                    </td>
                    <td style="width:79vw;">
                        <table class="table-style" style="width:78vw;">
                          <tr>
                            <td style="width:50vw;"><div class="doctor-item-name">{{item.drivername}}</div> </td>
                            <td style="width:21vw;text-align:right"><span  @click="goOrderInfo(item.drivernumber)" class="payTitle">详情</span></td>
                          </tr>
                           <tr>
                            <td style="width:73vw;" colspan="2"> <div class="doctor-item-name">人员类型:{{item.persontype}}</div></td>
                          </tr>
                         <tr>
                            <td style="width:73vw;" colspan="2"> <div class="doctor-item-name">身份证号:{{item.idcard}}</div></td>
                          </tr>
                            <tr>
                            <td style="width:73vw;" colspan="2"> <div class="doctor-item-name">联系电话:{{item.tel}}</div></td>
                          </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
            
    </mt-cell>
            
    
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button } from "mint-ui";
import lrz from "lrz";


document.title = "机构列表";
export default {
  components: { Button
   },
  data() {
    return {
      datalist: [],
      isNullData:false,
      userinfo:null,
      total:0,
      ordercount:0,
      drivername:null,
      nursecount:0,
      finishordercount:0,
      defaultImg:'this.src="/static/img/h/personinfo.jpg"'
    };
  },
  
  created() {
      this.getData();
  },
  mounted() {
  },
  methods: {
      handleData(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_driver';
				 _data.action = action;
			 }
			 return _data;
		 },
      getData() {
      this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
              keyWord:this.keyWord,
					 })
			 }).then(res => {
				 this.is_loading = false;
				 if (res.code == 0) {
					 this.datalist = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
    },
    goOrderInfo(orgnumber) {   
        this.$router.push({
              path: "/wechat/personinfo?drivernumber="+orgnumber
            });
    },
}
}
</script>

<style lang="scss" scoped>
@import "static/css/h5base.scss";
.wrapper {
 
  //background:red;
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
  width:20vw; 
  text-align:right;
   padding-right: 5vw;
font-size: 13px;
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
  height: 26vh;
  background: url("/static/img/h/org_bg.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
}


.wrapper-car{
  background: url("/static/img/h/personinfo.png") no-repeat center;
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

  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 5px;
}
.search_input {
   width: 80vw;
  float: left;
 height: 30px;
  padding-right: 2x;
}
.search_btn {
   height: 33px;
   width: 15vw;
   font-size: 12px;

}
</style>