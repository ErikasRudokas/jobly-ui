import { Box, LinearProgress, Typography } from '@mui/material';
import type { UpdateUserSkill } from '../../common/types/profile.types';
import {
  emptyStateStyle,
  skillHeaderStyle,
  skillItemStyle,
  skillNameStyle,
  skillProficiencyStyle,
  skillsListContainerStyle,
  skillTypeGroupStyle,
  skillTypeHeaderStyle,
} from '../../common/styles/styles.skills';
import { formatProficiency, getProficiencyValue } from '../../common/utils/skillProficiencyUtils';
import { containerStyle } from './styles.ts';

interface ProfileSkillSectionProps {
  skills: UpdateUserSkill[];
}

const ProfileSkillSection = ({ skills }: ProfileSkillSectionProps) => {
  const groupSkillsByType = (skillList: UpdateUserSkill[]) => {
    const technical = skillList.filter((s) => s.skill.type === 'TECHNICAL' && !s.delete);
    const soft = skillList.filter((s) => s.skill.type === 'SOFT' && !s.delete);
    return { technical, soft };
  };

  const { technical, soft } = groupSkillsByType(skills);

  const visibleSkills = skills.filter((s) => !s.delete);

  if (visibleSkills.length === 0) {
    return (
      <Box sx={containerStyle}>
        <Box sx={emptyStateStyle}>
          <Typography>No skills added yet.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={skillsListContainerStyle}>
        {technical.length > 0 && (
          <Box sx={skillTypeGroupStyle}>
            <Typography sx={skillTypeHeaderStyle}>Technical Skills</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {technical.map((skill) => (
                <Box key={skill.id} sx={skillItemStyle}>
                  <Box sx={skillHeaderStyle}>
                    <Typography sx={skillNameStyle}>{skill.skill.name}</Typography>
                    <Typography sx={skillProficiencyStyle}>{formatProficiency(skill.proficiencyLevel)}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProficiencyValue(skill.proficiencyLevel)}
                    color="primary"
                    sx={{
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {soft.length > 0 && (
          <Box sx={skillTypeGroupStyle}>
            <Typography sx={skillTypeHeaderStyle}>Soft Skills</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {soft.map((skill) => (
                <Box key={skill.id} sx={skillItemStyle}>
                  <Box sx={skillHeaderStyle}>
                    <Typography sx={skillNameStyle}>{skill.skill.name}</Typography>
                    <Typography sx={skillProficiencyStyle}>{formatProficiency(skill.proficiencyLevel)}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getProficiencyValue(skill.proficiencyLevel)}
                    color="primary"
                    sx={{
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileSkillSection;
