<template>
	<div class="table">
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">检测时间</div>
						<el-date-picker class="mgr--12" v-model="checkDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm" :clearable="true" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>

						<div  class="select-tip">采集网点</div>
                        <el-select v-model="checkOrgNumber" placeholder="采集网点" >
							<el-option key="" label="全部" value=""></el-option>
                        	<el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
                        </el-select>

						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字"  style="width:200px;"></el-input>
						<el-button type="primary" @click="search">搜索</el-button>
						<el-button type="success"  @click="importVisible = true">档案上传</el-button>
						<el-button type="warning"  @click="addVisible = true">批量设定</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="applyNumber" label="申请编号"/>
				<el-table-column prop="checkOrgName" label="预约采集网点"/>
				<el-table-column prop="applyName" label="姓名"/>
				<el-table-column prop="sex" label="性别"/>
				<el-table-column prop="address" label="地址"/>
				<el-table-column prop="tel" label="电话"/>
				<el-table-column prop="idcard" label="身份证号"/>
				<el-table-column prop="checkTime" label="检测时间 "/>
				<el-table-column prop="stateName" label="采集状态"/>
				<div slot="empty" class="default-empty"><span>暂时没有内容哦！</span></div>
			</el-table>
			<div v-show="!is_loading" v-if="total>cur_size" class="pagination">
				<el-pagination  @current-change="handleCurrentChange"  layout="prev, pager, next, jumper, ->, total" :total="total" :current-page="cur_page"/>
			</div>
		</div>

		<el-dialog title="档案上传" :visible.sync="importVisible" width="400px">
			<el-form ref="importForm" :model="form" label-width="100px">
				<el-form-item label="选择文件">
					<el-upload
						ref="upload"
						v-model="form.filename"
						:data="uploadData"
						class="upload-demo"
						name="excelfile"
						:on-change="handleChange"
						:before-upload="beforeUpload"
						:on-success="uploadSuccess"
						:on-error="uploadError"
						:limit="1"
						:auto-upload="false"
						action="spweb/system/commn/import"
						multiple
					>
					<div style="text-align:left;">点击上传</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="采集网点">
					<el-select v-model="uploadData.checkOrgNumber" placeholder="请选择采集网点" >
						<el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采集时间">
					<el-date-picker
						v-model="uploadData.checkTime"
						type="date"
						format="yyyy 年 MM 月 dd 日"
      					value-format="yyyy-MM-dd"
						placeholder="请选择日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<p class="ipt-text" style="margin-left:2em">*特别提示：请严格按照模板来填写数据，特别是时间格式，请认真检测。上传的数据文件只支持Excel2003格式，若数据较多，请拆分成多个文件，单个文件不能超过10M。</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="importVisible = false">取 消</el-button>
				<el-button @click="downLoadExcelTemplate">下载模板</el-button>
				<el-button type="primary" class="admin-btn" @click="saveBatchAdd('importForm')">确 认</el-button>
			</span>
		</el-dialog>

		<el-dialog title="批量设定" :visible.sync="addVisible" width="510px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="采集网点" prop="checkOrgNumber">
					<el-select v-model="addForm.checkOrgNumber" placeholder="采集网点" style="width: 100%" >
						<el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="采集时间" >
					<el-date-picker class="mgr--12" v-model="recordDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm" :clearable="true" :picker-options="pickerOptions"  @change="search"/>
				</el-form-item>
				<el-form-item label="检测单位" prop="checkOrgName">
					<el-select v-model="addForm.checkOrgName " placeholder="检测单位" style="width: 100%" >
						<el-option v-for="(item, i) in checkOrgData2" :key="i" :label="item.orgName" :value="item.orgName"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="检测结果" prop="checkResult">
					<el-select v-model="addForm.checkResult" style="width: 100%" placeholder="采集网点" >
						<el-option key="1" label="阴性" value="阴性"></el-option>
						<el-option key="2" label="阳性" value="阳性"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="检测时间" prop="checkTime">
					<el-date-picker
					 	style="width: 100%"
						v-model="addForm.checkTime"
						type="date"
						format="yyyy 年 MM 月 dd 日"
      					value-format="yyyy-MM-dd"
						placeholder="请选择日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveAdd('addForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script> 
import axios from "@/services/axios";
import api from "@/services/api";
import moment from 'moment'
export default {
	 name: "tb_check_apply_record",//记录
	 data() {
		 return {
			tableData: [],//列表数据
			countryData:[],
     		townData:[],
       		orgData:[],
			state:'',
			payType:'',
			usertype:'',
			cur_page: 1,//列表数据之当前页数
			cur_size: 10,//列表数据之每页条数
			total: 0,//列表数据之总条数
			isAllOrg:false,
			select_word: "",//查询关键字
			is_loading: false,//加载数据框显示标识
			addVisible: false,//增加框显示标识 
			importVisible: false,
			addForm: {},//增加表单
			ids: "",// 待删除的后台编号
			idx: -1,// 待删除的界面列表索
			checkOrgData:[],
			checkOrgData2:[],
			uploadData: {
				model: 'tb_check_apply',
				fields: 'applyName,sex,idcard,address,unitName,tel,remark',
				checkOrgNumber: '',
				checkTime: '',
			},
			orgArea:'',
			town:'',
			checkOrgNumber:'', 
			//表单字段
			form: {
				checkOrgNumber: "",
				checkResult: "阴性",
				checkOrgName: "",
				checkTime: "",
			},
			//表单验证规则，需绑定到对应表单中
			rules: {
				checkOrgNumber: [{ required: true, message: "请填写" }],
				checkResult: [{ required: true, message: "请填写" }],
				checkOrgName: [{ required: true, message: "请填写" }],
				checkTime: [{ required: true, message: "请填写" }],
			},
			//时间控件 
			recordDate: [
				moment(new Date().getTime() - 3600 * 1000 * 24 * 2).format("YYYY-MM-DD"),
				moment(new Date().getTime() + 3600 * 1000 * 24 ).format("YYYY-MM-DD"),
			],
			checkDate: [
				moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
				moment(new Date().getTime() + 3600 * 1000 * 24 * 2).format("YYYY-MM-DD"),
			],
			//时间控件
			pickerOptions: {
				shortcuts: [{
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
				}]
			}
		 };
	 },
	computed: {
		currentTown(){
			let userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			return userinfo ? userinfo.town : '';
		}
	},
	created() {
		let userid = localStorage.getItem('orgnumber');
		 this.usertype = localStorage.getItem('usertype');
		
		if(null != userid && 'null' != userid)
		{
			this.checkOrgNumber = userid;
		}

		this.getData();
		this.getcheckOrgData();
		this.getcheckOrgData2();
	
	 },
	 methods: {
		//搜索查询方法
		search() {
			this.cur_page = 1;
			this.getData();
		},
		getcheckOrgData() {
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
		},
		getcheckOrgData2() {
			axios.post({url: api.commn.action,
				 data: this.handleData2('select',{
					 orgType:'2',
					//  town:this.town || this.currentTown,
					 })
			 }).then(res => {
				 if (res.code == 0) {
					 this.checkOrgData2 = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
         });
		},
		//表单提交前处理数据方法
		handleData(action,_data) {
			if(null != _data) {
				_data.model = 'tb_check_apply';
				_data.action = action;
			}
			return _data;
		},
	    handleData2(action,_data) {
			if(null != _data)
			{
				_data.model = 'tb_check_org';
				_data.action = action;
			}
			return _data;
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
		 //查询列表数据方法
		 getData() {
			this.is_loading = true;
			var parm = {
					start: (this.cur_page - 1) * this.cur_size,
					limit: this.cur_size,
					townareacode: this.town || this.currentTown,
					checkOrgNumber:this.checkOrgNumber,
					startCheckTime: this.checkDate ? moment(this.checkDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
					endCheckTime: this.checkDate ? moment(this.checkDate[1]).format("YYYY-MM-DD HH:mm:ss") : '', 
					keyWord: this.select_word,
					type: 2
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
					this.addForm.startCheckTime = this.recordDate ? moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss") : '';
					this.addForm.endCheckTime = this.recordDate ? moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss") : '';
					
					this.addForm.town = this.town || this.currentTown;
					this.addForm.operateType = 1;
					 if (valid) {axios.post({ url: 'system/commn/batchSetResult', data: this.addForm }).then(res => {
						 if (res.code == 0) {
							 this.addVisible = false;
							 this.$message.success("批量设定成功");
							 this.addForm = Object.assign({}, this.$data.addForm, this.$options.data().addForm);
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
		 //批量导入之修改文件方法
		 handleChange(file) {
			this.form.filename = file.name;
			this.isOffUpload = false;
		 },
		 beforeUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 10;
			if (!isLt2M) {
				this.$message.error('上传文件大小不能超过 10MB!');
			}
			return isLt2M;
		 },
		 //批量导入成功方法
		 uploadSuccess(response, file, fileList) {
			 if (response.code == 0) {
				 this.importVisible = false;
				 this.$refs["importForm"].resetFields();
				 this.$message.success("导入成功");
				 this.getData();
			 } else {
				 this.$message.error(response.message);
			 }
		 },
		 //批量导入失败方法
		 uploadError(response, file, fileList) {
			 this.$message.error(response.message);
		 },
		 // 批量导入之下载批量导入模板方法
		 downLoadExcelTemplate() {
			window.location.href =  window.location.origin + "/record.xls";
		 },
		 // 批量批量导入方法
		 saveBatchAdd(formName) {
			 if (this.$refs[formName]) {
				 this.$refs[formName].validate(valid => {
					 if (valid) {
						 this.$refs.upload.submit();
						 this.form = Object.assign({}, this.$data.form, this.$options.data().form);
						 this.uploadData = {
							model: 'tb_check_apply',
							fields: 'applyName,sex,idcard,address,unitName,tel,remark',
							checkOrgNumber: '',
							checkTime: '',
						 }
					 } else {
						 this.$message.error("验证未通过");
						 return;
					 }
				 });
			 }
		 },
		handleExport(){
		
		}
	 },
};
</script>
<style lang="scss" scoped>
@import "static/css/base.scss";
@import "static/css/base-company.scss";
.select-tip {
    margin-bottom: 20px;
}
.upload-demo {
	/deep/ .el-upload {
    	width: 221px;
	}
	/deep/ .el-upload-list {
    	width: 100%;
	}
}
</style>
