import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: '1rem', md: '2rem' },
    marginTop: { xs: '3rem', md: '4rem' },
};

export const paperStyle: SxProps<Theme> = {
    padding: { xs: '2rem', md: '3rem' },
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: '#ffffff',
    marginTop: '1rem',
};

export const sectionStyle: SxProps<Theme> = {
    marginBottom: '2.5rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
    fontWeight: 600,
    marginBottom: '1.25rem',
    color: 'text.primary',
    fontSize: '1.25rem',
};

export const descriptionTextStyle: SxProps<Theme> = {
    color: 'text.secondary',
    lineHeight: 1.8,
    whiteSpace: 'pre-wrap',
    fontSize: '1rem',
};

export const contactBoxStyle: SxProps<Theme> = {
    padding: '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
    marginTop: '1rem',
    border: '1px solid',
    borderColor: 'divider',
};

export const contactItemStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    '&:last-child': {
        marginBottom: 0,
    },
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

export const applyButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    fontWeight: 600,
    padding: '0.75rem 1.75rem',
    fontSize: '0.95rem',
    borderRadius: '8px',
    boxShadow: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
    },
};
