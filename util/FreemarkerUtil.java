package com.cramix.common.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.TemplateNotFoundException;

public class FreemarkerUtil {

    static Logger logger = LogManager.getLogger(LogManager.ROOT_LOGGER_NAME);
    
    private static Configuration cfg;  
    
    private static final String TEMPLATEFILENAME = "src/main/resources/templates";  
      
    static{  
        try{  
            
            //初始化参数  
            cfg = new Configuration(Configuration.VERSION_2_3_22);  
            cfg.setDirectoryForTemplateLoading(new File(FreemarkerUtil.class.getResource("/").getPath()+"templates" ));  
            cfg.setDefaultEncoding("UTF-8");  
            cfg.setTemplateUpdateDelayMilliseconds(0);  
            cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER); 
          
             
            logger.info("初始化Freemarker成功",cfg.toString());
            //dateTmp = cfg.getTemplate("员工表.ftl");  
        }catch(Exception ex){  
            ex.printStackTrace();  
        }  
    }  
    public static void export(Object datas,String template) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException{
        System.out.println( );
        Template dateTmp = cfg.getTemplate(template);  
        Map<String,Object> root = new HashMap<>();;  
        root.put("datas", datas);  
        File file = new File("D:/员工表-freemarker.xls");    
        FileWriter fw = new FileWriter(file);  
        dateTmp.process(root, fw);  
        fw.close();
    }
    public static void export(String fileName,Object datas,String template) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException{
        System.out.println( );
        Template dateTmp = cfg.getTemplate(template);  
        Map<String,Object> root = new HashMap<>();;  
        root.put("datas", datas);  
        File file = new File("D:/"+fileName+".xls");    
        FileWriter fw = new FileWriter(file);  
        dateTmp.process(root, fw);  
        fw.close();
    }  
    public static void export(String fileName,Object datas,String template,HttpServletResponse response) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException{

        fileName=fileName+DateUtil.parseString(new Date());
        
        Template dateTmp = cfg.getTemplate(template);  
        Map<String,Object> root = new HashMap<>();;  
        root.put("datas", datas);  
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/msexcel");
        response.setHeader("content-disposition", "attachment;filename="+ URLEncoder.encode(fileName+ ".xls", "UTF-8"));
        ServletOutputStream out = response.getOutputStream();
        Writer w = new OutputStreamWriter(out, "utf-8");
        dateTmp.process(root, w);
        w.close();
        out.flush();
        out.close();
        
        
    }  
      
      
   
}
