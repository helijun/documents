<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">预约时间</div>
						<el-date-picker class="mgr--12" v-model="recordDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm" :clearable="true" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>
						<div class="select-tip">检测时间</div>
						<el-date-picker class="mgr--12" v-model="checkDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm" :clearable="true" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>

						<div class="select-tip" v-show="currentUsertype == 11">镇街</div>
						<el-select v-model="town" placeholder="所属镇街" @change="getorgData" v-show="currentUsertype == 11" >
							<el-option key="" label="全部" value=""></el-option>
							<el-option v-for="(item, i) in townData" :key="i" :label="item.text" :value="item.value"></el-option>
						</el-select>

						<div  class="select-tip">采集网点</div>
                        <el-select v-model="checkOrgNumber" placeholder="采集网点" :change="select_stauts"  @change="select_stauts" style="width:150px;">
							<el-option key="" label="全部" value=""></el-option>
                        	<el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
                        </el-select>

						<div class="select-tip">状态</div>
                        <el-select v-model="state" placeholder="采集网点" :change="select_stauts"  @change="select_stauts" >
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="0" label="未采集" value="0"></el-option>
                            <el-option key="1" label="已采集" value="1"></el-option>
							<el-option key="2" label="已送样" value="2"></el-option>
                        </el-select>

						<div class="select-tip">订单类型</div>
                        <el-select v-model="payType" placeholder="订单类型" :change="select_stauts"  @change="select_stauts">
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="1" label="免费" value="1"></el-option>
                            <el-option key="2" label="自费" value="2"></el-option>
                        </el-select>

						
						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字"  style="width:150px;"></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>

						<!-- <el-button type="primary" class="admin-btn" @click="handlesendsimple">检测送样</el-button> -->
						<el-button type="primary" class="admin-btn" @click="handleExport3">导出</el-button>
						<!--<el-button type="primary" class="admin-btn" @click="handleExport">导出统计表</el-button>
						<el-button type="primary" class="admin-btn" @click="handleExport2">导出检验科报表</el-button>-->
						
					</el-col>
					<!--<el-button type="primary" class="admin-btn" @click="handleAdd">增加预约检测订单</el-button>-->
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="applyNumber" label="申请编号"/>
				<el-table-column prop="checkOrgName" label="预约采集网点"/>
				<el-table-column prop="applyName" label="姓名"/>
				<el-table-column prop="sex" label="性别"/>
				<el-table-column prop="address" label="地址"/>
				<el-table-column prop="createTime" label="创建时间"/>
				<el-table-column prop="applyTime" label="预约日期"/>
				<el-table-column prop="tel" label="电话"/>
				<el-table-column prop="idcard" label="身份证号"/>
				<el-table-column prop="helpPersonName" label="代理申请人 "/>
				<el-table-column prop="checkTime" label="检测时间 "/>
				<el-table-column prop="stateName" label="采集状态"/>
				<el-table-column prop="noNumber" label="试管编号"/>
				<el-table-column prop="payTypeName" label="订单类型"/>
				<el-table-column prop="paystateName" label="缴费状态"/>
				<!--
				<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
				</el-table-column>
				-->
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
		<!-- 开始增加弹出框 -->
		<el-dialog title="增加预约检测订单" :visible.sync="addVisible" width="400px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="申请编号" prop="applyNumber">
					<el-input v-model="addForm.applyNumber" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="预约采集网点" prop="checkOrgNumber">
					<el-input v-model="addForm.checkOrgNumber" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="applyName">
					<el-input v-model="addForm.applyName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="生日" prop="birthDay">
					<el-input v-model="addForm.birthDay" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-input v-model="addForm.sex" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input v-model="addForm.address" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="createTime">
					<el-input v-model="addForm.createTime" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="预约日期" prop="applyTime">
					<el-input v-model="addForm.applyTime" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contact">
					<el-input v-model="addForm.contact" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="addForm.tel" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idcard">
					<el-input v-model="addForm.idcard" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="代理申请人 " prop="helpPersonName">
					<el-input v-model="addForm.helpPersonName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="代理申请人电话" prop="helpPersonTel">
					<el-input v-model="addForm.helpPersonTel" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="代理申请人身份证号" prop="helpPersonIdCard">
					<el-input v-model="addForm.helpPersonIdCard" class="handle-input"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveAdd('addForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束增加弹出框 -->
		<!-- 开始修改弹出框 -->
		<el-dialog title="送样" :visible.sync="editVisible" width="400px">
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="117px">
				<el-form-item label="此次送样数量" >
					<el-input v-model="total" class="handle-input" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="送样机构" prop="sendOrgNumber">
					    <el-select v-model="sendOrgNumber" placeholder="送样机构" :change="select_stauts"  @change="select_stauts" style="width:200px;">
                        	<el-option v-for="(item, i) in sendOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
                        </el-select>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="handleExport6()">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束修改弹出框 -->
		<!-- 开始删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="400px" center>
			<div class="del-dialog-cnt">是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束删除提示框 -->
	</div>
</template>
<script> 
import axios from "@/services/axios";
import api from "@/services/api";
import moment from 'moment'
export default {
	 name: "tb_check_apply",//页面名称
	 data() {
		 return {
			 tableData: [],//列表数据
			countryData:[],
			sendOrgData:[],
     		 townData:[],
			   orgData:[],
			   sendOrgNumber:'',
			 state:'',
			 payType:'',
			 usertype:'',
			 batchAddFileList: [],//批量导入所选文件列表
			 cur_page: 1,//列表数据之当前页数
			 cur_size: 10,//列表数据之每页条数
			 total: 0,//列表数据之总条数
			 isAllOrg:false,
			 select_word: "",//查询关键字
			 is_loading: false,//加载数据框显示标识
			 addVisible: false,//增加框显示标识 
			 editVisible: false,//修改框显示标识 
			 delVisible:false,//删除框显示标识 
			 addForm: {},//增加表单
			 editForm: {},//修改表单
			 ids: "",// 待删除的后台编号
			 idx: -1,// 待删除的界面列表索
			 checkOrgData:[],
			orgArea:'',
			town:'',
			checkOrgNumber:'', 
			 //表单字段
			 form: {
				 applyNumber: "",
				 checkOrgNumber: "",
				 applyName: "",
				 birthDay: "",
				 sex: "",
				 address: "",
				 createTime: "",
				 applyTime: "",
				 contact: "",
				 tel: "",
				 idcard: "",
				 helpPersonName: "",
				 helpPersonTel: "",
				 helpPersonIdCard: ""
			 },
			 //表单验证规则，需绑定到对应表单中
			 rules: {
				 applyNumber: [{ required: true, message: "请填写申请编号" }],
				 checkOrgNumber: [{ required: true, message: "请填写预约采集网点" }],
				 sendOrgNumber: [{ required: true, message: "请填写检测点" }],
				 applyName: [{ required: true, message: "请填写姓名" }],
				 birthDay: [{ required: true, message: "请填写生日" }],
				 sex: [{ required: true, message: "请填写性别" }],
				 address: [{ required: true, message: "请填写地址" }],
				 createTime: [{ required: true, message: "请填写创建时间" }],
				 applyTime: [{ required: true, message: "请填写预约日期" }],
				 contact: [{ required: true, message: "请填写联系人" }],
				 tel: [{ required: true, message: "请填写电话" }],
				 idcard: [{ required: true, message: "请填写身份证号" }],
				 helpPersonName: [{ required: true, message: "请填写代理申请人 " }],
				 helpPersonTel: [{ required: true, message: "请填写代理申请人电话" }],
				 helpPersonIdCard: [{ required: true, message: "请填写代理申请人身份证号" }]
			 },
			 //时间控件 
			 recordDate: [
		 		moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
				moment(new Date().getTime() + 3600 * 1000 * 24 * 2).format("YYYY-MM-DD"),
			 ],
			 //时间控件 
			 checkDate: [
		 		moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
				moment(new Date().getTime() + 3600 * 1000 * 24 * 2).format("YYYY-MM-DD"),
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

		let userid = localStorage.getItem('orgnumber');
		 this.usertype = localStorage.getItem('usertype');
		
		if(null != userid && 'null' != userid)
		{
			this.town = userid;
		}
		if (this.currentUsertype == 11) {
			this.getcountryTown();
		}
		this.getorgData();
		this.getSendOrgData();
		this.getData();
	
	 },
	computed: {
		currentUsertype(){
			let userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			return userinfo ? userinfo.usertype : '';
		},
		currentTown(){
			let userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			return userinfo ? userinfo.town : '';
		},
		currentOrgArea(){
			let userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			return userinfo ? userinfo.orgArea : '';
		},
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
				 _data.model = 'tb_check_apply';
				 _data.action = action;
			 }
			 return _data;
		 },
		getcountryData() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_cityscountry',action:'select'}
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
			axios.post({url: api.commn.action,
				 data: {model:'citybyparent',action:'select',code:this.currentOrgArea}
			 }).then(res => {
				 if (res.code == 0) {
					 this.townData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });
          this.$forceUpdate();
		}, 
	    handleData2(action,_data) {
			 if(null != _data)
			 {
				 _data.model = 'tb_check_org';
				 _data.action = action;
			 }
			 return _data;
		 },

			 getorgData() {
			 axios.post({url: api.commn.action,
				 data: this.handleData2('select',{
					 orgType:'1',
					 town:this.town || this.currentTown,
					 })
			 }).then(res => {
				 if (res.code == 0) {
					 this.checkOrgData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });
          this.$forceUpdate();
		 },
		 getSendOrgData()
		 {
			axios.post({url: api.commn.action,
				 data: this.handleData2('select',{
					 orgType:'2',
					 town:this.check,
					 })
			 }).then(res => {
				 if (res.code == 0) {
					 this.sendOrgData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });
          this.$forceUpdate();
		 },
		 //获得编号方法
		 getNumber(){
			 axios.post({ url: api.commn.getNumber, data:{numberRuleCode:'comnNumber'} }).then(res => {
				 if (res.code == 0) {
					 return res.data;
				 } else {
					 return null;
				 }
			 });
		 },
		 //分页导航方法
		 handleCurrentChange(val) {
			 this.cur_page = val;
			 this.getData();
		 },
		 //弹出增加界面方法
		 handleAdd() {
			 this.addForm.applyNumber = '';
			 this.addForm.checkOrgNumber = '';
			 this.addForm.applyName = '';
			 this.addForm.birthDay = '';
			 this.addForm.sex = '';
			 this.addForm.address = '';
			 this.addForm.createTime = '';
			 this.addForm.applyTime = '';
			 this.addForm.contact = '';
			 this.addForm.tel = '';
			 this.addForm.idcard = '';
			 this.addForm.helpPersonName = '';
			 this.addForm.helpPersonTel = '';
			 this.addForm.helpPersonIdCard = '';
			 this.addVisible = true;
		 },
		 //弹出修改界面方法
		 handleEdit(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);
			 this.editVisible = true;
		 },
		 handlesendsimple()
		 {
			if(this.state != '1')
			{
				alert('请先将状态选为[已检测]后，查询后，再做此操作');
				return ;
			}
			  this.editVisible = true;
		 },
		 //弹出删除界面框方法
		 handleDelete(index, row) {
			 this.idx = index;
			 this.ids = row.applyNumber;
			 this.delVisible = true;
		 },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			var parm = {
						start: (this.cur_page - 1) * this.cur_size,
						limit: this.cur_size,
						state:this.state,
						payType:this.payType,
						countryareacode: this.currentOrgArea,
						townareacode: this.town || this.currentTown,
						checkOrgNumber:this.checkOrgNumber,
						startTime: this.recordDate ? moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
						endTime: this.recordDate ? moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss") : '',
						startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
						endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
						keyWord: this.select_word
					 }

	
		
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',parm)
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
		 // 新增数据方法
		 saveAdd(formName) {
			 if (this.$refs[formName]) {
				 this.$refs[formName].validate(valid => {
					 if (valid) {axios.post({ url: api.commn.action, data: this.handleData('insert',this.addForm) }).then(res => {
						 if (res.code == 0) {
							 this.addVisible = false;
							 this.$message.success("增加成功");
							 this.getData();
						 } else {
							 this.$message.error(res.message);
						 }
						 });
					 } else {
							 this.$message.error("验证未通过");
							 return;
					 }
				 });
			 }
		 },
		 // 编辑数据方法
		 saveEdit(formName) {
			 if (this.$refs[formName]) {
				 this.$refs[formName].validate(valid => {
					 if (valid) {axios.post({ url: api.commn.action, data: this.handleData('update',this.editForm) }).then(res => {
						 if (res.code == 0) {
							 this.editVisible = false;
							 this.$message.success("修改成功");
							 this.getData();
						 } else {
							 this.$message.error(res.message);
						 }
						 });
					 } else {
							 this.$message.error("验证未通过");
							 return;
					 }
				 });
			 }
		 },
		 //删除数据方法
		 deleteRow(){
			 axios.post({ url: api.commn.action, data: this.handleData('deleteById',{ applyNumber: this.ids }) }).then(res => {
				 if (res.code == 0) {
					 this.delVisible = false;
					 this.tableData.splice(this.idx, 1);
					 this.$message.success("删除成功");
				 } else {
					 this.$message.error(res.message);
				 }
			 });
		 },
		select_stauts(val){
			 this.$forceUpdate();
         },
		handleExport(){

        let params = {
            title: '',
			excelType: '3',
			udpclass:'ExcelService',
			state:this.state,
			townareacode: this.town || this.currentTown,
			checkOrgNumber:this.checkOrgNumber,
			payType:this.payType,
			startTime: moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss"),
			startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
			endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
			keyWord: this.select_word
        };
        	if(params.townareacode !='' && params.countryareacode != '')
			{
				params.countryareacode = '';
			}
       this.is_loading = true;
        axios.get({
            url: api.commn.udpAction,
            data:params
        }).then(res => {
            console.log(api.commn.exportFile, ' success', res)
            if(res.code == 0){
                this.$root.$children[0].exportcheck(res.data).then(() => this.is_loading=false)
            }else{
               this.is_loading = false;
            }
        })
		},

		
		handleExport2(){

        let params = {
            title: '',
			excelType: '4',
			udpclass:'ExcelService',
			state:1,
			townareacode: this.town || this.currentTown,
			checkOrgNumber:this.checkOrgNumber,
			payType:this.payType,
			startTime: moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss"),
			startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
			endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
			keyWord: this.select_word
        };
            if(params.townareacode !='' && params.countryareacode != '')
			{
				params.countryareacode = '';
			}
       this.is_loading = true;
        axios.get({
            url: api.commn.udpAction,
            data:params
        }).then(res => {
            console.log(api.commn.exportFile, ' success', res)
            if(res.code == 0){
                this.$root.$children[0].exportcheck(res.data).then(() => this.is_loading=false)
            }else{
               this.is_loading = false;
            }
        })
		},
		handleExport3(){

        let params = {
            title: '',
			excelType: '5',
			udpclass:'ExcelService',
			state:this.state,
			checkOrgNumber:this.checkOrgNumber,
			payType:this.payType,
			townareacode: this.town || this.currentTown,
			startTime: moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss"),
			startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
			endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
			keyWord: this.select_word
        };
            if(params.townareacode !='' && params.countryareacode != '')
			{
				params.countryareacode = '';
			}
       this.is_loading = true;
        axios.get({
            url: api.commn.udpAction,
            data:params
        }).then(res => {
            console.log(api.commn.exportFile, ' success', res)
            if(res.code == 0){
                this.$root.$children[0].exportcheck(res.data).then(() => this.is_loading=false)
            }else{
               this.is_loading = false;
            }
        })
		},
		handleExport6(){
			if(this.sendOrgNumber == '')
			{
				alert('请选择检测机构');
				return ;
			}

        let params = {
            title: '',
			excelType: '6',
			udpclass:'ExcelService',
			state:this.state,
			checkOrgNumber:this.checkOrgNumber,
			sendOrgNumber:this.sendOrgNumber,
			payType:this.payType,
			townareacode:this.town,
			startTime: moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss"),
			endTime: moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss"),
			startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
			endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
			keyWord: this.select_word
        };
            if(params.townareacode !='' && params.countryareacode != '')
			{
				params.countryareacode = '';
			}
       this.is_loading = true;
        axios.get({
            url: api.commn.udpAction,
            data:params
        }).then(res => {
            console.log(api.commn.exportFile, ' success', res)
            if(res.code == 0){
				this.editVisible =false;
                this.$root.$children[0].exportcheck(res.data).then(() => this.is_loading=false)
            }else{
               this.is_loading = false;
            }
        })
		},
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
}.select-tip {
    margin-bottom: 20px;
}
</style>
