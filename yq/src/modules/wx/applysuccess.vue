<template>
  <div class="page-wechat-qr">
        <HomeWechat 
            type="wechat" 
            title="缴费凭证二维码"
            :hasBackIcon="true"
        />
          <article>
            <section class="module-list module-base-info">
                <div class="title">基本信息</div>
                <div class="info-list">
                    <div class="left">预约编号:</div>
                    <div class="right">{{ruleForm.applyNumber}}</div>
                </div>

                <div class="info-list">
                    <div class="left">姓        名:</div>
                    <div class="right">{{ruleForm.applyName}}</div>
                </div>
                <div class="info-list">
                    <div class="left">身份证号:</div>
                    <div class="right">{{ruleForm.idcard}}</div>
                </div>
                 <div class="info-list">
                    <div class="left">采集网点:</div>
                    <div class="right">{{ruleForm.checkOrgName}}</div>
                </div>
                <div class="info-list">
                    <div class="left">订单类型:</div>
                    <div class="right"  style="color:red">{{ruleForm.payTypeName}}</div>
                </div>
            </section>
          </article>
        <div class="content">
            <!-- <img :src="ruleForm.applyNumberqc" style="width:50vw;height:50vw;" alt="缴费凭证二维码"> -->
            <div class="qrcode" id="qrcode" ref="qrcode"></div>

            <div v-if="isNotgk">
            <h4 style="color:red">请及时截屏并保存好此检查凭证二维码</h4>
            <h4 style="color:red">按社区通知时间进行检测</h4>
            </div>
            <div v-if="!isNotgk">
                <span>请及时截屏并保存好此检查凭证二维码,同时注册就诊时间为(8:00-11:50,14:00-17:30)</span>
            </div>
            
        </div>
  </div>
</template>

<script>
import axios from '@/services/axios';
import api from '@/services/api';
import utils from '@/utils/index';
import HomeWechat from '@/components/common/HeaderWechat.vue';
import QRCode from 'qrcodejs2';
let ruleForm = {
    ordernumber: "",
    orgnumber: "",
    business: "",
    createtime: "",
    paytime: "",
    refundtime: "",
    payer: "",
    operator: "",
    amount: "",
    remark: "",
    state: "",
    wxordernuber: "",
    phonenumber: "",
    extendinfo: "",
    refundnumber: "",
    checktime: "",
    checkstate: "",
    qrcode:""
};
export default {
    data() {
        return {
            qrpath:'',
            applyNumber:'',
            timer:null,
            isNotgk:false,
            ruleForm:ruleForm
        }
    },
    computed: {
        qrSrc() {
            //alert(this.ruleForm.qrcode)
            return this.ruleForm.qrcode;
        }
    },
    components: {
        HomeWechat
    },
    created(){
        this.applyNumber = this.$route.query.applyNumber;
        this.initData();
    },
     mounted() {
     // this.timer = setInterval(this.paycheckPaySate, 3000);
     
    },

    methods: {
         initData() {
       			 axios.post({url: api.commn.action,
				 data: {applyNumber:this.applyNumber,model:'tb_check_apply',action:'selectDetail'}
			 }).then(res => {
				
				 if (res.code == 0) {

                      if(
                        this.ruleForm.checkOrgNumber == '1000' 
                      || this.ruleForm.checkOrgNumber == '2000' 
                      || this.ruleForm.checkOrgNumber == '3000' 
                      || this.ruleForm.checkOrgNumber == '4000' 
                      || this.ruleForm.checkOrgNumber == '5000' 
                      || this.ruleForm.checkOrgNumber == '6000')
                      {
                          this.isNotgk = false;
                      }else
                      {
                           this.isNotgk = true;
                      }

                      this.ruleForm = res.data;
                      this.$nextTick(() => {
                        setTimeout(() => {
                            this.qrcode();
                        }, 100)
                    })
                    this.apply4NewStart();
				 } else {
					 this.$message.error(res.message);
				 }
                 });
        },
        apply4NewStart() {
            axios.post({ 
                url: '/api/apply4NewStart', 
                data: {
                    WechatCode: this.$route.query.wechatCode,
                    Name: this.ruleForm.applyName,
                    Gender: this.ruleForm.sex,
                    IdNumber: this.ruleForm.idcard,
                    Nation: '汉族',
                    IdType: '01',
                    Address: this.ruleForm.address,
                    Phone: this.ruleForm.tel,
                    RequestSource: 1,
                    Relation: '1',
                    ChannelNum: 0,
                    QueryCode: this.ruleForm.applyNumber,
                    AppointmentDate: this.ruleForm.applyTime,
                    AppointmentOrg: this.ruleForm.checkOrgName,
                    OpenId: this.$route.query.openid,
                }
            })
        },
        
        qrcode() {  
            let qrcode = new QRCode('qrcode', {
                width: 150,
                height: 150,
                render: 'table',
                text: this.ruleForm.applyNumber
            })
        }
    }
}
</script>



<style lang="scss" scoped>
@import "@/assets/css/common.scss";
    .page-wechat-qr {
        background-color: #fff;
        min-height: 100%;
    }
    .content {
        text-align: center;
        padding: 0 !important;
        min-height: 100%;
    }
#component-header {
    background-color: #00c7a7;
    color: white;
}
article {
    .info-list {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 6px 10px;

        .left {
            width: 30%;
            color: #999;
        }
        .right {
            width: 70%;
        }
    }
    .mint-cell {
        .mint-cell-title {
            width: 30%;
        }
        .mint-cell-value {

        }
    }
    .module-list {
        background-color: $article-color;
        padding: pxrem(10px) pxrem(10px);
        border-top: 20px solid $base-bg-color;
        box-sizing: border-box;
        .title {

            &:before {
                content: ' ';
                border-left: pxrem(10px) solid $base-color;
                margin-right: pxrem(15px);
            }

            //@include onepx-bottom-border;
            font-size: pxrem(30px);
            color: $base-font-color;
            margin-left: pxrem(10px);
            padding: pxrem(10px) 0;

        }
        /deep/ .components-checkbox {
            .checkbox-box {
                box-shadow: 2px 2px 5px #d0cbcb;
                margin-top: pxrem(20px);
                padding: pxrem(32px);
                border-radius: pxrem(6px);

                .checkbox-text {
                    width: 80%;
                }
            }
            
            .ym-info {
                margin-top: pxrem(8px);
                display: flex;
                justify-content: space-between;
                .ym-money {
                    color: red;
                    font-size: pxrem(30px);
                }
                .ym-add-sub {
                    border: 1px solid #ccc;
                    border-radius: pxrem(6px);
                    padding: pxrem(2px) pxrem(20px);
                }
                .ym-sub {
                    border-right: 1px solid #ccc;
                    padding-right: pxrem(20px);
                    color: #807979;
                }
                .ym-add {
                    border-left: 1px solid #ccc;
                    padding-left: pxrem(20px);
                    color: #807979;
                }
                .ym-input {
                    width: pxrem(60px);
                    text-align: center;
                }
            }
            
        }

    }
    .checkbox-text {
        width: 60%;
    }
    .checkbox-del {
        width: 20%;
        text-align: right;
    }
    .checkbox-money {
        color: red;
        margin-left: pxrem(20px);
        width: 20%;
    }
    
    .checkbox-box{
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        height: pxrem(30px);
        line-height: pxrem(30px);
        margin-right: 5px;
        box-shadow: 2px 2px 5px #d0cbcb;
        margin-top: 0.71429rem;
        padding: 1.14286rem;
        border-radius: 0.21429rem;
    }
    /deep/ .mint-popup {
        width: 100%;

        .popup-enter {
            display: block;
            text-align: right;
            margin: pxrem(30px) pxrem(40px) 0 0;
        }
    } 
    .add-ym {
        margin-top: pxrem(30px);
        display: block;
        text-align: center;
    }
    .module-ym-totalmoney {
        text-align: right;
        display: block;
        padding-right: pxrem(20px);

        span {
            color: red;
            font-size: pxrem(40px);
        }

        i {
            font-style: normal;
            font-size: pxrem(20px);
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
/deep/.qrcode {
    img {

        margin: 10px auto;
    }
}
</style>