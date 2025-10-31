export interface MyApplicationListObject {
    id: number;
    updatedAt: string;
    jobOffer: {
        id: number;
        title: string;
        companyName: string;
        salary: number;
        workType: WorkType;
        location: string;
        category: {
            id: number;
            name: string;
        };
    };
    applicationStatus: ApplicationStatus;
}

export interface MyApplication {
    id: number;
    comment: string;
    applicationStatus: ApplicationStatus;
    createdAt: string;
    updatedAt: string;
    jobOffer: {
        id: number;
        title: string;
        companyName: string;
        salary: number;
        workType: WorkType;
        location: string;
        category: {
            id: number;
            name: string;
        };
    };
    cvId: number;
}

export interface GetMyApplicationsResponse {
    total: number;
    applications: MyApplicationListObject[];
}

export interface ApplicationRequest {
    comment?: string;
}

export interface ApplicationUpdateRequest {
    comment?: string;
}

export interface ManageApplicationRequest {
    action: 'APPROVE' | 'REJECT';
}

export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
export type WorkType = 'ON_SITE' | 'REMOTE' | 'HYBRID';

