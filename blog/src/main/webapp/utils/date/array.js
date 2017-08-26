;(function (win) {
	Array.prototype.unique = function(){  
		  var res = [];  
		  var json = {};  
		  for(var i = 0; i < this.length; i++){  
		    if(!json[this[i]]){  
		      res.push(this[i]);  
		      json[this[i]] = 1;  
		    }  
		  }  
		 return res;  
		}  
})(window);