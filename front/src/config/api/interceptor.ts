import {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
// import { useToken } from '~/App/Shared/Hooks/UseToken';
import { useToast } from '~/hooks/useToast';

interface CustomAxiosRequestHeaders extends AxiosRequestHeaders {
  refresh_token: string;
  Authorization: string;
}

export default function Interceptor(api: AxiosInstance) {
  const { customToast } = useToast();
  const onResponse = (response: AxiosResponse) => {
    // if (response.headers.accesstoken && response.headers.refreshtoken) {
    // 	useToken.setState(rest => ({
    // 		...rest,
    // 		accessToken: response.headers.accesstoken,
    // 		refreshToken: response.headers.refreshtoken,
    // 	}));
    // }
    return response;
  };

  const onResponseError = async (error: AxiosError) => {
    if (!error.response) {
      customToast('Sem conexão com o servidor', {
        type: 'error',
        id: 'NO_CONNECTION',
      });
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      // useToken.getState().clear();
      // customToast('Seu Login Expirou', {
      // 	type: 'error',
      // 	id: 'jwt_expired',
      // });
      return null;
    }

    if (error.response?.status === 500) {
      console.log(error, error.response);
      customToast('Ocorreu um erro no servidor', {
        type: 'error',
        id: 'status_code_500',
      });
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onResponse, onResponseError);

  const onRequest = (
    config: InternalAxiosRequestConfig<CustomAxiosRequestHeaders>,
  ) => {
    // const { accessToken, refreshToken } = useToken.getState();

    // const { headers } = config;
    // // eslint-disable-next-line no-param-reassign
    // config.headers = {
    // 	...headers,
    // 	refresh_token: `${refreshToken}`,
    // 	Authorization: `Bearer ${accessToken}`,
    // } as CustomAxiosRequestHeaders;

    return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  api.interceptors.request.use(e => onRequest(e), onRequestError);
}
