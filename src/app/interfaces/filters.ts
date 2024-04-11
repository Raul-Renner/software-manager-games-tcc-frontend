export interface ActivityDependentFilterType {
  idsNotIn?: Array<number>;
  activitySource?: number;
  activityBranch?: number;
}


export interface ProjectFilterType {
  projectIds?: Array<number>;
  organizationId?: number;
  userId?: number;
}

export interface UserFilterType {
  organizationId?: number;
  projectId?: number;
  userId?: number;
}

export interface ActivityFilterType {
  userIds?: Array<number>;
  organizationId?: number;
  projectId?: number;
}
