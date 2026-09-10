import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProjectById,
  updateProject,
} from "../services/projectService";

import type {
  Project,
  ProjectStatus,
} from "../types/project";

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] =
    useState<Project | undefined>();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [type, setType] = useState("");
  const [status, setStatus] =
    useState<ProjectStatus>("Planning");

  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing.");
      return;
    }

    const existingProject =
      getProjectById(projectId);

    if (!existingProject) {
      setError("Project not found.");
      return;
    }

    setProject(existingProject);
    setName(existingProject.name);
    setDescription(existingProject.description);
    setType(existingProject.type);
    setStatus(existingProject.status);
  }, [projectId]);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    if (!projectId) {
      setError("Project ID is missing.");
      return;
    }

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return;
    }

    if (!type.trim()) {
      setError("Project type is required.");
      return;
    }

    const updatedProject = updateProject(
      projectId,
      {
        name: name.trim(),
        description: description.trim(),
        type: type.trim(),
        status,
      }
    );

    if (!updatedProject) {
      setError("Unable to update project.");
      return;
    }

    navigate(`/projects/${projectId}`);
  }

  if (!project && !error) {
    return (
      <div className="text-slate-400">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="mb-8 text-blue-400 hover:text-blue-300"
        >
          ← Back to Projects
        </button>

        <div className="rounded-xl border border-red-800 bg-red-950/30 p-8">
          <h1 className="text-2xl font-semibold text-red-300">
            Project Error
          </h1>

          <p className="mt-3 text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <button
        type="button"
        onClick={() =>
          navigate(`/projects/${project.id}`)
        }
        className="mb-8 text-blue-400 hover:text-blue-300"
      >
        ← Back to Project
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Edit Project
        </h1>

        <p className="mt-2 text-lg text-slate-400">
          Update project information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-700 bg-slate-900 p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">

          {/* Project ID */}
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
              value={project.id}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Project ID cannot be changed.
            </p>
          </div>

          {/* Project Name */}
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
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Project Type */}
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
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="project-status"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="project-status"
              value={status}
              onChange={(event) =>
                setStatus(
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

          {/* Description */}
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
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
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
            Save Changes
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/projects/${project.id}`)
            }
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectPage;