<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="keyword2" placeholder="请输入您的预约凭证或身份证号" @keyup.enter.native="handleSearch" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="handleSearch"><span style="font-size:18px">搜索</span></el-button>
            </div>
            <div class="print-info" >
                <div class="title">预约信息</div>
                <div class="print-info-detail">
                    <el-row>
                        <el-col :span="8"><span style="font-size:20px">预约单号:  {{tableData.applyNumber}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">姓名:  {{tableData.applyName}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">性别:  {{tableData.sex}}</span></el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8"><span style="font-size:20px">单位:  {{tableData.unitName}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">身份证号:     {{tableData.idcard}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">家庭住址:  {{tableData.address}}</span></el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8"><span style="font-size:20px">预约时间:    {{tableData.applyTime}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">订单类型:    {{tableData.payTypeName}}</span></el-col>
                        <el-col :span="8"><span style="font-size:20px">缴费状态:    {{tableData.paystateName}}</span></el-col>
                    </el-row>

                </div>


                <el-card class="box-card" >

                <el-row>
                        <el-col :span="12" style="text-align:right"><span style="font-size:20px">试管编号：</span></el-col>
                        <el-col :span="12"> <el-input v-model="noNumber"  placeholder="请输入试管编号" class="handle-input"></el-input></el-col>
                    </el-row>
                       
                    <br>
                    <div class="print-btn" >
                        <el-button type="primary" icon="search" @click="updateprintcheck()"><span style="font-size:18px">采集处理</span></el-button>
                   &nbsp; &nbsp;
                        <el-button type="primary" icon="search" @click="updateprintcheck2()"><span style="font-size:18px">修正试管编号</span></el-button>
                    </div>
                </el-card>
            </div>
        </div>

    </div>
</template>

<script>
import axios from '@/services/axios';
import api from '@/services/api';
import bus from "@/components/common/bus";

import { Toast } from 'mint-ui';

export default {
    name: "ymprint",
    data() {
        return {
            tableData: {},
            cur_page: 1,
            keyword2: '', 
            noNumber:'',
        };
    },
    created() {
        bus.$on('tags' + this.$router.history.current.fullPath.split('/').join('-'), this.getData);
    },
    mounted(){
        //this.getSystemparameter();
    },
    computed: {

        data() {
            return this.tableData;
        }
    },
    methods: {
        //查询
        handleSearch() {
            if(!this.keyword2) return

            axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply',action:'select',keyword2:this.keyword2}
			 }).then(res => {
				 if (res.code == 0) {
                     var arry = res.data;
                     if(null != arry && arry.length > 0)
                     {
                         this.tableData = arry[0];
                     }
				 } else {
					 this.$message.error(res.message);
				 }
                 });
                 
        },
        //调用打印程序
        updateprintcheck() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply_state',action:'update',applyNumber:this.tableData.applyNumber,state:'1',noNumber:this.noNumber}
			 }).then(res => {
				 if (res.code == 0) {
                    alert('采购完成');
					//this.tableData = {};
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },
        updateprintcheck2() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_apply_nonumber',action:'update',applyNumber:this.tableData.applyNumber,state:'1',noNumber:this.noNumber}
			 }).then(res => {
				 if (res.code == 0) {
                    alert('修改完成');
					//this.tableData = {};
				 } else {
					 this.$message.error(res.message);
				 }
				 });
        },
		getcheckOrgData() {

        },
        //更新打印状态

    }
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
  text-align: center;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 13px;
  text-align: center;
}
.crumbs {
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    text-align: center;
    background-color: #00d1b2;
    color: white;
}
.container {
    margin: 0 auto;
    width: 1200px;
    font-size: 18px;
}
.print-info {
    .title {
        text-align: left;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .title-two {
        @extend .title;
        margin-top: 40px;
    }
    .print-info-detail {
        background-color: #e4f5f0;
        padding: 20px;

        /deep/ .el-row {
            margin: 10px 0;
        }
    }
    .print-btn {
        text-align: center;
    }
    .print-info-update {
        /deep/ .el-row {
            margin: 10px 0;
        }
    }

    .ym-list {
        margin-top: 20px;
    }

    /deep/ .el-radio-group {
        font-size: 28px;

        .el-radio {
            display: block;
            margin-bottom: 14px;
        }
        .el-radio__label {
            font-size: 17px;
        }

        .el-radio+.el-radio {
            margin-left: 0px;
        }
    }
    
}
</style>
