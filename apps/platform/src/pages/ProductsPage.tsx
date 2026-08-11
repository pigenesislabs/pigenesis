import { Link } from "react-router-dom";
import { products } from "../services/productService";
import StatusBadge from "../components/ui/StatusBadge";

function ProductsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-white">
        Products
      </h1>

      <p className="mt-4 text-xl text-slate-400">
        PiGenesis product ecosystem.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {products.map((product) => (
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

              <StatusBadge status={product.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;