<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>

                
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created() {
            let item = [
                //====================预约平台端（8）START =======================   
                {
                    icon: 'el-icon-setting',
                    index: '81',
                    usertype: 8,
                    title: '基础信息管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '811',
                            usertype: 8,
                            title: '采集网点管理',
                            index: '/apply/checkorglist'
                        },   
                        {
                            icon: 'el-icon-info',
                            index: '812',
                            usertype: 8,
                            title: '检测网点管理',
                            index: '/apply/checkorglist2'
                        },    
                        {
                            icon: 'el-icon-info',
                            index: '812',
                            usertype: 8,
                            title: '账号管理',
                            index: '/apply/checkorglist2'
                        },                                                                                                   
                    ]
                },  
                {
                    icon: 'el-icon-setting',
                    index: '82',
                    usertype: 8,
                    title: '采样送检管理',
                    subs: [                        
                         {
                            icon: 'el-icon-info',
                            index: '822',
                            usertype: 8,
                            title: '核酸采样管理',
                            index: '/apply/applylist_admin'
                        },                                                                                                   
                    ]
                },  
                {
                    icon: 'el-icon-setting',
                    index: '83',
                    usertype: 8,
                    title: '检测报告管理',
                    subs: [                          
                        {
                            icon: 'el-icon-info',
                            index: '833',
                            usertype: 8,
                            title: '核酸检测报告管理',
                            index: '/apply/resultlist1'
                        },   
                         {
                            icon: 'el-icon-info',
                            index: '834',
                            usertype: 8,
                            title: '抗体检测报告管理',
                            index: '/apply/resultlist2'
                        },                                                                                                   
                    ]
                }, 
                //====================预约机构端（）END =======================   

                //====================采集网点（9）START =======================   
                {
                    icon: 'el-icon-setting',
                    index: '91',
                    usertype: 9,
                    title: '预约管理平台',
                    subs: [                      
                         {
                            icon: 'el-icon-info',
                            index: '912',
                            usertype: 9,
                            title: '预约检测订单管理',
                            index: '/apply/applylist'
                        },   
                        {
                            icon: 'el-icon-info',
                            index: '913',
                            usertype: 9,
                            title: '核酸检测报告管理',
                            index: '/apply/resultlist1'
                        },   
                         {
                            icon: 'el-icon-info',
                            index: '914',
                            usertype: 9,
                            title: '抗体检测报告管理',
                            index: '/apply/resultlist2'
                        }, 
                         {
                            icon: 'el-icon-info',
                            index: '915',
                            usertype: 9,
                            title: '预约采集订单处理',
                            index: '/apply/checkhandle'
                        },                                                                                                                            
                    ]
                },     
                //====================采集网点（9）END =======================  
                
                
                //====================镇级管理员（10）START =======================  
                {
                    icon: 'el-icon-setting',
                    index: '101',
                    usertype: 10,
                    title: '预约管理平台',
                    subs: [                      
                         {
                            icon: 'el-icon-info',
                            index: '912',
                            usertype: 10,
                            title: '核酸采样管理',
                            index: '/apply/applylist_town'
                        },   
                        {
                            icon: 'el-icon-info',
                            index: '1013',
                            usertype: 10,
                            title: '核酸送样管理',
                            index: '/apply/applylist_town2'
                        },   
                         {
                            icon: 'el-icon-info',
                            index: '1014',
                            usertype: 10,
                            title: '抗体检测报告管理',
                            index: '/apply/resultlist2'
                        },         
                        {
                            icon: 'el-icon-info',
                            index: '1016',
                            usertype: 10,
                            title: '采样报告管理',
                            index: '/apply/query'
                        },    
                         {
                            icon: 'el-icon-info',
                            index: '1015',
                            usertype: 10,
                            title: '预约采集订单处理',
                            index: '/apply/checkhandle'
                        },                                                                                                                            
                    ]
                },   
                //====================镇级管理员（10）END =======================  
                
                //====================县级管理员（11）START =======================  
                //====================县级管理员（11）END =======================

                //====================检测机构管理员（12）START =======================  
                //====================检测机构管理员（12）END =======================  
            ];

            let userInfo = localStorage.getItem('userinfo');
            userInfo = JSON.parse(userInfo);

            this.items = item.filter((v) => {
                if(typeof v.usertype == 'object'){
                    return v.usertype.includes(userInfo.usertype)
                }else{
                    return v.usertype == userInfo.usertype
                }
                
            })
        },
        mounted(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
