import type {
  CreateProductInput,
  Product,
} from "../types/product";

const STORAGE_KEY = "pigenesis_products";

function validateProductInput(
  input: CreateProductInput
): void {
  const productId = input.id.trim();

  if (!productId) {
    throw new Error("Product ID is required.");
  }

  if (!/^[a-z0-9-]+$/.test(productId)) {
    throw new Error(
      "Product ID can contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!input.name.trim()) {
    throw new Error("Product name is required.");
  }

  if (!input.description.trim()) {
    throw new Error("Product description is required.");
  }

  if (!input.category.trim()) {
    throw new Error("Product category is required.");
  }

  const validStatuses: Product["status"][] = [
    "Planning",
    "Active",
    "Coming Soon",
  ];

  if (!validStatuses.includes(input.status)) {
    throw new Error("Product status is invalid.");
  }
}

function validateProductUpdates(
  updates: Omit<Product, "id">
): void {
  if (!updates.name.trim()) {
    throw new Error("Product name is required.");
  }

  if (!updates.description.trim()) {
    throw new Error("Product description is required.");
  }

  if (!updates.category.trim()) {
    throw new Error("Product category is required.");
  }

  const validStatuses: Product["status"][] = [
    "Planning",
    "Active",
    "Coming Soon",
  ];

  if (!validStatuses.includes(updates.status)) {
    throw new Error("Product status is invalid.");
  }
}

const defaultProducts: Product[] = [
  {
    id: "pi-flow",
    name: "PI Flow",
    status: "Planning",
    description: "Intelligent workflow automation platform",
    category: "Workflow",
  },
  {
    id: "pi-docs",
    name: "PI Docs",
    status: "Planning",
    description: "Intelligent document management platform",
    category: "Documents",
  },
  {
    id: "pi-ai",
    name: "PI AI",
    status: "Active",
    description: "Intelligent AI platform",
    category: "Artificial Intelligence",
  },
  {
    id: "pi-vault",
    name: "PI Vault",
    status: "Coming Soon",
    description: "Secure digital data platform",
    category: "Security",
  },
];

function loadProducts(): Product[] {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (!storedProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProducts)
    );

    return defaultProducts;
  }

  try {
    return JSON.parse(storedProducts) as Product[];
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProducts)
    );

    return defaultProducts;
  }
}

export let products: Product[] = loadProducts();

export function getProducts(): Product[] {
  products = loadProducts();
  return products;
}

export function getProductById(
  productId: string
): Product | undefined {
  const currentProducts = loadProducts();

  return currentProducts.find(
    (product) => product.id === productId
  );
}

export function updateProduct(
  productId: string,
  updates: Omit<Product, "id">
): Product | undefined {
  validateProductUpdates(updates);

  const currentProducts = loadProducts();

  const productIndex = currentProducts.findIndex(
    (product) => product.id === productId
  );

  if (productIndex === -1) {
    return undefined;
  }

  const updatedProduct: Product = {
    ...currentProducts[productIndex],
    ...updates,
    id: productId,
  };

  const updatedProducts = [...currentProducts];

  updatedProducts[productIndex] = updatedProduct;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  );

  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );

  return updatedProduct;
}

export function deleteProduct(
  productId: string
): boolean {
  const currentProducts = loadProducts();

  const productExists = currentProducts.some(
    (product) => product.id === productId
  );

  if (!productExists) {
    return false;
  }

  const updatedProducts = currentProducts.filter(
    (product) => product.id !== productId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  );

  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );

  return true;
}

export function createProduct(
  input: CreateProductInput
): Product {
  validateProductInput(input);
  const currentProducts = loadProducts();

  if (
    currentProducts.some(
      (product) => product.id === input.id
    )
  ) {
    throw new Error(
      "A product with this ID already exists."
    );
  }

  const product: Product = {
    id: input.id,
    name: input.name,
    status: input.status,
    description: input.description,
    category: input.category,
  };

  const updatedProducts = [
    ...currentProducts,
    product,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  );

  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );

  return product;
}