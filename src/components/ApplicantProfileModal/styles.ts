import type {SxProps, Theme} from '@mui/material';

export const dialogContentStyle: SxProps<Theme> = {
    px: {xs: 2, md: 4},
    py: 3,
};

export const loadingBoxStyle: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
};
