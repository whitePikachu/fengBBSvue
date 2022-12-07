import axios from "axios";
//axios封装
const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
//请求拦截器
service.interceptors.request.use((config) => {
  //在发送请求之前做某事
  return config;
});
//响应拦截器
service.interceptors.response.use((response) => {
  //对响应数据做些事
  return response;
});
export default service;
