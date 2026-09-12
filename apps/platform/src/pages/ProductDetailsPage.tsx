import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../services/productService";

import StatusText from "../components/ui/StatusText";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  function handleDelete() {
    if (!product) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    const deleted = deleteProduct(product.id);

    if (deleted) {
      navigate("/products");
    }
  }
  const product = productId
    ? getProductById(productId)
    : undefined;

  if (!product) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-white">
          Product Not Found
        </h1>

        <p className="mt-3 text-slate-400">
          The requested product does not exist.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block text-blue-400 hover:text-blue-300"
        >
          ← Back to Products
        </Link>
      </div>
    );
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
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h1 className="text-5xl font-bold text-white">
            {product.name}
          </h1>
          <div>
            <p className="text-lg font-medium uppercase tracking-wide text-white">
              Product ID
            </p>
            <p className="mt-2 text-lg font-medium text-slate-500">
              {product.id}
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(`/products/${product.id}/edit`)
              }
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Edit Product
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-red-700 px-5 py-3 font-medium text-red-400 transition hover:border-red-500 hover:bg-red-950 hover:text-red-300"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Status
          </p>

          <StatusText status={product.status} />
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Category
          </p>

          <p className="mt-3 text-2xl font-semibold text-white">
            {product.category}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Platform
          </p>

          <p className="mt-3 text-2xl font-semibold text-green-400">
            PiGenesis
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Product Overview
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsPage;