import type {SxProps, Theme} from '@mui/material';

export const durationTextFieldStyle: SxProps<Theme> = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'text.primary',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

export const durationGridStyle: SxProps<Theme> = {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '0.75rem',
    alignItems: 'start'
};

export const durationSeparatorStyle: SxProps<Theme> = {
    alignSelf: 'center',
    color: 'text.secondary',
    fontSize: '1rem',
    fontWeight: 500,
    paddingTop: '8px'
};

