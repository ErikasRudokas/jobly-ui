import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useSkills } from '../../common/hooks/useSkills';
import { ROUTES } from '../../common/constants/routes';
import { type SkillCreateFormData, skillCreateSchema } from '../Skills/skillSchema';
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
} from './styles';

const CreateSkill = () => {
  const navigate = useNavigate();
  const { createSkill, loading, error } = useSkills();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillCreateFormData>({
    resolver: zodResolver(skillCreateSchema),
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
  });

  const handleBack = () => {
    navigate(ROUTES.SKILLS);
  };

  const handleAddAlias = () => {
    append({ value: '' });
  };

  const onSubmit = async (data: SkillCreateFormData) => {
    setApiError(null);

    const aliases =
      data.aliases?.map((alias) => ({ value: alias.value.trim() })).filter((alias) => alias.value.length > 0) ?? [];

    const result = await createSkill({
      name: data.name.trim(),
      description: data.description.trim(),
      type: data.type,
      aliases: aliases.length > 0 ? aliases : undefined,
    });

    if (result) {
      navigate(ROUTES.SKILLS);
    } else if (error) {
      setApiError(error);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.SKILLS);
  };

  return (
    <Box sx={containerStyle}>
      <BackButton label="Back to Skills" onClick={handleBack} />

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
              fields.map((field, index) => (
                <Box key={field.id} sx={aliasRowStyle}>
                  <TextField
                    fullWidth
                    label={`Alias ${index + 1}`}
                    {...register(`aliases.${index}.value`)}
                    error={!!errors.aliases?.[index]?.value}
                    helperText={errors.aliases?.[index]?.value?.message}
                    disabled={loading}
                  />
                  <IconButton
                    aria-label="Remove alias"
                    onClick={() => remove(index)}
                    disabled={loading}
                    color="default"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>

          <Box sx={buttonGroupStyle}>
            <AppButton type="submit" loading={loading}>
              {loading ? 'Creating...' : 'Create Skill'}
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

export default CreateSkill;
