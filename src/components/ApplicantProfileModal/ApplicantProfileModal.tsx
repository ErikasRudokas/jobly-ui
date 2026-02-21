import {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {userService} from '../../common/services/userService';
import {transformProfileResponse} from '../../pages/Profile/profileDataUtils';
import type {UpdateUserEducation, UpdateUserSkill, UpdateUserWorkExperience} from '../../common/types/profile.types';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileInfoCards from '../ProfileInfoCards/ProfileInfoCards';
import ProfileProfessionalTabs from '../ProfileProfessionalTabs/ProfileProfessionalTabs';
import {dialogContentStyle, loadingBoxStyle} from './styles';

interface ApplicantInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
}

interface ApplicantProfileModalProps {
    open: boolean;
    onClose: () => void;
    applicant: ApplicantInfo | null;
}

const ApplicantProfileModal = ({open, onClose, applicant}: ApplicantProfileModalProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [workExperience, setWorkExperience] = useState<UpdateUserWorkExperience[]>([]);
    const [education, setEducation] = useState<UpdateUserEducation[]>([]);
    const [skills, setSkills] = useState<UpdateUserSkill[]>([]);

    useEffect(() => {
        if (!open || !applicant) return;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await userService.getPublicUserProfile(applicant.userId);
                const transformed = transformProfileResponse(data);
                setWorkExperience(transformed.workExperience);
                setEducation(transformed.education);
                setSkills(transformed.skills);
            } catch {
                setError('Failed to load applicant profile.');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [open, applicant]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{paper: {sx: {borderRadius: 2}}}}
        >
            <DialogTitle sx={{px: {xs: 2, md: 4}, pt: 3, pb: 0}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={dialogContentStyle}>
                {loading && (
                    <Box sx={loadingBoxStyle}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{mt: 2}}>{error}</Alert>
                )}

                {!loading && !error && applicant && (
                    <>
                        <ProfileHeader
                            firstName={applicant.firstName}
                            lastName={applicant.lastName}
                            username={applicant.username}
                        />

                        <Divider sx={{my: 3}} />

                        <ProfileInfoCards
                            email={applicant.email}
                            firstName={applicant.firstName}
                            lastName={applicant.lastName}
                            username={applicant.username}
                        />

                        <Divider sx={{my: 3}} />

                        <Typography variant="h6" fontWeight="bold" sx={{mb: 1}}>
                            Professional Profile
                        </Typography>

                        <ProfileProfessionalTabs
                            skills={skills}
                            education={education}
                            workExperience={workExperience}
                        />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ApplicantProfileModal;
