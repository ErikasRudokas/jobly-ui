import axiosInstance from './axiosInstance';
import {buildApiUrl, USER_ENDPOINTS} from '../constants/apiConstants';
import type {GetUserProfileResponse, SaveUserProfileRequest, UserProfile} from '../types/profile.types';

export const userService = {
    getMyProfile: async (): Promise<UserProfile> => {
        const response = await axiosInstance.get<UserProfile>(
            buildApiUrl(USER_ENDPOINTS.MY_PROFILE)
        );
        return response.data;
    },

    getUserProfile: async (): Promise<GetUserProfileResponse> => {
        const response = await axiosInstance.get<GetUserProfileResponse>(
            buildApiUrl(USER_ENDPOINTS.PROFILE)
        );
        return response.data;
    },

    getPublicUserProfile: async (userId: number): Promise<GetUserProfileResponse> => {
        const response = await axiosInstance.get<GetUserProfileResponse>(
            buildApiUrl(USER_ENDPOINTS.PUBLIC_PROFILE(userId))
        );
        return response.data;
    },

    saveUserProfile: async (data: SaveUserProfileRequest): Promise<GetUserProfileResponse> => {
        const response = await axiosInstance.post<GetUserProfileResponse>(
            buildApiUrl(USER_ENDPOINTS.PROFILE),
            data
        );
        return response.data;
    },
};