import axios, { AxiosResponse } from 'axios';
import { IResponseModel } from 'types/base/ResponseModel';

export const baseURL = 'http://localhost:3000/api';
const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
    patch: {
      'Content-Type': 'application/json',
    },
    put: {
      'Content-Type': 'application/json',
    },
  },
});

axiosInstance.interceptors.response.use(
  (response) => ({
    ...response.data,
    headers: response.headers,
    status: response.status,
  }),
  (error) => {
    let res;
    if (error.response) {
      res = {
        ...error.response.data,
        headers: error.response.headers,
        status: error.response.status,
      };
    } else {
      res = {
        msg: error.request
          ? 'پاسخی از سرور دریافت نشد'
          : 'مشکلی در ارسال درخواست بوجود آمده است. لطفا مجددا تلاش نمایید',
        meta: {},
        data: null,
        headers: [],
        status: null,
      };
    }

    return Promise.reject(res);
  }
);

export type ApiResponseContent<T> = IResponseModel<T> &
  Pick<AxiosResponse<T>, 'headers' | 'status'>;
export type ApiResponse<T> = Promise<ApiResponseContent<T>>;

export class ApiService {
  static axios = axiosInstance;
  static setBaseUrl(url: string) {
    this.axios.defaults.baseURL = url;
  }
  static setDefaultHeaders(
    headers: object,
    key:
      | 'common'
      | 'delete'
      | 'get'
      | 'head'
      | 'post'
      | 'put'
      | 'patch' = 'common',
    override = false
  ) {
    this.axios.defaults.headers[key] = override
      ? headers
      : { ...this.axios.defaults.headers[key], ...headers };
  }
}
