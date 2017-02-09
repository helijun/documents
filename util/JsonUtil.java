package com.danong.weixin.util;

import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.LinkedHashMap;
import java.util.List;  
import java.util.Map;  
import java.util.Map.Entry;  
  


import org.apache.commons.collections.map.LinkedMap;

import com.alibaba.fastjson.JSONArray;  
import com.alibaba.fastjson.JSONObject;  
//import com.alibaba.fastjson.serializer.SerializerFeature;  
  
/**
* <p>版权所有:(C)2016-2018 达农保险</p>
* @作者: 何立军
* @日期: 2016年11月9日 下午3:34:54
* @描述: [JsonUtil] json转换
 */
public class JsonUtil {  
      
	public static List<LinkedHashMap<String, Object>> json2List(Object json) {  
        JSONArray jsonArr = (JSONArray) json;  
        List<LinkedHashMap<String, Object>> arrList = new ArrayList<LinkedHashMap<String, Object>>();  
        for (int i = 0; i < jsonArr.size(); ++i) {  
            arrList.add(strJson2Map(jsonArr.getString(i)));  
        }  
        return arrList;  
    }  
  
    public static LinkedHashMap<String, Object> strJson2Map(String json) {  
        JSONObject jsonObject = JSONObject.parseObject(json);  
        LinkedHashMap<String, Object> resMap = new LinkedHashMap<String, Object>();  
        Iterator<Entry<String, Object>> it = jsonObject.entrySet().iterator();  
        while (it.hasNext()) {  
            Map.Entry<String, Object> param = (Map.Entry<String, Object>) it.next();  
            if (param.getValue() instanceof JSONObject) {  
                resMap.put(param.getKey(), strJson2Map(param.getValue() + ""));  
            } else if (param.getValue() instanceof JSONArray) {  
                resMap.put(param.getKey(), json2List(param.getValue()));  
            } else {  
                //避免出现双重“”
            	//resMap.put(param.getKey(), JSONObject.toJSONString(param.getValue(), SerializerFeature.WriteClassName));  
            	resMap.put(param.getKey(), param.getValue());
            }  
        }  
        return resMap;  
    }  
} 