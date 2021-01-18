import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

api.interceptors.response.use(undefined, (err: AxiosError) => {
  if (err.response?.status === 403) {
    api.get(
      '/auth/newaccesstoken',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(() => axios.request(err.config));
    return axios;
  }
  return axios;
});

export default api;
