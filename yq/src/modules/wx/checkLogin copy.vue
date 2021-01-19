<template>
  <div class="wrapper">
       <table>
          <tr>
           <td style="width:100%;text-align:center">
            <div style="padding-top:120px">
               <span style="font-size: 18px;color:#ffffff;font-weight:bold;">保定市</span><br>
               <span style="font-size: 20px;color:#ffffff;font-weight:bold;">新冠核酸检测采样核验系统 </span>
            </div>
           </td>
         </tr>
         <tr>
            <td>
                  <div class="wrapper-bottom">
      <section>
        <mt-field
          class="border-bottom"
          label=""
          placeholder="系统账号"
          v-model="ruleForm.username"
        ></mt-field>
        <mt-field
          class="border-bottom"
          label=""
          placeholder="登录密码"
          type="password"
          v-model="ruleForm.password"
        ></mt-field>
      </section>
    <mt-button type="primary" class="submit-btn" @click.native="submitForm">提交</mt-button>
    </div>
      </td>
        </tr>
        <tr>
          <td>
                <div class="wrapper-item3">
                    <table class="table-style">
                        <tr>
                            <td style="text-align:center"><span class="title-address"> 保定市卫生健康委员会版权所有</span></td>
                        </tr>
                    </table>
                </div>
          </td>
        </tr>
       </table>


     
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import utils from '@/utils/index';
import { Toast, Button } from "mint-ui";
import lrz from "lrz";

export default {
  components: { Button },
  data() {
    return {
      openid:'',
      orgnumber:'',
      orginfo:{},
      ruleForm: {
        username: "",
        password: "",
        isRemember: "",
        orgnumber:null,
      }
    };
  },
  async created() {
      

  },
  mounted() {
  },
  methods: {

    submitForm() {

        if(null == this.ruleForm.username || this.ruleForm.username == '')
        {
              this.$notify.error({
                title: "提交失败",
                message: "用户名不能为空"
              });
              return ;
        }
        if(null == this.ruleForm.password || this.ruleForm.password == '')
        {
              this.$notify.error({
                title: "提交失败",
                message: "密码不能为空"
              });
              return ;
        }
       
          axios.post({
              url: api.login,
              timeout: 3000,
              data: {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                usertype: 6
              }
            })
            .then(res => {
              if (res && res.code == 0) {
                let adminInfo = {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                };
                localStorage.setItem('userinfo', JSON.stringify(res.data));
                localStorage.setItem('username', this.ruleForm.username);
                localStorage.setItem('password', this.ruleForm.password);

     
                this.$router.push({ path: "/applyhandle2"});
            

   
               

              } else {
                this.$notify.error({
                  title: "提交失败",
                  message: res.message
                });
              }
            })
            .catch(error => {
              this.$notify.error({
                title: "提交失败",
                message: "服务器异常"
              });
            });
    
    },

  }
};
</script>

<style lang="scss" scoped>
@import "static/css/h5base.scss";
.wrapper{
    width: 100vw;
  height: 100vh;
   background: url("/static/img/h/login2.png") no-repeat center;
  box-sizing: border-box;
  display: flex;
  background-size:100%100%;
  justify-content: center;
}
.wrapper-top {
  width: 75vw;
  height: 45vh;
  padding-top: vw(0);
  height: vw(290);
  display: flex;
  justify-content: center;
  vertical-align: middle;
}

.wrapper-bottom {
  margin-top: 20vh;
  ul {
    margin-top: vw(20);
  }
  vertical-align: middle;
  img {
    display: block;
    width: vw(128);
    height: vw(128);
    background-color: #ffffff;
    border-radius: vw(20);
    border: solid vw(1) rgba(13, 5, 9, 0.05);
  }
  p {
    margin-top: vw(15);
    padding-left: vw(34);
  }
  section {
    width: vw(580);
     height: 30vh;
    margin: vw(145) vw(30) vw(60) vw(30);
    padding: vw(20) vw(40);
    background-color: #ffffff;
    box-shadow: 0px vw(5) vw(10) 0px rgba(53, 122, 237, 0.05);
    border-radius: vw(20);
    overflow: hidden;
    box-sizing: border-box;
    .border-bottom {
      border-bottom: vw(1) solid rgba(0, 0, 0, 0.05);
    }
  }
  .submit-btn {
    padding-top: -2vh;
    width: vw(570);
    height: vw(75);
    margin-left: vw(40);
    background-color: #24C1BC;
    box-shadow: 0px vw(3) vw(10) 0px rgba(53, 122, 237, 0.05);
    border-radius: vw(20);
  }
}
.wrapper-item3 {
   padding-top: 5vh;
  width: 96vw;
  height: 5vh;
  display: flex;
  background-size:100%100%;
  justify-content: center;
  margin: 2vw;
}

.title-title{
font-size: 20px;
color: #9B9B9B;
letter-spacing: 0;
line-height: 4vh;
}
.title-address{
font-size: 15px;
color: #9B9B9B ;
letter-spacing: 0;
line-height: 4vh;
}
</style>