require([
    'jquery',
    'common', 
    'dateFormat',
    'layuiAll',
    'json/map',
    'css!css/project/list'
], function(
    $, 
    HSKJ,
    dateFormat
){
    HSKJ.ready(function () {
        if(HSKJ.getUserInfo('roleid') != 1){
            alert('无权访问')
            return;
        }
        var projectIndex = {
            init: function () {
                this.checkPrtSc();
                this.getAttendanceAjax();
                this.getOutlineAllAjax();
                this.getProjectsAjax();
                this.renderDate();
                this.renderPie();
                this.setInterval();
                this.wactch();
            },

            data: {
                startdate: dateFormat.utils.modified(new Date(), 30, '-'),
                enddate: dateFormat.utils.modified(new Date(), 1, '-'),
                mapData: []
            },

            renderHtml: function (data) {
                var self = this;
                
            },

            //获取项目列表统计（右边）
            getProjectsAjax: function(){
                var self = this;
                HSKJ.POST({
                    url: 'system/hq/outline/projects',
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            $('#projectList').html(layui.laytpl(projectListTpl.innerHTML).render(json.data || {}));
                            for(var item in json.data){
                                self.data.mapData.push({
                                    name: json.data[item].name,
                                    value: [
                                        Math.floor(json.data[item].longitude * 100) / 100,
                                        Math.floor(json.data[item].latitude * 100) / 100,
                                        json.data[item].employeeCount * 10
                                    ]
                                })
                            }
                            self.renderMap();
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //获取考勤统计（下边）
            getAttendanceAjax: function(){
                var self = this;
                
                HSKJ.POST({
                    url: 'system/hq/outline/attendance',
                    data: {
                        startdate: self.data.startdate,
                        enddate: self.data.enddate
                    },
                    beforeSend: function () {
                        HSKJ.loadingShow();
                    },
                    success: function (json) {
                        if (json && json.code == 0) {
                            $('#attendance').html(layui.laytpl(attendanceTpl.innerHTML).render(json.data || {}));
                            $('#year').val(new Date().getFullYear());
                            $('#month').val(new Date().getMonth());
                            //TODO 
                            self.renderCategory(json.data);
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //获取总项目数（左上）
            getOutlineAllAjax: function(){
                var self = this;
                
                HSKJ.POST({
                    url: 'system/hq/outline/all',
                    success: function (json) {
                        if (json && json.code == 0) {
                            $('#employeeTotal').html(json.data.employeeTotal);
                        } else {
                            layui.layer.msg(json.message)
                        }
                    }
                })
            },

            //检查分辨率
            checkPrtSc: function(){
                if (window.innerWidth <= 1900 || window.innerWidth >= 1990){
                    layui.layer.open({
                        title: '提示'
                        , content: '请将分比率调至 1920*1080'
                        , btn: []
                        , closeBtn: 0
                    });     
                }

                if ((window.innerWidth >= 1900 || window.innerWidth <= 1990) &&
                    window.innerHeight <= 1066 //冗余14像素
                ) {
                    layui.layer.open({
                        title: '提示'
                        , content: '请按F11键全屏查看效果更佳'
                        , btn: ['知道了']
                    });
                }
            },

            setInterval: function (data) {
                var self = this;

                setInterval(function(){
                    self.renderDate()
                }, 1000)

            },

            //头部日期
            renderDate: function(){
                var ymd = new Date().toLocaleString().split(' ')[0].replace('/', '年').replace('/', '月') + '日';
                var time = new Date().toLocaleString().split(' ')[1];
                var day = '星期' + '日一二三四五六'.charAt(new Date().getDay());
                $('.el-time-ymd').html(ymd);
                $('.el-time-day').html(day);
                $('.el-time-hms').html(time);
            },

            //圈图
            renderPie: function(){
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        bottom: 0,
                        textStyle: {
                            color: '#49596b',
                            fontSize: '16'
                        },
                        tooltip: {
                            show: true
                        },
                        data: ['未开始', '进行中', '已完成']
                    },
                    series: [
                        {
                            name: '项目状态',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverOffset: 4,
                            clockwise: false,
                            color: ['#48505e', '#53e0f5','#4f94ff'],
                            label: {
                                normal: {
                                    show: true,
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: [
                                { value: 335, name: '未开始' }, 
                                { value: 310, name: '进行中' },
                                { value: 234, name: '已完成' },
                            ]
                        }
                    ]
                };

                var myChart = echarts.init(document.getElementById('pieChart'));
                myChart.setOption(option);
            },

            //地图散点图
            renderMap: function(){
                var self = this;
                var data = glMapData;
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };

                console.log(convertData(data));
                console.log('mapData', self.data.mapData);
                console.log(convertData(data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)))
                var option = {
                    title: {
                        text: '总项目分布情况',
                        left: 'left',
                        textStyle: {
                            color: '#8493ad'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x: 'left',
                        data: ['所有项目', '人员Top 5'],
                        textStyle: {
                            color: '#49596b'
                        }
                    },
                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: [
                        {
                            name: '所有项目',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: self.data.mapData,
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }
                        },
                        {
                            name: '人员Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: self.data.mapData.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 6),
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]
                };

                var myChart = echarts.init(document.getElementById('glMap'));
                myChart.setOption(option);
            },

            //折线图
            renderCategory: function(data){
                console.log('折线图数据', data);
                var sData = [];
                for(var i in data.dailyCount){
                    sData.push([
                        new Date(i).getTime(), 
                        data.dailyCount[i]
                    ])
                }
                for(var i = 1; i <= data.dailyCount; i++){
                    sData.push([
                        new Date(2017, 10, 1).getTime() + 24 * 60 * 60 * 1000 * i, 
                        100 + i*20
                    ])
                }
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    textStyle: {
                        color: '#49596b',
                        fontSize: 15
                    },
                    xAxis: {
                        type: 'time',
                        name: '日期',
                        nameLocation: 'end',
                        nameTextStyle: {
                            fontSize: 15,
                            color: '#49596b'
                        }, 
                        splitLine: {
                            show: false
                        },
                        splitNumber: 1,
                        minInterval: 3600 * 24 * 1000 * 10,
                        boundaryGap: false
                    },
                    yAxis: {
                        name: '出勤人数',
                        nameLocation: 'end',
                        nameTextStyle: {
                            fontSize: 15,
                            color: '#49596b'
                        },
                        textStyle: {
                            color: 'red'
                        },
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        data: sData,
                        type: 'line',
                        color: ['#56d7f7'],
                        areaStyle: {}
                    }]
                };

                var myChart = echarts.init(document.getElementById('categoryChart'));
                myChart.setOption(option);

            },

            wactch: function () {
                var self = this; 

                $(document)
                .off('click', '.js-go-detail')
                .on('click', '.js-go-detail', function () {
                    HSKJ.openPage('./project.html?projectid=' + $(this).attr('data-projectid'), '_blank');
                })
                .off('click', '.el-month-subtract')
                .on('click', '.el-month-subtract', function () {
                    layui.layer.msg('TODO')
                })
                .off('click', '.el-month-add')
                .on('click', '.el-month-add', function () {
                    layui.layer.msg('TODO')
                })

                
            }
        }
        
        projectIndex.init();
        })
    }
)