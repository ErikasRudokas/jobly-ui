import type {SxProps, Theme} from '@mui/material';

export const containerStyle: SxProps<Theme> = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: { xs: '1rem', md: '2rem' },
    marginTop: { xs: '3rem', md: '4rem' },
};

export const topActionsRowStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
};

export const paperStyle: SxProps<Theme> = {
    padding: { xs: '2rem', md: '3rem' },
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: '#ffffff',
    marginBottom: '2rem',
};

export const applicationStatusBadgeStyle = (status: string): SxProps<Theme> => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor:
        status === 'APPROVED' ? 'rgba(46, 125, 50, 0.08)' :
        status === 'REJECTED' ? 'rgba(211, 47, 47, 0.08)' :
        'rgba(0, 0, 0, 0.06)',
    color:
        status === 'APPROVED' ? '#2e7d32' :
        status === 'REJECTED' ? '#d32f2f' :
        'text.secondary',
    border: '1px solid',
    borderColor:
        status === 'APPROVED' ? 'rgba(46, 125, 50, 0.2)' :
        status === 'REJECTED' ? 'rgba(211, 47, 47, 0.2)' :
        'rgba(0, 0, 0, 0.12)',
});

export const sectionStyle: SxProps<Theme> = {
    marginBottom: '2rem',
};

export const sectionTitleStyle: SxProps<Theme> = {
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'text.primary',
};

export const descriptionTextStyle: SxProps<Theme> = {
    color: 'text.secondary',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
};

export const contactBoxStyle: SxProps<Theme> = {
    padding: '1.5rem',
    backgroundColor: 'grey.50',
    borderRadius: '8px',
    marginTop: '1rem',
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