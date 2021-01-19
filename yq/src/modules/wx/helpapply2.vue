<template>
    <div class="page-wechat">
    <!--背景-->
   <div class="wrapper-top">
     
        <table style="width:100%">
        <tr>
           <td style="width:100%;text-align:center">
            <div style="padding-top:30px;">
                <span style="font-size: 20px;color:#ffffff;font-weight:bold;font-family：'宋体';">&nbsp;</span><br>
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

     <article>
                <section class="module-list module-base-info">
                <mt-field label="代理人姓名:" type="text" placeholder="请输入代理人姓名" v-model="addForm.helpPersonName"></mt-field>
                <mt-field label="代理人身份证号:" type="text" placeholder="请输入代理人身份证号" v-model="addForm.helpPersonTel"></mt-field>
                <mt-field label="代理人电话:" type="text" placeholder="请输入代理人电话" v-model="addForm.helpPersonIdCard"></mt-field>
                <mt-field label="姓名:" type="text" placeholder="请输入姓名" v-model="addForm.applyName"></mt-field>
                <div  @click="selectSex()">
                <mt-field label="性别:" type="text" placeholder="请选择性别"  readonly="true" v-model="addForm.sex"></mt-field>
                </div>
                <mt-field label="身份证号:" type="text" placeholder="请输入身份证号" v-model="addForm.idcard"></mt-field>
               <mt-field label="家庭住址:" type="text" placeholder="地址需精确到省市县(区)门牌号"  v-model="addForm.address"></mt-field>   
                <mt-field label="单位名称:" type="text" placeholder="请输入单位名称"  v-model="addForm.unitName"></mt-field>
                <mt-field label="联系电话:" type="text" placeholder="请输入联系电话" v-model="addForm.tel"></mt-field>
         <!--<div @click="openPicker('datatimePicker')" >
                 <mt-field label="预约时间:" type="text" placeholder="请输入预约时间"  readonly="true" v-model="addForm.applyTime"></mt-field>    
                </div>-->

                <div  @click="selectRelation()">
                <mt-field label="检测项目:" type="text" placeholder="请选择检测项目" readonly="true" v-model="addForm.amountt"></mt-field>   
                </div>
                <mt-field label="采集网点:" type="text" placeholder="请选择采集网点"   readonly="true" v-model="addForm.checkOrgName"></mt-field>
                
                </section>
     </article>


        <article>

            <div class="el-dosave">
                <mt-button type="primary"  @click="doSaveAdd()">提交</mt-button>
            </div>

            <mt-popup
                v-model="popupVisible"
                position="bottom"
                popup-transition="popup-fade">
                    <div class="popup-enter">
                        <mt-button type="primary" size="small" @click="handleEnter">确定</mt-button>
                    </div>
                    <mt-picker
                        valueKey="text"
                        :slots="slots"
                        @change="onValuesChange"
                    ></mt-picker>
            </mt-popup>

            <mt-datetime-picker
            ref="datatimePicker"
            v-model="timeValue"
            :startDate="new Date()"
            @confirm="handleChange"
            ></mt-datetime-picker>

        <mt-popup
                v-model="popupSexVisible"
                position="bottom"
                popup-transition="popup-fade">
                    <div class="popup-enter">
                        <mt-button type="primary" size="small" @click="handleEnterSex">确定</mt-button>
                    </div>
                    <mt-picker
                        valueKey="text"
                        :slots="sexs"
                        @change="onValuesChangeSex"
                    ></mt-picker>
            </mt-popup>

            
        <mt-popup
                v-model="popupRelationVisible"
                position="bottom"
                popup-transition="popup-fade">
                    <div class="popup-enter">
                        <mt-button type="primary" size="small" @click="handleEnterRelation">确定</mt-button>
                    </div>
                    <mt-picker
                        valueKey="text"
                        :slots="relations"
                        @change="onValuesChangeRelation"
                    ></mt-picker>
            </mt-popup>

            <mt-popup
                v-model="popupDepVisible"
                position="bottom"
                popup-transition="popup-fade">
                    <div class="popup-enter">
                        <mt-button type="primary" size="small" @click="handleEnterDep">确定</mt-button>
                    </div>
                    <mt-picker
                        valueKey="text"
                        :slots="deps"
                        @change="onValuesChangeDep"
                    ></mt-picker>
            </mt-popup>
        </article>


     <!--<article>
        <section class="module-list module-base-info">
        <div class="title">温馨提示</div>
  
                <div class="infoContent">
                    <span  class="itemT" style="color:#303133;">若您已预约，可查询预约凭证  </span><span style="color:red;text-decoration: underline" @click="goapplyQuery()" >点击查询</span><br>
                </div>
           
        </section>
    </article>-->
    </div>
</template>

<script>
import { Field, Button, Toast, Indicator, Picker, DatetimePicker } from 'mint-ui';
import axios from '@/services/axios';
import api from '@/services/api';
import utils from '@/utils/index';
import wx from 'weixin-js-sdk'
import $ from 'jquery'
import moment from 'moment'
let addForm = {
  
};
export default {
    data() {
        return {
            ordernumber: "",
            timeValue:'',
            amountt:'',
            addForm:{},
            paywaylist:[{label: '一次性收费',value: '1'},{label: '分二次收费',value: '2'}],
            payway:'2',
            name: '',
            checkOrgNumber:'',
            pickerValue:'',
            popupType:'',
            popupVisible: false, //popup是否显示
            popupSexVisible: false, //popup是否显示
            popupRelationVisible:false,
            popupDepVisible:false,
            currentpopupValue: '', //当前popup的数据
            currentpopupSexValue: '', //当前popup的数据
            currentpopupRelationValue: '', //当前popup的数据
            currentpopupDepValue: '', //当前popup的数据,
            slots: [
                {
                    flex: 1,
                    values: [
                        {text:'0层'}, {text:'1层'},{text:'2层'},{text:'3层'},{text:'4层'},{text:'5层'},{text:'6层'},{text:'7层'},{text:'8层'},{text:'9层'},
                        {text:'10层'},{text:'11层'},{text:'12层'},{text:'13层'},{text:'14层'},{text:'15层'},{text:'16层'},{text:'17层'},{text:'18层'},,{text:'19层'},{text:'20层'}],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            sexs: [
                {
                    flex: 1,
                    values: [ {text:'男'}, {text:'女'}],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            relations: [
                {
                    flex: 1,
                    values: [{text:'标准检测(78元)',value:'78'}],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            deps: [
                {
                    flex: 1,
                    values: [
                        {text:'内科'}, {text:'外科'}],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            addservices1list:[{servicesid:'1',servicesname:'服务一',price:12},{servicesid:'2',servicesname:'服务二',price:12},{servicesid:'3',servicesname:'服务三',price:12},{servicesid:'4',servicesname:'服务四',price:12}],
            chooseAfterValue:[],

            addservices1list2:[{servicesid:'5',servicesname:'服务一',price:12},{servicesid:'6',servicesname:'服务二',price:12},{servicesid:'7',servicesname:'服务三',price:12},{servicesid:'8',servicesname:'服务四',price:12}],
            chooseAfterValue2:[],
            addForm:addForm,
            rules: {
            patientname: [{ required: true, message: "请填写患者姓名" }],
            contacts: [{ required: true, message: "请填写责任家属" }],
            relation: [{ required: true, message: "请填写患者关系" }],
            applyTime: [{ required: true, message: "请填写预约时间" }],
            departureaddress: [{ required: true, message: "请填写出发地址" }],
            arriveaddress: [{ required: true, message: "请填写目的地址" }]
        },
        }
    },
    components: {
        Field,
        Button,
    },
    computed: {

    },
    async created(){
        if(null != this.$route.query.checkOrgNumber)
        {
                this.checkOrgNumber= this.$route.query.checkOrgNumber;
        }
        this.getcheckOrgInfoData();
        this.init();    
         let newDate = new Date();
         this.addForm.applyTime = moment(newDate).format('YYYY-MM-DD')
    },
    mounted() {
        let newDate = new Date();
        this.addForm.applyTime = moment(newDate).format('YYYY-MM-DD')
    },
    destroyed: function () {
        
    },
    methods: {


        init(){
			 this.getNumber();
			 this.addForm.checkOrgNumber = '';
			 this.addForm.applyName = '';
			 this.addForm.birthDay = '';
			 this.addForm.sex = '';
			 this.addForm.address = '';
			 this.addForm.contact = '';
			 this.addForm.tel = '';
			 this.addForm.idcard = '';
			 this.addForm.helpPersonName = '';
			 this.addForm.helpPersonTel = '';
             this.addForm.helpPersonIdCard = '';
             this.addForm.payType = '2';
             this.addForm.amount = 0;

              this.addForm.applyTime = this.getCurrentDate();

           
        },
        getCurrentDate()
        {
            var day2 = new Date();
            day2.setTime(day2.getTime());
            var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
            return s2;
        },
         getNumber(){
			 axios.post({ url: api.commn.getNumber, data:{numberRuleCode:'comnNumber'} }).then(res => {
				 if (res.code == 0) {
                     this.addForm.applyNumber = res.data;
                     this.getQc();
                     //alert(this.addForm.applyNumber);
				 } else {
					 return null;
				 }
			 });
         },
        getQc(){
			 axios.post({ url: api.commn.getapplyqc, data:{applyNumber:this.addForm.applyNumber} }).then(res => {
				 if (res.code == 0) {
                     this.addForm.applyNumberqc = res.data;
                     
                     //alert(this.addForm.applyNumberqc);
				 } else {
					 return null;
				 }
			 });
		 },
        handleData(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_check_apply';
				 _data.action = action;
			 }
			 return _data;
		 },
        openPicker (picker) {
            // 初始化时间为当前时间，可填满上部空白，可选过期时间
            if (this.addForm.applyTime) {
                this.timeValue = this.addForm.applyTime;
            } else {
                this.timeValue = new Date();
            }
            this.$refs[picker].open()
            },

            handleChange (value) {

            //alert(value);
            // 转化为正常时间格式
            this.addForm.applyTime = this.$moment(value).format('YYYY-MM-DD');
            // 将时间格式转化为时间戳
            let  timedata = this.$moment(value, 'YYYY-MM-DD').valueOf();
            },

        selectSex() {
 
            this.popupSexVisible = !this.popupSexVisible;
            this.addForm.sex = this.currentpopupSexValue.text;
        },
        selectRelation() {
            this.popupRelationVisible = !this.popupRelationVisible;


            this.addForm.amount = this.popupRelationVisible.value;
            this.addForm.amountt = this.popupRelationVisible.text;
        },
        
        onValuesChange(picker, values) {
            console.log('onValuesChange', values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.currentpopupValue = values[0];
        },
        onValuesChangeSex(picker, values) {
            console.log('onValuesSexChange', values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.currentpopupSexValue = values[0];

        },
        onValuesChangeRelation(picker, values) {
            console.log('onValuesChangeRelation', values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.currentpopupRelationValue = values[0];
        },
        onValuesChangeDep(picker, values) {
            console.log('onValuesChangeDep', values)
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
            this.currentpopupDepValue = values[0];
        },
        handleEnter() {
   
             if(this.popupType == '1')
            {
                this.addForm.departurefloot = this.currentpopupValue.text;
            }else if(this.popupType == '2')
            {
                this.addForm.arrivefloot = this.currentpopupValue.text;
            }

            this.popupVisible = false;
        },
        handleEnterSex() {
   
            this.addForm.sex = this.currentpopupSexValue.text;
            this.popupSexVisible = false;
        },
        handleEnterRelation() {
   
            this.addForm.amount = this.currentpopupRelationValue.value;
             this.addForm.amountt = this.currentpopupRelationValue.text;
            this.popupRelationVisible = false;
        },
        handleEnterDep() {
   
            this.addForm.dep = this.currentpopupDepValue.text;
            this.popupDepVisible = false;
        },
        choosely(n,value){
                if(this.chooseAfterValue.indexOf( value )!=-1){
                    this.chooseAfterValue.splice( this.chooseAfterValue.indexOf( value ), 1 )
                }else{
                    this.chooseAfterValue.push(value)
                }

               // alert(this.chooseAfterValue.length)
            },
        choosely2(n,value){
                if(this.chooseAfterValue2.indexOf( value )!=-1){
                    this.chooseAfterValue2.splice( this.chooseAfterValue2.indexOf( value ), 1 )
                }else{
                    this.chooseAfterValue2.push(value)
                }

               // alert(this.chooseAfterValue.length)
            },
        //验证
        validate() {

    
            if(!this.addForm.applyNumber){
                Toast('请填写预约编号');
                return false;
            }
            if(!this.addForm.applyName){
                Toast('请填写姓名');
                return false;
            }
            if(!this.addForm.sex){
                Toast('请选择性别');
                return false;
            }
                 if(!this.addForm.helpPersonName){
                Toast('请输入代理人姓名');
                return false;
            }
                 if(!this.addForm.helpPersonTel){
                Toast('请输入代理人身份证号');
                return false;
            }
                 if(!this.addForm.helpPersonIdCard){
                Toast('请输入代理人电话');
                return false;
            }
            if(!this.addForm.idcard){
                Toast('请填写身份证号');
                return false;
            }
          if(!this.addForm.address){
                Toast('请填写地址');
                return false;
            }
             if(!this.addForm.tel){
                Toast('请填写联系电话');
                return false;
            }
            if(!this.addForm.applyTime){
                Toast('请填写预约时间');
                return false;
            }
           
            if(!this.addForm.checkOrgNumber){
                Toast('请选择采集网点机构');
                return false;
            }
            if(!this.checkIdCard(this.addForm.idcard))
            {               
                Toast('请填写正确的身份证编号');
                return false;
            }
           
            if(this.addForm.amount<=0)
            {               
                Toast('请选择检测标准');
                return false;
            }
            return true;
     
        },

        doSaveAdd() {

            if(this.validate())
            {

                this.addForm.amount = this.addForm.amount*100;
                this.addForm.amount = this.addForm.amount.toFixed(0);
         
                this.addForm.orgnumber = this.addForm.checkOrgNumber;
                var parm = this.handleData('insert',this.addForm);
                parm.udpclass = 'ApplySercie';
                axios.post({ 
                    url: api.commn.udpAction, 
                    data: parm
                    
                    }).then(res => {
                        if (res.code == 0) {
                            alert('预约成功，请缴费');
                           
                            let url = 'https://zy.gk0312.cn/#/wechat/applypay?paynumber='+res.data+'&orgnumber='+this.addForm.payOrgNumber;
                             window.location.href = url;
                        } else {
                            this.$message.error(res.message);
                        }
                });
            }

					
        },
        checkIdCard(card)
        {
            if(card.length == 18 || card.length == 9)
            {
                return true;
            }else
            {
                return false;
            }
            // //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            // var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            // if(reg.test(card) === false)
            // {
            //     return false;
            // }
            // return true;
        },
        goapplyQuery() {
            this.$router.push({
              path: "/applyQuery",
            });
            },
    getcheckOrgInfoData() {

      if(null == this.checkOrgNumber || this.checkOrgNumber == '')
      {
          alert('请选择采集网点后前住预约');
          return ;
      }
        var parm = {};
        parm.udpclass = 'OrgInfoSercie';
        parm.checkOrgNumber = this.checkOrgNumber;
                axios.post({ 
                    url: api.commn.udpAction, 
                    data: parm
                    }).then(res => {
                        if (res.code == 0) {
                            var info =  res.data;
                            this.addForm.checkOrgName = info.orgName;
                            this.addForm.checkOrgNumber = info.checkOrgNumber;
                            this.addForm.payOrgNumber = info.payOrgNumber;
                           
                            if(null != info.payType && '' != info.payType)
                            {
                                  this.relations[0].values = this.getItem(info.priceInfo);
                            }
                            this.$forceUpdate();
     
                        } else {
                            this.$message.error(res.message);
                        }
                });
        },
        getItem(str)
        {

           var itemstr =  str.split(";");
           var arry = [];
           for(var i=0;i<itemstr.length;i++)
           {
                var o = itemstr[i].split(",");

                var obj = {text:o[0],value:o[1]};

                arry[i] = obj;
           }
          
           return arry;
        },
		getcheckOrgData() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_org2',action:'select',orgType:'1',checkOrgNumber:this.checkOrgNumber}
			 }).then(res => {
				 if (res.code == 0) {
                    // alert('dd');
                     this.relations[0].values =  res.data;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },

    },
    watch: {
        pickerValue() {
            this.addForm.applyTime = moment(this.pickerValue).format('YYYY-MM-DD')

        }
    }
}
</script>


<style lang="scss" scoped>
@import "@/assets/css/common.scss";



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
.fieldinput{
    border-bottom: 1px solid #D1D1D1;
    border-top: 0px;
    border-left: 0px;
    height: 4vh;
    font-family: PingFangSC-Medium;
    font-size: pxrem(24px);
    color: #000000;
    font-weight:bold;
    border-right: 0px;
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
.wrapper-baseinfo
{
 width: 96vw;
  margin-top: -6vh;
  margin-bottom: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
  padding-top:2vh;
  background-color:white;
  border-radius:5px;
  padding-bottom: 1vh;
}

.wrapper-orderinfo-top
{
 width: 96vw;
 height: 1vh;
  margin-top: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
  background-color:#12B2B7;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

}
.wrapper-orderinfo2
{
 width: 96vw;
  margin-bottom: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
    padding-top:2vh;
  background-color:white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-bottom: 2vh;
}
.wrapper-orderinfo
{
 width: 96vw;
  margin-bottom: 1vh;
  margin-left: 2vw;
  margin-right: 2vw;
  background-color:white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-bottom: 2vh;
}
.wrapper-orderinfocheck
{
 width: 96vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 2vw;
  margin-right: 2vw;
 font-size: pxrem(26px);
    color:#303133;
  padding-bottom: 2vh;
}

.serviceitem
{
     width: 43vw;
  margin-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
  background-color:#F3FBF1;
  border-radius:5px;
  padding-top:1vh;
   height: 8vh;

     .serviceitem_name
  {
     font-family: PingFangSC-Medium;
    font-size: pxrem(28px);
    color: #000000;
    font-weight:bold;
        letter-spacing: 0;
        text-align: center;
       
  }
    .serviceitem_price
  {
   font-family: PingFangSC-Regular;
   font-size: pxrem(24px);
    color: #303133;
    letter-spacing: 0;
    text-align: center;
   
  }
}
.serviceitem2
{
     width: 43vw;
  margin-bottom: 1vh;
  margin-left: 1vw;
  margin-right: 1vw;
  background-color:#C4EFFC;
  color: #0087B4;
  border: 2px solid #C4EFFC;
  border-radius:5px;
  padding-top:1vh;
   height: 8vh;

     .serviceitem_name
  {
      font-family: PingFangSC-Medium;
        font-size: pxrem(28px);
       color: #1985E5;
        font-weight:bold;
        letter-spacing: 0;
        text-align: center;
       
  }
    .serviceitem_price
  {
   font-family: PingFangSC-Medium;
   font-size: pxrem(24px);
   color: #1985E5;
    letter-spacing: 0;
    text-align: center;
   
  }
}
.infoContent{
      padding-right: 12vw;
      padding-left: 8vw;
}

.div-info{ 


  } 
  .org-item-value{
font-size: pxrem(24px);
color: #FFFFFF;
letter-spacing: 0;
line-height: 4vh;
}
  .page-wechat{
      background-color: #F2F2F2
  }
  .itemT{
      font-size: pxrem(27px);
      font-family: PingFangSC-Regular;
        color: #4A4A4A;;
        letter-spacing: 0;
  }
  .moveBtn
  {
       width:12vw;
       height: 4vh;
             padding-top: 0.5vh;
      padding-bottom: 0.5vh;
        font-size: pxrem(18px);
        font-family: PingFangSC-Medium;
        color: #32C7CA;
        text-align: center;
        letter-spacing: 0;
          border: 1px solid #32C7CA;
  border-radius:3px;

  }

</style>
