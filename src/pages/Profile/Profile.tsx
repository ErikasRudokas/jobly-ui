import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import { useUserProfile } from '../../common/hooks/useUserProfile';
import { StyledProfilePaper, StyledTab, StyledTabs, tabPanelStyle } from './styles';
import { CVSection } from '../../components/CVSection/CVSection';
import { authService } from '../../common/services/authService';
import { ROLES } from '../../common/constants/roleConstants';
import { userService } from '../../common/services/userService';
import type {
  SaveUserProfileRequest,
  UpdateUserEducation,
  UpdateUserSkill,
  UpdateUserWorkExperience,
} from '../../common/types/profile.types';
import WorkExperienceForm from '../../components/ProfileForms/WorkExperienceForm';
import WorkExperienceView from '../../components/ProfileViews/WorkExperienceView';
import EducationForm from '../../components/ProfileForms/EducationForm';
import EducationView from '../../components/ProfileViews/EducationView';
import EditProfileSkillSection from '../../components/ProfileSkillSection/EditProfileSkillSection';
import ProfileSkillSection from '../../components/ProfileSkillSection/ProfileSkillSection';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import ProfileInfoCards from '../../components/ProfileInfoCards/ProfileInfoCards';
import { createEmptyValidationErrors, validateProfileData, type ValidationErrors } from './profileValidation';
import { loadProfileData, transformProfileResponse } from './profileDataUtils';
import AppButton from '../../components/AppButton/AppButton';

const Profile = () => {
  const { profile, loading, error, refetch } = useUserProfile();
  const isUser = authService.hasRole(ROLES.USER);

  const [activeTab, setActiveTab] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [workExperience, setWorkExperience] = useState<UpdateUserWorkExperience[]>([]);
  const [education, setEducation] = useState<UpdateUserEducation[]>([]);
  const [skills, setSkills] = useState<UpdateUserSkill[]>([]);

  const [originalWorkExperience, setOriginalWorkExperience] = useState<UpdateUserWorkExperience[]>([]);
  const [originalEducation, setOriginalEducation] = useState<UpdateUserEducation[]>([]);
  const [originalSkills, setOriginalSkills] = useState<UpdateUserSkill[]>([]);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(createEmptyValidationErrors());

  const reloadProfileData = async () => {
    try {
      const data = await loadProfileData();

      setWorkExperience(data.workExperience);
      setEducation(data.education);
      setSkills(data.skills);

      setOriginalWorkExperience(JSON.parse(JSON.stringify(data.workExperience)));
      setOriginalEducation(JSON.parse(JSON.stringify(data.education)));
      setOriginalSkills(JSON.parse(JSON.stringify(data.skills)));
    } catch (err) {
      console.error('Failed to load profile data:', err);
    }
  };

  useEffect(() => {
    if (isUser) {
      reloadProfileData();
    }
  }, [isUser]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setSaveError(null);
  };

  const handleCancel = () => {
    reloadProfileData().then(() => {
      setIsEditMode(false);
      setValidationErrors(createEmptyValidationErrors());
      setSaveError(null);
    });
  };

  const handleSave = async () => {
    setSaveError(null);

    const validation = validateProfileData({ workExperience, education, skills });
    setValidationErrors(validation.errors);

    if (!validation.isValid) {
      setSaveError('Please fix validation errors before saving');
      return;
    }

    try {
      setIsSaving(true);

      const requestData: SaveUserProfileRequest = {
        workExperience: workExperience.map((we) => ({
          id: we.isNew ? undefined : we.id,
          delete: we.delete,
          companyName: we.companyName,
          designation: we.designation,
          startDate: we.startDate,
          endDate: we.endDate,
        })),
        education: education.map((e) => ({
          id: e.isNew ? undefined : e.id,
          delete: e.delete,
          institutionName: e.institutionName,
          degree: e.degree,
          startDate: e.startDate,
          endDate: e.endDate,
        })),
        skills: skills.map((s) => ({
          id: s.isNew ? undefined : s.id,
          delete: s.delete,
          proficiencyLevel: s.proficiencyLevel,
          skillId: s.skill.id,
        })),
      };

      const updatedProfile = await userService.saveUserProfile(requestData);
      const transformed = transformProfileResponse(updatedProfile);

      setWorkExperience(transformed.workExperience);
      setEducation(transformed.education);
      setSkills(transformed.skills);

      setIsEditMode(false);
      setValidationErrors(createEmptyValidationErrors());
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setSaveError(error?.response?.data?.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const hasWorkExperienceErrors = useMemo(
    () => Object.keys(validationErrors.workExperience).length > 0,
    [validationErrors.workExperience]
  );
  const hasEducationErrors = useMemo(
    () => Object.keys(validationErrors.education).length > 0,
    [validationErrors.education]
  );
  const hasSkillsErrors = useMemo(() => Object.keys(validationErrors.skills).length > 0, [validationErrors.skills]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ my: 12, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 12 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ my: 12 }}>
        <Alert severity="info">No profile data available</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 12 }}>
      <StyledProfilePaper elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Profile
          </Typography>
          <Tooltip title="Refresh Profile">
            <IconButton onClick={refetch} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <ProfileHeader firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />

        <Divider sx={{ my: 4 }} />

        <ProfileInfoCards
          email={profile.email}
          username={profile.username}
          firstName={profile.firstName}
          lastName={profile.lastName}
        />

        {isUser && (
          <>
            <CVSection
              cvId={profile.cvId}
              onUploadSuccess={() => {
                refetch();
                reloadProfileData();
              }}
            />

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight="bold">
                Professional Profile
              </Typography>
              {!isEditMode ? (
                <AppButton startIcon={<EditIcon />} onClick={handleEdit}>
                  Edit Profile
                </AppButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <AppButton variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </AppButton>
                  <AppButton startIcon={<SaveIcon />} onClick={handleSave} loading={isSaving}>
                    Save Changes
                  </AppButton>
                </Box>
              )}
            </Box>

            {saveError && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSaveError(null)}>
                {saveError}
              </Alert>
            )}

            <StyledTabs value={activeTab} onChange={handleTabChange}>
              <StyledTab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Skills
                    {isEditMode && hasSkillsErrors && <ErrorIcon color="error" fontSize="small" />}
                  </Box>
                }
              />
              <StyledTab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Education
                    {isEditMode && hasEducationErrors && <ErrorIcon color="error" fontSize="small" />}
                  </Box>
                }
              />
              <StyledTab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Work Experience
                    {isEditMode && hasWorkExperienceErrors && <ErrorIcon color="error" fontSize="small" />}
                  </Box>
                }
              />
            </StyledTabs>

            <Box sx={tabPanelStyle}>
              {activeTab === 0 &&
                (isEditMode ? (
                  <EditProfileSkillSection
                    skills={skills}
                    onSkillsChange={setSkills}
                    disabled={isSaving}
                    originalSkills={originalSkills}
                  />
                ) : (
                  <ProfileSkillSection skills={skills} />
                ))}
              {activeTab === 1 &&
                (isEditMode ? (
                  <EducationForm
                    education={education}
                    onEducationChange={setEducation}
                    disabled={isSaving}
                    errors={validationErrors.education}
                    originalEducation={originalEducation}
                  />
                ) : (
                  <EducationView education={education} />
                ))}
              {activeTab === 2 &&
                (isEditMode ? (
                  <WorkExperienceForm
                    workExperience={workExperience}
                    onWorkExperienceChange={setWorkExperience}
                    disabled={isSaving}
                    errors={validationErrors.workExperience}
                    originalWorkExperience={originalWorkExperience}
                  />
                ) : (
                  <WorkExperienceView workExperience={workExperience} />
                ))}
            </Box>
          </>
        )}
      </StyledProfilePaper>
    </Container>
  );
};

export default Profile;
