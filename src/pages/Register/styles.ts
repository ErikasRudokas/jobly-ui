import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';

export const StyledRegisterContainer = styled(Box)(({theme}) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
}));

export const StyledFormBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));