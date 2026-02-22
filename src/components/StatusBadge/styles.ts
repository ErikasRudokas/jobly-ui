import type { SxProps, Theme } from '@mui/material';
import type { ApplicationStatus } from '../../common/types/application.types';

export const statusBadgeStyle = (status: ApplicationStatus): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.25rem 0.65rem',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  flexShrink: 0,
  backgroundColor:
    status === 'APPROVED'
      ? 'rgba(46, 125, 50, 0.08)'
      : status === 'REJECTED'
        ? 'rgba(211, 47, 47, 0.08)'
        : status === 'WITHDRAWN'
          ? 'rgba(0, 0, 0, 0.06)'
          : 'rgba(2, 136, 209, 0.08)',
  color:
    status === 'APPROVED'
      ? '#2e7d32'
      : status === 'REJECTED'
        ? '#d32f2f'
        : status === 'WITHDRAWN'
          ? '#6b7280'
          : '#0288d1',
  border: '1px solid',
  borderColor:
    status === 'APPROVED'
      ? 'rgba(46, 125, 50, 0.2)'
      : status === 'REJECTED'
        ? 'rgba(211, 47, 47, 0.2)'
        : status === 'WITHDRAWN'
          ? 'rgba(0, 0, 0, 0.12)'
          : 'rgba(2, 136, 209, 0.2)',
});
