<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<div class="select-tip">所属县区</div>
								<el-select v-model="orgArea" placeholder="所属县区" :change="select_stauts"  @change="select_stauts" >
					<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
				</el-select>

						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字" class="handle-input" ></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
					<el-button type="primary" class="admin-btn" @click="handleAdd">增加检测机构</el-button>
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="checkOrgNumber" label="机构编号"/>
				<el-table-column prop="orgName" label="机构名称"/>
				<el-table-column prop="orgAreaName" label="所属县区"/>
				<el-table-column prop="town" label="所属镇街"/>
				<el-table-column prop="principal" label="负责人"/>
				<el-table-column prop="tel" label="联系电话"/>
				<el-table-column prop="adddress" label="地址"/>
				<el-table-column prop="remark" label="备注"/>
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
		<el-dialog title="增加检测机构管理" :visible.sync="addVisible" width="400px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="机构编号" prop="checkOrgNumber" readonly="true">
					<el-input v-model="addForm.checkOrgNumber" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="机构名称" prop="orgName">
					<el-input v-model="addForm.orgName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="所属县区" prop="orgArea" @change="select_stauts" :change="select_stauts" class="handle-input">
				<el-select v-model="addForm.orgArea" placeholder="所属县区" :change="select_stauts"  @change="select_stauts" >
					<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="所属镇街" prop="town">
					<el-input v-model="addForm.town" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="principal">
					<el-input v-model="addForm.principal" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="addForm.tel" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="adddress">
					<el-input v-model="addForm.adddress" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="addForm.remark" class="handle-input"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveAdd('addForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束增加弹出框 -->
		<!-- 开始修改弹出框 -->
		<el-dialog title="修改检测机构管理" :visible.sync="editVisible" width="400px">
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="117px">
				<el-form-item label="机构编号" prop="checkOrgNumber">
					<el-input v-model="editForm.checkOrgNumber" class="handle-input" readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="机构名称" prop="orgName">
					<el-input v-model="editForm.orgName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="所属县区" prop="orgArea" @change="select_stauts" :change="select_stauts" class="handle-input">
				<el-select v-model="editForm.orgArea" placeholder="所属县区" :change="select_stauts"  @change="select_stauts">
					<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="所属镇街" prop="town">
					<el-input v-model="editForm.town" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="principal">
					<el-input v-model="editForm.principal" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="tel">
					<el-input v-model="editForm.tel" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="adddress">
					<el-input v-model="editForm.adddress" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="editForm.remark" class="handle-input"></el-input>
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
	 name: "tb_check_org",//页面名称
	 data() {
		 return {
			 tableData: [],//列表数据
			 countryData:[],
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
			 ids: "",// 待删除的后台编号
			 idx: -1,// 待删除的界面列表索
			 //表单字段
			 form: {
				 checkOrgNumber: "",
				 orgName: "",
				 orgType: "",
				 principal: "",
				 tel: "",
				 adddress: "",
				 username: "",
				 password: "",
				 createTime: "",
				 createBy: "",
				 remark: ""
			 },
			 //表单验证规则，需绑定到对应表单中
			 rules: {
				 checkOrgNumber: [{ required: true, message: "请填写机构编号" }],
				 orgName: [{ required: true, message: "请填写机构名称" }],
				 orgType: [{ required: true, message: "请填写机构类型" }],
				 principal: [{ required: true, message: "请填写负责人" }],
				 tel: [{ required: true, message: "请填写联系电话" }],
				 adddress: [{ required: true, message: "请填写地址" }],
				 orgArea: [{ required: true, message: "请选择所属县区" }],
				 town: [{ required: true, message: "请填写镇街" }]
			 },
		 };
	 },
	 mounted() {
	 },
	 created() {
		 this.getData();
		 this.getcountryData();
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
				 _data.model = 'tb_check_org';
				 _data.action = action;
			 }
			 return _data;
		 },
		 //获得编号方法
		 getNumber(){
			 axios.post({ url: api.commn.getNumber, data:{numberRuleCode:'OrgNumber'} }).then(res => {
				 if (res.code == 0) {
					this.addForm.checkOrgNumber = res.data;
					 this.$forceUpdate();
				 } else {
					 return null;
				 }
			 });
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
		 //分页导航方法
		 handleCurrentChange(val) {
			 this.cur_page = val;
			 this.getData();
		 },
		 //弹出增加界面方法
		 handleAdd() {
			 this.getNumber();
			 this.addForm.orgName = '';
			 this.addForm.orgType = '2';
			 this.addForm.principal = '';
			 this.addForm.tel = '';
			 this.addForm.adddress = '';
			 this.addForm.username = '';
			 this.addForm.password = '';
			 this.addForm.createTime = '';
			 this.addForm.createBy = '';
			 this.addForm.remark = '';
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
			 this.ids = row.checkOrgNumber;
			 this.delVisible = true;
		 },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
					 limit: this.cur_size,
					 orgType:'2',
					 orgArea:this.orgArea,
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
							 this.doSaveAddPayOrgUser(1);
							 this.updateorgdata();
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
							 this.doSaveAddPayOrgUser(2);
							 this.updateorgdata();
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
			 axios.post({ url: api.commn.action, data: this.handleData('deleteById',{ checkOrgNumber: this.ids }) }).then(res => {
				 if (res.code == 0) {
					 this.delVisible = false;
					 this.tableData.splice(this.idx, 1);
					 this.$message.success("删除成功");
					 this.updateorgdata();
				 } else {
					 this.$message.error(res.message);
				 }
			 });
         },
        select_stauts(val){
			 this.$forceUpdate();
         },
         
        //增加和删除用户
		doSaveAddPayOrgUser(type) {
	   
			if(type == 1)
			{
				this.addForm.userid = this.addForm.checkOrgNumber;
				this.addForm.name = this.addForm.principal;
				this.addForm.username = 's'+this.addForm.tel;
				this.addForm.password = '123456';
				this.addForm.usertype = '9';
				this.addForm.remark = this.addForm.checkOrgNumber;
				
			}else
			{
				this.editForm.userid = this.editForm.checkOrgNumber;
				this.editForm.name = this.editForm.principal;
				this.editForm.username = 's'+this.editForm.tel;
				this.editForm.password = '123456';
				this.editForm.usertype = '9';
				this.editForm.remark = this.editForm.checkOrgNumber;
			}

			axios.post({
				url: type == 1 ? api.user.adduser : api.user.updateuser,
				data: type == 1 ? this.addForm : this.editForm
			}).then(res => {
	
				if(res.code == 0){

				}else{
					this.$message.error(res.message);
				}
			})
		},
		//删除系统用户
		doDeletddPayOrgUser(userid) {
	   
			axios.post({
				url: api.commn.action,
				data: {action:'delete',model:'tb_system_user',remark:userid}
			}).then(res => {
	
				if(res.code == 0){
					this.doDeletddPayOrg(userid);
				}else{
					this.$message.error(res.message);
				}
			})
		},
		updateorgdata()
		{
			var parm = {};
			parm.udpclass = 'OrgSercie';
			parm.operateType = '2';
			axios.post({ 
				url: api.commn.udpAction, 
				data: parm
				}).then(res => {
					if (res.code == 0) {
					} else {
						this.$message.error(res.message);
					}
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
