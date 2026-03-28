import { Typography } from '@mui/material';
import AppDialog from '../AppDialog/AppDialog';

interface ReadOnlyDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const ReadOnlyDialog = ({ open, title, content, onClose }: ReadOnlyDialogProps) => {
  return (
    <AppDialog
      open={open}
      title={title}
      onClose={onClose}
      actions={[
        {
          label: 'Close',
          onClick: onClose,
          variant: 'contained',
        },
      ]}
      maxWidth="sm"
      fullWidth
    >
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {content}
      </Typography>
    </AppDialog>
  );
};

export default ReadOnlyDialog;
