import { Box, Typography } from '@mui/material';
import type { MyApplicationListObject } from '../../common/types/application.types';
import MyApplicationCard from '../MyApplicationCard/MyApplicationCard';
import { emptyStateStyle } from './styles';

interface MyApplicationListProps {
  applications: MyApplicationListObject[];
  onApplicationClick: (id: number) => void;
  emptyMessage?: string;
  emptySubMessage?: string;
}

const MyApplicationList = ({
  applications,
  onApplicationClick,
  emptyMessage = 'No applications yet',
  emptySubMessage = 'Browse job offers and apply to start your journey',
}: MyApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <Box sx={emptyStateStyle}>
        <Typography variant="h6">{emptyMessage}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {emptySubMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {applications.map((application) => (
        <MyApplicationCard key={application.id} application={application} onClick={onApplicationClick} />
      ))}
    </Box>
  );
};

export default MyApplicationList;
