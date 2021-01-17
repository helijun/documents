<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 订单质控信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
             <el-row :gutter="20">
					<el-col :span="24">
          
            <div class="select-tip">基础信息</div>
            <br>
                        <div>
                        <el-row :gutter="20" class="row_item">
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">采购项目名称</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.projectName" class="handle-input"></el-input></el-col>
                                  </el-row>
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">报备单位</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.orgName" class="handle-input"></el-input></el-col>
                                  </el-row>
                            </el-col>

                            <el-col :span="6">
                                
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">报备编号</div></el-col>
                                    <el-col  :span="16"><el-input v-model="purchaseInfo.applyNumber" class="handle-input"></el-input></el-col>
                                  </el-row>
 			
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">采购预算</div></el-col>
                                    <el-col  :span="16"><el-input v-model="purchaseInfo.projectAmount" class="handle-input"></el-input></el-col>
                                  </el-row>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20" class="row_item">
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">申请时间</div></el-col>
                                    <el-col :span="12"><el-input v-model="purchaseInfo.applyTime" class="handle-input"></el-input></el-col>
                                  </el-row>
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">资金来源</div></el-col>
                                    <el-col :span="16">
                                      <el-select v-model="purchaseInfo.amountSource" placeholder="资金来源" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                        <el-option key="区财政资金" label="区财政资金" value="区财政资金"></el-option>
                                        <el-option key="其他资金" label="其他资金" value="其他资金"></el-option>
                                    </el-select>	
                                    </el-col>
                                  </el-row>
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">是否已列入政府采购</div></el-col>
                                    <el-col :span="16">
                                      <el-select v-model="purchaseInfo.isGovPurchase" placeholder="是否已列入政府采购" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                          <el-option key="是" label="是" value="是"></el-option>
                                          <el-option key="否" label="否" value="否"></el-option>
                                      </el-select>	
                                    </el-col>
                                  </el-row>			
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">是否已列入政府采购预算</div></el-col>
                                    <el-col :span="16">
                                      <el-select v-model="purchaseInfo.isGovPay" placeholder="是否已列入政府采购预算" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                          <el-option key="是" label="是" value="是"></el-option>
                                          <el-option key="否" label="否" value="否"></el-option>
                                      </el-select>	
                                    
                                    </el-col>
                                  </el-row>			
                            </el-col>						
                        </el-row>
                       <!---->
                        <el-row :gutter="20" class="row_item">
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">适用法律</div></el-col>
                                    <el-col :span="12">
                                      <el-select v-model="purchaseInfo.useLow" placeholder="适用法律" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                          <el-option key="政府采购法" label="政府采购法" value="政府采购法"></el-option>
                                      </el-select>	
                                    </el-col>
                                  </el-row>
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">采购方式</div></el-col>
                                    <el-col :span="16">
                                      <el-select v-model="purchaseInfo.purchaseWay" placeholder="采购方式" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                          <el-option key="自行询价" label="自行询价" value="自行询价"></el-option>
                                      </el-select>	                                      
                                    </el-col>
                                  </el-row>
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">本采购项目业务负责人</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.orgPurchaseContact" class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">本采购项目电话</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.orgPurchaseTel" class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>						
                        </el-row>
                     <!---->
                        <el-row :gutter="20" class="row_item">
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">预算单位负责人</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.orgPurchaseContact"  class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">财务机构负责人</div></el-col>
                                    <el-col  :span="16"><el-input v-model="purchaseInfo.orgFianceContact"  class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>					
                   
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">政府采购负责人</div></el-col>
                                    <el-col :span="16"><el-input v-model="purchaseInfo.govPurchaseContact" class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>
                            <el-col :span="6">
                                  <el-row :gutter="20">
                                    <el-col :span="8"> <div class="select-tip">政府采购电话</div></el-col>
                                    <el-col  :span="16"><el-input v-model="purchaseInfo.govTel"  class="handle-input"></el-input></el-col>
                                  </el-row>			
                            </el-col>					
                        </el-row>
                        </div>å
                  <br>
					</el-col>
          </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                   <div>
                <div class="select-tip">预算项目明细</div>
                <br>
                <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                  <el-table-column prop="projectName" label="预算项目商品名称"/>
                  <el-table-column prop="projectcode" label="品目代码"/>
                  <el-table-column prop="requirement" label="主要技术参数和采购需求"/>
                  <el-table-column prop="purchasacount" label="数量"/>
                  <el-table-column prop="price" label="预算单位"/>
                  <el-table-column prop="projectAmount" label="预算金额"/>
                </el-table>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24" style="text-align:center">
                  <br>
                  <div>
                    <el-button type="primary"   @click="savePurchaseRecord()">保存</el-button>
                    <el-button type="primary"   @click="goback()">返回</el-button>
                  </div>

              </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
import axios from "@/services/axios";
import { Toast } from "mint-ui";
import api from "@/services/api";
import { Loading } from "element-ui";
import bus from "@/components/common/bus";
let ruleForm = {};
export default {
  name: "orderlist",
  data() {
    return {
      applyNumber: null,
      purchaseInfo: ruleForm,
      dialogTitle: "添加疫苗",
      tableData: []
    };
  },
  created() {
    this.applyNumber = this.$route.query.applyNumber;
    this.getPurchaseInfo();
    bus.$on(
      "tags" + this.$router.history.current.fullPath.split("/").join("-"),
      this.getData
    );
  },
  computed: {
    data() {}
  },
  methods: {
    select_stauts(val) {
      this.$forceUpdate();
    },
    //初始化司机
    getPurchaseInfo() {
      axios
        .get({
          url: api.commn.action,
          data: {
            model: "tb_purchase",
            action: "selectDetail",
            applyNumber: this.applyNumber
          }
        })
        .then(res => {
          if (res.code == 0) {
            this.purchaseInfo = res.data;

            var item = {};
            item.projectName = this.purchaseInfo.projectName;
            item.projectcode = "";
            item.requirement = "";
            item.purchasacount = "";
            item.price = "";
            item.projectAmount = this.purchaseInfo.projectAmount;
            this.tableData.push(item);

            var item3 = {};
            item3.projectName = "预算项目合计";
            item3.projectcode = "";
            item3.requirement = "";
            item3.purchasacount = "";
            item3.price = "";
            item3.projectAmount = this.purchaseInfo.projectAmount;
            this.tableData.push(item3);
          }
        });
    },
    goback() {
      this.$router.push("/sp/purchaselist3");
    },
    savePurchaseRecord() {
      this.purchaseInfo.action = "insert";
      this.purchaseInfo.model = "tb_purchase_record";
      this.purchaseInfo.orgNumber = this.purchaseInfo.applyOrgNumber;

      axios
        .get({
          url: api.commn.action,
          data: this.purchaseInfo
        })
        .then(res => {
          if (res.code == 0) {
            this.savePurchaseRecordItem();
          }
        });
    },
    //增加子单
    savePurchaseRecordItem() {
      this.purchaseInfo.action = "insert";
      this.purchaseInfo.model = "tb_purchase_record_item";
      this.purchaseInfo.applyItemNumber =
        this.purchaseInfo.applyNumber + "" + "001";
      this.purchaseInfo.projectcode = "";
      this.purchaseInfo.requirement = "";
      this.purchaseInfo.purchasacount = "";
      this.purchaseInfo.price = "";

      axios
        .get({
          url: api.commn.action,
          data: this.purchaseInfo
        })
        .then(res => {
          if (res.code == 0) {
            this.saveCheck();
            this.sendWXMsg(
              this.purchaseInfo.applyNumber,
              0,
              this.purchaseInfo.orgNumber
            );
          }
        });
    },
    //修改申请单状态
    saveCheck() {
      var param = {
        action: "update",
        model: "tb_purchase_state",
        applyNumber: this.purchaseInfo.applyNumber,
        state: "3"
      };
      axios
        .post({
          url: api.commn.action,
          data: param
        })
        .then(res => {
          if (res.code == 0) {
            alert("备案成功");
            this.goback();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    sendWXMsg(applyNumber, checkType, orgNumber) {
      var param = {
        applyNumber: applyNumber,
        checkType: checkType,
        orgNumber: orgNumber
      };

      axios
        .post({
          url: api.commn.sendWxMsg,
          data: param
        })
        .then(res => {});
    }
  },
  watch: {}
};

import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}
.search-title {
  font-size: 12px;
}
.handle-select {
  width: 120px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}
.handle-input2 {
  width: 610px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.upload-excel {
  display: inline-block;
  vertical-align: -webkit-baseline-middle;

  /deep/ .el-upload {
    width: 100px;
    height: 35px;
    border: 0;
  }

  /deep/ .el-upload-list {
    float: right;
    display: flex;
    align-items: center;
  }
}
.del-update-row {
  display: flex;
}
/deep/ .export-tiaoma {
  .el-row {
    margin-left: 200px !important;
    margin-right: 200px !important;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item__label {
    width: 100px !important;
  }
  .el-form-item__content {
    margin-left: 100px !important;
  }
  .el-form-item {
    margin-bottom: 50px;
  }
}
.search-tip {
  font-size: 14px;
  color: #606266;
}
.video_title {
  font-size: 20px;
  color: #02a7f0;
}
.video_item {
  font-size: 16px;
  padding-top: 5px;
}
.row_item {
  padding-bottom: 5px;
}
.video_heard_title {
  border-bottom: 1px solid;
  color: grey;
}
.infoitem {
  font-size: 12px;
  color: grey;
}
</style>
