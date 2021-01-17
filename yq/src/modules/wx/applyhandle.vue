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
 <br>
 
<div class="title">检测采集处理</div>
<br>
<br>
<br>
      <article>
       <section class="module-list module-base-info" style="text-align:center">   
        
             
                <el-input v-model="keyword2"  placeholder="请输入身份证号或预约号" class="handle-input" style="width: 240px;"></el-input>
          
      
        </section>
     </article>


        <article>

            <div class="el-dosave">
                <mt-button type="primary"  @click="handleSearch()">直接查找</mt-button>           
             <br>&nbsp;
                 <mt-button type="primary"  @click="goscan()">扫预约凭证</mt-button>
            </div>
        </article>


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
      form: {},
      keyword2:'',
      photoTip: true,
      sheetVisible: false 
    };
  },
  created() {
    this.initwx();

  },
  mounted() {
    this.faceInfo = JSON.parse(sessionStorage.getItem("faceInfo"));
    this.companyname=sessionStorage.getItem("companyname");
  },
  methods: {
    actionSheet: function(){    
        this.sheetVisible = true;     
    },      
      
    goscan: function(){        
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
                                    
                                     //alert(res.resultStr);
                                     //this.keyword2 = res.resultStr;
                                     // this.handleSearch();
                                      window.location = location.href.split('#')[0]+"/#/checkhandle?idcard="+res.resultStr;
                                      
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
                  // if(arry[0].state == 1)
                  // {
                  //   alert('此预约已完成检测采集');
                  // }
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