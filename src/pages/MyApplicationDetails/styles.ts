import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: {xs: '1rem', md: '2rem'},
    marginTop: {xs: '3rem', md: '4rem'},
};

export const backButtonStyle: SxProps<Theme> = {
    marginBottom: '2rem',
    textTransform: 'none',
    color: 'text.secondary',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
};

export const topActionsRowStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
};

export const paperStyle: SxProps<Theme> = {
    padding: {xs: '2rem', md: '3rem'},
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: '#ffffff',
};

export const sectionStyle: SxProps<Theme> = {
    marginBottom: '2.5rem',
};

export const editButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
};

export const cancelButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
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

