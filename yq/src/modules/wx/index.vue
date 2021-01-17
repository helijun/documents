<template>
  <div class="wrapper">
 
    <table>
         <tr>
             <td style="text-align:center"><span class="title-title">&nbsp;</span></td>
        </tr>
         <tr>
             <td style="text-align:center"><span class="title-title">保定市新冠核酸检测信息管理平台</span></td>
        </tr>



        <tr>
            <td><div class="wrapper-item1" @click="goapply()" >&nbsp;</div></td>
        </tr>
         <tr>
            <td><div class="wrapper-item2"  @click="gohelpapply()" >&nbsp;</div></td>
        </tr>
        <tr>
            <td><div class="wrapper-item4"  @click="goquery()" >&nbsp;</div></td>
        </tr>
     
         <tr>
            <td>
             <div class="wrapper-item3">
               <!--<mt-button id="wxsys" type="primary" v-on:click="sys_click()">扫一扫</mt-button>-->
                    <table class="table-style">
                        <tr>
                          
                        </tr>
                        <tr>
                            <td style="text-align:center"><span class="title-address">&nbsp;</span></td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>

     <mt-actionsheet  
        :actions= "data"  
        v-model="sheetVisible">  
    </mt-actionsheet> 
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button,Actionsheet  } from "mint-ui";
import utils from '@/utils/index';
import wx from 'weixin-js-sdk'

document.title = "保定市新冠核酸检测信息管理平台";
export default {
  components: { Button },
  data() {
    return {
      companyname:"",
      checkOrgNumber:'',
      form: {},
      orginfo:{},
      orgnumber:'',
      photoTip: true,
    };
  },
  created() {
            if(null != this.$route.query.checkOrgNumber)
        {
                this.checkOrgNumber= this.$route.query.checkOrgNumber;
        }
  },
  mounted() {
  },
  methods: {
    goapply() {
      window.location = location.href.split('#')[0]+"#/applyIndex?checkOrgNumber="+this.checkOrgNumber;     
    },
    gohelpapply() {

      window.location = location.href.split('#')[0]+"#/applyIndex2?checkOrgNumber="+this.checkOrgNumber;   
    },

    goquery() {

        window.location = location.href.split('#')[0]+"#/query";   
        window.location.href = url;
        
    },


  }
};
</script>

<style lang="scss" scoped>
@import "static/css/h5base.scss";
.wrapper {
  width: 100vw;
  height: 100vh;
  background: url("/static/img/zybg2.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;

}
.table-style{
    margin: 0vw;
    padding: 0vw;
}
.wrapper-null{
  width: 100vw;
  height: 24vh;
}

.wrapper-item1 {
  width: 96vw;
  height: 22vh;
  background: url("/static/img/jzicon.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.wrapper-item2 {
  width: 96vw;
  height: 22vh;
  background: url("/static/img/zficon.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.wrapper-item4 {
  width: 96vw;
  height: 22vh;
  background: url("/static/img/checkresulticon.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.wrapper-item3 {
  width: 96vw;
  height: 10vh;

  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.title-title{
font-size: 18px;
color: #24C1BC;
letter-spacing: 0;
line-height: 4vh;
}
.title-address{
font-size: 15px;
color: #24C1BC;
letter-spacing: 0;
line-height: 4vh;
}
</style>