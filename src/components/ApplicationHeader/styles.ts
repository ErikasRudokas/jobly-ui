import type {SxProps, Theme} from '@mui/material';

export const headerSectionStyle: SxProps<Theme> = {
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.08)',
};

export const jobTitleStyle: SxProps<Theme> = {
    fontWeight: 700,
    color: 'primary.main',
    lineHeight: 1.2,
    fontSize: {xs: '1.75rem', md: '2.25rem'},
};

export const companyRowStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
};

export const companyNameStyle: SxProps<Theme> = {
    fontSize: '1rem',
    color: 'text.primary',
    fontWeight: 600,
};

export const bulletStyle: SxProps<Theme> = {
    color: 'text.secondary',
    fontSize: '0.875rem',
};

export const metaTextStyle: SxProps<Theme> = {
    fontSize: '0.875rem',
    color: 'text.secondary',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
};

export const statusTextStyle = (status: string): SxProps<Theme> => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    color:
        status === 'APPROVED' ? '#2e7d32' :
        status === 'REJECTED' ? '#d32f2f' :
        status === 'WITHDRAWN' ? 'text.secondary' :
        '#0288d1',
});

