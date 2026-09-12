import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getServiceById,
    updateService,
} from "../services/serviceService";

import type { ServiceStatus } from "../types/service";

import { getErrorMessage } from "../utils/errorHandler";

function EditServicePage() {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const service = serviceId
        ? getServiceById(serviceId)
        : undefined;

    const [name, setName] = useState(
        service?.name ?? ""
    );

    const [category, setCategory] = useState(
        service?.category ?? ""
    );

    const [status, setStatus] =
        useState<ServiceStatus>(
            service?.status ?? "Planning"
        );

    const [description, setDescription] =
        useState(service?.description ?? "");

    const [error, setError] = useState("");

    if (!service || !serviceId) {
        return (
            <div>
                <h1 className="text-4xl font-bold text-white">
                    Service Not Found
                </h1>

                <p className="mt-3 text-slate-400">
                    The requested service does not exist.
                </p>

                <Link
                    to="/services"
                    className="mt-6 inline-block text-blue-400 hover:text-blue-300"
                >
                    ← Back to Services
                </Link>
            </div>
        );
    }
    const currentServiceId = service.id;
    function handleSubmit(
        event: React.FormEvent
    ) {
        event.preventDefault();

        setError("");

        try {
            const updatedService = updateService(
                currentServiceId,
                {
                    name,
                    status,
                    description,
                    category,
                }
            );

            if (!updatedService) {
                setError(
                    "The service could not be found."
                );
                return;
            }

            navigate(`/services/${currentServiceId}`);
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }

    return (
        <div>
            <Link
                to={`/services/${serviceId}`}
                className="text-blue-400 hover:text-blue-300"
            >
                ← Back to Service
            </Link>

            <div className="mt-6">
                <h1 className="text-4xl font-bold text-white">
                    Edit Service
                </h1>

                <p className="mt-3 text-slate-400">
                    Update the service information below.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 max-w-3xl space-y-6"
            >
                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Service ID
                    </label>

                    <input
                        type="text"
                        value={service.id}
                        disabled
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-500"
                    />

                    <p className="mt-2 text-sm text-slate-500">
                        Service ID cannot be changed.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Service Name
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

                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Service Category
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

                <div>
                    <label className="block text-sm font-medium text-slate-300">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value as ServiceStatus
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
                    <div className="rounded-lg border border-red-800 bg-red-950/40 p-4 text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
                    >
                        Save Changes
                    </button>

                    <Link
                        to={`/services/${serviceId}`}
                        className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-800"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default EditServicePage;