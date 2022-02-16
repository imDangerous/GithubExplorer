import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json',
  },
  timeout: 10 * 1000,
});

const responseBody = (response: AxiosResponse) => response.data;

export const request = {
  get: (url: string, params: {} | null) => instance.get(url, {params: params}).then(responseBody).catch(onError),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody).catch(onError),
};

export type ServerError = {
  code: string;
  message: string;
};

export const onError = function (error: any) {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    if (serverError && serverError.response) {
      console.log('* Status: ', serverError.response.status);
      console.log('* Data: ', serverError.response.data);
      console.log('* Headers: ', serverError.response.headers);
      return Promise.reject(serverError.response.data);
    }
  }

  console.log('* Network Unknown Error', error);
  return Promise.reject(JSON.stringify(error));
};
