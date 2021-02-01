import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let defaultRouter = '/login';

export default new Router({
    routes: [
        {
            path: '/',
            redirect: defaultRouter
        },     
        {
            path: '/manage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '后台管理' },
            children: [
                //=============开始卫生局端系统============
                {
                    path: '/system/orglist',
                    component: resolve => require(['../modules/system/orglist.vue'], resolve),
                    meta: { title: '卫生院管理' }
                },
                {
                    path: '/system/userlist',
                    component: resolve => require(['../modules/system/userlist.vue'], resolve),
                    meta: { title: '卫生室管理' }
                },
                {
                    path: '/system/purchasetotal',
                    component: resolve => require(['../modules/system/purchasetotal.vue'], resolve),
                    meta: { title: '卫生院人口管理' }
                },

               //=============结束卫生局端系统============
            {
                path: '/apply/applylist',
                component: resolve => require(['../modules/apply/applylist.vue'], resolve),
                meta: { title: '采样送检管理' }
            },	
            {
                path: '/apply/applylist_admin',
                component: resolve => require(['../modules/apply/applylist_admin.vue'], resolve),
                meta: { title: '采样送检管理' }
            },	
            {
                path: '/apply/applylist_record',
                component: resolve => require(['../modules/apply/applylist_record.vue'], resolve),
                meta: { title: '人员档案管理' }
            },	
            {
                path: '/apply/applylist_town',
                component: resolve => require(['../modules/apply/applylist_town.vue'], resolve),
                meta: { title: '核酸采样管理' }
            },	
            {
                path: '/apply/applylist_town2',
                component: resolve => require(['../modules/apply/applylist_town2.vue'], resolve),
                meta: { title: '采样送检管理' }
            },	
            {
                path: '/apply/query',
                component: resolve => require(['../modules/apply/query.vue'], resolve),
                meta: { title: '采样报告管理' }
            },	
            
            {
                path: '/apply/checkorglist',
                component: resolve => require(['../modules/apply/checkorglist.vue'], resolve),
                meta: { title: '检测网点管理' }
            },	
            {
                path: '/apply/checkorglist2',
                component: resolve => require(['../modules/apply/checkorglist2.vue'], resolve),
                meta: { title: '检测机构管理' }
            },	
            {
                path: '/apply/user',
                component: resolve => require(['../modules/apply/user.vue'], resolve),
                meta: { title: '系统账号管理' }
            },	
            {
                path: '/apply/gnj',
                component: resolve => require(['../modules/apply/gnj.vue'], resolve),
                meta: { title: '报告管理' }
            },	
            {
                path: '/apply/userx',
                component: resolve => require(['../modules/apply/userx.vue'], resolve),
                meta: { title: '系统账号管理' }
            },	
            {
                path: '/apply/checkhandle',
                component: resolve => require(['../modules/apply/checkhandle.vue'], resolve),
                meta: { title: '检测采集处理' }
            },	 
            {
                path: '/apply/resultlist1',
                component: resolve => require(['../modules/apply/resultlist1.vue'], resolve),
                meta: { title: '检测结果' }
            },	
            {
                path: '/apply/resultlist2',
                component: resolve => require(['../modules/apply/resultlist2.vue'], resolve),
                meta: { title: '检测结果' }
            }]
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {                  
            path: '/h5login',
            component: resolve => require(['../components/page/h5Login.vue'], resolve)
        },
        {                  
            path: '/spLogin',
            component: resolve => require(['../components/page/spLogin.vue'], resolve)
        },
        {                  
            path: '/login',
            component: resolve => require(['../components/page/login.vue'], resolve)
        },
        {                  
            path: '/checkinfo',
            meta: { title: '审批' },
            component: resolve => require(['../modules/h5/checkinfo.vue'], resolve),
        },

        {                  
            path: '/apply',
            meta: { title: '自助核酸检测申请' },
            component: resolve => require(['../modules/wx/apply.vue'], resolve),
        },
        {                  
            path: '/helpapply',
            meta: { title: '代理核酸检测申请' },
            component: resolve => require(['../modules/wx/helpapply.vue'], resolve),
        },
        {                  
            path: '/apply2',
            meta: { title: '自助核酸检测申请' },
            component: resolve => require(['../modules/wx/apply2.vue'], resolve),
        },
        {                  
            path: '/helpapply2',
            meta: { title: '代理核酸检测申请' },
            component: resolve => require(['../modules/wx/helpapply2.vue'], resolve),
        },
        {                  
            path: '/applysuccess',
            meta: { title: '预约成功' },
            component: resolve => require(['../modules/wx/applysuccess.vue'], resolve),
        },
        {                  
            path: '/applypaysuccess',
            meta: { title: '预约成功' },
            component: resolve => require(['../modules/wx/applypaysuccess.vue'], resolve),
        },
        {                  
            path: '/checkLogin',
            meta: { title: '检测人员登录' },
            component: resolve => require(['../modules/wx/checkLogin.vue'], resolve),
        },
        {                  
            path: '/checkLogin2',
            meta: { title: '检测人员登录' },
            component: resolve => require(['../modules/wx/checkLogin2.vue'], resolve),
        },
        {                  
            path: '/index',
            meta: { title: '保定市新冠核酸检测预约系统' },
            component: resolve => require(['../modules/wx/index.vue'], resolve),
        },
        {                  
            path: '/newIndex',
            meta: { title: '保定市新冠核酸检测预约系统' },
            component: resolve => require(['../modules/wx/newIndex.vue'], resolve),
        },
        {                  
            path: '/gkIndex',
            meta: { title: '保定市新冠核酸检测预约系统' },
            component: resolve => require(['../modules/wx/gkIndex.vue'], resolve),
        },
        {                  
            path: '/freeIndex',
            meta: { title: '保定市新冠核酸检测预约系统' },
            component: resolve => require(['../modules/wx/freeIndex.vue'], resolve),
        },
        {                  
            path: '/applyIndex',
            meta: { title: '保定市新冠核酸检测预约系统' },
            component: resolve => require(['../modules/wx/applyIndex.vue'], resolve),
        },
        {                  
            path: '/query',
            meta: { title: '核酸检测结果查询' },
            component: resolve => require(['../modules/wx/query.vue'], resolve),
        },
        {                  
            path: '/applyQuery',
            meta: { title: '核酸检测结果查询' },
            component: resolve => require(['../modules/wx/applyQuery.vue'], resolve),
        },
        {                  
            path: '/checkresult',
            meta: { title: '核酸检测结果' },
            component: resolve => require(['../modules/wx/checkresult.vue'], resolve),
        },
        
        {                  
            path: '/applyhandle',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/applyhandle.vue'], resolve),
        },    
        {                  
            path: '/applyhandle2',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/applyhandle2.vue'], resolve),
        },   
        {                  
            path: '/applyhandle3',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/applyhandle3.vue'], resolve),
        },    
        {                  
            path: '/checkhandle',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/checkhandle.vue'], resolve),
        },  
        {                  
            path: '/checkhandle2',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/checkhandle2.vue'], resolve),
        }, 
        {                  
            path: '/checkhandle3',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/checkhandle3.vue'], resolve),
        }, 
        {                  
            path: '/checkhandle3',
            meta: { title: '核酸检测处理' },
            component: resolve => require(['../modules/wx/checkhandle3.vue'], resolve),
        }, 
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
