package com.microman.blog.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.abel533.entity.Example;
import com.github.abel533.mapper.Mapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

public abstract class BaseService<T> {
	// //因为在这里琮不知道子类的实现类，所以定义为抽象方法，让子类去实现，从而确定最终的实现mapper.Spring3时必须这样实现，Spring4用下面的方案
	// public abstract Mapper<T> mapper;

	protected Logger LOGGER = Logger.getLogger(this.getClass());

	// Spring 4.0泛型注入特性
	@Autowired
	private Mapper<T> mapper;

	/**
	 * 根据id查询数据
	 * 
	 * @param id
	 * @return
	 */
	public T queryById(Long id) {
		return this.mapper.selectByPrimaryKey(id);
	}

	/**
	 * 查询所有数据
	 * 
	 * @return
	 */
	public List<T> queryAll() {
		return this.mapper.select(null);
	}

	/**
	 * 根据条件查询一条数据
	 * 
	 * @param record
	 * @return
	 */
	public T queryOne(T record) {
		return this.mapper.selectOne(record);
	}

	/**
	 * 根据条件查询数据列表
	 * 
	 * @param record
	 * @return
	 */
	public List<T> queryListByWhere(T record) {
		return this.mapper.select(record);
	}

	/**
	 * 分页查询数据列表
	 * 
	 * @param page
	 * @param rows
	 * @param record
	 * @return
	 */
	public PageInfo<T> queryPageListByWhere(Integer page, Integer rows, T record) {
		// 设置分页参数
		PageHelper.startPage(page, rows);
		List<T> list = this.mapper.select(record);
		return new PageInfo<T>(list);
	}

	/**
	 * 新增数据
	 * 
	 * @param t
	 * @return
	 */
	public Integer save(T t) {
		return this.mapper.insert(t);
	}

	/**
	 * 有选择的保存，选择不为null的字段作为插入字段
	 * 
	 * @param t
	 * @return
	 */
	public Integer saveSelective(T t) {
		return this.mapper.insertSelective(t);
	}

	/**
	 * 更新数据
	 * 
	 * @param t
	 * @return
	 */
	public Integer update(T t) {
		return this.mapper.updateByPrimaryKey(t);
	}

	/**
	 * 有选择的更新，选择不为null的字段作为插入字段
	 * 
	 * @param t
	 * @return
	 */
	public Integer updateSelective(T t) {
		return this.mapper.updateByPrimaryKeySelective(t);
	}

	/**
	 * 根据id删除数据
	 * 
	 * @param id
	 * @return
	 */
	public Integer deleteById(Long id) {
		return this.mapper.deleteByPrimaryKey(id);
	}

	/**
	 * 批量删除
	 * 
	 * @param clazz
	 * @param property
	 * @param values
	 * @return
	 */
	public Integer deleteByIds(Class<T> clazz, String property, List<Object> values) {
		Example example = new Example(clazz);
		example.createCriteria().andIn(property, values);
		return this.mapper.deleteByExample(example);
	}

	/**
	 * 根据条件删除数据
	 * 
	 * @param record
	 * @return
	 */
	public Integer deleteByWhere(T record) {
		return this.mapper.delete(record);
	}

}
