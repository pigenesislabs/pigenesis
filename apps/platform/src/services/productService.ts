import type { CreateProductInput, Product, } from "../types/product";
import { createAppError } from "../utils/errorHandler";
import { logError, logInfo } from "../utils/logger";

const STORAGE_KEY = "pigenesis_products";

function readProductsFromStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    logError("Product storage read failed", {
      operation: "readProductsFromStorage",
      error,
    });

    throw createAppError(
      "STORAGE_ERROR",
      "Unable to read product data from storage."
    );
  }
}

function saveProductsToStorage(
  productsToSave: Product[]
): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(productsToSave)
    );
  } catch (error) {
    logError("Product storage write failed", {
      operation: "saveProductsToStorage",
      error,
    });

    throw createAppError(
      "STORAGE_ERROR",
      "Unable to save product data to storage."
    );
  }
}
function validateProductInput(
  input: CreateProductInput
): void {
  const productId = input.id.trim();

  if (!productId) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product ID is required."
    );
  }

  if (!/^[a-z0-9-]+$/.test(productId)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product ID can contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!input.name.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product name is required."
    );
  }

  if (!input.description.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product description is required."
    );
  }

  if (!input.category.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product category is required."
    );
  }
  const validStatuses: Product["status"][] = [
    "Planning",
    "Active",
    "Coming Soon",
  ];

  if (!validStatuses.includes(input.status)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product status is invalid."
    );
  }
}

function validateProductUpdates(
  updates: Omit<Product, "id">
): void {
  if (!updates.name.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product name is required."
    );
  }

  if (!updates.description.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product description is required."
    );
  }

  if (!updates.category.trim()) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product category is required."
    );
  }
  const validStatuses: Product["status"][] = [
    "Planning",
    "Active",
    "Coming Soon",
  ];

  if (!validStatuses.includes(updates.status)) {
    throw createAppError(
      "VALIDATION_ERROR",
      "Product status is invalid."
    );
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
  const storedProducts =
    readProductsFromStorage();

  if (!storedProducts) {
    saveProductsToStorage(defaultProducts);
    return defaultProducts;
  }

  try {
    return JSON.parse(storedProducts) as Product[];
  } catch (error) {
    logError("Product storage data is invalid", {
      operation: "loadProducts",
      error,
    });

    saveProductsToStorage(defaultProducts);
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

  saveProductsToStorage(updatedProducts);

  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );
  logInfo("Product updated", {
    operation: "updateProduct",
    productId,
  });
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
    logError("Product deletion failed", {
      operation: "deleteProduct",
      productId,
      errorCode: "NOT_FOUND",
    });
    return false;
  }

  const updatedProducts = currentProducts.filter(
    (product) => product.id !== productId
  );

  saveProductsToStorage(updatedProducts);
  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );
  logInfo("Product deleted", {
    operation: "deleteProduct",
    productId,
  });
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
    logError("Product creation failed", {
      operation: "createProduct",
      productId: input.id,
      errorCode: "DUPLICATE",
    });

    throw createAppError(
      "DUPLICATE",
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

  saveProductsToStorage(updatedProducts);

  products = updatedProducts;

  window.dispatchEvent(
    new Event("pigenesis-products-updated")
  );

  logInfo("Product created", {
    operation: "createProduct",
    productId: product.id,
  });

  return product;
}