export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar: string;
  createdAt: string; // ISO Date string
  lastActive: string; // ISO Date string
}

export interface AnalyticsData {
  date: string;
  signups: number;
}

export interface UserStatusStats {
  name: string;
  value: number;
  color: string;
}

export type SortField = 'name' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface UserFilterState {
  search: string;
  status: UserStatus | 'All';
  sortBy: SortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}
