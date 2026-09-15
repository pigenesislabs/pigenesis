export type ProjectStatus =
  | "Active"
  | "Planning"
  | "Completed";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProjectInput = {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  type: string;
};

export type UpdateProjectInput = {
  name: string;
  status: ProjectStatus;
  description: string;
  type: string;
};