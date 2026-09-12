import { beforeEach, describe, expect, it } from "vitest";
import { createProduct,  getProductById,  getProducts, deleteProduct} from "./productService";

describe("productService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads default products when storage is empty", () => {
    const products = getProducts();

    expect(products.length).toBe(4);
  });

  it("creates a new product", () => {
    const product = createProduct({
      id: "test-product",
      name: "Test Product",
      status: "Planning",
      description: "Test product description",
      category: "Testing",
    });

    expect(product.id).toBe("test-product");
    expect(getProductById("test-product")).toEqual(product);
  });

  it("prevents duplicate product IDs", () => {
    createProduct({
      id: "duplicate-product",
      name: "Duplicate Product",
      status: "Planning",
      description: "Testing duplicate products.",
      category: "Testing",
    });

    expect(() =>
      createProduct({
        id: "duplicate-product",
        name: "Another Product",
        status: "Planning",
        description: "Testing duplicate products.",
        category: "Testing",
      })
    ).toThrow(
      "A product with this ID already exists."
    );
  });

  it("retrieves a product by ID", () => {
    createProduct({
      id: "find-product",
      name: "Find Product",
      status: "Active",
      description: "Testing product retrieval.",
      category: "Testing",
    });

    const product = getProductById("find-product");

    expect(product?.name).toBe("Find Product");
  });

  it("returns undefined for a non-existent product", () => {
    const product = getProductById(
      "does-not-exist"
    );

    expect(product).toBeUndefined();
  });

  it("rejects an empty product ID", () => {
    expect(() =>
      createProduct({
        id: "",
        name: "Invalid Product",
        status: "Planning",
        description: "Invalid product.",
        category: "Testing",
      })
    ).toThrow("Product ID is required.");
  });

  it("rejects an invalid product ID format", () => {
    expect(() =>
      createProduct({
        id: "Invalid Product",
        name: "Invalid Product",
        status: "Planning",
        description: "Invalid product.",
        category: "Testing",
      })
    ).toThrow(
      "Product ID can contain only lowercase letters, numbers, and hyphens."
    );
  });

  it("rejects an empty product name", () => {
    expect(() =>
      createProduct({
        id: "invalid-product",
        name: "",
        status: "Planning",
        description: "Invalid product.",
        category: "Testing",
      })
    ).toThrow("Product name is required.");
  });

  it("rejects an empty product description", () => {
    expect(() =>
      createProduct({
        id: "invalid-product",
        name: "Invalid Product",
        status: "Planning",
        description: "",
        category: "Testing",
      })
    ).toThrow("Product description is required.");
  });

  it("rejects an empty product category", () => {
    expect(() =>
      createProduct({
        id: "invalid-product",
        name: "Invalid Product",
        status: "Planning",
        description: "Invalid product.",
        category: "",
      })
    ).toThrow("Product category is required.");
  });

  it("rejects an invalid product status", () => {
    expect(() =>
      createProduct({
        id: "invalid-product",
        name: "Invalid Product",
        status: "Invalid" as "Planning",
        description: "Invalid product.",
        category: "Testing",
      })
    ).toThrow("Product status is invalid.");
  });
    it("deletes an existing product", () => {
    createProduct({
      id: "delete-product",
      name: "Delete Product",
      status: "Planning",
      description: "Testing product deletion.",
      category: "Testing",
    });

    const deleted = deleteProduct(
      "delete-product"
    );

    expect(deleted).toBe(true);
    expect(
      getProductById("delete-product")
    ).toBeUndefined();
  });

  it("returns false when deleting a non-existent product", () => {
    const deleted = deleteProduct(
      "does-not-exist"
    );

    expect(deleted).toBe(false);
  });

  it("deletes a product using current stored product data", () => {
    createProduct({
      id: "stored-delete-product",
      name: "Stored Delete Product",
      status: "Planning",
      description: "Testing stored product deletion.",
      category: "Testing",
    });

    localStorage.setItem(
      "pigenesis_products",
      JSON.stringify([
        {
          id: "stored-delete-product",
          name: "Stored Delete Product",
          status: "Planning",
          description: "Testing stored product deletion.",
          category: "Testing",
        },
      ])
    );

    const deleted = deleteProduct(
      "stored-delete-product"
    );

    expect(deleted).toBe(true);

    expect(
      JSON.parse(
        localStorage.getItem("pigenesis_products") || "[]"
      )
    ).toEqual([]);
  });
  it("handles product storage read failure", () => {
    const originalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error("Storage read failed");
        },
        setItem: () => {},
        clear: () => {},
      },
    });

    expect(() => getProducts()).toThrow(
      "Unable to read product data from storage."
    );

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalStorage,
    });
  });

  it("handles product storage write failure", () => {
    const originalStorage = globalThis.localStorage;

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => {
          throw new Error("Storage write failed");
        },
        clear: () => {},
      },
    });

    expect(() => getProducts()).toThrow(
      "Unable to save product data to storage."
    );

    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: originalStorage,
    });
  });
});