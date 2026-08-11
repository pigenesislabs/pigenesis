export type ProductStatus =
  | "Active"
  | "Planning"
  | "Coming Soon";

export type Product = {
  id: string;
  name: string;
  status: ProductStatus;
  description: string;
  category: string;
};