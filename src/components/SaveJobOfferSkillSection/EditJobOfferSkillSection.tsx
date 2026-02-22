import { useEffect, useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Tooltip, Typography } from '@mui/material';
import type { Skill, SkillProficiency } from '../../common/types/skill.types.ts';
import type { UpdateJobOfferSkill } from '../../common/types/jobOffer.types.ts';
import { useSkills } from '../../common/hooks/useSkills.ts';
import SkillSearchBox from '../SkillSearchBox/SkillSearchBox.tsx';
import {
  deleteCheckboxStyle,
  deletedSkillItemStyle,
  emptyStateStyle,
  proficiencyBarContainerStyle,
  proficiencyBarFilledStyle,
  proficiencyBarStyle,
  removeButtonStyle,
  skillHeaderStyle,
  skillItemStyle,
  skillNameStyle,
  skillProficiencyStyle,
  skillsListContainerStyle,
  skillTypeGroupStyle,
  skillTypeHeaderStyle,
  statusTextStyle,
} from '../../common/styles/styles.skills.ts';
import {
  formatProficiency,
  getProficiencyFromLevel,
  getProficiencyLevel,
} from '../../common/utils/skillProficiencyUtils.ts';
import { containerStyle, sectionTitleStyle } from './styles.ts';

interface SkillWithMetadata extends UpdateJobOfferSkill {
  name: string;
  type: 'TECHNICAL' | 'SOFT';
}

interface EditJobOfferSkillSectionProps {
  selectedSkills: UpdateJobOfferSkill[];
  onSkillsChange: (skills: UpdateJobOfferSkill[]) => void;
  disabled?: boolean;
}

const EditJobOfferSkillSection = ({
  selectedSkills,
  onSkillsChange,
  disabled = false,
}: EditJobOfferSkillSectionProps) => {
  const { getAllSkills } = useSkills();
  const [skillsMetadata, setSkillsMetadata] = useState<Map<number, { name: string; type: 'TECHNICAL' | 'SOFT' }>>(
    new Map()
  );
  const [originalProficiencies, setOriginalProficiencies] = useState<Map<number, SkillProficiency>>(new Map());

  useEffect(() => {
    const fetchSkillMetadata = async () => {
      if (selectedSkills.length === 0) return;

      const origProf = new Map<number, SkillProficiency>();
      selectedSkills.forEach((skill) => {
        if (!skill.isNew) {
          origProf.set(skill.skillId, skill.proficiency);
        }
      });
      setOriginalProficiencies(origProf);

      const response = await getAllSkills({ limit: 1000 });
      if (response) {
        const metadata = new Map<number, { name: string; type: 'TECHNICAL' | 'SOFT' }>();
        response.skills.forEach((skill) => {
          metadata.set(skill.id, { name: skill.name, type: skill.type });
        });
        setSkillsMetadata(metadata);
      }
    };
    fetchSkillMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSkill = (skill: Skill) => {
    const newSkill: UpdateJobOfferSkill = {
      skillId: skill.id,
      proficiency: 'BEGINNER',
      delete: false,
      isNew: true,
    };

    setSkillsMetadata((prev) =>
      new Map(prev).set(skill.id, {
        name: skill.name,
        type: skill.type,
      })
    );

    onSkillsChange([...selectedSkills, newSkill]);
  };

  const handleRemoveSkill = (skillId: number) => {
    onSkillsChange(selectedSkills.filter((s) => s.skillId !== skillId));
  };

  const handleToggleDelete = (skillId: number) => {
    onSkillsChange(selectedSkills.map((s) => (s.skillId === skillId ? { ...s, delete: !s.delete } : s)));
  };

  const handleProficiencyChange = (skillId: number, proficiency: SkillProficiency) => {
    onSkillsChange(selectedSkills.map((skill) => (skill.skillId === skillId ? { ...skill, proficiency } : skill)));
  };

  const isSkillModified = (skill: SkillWithMetadata): boolean => {
    if (skill.isNew) return false; // New skills can't be modified
    const originalProf = originalProficiencies.get(skill.skillId);
    return originalProf !== undefined && originalProf !== skill.proficiency;
  };

  const getSkillsWithMetadata = (): SkillWithMetadata[] => {
    return selectedSkills.map((skill) => ({
      ...skill,
      name: skillsMetadata.get(skill.skillId)?.name || 'Unknown',
      type: skillsMetadata.get(skill.skillId)?.type || 'TECHNICAL',
    }));
  };

  const groupSkillsByType = (skills: SkillWithMetadata[]) => {
    const technical = skills.filter((skill) => skill.type === 'TECHNICAL');
    const soft = skills.filter((skill) => skill.type === 'SOFT');
    return { technical, soft };
  };

  const skillsWithMetadata = getSkillsWithMetadata();
  const { technical, soft } = groupSkillsByType(skillsWithMetadata);

  const renderProficiencyBars = (skill: SkillWithMetadata) => {
    const currentLevel = getProficiencyLevel(skill.proficiency);
    const isDeleted = skill.delete || false;

    return (
      <Box sx={proficiencyBarContainerStyle}>
        {[1, 2, 3, 4].map((level) => (
          <Box
            key={level}
            sx={
              isDeleted ? proficiencyBarStyle : level <= currentLevel ? proficiencyBarFilledStyle : proficiencyBarStyle
            }
            onClick={() =>
              !disabled && !isDeleted && handleProficiencyChange(skill.skillId, getProficiencyFromLevel(level))
            }
          />
        ))}
      </Box>
    );
  };

  const renderSkillItem = (skill: SkillWithMetadata) => {
    const isDeleted = skill.delete || false;
    const isNew = skill.isNew || false;
    const isModified = isSkillModified(skill);

    return (
      <Box key={skill.skillId} sx={isDeleted ? deletedSkillItemStyle : skillItemStyle}>
        <Box sx={skillHeaderStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography sx={skillNameStyle}>{skill.name}</Typography>

            {!isDeleted && isNew && <Typography sx={statusTextStyle}>Added</Typography>}
            {!isDeleted && !isNew && isModified && <Typography sx={statusTextStyle}>Modified</Typography>}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Typography sx={{ ...skillProficiencyStyle, opacity: isDeleted ? 0.5 : 1 }}>
              {formatProficiency(skill.proficiency)}
            </Typography>

            {!isNew && (
              <Tooltip title={isDeleted ? 'Unmark deletion' : 'Mark for deletion'} arrow>
                <Checkbox
                  checked={isDeleted}
                  onChange={() => handleToggleDelete(skill.skillId)}
                  disabled={disabled}
                  size="small"
                  sx={deleteCheckboxStyle}
                />
              </Tooltip>
            )}

            {isNew && (
              <IconButton
                size="small"
                onClick={() => handleRemoveSkill(skill.skillId)}
                disabled={disabled}
                sx={removeButtonStyle}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        {renderProficiencyBars(skill)}
      </Box>
    );
  };

  return (
    <Box sx={containerStyle}>
      <Typography sx={sectionTitleStyle}>Required Skills</Typography>

      <SkillSearchBox
        excludeSkillIds={selectedSkills.map((s) => s.skillId)}
        onAddSkill={handleAddSkill}
        disabled={disabled}
      />

      {selectedSkills.length === 0 ? (
        <Box sx={emptyStateStyle}>
          <Typography>No skills added yet. Search and add skills above.</Typography>
        </Box>
      ) : (
        <Box sx={skillsListContainerStyle}>
          {technical.length > 0 && (
            <Box sx={skillTypeGroupStyle}>
              <Typography sx={skillTypeHeaderStyle}>Technical Skills</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {technical.map(renderSkillItem)}
              </Box>
            </Box>
          )}
          {soft.length > 0 && (
            <Box sx={skillTypeGroupStyle}>
              <Typography sx={skillTypeHeaderStyle}>Soft Skills</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{soft.map(renderSkillItem)}</Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EditJobOfferSkillSection;
