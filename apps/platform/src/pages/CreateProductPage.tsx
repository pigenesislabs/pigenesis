import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createProduct,
} from "../services/productService";

import type {
  ProductStatus,
} from "../types/product";

import {
  getErrorMessage,
} from "../utils/errorHandler";

function CreateProductPage() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] =
    useState<ProductStatus>("Planning");
  const [description, setDescription] =
    useState("");

  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError("");

    try {
      const product = createProduct({
        id,
        name,
        status,
        description,
        category,
      });

      navigate(`/products/${product.id}`);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  return (
    <div>
      <Link
        to="/products"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back to Products
      </Link>

      <div className="mt-6">
        <h1 className="text-4xl font-bold text-white">
          Create Product
        </h1>

        <p className="mt-3 text-slate-400">
          Add a new product to the PiGenesis
          product ecosystem.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-3xl space-y-6"
      >
        {/* Product ID */}

        <div>
          <label
            htmlFor="product-id"
            className="block text-sm font-medium text-slate-300"
          >
            Product ID
          </label>

          <input
            id="product-id"
            type="text"
            value={id}
            onChange={(event) =>
              setId(event.target.value)
            }
            placeholder="example-product"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-slate-500">
            Use lowercase letters, numbers, and
            hyphens only.
          </p>
        </div>

        {/* Product Name */}

        <div>
          <label
            htmlFor="product-name"
            className="block text-sm font-medium text-slate-300"
          >
            Product Name
          </label>

          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Example Product"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Product Category */}

        <div>
          <label
            htmlFor="product-category"
            className="block text-sm font-medium text-slate-300"
          >
            Category
          </label>

          <input
            id="product-category"
            type="text"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            placeholder="Workflow"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="product-status"
            className="block text-sm font-medium text-slate-300"
          >
            Status
          </label>

          <select
            id="product-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as ProductStatus
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
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

        {/* Description */}

        <div>
          <label
            htmlFor="product-description"
            className="block text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="product-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={5}
            placeholder="Describe the product..."
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Error */}

        {error && (
          <div className="rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Actions */}

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
          >
            Create Product
          </button>

          <Link
            to="/products"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateProductPage;