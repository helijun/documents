<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">检测时间</div>
						<el-date-picker class="mgr--12" v-model="recordDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" :clearable="false" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>
						<div class="select-tip">检测机构</div>
                        <el-select v-model="checkOrgNumber" placeholder="检测机构" :change="select_stauts"  @change="select_stauts" class="handle-input">
                                <el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.orgName"></el-option>
                        </el-select>
						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字" class="handle-input" ></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
					<el-button type="primary" class="admin-btn" @click="batchAddDevice">检查数据导入</el-button>
					<el-button type="primary" class="admin-btn" @click="handleExport">检查数据导出</el-button>
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">

				<el-table-column prop="name" label="姓名"/>
				<el-table-column prop="idcard" label="身份证号"/>
				<el-table-column prop="checkOrgNumber" label="检测机构"/>
				<el-table-column prop="createTime" label="创建时间"/>
				<el-table-column prop="checkTime" label="检查时间"/>
				<el-table-column prop="result" label="结果"/>
				<!--<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
				</el-table-column>-->
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

		<!-- 开始删除提示框 -->
		<el-dialog title="提示" :visible.sync="delVisible" width="400px" center>
			<div class="del-dialog-cnt">是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束删除提示框 -->
		<!-- 开始批量导入弹出框 -->
		<el-dialog title="批量导入" :visible.sync="importVisible" width="400px">
			<el-form ref="importForm" :model="form" label-width="100px">
				<el-form-item label="选择文件">
					<el-upload
					 ref="upload"
					 v-model="form.filename"
					 :data="uploadData"
					 class="upload-demo"
					 accept="application/msexcel"
					 name="excelfile"
					 :file-list="batchAddFileList"
					 :on-change="handleChange"
					 :before-remove="beforeRemove"
					 :on-remove="onRemove"
					 :on-success="uploadSuccess"
					 :on-error="uploadError"
					 :limit="1"
					 :auto-upload="false"
					 action="spweb/system/commn/import"
					 multiple
					>
					<div style="text-align:left;" v-show="isOffUpload">点击上传</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<p class="ipt-text" style="margin-left:2em">*系统已为您下载导入模板，请按要求填写后上传</p>
			<span slot="footer" class="dialog-footer">
				<el-button @click="importVisible = false">取 消</el-button>
				<el-button @click="downLoadExcelTemplate">下载模板</el-button>
				<el-button type="primary" class="admin-btn" @click="saveBatchAdd('importForm')">确 认</el-button>
			</span>
		</el-dialog>
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
			 importVisible: false,//批量导入显示标识
			 isOffUpload: true,//批量导入上传完成与否标识
			 uploadData:{model:'tb_check_result1',fields:'name,idcard,result,checkTime,checkOrgNumber'},//批量导入带的参数
			 addForm: {},//增加表单
			 editForm: {},//修改表单
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
	 mounted() {
	 },
	 created() {
		 this.getData();
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
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 startTime: this.recordDate[0] ? moment(this.recordDate[0]).format("YYYY-MM-DD HH:mm:ss") : '',
					 endTime: this.recordDate[1] ? moment(this.recordDate[1]).format("YYYY-MM-DD HH:mm:ss") : '',
					 checkOrgNumber:this.checkOrgNumber,
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
				 this.$refs["importForm"].resetFields();
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
			 window.location.href =  window.location.origin + "/tb_check_result1.xls";
		 },
		select_stauts(val){
			 this.$forceUpdate();
         },
		getcheckOrgData() {
			axios.post({url: api.commn.action,
				 data: {model:'tb_check_org',action:'select',orgType:'2'}
			 }).then(res => {
				 if (res.code == 0) {
					 this.checkOrgData = res.data;
				 } else {
					 this.$message.error(res.message);
				 }
				 });
		},
		handleExport(){

        let params = {
            title: '',
			excelType: '1',
			udpclass:'ExcelService',
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
}
</style>
