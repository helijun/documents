<template>
	<div class="table">
		<!-- 开始列表 -->
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<!-- 开始查询条件 -->
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>

                        <div class="select-tip">用户类型</div>
                        <el-select v-model="usertype" placeholder="用户类型" class="handle-input">
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="1" label="系统管理" value="1"></el-option>
                            <el-option key="2" label="卫生院财务科" value="2"></el-option>
                            <el-option key="3" label="卫生院院长" value="3"></el-option>
                            <el-option key="4" label="卫生局财务科" value="4"></el-option>
                            <el-option key="5" label="卫生局办公室主任" value="5"></el-option>
                            <el-option key="6" label="卫生局副局长" value="6"></el-option>
                            <el-option key="7" label="卫生局长" value="7"></el-option>
                        </el-select>

						<div class="select-tip">关键字</div>
						<el-input v-model="select_word" placeholder="要查询关键字" class="handle-input" ></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
					<el-button type="primary" class="admin-btn" @click="handleAdd">增加用户账户</el-button>
				</el-row>
			</div>
			<!-- 开始查询条件 -->
			<!-- 开始数据列表 -->
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="name" label="用户名称"/>
				<el-table-column prop="userName" label="用户账号"/>
				<el-table-column prop="usertypeName" label="用户类型"/>
				<el-table-column prop="phoneNumber" label="联系电话"/>
				<el-table-column prop="createTime" label="创建时间"/>
				<el-table-column prop="createBy" label="创建人员"/>
				<el-table-column prop="orgName" label="所属机构"/>
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
		<el-dialog title="增加用户账户" :visible.sync="addVisible" width="400px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="addForm.name" class="handle-input"></el-input>
				</el-form-item>
               <el-form-item label="用户类型" prop="name">
                <el-select v-model="addForm.usertype" placeholder="用户类型" :change="changeUserType"  @change="changeUserType" class="handle-input">
                    <el-option key="1" label="系统管理" value="1"></el-option>
                    <el-option key="2" label="卫生院财务科" value="2"></el-option>
                    <el-option key="3" label="卫生院院长" value="3"></el-option>
                    <el-option key="4" label="卫生局财务科" value="4"></el-option>
                    <el-option key="5" label="卫生局办公室主任" value="5"></el-option>
                    <el-option key="6" label="卫生局副局长" value="6"></el-option>
                    <el-option key="7" label="卫生局长" value="7"></el-option>
                </el-select>	
               </el-form-item>

				<el-form-item label="用户账号" prop="userName">
					<el-input v-model="addForm.userName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" prop="_password">
					<el-input v-model="addForm._password" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phoneNumber">
					<el-input v-model="addForm.phoneNumber" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="所属机构" prop="orgNumber" v-if="wsyisible">
                    <el-select v-model="addForm.orgNumber" placeholder="卫生院" class="handle-input" :change="select_stauts" @change="select_stauts">
                        <el-option v-for="(item, i) in wsyData" :key="i" :label="item.orgname" :value="item.firstorgnumber"></el-option>
                    </el-select>	                  
				</el-form-item>

				<el-form-item label="签名图片" prop="signPic">
                    <el-upload
                        name="attachfile"
                        :action="uploadAction"
                        list-type="picture"
                        :on-success="handleUploadSuccess"
                        :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="saveAdd('addForm')">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 结束增加弹出框 -->
		<!-- 开始修改弹出框 -->
		<el-dialog title="修改用户账户" :visible.sync="editVisible" width="400px">
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="117px">
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="editForm.name" class="handle-input"></el-input>
				</el-form-item>
                <el-form-item label="用户类型" prop="name">
                <el-select v-model="editForm.usertype" placeholder="用户类型" :change="changeUserType"  @change="changeUserType"  class="handle-input">
                    <el-option key="1" label="系统管理" value="1"></el-option>
                    <el-option key="2" label="卫生院财务科" value="2"></el-option>
                    <el-option key="3" label="卫生院院长" value="3"></el-option>
                    <el-option key="4" label="卫生局财务科" value="4"></el-option>
                    <el-option key="5" label="卫生局办公室主任" value="5"></el-option>
                    <el-option key="6" label="卫生局副局长" value="6"></el-option>
                    <el-option key="7" label="卫生局长" value="7"></el-option>
                </el-select>	
                </el-form-item>
				<el-form-item label="用户账号" prop="userName">
					<el-input v-model="editForm.userName" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" prop="_password">
					<el-input v-model="editForm._password" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phoneNumber">
					<el-input v-model="editForm.phoneNumber" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="所属机构" prop="orgNumber" v-if="wsyisible">
                    <el-select v-model="editForm.orgNumber" placeholder="卫生院"  class="handle-input" :change="select_stauts" @change="select_stauts">
                        <el-option v-for="(item, i) in wsyData" :key="i" :label="item.orgname" :value="item.firstorgnumber"></el-option>
                    </el-select>	                  
				</el-form-item>
				<el-form-item label="签名图片" prop="signPic">
                    <el-upload
                        name="attachfile"
                        :action="uploadAction"
                        list-type="picture"
                        :on-success="handleUploadSuccess2"
                        :limit="1">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload>
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
	 name: "tb_system_user",//页面名称
	 data() {
		 return {
             tableData: [],//列表数据
             wsyData:[],
             usertype:'',
			 batchAddFileList: [],//批量导入所选文件列表
			 cur_page: 1,//列表数据之当前页数
			 cur_size: 10,//列表数据之每页条数
             total: 0,//列表数据之总条数
             wsyisible:true,
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
				 userID: "",
				 name: "",
				 userName: "",
				 _password: "",
				 usertype: "",
				 phoneNumber: "",
				 status: "",
				 createTime: "",
				 createBy: "",
				 orgNumber: "",
				 token: "",
				 tokenTime: "",
				 callBackAddress: "",
				 remark: "",
				 business: "",
				 signPic: ""
			 },
			 //表单验证规则，需绑定到对应表单中
			 rules: {
				 userID: [{ required: true, message: "请填写用户编号" }],
				 name: [{ required: true, message: "请填写用户名称" }],
				 userName: [{ required: true, message: "请填写用户账号" }],
				 _password: [{ required: true, message: "请填写用户密码" }],
				 usertype: [{ required: true, message: "请填写用户类型" }],
				 phoneNumber: [{ required: true, message: "请填写联系电话" }],
				 orgNumber: [{ required: true, message: "请填写所属机构" }]
			 },
		 };
	 },
	 mounted() {
	 },
	 created() {
         this.getWsyData();
		 this.getData();
     },
    computed: {
        uploadAction() {
            return process.env.BASE_URL+process.env.API_PREFIX + api.system.uploadFile
        }
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
				 _data.model = 'tb_system_user';
				 _data.action = action;
			 }
			 return _data;
         },
        select_stauts(val){
			 this.$forceUpdate();
		 },
       getWsyData() {
            axios.get({
                url: api.firstorg.query
            }).then(res => {
                if(res.code == 0){
                    this.wsyData = res.data;
                }
            })
        },
        handleUploadSuccess(response, file, fileList) {
		console.log('导入成功 response', response)
		if(response.code == 0){
			this.addForm.signPic = response.data.fileurl;
			//alert(response.data.fileurl);
		}
        },
        handleUploadSuccess2(response, file, fileList) {
		console.log('导入成功 response', response)
		if(response.code == 0){
			this.editForm.signPic = response.data.fileurl;
			//alert(response.data.fileurl);
		}
		},
        changeUserType(value){
          if(value== 2 || value== 3 )
          {
              this.wsyisible = true;
          }else
            {
                this.wsyisible = false; 
                this.addForm.orgNumber = '';
                this.editForm.orgNumber = '';
            }
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
			 this.addForm.userID = '';
			 this.addForm.name = '';
			 this.addForm.userName = '';
			 this.addForm._password = '';
			 this.addForm.usertype = '';
			 this.addForm.phoneNumber = '';
			 this.addForm.status = '';
			 this.addForm.createTime = '';
			 this.addForm.createBy = '';
			 this.addForm.orgNumber = '';
			 this.addForm.token = '';
			 this.addForm.tokenTime = '';
			 this.addForm.callBackAddress = '';
			 this.addForm.remark = '';
			 this.addForm.business = '';
			 this.addForm.signPic = '';
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
			 this.ids = row.userID;
			 this.delVisible = true;
		 },
		 //查询列表数据方法
		 getData() {
			 this.is_loading = true;
			 axios.post({url: api.commn.action,
				 data: this.handleData('select',{
					 start: (this.cur_page - 1) * this.cur_size,
                     limit: this.cur_size,
                     usertype:this.usertype,
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
			 axios.post({ url: api.commn.action, data: this.handleData('deleteById',{ userID: this.ids }) }).then(res => {
				 if (res.code == 0) {
					 this.delVisible = false;
					 this.tableData.splice(this.idx, 1);
					 this.$message.success("删除成功");
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
