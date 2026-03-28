export type AdminUserRole = 'USER' | 'EMPLOYER';

export type AdminUserActionType = 'SUSPEND' | 'RESTORE';

export interface AdminUserListItem {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: AdminUserRole;
  suspended: boolean;
}

export interface AdminUserListResponse {
  total: number;
  users: AdminUserListItem[];
}

export interface AdminUserDetails {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: AdminUserRole;
  suspended: boolean;
}

export interface AdminUserActionPerformedBy {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface AdminUserAction {
  id: number;
  action: AdminUserActionType;
  comment: string | null;
  createdAt: string;
  performedBy: AdminUserActionPerformedBy;
}

export interface AdminUserDetailsResponse {
  user: AdminUserDetails;
  actions: AdminUserAction[];
}

export interface AdminUserStatusManageRequest {
  action: AdminUserActionType;
  comment: string;
}
