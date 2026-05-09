import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useSkills } from '../../common/hooks/useSkills';
import type { Skill, SkillAliasUpdateRequest } from '../../common/types/skill.types';
import { ROUTES } from '../../common/constants/routes';
import { type SkillEditFormData, skillEditSchema } from '../Skills/skillSchema';
import BackButton from '../../components/BackButton/BackButton';
import AppButton from '../../components/AppButton/AppButton';
import {
  aliasEmptyStyle,
  aliasesHeaderStyle,
  aliasRowStyle,
  buttonGroupStyle,
  containerStyle,
  errorAlertStyle,
  formCardStyle,
  formFieldStyle,
} from '../CreateSkill/styles';
import { deleteCheckboxStyle } from '../../common/styles/styles.skills';

const EditSkill = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSkillById, updateSkill, loading, error } = useSkills();
  const [apiError, setApiError] = useState<string | null>(null);
  const [skill, setSkill] = useState<Skill | null>(null);

  const numericId = useMemo(() => (id ? Number(id) : NaN), [id]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SkillEditFormData>({
    resolver: zodResolver(skillEditSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'TECHNICAL',
      aliases: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'aliases',
    keyName: 'fieldId',
  });

  const watchedAliases = watch('aliases');

  const existingAliases = (watchedAliases ?? []).filter((alias) => alias?.id);
  const hasNewAliases = (watchedAliases ?? []).some((alias) => !alias?.id && alias?.value?.trim().length);
  const allExistingMarkedForDeletion =
    existingAliases.length > 0 && existingAliases.every((alias) => Boolean(alias?.delete)) && !hasNewAliases;

  useEffect(() => {
    const loadSkill = async () => {
      if (!Number.isFinite(numericId)) return;
      const data = await getSkillById(numericId);
      if (data) {
        setSkill(data);
        reset({
          name: data.name,
          description: data.description,
          type: data.type,
          aliases: data.aliases?.map((alias) => ({ id: alias.id, value: alias.value, delete: false })) ?? [],
        });
      }
    };
    loadSkill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  const handleBack = () => {
    if (!Number.isFinite(numericId)) return;
    navigate(ROUTES.SKILL_DETAILS(numericId));
  };

  const handleAddAlias = () => {
    append({ value: '' });
  };

  const handleRemoveAlias = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: SkillEditFormData) => {
    if (!Number.isFinite(numericId)) return;
    setApiError(null);

    const trimmedAliases =
      data.aliases?.map((alias) => ({ id: alias.id, value: alias.value.trim(), delete: alias.delete })) ?? [];

    const aliasPayload: SkillAliasUpdateRequest[] = [];

    trimmedAliases.forEach((alias) => {
      if (alias.id && alias.delete) {
        aliasPayload.push({ id: alias.id, delete: true });
        return;
      }
      if (alias.id) {
        aliasPayload.push({ id: alias.id, value: alias.value });
        return;
      }
      if (alias.value.length > 0) {
        aliasPayload.push({ value: alias.value });
      }
    });

    const result = await updateSkill(numericId, {
      name: data.name.trim(),
      description: data.description.trim(),
      type: data.type,
      aliases: aliasPayload.length > 0 ? aliasPayload : undefined,
    });

    if (result) {
      navigate(ROUTES.SKILL_DETAILS(numericId));
    } else if (error) {
      setApiError(error);
    }
  };

  const handleCancel = () => {
    if (!Number.isFinite(numericId)) return;
    navigate(ROUTES.SKILL_DETAILS(numericId));
  };

  if (loading && !skill) {
    return (
      <Box sx={containerStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (!skill && !loading) {
    return (
      <Box sx={containerStyle}>
        <Alert severity="error" sx={errorAlertStyle}>
          Skill not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={containerStyle}>
      <BackButton label="Back to Skill Details" onClick={handleBack} />

      {(error || apiError) && (
        <Alert severity="error" sx={errorAlertStyle}>
          {error || apiError}
        </Alert>
      )}

      <Paper sx={formCardStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={formFieldStyle}>
            <TextField
              fullWidth
              label="Skill Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              disabled={loading}
            />
          </Box>

          <Box sx={formFieldStyle}>
            <TextField
              fullWidth
              label="Description"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
              multiline
              rows={4}
              disabled={loading}
            />
          </Box>

          <Box sx={formFieldStyle}>
            <FormControl fullWidth size="medium" disabled={loading} error={!!errors.type}>
              <InputLabel id="skill-type-label">Type</InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select labelId="skill-type-label" label="Type" {...field}>
                    <MenuItem value="TECHNICAL">Technical</MenuItem>
                    <MenuItem value="SOFT">Soft</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box sx={formFieldStyle}>
            <Box sx={aliasesHeaderStyle}>
              <Typography variant="subtitle1">Aliases</Typography>
              <AppButton variant="outlined" startIcon={<AddIcon />} onClick={handleAddAlias} disabled={loading}>
                Add Alias
              </AppButton>
            </Box>

            {fields.length === 0 ? (
              <Typography sx={aliasEmptyStyle}>No aliases added</Typography>
            ) : (
              fields.map((field, index) => {
                const isExisting = Boolean(watchedAliases?.[index]?.id);
                const isDeleted = Boolean(watchedAliases?.[index]?.delete);
                return (
                  <Box key={field.fieldId} sx={aliasRowStyle}>
                    <TextField
                      fullWidth
                      label={`Alias ${index + 1}`}
                      {...register(`aliases.${index}.value`)}
                      error={!!errors.aliases?.[index]?.value}
                      helperText={errors.aliases?.[index]?.value?.message}
                      disabled={loading || isDeleted}
                    />
                    {isExisting ? (
                      <Tooltip title={isDeleted ? 'Unmark deletion' : 'Mark for deletion'} arrow>
                        <Checkbox
                          {...register(`aliases.${index}.delete`)}
                          disabled={loading}
                          size="small"
                          sx={deleteCheckboxStyle}
                        />
                      </Tooltip>
                    ) : (
                      <IconButton
                        aria-label="Remove alias"
                        onClick={() => handleRemoveAlias(index)}
                        disabled={loading}
                        color="default"
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Box>
                );
              })
            )}

            {allExistingMarkedForDeletion && (
              <Alert severity="info" sx={{ mt: 1 }}>
                All existing aliases are marked for removal. After deletion, a skill alias matching the skill name will
                be readded.
              </Alert>
            )}
          </Box>

          <Box sx={buttonGroupStyle}>
            <AppButton type="submit" loading={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </AppButton>
            <AppButton variant="outlined" onClick={handleCancel} disabled={loading}>
              Cancel
            </AppButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditSkill;
