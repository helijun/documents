<template>
  <div class="admin-login login-wrap">
    <div class="login-con">
      <div class="ms-login">
        <div class="ms-title">
          <span>保定市</span><br>
          <span>核酸检测预约平台</span>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
          @keyup.enter.native="submitForm('ruleForm')"
        >
          <el-form-item prop="username" class="flex">
            <div class="username-icon"></div>
            <input v-model="ruleForm.username" class="login-input input-username" placeholder="用户名">
          </el-form-item>
          <el-form-item prop="password" class="flex">
            <div class="password-icon"></div>
            <input
              type="password"
              class="login-input input-password"
              placeholder="密码"
              v-model="ruleForm.password"
            >
          </el-form-item>
          <el-form-item prop="isRemember">
            <el-checkbox v-model="ruleForm.isRemember">记住密码</el-checkbox>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" v-focus @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api";

export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: "",
        isRemember: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    
  },
  created() {
    let adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

    if (adminInfo) {
      this.ruleForm = Object.assign(this.ruleForm, adminInfo);
    }
  },
  methods: {
    validate(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if(valid){
            resolve()
          }
        });
      })
    },
    submitForm(formName) {
      this.validate(formName).then(() => {
        if(this.ruleForm.username == 'gk') {
          return;
        }

        axios.post({
          url: api.login,
          data: {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }
        }).then(res => {
          if(res.code == 0){
            localStorage.setItem('userinfo', JSON.stringify(res.data));
            localStorage.setItem('userid', res.data.userid );
            localStorage.setItem('userremark', this.ruleForm.username );
            localStorage.setItem('signPic', res.data.signPic );
            localStorage.setItem('orgnumber', res.data.business );
            localStorage.setItem('usertype', res.data.usertype );

            //usertype 1:统一支付平台,2:统一支付卫生院端,3:救护管理员,8
            if(res.data.usertype == 8) {
              this.$router.push('/apply/checkorglist');
            }else if(res.data.usertype == 9) {
              this.$router.push('/apply/applylist');
            }else if(res.data.usertype == 10) {
              this.$router.push('/apply/applylist_town');
            }else if(res.data.usertype == 11) {
              this.$router.push('/apply/applylist_town');
            }else if(res.data.usertype == 12) {
              this.$router.push('/apply/resultlist1');
            }else if(res.data.usertype == 13) {
              this.$router.push('/apply/gnj');
            }
          }else{
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      })
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="scss">
@import "static/css/base-company.scss";
.admin-login.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #34c4a8;
  .login-con {
    width: 100%;
    height: 510px;
    display: flex;
    align-items: center;
    background-color: $baseColor;
    background: url("/static/img/adminLogin.png") no-repeat center center,
      $baseColor;
  }
  .ms-logo {
    position: absolute;
    top: 50%;
    margin-top: -200px;
    width: 350px;
    height: 64px;
    background: url("/static/img/login-logo.png") no-repeat center center /
      182px 64px;
  }
  .ms-title {
    position: absolute;
    top: 50%;
    width: 350px;
    margin-top: -150px;
    text-align: center;
    font-size: 25px;
    color: #333333;
    span {
      color: $baseColor;
    }
  }
  .demo-ruleForm {
    margin-top: 180px;
  }
  .ms-login {
    width: 500px;
    height: 542px;
    background-color: #ffffff;
    margin-left: 50%;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-input {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    box-shadow: none;
    padding: 0 20px 0 60px;
    width: 350px !important;
    height: 50px !important;
    transition: all 0.3s ease 0s;
    color: #333;
    font-size: 16px;
    font-weight: normal;
    box-sizing: border-box;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    height: 50px;
    width: 350px;
    font-size: 18px;
    border-radius: 5px;
    box-sizing: border-box;
    color: #fff;
    background-color: $baseColor;
    box-shadow: 0px 5px 5px rgba(66, 102, 252, 0.15);
    border: none;
    text-transform: capitalize;
    transition: all 0.5s ease 0s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex {
    display: flex;
  }
  .username-icon {
    height: 20px;
    width: 20px;
    position: absolute;
    top: 15px;
    left: 20px;
    background: url("/static/img/username_icon.png") no-repeat center center /
      20px 20px;
  }
  .password-icon {
    height: 20px;
    width: 20px;
    position: absolute;
    top: 15px;
    left: 20px;
    background: url("/static/img/password_icon.png") no-repeat center center /
      20px 20px;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: $baseColor;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: $baseColor;
    border-color: $baseColor;
  }
}

@media screen and (max-width: 1550px) {
  .ms-login {
    transform: scale(0.7);
  }
}
</style>