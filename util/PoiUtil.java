package com.cramix.common.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * poi操作类 
* <p>版权所有:(C)2016-2018 达农保险</p>
* @作者: 阳建
* @日期: 2017年5月17日 上午11:03:40
* @描述: [PoiUtil]
 */
public class PoiUtil {

    /**
     * 根据excel文件 获得所有行数据
     * @param file
     * @return
     */
    
    public static List<Row> getExcelRows(MultipartFile file) {
        List <Row> rowList=new ArrayList<Row>();
        InputStream inp = null;
        try {
            // 读入对账文件
            inp = file.getInputStream();
            Workbook wb = WorkbookFactory.create(inp);
            // 取sheet页
            Sheet sheet = wb.getSheetAt(0);
            // 取最后一行行数
            int rows = sheet.getLastRowNum();
            // 文件从第二行开始才是数据
            if (rows >= 1) {
                for (int j = 1; j <= rows; j++) {
                    // 取行数据
                    Row row = sheet.getRow(j);
                    // 取当前最大列数
                    int last = row.getLastCellNum();
                    if (last >= 1) {
                        if (StringUtils.isEmpty(row.getCell(1).getStringCellValue())) {
                            break;// 当前行 无数据
                        }
                        rowList.add(row);
                        
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (EncryptedDocumentException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        } finally {
            if (inp != null) {
                try {
                    inp.close();
                    inp = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return rowList;
        
    }

}
