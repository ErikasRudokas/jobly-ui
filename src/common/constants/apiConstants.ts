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
    UPLOAD_CV: '/users/cv',
    DOWNLOAD_CV: (cvId: number) => `/users/cv/${cvId}`,
} as const;

export const CATEGORY_ENDPOINTS = {
    GET_ALL: '/categories',
    GET_BY_ID: (id: number) => `/categories/${id}`,
    CREATE: '/categories/create',
    UPDATE: (id: number) => `/categories/${id}`,
    DELETE: (id: number) => `/categories/${id}`,
} as const;

export const JOB_OFFER_ENDPOINTS = {
    GET_ALL: '/job-offers',
    GET_BY_ID: (id: number) => `/job-offers/${id}`,
    GET_MINE: '/job-offers/mine',
    GET_MINE_DETAILS: (id: number) => `/job-offers/mine/${id}`,
    CREATE: '/job-offers/create',
    UPDATE: (id: number) => `/job-offers/${id}`,
    DELETE: (id: number) => `/job-offers/${id}`,
    CAN_APPLY: (id: number) => `/job-offers/${id}/can-apply`,
} as const;

export const APPLICATION_ENDPOINTS = {
    GET_MINE: '/applications/mine',
    GET_MINE_DETAILS: (id: number) => `/applications/mine/${id}`,
    UPDATE: (id: number) => `/applications/${id}`,
    CANCEL: (id: number) => `/applications/${id}/cancel`,
    APPLY: (jobOfferId: number) => `/job-offers/${jobOfferId}/apply`,
    MANAGE: (id: number) => `/applications/${id}/manage`,
} as const;

