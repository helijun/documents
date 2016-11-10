;
(function (win, undefined) {
	'use strict';
	
	/**
	* 左侧导航栏数据组装
	* @author helijun
	*/
	var leftNavData = {
			listItem: [
				{
					title: '机组运行状态',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: 'runState',
					subTemplate: 'machineRunState'
				},
				{
					title: '振摆检测子系统',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: '',
					subTemplate: ''
				},
				{
					title: '压力脉动监测子系统',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: '',
					subTemplate: ''
				},
				{
					title: '工况子系统',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: '',
					subTemplate: ''
				},
				{
					title: '机组信息子系统',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: '',
					subTemplate: ''
				},
				{
					title: '机组信息子系统',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: '',
					subTemplate: ''
				},
				{
					title: '报警',
					subTitle: [{
						name: '机组1',
						id: '1'
					},{
						name: '机组2',
						id: '2'
					}],
					template: ''
				},
				{
					title: '状态检测系统自检',
					subTitle: [],
					template: '',
					subTemplate: ''
				},
				{
					title: '设置',
					subTitle: [],
					template: 'setting',
					subTemplate: ''
				}
			]
    };

	win.leftNavData = leftNavData;
})(window);