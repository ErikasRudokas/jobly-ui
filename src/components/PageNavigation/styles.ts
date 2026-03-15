import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
};

export const pageButtonStyle: SxProps<Theme> = {
  minWidth: '2.25rem',
  height: '2.25rem',
  padding: '0',
  borderRadius: '8px',
  color: 'primary.main',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

export const pageInfoStyle: SxProps<Theme> = {
  px: '0.75rem',
  fontSize: '0.875rem',
  color: 'text.secondary',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};
