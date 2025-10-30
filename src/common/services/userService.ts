import axiosInstance from './axiosInstance';
import {buildApiUrl, USER_ENDPOINTS} from '../constants/apiConstants';
import type {UserProfile} from '../types/profile.types';

export const userService = {
    getMyProfile: async (): Promise<UserProfile> => {
        const response = await axiosInstance.get<UserProfile>(
            buildApiUrl(USER_ENDPOINTS.MY_PROFILE)
        );
        return response.data;
    },
};