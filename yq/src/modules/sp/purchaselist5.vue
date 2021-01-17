<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">识别时间</div>
						<el-date-picker class="mgr--12" v-model="recordDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" :clearable="false" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>
						<div class="select-tip">状态</div>
                        <el-select v-model="state" placeholder="状态" class="handle-input">
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="-1" label="卫生机构备案" value="-1"></el-option>
                            <el-option key="0" label="卫生局备案" value="0"></el-option>
                            <el-option key="1" label="卫生机构审批" value="1"></el-option>
                            <el-option key="2" label="卫生局初审" value="2"></el-option>
							<el-option key="3" label="卫生局复审" value="3"></el-option>
							<el-option key="4" label="卫生局终审" value="4"></el-option>
							<el-option key="5" label="已完结" value="5"></el-option>
                        </el-select>
						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字" class="handle-input" ></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="purchaseRecordNumber" label="备案编号"/>
				<el-table-column prop="recordTime" label="备案时间"/>
				<el-table-column prop="orgName" label="报备单位"/>
				<el-table-column prop="projectName" label="采购项目名称"/>
				<el-table-column prop="projectAmount" label="采购预算"/>
				<el-table-column prop="applyTime" label="申请时间"/>
				<el-table-column prop="orgFianceContact" label="申请人员"/>
				<el-table-column prop="meetingTime" label="上会时间"/>
				<el-table-column label="附件">
					<template slot-scope="scope"  fixed="right">
						<span v-if="scope.row.filePath != ''" @click="downloadfile(scope.$index, scope.row)" style="text-decoration:underline;cursor:hand；color:red">附件下载</span>               
					</template>
                </el-table-column>
				<el-table-column prop="statename" label="状态"/>
				<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">审批</el-button>
					<el-button size="small" @click="handleEdit2(scope.$index, scope.row)">打印用章</el-button>
				</template>
				</el-table-column>
				<div slot="empty" class="default-empty"><span>暂时没有内容哦！</span></div>
			</el-table>
			<!-- 开始分页控件 -->
			<div v-show="!is_loading" v-if="total>cur_size" class="pagination">
				<el-pagination  @current-change="handleCurrentChange"  layout="prev, pager, next, jumper, ->, total" :total="total" :current-page="cur_page"/>
			</div>
			<!-- 结束分页控件 -->
			<!-- 结束数据列表 -->
		</div>
		<!-- 结束列表 -->
	
		<!-- 开始修改弹出框 -->
		<el-dialog title="采购备案详情" :visible="editVisible" width="900px">
			<div id="printTest"  style="width:900px">
			<p style="width:90%;text-align:center;"><span style="width:100%;font-size:24px">{{editForm.planName}}</span></p>
			<br>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
					<tr>
						<td width="100%" style="text-align:center"><H2>保定市莲池区卫健局采购计划备案表</H2></td>
					</tr>
				</thead>
			</table>
			<br>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
					<tr>
						<td width="50%"  height="40px" style="text-align:left">报备单位:{{editForm.applyNumber}}</td>
						<td width="50%" style="text-align:right">报备编号:{{editForm.orgName}}</td>
					</tr>
				</thead>
			</table>
			<table id="table" border="1" cellspacing="0" style="width:90%">
				<tr>
					<td rowspan="2">采购项目名称</td>
					<td  rowspan="2" colspan="2">{{editForm.projectName}}</td>
					<td  rowspan="2">采购预算</td>
					<td colspan="3" height="40px">小写：{{editForm.projectAmount}}万</td>							
				</tr>
				<tr>
					<td colspan="3"  height="40px">大写：{{editForm.projectAmount}}</td>
				</tr>
				<tr>
					<td colspan="8" height="40px">资金来源：{{editForm.amountSource}},{{editForm.projectAmount}}万元</td>
				</tr>
				<tr>
					<td colspan="2" height="40px">是否已列入政府采购预算</td>
					<td colspan="2">{{editForm.isGovPurchase}}</td>
					<td colspan="2">是否已列入政府采购预算</td>
					<td colspan="2">{{editForm.isGovPay}}</td>
				</tr>
				<tr>
					<td height="40px">适用法律</td>
					<td colspan="3">{{editForm.useLow}}</td>
					<td>采购方式</td>
					<td colspan="3">{{editForm.purchaseWay}}</td>
				</tr>

			</table>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
						<tr>
							<td  colspan="3" height="40px" style="text-align:left">预算单位负责人：{{editForm.orgPurchaseContact}}</td>
							<td  colspan="3" style="text-align:right">财务机构负责人：{{editForm.orgFianceContact}}</td>
							<td  colspan="2" style="text-align:right">政府采购负责人：{{editForm.govPurchaseContact}}</td>
						</tr>
						<tr>
							<td  colspan="6" height="40px"  style="text-align:left"></td>
							<td  colspan="2" style="text-align:right">联系电话：{{editForm.govTel}}</td>
						</tr>
						<tr>
							<td  colspan="3" style="text-align:left">本采购项目业务负责人：{{editForm.orgPurchaseContact}}</td>
							<td  colspan="3" style="text-align:right">联系电话：{{editForm.orgPurchaseTel}}</td>
							<td  colspan="2" style="text-align:right">&nbsp;</td>
						</tr>
				</thead>
			</table>
			<br>
			<table id="table" border="1" cellspacing="0" style="width:90%">
				<tr>
					<td colspan="3">
						<table style="width:100%">
							<tr><td  height="40px">&nbsp;</td></tr>
							<tr><td  height="40px" style="text-align:center">采购实施单位</td></tr>
							<tr><td  height="40px" style="text-align:center">同意并加盖公章</td></tr>
							<tr><td  height="40px" style="text-align:center">2020年  12 月 20  日</td></tr>
							<tr><td>&nbsp;</td></tr>
						</table>
					</td>
					<td  colspan="2">
					<table style="width:100%">
							<tr><td height="40px">&nbsp;</td></tr>
							<tr><td height="40px" style="text-align:center">主管部门领导审核意见</td></tr>
							<tr><td height="40px" style="text-align:center">同意并加盖公章</td></tr>
							<tr><td height="40px" style="text-align:center">2020 年 12 月 25 日</td></tr>
							<tr><td height="40px">&nbsp;</td></tr>
						</table>
					</td>
					<td  colspan="3">
						<table style="width:100%">
							<tr><td height="40px" style="text-align:center">采购备案编号</td></tr>
							<tr><td height="40px" style="text-align:center">2020计划备字第2020067号</td></tr>
							<tr><td height="40px" style="text-align:center">主管领导签字：</td></tr>
							<tr><td height="40px" style="text-align:center">采购办备案时间 2020 年 12 月 30 日</td></tr>
							<tr><td height="40px" style="text-align:center">上会时间    年    月    日</td></tr>
						</table>
					</td>
				</tr>
			</table>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
						<tr>
							<td width="100%" height="40px" style="text-align:left">实施单位、主管部门、审核科室分别留存，本表共3份:</td>
						</tr>
				</thead>
			</table>
			<br>
			<table id="table" border="1" cellspacing="0" style="width:90%">						
				<tr>
					<td colspan="2" height="40px">预算项目商品名称</td>
					<td >品目代码</td>
					<td  colspan="2">主要技术参数和采购需求</td>
					<td>数量</td>
					<td>预算单位</td>	
					<td>预算金额</td>								
				</tr>

				<tr>
					<td colspan="2" height="40px">{{editForm.projectName}}</td>
					<td >&nbsp;</td>
					<td  colspan="2">&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>	
					<td>{{editForm.projectAmount}}</td>								
				</tr>
				<tr>
					<td colspan="2" height="40px">&nbsp;</td>
					<td >&nbsp;</td>
					<td  colspan="2">&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>	
					<td>&nbsp;</td>								
				</tr>
				<tr>
					<td colspan="2" height="40px">预算项目合计</td>
					<td >&nbsp;</td>
					<td  colspan="2">&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>	
					<td>{{editForm.projectAmount}}</td>								
				</tr>
				</table>
				<br>		

				<table id="table" border="0" cellspacing="0" style="width:90%">
					<thead>
							<tr>
								<td width="100%" style="text-align:center">

									<el-button type="primary" class="admin-btn" @click="checkPurchase()">通过审核</el-button>
									<el-button @click="editVisible = false">取 消</el-button>
									
								</td>
							</tr>
					</thead>
				</table>

				</div>
		</el-dialog>
		<!-- 结束修改弹出框 -->
		<!-- 开始修改弹出框 -->
		<el-dialog title="用章审批表" :visible="editVisible2" width="950px">
			<div id="printTest"  style="width:950px">
			<p style="width:90%;text-align:center;"><span style="width:100%;font-size:24px">{{editForm.planName}}</span></p>
			<br>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
					<tr>
						<td width="100%" style="text-align:center"><H2>莲池区卫健局用章审批表</H2></td>
					</tr>
				</thead>
			</table>
			<br>
			<table id="table" border="0" cellspacing="0" style="width:90%">
				<thead>
					<tr>
						<td width="100%" height="40px" style="text-align:right">&nbsp;年&nbsp;月&nbsp;日</td>
					</tr>
				</thead>
			</table>
			<table id="table" border="1" cellspacing="0" style="width:900px">
				<tr>
					<td height="40px" width="200px">用章事由</td>
					<td colspan="3" width="350px">&nbsp;</td>
					<td width="200px">份数</td>
					<td height="40px" width="150px">&nbsp;</td>							
				</tr>

				<tr>
					<td height="180px" width="200px" style="text-align:center;align:center; vertical-align: bottom;">
						<span>基层单位</span>
					</td>
					<td colspan="2" width="250px" style="text-align:center; vertical-align: bottom;">	
						<span>公章</span>				
					</td>
					<td colspan="2" width="300px" style="text-align:center; vertical-align: bottom;">
						<span>基层单位负责人意见</span>				
					</td>
					<td width="150px">
					&nbsp;
					</td>
				</tr>
				<tr>
					<td height="40px"  width="200px">科室负责人意见</td>
					<td  width="100px">&nbsp;</td>
					<td  width="150px">主管领导核签</td>
					<td  width="150px">&nbsp;</td>
					<td  width="150px">局办公室负责人意见</td>
					<td  width="150px">&nbsp;</td>				
				</tr>
				<tr>
					<td height="40px">用章人</td>
					<td colspan="3">&nbsp;</td>
					<td>经办人</td>
					<td>&nbsp;</td>				
				</tr>	
				<tr>
					<td height="40px">备注</td>
					<td colspan="5">&nbsp;</td>			
				</tr>								
			</table>

			<br>
				<table id="table" border="0" cellspacing="0" style="width:90%">
					<thead>
							<tr>
								<td width="100%" style="text-align:center">
									<el-button type="primary" class="admin-btn">打印</el-button>
									<el-button @click="editVisible2 = false">取 消</el-button>									
								</td>
							</tr>
					</thead>
				</table>

				</div>
		</el-dialog>
		<!-- 结束修改弹出框 -->		
	</div>
</template>
<script> 
import axios from "@/services/axios";
import api from "@/services/api";
import moment from 'moment'
export default {
	 name: "tb_purchase_record",//页面名称
	 data() {
		 return {
			 tableData: [],//列表数据
			 batchAddFileList: [],//批量导入所选文件列表
			 cur_page: 1,//列表数据之当前页数
			 cur_size: 10,//列表数据之每页条数
			 total: 0,//列表数据之总条数
			 select_word: "",//查询关键字
			 is_loading: false,//加载数据框显示标识
			 addVisible: false,//增加框显示标识 
			 editVisible: false,//修改框显示标识 
			 editVisible2: false,//修改框显示标识 
			 delVisible:false,//删除框显示标识 
			 addForm: {},//增加表单
			 state:'',
			 checkBySignPic:'',
			 editForm: {},//修改表单
			 ids: "",// 待删除的后台编号
			 idx: -1,// 待删除的界面列表索
			 //表单字段
			 form: {
				 applyNumber: "",
				 purchaseRecordNumber: "",
				 orgNumber: "",
				 projectName: "",
				 projectAmount: "",
				 amountSource: "",
				 isGovPurchase: "",
				 isGovPay: "",
				 useLow: "",
				 purchaseWay: "",
				 usePolicy: "",
				 applyTime: "",
				 recordTime: "",
				 meetingTime: "",
				 meetingFile: "",
				 orgFianceContact: "",
				 govFinanceContact: "",
				 govPurchaseContact: "",
				 govTel: "",
				 orgPurchaseContact: "",
				 orgPurchaseTel: "",
				 checkBy1: "",
				 checkBySignPic1: "",
				 checkState1: "",
				 checkTime1: "",
				 checkBy2: "",
				 checkBySignPic2: "",
				 checkState2: "",
				 checkTime2: "",
				 checkBy3: "",
				 checkBySignPic3: "",
				 checkState3: "",
				 checkTime3: "",
				 checkBy4: "",
				 checkBySignPic4: "",
				 checkState4: "",
				 checkTime4: ""
			 },

			 //时间控件 
			 recordDate: [
				 moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
				 moment(new Date()).format("YYYY-MM-DD")
			 ],
			 //时间控件
			 pickerOptions: {
				 shortcuts: [
				 {
					 text: "最近一周",
					 onClick(picker) {
						 const end = new Date();
						 const start = new Date();
						 start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						 picker.$emit("pick", [start, end]);
					 }
				 },
				 {
					 text: "最近一个月",
					 onClick(picker) {
						 const end = new Date();
						 const start = new Date();
						 start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						 picker.$emit("pick", [start, end]);
					 }
				 },
				 {
					 text: "最近三个月",
					 onClick(picker) {
						 const end = new Date();
						 const start = new Date();
						 start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						 picker.$emit("pick", [start, end]);
					 }
				 }
				 ]
			 }
		 };
	 },
	 mounted() {
	 },
	 created() {
		 this.getData();
		 this.checkBySignPic = localStorage.getItem('signPic');
		 alert(this.checkBySignPic);
		 
	 },
	 methods: {
		 //搜索查询方法
		 search() {
			 this.cur_page = 1;
			 this.getData();
		 },
		 //表单提交前处理数据方法
		 handleData(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_purchase_record';
				 _data.action = action;
			 }
			 return _data;
		 },
		 //分页导航方法
		 handleCurrentChange(val) {
			 this.cur_page = val;
			 this.getData();
		 },
		 //弹出修改界面方法
		 handleEdit(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);
			 this.editVisible = true;
		 },
		 //弹出修改界面方法
		 handleEdit2(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);
			 this.editVisible2 = true;
		 },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 startTime: moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss"),
					 endTime: moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss"),
					 keyWord: this.select_word
					 })
			 }).then(res => {
				 this.is_loading = false;
				 if (res.code == 0) {
					 this.tableData = res.data;
					 this.total = res.sumsize;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
		 },
		 // 编辑数据方法
		 checkPurchase() {
			var param={
                 action:"update",
				 model:"tb_purchase_record_state2",
				 applyNumber:this.editForm.applyNumber,
				 checkContext:'同意',
                 checkBySignPic:this.checkBySignPic
             }
			 axios.post({url: api.commn.action,
				 data: param
			 }).then(res => {

				 if (res.code == 0) {
					this.getData();
					this.sendWXMsg(this.editForm.applyNumber,2,this.editForm.orgNumber);
                    this.editVisible = false;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
		 },
		sendWXMsg(applyNumber,checkType,orgNumber)
		 {
			var param={
                 applyNumber:applyNumber,
				 checkType:checkType,
				 orgNumber:orgNumber
             }

			 axios.post({url: api.commn.sendWxMsg,
				 data: param
			 }).then(res => {

				 });
		 }
	 },
};
</script>
<style lang="scss" scoped>
@import "static/css/base.scss";
@import "static/css/base-company.scss";
.upload-con {
height: 32px;
line-height: 32px;
overflow: hidden;
}
</style>
