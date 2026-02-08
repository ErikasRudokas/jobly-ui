import {Box, TextField, Typography} from '@mui/material';
import {Email as EmailIcon, Phone as PhoneIcon} from '@mui/icons-material';
import type {FieldErrors, UseFormRegister} from 'react-hook-form';
import type {JobOfferFormData} from '../../pages/CreateJobOffer/jobOfferSchema';
import {
    contactBoxStyle,
    contactFieldStyle,
    contactIconStyle,
    contactItemStyle,
    sectionContainerStyle,
    sectionTitleStyle,
} from './styles';

interface JobOfferFormContactProps {
    register: UseFormRegister<JobOfferFormData>;
    errors: FieldErrors<JobOfferFormData>;
    disabled?: boolean;
}

const JobOfferFormContact = ({register, errors, disabled = false}: JobOfferFormContactProps) => {
    return (
        <Box sx={sectionContainerStyle}>
            <Typography variant="h6" sx={sectionTitleStyle}>
                Contact Information
            </Typography>
            <Box sx={contactBoxStyle}>
                <Box sx={contactItemStyle}>
                    <EmailIcon sx={contactIconStyle} />
                    <TextField
                        {...register('contactEmail')}
                        error={!!errors.contactEmail}
                        helperText={errors.contactEmail?.message}
                        fullWidth
                        type="email"
                        disabled={disabled}
                        placeholder="email@company.com"
                        variant="standard"
                        sx={contactFieldStyle}
                    />
                </Box>
                <Box sx={contactItemStyle}>
                    <PhoneIcon sx={contactIconStyle} />
                    <TextField
                        {...register('contactPhone')}
                        error={!!errors.contactPhone}
                        helperText={errors.contactPhone?.message}
                        fullWidth
                        disabled={disabled}
                        placeholder="+37061234567 (optional)"
                        variant="standard"
                        sx={contactFieldStyle}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default JobOfferFormContact;

