<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">{{title}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="updatePwd">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <el-dialog title="重置密码" :visible.sync="resetVisible" width="320px" center>
			<span class="select-tip">新密码：</span>
			<el-input v-model="newPwd" placeholder="请输入新密码" class="handle-input mr10" width="100%"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetVisible = false">取 消</el-button>
				<el-button type="primary" class="admin-btn" @click="handledoReset">确 定</el-button>
			</span>
		</el-dialog>
    </div>
</template>
<script>
    import axios from '@/services/axios';
    import api from '@/services/api';
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2,
                resetVisible: false,
                newPwd: '',
            }
        },
        computed:{
            title() {
                return process.env.NODE_ENV == 'production'? '保定市新冠核酸检测信息管理平台': 'VUE 3.0 测试'
            },
            username(){
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                return userinfo ? userinfo.username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command == 'updatePwd') {
                    this.resetVisible = true;
                }
                if(command == 'loginout'){
                    this.logout();
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            logout() {
                axios.post({
                    url: api.logout
                }).then(res => {
                    let userinfo = localStorage.getItem('userinfo');
                    userinfo = JSON.parse(userinfo);

                    let url = '/login';

                    localStorage.removeItem('userinfo');
                    localStorage.removeItem('userid');
                    localStorage.removeItem('userremark');
                    localStorage.removeItem('userbusiness');

                    this.$router.push(url);
                })
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
                        userid: localStorage.getItem('userid')
                    }
                }).then(res => {
                    this.is_loading = false;
                    if (res.code == 0) {
                        this.$message.success('密码修改成功！');
                        this.resetVisible = false;
                        this.logout();
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
        },
        mounted(){
            if(document.body.clientWidth < 980){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
