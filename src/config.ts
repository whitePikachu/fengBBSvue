// 生产环境api地址
const PROD_API_URL = "http://www.fyqlin.cn/";
// 开发环境api地址
const DEV_API_URL = "http://127.0.0.1:3000/";
//判断当前环境
const isProd = process.env.NODE_ENV === "production";
//根据环境判断api地址
export const API_URL = isProd ? PROD_API_URL : DEV_API_URL;
