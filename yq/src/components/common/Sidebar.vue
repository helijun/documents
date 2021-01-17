<template>
    <div class="sidebar">
        <!-- background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" -->
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
                //====================系统管理端（一）===================    
                {
                    icon: 'el-icon-setting',
                    index: '11',
                    usertype: 1,
                    title: '基础数据管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '111',
                            usertype: 1,
                            title: '卫生机构管理',
                            index: '/system/orglist'
                        },
                        {
                            icon: 'el-icon-info',
                            index: '112',
                            usertype: 1,
                            title: '用户账户管理',
                            index: '/system/userlist'
                        },
                        {
                            icon: 'el-icon-info',
                            index: '113',
                            usertype: 1,
                            title: '采购汇总统计',
                            index: '/system/purchasetotal'
                        },                       
                    ]
                },       
                 //====================卫生院财务科端（二）===================    
                {
                    icon: 'el-icon-setting',
                    index: '21',
                    usertype: 2,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '211',
                            usertype: 2,
                            title: '采购申请管理（1）',
                            index: '/sp/purchaselist1'
                        },     
                         {
                            icon: 'el-icon-info',
                            index: '211',
                            usertype: 2,
                            title: '采购备案管理（3）',
                            index: '/sp/purchaselist3'
                        },   
                         {
                            icon: 'el-icon-info',
                            index: '211',
                            usertype: 2,
                            title: '采购备案盖单（9）',
                            index: '/sp/purchaselist9'
                        },                                                    
                    ]
                },                  
                 //====================卫生院长端（三）=======================   
                {
                    icon: 'el-icon-setting',
                    index: '31',
                    usertype: 3,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '311',
                            usertype: 3,
                            title: '采购备案审批（5）',
                            index: '/sp/purchaselist5'
                        },                              
                    ]
                },     
                //====================卫生局财务科端（四）=====================    
                {
                    icon: 'el-icon-setting',
                    index: '41',
                    usertype: 4,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '411',
                            usertype: 4,
                            title: '采购申请管理（2）',
                            index: '/sp/purchaselist2'
                        },
                        {
                            icon: 'el-icon-info',
                            index: '411',
                            usertype: 4,
                            title: '采购备案管理（4）',
                            index: '/sp/purchaselist4'
                        },     
                         {
                            icon: 'el-icon-info',
                            index: '411',
                            usertype: 4,
                            title: '采购备案完结（10）',
                            index: '/sp/purchaselist10'
                        },                                
                    ]
                }, 
                //====================卫生局办公室主任端（五）=======================   
                {
                    icon: 'el-icon-setting',
                    index: '51',
                    usertype: 5,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '311',
                            usertype: 3,
                            title: '采购备案审批（8）',
                            index: '/sp/purchaselist8'
                        },                              
                    ]
                },   
                //====================卫生局副局长端（六）=======================   
                {
                    icon: 'el-icon-setting',
                    index: '61',
                    usertype: 6,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '611',
                            usertype: 6,
                            title: '采购备案审批（6）',
                            index: '/sp/purchaselist6'
                        },                              
                    ]
                },
                //====================卫生局长端（七）=======================   
                {
                    icon: 'el-icon-setting',
                    index: '71',
                    usertype: 7,
                    title: '审核流程管理',
                    subs: [                      
                        {
                            icon: 'el-icon-info',
                            index: '711',
                            usertype: 7,
                            title: '采购备案审批（7）',
                            index: '/sp/purchaselist7'
                        },                              
                    ]
                },    
                 //====================预约平台端（八）=======================   
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
                 //====================预约机构端（八）=======================   
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
                                {
                    icon: 'el-icon-setting',
                    index: '101',
                    usertype: 10,
                    title: '预约管理平台',
                    subs: [                      
                         {
                            icon: 'el-icon-info',
                            index: '912',
                            usertype: 9,
                            title: '核酸采样管理',
                            index: '/apply/applylist_town'
                        },   
                        {
                            icon: 'el-icon-info',
                            index: '913',
                            usertype: 9,
                            title: '核酸送样管理',
                            index: '/apply/applylist_town2'
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
                            index: '916',
                            usertype: 9,
                            title: '采样报告管理',
                            index: '/apply/query'
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
