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
						<div class="select-tip">用户类型</div>
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
				<el-table-column prop="applyNumber" label="申请编号"/>
				<el-table-column prop="orgName" label="申请机构"/>
				<el-table-column prop="applyTime" label="申请时间"/>
				<el-table-column prop="orgFianceContact" label="申请人员"/>
				<el-table-column prop="projectAmount" label="预算金额"/>
				<el-table-column prop="projectName" label="申请内容"/>
				<el-table-column label="附件">
					<template slot-scope="scope"  fixed="right">
						<span v-if="scope.row.filePath != ''" @click="downloadfile(scope.$index, scope.row)" style="text-decoration:underline;cursor:hand；color:red">附件下载</span>               
					</template>
                </el-table-column>
				<el-table-column prop="statename" label="状态"/>
				<el-table-column prop="purchaseRecordNumber" label="采购备案编号"/>
				<el-table-column label="操作" width="180" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" type="text"  v-if="scope.row.state == -1"  @click="handleEdit(scope.$index, scope.row)">填写备案</el-button>
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
             state:1,
             meetingTime:'',
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
				 projectAmount: [{ required: true, message: "请填写制表人员" }],
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
	computed: {
        uploadAction() {
            return process.env.BASE_URL+process.env.API_PREFIX + api.system.uploadFile
        }
    },
	 created() {

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
		 //弹出增加界面方法
		 handleCheck(index, row) {
			 this.idx = index;
			 this.editForm = Object.assign({}, row);
			 this.addVisible = true;
		 },
		 //弹出修改界面方法
		 handleEdit(index, row) {
            this.$router.push({
                        path: "/sp/purchaserecordcheck",
                        query: {         //参数携带方式
                            applyNumber:row.applyNumber
                        }
                    });
             
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
        downloadfile2(){
			if(this.editForm.filePath != '')
			{
				window.open(this.editForm.filePath, "_blank");
			}
		 },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 //applyOrgNumber:this.orgnumber,
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
