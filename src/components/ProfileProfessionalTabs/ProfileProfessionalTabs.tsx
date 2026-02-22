import { useState } from 'react';
import { Box } from '@mui/material';
import type { UpdateUserEducation, UpdateUserSkill, UpdateUserWorkExperience } from '../../common/types/profile.types';
import ProfileSkillSection from '../ProfileSkillSection/ProfileSkillSection';
import EducationView from '../ProfileViews/EducationView';
import WorkExperienceView from '../ProfileViews/WorkExperienceView';
import { StyledTab, StyledTabs, tabPanelStyle } from './styles';

interface ProfileProfessionalTabsProps {
  skills: UpdateUserSkill[];
  education: UpdateUserEducation[];
  workExperience: UpdateUserWorkExperience[];
}

const ProfileProfessionalTabs = ({ skills, education, workExperience }: ProfileProfessionalTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <StyledTabs value={activeTab} onChange={(_e, v) => setActiveTab(v)}>
        <StyledTab label="Skills" />
        <StyledTab label="Education" />
        <StyledTab label="Work Experience" />
      </StyledTabs>

      <Box sx={tabPanelStyle}>
        {activeTab === 0 && <ProfileSkillSection skills={skills} />}
        {activeTab === 1 && <EducationView education={education} />}
        {activeTab === 2 && <WorkExperienceView workExperience={workExperience} />}
      </Box>
    </>
  );
};

export default ProfileProfessionalTabs;
