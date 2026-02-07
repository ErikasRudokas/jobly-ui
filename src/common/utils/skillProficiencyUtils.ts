import type {SkillProficiency} from "../types/skill.types.ts";

const proficiencyToLevel = {
    BEGINNER: 1,
    INTERMEDIATE: 2,
    ADVANCED: 3,
    EXPERT: 4,
} as const;

export const getProficiencyLevel = (
    proficiency: SkillProficiency
): number =>
    proficiencyToLevel[proficiency] ?? 1;

export const getProficiencyFromLevel = (
    level: number
): SkillProficiency =>
    (
        Object.entries(proficiencyToLevel).find(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) => value === level
        )?.[0] ?? 'BEGINNER'
    ) as SkillProficiency;

export const formatProficiency = (proficiency: SkillProficiency) =>
    proficiency.charAt(0) + proficiency.slice(1).toLowerCase();