import type { SxProps, Theme } from '@mui/material';

export const headerContainerStyle: SxProps<Theme> = {
  marginBottom: '2rem',
  paddingBottom: '2rem',
  borderBottom: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.08)',
};

export const titleFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    fontSize: { xs: '1.75rem', md: '2.25rem' },
    fontWeight: 700,
    color: 'primary.main',
    lineHeight: 1.2,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'primary.main',
  },
  marginBottom: '1rem',
};

export const companyFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'text.primary',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  marginBottom: '1rem',
};

export const metaRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
};

export const categoryFormControlStyle: SxProps<Theme> = {
  minWidth: 150,
};

export const categorySelectStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

export const categoryIconStyle: SxProps<Theme> = {
  fontSize: '1rem',
  color: 'primary.main',
  mr: 0.5,
};

export const bulletStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
};

export const salaryFieldStyle: SxProps<Theme> = {
  width: 130,
  '& .MuiInputBase-root': {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'text.primary',
  },
  '& input::placeholder': {
    fontSize: '1rem',
    fontWeight: 700,
  },
};

export const salaryAdornmentStyle: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  mr: 0.5,
};

export const sectionContainerStyle: SxProps<Theme> = {
  marginBottom: '2.5rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
  fontWeight: 600,
  marginBottom: '1.25rem',
  color: 'text.primary',
  fontSize: '1.25rem',
};

export const descriptionFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    fontSize: '1rem',
    lineHeight: 1.8,
  },
};

export const detailsGridStyle: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: '1rem',
};

export const detailItemStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  padding: '1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
};

export const detailIconStyle: SxProps<Theme> = {
  fontSize: '1.25rem',
  color: 'primary.main',
  marginTop: '0.25rem',
};

export const detailInnerBoxStyle: SxProps<Theme> = {
  flex: 1,
};

export const detailLabelStyle: SxProps<Theme> = {
  fontSize: '0.7rem',
  color: 'text.secondary',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '0.25rem',
};

export const detailSelectStyle: SxProps<Theme> = {
  fontSize: '0.9rem',
  fontWeight: 600,
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid',
  },
};

export const detailFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: '1px solid',
  },
};

export const experienceAdornmentStyle: SxProps<Theme> = {
  fontSize: '0.9rem',
  fontWeight: 600,
  ml: 0.5,
};

export const contactBoxStyle: SxProps<Theme> = {
  padding: '1.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export const contactItemStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

export const contactIconStyle: SxProps<Theme> = {
  color: 'primary.main',
  fontSize: '1.25rem',
};

export const contactFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    fontSize: '0.95rem',
  },
};
