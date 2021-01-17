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
                  <el-input v-model="noNumber"  placeholder="请输入试管编号" class="handle-input" style="width:230px"></el-input><span style="font-size:14px;text-decoration: underline"  @click="goscan2()"> 扫描试管条码</span>
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
        <div class="title22" style="background: #EBF0F6"><span style="font-size:20px">当前试管编号&nbsp;&nbsp;</span><span style="color:red;font-size:24px;color: #00B5B9;">第{{sindex}}次使用</span></div>
                <article>
                    <div class="el-dosave">
                        <mt-button type="primary" style="height:50px"  @click="setNonumber()"><span class="title2">设置试管编号</span ></mt-button>           
                    <br>&nbsp;
                        <mt-button type="primary" style="height:50px"  @click="goscan()"><span class="title2">扫描预约采样凭证</span> </mt-button>
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
import lrz from "lrz";

import wx from 'weixin-js-sdk'
import $ from 'jquery'

document.title = "保定市新冠核酸检测信息管理平台";
export default {
  components: { Button },
  data() {
    return {
      companyname:"",
      currentIndex:1,
      checkcount:'1',
      sindex:1,
      currentNomberInfo:{},
      form: {},
      noNumber:'',
      keyword2:'',
      orgnumber:'',
      photoTip: true,
      isScan:false,
      sheetVisible: false 
    };
  },
  created() {

    //localStorage.setItem("orgnumber","");

    //扫码获得条码
    if(this.$route.query.noNumber != null)
    {
      this.noNumber = this.$route.query.noNumber;
    }
    //取机机构
    if(null != localStorage.getItem("temporgnumber"))
    {
      this.orgnumber = localStorage.getItem("temporgnumber");
    }
   if(null != localStorage.getItem("checkcount"))
    {
      this.checkcount = localStorage.getItem("checkcount");
    }
    if(null != localStorage.getItem("sindex"))
    {
      this.sindex = localStorage.getItem("sindex");
      if(this.sindex >this.checkcount)
      {
        alert('请重新设置检测模式');
        this.noNumber = '';
      }
    }

    //获得当前
    this.getCurrentNoumberInfo();

    //初始化微信
    this.initwx();

  },
  mounted() {

  },
  methods: {

    //获得
    getCurrentNoumberInfo()
    {
        let params = {
        udpclass:'NoNumberService',
        checkOrgNumber:this.orgnumber,
        opertType:'5',
          };
          axios.get({
              url: api.commn.udpAction,
              data:params
          }).then(res => {
              if(res.code == 0){

                  if(null == res.data)
                  {
                      alert('请设定试管码');
                  }else
                  {
                      this.currentNomberInfo = res.data;

                      if(this.currentNomberInfo.state == '1')
                      {
                          alert('请设定试管码');
                      }else{

                          this.checkcount = this.currentNomberInfo.sumCount;
                          this.noNumber = this.currentNomberInfo.noNumber;
                          //this.currentIndex = this.currentNomberInfo.currentIndex +1;
                        
                          
                      }
                  }
                  
              }
          })
    },
    actionSheet: function(){    
        this.sheetVisible = true;     
    },      
    //设置试管码
    setNonumber(){
        if(this.currentNomberInfo != null)
        {
          if(this.currentNomberInfo.state == '0')
          {
              if (confirm('当有试用编号还未使用到设定的次数，你确认修改?')==true){ 
              
              }else{ 
                 return; 
              } 
          }
        }
    if(this.noNumber == '')
     {
       alert('请设定试管编号');
       return ;
     } 
      if(this.orgnumber == '')
     {
          alert('无法获得机构信息，请重新登录');
          window.location = location.href.split('#')[0]+"#/checkLogin";
          return ;
     } 

    let params = {
        udpclass:'NoNumberService',
        noNumber:this.noNumber,
        checkOrgNumber:this.orgnumber,
        sumCount:this.checkcount,
        opertType:'1',
          };
          axios.get({
              url: api.commn.udpAction,
              data:params
          }).then(res => {
              if(res.code == 0){
                this.currentNomberInfo = res.data;
                localStorage.setItem('noNumber',this.noNumber);
                localStorage.setItem('sindex', 1);
                 localStorage.setItem('checkcount', this.checkcount);
                this.sindex = 1;
                alert('设置成功');
              }
          })
    } , 
    goscan: function(){ 
  
   // window.location = location.href.split('#')[0]+"#/checkhandle3?idcard="+"00075b88a16d4c9784f3ac6a0ea85924";

    if(this.noNumber == '')
     {
       alert('请设定试管编号');
       return ;
     } 
   
      wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                //得到扫码的结果
                if(null != res.resultStr && res.resultStr != '')
                {
                  if(res.resultStr != '')
                  {
                     window.location = location.href.split('#')[0]+"#/checkhandle3?idcard="+res.resultStr;

                       // window.location = location.href.split('#')[0]+"/#/openh5/org?id="+code;
                 
                  }else
                  {
                      alert('所扫条码不合法');
                  }
                }
            },
            error: function (res) {
                if (res.errMsg.indexOf('function_not_exist') >0) {
                    alert('版本过低请升级')
                }
            }
        });   
    } , 

   goscan2: function(){ 

     //var str = "CODE_128,1233333";
     //str = str.replace("CODE_128,","");
     // location.href = location.href.split('#')[0]+"/#/applyhandle3?noNumber="+str;
     // return;
      wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                //得到扫码的结果
                if(null != res.resultStr && res.resultStr != '')
                {
                  if(res.resultStr != '')
                  {
                      var str = res.resultStr;
                      str = str.replace("CODE_128,","");
                      str = str.replace("UPC_E,","");
                      //location.href = location.href.split('applyhandle3')[0]+"?noNumber="+str;
                        window.location = location.href.split('#')[0]+"/#/applyhandle3?noNumber="+str;

                  }else
                  {
                        alert('所扫条码不合法');
                  }

                }
            },
            error: function (res) {
                if (res.errMsg.indexOf('function_not_exist') >
                    0) {
                    alert('版本过低请升级')
                }
            }
        });   
    } , 

    godoctor(idcardnumber) {
    this.$router.push({
            path: "/checkhandle?idcard="+idcardnumber
          });
    },
    handleSearch() {
        if(this.keyword2 == '')
        {
          alert('请输入身份证号');
          return ;
        }

      axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply',action:'select',keyword2:this.keyword2}
			 }).then(res => {
				 if (res.code == 0) {
                var arry = res.data;
                if(null != arry && arry.length > 0)
                {
                  this.godoctor(arry[0].idcard);
                }else{
                  alert('请检查你输入的身份证号或预约号是否正确');
                }
				 } else {
					 this.$message.error(res.message);
				 }
                 });
                 
        },

      initwx : function()
        {
        
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
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid AppSecret:418f9b9247c5f7822fed5fcde54b65ed
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名，见附录1
                    jsApiList: ['checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            }
        });
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