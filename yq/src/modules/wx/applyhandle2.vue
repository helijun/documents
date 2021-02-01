<template>
  <div>
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
      <div style="background:#EBF0F6; padding:10px;">
        <div>
          <br>
          <div style="background: #FFFFFF;border-radius:10px;">
            <span>&nbsp;</span>
          <div class="title33" style="border-bottom:thick 1px #EBF0F6;">核酸采样核验</div>
            <br>
          <article>
          <section class="module-list module-base-info" style="text-align:center">   
              <div class="title1">试管编号</div>
              <el-input v-model="noNumber"  placeholder="请输入试管编号" class="handle-input" style="width:320px"></el-input>
              <br><br>
              <div class="title1">检测模式</div>
                <el-select v-model="checkcount" placeholder="检测模式" :change="setNonumber"  @change="setNonumber"   style="width:320px"><br>
                  <el-option key="1" label="一混一" value="1"></el-option>
                  <el-option key="5" label="五混一" value="5"></el-option>
                  <el-option key="8" label="八混一" value="8"></el-option>
                  <el-option key="10" label="十混一" value="10"></el-option>
                </el-select>
            </section>
        </article>
        <br>
        <div class="title22" style="background: #EBF0F6"><span style="font-size:20px">当前试管编号&nbsp;&nbsp;</span><span style="color:red;font-size:24px;color: #00B5B9;">第{{currentIndex}}次使用</span></div>
          <article>
            <div class="el-dosave">
                <mt-button type="primary" v-if="!isScan" style="height:80px"  @click="setNonumber()"><span class="title2">设置试管编号</span ></mt-button>           
            <br>&nbsp;
                <mt-button type="primary" v-if="isScan" style="height:80px"  @click="goscan()"><span class="title2">扫描预约采样凭证</span> </mt-button>
            </div>
          </article>
          </div>
        <br>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button,Actionsheet  } from "mint-ui";
import wx from 'weixin-js-sdk'
import $ from 'jquery'

export default {
  components: { Button },
  data() {
    return {
      companyname:"",
      currentIndex:1,
      checkcount:'1',
      form: {},
      noNumber:'',
      keyword2:'',
      photoTip: true,
      isScan:false,
      sheetVisible: false 
    };
  },
  created() {
    if(null != localStorage.getItem("checkcount"))
    {
       this.checkcount = localStorage.getItem("checkcount");
    }
    if(null != localStorage.getItem("currentIndex"))
    {
      let currentIndex = localStorage.getItem("currentIndex");
      if (Number(currentIndex) != 1 && Number(currentIndex) > Number(this.checkcount)) {
        Toast('本次核验已完成，请输入新的试管编号');
        this.noNumber = '';
        this.currentIndex = 1;
        this.isScan = false;
      } else {
        this.currentIndex = currentIndex;
        this.isScan = true;
      }
    }
    if(null != localStorage.getItem("noNumber"))
    {
       this.noNumber = localStorage.getItem("noNumber");
    }
    this.initwx();
  },
  mounted() {

  },
  methods: {
    actionSheet: function(){    
        this.sheetVisible = true;     
    },      
    setNonumber(){
      // this.currentIndex = 1;
      if(this.noNumber == '') {
        this.isScan = false;
        Toast('请设定试管编号');
        return ;
      }
      
      if (Number(this.currentIndex) != 1 && Number(this.currentIndex) > Number(this.checkcount)) {
        Toast('请输入新的试管编号');
        this.noNumber = '';
        this.currentIndex = 1;
        this.isScan = false;
      }

      this.isScan = true; 
      localStorage.setItem("currentIndex", this.currentIndex);
      localStorage.setItem("checkcount", this.checkcount);
      localStorage.setItem("noNumber", this.noNumber);
    },
    goscan(){ 
      if(this.noNumber == '') {
        Toast('请设定试管编号');
        return ;
      } 
      localStorage.setItem("currentIndex", this.currentIndex);
      localStorage.setItem("checkcount", this.checkcount);
      localStorage.setItem("noNumber", this.noNumber);

      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          //得到扫码的结果
          if(null != res.resultStr && res.resultStr != '') {
              window.location = location.href.split('#')[0]+"#/checkhandle2?idcard="+res.resultStr;
          } else {
            Toast('所扫条码不合法');
          }
        },
        error: function (res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            Toast('版本过低请升级')
          }
        }
      });   
    }, 
    godoctor(idcardnumber) {
      this.$router.push({
        path: "/checkhandle?idcard="+idcardnumber
      });
    },
    initwx() {
      var url = location.href.split('#')[0];
      $.ajax({
        url: window.location.origin + "/spweb/system/commn/getsignature",
        type: "post",
        data: {
            url: url
        },
        success: function (res) {
          var timestamp = res.data.timestamp * 1;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端Toast出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid AppSecret:418f9b9247c5f7822fed5fcde54b65ed
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名，见附录1
            jsApiList: ['checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      });
    }
  },
  watch: {
    checkcount() {
      localStorage.setItem('checkcount', this.checkcount);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/common.scss";

.title {
  &:before {
    content: ' ';
    margin-right: pxrem(15px);
  }
  text-align: center;
  font-size: pxrem(40px);
  margin-left: pxrem(10px);
  padding: pxrem(10px) 0;
}
.title33 {
  text-align: center;
  font-size: pxrem(40px);
  margin-left: pxrem(15px);
  margin-right: pxrem(15px);
  padding: pxrem(10px) 0;
}
.title1 {
  &:before {
    content: ' ';
    margin-right: pxrem(15px);
  }
  color: #303133;
  text-align: left;
  font-size: pxrem(28px);
  margin-left: pxrem(10px);
  padding-bottom: pxrem(10px);
  padding-left: pxrem(-10px);

}
.title2 {
  &:before {
    content: ' ';
    margin-right: pxrem(15px);
  }
  text-align: center;
  font-size: pxrem(35px);
  margin-left: pxrem(20px);
  padding: pxrem(10px) 0;

}
.title22 {
  margin-right: pxrem(30px);
  margin-left: pxrem(30px);
  text-align: center;
  height: 50px;
  font-size: pxrem(35px);
  padding: pxrem(10px) 0;
}
article {
  .module-list {
    border-radius:5px;
    background-color: white;
    padding: pxrem(10px) pxrem(10px);
    border-top: -60px solid $base-bg-color;
    box-sizing: border-box;
    .title {
      &:before {
          content: ' ';
          //border-left: pxrem(10px) solid $base-color;
          margin-right: pxrem(15px);
      }

      font-family: PingFangSC-Medium;
      font-size: pxrem(24px);
      color: #4A4A4A;
      margin-left: pxrem(10px);
      padding: pxrem(10px) 0;
      margin-bottom: 3vh;
    }
  }
  /deep/ .mint-popup {
    width: 100%;

    .popup-enter {
      display: block;
      text-align: right;
      margin: pxrem(30px) pxrem(40px) 0 0;
    }
  }
  .el-dosave {
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: pxrem(70px) pxrem(30px);
    /deep/ .mint-button {
      width: 100%;
      background-color: $base-color;
    }
  }
}
.wrapper {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
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
  height: 28vh;
  background: url("/static/img/h/knowhospital.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.wrapper-item2 {
  width: 96vw;
  height: 28vh;
  background: url("/static/img/h/knowlow.png") no-repeat center;
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
  font-size: 20px;
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
.handle-input{
  width: 70vw;
}
</style>