import axios, { AxiosRequestConfig } from 'axios';
import config from '@config';

import { Delays } from '@types';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Stub<T> = {
  data: T;
  delay?: number;
};

export const request = <T>(method: Methods, opts: AxiosRequestConfig) => {
  if (RUNTIME_ENV === 'server') {
    return axios.request<T>({
      ...opts,
      baseURL: `${config.remoteApiUrl}/api`,
      method,
    });
  }

  return axios.request<T>({
    ...opts,
    method,
    baseURL: '/api',
  });
};

export const stubRequest = <T>(stub: Stub<T>) => {
  const { data, delay = Delays.stubRequestDelay } = stub;

  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const externalRequest = <T>(
  externalUrl: string,
  opts: AxiosRequestConfig
) => axios.request<T>({ url: externalUrl, ...opts });
