import axios, {type AxiosError, type InternalAxiosRequestConfig} from 'axios';
import {buildApiUrl, AUTH_ENDPOINTS} from '../constants/apiConstants.ts';
import {formatAuthorizationHeader} from "../utils/authUtils.ts";
import {LOCAL_STORAGE_KEYS} from "../constants/localConstants.ts";
import {ROUTES} from "../constants/routes.ts";

const axiosInstance = axios.create({
    baseURL: buildApiUrl(''),
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = formatAuthorizationHeader(token);
        }
        return config;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);

                if (!refreshToken) {
                    localStorage.clear();
                    window.location.href = ROUTES.LOGIN;
                    return Promise.reject(error);
                }

                const response = await axios.post(
                    buildApiUrl(AUTH_ENDPOINTS.REFRESH),
                    {refreshToken},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const {accessToken} = response.data;

                localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = formatAuthorizationHeader(accessToken);
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = ROUTES.LOGIN;
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

