import type { SxProps, Theme } from '@mui/material';

export const filtersWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

export const filtersGridStyle: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    md: 'repeat(3, minmax(0, 1fr))',
  },
  gap: '1rem',
  alignItems: 'center',
};

export const selectFieldStyle: SxProps<Theme> = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'success.main',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'background.paper',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
  },
};

export const filterTextFieldStyle: SxProps<Theme> = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'success.main',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'background.paper',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
  },
};

export const salarySectionStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

export const salaryControlsRowStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const salarySliderStyle: SxProps<Theme> = {
  px: 0.5,
};

export const combinedSalaryInputStyle: SxProps<Theme> = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'success.main',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'background.paper',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'success.main',
    },
  },
  flex: '1 1 180px',
};
