package com.start.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.start.common.CommonResponse;
import com.start.common.CommonStatus;
import com.start.service.BlogListService;
import com.start.service.DrivingSchoolInfoService;
import com.start.service.DrivingSchoolService;
import com.start.util.FilterUtil;
import com.start.util.LocationUtils;
import com.start.vo.DrivingSchoolInfoVO;
import com.start.vo.DrivingSchoolVO;

/**
 * 驾校
 * @author qinxixing
 *
 * @Date 2017-7-25
 */
@Controller
@ResponseBody
@RequestMapping("/driving/schoolInfo")
public class DrivingSchoolInfoController {
	private static final Logger LOGGER = LoggerFactory.getLogger(DrivingSchoolInfoController.class);
	@Resource
	DrivingSchoolInfoService drivingSchoolInfoService;
	
	
	    @RequestMapping(value = "getDrivingSchoolInfo", method = RequestMethod.POST)
	    public CommonResponse getDrivingSchool(DrivingSchoolInfoVO vo){
	    	List<DrivingSchoolInfoVO> clistVo = drivingSchoolInfoService.getDrivingSchoolInfo(vo);
	    	LOGGER.info("查询学校信息");
            return new CommonResponse(0, clistVo);
	    }
	    
	    @RequestMapping(value = "getDistance", method = RequestMethod.POST)
	    public CommonResponse getDistance( @RequestParam("distance") double distance, @RequestParam("location") String location,DrivingSchoolInfoVO vo){
	    	List<DrivingSchoolInfoVO> clistVo = drivingSchoolInfoService.getDrivingSchoolInfo(vo);
	    	System.out.println(clistVo.size());
	    	for (int i = 0; i < clistVo.size(); i++) {
	    		boolean bl = LocationUtils.getVicinage(clistVo.get(i).getLongitudeAndLatitude(), location, distance);
	    		if(!bl){
	    			clistVo.remove(i);
	    		}
			}
	    	LOGGER.info("查询学校信息");
	        return new CommonResponse(0, clistVo);
	    }
        
        
        @RequestMapping(value = "save", method = RequestMethod.POST)
	    public CommonResponse save(DrivingSchoolInfoVO vo){
	    	Integer index = drivingSchoolInfoService.save(vo);
            return new CommonResponse(0, index);
        }
        
        @RequestMapping(value = "update", method = RequestMethod.POST)
	    public CommonResponse update(DrivingSchoolInfoVO vo){
	    	Integer index = drivingSchoolInfoService.update(vo);
            return new CommonResponse(0, index);
        }
        
        
        @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	    public CommonResponse delete(@PathVariable int id){
        	DrivingSchoolInfoVO vo = new DrivingSchoolInfoVO();
        	vo.setId(id);
	    	Integer index = drivingSchoolInfoService.delete(vo);
            return new CommonResponse(0, index);
        }
        
        
        
        @RequestMapping(value="/upload", method=RequestMethod.POST)  
        public CommonResponse doUploadFile(@RequestParam("file") MultipartFile file,HttpServletRequest request){  
           //系统路径
        	String path =System.getProperty("user.dir")+"\\upload\\file\\";
        	String fileName = System.currentTimeMillis()+ file.getOriginalFilename();
        	Integer index =0;
        	int id = Integer.parseInt(request.getParameter("id"));
            if(!file.isEmpty()){  
                try {  
                	DrivingSchoolInfoVO vo = new DrivingSchoolInfoVO();
                	vo.setId(id);
                	List<DrivingSchoolInfoVO> clistVo = drivingSchoolInfoService.getDrivingSchoolInfo(vo);
                	if(null!=clistVo && clistVo.size()>0){
                		DrivingSchoolInfoVO dvo = clistVo.get(0);
                		String fileNamesql = dvo.getVideo();
                		FilterUtil.deleteFile(path+fileNamesql);
                	}
                	
                	vo.setVideo(fileName.replace("\\", "\\\\"));
                	index = drivingSchoolInfoService.update(vo);
                    FileUtils.copyInputStreamToFile(file.getInputStream(), new File(path,fileName));  
                } catch (IOException e) {  
                    e.printStackTrace();  
                }  
            }  
      
            return new CommonResponse(0, index);  

        }  
        
//        public static void main(String[] args) {
//			String ss ="D:\\work\\WORK_PATH\\start\\upload\\file\\1501342718125新建文本文档.txt";
//			System.out.println(ss);
//			System.out.println(ss.replace("\\", "\\\\"));
//		}
        
        public static void main(String[] args) {
        //  // 删除单个文件
        //  String file = "c:/test/test.txt";
        //  DeleteFileUtil.deleteFile(file);
        //  System.out.println();
                // 删除一个目录
                
        //  System.out.println();
        //  // 删除文件
        //  dir = "c:/test/test0";
        //  DeleteFileUtil.delete(dir);

            }
}
