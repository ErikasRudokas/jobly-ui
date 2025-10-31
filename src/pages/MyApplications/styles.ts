import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    marginTop: '6rem',
};

export const backButtonStyle: SxProps<Theme> = {
    marginBottom: '2rem',
    textTransform: 'none',
};

export const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    marginBottom: '2rem',
    color: 'text.primary',
};

export const emptyStateStyle: SxProps<Theme> = {
    textAlign: 'center',
    padding: '4rem 2rem',
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

export const applicationCardStyle: SxProps<Theme> = {
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        transform: 'translateY(-2px)',
    },
};

export const cardHeaderStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
};

export const jobTitleStyle: SxProps<Theme> = {
    fontWeight: 600,
    color: 'primary.main',
    marginBottom: '0.25rem',
};

export const companyNameStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontSize: '0.95rem',
};

export const statusChipStyle: SxProps<Theme> = {
    fontWeight: 600,
    fontSize: '0.9rem',
};

export const jobDetailsRowStyle: SxProps<Theme> = {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '0.75rem',
};

export const jobDetailItemStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'text.secondary',
    fontSize: '0.9rem',
};

export const categoryChipStyle: SxProps<Theme> = {
    borderRadius: '4px',
};

export const updatedDateStyle: SxProps<Theme> = {
    fontSize: '0.85rem',
    color: 'text.secondary',
    marginTop: '0.5rem',
};

