import type { SxProps, Theme } from '@mui/material';

export const backButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  color: 'text.secondary',
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};
