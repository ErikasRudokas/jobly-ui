import {styled} from '@mui/material/styles';
import type {SxProps, Theme} from '@mui/material';
import {Box, Paper, Tab, Tabs} from '@mui/material';

export const StyledProfilePaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
    },
}));

export const StyledProfileHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        textAlign: 'center',
    },
}));

export const StyledInfoGrid = styled(Box)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
}));

export const StyledInfoCard = styled(Box)(({theme}) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
}));

export const StyledTabs = styled(Tabs)(({theme}) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
    width: '100%',
    '& .MuiTabs-flexContainer': {
        width: '100%',
    },
}));

export const StyledTab = styled(Tab)(() => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    flex: 1,
    maxWidth: 'none',
}));

export const tabPanelStyle: SxProps<Theme> = {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
};

