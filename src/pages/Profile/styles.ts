import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export { StyledProfileHeader } from '../../components/ProfileHeader/styles';
export { StyledInfoGrid, StyledInfoCard } from '../../components/ProfileInfoCards/styles';
export { StyledTabs, StyledTab, tabPanelStyle } from '../../components/ProfileProfessionalTabs/styles';

export const StyledProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));
