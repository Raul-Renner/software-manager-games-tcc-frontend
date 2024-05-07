export interface UserEntity {
  userId: number;
  login: string;
  profile: string;
  userInformation: UserInformation;
  organization: Organization;
}

export interface UserInformation {
  userInformationId: number;
  name: string;
  username: string;
  email: string;
  fullName: string;
}

export interface Organization {
  organizationId: number;
  name: string;
  description: string;
  emailOrg: string;
  projects: any;
}
