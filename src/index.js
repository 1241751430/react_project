import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 导入axios对象
import axios from 'axios'
// 把 axios 对象绑定到React组件原型上 ，将来所有的React组件都可以访问到axios对象
React.Component.prototype.axios = axios;
// 给 axios 配置默认全局路径
axios.defaults.baseURL = 'http://47.96.21.88:8086/';

// 给 axios 配置一个响应拦截器
axios.interceptors.response.use(function (response) {
  // // 拦截到axios所有的请求，直接返回了响应结果中的data数据
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

// 添加请求拦截器 ,每次请求 除了Login都要添加 taken值
axios.interceptors.request.use(function (config) {
  if (!window.location.href.endsWith('/login')) {
    config.headers.Authorization = localStorage.getItem('myToken')
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

ReactDOM.render(<App />, document.getElementById('root'));
