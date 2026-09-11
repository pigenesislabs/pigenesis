import type {
  CreateProductInput,
  Product,
} from "../types/product";

const STORAGE_KEY = "pigenesis_products";

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

export function createProduct(
  input: CreateProductInput
): Product {
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