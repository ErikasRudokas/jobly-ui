import type { SxProps, Theme } from '@mui/material';

export const searchFieldStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontSize: '1rem',
    backgroundColor: 'background.paper',
    transition: 'box-shadow 0.2s ease',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 3px rgba(12, 170, 65, 0.15)',
    },
  },
  '& .MuiInputAdornment-root svg': {
    color: 'text.secondary',
    transition: 'color 0.2s ease',
  },
  '&:focus-within .MuiInputAdornment-root svg': {
    color: 'primary.main',
  },
};
