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
        <div class="title">核酸检测预约</div>
        <br>
      <article>
       <section class="module-list module-base-info" style="text-align:center">   

               <div class="title1">区县</div>
							<el-select v-model="orgArea" placeholder="所属县区" :change="getcountryTown"  @change="getcountryTown" style="width:320px">
								<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
							</el-select>
              <br><br>
              <div class="title1">乡镇/街道</div>
							<el-select v-model="town" placeholder="所属镇街" :change="getData"  @change="getData"  style="width:320px">
								<el-option v-for="(item, i) in townData" :key="i" :label="item.text" :value="item.value"></el-option>
							</el-select>
          <br><br>
            <div class="title1">采集网点</div>
 							<el-select v-model="checkOrgNumber" placeholder="采集网点" :change="select_stauts"  @change="select_stauts"  style="width:320px">
								<el-option v-for="(item, i) in orgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
							</el-select>

        </section>
     </article>
      <br>
      <article>
          <div class="el-dosave">
              <mt-button type="primary" v-if="!isScan" style="height:50px"  @click="getcheckOrgData()"><span class="title2">去预约</span ></mt-button>           
          </div>
      </article>

        </div>
 
 <br>
 <br>
<br>
<br>
      </div>
  </div>


  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api"; 
import { Toast, Button,Actionsheet  } from "mint-ui";
document.title = "保定市新冠核酸检测信息管理平台";
export default {
  components: { Button },
  data() {
    return {
      orgArea:'',
        town:'',
       checkOrgNumber:'', 
       payType:'0',
      form: {},
      countryData:[],
      townData:[],
       orgData:[],
      noNumber:'',
      keyword2:'',
      photoTip: true,
      isScan:false,
      sheetVisible: false 
    };
  },
  created() {
    this.getcountryData();
  },
  mounted() {
         if(null != this.$route.query.payType)
        {
                this.payType= this.$route.query.payType;
        }
  },
  methods: {
     select_stauts(val){
			 this.$forceUpdate();
         },
    handleData(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_check_org';
				 _data.action = action;
			 }
			 return _data;
     },
    isDouble(str)
    {
      var a =str.substring(str.length-1);
      if(a == '1' || a == '3' || a == '5' || a == '7')
      {
        return false;
      }
      else{
        return true;
      }
    },
		getcountryData() {
      this.checkOrgNumber = '';
      this.town = '';
      this.townData = [];
      this.orgData = [];
			axios.post({url: api.commn.action,
				 data: {model:'tb_cityscountry',action:'select',isCache: 1}
			 }).then(res => {
				 if (res.code == 0) {
					 this.countryData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });

          this.$forceUpdate();
		},
		getcountryTown() {

      this.checkOrgNumber = '';
      this.orgData = [];
      this.townData = [];
			axios.post({url: api.commn.action,
				 data: {model:'citybyparent',action:'select',code:this.orgArea,isCache: 1}
			 }).then(res => {
				 if (res.code == 0) {
					 this.townData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });
 
          this.$forceUpdate();
    }, 
		 getData() {
        this.orgData = [];
          axios.post({url: api.commn.action,
            data: this.handleData('select',{
                orgType:'1',
                payType:this.payType,
                town:this.town,
                orgArea:this.orgArea,
                isCache: 1
              })
          }).then(res => {
            if (res.code == 0) {
              this.orgData = res.data;
            } else {
              this.$message.error(res.message);
            }
         });
        this.$forceUpdate();
     },
    getcheckOrgData() {
      if(null == this.checkOrgNumber || this.checkOrgNumber == '') {
        alert('请选择采集网点后前住预约');
        return ;
      }
      this.goPayPage();
    },
    goPayPage() {
      this.$router.push({
        path: "/freeIndex?checkOrgNumber="+this.checkOrgNumber,
        query: {
          checkOrgNumber: this.checkOrgNumber,
          checkOrgName: this.orgData.filter((item) => item.checkOrgNumber == this.checkOrgNumber)[0].orgName
        }
      });
    },
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
  font-size: pxrem(38px);
  margin-left: pxrem(10px);
  padding: pxrem(10px);
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
    font-size: pxrem(40px);
    margin-left: pxrem(20px);
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