import { Box } from '@mui/material';
import type { ApplicationStatus } from '../../common/types/application.types';
import { statusBadgeStyle } from './styles';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Box sx={statusBadgeStyle(status)}>{status}</Box>;
};

export default StatusBadge;
