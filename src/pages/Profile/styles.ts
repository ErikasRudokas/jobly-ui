import {styled} from '@mui/material/styles';
import {Box, Paper} from '@mui/material';

export const StyledProfilePaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
}));

export const StyledProfileHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
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

