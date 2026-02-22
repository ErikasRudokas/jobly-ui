import {useRef, useState} from 'react';
import {Alert, Box, Divider, Typography} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {useCVUpload} from '../../common/hooks/useCVUpload';
import {useCVDownload} from '../../common/hooks/useCVDownload';
import AppButton from '../AppButton/AppButton';
import {StyledCVCard, StyledFilePreview} from './styles';

interface CVSectionProps {
    cvId?: number;
    onUploadSuccess?: () => void;
}

export const CVSection = ({ cvId, onUploadSuccess }: CVSectionProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { uploadCV, uploading, uploadError, uploadSuccess } = useCVUpload();
    const { downloadCV, downloading, downloadError } = useCVDownload();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Please select a PDF file');
                return;
            }
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        try {
            await uploadCV(selectedFile);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleDownload = async () => {
        if (!cvId) return;
        try {
            await downloadCV(cvId);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                CV Management
            </Typography>

            <StyledCVCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <InsertDriveFileOutlinedIcon color={cvId ? 'primary' : 'disabled'} sx={{ fontSize: 36 }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {cvId ? 'CV uploaded' : 'No CV uploaded yet'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cvId
                                    ? 'You have a CV ready to download.'
                                    : 'Upload your CV to begin applying for jobs.'}
                            </Typography>
                        </Box>
                    </Box>

                    {cvId && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <AppButton
                                variant="outlined"
                                size="small"
                                startIcon={<DownloadIcon />}
                                onClick={handleDownload}
                                loading={downloading}
                            >
                                {downloading ? 'Downloading...' : 'Download'}
                            </AppButton>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <AppButton
                        variant={cvId ? 'outlined' : 'contained'}
                        startIcon={<UploadFileIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        {cvId ? 'Replace CV' : 'Select CV File'}
                    </AppButton>

                    {selectedFile && (
                        <>
                            <StyledFilePreview sx={{ flex: 1, minWidth: 0, py: 1, px: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <InsertDriveFileOutlinedIcon fontSize="small" color="primary" />
                                    <Typography variant="body2" fontWeight="medium" noWrap>
                                        {selectedFile.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                                        ({(selectedFile.size / 1024).toFixed(0)} KB)
                                    </Typography>
                                </Box>
                            </StyledFilePreview>

                            <AppButton
                                startIcon={<UploadFileIcon />}
                                onClick={handleUpload}
                                loading={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </AppButton>
                        </>
                    )}
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Accepted format: PDF · Max size: 5 MB
                </Typography>

                {uploadError && (
                    <Alert severity="error" sx={{ mt: 2 }}>{uploadError}</Alert>
                )}
                {downloadError && (
                    <Alert severity="error" sx={{ mt: 2 }}>{downloadError}</Alert>
                )}
                {uploadSuccess && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        CV uploaded successfully!
                    </Alert>
                )}
            </StyledCVCard>
        </>
    );
};
