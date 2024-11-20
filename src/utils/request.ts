import { message } from "antd";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { ss } from "./storage";

axios.defaults.timeout = 0;
axios.defaults.withCredentials = true;

axios.defaults.baseURL = '/api';

export default async function request(config: AxiosRequestConfig) {
    // const navigate = useNavigate();
    const instance = axios.create();
    // request interceptor
    instance.interceptors.request.use(
        (config) => {
            config.headers["loginToken"] = ss.get('realToken');
            return config;
        }
    )
    
    // response interceptor
    instance.interceptors.response.use(
      response => {
          return response
      },
      error => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                window.location.href = '/login';
                break;
              case 403:
                message.error('暂无权限')
                break;
              case 500:
                if(error.response.data.message || error.response.data.msg){
                  message.error(error.response.data.message || error.response.data.msg)
                }else{
                  message.error("接口调用失败，服务端有异常!")
                }
                break;
              case 501:
                  message.error("接口调用失败，服务端有异常!")
                break;
              case 502:
              case 503:
      
                message.error("网络异常")
                break;
              default:
                if(error.response.data.message || error.response.data.msg){
                  message.error(error.response.data.message || error.response.data.msg)
                }
                break;
            }
          }
        
          return Promise.reject(error);
      }
    )
    
    return instance.request(config).then(res => res.data)
}