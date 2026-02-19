import {Close as CloseIcon} from '@mui/icons-material';
import {Box, Checkbox, IconButton, Tooltip, Typography} from '@mui/material';
import type {Skill, SkillProficiency} from '../../common/types/skill.types';
import type {UpdateUserSkill} from '../../common/types/profile.types';
import SkillSearchBox from '../SkillSearchBox/SkillSearchBox';
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
} from '../../common/styles/styles.skills';
import {
    formatProficiency,
    getProficiencyFromLevel,
    getProficiencyLevel
} from '../../common/utils/skillProficiencyUtils';
import {containerStyle} from "./styles.ts";

interface EditProfileSkillSectionProps {
    skills: UpdateUserSkill[];
    onSkillsChange: (skills: UpdateUserSkill[]) => void;
    disabled?: boolean;
    originalSkills?: UpdateUserSkill[];
}

const EditProfileSkillSection = ({
    skills,
    onSkillsChange,
    disabled = false,
    originalSkills = [],
}: EditProfileSkillSectionProps) => {

    const isSkillModified = (skill: UpdateUserSkill): boolean => {
        if (skill.isNew) return false;
        const original = originalSkills.find(o => o.id === skill.id);
        if (!original) return false;
        return original.proficiencyLevel !== skill.proficiencyLevel;
    };

    const handleAddSkill = (skill: Skill) => {
        const newSkill: UpdateUserSkill = {
            id: Date.now(),
            proficiencyLevel: 'BEGINNER',
            skill: {
                id: skill.id,
                name: skill.name,
                type: skill.type,
            },
            isNew: true,
        };

        onSkillsChange([...skills, newSkill]);
    };

    const handleRemoveSkill = (skillId: number) => {
        const skill = skills.find(s => s.id === skillId);
        if (skill?.isNew) {
            onSkillsChange(skills.filter(s => s.id !== skillId));
        } else {
            onSkillsChange(
                skills.map(s =>
                    s.id === skillId ? {...s, delete: !s.delete} : s
                )
            );
        }
    };

    const handleProficiencyChange = (skillId: number, proficiency: SkillProficiency) => {
        onSkillsChange(
            skills.map(skill =>
                skill.id === skillId ? {...skill, proficiencyLevel: proficiency} : skill
            )
        );
    };

    const groupSkillsByType = (skillList: UpdateUserSkill[]) => {
        const technical = skillList.filter(skill => skill.skill.type === 'TECHNICAL');
        const soft = skillList.filter(skill => skill.skill.type === 'SOFT');
        return {technical, soft};
    };

    const {technical, soft} = groupSkillsByType(skills);

    const renderProficiencyBars = (skill: UpdateUserSkill) => {
        const currentLevel = getProficiencyLevel(skill.proficiencyLevel);
        return (
            <Box sx={proficiencyBarContainerStyle}>
                {[1, 2, 3, 4].map(level => (
                    <Box
                        key={level}
                        sx={level <= currentLevel ? proficiencyBarFilledStyle : proficiencyBarStyle}
                        onClick={() =>
                            !disabled && !skill.delete && handleProficiencyChange(skill.id, getProficiencyFromLevel(level))
                        }
                    />
                ))}
            </Box>
        );
    };

    const renderSkillItem = (skill: UpdateUserSkill) => {
        const isMarkedForDeletion = skill.delete && !skill.isNew;
        const hasMissingProficiency = !skill.proficiencyLevel && !skill.delete;
        const isModified = isSkillModified(skill);

        return (
            <Box key={skill.id} sx={isMarkedForDeletion ? deletedSkillItemStyle : skillItemStyle}>
                <Box sx={skillHeaderStyle}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <Typography sx={skillNameStyle}>{skill.skill.name}</Typography>

                        {!isMarkedForDeletion && skill.isNew && (
                            <Typography sx={statusTextStyle}>Added</Typography>
                        )}
                        {!isMarkedForDeletion && !skill.isNew && isModified && (
                            <Typography sx={statusTextStyle}>Modified</Typography>
                        )}
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <Typography sx={{
                            ...skillProficiencyStyle,
                            opacity: isMarkedForDeletion ? 0.5 : 1,
                            ...(hasMissingProficiency && {color: 'error.main'})
                        }}>
                            {formatProficiency(skill.proficiencyLevel)}
                            {hasMissingProficiency && ' - Click bars to set'}
                        </Typography>

                        {!skill.isNew && (
                            <Tooltip title={isMarkedForDeletion ? "Unmark deletion" : "Mark for deletion"} arrow>
                                <Checkbox
                                    checked={skill.delete || false}
                                    onChange={() => handleRemoveSkill(skill.id)}
                                    disabled={disabled}
                                    size="small"
                                    sx={deleteCheckboxStyle}
                                />
                            </Tooltip>
                        )}

                        {skill.isNew && (
                            <IconButton
                                size="small"
                                onClick={() => handleRemoveSkill(skill.id)}
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

    const excludedSkillIds = skills
        .filter(s => !s.delete)
        .map(s => s.skill.id);

    return (
        <Box sx={containerStyle}>
            <SkillSearchBox
                excludeSkillIds={excludedSkillIds}
                onAddSkill={handleAddSkill}
                disabled={disabled}
            />

            {skills.length === 0 ? (
                <Box sx={emptyStateStyle}>
                    <Typography>No skills added yet. Search and add skills above.</Typography>
                </Box>
            ) : (
                <Box sx={skillsListContainerStyle}>
                    {technical.length > 0 && (
                        <Box sx={skillTypeGroupStyle}>
                            <Typography sx={skillTypeHeaderStyle}>Technical Skills</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                                {technical.map(renderSkillItem)}
                            </Box>
                        </Box>
                    )}
                    {soft.length > 0 && (
                        <Box sx={skillTypeGroupStyle}>
                            <Typography sx={skillTypeHeaderStyle}>Soft Skills</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                                {soft.map(renderSkillItem)}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default EditProfileSkillSection;

