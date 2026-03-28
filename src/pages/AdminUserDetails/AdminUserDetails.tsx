import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AppDialog from '../../components/AppDialog/AppDialog';
import AppButton from '../../components/AppButton/AppButton';
import BackButton from '../../components/BackButton/BackButton';
import ReadOnlyDialog from '../../components/ReadOnlyDialog/ReadOnlyDialog';
import { useAdminUsers } from '../../common/hooks/useAdminUsers';
import type { AdminUserActionType, AdminUserDetailsResponse } from '../../common/types/adminUser.types';
import { ROUTES } from '../../common/constants/routes';
import {
  actionListStyle,
  containerStyle,
  detailLabelStyle,
  detailRowStyle,
  detailsCardStyle,
  detailValueStyle,
  errorAlertStyle,
  headerSectionStyle,
  loadingBoxStyle,
  titleStyle,
} from './styles';

const formatRole = (role: string) => role.replace(/_/g, ' ').toLowerCase();
const COMMENT_PREVIEW_LIMIT = 120;

const truncateText = (value: string, limit: number) => {
  if (value.length <= limit) return { text: value, isTruncated: false };
  return { text: `${value.slice(0, limit)}...`, isTruncated: true };
};

const AdminUserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getAdminUserDetails, loading, error, manageAdminUserStatus } = useAdminUsers();
  const [details, setDetails] = useState<AdminUserDetailsResponse | null>(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusAction, setStatusAction] = useState<AdminUserActionType>('SUSPEND');
  const [statusComment, setStatusComment] = useState('');
  const [statusError, setStatusError] = useState('');
  const [isStatusSaving, setIsStatusSaving] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentDialogTitle, setCommentDialogTitle] = useState('');
  const [commentDialogContent, setCommentDialogContent] = useState('');

  const loadDetails = async (targetId: string | undefined) => {
    if (!targetId) return;
    const response = await getAdminUserDetails(Number(targetId));
    if (response) {
      setDetails(response);
    }
  };

  useEffect(() => {
    loadDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const openStatusDialog = () => {
    if (!details) return;
    setStatusAction(details.user.suspended ? 'RESTORE' : 'SUSPEND');
    setStatusComment('');
    setStatusError('');
    setIsStatusDialogOpen(true);
  };

  const handleStatusConfirm = async () => {
    if (!id) return;
    const trimmedComment = statusComment.trim();
    if (!trimmedComment) {
      setStatusError('Please provide a comment.');
      return;
    }
    if (trimmedComment.length > 1000) {
      setStatusError('Comment must be 1000 characters or less.');
      return;
    }

    setIsStatusSaving(true);
    const success = await manageAdminUserStatus(Number(id), {
      action: statusAction,
      comment: trimmedComment,
    });
    setIsStatusSaving(false);

    if (success) {
      setIsStatusDialogOpen(false);
      await loadDetails(id);
    }
  };

  const handleBack = () => {
    navigate(`${ROUTES.ADMIN_USERS}${location.search}`);
  };

  const openCommentDialog = (title: string, content: string) => {
    setCommentDialogTitle(title);
    setCommentDialogContent(content);
    setIsCommentDialogOpen(true);
  };

  if (loading && !details) {
    return (
      <Box sx={loadingBoxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  if (!details && !loading) {
    return (
      <Box sx={containerStyle}>
        <Alert severity="error">User not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <BackButton label="Back to Users" onClick={handleBack} />
      </Box>

      {error && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error}
        </Alert>
      )}

      <Box sx={headerSectionStyle}>
        <Typography variant="h4" sx={titleStyle}>
          User Details
        </Typography>
        <AppButton color={details?.user.suspended ? 'success' : 'error'} onClick={openStatusDialog}>
          {details?.user.suspended ? 'Restore User' : 'Suspend User'}
        </AppButton>
      </Box>

      <Paper sx={detailsCardStyle}>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            ID
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {details?.user.id}
          </Typography>
        </Box>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Name
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {details?.user.firstName} {details?.user.lastName}
          </Typography>
        </Box>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Username
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {details?.user.username}
          </Typography>
        </Box>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Email
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {details?.user.email}
          </Typography>
        </Box>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Role
          </Typography>
          <Typography variant="body1" sx={{ ...detailValueStyle, textTransform: 'capitalize' }}>
            {details?.user.role ? formatRole(details.user.role) : 'Unknown'}
          </Typography>
        </Box>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Status
          </Typography>
          <Chip
            label={details?.user.suspended ? 'Suspended' : 'Active'}
            color={details?.user.suspended ? 'error' : 'success'}
            size="small"
            variant="outlined"
          />
        </Box>
      </Paper>

      <Box sx={headerSectionStyle}>
        <Typography variant="h5" sx={titleStyle}>
          Admin Actions
        </Typography>
      </Box>

      {details?.actions.length ? (
        <TableContainer component={Paper} sx={actionListStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Action</strong>
                </TableCell>
                <TableCell>
                  <strong>Comment</strong>
                </TableCell>
                <TableCell>
                  <strong>Performed By</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.actions.map((action) => {
                const comment = action.comment?.trim() || '—';
                const { text, isTruncated } = truncateText(comment, COMMENT_PREVIEW_LIMIT);
                return (
                  <TableRow key={action.id} hover>
                    <TableCell>{action.action}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                          {text}
                        </Typography>
                        {isTruncated && (
                          <Button size="small" onClick={() => openCommentDialog('Admin Action Comment', comment)}>
                            View
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {action.performedBy.firstName} {action.performedBy.lastName} (@{action.performedBy.username})
                    </TableCell>
                    <TableCell>{new Date(action.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={actionListStyle}>
          <Typography color="text.secondary" align="center">
            No admin actions recorded yet
          </Typography>
        </Paper>
      )}

      <ReadOnlyDialog
        open={isCommentDialogOpen}
        title={commentDialogTitle}
        content={commentDialogContent}
        onClose={() => setIsCommentDialogOpen(false)}
      />

      <AppDialog
        open={isStatusDialogOpen}
        title={statusAction === 'SUSPEND' ? 'Suspend User' : 'Restore User'}
        onClose={() => setIsStatusDialogOpen(false)}
        actions={[
          {
            label: 'Cancel',
            onClick: () => setIsStatusDialogOpen(false),
            variant: 'outlined',
            disabled: isStatusSaving,
          },
          {
            label: statusAction === 'SUSPEND' ? 'Suspend' : 'Restore',
            onClick: handleStatusConfirm,
            variant: 'contained',
            color: statusAction === 'SUSPEND' ? 'error' : 'success',
            disabled: isStatusSaving,
          },
        ]}
        maxWidth="sm"
        fullWidth
      >
        <Typography sx={{ mb: 2 }}>
          {statusAction === 'SUSPEND'
            ? 'Suspending this user will prevent them from logging in.'
            : 'Restoring this user will allow them to log in again.'}
        </Typography>
        <TextField
          label="Comment"
          value={statusComment}
          onChange={(event) => {
            setStatusComment(event.target.value);
            if (statusError) setStatusError('');
          }}
          error={Boolean(statusError)}
          helperText={statusError || `${statusComment.length}/1000`}
          fullWidth
          multiline
          minRows={3}
          inputProps={{ maxLength: 1000 }}
          disabled={isStatusSaving}
        />
      </AppDialog>
    </Box>
  );
};

export default AdminUserDetails;
