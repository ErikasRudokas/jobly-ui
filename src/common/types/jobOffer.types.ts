export type WorkType = 'ON_SITE' | 'REMOTE' | 'HYBRID';

export type JobOfferStatus = 'OPEN' | 'CLOSED';

export interface JobOfferCategory {
    id: number;
    name: string;
}

export interface Creator {
    firstName: string;
    lastName: string;
}

export interface JobOfferListObject {
    id: number;
    title: string;
    companyName: string;
    salary: number;
    workType: WorkType;
    location: string;
    category: JobOfferCategory;
}

export interface JobOffer {
    id: number;
    title: string;
    description: string;
    companyName: string;
    salary: number;
    yearsOfExperience: number;
    workType: WorkType;
    location: string;
    contactEmail: string;
    contactPhone: string;
    offerStatus: JobOfferStatus;
    createdAt: string;
    updatedAt: string;
    category: JobOfferCategory;
    creator: Creator;
}

export interface GetAllJobOffersResponse {
    total: number;
    jobOffers: JobOfferListObject[];
}

export interface JobOfferDetailsResponse {
    jobOffer: JobOffer;
}

export interface CreateJobOfferRequest {
    title: string;
    description: string;
    companyName: string;
    salary: number;
    yearsOfExperience: number;
    workType: WorkType;
    location: string;
    contactEmail: string;
    contactPhone?: string;
    categoryId: number;
}

export interface UpdateJobOfferRequest {
    title: string;
    description: string;
    companyName: string;
    salary: number;
    yearsOfExperience: number;
    workType: WorkType;
    location: string;
    contactEmail: string;
    contactPhone?: string;
    categoryId: number;
}

export interface GetMineJobOffersResponse {
    total: number;
    jobOffers: JobOfferListObject[];
}

export interface JobOfferWithApplicationsResponse {
    jobOffer: JobOffer;
    applications: Application[];
}

export interface Application {
    id: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    applicant: Applicant;
    applicationStatus: ApplicationStatus;
    cvId: number;
}

export interface Applicant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';

export interface CanApplyResponse {
    canApply: boolean;
}

