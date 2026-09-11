import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useState } from "react";
import {
    getProductById,
    updateProduct,
} from "../services/productService";
import type { ProductStatus } from "../types/product";

function EditProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const product = productId
        ? getProductById(productId)
        : undefined;

    const [name, setName] = useState(
        product?.name ?? ""
    );

    const [category, setCategory] = useState(
        product?.category ?? ""
    );

    const [status, setStatus] =
        useState<ProductStatus>(
            product?.status ?? "Planning"
        );

    const [description, setDescription] = useState(
        product?.description ?? ""
    );

    const [error, setError] = useState("");

    if (!product || !productId) {
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
    const currentProductId = product.id;
    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setError("");

        try {
            const updatedProduct = updateProduct(
                currentProductId,
                {
                    name,
                    status,
                    description,
                    category,
                }
            );

            if (!updatedProduct) {
                setError("Product could not be found.");
                return;
            }

            navigate(`/products/${currentProductId}`);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to update product."
            );
        }
    }

    return (
        <div>
            <Link
                to={`/products/${product.id}`}
                className="text-blue-400 hover:text-blue-300"
            >
                ← Back to Product
            </Link>

            <h1 className="mt-6 text-4xl font-bold text-white">
                Edit Product
            </h1>

            <p className="mt-3 text-slate-400">
                Update the product information.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-8 max-w-3xl space-y-6"
            >
                {/* Product ID */}
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Product ID
                    </label>

                    <input
                        type="text"
                        value={product.id}
                        disabled
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-500"
                    />

                    <p className="mt-2 text-sm text-slate-500">
                        Product ID cannot be changed.
                    </p>
                </div>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Product Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Category
                    </label>

                    <input
                        type="text"
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value as ProductStatus
                            )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    >
                        <option value="Planning">Planning</option>
                        <option value="Active">Active</option>
                        <option value="Coming Soon">
                            Coming Soon
                        </option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                {error && (
                    <p className="rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-red-400">
                        {error}
                    </p>
                )}

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
                    >
                        Save Changes
                    </button>

                    <Link
                        to={`/products/${product.id}`}
                        className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditProductPage;