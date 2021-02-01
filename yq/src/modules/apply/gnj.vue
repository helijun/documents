<template>
	<div class="table">
		<h2>核酸检测结果批量查询</h2>
		<!-- 开始批量导入弹出框 -->
			<el-form ref="importForm" :model="form" label-width="0">
				<el-form-item label="">
					<el-upload
						ref="upload"
						v-model="form.filename"
						:data="uploadData"
						class="upload-demo"
						name="excelfile"
						:file-list="batchAddFileList"
						:on-change="handleChange"
						:before-upload="beforeUpload"
						:before-remove="beforeRemove"
						:on-remove="onRemove"
						:on-success="uploadSuccess"
						:on-error="uploadError"
						:limit="1"
						:auto-upload="false"
						action="spweb/system/commn/import"
						multiple
					>
					<div style="text-align:left;" v-show="isOffUpload">选择文件上传</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<p class="ipt-text" style="margin-bottom:1cm;color:red;">*特别提示：请严格按照模板来填写数据，特别是时间格式，请认真检测。上传的数据文件只支持Excel2003格式，若数据较多，请拆分成多个文件，单个文件大小不能超过10M。记录数量不能超过50000条记录</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="downLoadExcelTemplate">下载模板</el-button>
				<el-button type="primary" class="admin-btn" @click="saveBatchAdd('importForm')">查询</el-button>
			</span>
		<!-- 结束批量导入弹出框 -->
	</div>
</template>
<script> 
import axios from "@/services/axios";
import api from "@/services/api";
import moment from 'moment'
export default {
	 name: "tb_check_result1",//页面名称
	 data() {
		 return {
			 usertype: localStorage.getItem('usertype') || '',
			 tableData: [],//列表数据
			 checkOrgNumber:'',
			 batchAddFileList: [],//批量导入所选文件列表
			 cur_page: 1,//列表数据之当前页数
			 cur_size: 10,//列表数据之每页条数
			 total: 0,//列表数据之总条数
			 select_word: "",//查询关键字
			 is_loading: false,//加载数据框显示标识
			 addVisible: false,//增加框显示标识 
			 editVisible: false,//修改框显示标识 
			 delVisible:false,//删除框显示标识 
			 importVisible: true,//批量导入显示标识
			 isOffUpload: true,//批量导入上传完成与否标识
			 uploadData:{model:'tb_idcard_temp',fields:'name,idcard,tel'},//批量导入带的参数
			 addForm: {},//增加表单
			 editForm: {},//修改表单
			 town: '',
			 orgArea: '',
			 townData: [],
			 countryData: [],
			 ids: "",// 待删除的后台编号
			 idx: -1,// 待删除的界面列表索
			 checkOrgData:[],
			 //表单字段
			 form: {
				 checkOrgNumber: "",
				 createTime: "",
				 idcard: "",
				 checkTime: "",
				 result: ""
			 },
			 //表单验证规则，需绑定到对应表单中
			 rules: {
				 checkOrgNumber: [{ required: true, message: "请填写申请机构" }],
				 createTime: [{ required: true, message: "请填写创建时间" }],
				 idcard: [{ required: true, message: "请填写身份证号" }],
				 checkTime: [{ required: true, message: "请填写检查时间" }],
				 result: [{ required: true, message: "请填写结果" }]
			 },
			 //时间控件 
			//  recordDate: [
			// 	 moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
			// 	 moment(new Date()).format("YYYY-MM-DD")
			//  ],
			 recordDate: [
				'', ''
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
		computed: {
			currentOrgArea(){
				let userinfo = localStorage.getItem('userinfo');
				userinfo = JSON.parse(userinfo);
				return userinfo ? userinfo.orgArea : '';
			},
		},
	 mounted() {
		let orgArea =  this.currentOrgArea || '';
		if (this.usertype == 8) {
			orgArea = this.orgArea;
		}
		this.uploadData.orgArea = orgArea;
	 },
	 created() {
		 this.getData();
		 if (this.usertype == 8) {
			 this.getcountryData();
		 } else {
			 this.getcountryTown();
		 }
		 this.getcheckOrgData();
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
				 _data.model = 'tb_check_result1';
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
			 this.addForm.checkOrgNumber = '';
			 this.addForm.createTime = '';
			 this.addForm.idcard = '';
			 this.addForm.checkTime = '';
			 this.addForm.result = '';
			 this.addVisible = true;
		 },
		 //弹出修改界面方法
		 handleEdit(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);
			 this.editVisible = true;
		 },
		 //弹出删除界面框方法
		 handleDelete(index, row) {
			 this.idx = index;
			 this.ids = row.idcard;
			 this.delVisible = true;
		 },
		 //弹出批量导入界面框方法
		 batchAddDevice() {
			 this.batchAddFileList = [];
			 this.isOffUpload = true;
			 this.importVisible = true;
		 },
		 beforeUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 10;
			if (!isLt2M) {
				this.$message.error('上传文件大小不能超过 10MB!');
			}
			return isLt2M;
		 },
		 //查询列表数据方法
		 getData() {
			this.is_loading = true;
			let orgArea =  this.currentOrgArea || '';
			if (this.usertype == 8) {
				orgArea = this.orgArea;
			}
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 startTime: this.recordDate[0] ? moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
					 endTime: this.recordDate[1] ? moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss") : '',
					 checkOrgNumber: this.checkOrgNumber,
					 town: this.usertype == '11' ? this.town: '',
					 orgArea: orgArea,
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
			 axios.post({ url: api.commn.action, data: this.handleData('deleteById',{ idcard: this.ids }) }).then(res => {
				 if (res.code == 0) {
					 this.delVisible = false;
					 this.tableData.splice(this.idx, 1);
					 this.$message.success("删除成功");
				 } else {
					 this.$message.error(res.message);
				 }
			 });
		 },
		 // 批量批量导入方法
		 saveBatchAdd(formName) {
			 if(!this.form.filename) {
				this.$message.error("请选择上传查询文件");
				 return;
			 }
			 if (this.$refs[formName]) {
				 this.$refs[formName].validate(valid => {
					 if (valid) {
						 this.$refs.upload.submit();
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
		 //批量导入之移除文件前处理方法
		 beforeRemove(file, fileList) {
			 return this.$confirm(`确定移除 ${file.name}？`);
		 },
		 //批量导入之移除文件后处理方法
		 onRemove(file, fileList) {
			 this.isOffUpload = true;
		 },
		 //批量导入成功方法
		 uploadSuccess(response, file, fileList) {
			 this.batchAddFileList = [];
			 if (response.code == 0) {
				this.importVisible = false;
				let url = process.env.BASE_URL+process.env.API_PREFIX;
				this.$refs["importForm"].resetFields();
				this.$alert(`由于批量导入查询操作可能耗时过长，请在点击完成大约3~10分钟后,下载查询结果文件`, '提示', {
					confirmButtonText: '下载查询结果',
					dangerouslyUseHTMLString: true
				}).then(action => {
					this.form = Object.assign({}, this.$data.form, this.$options.data().form);
					// window.open(url + response.data, "_blank");
					this.$root.$children[0].exportcheck(response.extended).then(() => this.is_loading=false)
				});
				this.$message.success("导入成功");
				this.getData();
			 } else {
				this.$message.error(response.message);
			 }
		 },
		 //批量导入失败方法
		 uploadError(response, file, fileList) {
			 this.batchAddFileList = [];
			 this.$message.error(response.message);
		 },
		 // 批量导入之下载批量导入模板方法
		 downLoadExcelTemplate() {
			 window.location.href =  window.location.origin + "/gongandata.xls";
		 },
		select_stauts(val){
			 this.$forceUpdate();
         },
		getcheckOrgData() {
			let orgArea =  this.currentOrgArea || '';
			if (this.usertype == 8) {
				orgArea = this.orgArea;
			}
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_org',action:'select',orgType:'2',orgArea: orgArea}
			 }).then(res => {
				 if (res.code == 0) {
					 this.checkOrgData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
		},
		handleExport(){
			let orgArea =  this.currentOrgArea || '';
			if (this.usertype == 8) {
				orgArea = this.orgArea;
			}
			let params = {
				title: '',
				excelType: '1',
				udpclass:'ExcelService',
				town: this.usertype == '11' ? this.town: '',
				orgArea: orgArea,
			};
			
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
		getcountryTown() {
			let orgArea =  this.currentOrgArea || '';
			if (this.usertype == 8) {
				orgArea = this.orgArea;
			}
			axios.post({url: api.commn.action,
				 	data: {model:'citybyparent',action:'select',code:orgArea}
			 	}).then(res => {
					if (res.code == 0) {
						this.townData = res.data;
					} else {
						this.$message.error(res.message);
					}
         	});
		},
	 },
};
</script>
<style lang="scss" scoped>
@import "static/css/base.scss";
@import "static/css/base-company.scss";
.upload-demo {
	/deep/ .el-upload {
    	width: 221px;
	}
	/deep/ .el-upload-list {
    	width: 100%;
	}
}.select-tip {
    margin-bottom: 20px;
}
.table {
	background-color: white;
    padding: 20px;
    text-align: center;
	margin: 0 auto;
	h2 {
		text-align: center;
		font-size: 30px;
		margin: 20px auto;
	}
}
/deep/.el-form {
	width: 200px;
	margin: 0 auto;
	.el-form-item__label {
		text-align: left;
	}
}
</style>
