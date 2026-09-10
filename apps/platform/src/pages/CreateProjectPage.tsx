import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, getProjects, } from "../services/projectService";
import type {
  CreateProjectInput,
  ProjectStatus,
} from "../types/project";
import { getErrorMessage } from "../utils/errorHandler";

function CreateProjectPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateProjectInput>({
    id: "",
    name: "",
    description: "",
    type: "",
    status: "Planning",
  });

  const [error, setError] = useState("");

  function handleChange(
    field: keyof CreateProjectInput,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const projectId = formData.id.trim().toLowerCase();

    if (!projectId) {
      setError("Project ID is required.");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(projectId)) {
      setError(
        "Project ID can contain only lowercase letters, numbers, and hyphens."
      );
      return;
    }

    if (!formData.name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!formData.type.trim()) {
      setError("Project type is required.");
      return;
    }

    const existingProjects = getProjects();

    const alreadyExists = existingProjects.some(
      (project) => project.id === projectId
    );

    if (alreadyExists) {
      setError(
        "A project with this ID already exists."
      );
      return;
    }

    const project: CreateProjectInput = {
      ...formData,
      id: projectId,
      name: formData.name.trim(),
      description: formData.description.trim(),
      type: formData.type.trim(),
    };

    try {
      createProject(project);

      navigate(`/projects/${projectId}`);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }

  return (
    <div className="max-w-4xl">
      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="mb-8 text-blue-400 hover:text-blue-300"
      >
        ← Back to Projects
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Create Project
        </h1>

        <p className="mt-2 text-lg text-slate-400">
          Add a new PiGenesis engineering project.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-700 bg-slate-900 p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label
              htmlFor="project-id"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project ID
            </label>

            <input
              id="project-id"
              type="text"
              value={formData.id}
              onChange={(event) =>
                handleChange("id", event.target.value)
              }
              placeholder="ai-operations-platform"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Use lowercase letters, numbers, and hyphens.
            </p>
          </div>

          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project Name
            </label>

            <input
              id="project-name"
              type="text"
              value={formData.name}
              onChange={(event) =>
                handleChange("name", event.target.value)
              }
              placeholder="AI Operations Platform"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="project-type"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Project Type
            </label>

            <input
              id="project-type"
              type="text"
              value={formData.type}
              onChange={(event) =>
                handleChange("type", event.target.value)
              }
              placeholder="Platform"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="project-status"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="project-status"
              value={formData.status}
              onChange={(event) =>
                handleChange(
                  "status",
                  event.target.value as ProjectStatus
                )
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="Planning">
                Planning
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Description
            </label>

            <textarea
              id="project-description"
              rows={6}
              value={formData.description}
              onChange={(event) =>
                handleChange(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe the purpose of this project..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
          >
            Create Project
          </button>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectPage;