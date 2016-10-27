
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"h+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
	//毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

/**
 * 时间加减法，生成新的时间对象
 */
function addDate(date, addDays) {
    var newDate = new Date(date.getTime())
    newDate.setDate(newDate.getDate() + addDays);
    return newDate;
}

/**
 * 获取日期所在的周一，周从周一开始
 */
function getCurrentMonday(date) {
    var index = date.getDay(); //0~6
    var addDays;
    if(index == 0){
        addDays = -6;
    } else {
        addDays = 1 - index;
    }
    var monday = new Date(date.getTime());
    monday.setDate(monday.getDate() + addDays);
    return monday;
}

/**
 * 得到当月1号
 */
function getCurrenMonthFirstDate(date) {
    return addDate(date, 1-date.getDate());
}

/**
 * 加减月数
 */
function addMonth(date, months) {
    var newMonth = new Date(date.getTime());
    newMonth.setMonth(date.getMonth() + months);
    return newMonth;
}

var DatePrototype = {
		
		/**
		 * @param fmt 格式
		 * @param date 需要格式化的日期
		 */
        Format : function(fmt,date){
              var self = date;
              var o = {   
                "M+" : self.getMonth()+1,                 //月份   
                "d+" : self.getDate(),                    //日   
                "h+" : self.getHours(),                   //小时   
                "m+" : self.getMinutes(),                 //分   
                "s+" : self.getSeconds(),                 //秒   
                "q+" : Math.floor((self.getMonth()+3)/3), //季度   
                "S"  : self.getMilliseconds()             //毫秒   
              };   
              if(/(y+)/.test(fmt))   
                fmt=fmt.replace(RegExp.$1, (self.getFullYear()+"").substr(4 - RegExp.$1.length));   
              for(var k in o)   
                if(new RegExp("("+ k +")").test(fmt))   
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
              return fmt;   
        },
        
        /**
         * 时间戳转换为日期
         * @param dateTime 时间戳
         * @returns xxxx年xx月xx日 xx:xx
         */
        convertDate: function(dateTime){
        	return new Date(parseInt(dateTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        },
        
        /**
         * @param num 加/减的天数
         * @param sign 加/减的符号
         */
        Modified: function(date,num,sign){ 
        	date = new Date(date);
            var timestamp = num * 24*60*60*1000;
            var result = null;

            sign == '+'?result = new Date(date.valueOf() + timestamp):result = new Date(date.valueOf() - timestamp);
            
            result = DatePrototype.Format("yyyy-MM-dd",result);
            return result;
        },
        /**
         * @param startDate 开始日期
         * @param EndDate 结束日期
         * return 两个日期的日期差
         */
        startAndEndDif: function(startDate,endDate){
           var strSeparator = "-"; //日期分隔符
       	   var oDate1,oDate2,iDays;
       	   oDate1= startDate.split(strSeparator);
       	   oDate2= endDate.split(strSeparator);
       	   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
       	   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
       	   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数  */
       	   startToEnd = iDays + 1;
       	   return startToEnd;
        }
    }


var dateUtil = {
		
		/**
         * @param num 加/减的天数
         * @param sign 加/减的符号
         */
        modified: function(date,num,sign){ 
        	date = new Date(date);
            var timestamp = num * 24*60*60*1000;
            var result = null;

            sign == '+'?result = new Date(date.valueOf() + timestamp):result = new Date(date.valueOf() - timestamp);
            
            result = DatePrototype.Format("yyyy-MM-dd",result);
            return result;
        },
}