import {useRef, useState} from 'react';
import {Alert, Box, Button, CircularProgress, Divider, Typography,} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import {useCVUpload} from '../../common/hooks/useCVUpload';
import {useCVDownload} from '../../common/hooks/useCVDownload';
import {StyledButtonContainer, StyledCVCard, StyledFilePreview} from './styles';

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
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please select a valid CV file (PDF or Word document)');
                return;
            }

            // Validate file size (max 5MB)
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
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            if (onUploadSuccess) {
                onUploadSuccess();
            }
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

    const handleSelectFileClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
                CV Management
            </Typography>

            <StyledCVCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <UploadFileIcon color="primary" />
                    <Typography variant="subtitle1" fontWeight="medium">
                        Upload CV
                    </Typography>
                </Box>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {selectedFile && (
                        <StyledFilePreview>
                            <Typography variant="body2" color="text.secondary">
                                Selected file:
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {selectedFile.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Size: {(selectedFile.size / 1024).toFixed(2)} KB
                            </Typography>
                        </StyledFilePreview>
                    )}

                    <StyledButtonContainer>
                        <Button
                            variant="outlined"
                            startIcon={<DescriptionIcon />}
                            onClick={handleSelectFileClick}
                            disabled={uploading}
                        >
                            Select File
                        </Button>

                        {selectedFile && (
                            <Button
                                variant="contained"
                                startIcon={uploading ? <CircularProgress size={20} /> : <UploadFileIcon />}
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload CV'}
                            </Button>
                        )}
                    </StyledButtonContainer>

                    {uploadError && (
                        <Alert severity="error">
                            {uploadError}
                        </Alert>
                    )}

                    {uploadSuccess && (
                        <Alert severity="success">
                            CV uploaded successfully!
                        </Alert>
                    )}
                </Box>
            </StyledCVCard>

            {cvId && (
                <StyledCVCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <DownloadIcon color="primary" />
                        <Typography variant="subtitle1" fontWeight="medium">
                            Current CV
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            You have a CV on file (ID: {cvId})
                        </Typography>

                        <Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={downloading ? <CircularProgress size={20} /> : <DownloadIcon />}
                                onClick={handleDownload}
                                disabled={downloading}
                            >
                                {downloading ? 'Downloading...' : 'Download My CV'}
                            </Button>
                        </Box>

                        {downloadError && (
                            <Alert severity="error">
                                {downloadError}
                            </Alert>
                        )}
                    </Box>
                </StyledCVCard>
            )}
        </>
    );
};
