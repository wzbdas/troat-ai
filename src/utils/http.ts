import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建自定义接口继承AxiosRequestConfig
interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean; // 是否显示加载中
  showError?: boolean; // 是否显示错误信息
  customConfig?: any; // 自定义配置
  headers?: any; // 兼容headers类型
}

// 创建响应结果接口
interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 默认配置
const defaultConfig: RequestConfig = {
  baseURL: '', // 根据实际环境配置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  loading: true,
  showError: true,
};

// 创建axios实例
const service: AxiosInstance = axios.create(defaultConfig);

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 获取token，可以从pinia或其他存储中获取
    const token = ''; // 这里替换为实际获取token的方法
    
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 关闭加载中
    uni.hideLoading();
    
    const res = response.data;
    const config = response.config as unknown as RequestConfig;
    
    // 根据后端接口规范判断请求是否成功
    if (res.code === 200 || res.code === 0) {
      return res.data;
    } else {
      // 处理错误情况
      if (config.showError) {
        uni.showToast({
          title: res.message || '请求失败',
          icon: 'none',
          duration: 2000,
        });
      }
      
      // 处理特定错误码，例如401未授权
      if (res.code === 401) {
        // 可以在这里处理登录过期逻辑
        console.log('登录已过期，请重新登录');
        // 可以跳转到登录页或清除token等操作
      }
      
      return Promise.reject(res);
    }
  },
  (error) => {
    // 关闭加载中
    uni.hideLoading();
    
    // 获取配置
    const config = error.config as unknown as RequestConfig;
    
    // 处理错误
    if (config?.showError) {
      let message = '';
      
      if (error.response) {
        // 请求已发出，但服务器响应状态码不在 2xx 范围内
        switch (error.response.status) {
          case 400:
            message = '请求错误';
            break;
          case 401:
            message = '未授权，请重新登录';
            // 可以在这里处理登录过期逻辑
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求地址出错';
            break;
          case 408:
            message = '请求超时';
            break;
          case 500:
            message = '服务器内部错误';
            break;
          case 501:
            message = '服务未实现';
            break;
          case 502:
            message = '网关错误';
            break;
          case 503:
            message = '服务不可用';
            break;
          case 504:
            message = '网关超时';
            break;
          case 505:
            message = 'HTTP版本不受支持';
            break;
          default:
            message = `未知错误${error.response.status}`;
        }
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        message = '网络异常，请检查您的网络连接';
      } else {
        // 请求配置发生错误
        message = error.message;
      }
      
      uni.showToast({
        title: message || '请求失败',
        icon: 'none',
        duration: 2000,
      });
    }
    
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 封装请求方法
const http = {
  /**
   * get请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 自定义配置
   */
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.get(url, { params, ...config });
  },
  
  /**
   * post请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 自定义配置
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config);
  },
  
  /**
   * put请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 自定义配置
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config);
  },
  
  /**
   * delete请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 自定义配置
   */
  delete<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.delete(url, { params, ...config });
  },
  
  /**
   * 自定义请求方法
   * @param config 完整的自定义配置
   */
  request<T = any>(config: RequestConfig): Promise<T> {
    return service.request(config);
  },
};

export default http;