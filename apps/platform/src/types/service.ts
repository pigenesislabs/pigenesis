export type ServiceStatus =
  | "Active"
  | "Planning"
  | "Coming Soon";

export type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
  category: string;
};

export type CreateServiceInput = {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
  category: string;
};