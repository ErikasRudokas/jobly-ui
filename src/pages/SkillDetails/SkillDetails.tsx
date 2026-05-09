import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useSkills } from '../../common/hooks/useSkills';
import type { Skill } from '../../common/types/skill.types';
import { ROUTES } from '../../common/constants/routes';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import {
  actionButtonsStyle,
  aliasEmptyStyle,
  aliasListStyle,
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

const formatSkillType = (type: Skill['type']) => (type === 'TECHNICAL' ? 'Technical' : 'Soft');

const SkillDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSkillById, deleteSkill, loading, error } = useSkills();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const numericId = useMemo(() => (id ? Number(id) : NaN), [id]);

  useEffect(() => {
    const loadSkill = async () => {
      if (!Number.isFinite(numericId)) return;
      const data = await getSkillById(numericId);
      if (data) {
        setSkill(data);
      }
    };
    loadSkill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  const handleBack = () => {
    navigate(ROUTES.SKILLS);
  };

  const handleEdit = () => {
    if (!Number.isFinite(numericId)) return;
    navigate(ROUTES.SKILL_EDIT(numericId));
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!Number.isFinite(numericId)) return;
    const success = await deleteSkill(numericId);
    if (success) {
      navigate(ROUTES.SKILLS);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  if (loading && !skill) {
    return (
      <Box sx={loadingBoxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  if (!skill && !loading) {
    return (
      <Box sx={containerStyle}>
        <Alert severity="error">Skill not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <BackButton label="Back to Skills" onClick={handleBack} />
        <Box sx={actionButtonsStyle}>
          <AppButton startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </AppButton>
          <AppButton variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
            Delete
          </AppButton>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error}
        </Alert>
      )}

      <Box sx={headerSectionStyle}>
        <Typography variant="h4" sx={titleStyle}>
          Skill Details
        </Typography>
      </Box>

      <Paper sx={detailsCardStyle}>
        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            ID
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {skill?.id}
          </Typography>
        </Box>

        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Name
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {skill?.name}
          </Typography>
        </Box>

        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Description
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {skill?.description}
          </Typography>
        </Box>

        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Type
          </Typography>
          <Typography variant="body1" sx={detailValueStyle}>
            {skill?.type ? formatSkillType(skill.type) : ''}
          </Typography>
        </Box>

        <Box sx={detailRowStyle}>
          <Typography variant="body2" sx={detailLabelStyle}>
            Aliases
          </Typography>
          {skill?.aliases && skill.aliases.length > 0 ? (
            <Box sx={aliasListStyle}>
              {skill.aliases.map((alias) => (
                <Chip key={alias.id} label={alias.value} size="small" variant="outlined" />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={aliasEmptyStyle}>
              No aliases added
            </Typography>
          )}
        </Box>
      </Paper>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Delete Skill"
        description={`Are you sure you want to delete the skill "${skill?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Box>
  );
};

export default SkillDetails;
