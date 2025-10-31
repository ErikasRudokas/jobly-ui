import {useState} from 'react';
import axiosInstance from '../services/axiosInstance';
import {buildApiUrl, USER_ENDPOINTS} from '../constants/apiConstants';

interface UseCVUploadReturn {
    uploadCV: (file: File) => Promise<void>;
    uploading: boolean;
    uploadError: string | null;
    uploadSuccess: boolean;
}

export const useCVUpload = (): UseCVUploadReturn => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const uploadCV = async (file: File): Promise<void> => {
        setUploading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const formData = new FormData();
            formData.append('file', file);

            await axiosInstance.post(
                buildApiUrl(USER_ENDPOINTS.UPLOAD_CV),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setUploadSuccess(true);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload CV';
            setUploadError(errorMessage);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    return {
        uploadCV,
        uploading,
        uploadError,
        uploadSuccess,
    };
};

