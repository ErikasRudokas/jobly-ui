import { Box, TextField, Typography } from '@mui/material';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { JobOfferFormData } from '../../pages/CreateJobOffer/jobOfferSchema';
import { descriptionFieldStyle, sectionContainerStyle, sectionTitleStyle } from './styles';

interface JobOfferFormDescriptionProps {
  register: UseFormRegister<JobOfferFormData>;
  errors: FieldErrors<JobOfferFormData>;
  disabled?: boolean;
}

const JobOfferFormDescription = ({ register, errors, disabled = false }: JobOfferFormDescriptionProps) => {
  return (
    <Box sx={sectionContainerStyle}>
      <Typography variant="h6" sx={sectionTitleStyle}>
        Job Description
      </Typography>
      <TextField
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        multiline
        rows={6}
        disabled={disabled}
        placeholder="Describe the job role, requirements, and responsibilities..."
        variant="outlined"
        sx={descriptionFieldStyle}
      />
    </Box>
  );
};

export default JobOfferFormDescription;
