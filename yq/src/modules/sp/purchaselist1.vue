<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">申请时间</div>
						<el-date-picker class="mgr--12" v-model="recordDate"  type="daterange" align="left"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" :clearable="false" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"  @change="search"/>
						<div class="select-tip">状态</div>
                        <el-select v-model="state" placeholder="状态" class="handle-input">
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="0" label="未审核" value="0"></el-option>
                            <el-option key="1" label="已审核" value="1"></el-option>
                            <el-option key="2" label="已驳回" value="2"></el-option>
                            <el-option key="3" label="已备案" value="3"></el-option>
                        </el-select>
						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字" class="handle-input" ></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
					<el-button type="primary" class="admin-btn" @click="handleAdd">采购申请</el-button>
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="applyNumber" label="申请编号"/>
				<el-table-column prop="orgName" label="申请机构"/>
				<el-table-column prop="projectName" label="预算项目"/>
				<el-table-column prop="createTime" label="制表时间"/>
				<el-table-column prop="applyBy" label="申请人员"/>
				<el-table-column prop="projectAmount" label="预算金额"/>
			
				<el-table-column label="附件">
					<template slot-scope="scope"  fixed="right">
						<span v-if="scope.row.filePath != ''" @click="downloadfile(scope.$index, scope.row)" style="text-decoration:underline;cursor:hand；color:red">附件下载</span>               
					</template>
                </el-table-column>
				<el-table-column prop="statename" label="状态"/>
				<el-table-column prop="purchaseRecordNumber" label="采购备案编号"/>
				<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		<!-- 开始增加弹出框 -->
		<el-dialog title="采购申请" :visible.sync="addVisible" width="400px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="申请编号" prop="applyNumber">
					<el-input v-model="addForm.applyNumber" readonly="true" class="handle-input"></el-input>
				</el-form-item>			
				<el-form-item label="预算项目" prop="projectName">
					<el-input v-model="addForm.projectName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请机构" prop="applyOrgNumber">
					<el-input v-model="addForm.orgName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请人员" prop="applyBy">
					<el-input v-model="addForm.applyBy" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请时间" prop="applyTime">
					<el-date-picker v-model="addForm.applyTime"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" class="handle-input" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="预算金额" prop="projectAmount">
					<el-input v-model="addForm.projectAmount" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="附件" prop="filePath">
					<el-upload
                        name="attachfile"
                        :action="uploadAction"
                        :on-success="handleUploadSuccess"
						list-type="picture"
                        :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
				</el-form-item>
				<el-form-item label="申请内容" prop="applyContext">
					<el-input v-model="addForm.applyContext" type="textarea"  class="handle-input"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveAdd('addForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束增加弹出框 -->
		<!-- 开始修改弹出框 -->
		<el-dialog title="修改采购申请" :visible.sync="editVisible" width="400px">
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="117px">
				<el-form-item label="申请编号" prop="applyNumber">
					<el-input v-model="editForm.applyNumber"  readonly="true" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="预算项目" prop="projectName">
					<el-input v-model="editForm.projectName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请机构" prop="applyOrgNumber">
					<el-input v-model="editForm.orgName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请人员" prop="applyBy">
					<el-input v-model="editForm.applyBy" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="申请时间" prop="applyTime">
					<el-date-picker v-model="editForm.applyTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="handle-input" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="预算金额" prop="projectAmount">
					<el-input v-model="editForm.projectAmount" class="handle-input"></el-input>
				</el-form-item>
				
				<el-form-item label="附件" prop="filePath">
					<el-upload
                        name="attachfile"
                        :action="uploadAction"
                        :on-success="handleUploadSuccess2"
						:file-list="file_list"
						list-type="picture"
                        :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
				</el-form-item>
				<el-form-item label="申请内容" prop="applyContext">
					<el-input v-model="editForm.applyContext" type="textarea" class="handle-input"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveEdit('editForm')">确 定</el-button>
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
	 name: "tb_purchase",//页面名称
	 data() {
		 return {
			 tableData: [],//列表数据
			 file_list:[],
			 batchAddFileList: [],//批量导入所选文件列表
			 cur_page: 1,//列表数据之当前页数
			 cur_size: 10,//列表数据之每页条数
			 total: 0,//列表数据之总条数
			 select_word: "",//查询关键字
			 is_loading: false,//加载数据框显示标识
			 addVisible: false,//增加框显示标识 
			 editVisible: false,//修改框显示标识 
			 delVisible:false,//删除框显示标识 
			 addForm: {},//增加表单
			 editForm: {},//修改表单
			 state:'0',
			 ids: "",// 待删除的后台编号
			 idx: -1,// 待删除的界面列表索
			 orgnumber:'',
			 orgName:'',
			 //表单字段
			 form: {
				 applyNumber: "",
				 applyOrgNumber: "",
				 applyBy: "",
				 filePath: "",
				 applyContext: "",
				 createBy: "",
				 createTime: "",
				 purchaseRecordNumber: "",
				 state: ""
			 },
			 //表单验证规则，需绑定到对应表单中
			 rules: {
				 applyNumber: [{ required: true, message: "请填写申请编号" }],
				 applyOrgNumber: [{ required: true, message: "请填写申请机构" }],
				 applyBy: [{ required: true, message: "请填写申请人员" }],
				 filePath: [{ required: true, message: "请填写附件" }],
				 applyContext: [{ required: true, message: "请填写申请内容" }],
				 projectName: [{ required: true, message: "请填写申请内容" }],
				 projectAmount: [{ required: true, message: "请填写预算金额" }],
				 applyTime: [{ required: true, message: "请填写申请时间" }],
				 
			 },
			 //时间控件 
			 recordDate: [
				 moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format("YYYY-MM-DD"),
				 moment(new Date().getTime() + 3600 * 1000 * 24 * 1).format("YYYY-MM-DD"),
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
	computed: {
        uploadAction() {
            return process.env.BASE_URL+process.env.API_PREFIX + api.system.uploadFile
        }
    },
	 created() {

		 this.orgnumber = localStorage.getItem('orgnumber');
		 let username = localStorage.getItem('username');

		
		 this.addForm.applyBy = username;
		 this.addForm.applyOrgNumber = this.orgnumber;
		 this.getData();
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
				 _data.model = 'tb_purchase';
				 _data.action = action;
			 }
			 return _data;
		 },
		 //获得编号方法
		 getNumber(){
			 axios.post({ url: api.commn.getNumber, data:{numberRuleCode:'CommNumber'} }).then(res => {
				 if (res.code == 0) {
					this.addForm.applyNumber = res.data; 
					 this.$forceUpdate();
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
			 this.getNumber();
			 this.getOrgInfo();
			 //this.addForm.applyBy = '';
			 this.addForm.filePath = '';
			 this.addForm.applyContext = '';
			 this.addForm.projectAmount = '';
			 this.addVisible = true;
		 },
		 //弹出修改界面方法
		 handleEdit(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);

			if(null != this.editForm.filePath && '' != this.editForm.filePath)
			{
				this.file_list= [{name: '采购申请书', url: this.editForm.filePath}];
			}

			 this.editVisible = true;
		 },
		 //弹出删除界面框方法
		 handleDelete(index, row) {
			 this.idx = index;
			 this.ids = row.applyNumber;
			 this.delVisible = true;
		 },
		 downloadfile(index, row){
			if(row.filePath != '')
			{
				window.open(row.filePath, "_blank");
			}
		 },
		handleUploadSuccess(response, file, fileList) {
		console.log('导入成功 response', response)
		if(response.code == 0){
			this.addForm.filePath = response.data.fileurl;
		}
		},
		handleUploadSuccess2(response, file, fileList) {
		console.log('导入成功 response', response)
		if(response.code == 0){
			this.editForm.filePath = response.data.fileurl;
		}
        },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 applyOrgNumber:this.orgnumber,
					 state:this.state,
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
		 // 新增数据方法
		 saveAdd(formName) {
			 if (this.$refs[formName]) {
				 this.$refs[formName].validate(valid => {
					 if (valid) {axios.post({ url: api.commn.action, data: this.handleData('insert',this.addForm) }).then(res => {
						 if (res.code == 0) {
							 this.addVisible = false;
							 this.$message.success("增加成功");
							 this.sendWXMsg(this.addForm.applyNumber,-2,this.orgnumber);
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
		 getOrgInfo()
		 {
			var param={
                 action:"selectDetail",
				 model:"tb_first_org",
				 firstOrgNumber:this.orgnumber
             }

			 axios.post({url: api.commn.action,
				 data: param
			 }).then(res => {

				 if (res.code == 0) {
					this.addForm.orgName = res.data.orgName;
					this.editForm.orgName = res.data.orgName;
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
