import type { SxProps, Theme } from '@mui/material';

export const baseButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
};
