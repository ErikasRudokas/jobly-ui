import { Add as AddIcon, Work as WorkIcon } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { UpdateUserWorkExperience } from '../../common/types/profile.types';
import AppButton from '../AppButton/AppButton';
import {
  deletedItemCardStyle,
  emptyStateStyle,
  fieldLabelStyle,
  fieldLabelWithIconStyle,
  formContainerStyle,
  itemCardStyle,
  itemsListStyle,
  textFieldStyle,
} from './styles';
import DurationField from '../DurationField/DurationField';
import FormItemActionControls from './FormItemActionControls';

interface FieldError {
  message: string;
}

interface WorkExperienceFormProps {
  workExperience: UpdateUserWorkExperience[];
  onWorkExperienceChange: (workExperience: UpdateUserWorkExperience[]) => void;
  disabled?: boolean;
  errors?: Record<number, Record<string, FieldError>>;
  originalWorkExperience?: UpdateUserWorkExperience[];
}

const WorkExperienceForm = ({
  workExperience,
  onWorkExperienceChange,
  disabled = false,
  errors = {},
  originalWorkExperience = [],
}: WorkExperienceFormProps) => {
  const isItemModified = (item: UpdateUserWorkExperience): boolean => {
    if (item.isNew) return false;
    const original = originalWorkExperience.find((o) => o.id === item.id);
    if (!original) return false;

    return (
      original.companyName !== item.companyName ||
      original.designation !== item.designation ||
      original.startDate !== item.startDate ||
      original.endDate !== item.endDate
    );
  };

  const handleAdd = () => {
    const newItem: UpdateUserWorkExperience = {
      id: Date.now(),
      companyName: '',
      designation: '',
      startDate: '',
      endDate: '',
      isNew: true,
    };
    onWorkExperienceChange([...workExperience, newItem]);
  };

  const handleRemove = (id: number) => {
    const item = workExperience.find((we) => we.id === id);
    if (item?.isNew) {
      onWorkExperienceChange(workExperience.filter((we) => we.id !== id));
    } else {
      onWorkExperienceChange(workExperience.map((we) => (we.id === id ? { ...we, delete: !we.delete } : we)));
    }
  };

  const handleChange = (id: number, field: keyof UpdateUserWorkExperience, value: string | Dayjs | null) => {
    let finalValue: string | null = null;

    if (value === null) {
      finalValue = null;
    } else if (typeof value === 'string') {
      finalValue = value;
    } else if (dayjs.isDayjs(value)) {
      finalValue = value.startOf('day').toISOString();
    }

    onWorkExperienceChange(workExperience.map((we) => (we.id === id ? { ...we, [field]: finalValue } : we)));
  };

  if (workExperience.length === 0) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={formContainerStyle}>
          <Box sx={emptyStateStyle}>
            <Typography>No work experience added yet.</Typography>
          </Box>
          <AppButton variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} disabled={disabled}>
            Add Work Experience
          </AppButton>
        </Box>
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={formContainerStyle}>
        <Box sx={itemsListStyle}>
          {workExperience.map((item, index) => {
            const isMarkedForDeletion = item.delete && !item.isNew;
            const isModified = isItemModified(item);
            const itemErrors = errors[index] || {};

            return (
              <Box key={item.id} sx={isMarkedForDeletion ? deletedItemCardStyle : itemCardStyle}>
                <FormItemActionControls
                  isNew={item.isNew || false}
                  isModified={isModified}
                  isMarkedForDeletion={isMarkedForDeletion || false}
                  onRemove={() => handleRemove(item.id)}
                  disabled={disabled}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Box>
                    <Box sx={fieldLabelWithIconStyle}>
                      <WorkIcon sx={{ fontSize: '1.1rem', color: 'primary.main' }} />
                      <Typography sx={fieldLabelStyle}>Position</Typography>
                    </Box>
                    <TextField
                      placeholder="e.g., Senior Software Engineer"
                      value={item.designation ?? ''}
                      onChange={(e) => handleChange(item.id, 'designation', e.target.value)}
                      disabled={disabled || item.delete}
                      error={!!itemErrors.designation}
                      helperText={itemErrors.designation?.message}
                      fullWidth
                      required
                      size="small"
                      sx={textFieldStyle}
                    />
                  </Box>

                  <Box>
                    <Typography sx={fieldLabelStyle}>Company</Typography>
                    <TextField
                      placeholder="e.g., Google Inc."
                      value={item.companyName ?? ''}
                      onChange={(e) => handleChange(item.id, 'companyName', e.target.value)}
                      disabled={disabled || item.delete}
                      error={!!itemErrors.companyName}
                      helperText={itemErrors.companyName?.message}
                      fullWidth
                      required
                      size="small"
                      sx={textFieldStyle}
                    />
                  </Box>

                  <DurationField
                    startDate={item.startDate}
                    endDate={item.endDate ?? null}
                    onStartDateChange={(newValue: Dayjs | null) => handleChange(item.id, 'startDate', newValue)}
                    onEndDateChange={(newValue: Dayjs | null) => handleChange(item.id, 'endDate', newValue)}
                    disabled={disabled || item.delete}
                    errors={{
                      startDate: itemErrors.startDate,
                      endDate: itemErrors.endDate,
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <AppButton variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} disabled={disabled}>
          Add Work Experience
        </AppButton>
      </Box>
    </LocalizationProvider>
  );
};

export default WorkExperienceForm;
