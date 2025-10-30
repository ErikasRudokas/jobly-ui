import {useState, useEffect} from 'react';
import {userService} from '../services/userService';
import type {UserProfile} from '../types/profile.types';

interface UseUserProfileReturn {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useUserProfile = (): UseUserProfileReturn => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getMyProfile();
            setProfile(data);
        } catch (err) {
            const errorMessage = err instanceof Error && 'response' in err
                ? (err as {
                response?: { data?: { message?: string } }
            }).response?.data?.message || 'Failed to load profile'
                : 'Failed to load profile';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
    };
};
