package com.cramix.common.utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
* <p>版权所有:(C)2016-2018 CRAMIX</p>
* @作者: 何立军
* @日期: 2017年6月29日 下午19:55:20
* @描述: [DownloadUtil]文件下载
 */
public class DownloadUtil {

	/**
	 * 根据url路径下载图片
	 * @param imgUrl 图片路径
	 * @param imgPath 要保存服务器的路径 + 图片名称
	 */
	public static void imageByUrl(String imgUrl,String imgPath){
        try {
	          URL url = new URL(imgUrl);
	          URLConnection con = url.openConnection();
	          InputStream is = con.getInputStream();
	          byte[] bs = new byte[1024];
	          int len;
	          OutputStream os = new FileOutputStream(imgPath);
	          while ((len = is.read(bs)) != -1) {
	            os.write(bs, 0, len);
	          }
	          // 完毕，关闭所有链接
	          os.close();
	          is.close();
	      } catch (MalformedURLException e) {
	          e.printStackTrace();
	      } catch (FileNotFoundException e) {
	          e.printStackTrace();
	      } catch (IOException e) {
	          e.printStackTrace();
	      }
	}
}
