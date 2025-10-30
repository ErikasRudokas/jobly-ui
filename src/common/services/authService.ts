import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {buildApiUrl, AUTH_ENDPOINTS} from '../constants/apiConstants.ts';
import type {
    DecodedToken,
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from '../types/auth.types.ts';
import {LOCAL_STORAGE_KEYS} from "../constants/localConstants.ts";

export const authService = {
    login: async (credentials: LoginRequest): Promise<void> => {
        const response = await axios.post<AuthResponse>(
            buildApiUrl(AUTH_ENDPOINTS.LOGIN),
            credentials
        );

        const {accessToken, refreshToken} = response.data;

        const decoded = jwtDecode<DecodedToken>(accessToken);

        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, decoded.userId.toString());
        localStorage.setItem(LOCAL_STORAGE_KEYS.ROLES, JSON.stringify(decoded.roles));
    },

    register: async (userData: RegisterRequest): Promise<void> => {
        await axios.post(
            buildApiUrl(AUTH_ENDPOINTS.REGISTER),
            userData
        );
    },

    logout: (): void => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ROLES);
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        if (!token) return false;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch {
            return false;
        }
    },

    getUserId: (): number | null => {
        const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
        return userId ? parseInt(userId, 10) : null;
    },

    getUserRoles: (): string[] => {
        const roles = localStorage.getItem(LOCAL_STORAGE_KEYS.ROLES);
        return roles ? JSON.parse(roles) : [];
    },

    hasRole: (role: string): boolean => {
        const roles = authService.getUserRoles();
        return roles.includes(role);
    },
};

