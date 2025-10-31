import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';

export const StyledCVCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
}));

export const StyledFilePreview = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
}));

export const StyledButtonContainer = styled(Box)({
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
});

