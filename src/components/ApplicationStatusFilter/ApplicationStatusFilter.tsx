import type React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { ApplicationStatus } from '../../common/types/application.types';
import { containerStyle, statusToggleButtonStyle, type StatusToggleColors, statusToggleGroupStyle } from './styles';

const STATUS_OPTIONS: { label: string; value: ApplicationStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Accepted', value: 'ACCEPTED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Withdrawn', value: 'WITHDRAWN' },
];

const STATUS_COLORS: Record<ApplicationStatus | 'ALL', StatusToggleColors> = {
  ALL: { bg: 'rgba(12, 170, 65, 0.08)', color: '#0a8734', borderColor: 'rgba(12, 170, 65, 0.3)' },
  PENDING: { bg: 'rgba(2, 136, 209, 0.08)', color: '#0288d1', borderColor: 'rgba(2, 136, 209, 0.2)' },
  ACCEPTED: { bg: 'rgba(46, 125, 50, 0.08)', color: '#2e7d32', borderColor: 'rgba(46, 125, 50, 0.2)' },
  REJECTED: { bg: 'rgba(211, 47, 47, 0.08)', color: '#d32f2f', borderColor: 'rgba(211, 47, 47, 0.2)' },
  WITHDRAWN: { bg: 'rgba(0, 0, 0, 0.06)', color: '#6b7280', borderColor: 'rgba(0, 0, 0, 0.12)' },
};

interface ApplicationStatusFilterProps {
  value: ApplicationStatus | 'ALL';
  onChange: (value: ApplicationStatus | 'ALL') => void;
  includeWithdrawn?: boolean;
}

const ApplicationStatusFilter = ({ value, onChange, includeWithdrawn = true }: ApplicationStatusFilterProps) => {
  const options = includeWithdrawn ? STATUS_OPTIONS : STATUS_OPTIONS.filter((opt) => opt.value !== 'WITHDRAWN');

  const handleChange = (_: React.MouseEvent<HTMLElement>, nextValue: ApplicationStatus | 'ALL' | null) => {
    if (nextValue === null) return;
    onChange(nextValue);
  };

  return (
    <Box sx={containerStyle}>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange} sx={statusToggleGroupStyle}>
        {options.map((opt) => {
          const colors = STATUS_COLORS[opt.value];
          return (
            <ToggleButton key={opt.value} value={opt.value} sx={statusToggleButtonStyle(value === opt.value, colors)}>
              {opt.label}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ApplicationStatusFilter;
