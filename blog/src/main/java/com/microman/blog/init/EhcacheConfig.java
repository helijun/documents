package com.microman.blog.init;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cache.interceptor.SimpleKeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheException;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.config.CacheConfiguration;
import net.sf.ehcache.config.DiskStoreConfiguration;
import net.sf.ehcache.config.FactoryConfiguration;
import net.sf.ehcache.distribution.RMICacheManagerPeerListenerFactory;
import net.sf.ehcache.distribution.RMICacheManagerPeerProviderFactory;
import net.sf.ehcache.distribution.RMICacheReplicatorFactory;
import net.sf.ehcache.store.MemoryStoreEvictionPolicy;

/*@EnableCaching
@Configuration
@EnableTransactionManagement*/
public class EhcacheConfig extends RMICacheReplicatorFactory{
	/*
	private static Logger logger = LoggerFactory.getLogger(EhcacheConfig.class);
	private static final String EHCACHE_PROPERTIES = "ehcache.properties";
	
	*//** 最大缓存数量 0 = no limit. **//*
	private static final Integer MAX_CACHE = 0;
	*//** 缓存失效时间间隔/秒  **//*
	private static final Integer TIME_TOLIVE_SECONDS = 24*60*60;
	*//** 缓存闲置多少秒后自动销毁  **//*
	private static final Integer TIME_TOIDLE_SECONDS = 60*60;
	*//** 磁盘失效线程运行时间间隔/秒。 **//*
	private static final Integer DISK_EXPIRY_Thread_INTERVAL_SENCONDS = 100;
	
	*//** 注入cacheManager **//*
	@Bean
	public org.springframework.cache.CacheManager cacheManager() {
		org.springframework.cache.CacheManager cm = new EhCacheCacheManager(putCache());
		return cm;
	}

	@Bean
	public KeyGenerator keyGenerator() {
		return new SimpleKeyGenerator();
	}
	
	@Bean
	public CacheManager putCache(){
		
		String rmiUrls = initRmiURLs();
		
		net.sf.ehcache.config.Configuration cf = new net.sf.ehcache.config.Configuration();
		Properties pro = initRmiUrlsProperties();
        if (null!=rmiUrls) {
            *//** 临时文件目录 **//*
            cf.diskStore(new DiskStoreConfiguration().path("java.io.tmpdir"))
            *//**成员发现 peerDiscovery 方式：manual：手动，rmiUrls：主机名+端口号+缓存名，用来接受或者发送信息的接口，不同的缓存或者机器用“|”隔开 **//*  
            .cacheManagerPeerProviderFactory(new FactoryConfiguration<FactoryConfiguration<?>>()
                    .className(RMICacheManagerPeerProviderFactory.class.getName())
                    .properties("peerDiscovery=manual,rmiUrls=" + rmiUrls)
            );
            *//** 本机监听程序，来发现其他主机发来的同步请求  hostName=192.168.1.112 这里默认是本机可以不配置 **//*
            cf.cacheManagerPeerListenerFactory(new FactoryConfiguration<FactoryConfiguration<?>>()
                    .className(RMICacheManagerPeerListenerFactory.class.getName())
                    .properties("port="+ pro.getProperty("rmiPortNumber") +",socketTimeoutMillis=2000")
            );
        }else{
            logger.debug("The rmiUrls is null!!");
        }

		CacheManager cm = null;
		
		try {
			cm = CacheManager.create(cf);
		} catch (UncheckedIOException e) {
			logger.debug("Fail to load config. message:{}", e.getMessage());
		}
		
		List<Cache> array = null;
		try {
			array = cacheCollection();
		} catch (CacheException e) {
			logger.error("collect cache Failed");
		}
		
		for (Cache list:array) {
			cm.addCache(list);
		}
		
		return cm;
	}
	
	public static List<Cache> cacheCollection(){
		String listParameters = cacheParametersCollection();
		return cacheConf(listParameters);
	}
	
	*//**
	 * 添加缓存的参数
	 * 相关属性：  
		     name : "缓存名称,cache的唯一标识(ehcache会把这个cache放到HashMap里)  
			 maxElementsInMemory  : 缓存最大个数,0没有限制。
			 eternal="false"  : 对象是否永久有效，一但设置了，timeout将不起作用。 (必须设置)
			 maxEntriesLocalHeap="1000"  : 堆内存中最大缓存对象数,0没有限制(必须设置)
			 maxEntriesLocalDisk= "1000"  : 硬盘最大缓存个数。 
			 overflowToDisk="false"  : 当缓存达到maxElementsInMemory值是,是否允许溢出到磁盘(必须设设置)(内存不足时，是否启用磁盘缓存。)
			 diskSpoolBufferSizeMB  : 这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。 
			 diskPersistent="false"  : 磁盘缓存在JVM重新启动时是否保持(默认为false)硬盘持久化
			 timeToIdleSeconds="0"  : 导致元素过期的访问间隔(秒为单位),即当缓存闲置n秒后销毁。 当eternal为false时，这个属性才有效，0表示可以永远空闲,默认为0
			 timeToLiveSeconds="0"  : 元素在缓存里存在的时间(秒为单位)，即当缓存存活n秒后销毁. 0 表示永远存在不过期
			 memoryStoreEvictionPolicy="LFU" : 当达到maxElementsInMemory时,如何强制进行驱逐默认使用"最近使用(LRU)"策略,其它还有先入先出FIFO,最少使用LFU,较少使用LRU
			 diskExpiryThreadIntervalSeconds ：磁盘失效线程运行时间间隔，默认是120秒。
			 clearOnFlush  : 内存数量最大时是否清除。 
			 
			 cacheEventListenerFactory : 给缓存添加监听
			 replicateAsynchronously=true : 异步的方式
			 replicatePuts=true,replicateUpdates=true,replicateUpdatesViaCopy=true,replicateRemovals= true  : 在put，update，copy，remove操作是否复制
			 cationIntervalMillis=1000 : 同步时间1s
			 bootstrapCacheLoaderFactory 启动是指一启动就同步数据
	 * @return
	 *//*
	public static String cacheParametersCollection(){
		
		String listParameters = "[" ;
		
		*//** 博客:博客列表    **//*
		listParameters += "{'cacheName':'blog_list','maxEntriesLocalHeap':'0'}";
		
		listParameters += "]";
		
		return listParameters;
	}
	
	*//**
	 * 添加成员发现: //主机ip+端口号/
	 * @return
	 *//*
	public static List<String> cacheManagerPeerProviderCollection(){
		Properties pro = initRmiUrlsProperties();
		
		List<String> ip = new ArrayList<>();
		try {
			ip.add(pro.get("machine1").toString());
			ip.add(pro.get("machine2").toString());
		} catch (Exception e) {
			logger.error("Fail to provider cacheManagerPeer. config file [{}], message:{}", EHCACHE_PROPERTIES, e.getMessage());
		}
		
		InetAddress ia;
		try {
			ia = InetAddress.getLocalHost();
			String localip = ia.getHostAddress();
			for (int i = 0; i < ip.size(); i++) {
				*//** 过滤本机ip **//*
				if (localip.equalsIgnoreCase(ip.get(i))) {
					ip.remove(i);
				}
			}
		} catch (UnknownHostException Host) {
			Host.printStackTrace();
			logger.error("Unknown to host Address. config file [{}], message:{}", EHCACHE_PROPERTIES, Host.getMessage());
		}
		
		List<String> peer = new ArrayList<>();
		for (int j = 0; j < ip.size(); j++) {
			peer.add("//" + ip.get(j) + ":" + pro.getProperty("rmiPortNumber").toString());
		}
		
		return peer;
	}
	
	public static String initRmiURLs(){
		String rmiUrls = "";
		String listParameters = cacheParametersCollection();
		JSONArray array = initCacheParameters(listParameters);
		for (Iterator<Object> iterator = array.iterator(); iterator.hasNext();) {
			JSONObject obj = (JSONObject)iterator.next();
			String cacheName = obj.get("cacheName").toString();
			List<String> peer = cacheManagerPeerProviderCollection();
			for (String list:peer) {
				rmiUrls += list + cacheName + "|";
			}
		}
		if (!"".equals(rmiUrls)) {
			rmiUrls = rmiUrls.substring(0,rmiUrls.length()-1);
		}
	    return rmiUrls;
	}
	
	public static JSONArray initCacheParameters(String listParameters){
		JSONArray array = null;
		try {
			array = JSONArray.parseArray(listParameters);
		} catch (Exception e) {
			logger.error("Fail to init The cache parameters. message:{}", e.getMessage());
		}
		return array;
	}
	
	public static Properties initRmiUrlsProperties(){
		InputStream resourcesStream = EhcacheConfig.class.getClassLoader().getResourceAsStream(EHCACHE_PROPERTIES);
		Properties pro = new Properties();
		try {
			pro.load(resourcesStream);
		} catch (IOException e) {
			logger.error("Fail to load config. config file [{}], message:{}", EHCACHE_PROPERTIES, e.getMessage());
		}
		return pro;
	}
	
	*//**
	 * @param listPatrolParameters 缓存参数JSON数组
	 * @return  缓存的集合
	 *//*
	@SuppressWarnings("deprecation")
	public static List<Cache> cacheConf(String listParameters){
		
		List<Cache> listCache = new ArrayList<>();
		JSONArray array = initCacheParameters(listParameters);
		for (Iterator<Object> iterator = array.iterator(); iterator.hasNext();) {
			JSONObject obj = (JSONObject)iterator.next();
			
			String cacheName = obj.get("cacheName").toString();
			String maxElementsInMemory = obj.getString("maxElementsInMemory");
			String maxEntriesLocalHeap = obj.getString("maxEntriesLocalHeap");
			String timeToLiveSeconds = obj.getString("timeToLiveSeconds");
			String timeToIdleSeconds = obj.getString("timeToIdleSeconds");
			
			RMICacheReplicatorFactory rmi = new RMICacheReplicatorFactory();
			Properties pro = initRmiUrlsProperties();
			rmi.createCacheEventListener(pro);
			
			CacheConfiguration cacheConfiguration = new CacheConfiguration(cacheName,StringUtil.isNull(maxEntriesLocalHeap)?MAX_CACHE:Integer.parseInt(maxEntriesLocalHeap))
					.memoryStoreEvictionPolicy(MemoryStoreEvictionPolicy.LFU)  
					.maxElementsInMemory(StringUtil.isNull(maxElementsInMemory)?MAX_CACHE:Integer.parseInt(maxElementsInMemory))
				    .overflowToDisk(true)  
				    .eternal(false)  
				    .timeToLiveSeconds(StringUtil.isNull(timeToLiveSeconds)?TIME_TOLIVE_SECONDS:Integer.parseInt(timeToLiveSeconds))  
				    .timeToIdleSeconds(StringUtil.isNull(timeToIdleSeconds)?TIME_TOIDLE_SECONDS:Integer.parseInt(timeToIdleSeconds))  
				    .diskPersistent(false)  
				    .diskExpiryThreadIntervalSeconds(DISK_EXPIRY_Thread_INTERVAL_SENCONDS)
				    .clearOnFlush(true)
	                .cacheEventListenerFactory(new CacheConfiguration.CacheEventListenerFactoryConfiguration().className(RMICacheReplicatorFactory.class.getName()));
			Cache cache = new Cache(cacheConfiguration);
			
			listCache.add(cache);
		}
		
		return listCache;
	}*/
}
