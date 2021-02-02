<template>
	<div class="table">
		<div class="container"  v-loading="is_loading" element-loading-text="资源加载中，请稍候..." element-loading-spinner="el-icon-loading">
			<div class="handle-box table-cuoff-line">
				<el-row type="flex" justify="space-between" align="center">
					<el-col>
						<span class="select-tip">县区</span>
						<el-select v-model="orgArea" placeholder="所属县区" @change="getcountryTown" >
							<el-option key="" label="全部" value=""></el-option>
							<el-option v-for="(item, i) in countryData" :key="i" :label="item.name" :value="item.code"></el-option>
						</el-select>

						<span class="select-tip">镇街</span>
						<el-select v-model="town" placeholder="所属镇街" :change="select_stauts"  @change="select_stauts" >
							<el-option key="" label="全部" value=""></el-option>
							<el-option v-for="(item, i) in townData" :key="i" :label="item.text" :value="item.value"></el-option>
						</el-select>
						<el-input v-model="keyword2" placeholder="请输入关键字查询" @keyup.enter.native="handleSearch" class="handle-input mr10"></el-input>
						<el-button type="primary" class="admin-btn" @click="search">搜索</el-button>
					</el-col>
				</el-row>
			</div>
			<el-table v-if="!is_loading" :data="tableData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="idcard" label="身份证号码"/>
				<el-table-column prop="name" label="用户姓名"/>
				<el-table-column prop="sex" label="性别"/>
				<el-table-column prop="orgAreaName" label="县区"/>
				<el-table-column prop="townName" label="镇街"/>
				<el-table-column prop="callbackaddress" label="地址"/>
				<el-table-column prop="tel" label="电话"/>
				<el-table-column prop="orgNumber" label="管理机构"/>
				<el-table-column prop="username" label="检测记录（次）">
					<template slot-scope="scope">
                        <a class="user-href" @click="handleOne(scope.row.idcard)">{{scope.row.applyCount}}</a>
                    </template>
				</el-table-column>
				<el-table-column prop="username" label="检测报告（次）">
					<template slot-scope="scope">
                        <a class="user-href" @click="handleTwo(scope.row.idcard)">{{scope.row.applyCount}}</a>
                    </template>
				</el-table-column>
				<div slot="empty" class="default-empty"><span>暂时没有内容哦！</span></div>
			</el-table>
			<div v-show="!is_loading" v-if="total>cur_size" class="pagination">
				<el-pagination  @current-change="handleCurrentChange"  layout="prev, pager, next, jumper, ->, total" :total="total" :current-page="cur_page"/>
			</div>
		</div>
		
		<el-dialog title="检测记录详情" :visible="oneVisible" width="400px" center>
			<el-table :data="oneData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="checkOrgName" label="检测机构"/>
				<el-table-column prop="createTime" label="检测时间"/>
				<el-table-column prop="result" label="检测结果"/>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" class="admin-btn" @click="oneVisible = false;oneData = [];">我知道了</el-button>
			</span>
		</el-dialog>
		
		<el-dialog title="检测报告详情" :visible="twoVisible" width="400px" center>
			<el-table :data="twoData" border style="width: 100%" ref="multipleTable">
				<el-table-column prop="checkOrgNumber" label="采集点"/>
				<el-table-column prop="createTime" label="采集时间"/>
				<el-table-column prop="payTypeName" label="订单类型"/>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" class="admin-btn" @click="twoVisible = false;twoData = []">我知道了</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script> 
import axios from "@/services/axios";
import api from "@/services/api";
import { Loading } from 'element-ui';
import moment from 'moment'
export default {
	 name: "tb_usery",//页面名称
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
			oneVisible: false,
			twoVisible: false,
			oneData: [],
			twoData: [],
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
			idcard: '',
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
	computed: {
		currentOrgArea(){
			let userinfo = localStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			return userinfo ? userinfo.orgArea : '';
		},
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
		handleTwo(id) {
			let loadingInstance = Loading.service();
			
			axios.post({url: api.commn.action,
				data: {idcard:id,model:'Newtb_check_result1',action:'select'}
			}).then(res => {
				this.is_loading = false;
				this.twoVisible = true;
				this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
					loadingInstance.close();
				});
				if (res.code == 0) {
					this.twoData = res.data;
				} else {
					this.$message.error(res.message);
				}
			});
		},
		handleOne(id) {
			let loadingInstance = Loading.service();
			
			axios.post({url: api.commn.action,
				data: {
					model: 'tb_check_apply',
					action: 'select',
					keyWord: id,
				}
			}).then(res => {
				this.is_loading = false;
				this.oneVisible = true;
				this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
					loadingInstance.close();
				});
				if (res.code == 0) {
					this.oneData = res.data;
				} else {
					this.$message.error(res.message);
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
		getcountryTown(code) {
			axios.post({url: api.commn.action,
				 data: {model: 'citybyparent', action:'select',code: code || this.currentOrgArea}
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
		 //表单提交前处理数据方法
		handleData(action,_data) {
			if(null != _data)
			{
				_data.model = 'tb_archives';
				_data.action = action;
			}
			return _data;
		},
		//查询列表数据方法
		getData() {
			this.is_loading = true;
			axios.post({url: api.commn.action,
				data: this.handleData('select',{
					start: this.cur_page,
					limit: this.cur_size,
					town: this.town,
					orgArea: this.orgArea,
					idcard: this.idcard,
					keyWord: this.keyword2,
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
					if (valid) {
						this.addForm.orgArea = this.currentOrgArea;
						axios.post({ url: 'system/user/add', data: this.addForm }).then(res => {
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
.user-href {
	color: blue;
	text-decoration: underline;
	cursor: pointer;
}
</style>
