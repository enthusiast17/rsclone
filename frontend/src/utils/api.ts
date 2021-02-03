import axios, { AxiosError } from 'axios';
import { IReNewAccessToken } from './interfaces';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    Authorization: `Basic ${localStorage.getItem('refresh-token')} ${localStorage.getItem('access-token')}`,
  },
});

api.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) {
    return api.get(
      '/auth/newaccesstoken',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response: { data: IReNewAccessToken }) => {
        localStorage.setItem('access-token', response.data.data);
        api.defaults.headers.Authorization = `Basic ${localStorage.getItem('refresh-token')} ${localStorage.getItem('access-token')}`;
        // eslint-disable-next-line no-param-reassign
        error.config.headers.Authorization = `Basic ${localStorage.getItem('refresh-token')} ${localStorage.getItem('access-token')}`;
        return api.request(error.config);
      });
  }
  return Promise.reject(error);
});

export default api;
