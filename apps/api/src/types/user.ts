export type UserStatus =
  | "Active"
  | "Invited"
  | "Suspended"
  | "Disabled";

export type User = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserInput = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
};

export type UpdateUserInput = {
  email: string;
  displayName: string;
  status: UserStatus;
};