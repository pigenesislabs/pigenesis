import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
} from "../services/productService";
import type {
  Product,
  ProductStatus,
} from "../types/product";
import StatusBadge from "../components/ui/StatusBadge";

type ProductSortOption =
  | "name-asc"
  | "name-desc"
  | "category-asc"
  | "status";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(
    getProducts()
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<ProductStatus | "All">("All");

  const [sortOption, setSortOption] =
    useState<ProductSortOption>("name-asc");

  useEffect(() => {
    const handleProductsUpdated = () => {
      setProducts(getProducts());
    };

    window.addEventListener(
      "pigenesis-products-updated",
      handleProductsUpdated
    );

    return () => {
      window.removeEventListener(
        "pigenesis-products-updated",
        handleProductsUpdated
      );
    };
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    const filtered = products.filter(
      (product) => {
        const matchesSearch =
          !normalizedSearch ||
          product.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          product.id
            .toLowerCase()
            .includes(normalizedSearch) ||
          product.category
            .toLowerCase()
            .includes(normalizedSearch) ||
          product.description
            .toLowerCase()
            .includes(normalizedSearch);

        const matchesStatus =
          statusFilter === "All" ||
          product.status === statusFilter;

        return (
          matchesSearch && matchesStatus
        );
      }
    );

    return [...filtered].sort(
      (a, b) => {
        switch (sortOption) {
          case "name-desc":
            return b.name.localeCompare(a.name);

          case "category-asc":
            return a.category.localeCompare(
              b.category
            );

          case "status":
            return a.status.localeCompare(
              b.status
            );

          case "name-asc":
          default:
            return a.name.localeCompare(
              b.name
            );
        }
      }
    );
  }, [
    products,
    searchTerm,
    statusFilter,
    sortOption,
  ]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-white">
        Products
      </h1>

      <p className="mt-4 text-xl text-slate-400">
        PiGenesis product ecosystem.
      </p>

      {/* Search / Filter / Sort */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label
            htmlFor="product-search"
            className="block text-sm font-medium text-slate-300"
          >
            Search Products
          </label>

          <input
            id="product-search"
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search products..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label
            htmlFor="product-status-filter"
            className="block text-sm font-medium text-slate-300"
          >
            Filter by Status
          </label>

          <select
            id="product-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | ProductStatus
                  | "All"
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="All">All</option>
            <option value="Planning">
              Planning
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Coming Soon">
              Coming Soon
            </option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="product-sort"
            className="block text-sm font-medium text-slate-300"
          >
            Sort Products
          </label>

          <select
            id="product-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(
                event.target.value as ProductSortOption
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="name-asc">
              Name A → Z
            </option>

            <option value="name-desc">
              Name Z → A
            </option>

            <option value="category-asc">
              Category A → Z
            </option>

            <option value="status">
              Status
            </option>
          </select>
        </div>
      </div>

      {/* Result Count */}
      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-300">
            {filteredAndSortedProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-300">
            {products.length}
          </span>{" "}
          products
        </p>
      </div>

      {/* Products */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            No Products Found
          </h2>

          <p className="mt-3 text-slate-400">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {filteredAndSortedProducts.map(
            (product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="block rounded-xl border border-slate-700 bg-slate-900 p-6 transition hover:border-blue-500 hover:bg-slate-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {product.name}
                    </h2>

                    <p className="mt-3 text-slate-400">
                      {product.description}
                    </p>

                    <p className="mt-4 text-sm text-slate-500">
                      {product.category}
                    </p>
                  </div>

                  <StatusBadge
                    status={product.status}
                  />
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;