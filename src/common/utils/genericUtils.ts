import type { WorkType } from '../types/jobOffer.types.ts';
import type { ApplicationStatus } from '../types/application.types.ts';
import dayjs from 'dayjs';

export const formatApplicationStatus = (status: ApplicationStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending';
    case 'ACCEPTED':
      return 'Accepted';
    case 'REJECTED':
      return 'Rejected';
    case 'WITHDRAWN':
      return 'Withdrawn';
    default:
      return status;
  }
};

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
