import {useState} from 'react';
import axiosInstance from '../services/axiosInstance';
import {buildApiUrl, USER_ENDPOINTS} from '../constants/apiConstants';

interface UseCVDownloadReturn {
    downloadCV: (cvId: number) => Promise<void>;
    downloading: boolean;
    downloadError: string | null;
}

export const useCVDownload = (): UseCVDownloadReturn => {
    const [downloading, setDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState<string | null>(null);

    const downloadCV = async (cvId: number): Promise<void> => {
        setDownloading(true);
        setDownloadError(null);

        try {
            const response = await axiosInstance.get(
                buildApiUrl(USER_ENDPOINTS.DOWNLOAD_CV(cvId)),
                {
                    responseType: 'blob',
                }
            );

            const contentDisposition = response.headers['content-disposition'];
            let filename = `cv_${cvId}.pdf`;

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?([^";\n]+)"?/);
                if (match?.[1]) {
                    filename = match[1].trim();
                }
            }

            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to download CV';
            setDownloadError(errorMessage);
            throw error;
        } finally {
            setDownloading(false);
        }
    };

    return {
        downloadCV,
        downloading,
        downloadError,
    };
};
