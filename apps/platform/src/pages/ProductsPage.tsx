import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import type { Product, ProductStatus } from "../types/product";
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

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] =
    useState<ProductStatus | "All">("All");

  // Sort
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

  /*
   * Search, filter and sort products.
   */
  const filteredAndSortedProducts = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    const filtered = products.filter((product) => {
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

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
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
    });
  }, [
    products,
    searchTerm,
    statusFilter,
    sortOption,
  ]);

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Products
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            PiGenesis product ecosystem.
          </p>
        </div>

        {/* Create Product Button */}
        <Link
          to="/products/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-500"
        >
          + Create Product
        </Link>
      </div>

      {/* Search / Filter / Sort */}
      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-5">
        <div className="grid gap-4 md:grid-cols-3">

          {/* Search */}
          <div>
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search
            </label>

            <input
              id="product-search"
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search products..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="product-status-filter"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
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
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="All">
                All
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Planning">
                Planning
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
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Sort
            </label>

            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value as ProductSortOption
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >
              <option value="name-asc">
                Name A–Z
              </option>

              <option value="name-desc">
                Name Z–A
              </option>

              <option value="category-asc">
                Category A–Z
              </option>

              <option value="status">
                Status
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* Product Count */}
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

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedProducts.map(
            (product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-xl border border-slate-700 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-400">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {product.id}
                    </p>
                  </div>

                  <StatusBadge
                    status={product.status}
                  />
                </div>

                {/* Description */}
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-400">
                  {product.description}
                </p>

                {/* Product Category */}
                <div className="mt-6 border-t border-slate-800 pt-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {product.category}
                  </p>
                </div>

                {/* View Details */}
                <div className="mt-5 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                  View Product →
                </div>
              </Link>
            )
          )}
        </div>
      ) : (
        /* Empty / No Results State */
        <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          {products.length === 0 ? (
            <>
              <h2 className="text-xl font-semibold text-white">
                No products yet
              </h2>

              <p className="mt-2 text-slate-400">
                Create your first PiGenesis
                product.
              </p>

              <Link
                to="/products/new"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
              >
                + Create Product
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">
                No matching products
              </h2>

              <p className="mt-2 text-slate-400">
                Try changing your search or
                filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-6 rounded-lg border border-slate-600 px-5 py-3 font-medium text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;