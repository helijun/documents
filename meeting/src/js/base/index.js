
require(
[
    'jquery',
    'underscore',
    'common',
    'js/device/list'
],
function ($, _, HSKJ, deviceList) {
    HSKJ.ready(function() {

        
        
        var index = {
            init: function(){
                deviceList(); //进入首页默认渲染设备列表
                this.wactch();
            },

            wactch: function() {

                $(document).on('click', '.nav-list', function(){//左边三个菜单点击
                    $(this).addClass('active').siblings().removeClass('active');
                    var loadFun = $(this).attr('data-load');
                    loadFun && eval(loadFun)();
                })      
            }
        }
        index.init();
    })
})

/*
//因为checkLogin依赖了cookie，所以cookie已经被加载
require([
    "jquery", 
    "artTemplate", 
    "users/list", 
    "attendance/list", 
    "authorization/list", 
    "people/list", 
    "people/orgList", 
    "people/visitant", 
    "approval/list", 
    "approval/employeeList", 
    "approval/visitorList", 
    "people/baseInfo", 
    "record/list", 
    "record/edit", 
    "common/personalCenter", 
    "common/changePWD", 
    "common/api", 
    "config/postManagement", 
    "config/causeManagement", 
    "config/viewLog", 
    "config/deviceManagement", 
    "config/organizationalManagement", 
    "common/testAdd", 
    "common/loading", 
    "common/checkLogin"], 
    function (
        $, 
        art, 
        usersList, 
        attendanceList, 
        authorizationList, 
        peopleList, 
        orgList, 
        visitant, 
        approvalList, 
        approvalEmployeeList, 
        approvalVisitorList, 
        peopleBaseInfo, 
        recordList,
        recordEdit, 
        personalCenter, 
        changePWD, 
        API, 
        configPostManagement, 
        configCauseManagement, 
        configViewLog, 
        configDeviceManagement, 
        configOrganizationalManagement, 
        testAdd
    ) {

    //处理用户名
    var username = $.cookie("username");
    var userpic = $.cookie("headfaceimage")
    $("#userName").html(username);
    if (userpic != "null") {
        $("#ps-head-img").attr("src", userpic);
    }
    //给退出这个按钮绑定事件实现退出登录的功能
    $("#btnLogout").on("click", function () {
        API.logout(function (res) {
            if (res.code == 0) {
                //清除cookie值
                $.removeCookie("USERID");
                $.removeCookie("username");
                //跳转到登录页
                location.href = "login.html";
            }
        })
    });
    // 获取审批信息
    var keyword;
    var qtype = 1;
    var checkresult = 0;
    // 登录获取未审批人员人数
    setTimeout(function () {
        API.queryApprovalList(0, 100, keyword, qtype, checkresult, function (res) {
            if (res.data.list.length == 0) {
                $("#messages").removeClass("opacity1").addClass("opacity0");
                $(".people-icon").append("<style>.people-icon::after{background-color: transparent;}</style>");
            } else {
                $("#messages").removeClass("opacity0").addClass("opacity1");
                $(".people-icon").append("<style>.people-icon::after{background-color: red;}</style>");
            }
        })
    }, 0)
    // 定时抓取未审批人数
    setInterval(function () {
        API.queryApprovalList(0, 100, keyword, qtype, checkresult, function (res) {
            if (res.data.list.length == 0) {
                $("#messages").removeClass("opacity1").addClass("opacity0");
                $(".people-icon").append("<style>.people-icon::after{background-color: transparent;}</style>");
            } else {
                $("#messages").removeClass("opacity0").addClass("opacity1");
                $(".people-icon").append("<style>.people-icon::after{background-color: red;}</style>");
            }
        })
    }, 30000);
    // 定时抓取当前时间
    setTimeout(function () {
        var time = new Date();
        var hour = time.getHours();
        if (hour < 5) {
            $(".welcome").html("早点睡！")
        } else if (hour < 9) {
            $(".welcome").html("早上好！")
        } else if (hour < 12) {
            $(".welcome").html("上午好！")
        } else if (hour < 13) {
            $(".welcome").html("中午好！")
        } else if (hour < 19) {
            $(".welcome").html("下午好！")
        } else {
            $(".welcome").html("晚上好！")
        }
    }, 0)
    setInterval(function () {
        var time = new Date();
        var hour = time.getHours();
        if (hour < 5) {
            $(".welcome").html("早点睡！")
        } else if (hour < 9) {
            $(".welcome").html("早上好！")
        } else if (hour < 12) {
            $(".welcome").html("上午好！")
        } else if (hour < 13) {
            $(".welcome").html("中午好！")
        } else if (hour < 19) {
            $(".welcome").html("下午好！")
        } else {
            $(".welcome").html("晚上好！")
        }
    }, 60000)
    //系统设置
    $("#btnPostManagement").on("click", function () {
        $(".module-container").empty();
        configPostManagement();
    })
    $("#btnCauseManagement").on("click", function () {
        $(".module-container").empty();
        configCauseManagement();
    })
    $("#btnLog").on("click", function () {
        $(".module-container").empty();
        configViewLog();
    })
    $("#btnDeviceManagement").on("click", function () {
        $(".module-container").empty();
        configDeviceManagement();
    })
    $("#BtnOrganizationalManagement").on("click", function () {
        $(".module-container").empty();
        configOrganizationalManagement();
    })

    //个人中心
    $(".btnPersonalCenter").on("click", function () {
        // 收起左侧导航栏
        $('.nav-item').children('ul').slideUp(300);
        $('.nav-item.nav-show').removeClass('nav-show');
        // 标记入库审批状态
        $("#btnApprovalTip").attr("autip", 1);
        personalCenter();
    })
    // 修改密码
    $("#btnChangePWD").on("click", function () {
        changePWD();
    })

    //实现点击不同功能菜单，出现不同功能的页面

    $("#btnRecord").on("click", function () {
        //识别记录
        $(".module-container").empty();
        recordList();
    })
    $("#btnRecordEdit").on("click", function () {
        //识别记录
        $("#modalEditRecord").remove();
        // 移除弹出层，防止重复点击造成页面卡顿
        $(".modal-backdrop").remove();
        recordEdit();
    })
    $("#btnPeopleManager").on("click", function () {
        //人员管理
        $(".module-container").empty();
        peopleList();
    });
    $("#btnOrgTree").on("click", function () {
        // 查询组织树
        orgList();
    })
    $("#btnVisitorManager").on("click", function () {
        //访客管理
        $(".module-container").empty();
        visitant();
    });

    $(".btnVisitantList").on("click", function () {
        //访客管理
        $(".module-container").empty();
        visitant();
    });
    $("#btnTestAdd").on("click", function () {
        //测试批量添加
        $(".module-container").empty();
        testAdd();
    });


    $("#btnApproval").on("click", function () {
        //全部入库审批
        $(".module-container").empty();
        approvalList();
    });
    $("#btnEmployeeApproval").on("click", function () {
        //员工入库审批
        $(".module-container").empty();
        approvalEmployeeList();
    });
    $("#btnVisitorApproval").on("click", function () {
        //访客入库审批
        $(".module-container").empty();
        approvalVisitorList();
    });
    $("#btnAttendanceManager").on("click", function () {
        //考勤管理
        $(".module-container").empty();
        //加载考勤管理模块
        attendanceList();
    });
    $("#btnAuthorization").on("click", function () {
        //访问授权
        $(".module-container").empty();
        //加载访问授权模块
        authorizationList();
    });
    $("#btnUsersManager").on("click", function () {
        //用户管理
        $(".module-container").empty();
        //加载用户管理模块
        usersList();
    });
    $("#nav .submenu a").on("click", function () {
        //手动点击清除搜索栏保留字
        $("#btnSearchWords").removeAttr("visitantkeyword");
        $("#btnSearchWords").removeAttr("approvalkeyword");
        $("#btnSearchWords").removeAttr("recordkeyword");
        $("#btnSearchWords").removeAttr("deviceKeyword");
        $("#btnSearchWords").removeAttr("usersKeyword");
        $("#btnSearchWords").removeAttr("peopleKeyword");
        $("#btnKeepSearchWords").removeAttr("recordSearchWords");
        $("#btnKeepSearchWords").removeAttr("visitantkeyword");
        $("#btnKeepSearchWords").removeAttr("peoplesearchwords");
        $("#btnKeepSearchWords").removeAttr("approvalsearchwords");
        $("#btnKeepSearchWords").removeAttr("deviceSearchwords");
        $("#btnKeepSearchWords").removeAttr("usersSearchWords");
    })
    // 给全局绑定按键事件
    $(function () {
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) {
                $(".btn-search").trigger("click");
            }
        };
    });
    // 非管理员无系统管理权限
    if ($.cookie("username") != "admin") {
        $("#configManager").addClass("displayN");
    }
    //希望一开始就渲染出识别记录
    //  -->触发识别记录的点击事件
    $("#btnOrgTree").trigger("click");
    $("#btnRecord").trigger("click");

    // 给侧边栏添加点击效果
    $(".nav-item>ul li").on("click", function () {
        $(".nav-item>ul li").removeClass("activate");
        $(this).addClass("activate");
        // 组织树
        if ($("#btnPeopleManager").hasClass("activate")) {
            $("#my-tree").removeClass("displayN");
        } else {
            $("#my-tree").addClass("displayN");
        }
        // 访客选择清除
        if (!$("#btnVisitorManager").hasClass("activate")) {
            $("#btnVsStatus").removeAttr("status");
        }
        // 入库审批选择清除
        if (!$("#btnApproval").hasClass("activate")) {
            $("#btnAptype").removeAttr("persontype");
            $("#btnCheckresult").attr("checkresult", 0);
            $("#btnApprovalTip").attr("autip", 1);
        }
        // 员工管理组织树选择清除
        if (!$("#btnPeopleManager").hasClass("activate")) {
            $("#btnOrganizationid").removeAttr("organizationid");
        }
    });
    $(".personal").on("click", function () {
        $(this).addClass("activate");
    })
    // nav收缩展开
    $('.nav-item>a').on('click', function () {
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
                $(".personal").removeClass("activate");
            } else {
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
        }
    });
    // 给下拉菜单变为鼠标移入触发
    $('li.dropdown').mouseover(function () {
        $(this).addClass('open');
    }).mouseout(function () {
        $(this).removeClass('open');
    });

}) */