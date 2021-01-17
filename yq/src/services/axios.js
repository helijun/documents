/* eslint-disable */

import axios from "axios";
import qs from 'qs';

import { Message } from 'element-ui';

function Rest() { }

Rest.prototype = {
  post(opts) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: opts.url,
        emulateJSON:true,
        transformRequest: [function (data, headers) {
          return qs.stringify(opts.data);
        }],
      }).then(res => {
        commonResponse(res.data, resolve)
      }).catch(e => {
        reject(e)
      })
    })
  },
  post2(opts) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: opts.url,
        transformRequest: [function (data, headers) {
          return qs.stringify(opts.data);
        }],
      }).then(res => {
        commonResponse(res.data, resolve)
      }).catch(e => {
        reject(e)
      })
    })
  },
  get(opts) {
    return new Promise((resolve, reject) => {
      axios(opts.url, {
        params: opts.data
      }).then(res => {
        commonResponse(res.data, resolve)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

function commonResponse(data, resolve){
  if(data.code == 100012){
    Message.error({
      message: "登录过期，请重新登录！",
      type: 'error',
      onClose: () => {
        let url = '/unpayLogin';       

        let userinfo = localStorage.getItem('userinfo');
        userinfo = JSON.parse(userinfo);

        if(null != userinfo && userinfo.usertype == 3)
        {
            url = '/login';
        }

        window.location.href = window.location.href.split('#')[0] + '#' + url
      }
    });
    
  }else{
    resolve(data)
  }
}

export default new Rest;
