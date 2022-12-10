import axios from "axios";
import { ElMessage } from "element-plus";
import router from "./router";
//axios封装
const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
//请求拦截器
service.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status, data } = error.response;
    switch (status) {
      case 400:
        ElMessage.error(data.message);
        break;
      case 401:
        ElMessage.error("token失效，请重新登录");
        router.push("/auth");
        break;
      case 403:
        ElMessage.error("没有权限，请联系管理员");
        break;
      case 404:
        ElMessage.error("请求资源不存在");
        break;
      default:
        ElMessage.error(data.message);
    }
    return Promise.reject(error);
  }
);
export default service;
