<template>
	<div class="table">
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<span class="select-tip">账户类型</span>
						<el-select v-model="usertype" placeholder="请选择账户类型" style="width:200px;">
							<el-option key="" label="全部" value=""></el-option>
							<el-option key="8" label="平台管理员" value="8"></el-option>
							<el-option key="9" label="采集网点管理员" value="9"></el-option>
							<el-option key="10" label="镇级管理员" value="10"></el-option>
							<el-option key="11" label="县级管理员" value="11"></el-option>
							<el-option key="12" label="检测机构管理员" value="12"></el-option>
						</el-select>
						<span class="select-tip">县区</span>
						<el-select v-model="orgArea" placeholder="所属县区" @change="getcountryTown" >
							<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
						</el-select>

						<span class="select-tip">镇街</span>
						<el-select v-model="town" placeholder="所属镇街" :change="select_stauts"  @change="select_stauts" >
							<el-option v-for="(item, i) in townData" :key="i" :label="item.text" :value="item.value"></el-option>
						</el-select>
						<el-input v-model="keyword2" placeholder="请输入关键字查询" @keyup.enter.native="handleSearch" class="handle-input mr10"></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
						<el-button type="primary" class="admin-btn" @click="handleAdd">增加账户</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="" label="用户类型">
					<template slot-scope="scope">
						{{['','','','','','','','','平台管理员','采集网点管理员','镇级管理员','县级管理员','检测机构管理员'][Number(scope.row.usertype)]}}
					</template>
				</el-table-column>
				<el-table-column prop="orgNumber" label="关系机构"/>
				<el-table-column prop="name" label="用户姓名"/>
				<el-table-column prop="tel" label="联系电话"/>
				<el-table-column prop="username" label="用户名"/>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						<el-button size="small" type="warning" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
                    </template>
                </el-table-column>
				<div slot="empty" class="default-empty"><span>暂时没有内容哦！</span></div>
			</el-table>
			<div v-show="!is_loading" v-if="total>cur_size" class="pagination">
				<el-pagination  @current-change="handleCurrentChange"  layout="prev, pager, next, jumper, ->, total" :total="total" :current-page="cur_page"/>
			</div>
		</div>

		<el-dialog title="提示" :visible.sync="delVisible" width="400px" center>
			<div class="del-dialog-cnt">是否确定删除？</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="deleteRow">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="重置密码" :visible.sync="resetVisible" width="320px" center>
			<span class="select-tip">新密码：</span>
			<el-input v-model="newPwd" placeholder="请输入新密码" class="handle-input mr10" width="100%"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="handledoReset">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="增加账户" :visible.sync="addVisible" width="400px">
			<el-form ref="addForm" :model="addForm" :rules="rules" label-width="117px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tel">
					<el-input v-model="addForm.tel" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="用户类型" prop="usertype">
					<el-select v-model="addForm.usertype" placeholder="请选择账户类型" style="width:200px;" @change="getcheckOrgData">
						<el-option key="8" label="平台管理员" value="8"></el-option>
						<el-option key="9" label="采集网点管理员" value="9"></el-option>
						<el-option key="10" label="镇级管理员" value="10"></el-option>
						<el-option key="11" label="县级管理员" value="11"></el-option>
						<el-option key="12" label="检测机构管理员" value="12"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属县区" v-show="addForm.usertype != 8">
					<el-select v-model="addForm.orgArea" placeholder="所属县区" @change="getcountryTown(addForm.orgArea)" >
						<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属镇街" v-show="addForm.usertype == 9 || addForm.usertype == 10">
					<el-select v-model="addForm.town" placeholder="所属镇街" :change="getcheckOrgData"  @change="getcheckOrgData" >
						<el-option v-for="(item, i) in townData" :key="i" :label="item.text" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="检测机构" v-show="addForm.usertype == 9 || addForm.usertype == 12">
					<el-select v-model="addForm.orgNumber" placeholder="检测机构" class="handle-input">
						<el-option v-for="(item, i) in checkOrgData" :key="i" :label="item.orgName" :value="item.checkOrgNumber"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="登录账号" prop="username">
					<el-input v-model="addForm.username" class="handle-input"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="password">
					<el-input v-model="addForm.password" class="handle-input"></el-input>
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
	 name: "tb_user",//页面名称
	 data() {
		 return {
			tableData: [],//列表数据
			checkOrgNumber: '',
			batchAddFileList: [],//批量导入所选文件列表
			cur_page: 1,//列表数据之当前页数
			cur_size: 10,//列表数据之每页条数
			total: 0,//列表数据之总条数
			select_word: "",//查询关键字
			is_loading: false,//加载数据框显示标识
			addVisible: false,//增加框显示标识 
			editVisible: false,//修改框显示标识 
			delVisible: false,//删除框显示标识 
			importVisible: false,//批量导入显示标识
			resetVisible: false,//重置密码
			isOffUpload: true,//批量导入上传完成与否标识
			uploadData: {model:'tb_check_result2',fields:'name,idcard,result,checkTime,checkOrgNumber'},//批量导入带的参数
			// 增加表单
			addForm: {
				name: "",
				tel: "",
				usertype: "",
				orgArea: "",
				town: "",
				username: "",
				password: ""
			},
			editForm: {},//修改表单
			ids: "",// 待删除的后台编号
			idx: -1,// 待删除的界面列表索
			keyword2: '',
			usertype: '',
			orgArea: '',
			town: '',
			countryData:[],
			townData:[],
			checkOrgData:[],
			newPwd: '',
			//表单字段
			form: {
				name: "",
				tel: "",
				usertype: "",
				orgArea: "",
				town: "",
				orgNumber: "",
				username: "",
				password: ""
			},
			//表单验证规则，需绑定到对应表单中
			rules: {
				name: [{ required: true, message: "请填写姓名" }],
				tel: [{ required: true, message: "请填写电话" }],
				usertype: [{ required: true, message: "请选择用户类型" }],
				orgArea: [{ required: true, message: "请填写县区" }],
				town: [{ required: true, message: "请填写镇街" }],
				username: [{ required: true, message: "请填写账号" }],
				password: [{ required: true, message: "请填写密码" }]
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
				_data.model = 'tb_check_apply_report_bytown';
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
		getcountryTown(code) {
			axios.post({url: api.commn.action,
				 data: {model: 'citybyparent', action:'select',code: code || this.orgArea}
			 }).then(res => {
				if (res.code == 0) {
					this.townData = res.data;
				} else {
					this.$message.error(res.message);
				}
			});
			this.getcheckOrgData();
		},
		getcheckOrgData() {
			let orgType = '';
			if (this.addForm.usertype == '9') {
				orgType = '1';
			} else if (this.addForm.usertype == '12') {
				orgType = '2';
			} 
			axios.post({url: api.commn.action,
            data: {
				model: 'tb_check_org',
				action: 'select',
				orgType: orgType,
                town: orgType == 2 ? '' : this.addForm.town,
                orgArea: this.addForm.orgArea,
              }
          }).then(res => {
            if (res.code == 0) {
			  this.checkOrgData = res.data;
			  if (this.checkOrgData.length == 0) {
				this.addForm.orgName = '';
			  }
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
			this.$data.addForm = Object.assign({}, this.$data.addForm, this.$options.data().addForm);
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
			this.ids = row.userid;
			this.delVisible = true;
		},
		// 重置密码		
		handleReset(index, row) {
			this.idx = index;
			this.$row = row;
			this.newPwd = '';
			this.resetVisible = true;
		},
		handledoReset() {
			if (!this.newPwd) {
				this.$message.error('请输入新密码');
				return;
			}
			
			axios.post({
				url: 'system/user/resetpwd',
				data: {
					password: this.newPwd,
					userid: this.$row.userid
				}
			}).then(res => {
				this.is_loading = false;
				if (res.code == 0) {
					this.$message.success('密码重置成功！');
					this.resetVisible = false;
					this.getData();
				} else {
					this.$message.error(res.message);
				}
			});
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
			axios.post({
				url: 'system/user/query',
				data: {
					start: this.cur_page,
					limit: this.cur_size,
					usertype: this.usertype,
					orgArea: this.orgArea,
					town: this.town,
					keyword: this.keyword2
				}
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
					if (valid) {axios.post({ url: 'system/user/add', data: this.addForm }).then(res => {
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
				if (valid) {
						axios.post({ url: api.commn.action, data: this.handleData('update',this.editForm) }).then(res => {
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
			axios.post({ url: 'system/user/delete', data: { userids: this.ids }}).then(res => {
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
		handleExport(){
			let params = {
				title: '',
				excelType: '2',
				udpclass: 'ExcelService',
			};
			
			this.is_loading = true;
			axios.get({
				url: api.commn.udpAction,
				data: params
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
.handle-box {
	.select-tip {
		margin-bottom: 20px;
	}
}
</style>
