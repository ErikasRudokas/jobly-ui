import type { SkillProficiency } from '../types/skill.types.ts';

const proficiencyToLevel = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
} as const;

export const getProficiencyLevel = (proficiency: SkillProficiency | null | undefined): number => {
  if (!proficiency) return 0;
  return proficiencyToLevel[proficiency] ?? 0;
};

export const getProficiencyFromLevel = (level: number): SkillProficiency =>
  (Object.entries(proficiencyToLevel).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value === level
  )?.[0] ?? 'BEGINNER') as SkillProficiency;

export const formatProficiency = (proficiency: SkillProficiency | null | undefined): string => {
  if (!proficiency) return 'Not set';
  return proficiency.charAt(0) + proficiency.slice(1).toLowerCase();
};

export const getProficiencyValue = (proficiency: string | null): number => {
  if (!proficiency) return 0;
  switch (proficiency) {
    case 'BEGINNER':
      return 25;
    case 'INTERMEDIATE':
      return 50;
    case 'ADVANCED':
      return 75;
    case 'EXPERT':
      return 100;
    default:
      return 0;
  }
};
