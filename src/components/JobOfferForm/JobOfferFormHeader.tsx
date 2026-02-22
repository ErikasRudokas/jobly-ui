import { Box, FormControl, FormHelperText, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { Category } from '../../common/types/category.types';
import type { JobOfferFormData } from '../../pages/CreateJobOffer/jobOfferSchema';
import {
  bulletStyle,
  categoryFormControlStyle,
  categoryIconStyle,
  categorySelectStyle,
  companyFieldStyle,
  headerContainerStyle,
  metaRowStyle,
  salaryAdornmentStyle,
  salaryFieldStyle,
  titleFieldStyle,
} from './styles';

interface JobOfferFormHeaderProps {
  register: UseFormRegister<JobOfferFormData>;
  control: Control<JobOfferFormData>;
  errors: FieldErrors<JobOfferFormData>;
  categories: Category[];
  disabled?: boolean;
}

const JobOfferFormHeader = ({ register, control, errors, categories, disabled = false }: JobOfferFormHeaderProps) => {
  return (
    <Box sx={headerContainerStyle}>
      <TextField
        {...register('title')}
        error={!!errors.title}
        helperText={errors.title?.message}
        fullWidth
        disabled={disabled}
        placeholder="Job Title"
        variant="standard"
        sx={titleFieldStyle}
      />

      <TextField
        {...register('companyName')}
        error={!!errors.companyName}
        helperText={errors.companyName?.message}
        fullWidth
        disabled={disabled}
        placeholder="Company Name"
        variant="standard"
        sx={companyFieldStyle}
      />

      <Box sx={metaRowStyle}>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.categoryId} disabled={disabled} sx={categoryFormControlStyle}>
              <Select
                {...field}
                variant="standard"
                displayEmpty
                startAdornment={<CategoryIcon sx={categoryIconStyle} />}
                sx={categorySelectStyle}
              >
                <MenuItem value={0} disabled>
                  <em>Select category</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <Typography sx={bulletStyle}>•</Typography>

        <TextField
          {...register('salary', { valueAsNumber: true })}
          error={!!errors.salary}
          helperText={errors.salary?.message}
          disabled={disabled}
          placeholder="Salary"
          type="number"
          variant="standard"
          sx={salaryFieldStyle}
          slotProps={{
            input: {
              startAdornment: <Typography sx={salaryAdornmentStyle}>€</Typography>,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default JobOfferFormHeader;
