import type { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { xs: '1rem', md: '2rem' },
  marginTop: { xs: '5rem', md: '6rem' },
};

export const headerSectionStyle: SxProps<Theme> = {
  marginBottom: '2rem',
};

export const titleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
  marginBottom: '0.5rem',
};

export const subtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
};

export const errorAlertStyle: SxProps<Theme> = {
  marginBottom: '2rem',
};

export const loadingBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
};

export const controlsRowStyle: SxProps<Theme> = {
  marginBottom: '1.5rem',
};

export const searchFieldStyle: SxProps<Theme> = {
  width: '100%',
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

export const paginationRowStyle: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5rem',
};

export const resultsInfoStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 0,
  fontSize: '0.875rem',
  color: 'text.secondary',
  whiteSpace: 'nowrap',
};
