import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createService } from "../services/serviceService";
import type {
  CreateServiceInput,
  ServiceStatus,
} from "../types/service";
import { getErrorMessage } from "../utils/errorHandler";

function CreateServicePage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<CreateServiceInput>({
      id: "",
      name: "",
      status: "Planning",
      description: "",
      category: "",
    });

  const [error, setError] = useState("");

  const handleChange = (
    field: keyof CreateServiceInput,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    try {
      const service = createService({
        id: formData.id.trim(),
        name: formData.name.trim(),
        status: formData.status,
        description: formData.description.trim(),
        category: formData.category.trim(),
      });

      navigate(`/services/${service.id}`);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  return (
    <div>
      <Link
        to="/services"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back to Services
      </Link>

      <h1 className="mt-8 text-5xl font-bold text-white">
        Create Service
      </h1>

      <p className="mt-4 text-xl text-slate-400">
        Add a new service to the PiGenesis service ecosystem.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-4xl space-y-6"
      >
        {/* Service ID */}
        <div>
          <label
            htmlFor="service-id"
            className="block text-sm font-medium text-slate-300"
          >
            Service ID
          </label>

          <input
            id="service-id"
            type="text"
            value={formData.id}
            onChange={(event) =>
              handleChange("id", event.target.value)
            }
            placeholder="example-service"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          <p className="mt-2 text-sm text-slate-500">
            Use lowercase letters, numbers, and hyphens only.
          </p>
        </div>

        {/* Service Name */}
        <div>
          <label
            htmlFor="service-name"
            className="block text-sm font-medium text-slate-300"
          >
            Service Name
          </label>

          <input
            id="service-name"
            type="text"
            value={formData.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            placeholder="Example Service"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="service-category"
            className="block text-sm font-medium text-slate-300"
          >
            Category
          </label>

          <input
            id="service-category"
            type="text"
            value={formData.category}
            onChange={(event) =>
              handleChange("category", event.target.value)
            }
            placeholder="Automation"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="service-status"
            className="block text-sm font-medium text-slate-300"
          >
            Status
          </label>

          <select
            id="service-status"
            value={formData.status}
            onChange={(event) =>
              handleChange(
                "status",
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

        {/* Description */}
        <div>
          <label
            htmlFor="service-description"
            className="block text-sm font-medium text-slate-300"
          >
            Description
          </label>

          <textarea
            id="service-description"
            value={formData.description}
            onChange={(event) =>
              handleChange(
                "description",
                event.target.value
              )
            }
            placeholder="Describe what this service provides..."
            rows={6}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-950/40 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
          >
            Create Service
          </button>

          <Link
            to="/services"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateServicePage;