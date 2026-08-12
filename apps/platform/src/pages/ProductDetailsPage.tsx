import { Link, useParams } from "react-router-dom";
import { products } from "../services/productService";

import StatusText from "../components/ui/StatusText";

function ProductDetailsPage() {
  const { productId } = useParams();

  const product = products.find(
    (item) => item.id === productId
  );

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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-white">
              {product.name}
            </h1>

            <p className="mt-4 text-xl text-slate-400">
              {product.description}
            </p>
          </div>

          {/*<StatusBadge status={product.status} />*/}
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