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
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProductInput = {
  id: string;
  name: string;
  status: ProductStatus;
  description: string;
  category: string;
};

export type UpdateProductInput = {
  name: string;
  status: ProductStatus;
  description: string;
  category: string;
};