import { Add as AddIcon, School as SchoolIcon } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { UpdateUserEducation } from '../../common/types/profile.types';
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

interface EducationFormProps {
  education: UpdateUserEducation[];
  onEducationChange: (education: UpdateUserEducation[]) => void;
  disabled?: boolean;
  errors?: Record<number, Record<string, FieldError>>;
  originalEducation?: UpdateUserEducation[];
}

const EducationForm = ({
  education,
  onEducationChange,
  disabled = false,
  errors = {},
  originalEducation = [],
}: EducationFormProps) => {
  const isItemModified = (item: UpdateUserEducation): boolean => {
    if (item.isNew) return false;
    const original = originalEducation.find((o) => o.id === item.id);
    if (!original) return false;

    return (
      original.institutionName !== item.institutionName ||
      original.degree !== item.degree ||
      original.startDate !== item.startDate ||
      original.endDate !== item.endDate
    );
  };

  const handleAdd = () => {
    const newItem: UpdateUserEducation = {
      id: Date.now(),
      institutionName: '',
      degree: '',
      startDate: '',
      endDate: '',
      isNew: true,
    };
    onEducationChange([...education, newItem]);
  };

  const handleRemove = (id: number) => {
    const item = education.find((e) => e.id === id);
    if (item?.isNew) {
      onEducationChange(education.filter((e) => e.id !== id));
    } else {
      onEducationChange(education.map((e) => (e.id === id ? { ...e, delete: !e.delete } : e)));
    }
  };

  const handleChange = (id: number, field: keyof UpdateUserEducation, value: string | Dayjs | null) => {
    let finalValue: string | null = null;

    if (value === null) {
      finalValue = null;
    } else if (typeof value === 'string') {
      finalValue = value;
    } else if (dayjs.isDayjs(value)) {
      finalValue = value.startOf('day').toISOString();
    }

    onEducationChange(education.map((e) => (e.id === id ? { ...e, [field]: finalValue } : e)));
  };

  if (education.length === 0) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={formContainerStyle}>
          <Box sx={emptyStateStyle}>
            <Typography>No education entries added yet.</Typography>
          </Box>
          <AppButton variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} disabled={disabled}>
            Add Education
          </AppButton>
        </Box>
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={formContainerStyle}>
        <Box sx={itemsListStyle}>
          {education.map((item, index) => {
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
                      <SchoolIcon sx={{ fontSize: '1.1rem', color: 'primary.main' }} />
                      <Typography sx={fieldLabelStyle}>Degree</Typography>
                    </Box>
                    <TextField
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      value={item.degree ?? ''}
                      onChange={(e) => handleChange(item.id, 'degree', e.target.value)}
                      disabled={disabled || item.delete}
                      error={!!itemErrors.degree}
                      helperText={itemErrors.degree?.message}
                      fullWidth
                      required
                      size="small"
                      sx={textFieldStyle}
                    />
                  </Box>

                  <Box>
                    <Typography sx={fieldLabelStyle}>Institution</Typography>
                    <TextField
                      placeholder="e.g., Stanford University"
                      value={item.institutionName ?? ''}
                      onChange={(e) => handleChange(item.id, 'institutionName', e.target.value)}
                      disabled={disabled || item.delete}
                      error={!!itemErrors.institutionName}
                      helperText={itemErrors.institutionName?.message}
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
          Add Education
        </AppButton>
      </Box>
    </LocalizationProvider>
  );
};

export default EducationForm;
