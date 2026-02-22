import { Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { durationGridStyle, durationSeparatorStyle, durationTextFieldStyle } from './styles.ts';

interface FieldError {
  message: string;
}

interface DurationFieldProps {
  startDate: string | null;
  endDate: string | null;
  onStartDateChange: (value: Dayjs | null) => void;
  onEndDateChange: (value: Dayjs | null) => void;
  disabled?: boolean;
  errors?: {
    startDate?: FieldError;
    endDate?: FieldError;
  };
}

const DurationField = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disabled = false,
  errors = {},
}: DurationFieldProps) => {
  return (
    <Box>
      <Typography sx={durationTextFieldStyle}>Duration</Typography>
      <Box sx={durationGridStyle}>
        <DatePicker
          label="Start Date"
          value={startDate ? dayjs(startDate) : null}
          onChange={onStartDateChange}
          disabled={disabled}
          views={['year', 'month']}
          format="MMM YYYY"
          slotProps={{
            textField: {
              size: 'small',
              required: true,
              error: !!errors.startDate,
              helperText: errors.startDate?.message,
              fullWidth: true,
              sx: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.default',
                },
              },
            },
          }}
        />
        <Typography sx={durationSeparatorStyle}>to</Typography>
        <DatePicker
          label="End Date"
          value={endDate ? dayjs(endDate) : null}
          onChange={onEndDateChange}
          disabled={disabled}
          minDate={startDate ? dayjs(startDate) : undefined}
          views={['year', 'month']}
          format="MMM YYYY"
          slotProps={{
            textField: {
              size: 'small',
              error: !!errors.endDate,
              helperText: errors.endDate?.message,
              placeholder: 'Present',
              fullWidth: true,
              sx: {
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.default',
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DurationField;
