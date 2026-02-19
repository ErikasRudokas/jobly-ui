import type {SxProps, Theme} from '@mui/material';

export const skillsContainerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
};

export const progressBarStyle: SxProps<Theme> = {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '& .MuiLinearProgress-bar': {
        borderRadius: '4px',
    },
};

