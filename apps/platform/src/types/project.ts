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
};