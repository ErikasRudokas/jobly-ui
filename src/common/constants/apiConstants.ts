const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8443/api';

const BASE_URL = API_URL + "/v1";

export const buildApiUrl = (endpoint: string): string => {
    return `${BASE_URL}${endpoint}`;
};

export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
} as const;

export const USER_ENDPOINTS = {
    MY_PROFILE: '/users/me',
}