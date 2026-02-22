import type { WorkType } from '../types/jobOffer.types.ts';
import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateYearMonth = (dateString: string | null | undefined) => {
  if (!dateString) return 'Present';
  return dayjs(dateString).format('MMM YYYY');
};

export const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
};

export const formatWorkType = (workType: WorkType): string => {
  switch (workType) {
    case 'HYBRID':
      return 'Hybrid';
    case 'REMOTE':
      return 'Remote';
    case 'ON_SITE':
      return 'On-site';
    default:
      return workType;
  }
};
