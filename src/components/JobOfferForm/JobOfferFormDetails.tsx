import {Box, FormControl, FormHelperText, MenuItem, Select, TextField, Typography} from '@mui/material';
import {LocationOn as LocationIcon, TrendingUp as ExperienceIcon, WorkOutline as WorkIcon} from '@mui/icons-material';
import type {Control, FieldErrors, UseFormRegister} from 'react-hook-form';
import {Controller} from 'react-hook-form';
import type {JobOfferFormData} from '../../pages/CreateJobOffer/jobOfferSchema';
import {
    detailFieldStyle,
    detailIconStyle,
    detailInnerBoxStyle,
    detailItemStyle,
    detailLabelStyle,
    detailSelectStyle,
    detailsGridStyle,
    experienceAdornmentStyle,
    sectionContainerStyle,
    sectionTitleStyle,
} from './styles';

interface JobOfferFormDetailsProps {
    register: UseFormRegister<JobOfferFormData>;
    control: Control<JobOfferFormData>;
    errors: FieldErrors<JobOfferFormData>;
    disabled?: boolean;
}

const JobOfferFormDetails = ({register, control, errors, disabled = false}: JobOfferFormDetailsProps) => {
    return (
        <Box sx={sectionContainerStyle}>
            <Typography variant="h6" sx={sectionTitleStyle}>
                Job Details
            </Typography>
            <Box sx={detailsGridStyle}>
                <Box sx={detailItemStyle}>
                    <WorkIcon sx={detailIconStyle} />
                    <Box sx={detailInnerBoxStyle}>
                        <Typography sx={detailLabelStyle}>
                            Work Type
                        </Typography>
                        <Controller
                            name="workType"
                            control={control}
                            render={({field}) => (
                                <FormControl fullWidth error={!!errors.workType} disabled={disabled}>
                                    <Select
                                        {...field}
                                        variant="standard"
                                        sx={detailSelectStyle}
                                    >
                                        <MenuItem value="ON_SITE">On Site</MenuItem>
                                        <MenuItem value="REMOTE">Remote</MenuItem>
                                        <MenuItem value="HYBRID">Hybrid</MenuItem>
                                    </Select>
                                    {errors.workType && (
                                        <FormHelperText>{errors.workType.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Box>
                </Box>

                <Box sx={detailItemStyle}>
                    <LocationIcon sx={detailIconStyle} />
                    <Box sx={detailInnerBoxStyle}>
                        <Typography sx={detailLabelStyle}>
                            Location
                        </Typography>
                        <TextField
                            {...register('location')}
                            error={!!errors.location}
                            helperText={errors.location?.message}
                            fullWidth
                            disabled={disabled}
                            placeholder="e.g. New York, NY"
                            variant="standard"
                            sx={detailFieldStyle}
                        />
                    </Box>
                </Box>
                
                <Box sx={detailItemStyle}>
                    <ExperienceIcon sx={detailIconStyle} />
                    <Box sx={detailInnerBoxStyle}>
                        <Typography sx={detailLabelStyle}>
                            Experience Required
                        </Typography>
                        <TextField
                            {...register('yearsOfExperience', {valueAsNumber: true})}
                            error={!!errors.yearsOfExperience}
                            helperText={errors.yearsOfExperience?.message}
                            fullWidth
                            type="number"
                            disabled={disabled}
                            placeholder="0"
                            variant="standard"
                            sx={detailFieldStyle}
                            slotProps={{
                                input: {
                                    endAdornment: <Typography sx={experienceAdornmentStyle}>years</Typography>,
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JobOfferFormDetails;

