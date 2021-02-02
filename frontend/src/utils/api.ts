import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
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
      .then(() => api.request(error.config));
  }
  return Promise.reject(error);
});

export default api;
