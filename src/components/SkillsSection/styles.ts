import type {SxProps, Theme} from '@mui/material';

export const skillsContainerStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
};

export const skillTypeGroupStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

export const skillTypeHeaderStyle: SxProps<Theme> = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'text.primary',
    letterSpacing: '0.3px',
    marginBottom: '0.5rem',
};

export const skillItemStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

export const skillHeaderStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const skillNameStyle: SxProps<Theme> = {
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'text.primary',
};

export const skillProficiencyStyle: SxProps<Theme> = {
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'text.secondary',
};

export const progressBarStyle: SxProps<Theme> = {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    '& .MuiLinearProgress-bar': {
        borderRadius: '4px',
    },
};

