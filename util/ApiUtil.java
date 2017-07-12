package com.xxx.common.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xxx.common.httpclient.HttpResult;

@Service
public class ApiUtil implements BeanFactoryAware {

    private BeanFactory beanFactory;

    @Autowired(required = false)
    private RequestConfig requestConfig;

    /**
     * 执行GET请求，响应200返回内容，404返回null
     * 
     * @param url
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public String doGet(String url) throws ClientProtocolException, IOException {
        // 创建http GET请求
        HttpGet httpGet = new HttpGet(url);
        httpGet.setConfig(requestConfig);
        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpGet);
            // 判断返回状态是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                return EntityUtils.toString(response.getEntity(), "UTF-8");
            }
        } finally {
            if (response != null) {
                response.close();
            }
        }
        return null;
    }

    /**
     * 带有参数的GET请求，响应200返回内容，404返回null
     * 
     * @param url
     * @param params
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     * @throws URISyntaxException
     */
    public String doGet(String url, Map<String, String> params) throws ClientProtocolException, IOException, URISyntaxException {
        URIBuilder builder = new URIBuilder(url);
        for (Map.Entry<String, String> entry : params.entrySet()) {
            builder.setParameter(entry.getKey(), entry.getValue());
        }
        return doGet(builder.build().toString());
    }

    /**
     * 执行post请求
     * 
     * @param url
     * @param params
     * @return
     * @throws IOException
     */
    public HttpResult doPost(String url, Map<String, String> params) throws IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != params) {
            List<NameValuePair> parameters = new ArrayList<NameValuePair>(0);
            for (Map.Entry<String, String> entry : params.entrySet()) {
                parameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            // 构造一个form表单式的实体
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(parameters, "UTF-8");
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(formEntity);
        }

        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }
    
    public String doPostString(String url, String str)
			throws Exception {
		// 处理请求地址
		URI uri = new URI(url);
		HttpPost post = new HttpPost(uri);
		post.setEntity(new StringEntity(str,"utf-8"));
		// 执行请求
		HttpResponse response = getHttpClient().execute(post);

		if (response.getStatusLine().getStatusCode() == 200) {
			// 处理请求结果
			StringBuffer buffer = new StringBuffer();
			InputStream in = null;
			try {
				in = response.getEntity().getContent();
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(in,"utf-8"));
				String line = null;
				while ((line = reader.readLine()) != null) {
					buffer.append(line);
				}

			} finally {
				// 关闭流
				if (in != null)
					in.close();
			}

			return buffer.toString();
		} else {
			return null;
		}

	}

    
    /**
     * 执行post请求 返回响应  
     * 需要手动关闭响应
     * 
     * @param url
     * @param params
     * @return
     * @throws IOException
     */
    public CloseableHttpResponse doPostResponse(String url, Map<String, String> params) throws IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != params) {
            List<NameValuePair> parameters = new ArrayList<NameValuePair>(0);
            for (Map.Entry<String, String> entry : params.entrySet()) {
                parameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            // 构造一个form表单式的实体
            UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(parameters, "UTF-8");
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(formEntity);
        }
        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return response;
        } finally {
            if (response != null) {
                //response.close();
            }
        }
    }
    
    /**
     * 执行post请求，发送json数据
     * 
     * @param url
     * @param json
     * @return
     * @throws IOException
     */
    public HttpResult doPostJson(String url, String json) throws IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != json) {
            // 构造一个字符串的实体
            StringEntity stringEntity = new StringEntity(json, ContentType.APPLICATION_JSON);
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(stringEntity);
        }

        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    /**
     * 执行post请求，发送xml数据
     * 
     * @param url 请求地址
     * @param xml xml内容
     * @return
     * @throws IOException
     */
    public HttpResult doPostXml(String url, String xml) throws IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        httpPost.setConfig(requestConfig);
        if (null != xml) {
            // 构造一个字符串的实体
            StringEntity stringEntity = new StringEntity(xml, ContentType.APPLICATION_XML);
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(stringEntity);
        }

        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    /**
     * 执行post请求，发送json数据以及请求头信息
     * 
     * @param url 请求地址
     * @param json 请求json字符串数据(没有设置为空即可)
     * @param headers 需要添加请求头的map(没有设置为空即可)
     * @return
     * @throws IOException
     */
    public HttpResult doPostJson(String url, String json, Map<String, String> headers) throws IOException {
        // 创建http POST请求
        HttpPost httpPost = new HttpPost(url);
        if (headers != null && !headers.isEmpty()) {// 有头信息参数
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                httpPost.addHeader(entry.getKey(), entry.getValue());
            }
        }
        httpPost.setConfig(requestConfig);
        if (null != json) {
            // 构造一个字符串的实体
            StringEntity stringEntity = new StringEntity(json, ContentType.APPLICATION_JSON);
            // 将请求实体设置到httpPost对象中
            httpPost.setEntity(stringEntity);
        }

        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    /**
     * 执行delete请求，发送json数据
     * 
     * @param url 请求地址
     * @param headers 需要添加请求头的map(没有设置为空即可)
     * @return
     * @throws IOException
     */
    public HttpResult doDelete(String url, Map<String, String> headers) throws IOException {
        // 创建http POST请求
        HttpDelete httpdelete = new HttpDelete(url);
        if (headers != null && !headers.isEmpty()) {// 有头信息参数
            for (Map.Entry<String, String> entry : headers.entrySet()) {
                httpdelete.addHeader(entry.getKey(), entry.getValue());
            }
        }
        httpdelete.setConfig(requestConfig);
        CloseableHttpResponse response = null;
        try {
            // 执行请求
            response = getHttpClient().execute(httpdelete);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(response.getEntity(), "UTF-8"));
        } finally {
            if (response != null) {
                response.close();
            }
        }
    }

    private CloseableHttpClient getHttpClient() {
        return this.beanFactory.getBean(CloseableHttpClient.class);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }
}
